import prisma from '../config/db.js';
export const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { productId } = req.query;

    const workspace = await prisma.workspace.findFirst({
      where: {
        id,
        ownerId: req.user.userId
      }
    });

    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const whereClause = { workspaceId: id };
    if (productId) {
      whereClause.productId = productId;
    }

    const tasks = await prisma.asset.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    console.error('getTasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const approveTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Approving the asset makes it 'live' and available in the Asset Library
    const task = await prisma.asset.update({
      where: { id: taskId },
      data: { status: 'live' }
    });

    res.json(task);
  } catch (error) {
    console.error('approveTask error:', error);
    res.status(500).json({ error: 'Failed to approve task' });
  }
};
