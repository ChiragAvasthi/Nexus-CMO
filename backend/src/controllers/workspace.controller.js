import { PrismaClient } from '@prisma/client';
import { generateCmoResponse } from '../services/ai.service.js';

const prisma = new PrismaClient();

export const getStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify the workspace belongs to the user
    const workspace = await prisma.workspace.findFirst({
      where: {
        id,
        ownerId: req.user.userId
      }
    });

    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const stats = {
      mrr: '$0',
      mrrDelta: '—',
      leads: '0',
      leadsDelta: '—',
      goalProgress: '0%',
      goalStatus: 'pending',
      cpa: '$0',
      cpaDelta: '—'
    };

    res.json(stats);
  } catch (error) {
    console.error('getStats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { agentId = 'cmo', productId } = req.query;

    const workspace = await prisma.workspace.findFirst({
      where: {
        id,
        ownerId: req.user.userId
      }
    });

    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const whereClause = { workspaceId: id, agentId };
    if (productId) {
      whereClause.productId = productId;
    }

    const messages = await prisma.message.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
      take: 50 // Get last 50 messages for context
    });

    res.json(messages);
  } catch (error) {
    console.error('getMessages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const generateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, industry, productName, targetAudience, currentProblem, goal, budget } = req.body;
    
    // Save to workspace
    await prisma.workspace.update({
      where: { id },
      data: { companyName, industry }
    });

    // Create the first product
    const product = await prisma.product.create({
      data: {
        workspaceId: id,
        name: productName || 'Core Product',
        targetAudience,
        currentProblem,
        goal,
        budget
      }
    });

    const prompt = `You are Alex, an expert CMO. The user just onboarded. Generate a brutal, highly analytical "Truth Report" for their company.
    Company: ${companyName}
    Industry: ${industry}
    Target Audience: ${targetAudience}
    Current Problem: ${currentProblem}
    
    You MUST respond with a RAW JSON array of exactly 3-5 objects (NO MARKDOWN WRAPPERS like \`\`\`json). Each object must have these keys:
    "id" (number), "severity" ("critical", "high", or "medium"), "title" (string, the problem), "detail" (string, explanation), "fix" (string, the solution), "agentLabel" ("S", "B", "D", "DA", or "SEO"), "agentName" ("SMM", "BDM", "Designer", "Data Analyst", or "SEO Architect").`;

    const rawJsonString = await generateCmoResponse(prompt, []);
    
    // Clean up markdown if Gemini accidentally added it
    const cleanJson = rawJsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const reportJson = JSON.parse(cleanJson);
    res.json({ loopholes: reportJson });
  } catch (err) {
    console.error('Failed to generate report JSON:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

export const getWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const workspace = await prisma.workspace.findFirst({
      where: { id, ownerId: req.user.userId }
    });
    if (!workspace) return res.status(404).json({ error: 'Workspace not found' });
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workspace' });
  }
};

export const updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, industry, targetAudience, currentProblem, goal, budget } = req.body;
    
    const workspace = await prisma.workspace.findFirst({
      where: { id, ownerId: req.user.userId }
    });
    if (!workspace) return res.status(404).json({ error: 'Workspace not found' });

    const updated = await prisma.workspace.update({
      where: { id },
      data: { companyName, industry, targetAudience, currentProblem, goal, budget }
    });
    
    res.json(updated);
  } catch (error) {
    console.error('Update workspace error:', error);
    res.status(500).json({ error: 'Failed to update workspace' });
  }
};

export const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Workspace name is required' });
    }

    const workspace = await prisma.workspace.create({
      data: {
        name,
        ownerId: req.user.userId
      }
    });

    res.status(201).json(workspace);
  } catch (error) {
    console.error('Create workspace error:', error);
    res.status(500).json({ error: 'Failed to create workspace' });
  }
};
