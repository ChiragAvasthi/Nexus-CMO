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

    let workspaceId = req.query.workspaceId;
    let productId = req.query.productId;

    if (!workspaceId) {
      workspaceId = user.workspaces[0].id;
    } else {
      // Verify user owns this workspace
      const ownsWorkspace = user.workspaces.some(w => w.id === workspaceId);
      if (!ownsWorkspace) {
        return res.status(403).json({ error: 'Unauthorized access to workspace' });
      }
    }

    const whereClause = { workspaceId };
    if (productId) {
      whereClause.productId = productId;
    }

    const assets = await prisma.asset.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    res.json(assets);
  } catch (error) {
    console.error('getAssets error:', error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};
