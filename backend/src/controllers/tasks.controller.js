import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
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

    const tasks = await prisma.task.findMany({
      where: { workspaceId: id },
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

    // A real app would check if the user has permission to approve this specific task
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status: 'approved' }
    });

    res.json(task);
  } catch (error) {
    console.error('approveTask error:', error);
    res.status(500).json({ error: 'Failed to approve task' });
  }
};
