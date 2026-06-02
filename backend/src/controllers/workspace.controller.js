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

    // Mock stats
    const stats = {
      mrr: '$14,200',
      mrrDelta: '▲ $2,400 this month',
      leads: '12',
      leadsDelta: '▲ 4',
      goalProgress: '57%',
      goalStatus: 'on track',
      cpa: '$78',
      cpaDelta: '▼ 18%'
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

    const messages = await prisma.message.findMany({
      where: { workspaceId: id },
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
    const { companyName, industry, targetAudience, currentProblem } = req.body;
    
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
