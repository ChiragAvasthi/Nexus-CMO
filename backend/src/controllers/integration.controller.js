import prisma from '../config/db.js';
export const getIntegrations = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    
    // Verify user owns the workspace
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { workspaces: true }
    });
    
    const ownsWorkspace = user?.workspaces.some(w => w.id === workspaceId);
    if (!ownsWorkspace) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const integrations = await prisma.integration.findMany({
      where: { workspaceId }
    });

    res.json(integrations);
  } catch (error) {
    console.error('getIntegrations error:', error);
    res.status(500).json({ error: 'Failed to fetch integrations' });
  }
};

export const connectIntegration = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { provider } = req.body;

    if (!provider) {
      return res.status(400).json({ error: 'Provider is required' });
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

    // Upsert integration
    const integration = await prisma.integration.upsert({
      where: {
        workspaceId_provider: {
          workspaceId,
          provider
        }
      },
      update: {
        status: 'connected',
        connectedAt: new Date()
      },
      create: {
        workspaceId,
        provider,
        status: 'connected'
      }
    });

    res.json(integration);
  } catch (error) {
    console.error('connectIntegration error:', error);
    res.status(500).json({ error: 'Failed to connect integration' });
  }
};
