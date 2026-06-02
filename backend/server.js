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
    try {
      // 1. Save user message to DB
      await prisma.message.create({
        data: {
          content: data.content,
          sender: 'user',
          workspaceId: data.workspaceId
        }
      });

      // 2. Broadcast user message to other clients in workspace (if any)
      socket.to(data.workspaceId).emit('new_message', data);
      
      // 3. Fetch recent history for AI context
      const history = await prisma.message.findMany({
        where: { workspaceId: data.workspaceId },
        orderBy: { createdAt: 'desc' },
        take: 10
      });
      // Reverse to get chronological order for Gemini
      const chronologicalHistory = history.reverse();

      // 4. Generate AI response via Gemini
      const aiResponseText = await generateCmoResponse(data.content, chronologicalHistory);

      // 5. Save AI response to DB
      await prisma.message.create({
        data: {
          content: aiResponseText,
          sender: 'cmo',
          workspaceId: data.workspaceId
        }
      });

      // 6. Emit AI response back to frontend
      io.to(data.workspaceId).emit('new_message', {
        id: Date.now(),
        sender: 'cmo',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: aiResponseText
      });
    } catch (err) {
      console.error('Socket send_message error:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
