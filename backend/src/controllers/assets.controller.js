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

export const uploadFile = async (req, res) => {
  try {
    const { workspaceId, productId } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    if (!workspaceId) {
      return res.status(400).json({ error: 'workspaceId is required' });
    }

    // Verify user owns the workspace
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { workspaces: true }
    });
    
    const ownsWorkspace = user?.workspaces.some(w => w.id === workspaceId);
    if (!ownsWorkspace) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const createdAssets = [];
    for (const file of files) {
      const asset = await prisma.asset.create({
        data: {
          title: file.originalname,
          type: 'file',
          status: 'live',
          content: JSON.stringify({
            filename: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            path: file.path
          }),
          workspaceId: workspaceId,
          ...(productId && { productId })
        }
      });
      createdAssets.push(asset);
    }

    res.status(201).json({ message: 'Files uploaded successfully', assets: createdAssets });
  } catch (error) {
    console.error('uploadFile error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};
