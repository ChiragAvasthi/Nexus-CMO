import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import workspaceRoutes from './src/routes/workspace.routes.js';
import assetsRoutes from './src/routes/assets.routes.js';
import tasksRoutes from './src/routes/tasks.routes.js';
import passport from './src/config/passport.js';
import { PrismaClient } from '@prisma/client';
import { generateCmoResponse } from './src/services/ai.service.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspace', workspaceRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/tasks', tasksRoutes);

// Basic Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// WebSockets
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_workspace', (workspaceId) => {
    socket.join(workspaceId);
    console.log(`Socket ${socket.id} joined workspace ${workspaceId}`);
  });

  socket.on('send_message', async (data) => {
    // data: { workspaceId, productId, agentId, sender, content, time }
    const agentId = data.agentId || 'cmo';
    const productId = data.productId || null;

    // 1. Save user message to database
    await prisma.message.create({
      data: {
        workspaceId: data.workspaceId,
        productId: productId,
        agentId: agentId,
        sender: data.sender || 'user',
        content: data.content
      }
    });

    // 2. Broadcast user message to other clients in workspace (if any)
    socket.to(data.workspaceId).emit('new_message', data);
    
    // 3. Get recent conversation history for this agent & product
    const history = await prisma.message.findMany({
      where: { workspaceId: data.workspaceId, agentId: agentId, productId: productId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    const chronologicalHistory = history.reverse();

    // 3.5 Fetch Workspace context & Product context
    const workspace = await prisma.workspace.findUnique({
      where: { id: data.workspaceId },
      include: { owner: true }
    });

    let product = null;
    if (productId) {
      product = await prisma.product.findUnique({
        where: { id: productId }
      });
    }

    // 4. Generate AI response via Gemini
    let aiResponseText = '';
    if (agentId === 'cmo') {
      aiResponseText = await generateCmoResponse(data.content, chronologicalHistory, workspace, workspace?.owner, product);
    } else {
      const { generateSpecialistChatResponse } = await import('./src/services/agent.service.js');
      aiResponseText = await generateSpecialistChatResponse(data.content, chronologicalHistory, agentId, workspace, workspace?.owner, product);
    }

    // Extract JSON task block if present
    const jsonRegex = /```json\n([\s\S]*?)\n```/;
    const match = aiResponseText.match(jsonRegex);
    
    let newTasks = [];
    if (match && match[1]) {
      try {
        const tasksArray = JSON.parse(match[1]);
        if (Array.isArray(tasksArray)) {
          for (const t of tasksArray) {
            // Save task as pending asset
            const createdAsset = await prisma.asset.create({
              data: {
                workspaceId: data.workspaceId,
                productId: productId,
                title: 'Pending Asset',
                type: t.agentId || agentId,
                status: 'pending',
                content: t.description,
                agentId: t.agentId || agentId
              }
            });
            newTasks.push(createdAsset);

            // Run tactical agent in the background
            (async () => {
              try {
                const { executeTacticalTask } = await import('./src/services/agent.service.js');
                const assetContent = await executeTacticalTask(t, workspace);
                
                await prisma.asset.update({
                  where: { id: createdAsset.id },
                  data: { 
                    content: assetContent,
                    status: 'completed'
                  }
                });
              } catch (e) {
                console.error('Tactical task execution failed:', e);
              }
            })();
          }
        }
      } catch(e) {
        console.error("Failed to parse tasks from AI response", e);
      }
      // Remove the JSON block from the text
      aiResponseText = aiResponseText.replace(jsonRegex, '').trim();
    }

    // 5. Save AI response to DB
    await prisma.message.create({
      data: {
        content: aiResponseText,
        sender: 'ai', // or 'cmo' based on what frontend expects, usually 'ai'
        workspaceId: data.workspaceId,
        productId: productId,
        agentId: agentId
      }
    });

    // 6. Emit AI response back to frontend
    io.to(data.workspaceId).emit('new_message', {
      id: Date.now(),
      sender: agentId === 'cmo' ? 'cmo' : agentId, // or 'ai'
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: aiResponseText
    });

    // 7. Emit task update if new tasks were created
    if (newTasks.length > 0) {
      io.to(data.workspaceId).emit('tasks_updated', newTasks);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
