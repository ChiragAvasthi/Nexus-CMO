import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products for a workspace
export async function getProducts(req, res) {
  try {
    const { id } = req.params; // workspace ID
    const products = await prisma.product.findMany({
      where: { workspaceId: id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Failed to get products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
}

// Create a new product
export async function createProduct(req, res) {
  try {
    const { id } = req.params; // workspace ID
    const { name, targetAudience, currentProblem, goal, budget } = req.body;

    // Verify workspace exists and belongs to user
    const workspace = await prisma.workspace.findFirst({
      where: { id, ownerId: req.user.id }
    });

    if (!workspace) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const product = await prisma.product.create({
      data: {
        workspaceId: id,
        name,
        targetAudience,
        currentProblem,
        goal,
        budget
      }
    });

    res.json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
}

// Update a product
export async function updateProduct(req, res) {
  try {
    const { id, productId } = req.params;
    const { name, targetAudience, currentProblem, goal, budget } = req.body;

    // Verify workspace exists and belongs to user
    const workspace = await prisma.workspace.findFirst({
      where: { id, ownerId: req.user.id }
    });

    if (!workspace) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const product = await prisma.product.update({
      where: { id: productId, workspaceId: id },
      data: {
        name,
        targetAudience,
        currentProblem,
        goal,
        budget
      }
    });

    res.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
}
