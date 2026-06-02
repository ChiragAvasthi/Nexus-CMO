import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAssets = async (req, res) => {
  try {
    // In a real app we'd filter by workspaceId.
    // We assume the user has 1 workspace for now.
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { workspaces: true }
    });

    if (!user || user.workspaces.length === 0) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const workspaceId = user.workspaces[0].id;

    const assets = await prisma.asset.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(assets);
  } catch (error) {
    console.error('getAssets error:', error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};
