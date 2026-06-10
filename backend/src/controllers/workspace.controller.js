import { generateCmoResponse } from '../services/ai.service.js';
import prisma from '../config/db.js';

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
    const { companyName, industry, productName, targetAudience, failedEffort, workedEffort, goal, currentState, budget, uploadedFiles, integrations } = req.body;
    
    // Save to workspace
    await prisma.workspace.update({
      where: { id },
      data: { companyName, industry }
    });

    // Find existing product to avoid duplicates
    let product = await prisma.product.findFirst({
      where: { workspaceId: id },
      orderBy: { createdAt: 'asc' }
    });

    if (product) {
      product = await prisma.product.update({
        where: { id: product.id },
        data: {
          name: productName || 'Core Product',
          targetAudience,
          currentProblem: `${failedEffort} | ${workedEffort}`,
          goal,
          budget
        }
      });
    } else {
      product = await prisma.product.create({
        data: {
          workspaceId: id,
          name: productName || 'Core Product',
          targetAudience,
          currentProblem: `${failedEffort} | ${workedEffort}`,
          goal,
          budget
        }
      });
    }

    const { generateTruthReport } = await import('../services/ai.service.js');
    
    const reportJson = await generateTruthReport({
      companyName,
      industry,
      targetAudience,
      productName,
      failedEffort,
      workedEffort,
      goal,
      currentState,
      budget,
      uploadedFiles: uploadedFiles || [],
      integrations: integrations || []
    });
    
    if (!reportJson) {
      throw new Error("Failed to generate Truth Report");
    }

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
