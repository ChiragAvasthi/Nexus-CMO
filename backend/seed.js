import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Find or create a default user
  let user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Seed User',
        password_hash: 'seedpass', // this is fake, don't use it to login
        workspaces: {
          create: [{ name: 'Seed Workspace' }]
        }
      },
      include: { workspaces: true }
    });
  } else {
    user = await prisma.user.findUnique({ where: { id: user.id }, include: { workspaces: true } });
  }

  const workspaceId = user.workspaces[0].id;

  // Clear existing assets to avoid duplicates
  await prisma.asset.deleteMany({ where: { workspaceId } });

  // Seed assets
  await prisma.asset.createMany({
    data: [
      {
        workspaceId,
        title: 'Meta Ad — RevOps Leaders v3',
        type: 'smm', // Using type to store agent code
        status: 'live'
      },
      {
        workspaceId,
        title: 'Cold Email Sequence v2 — VP Sales (4 emails)',
        type: 'bdm',
        status: 'live'
      },
      {
        workspaceId,
        title: 'Meta Ad — Pain-led Variant 2',
        type: 'smm',
        status: 'draft'
      },
      {
        workspaceId,
        title: 'Meta Ad — Original SMB targeting',
        type: 'smm',
        status: 'archived'
      }
    ]
  });

  // Seed tasks
  await prisma.task.deleteMany({ where: { workspaceId } });
  await prisma.task.createMany({
    data: [
      {
        workspaceId,
        agentId: 'smm',
        status: 'pending',
        description: 'Review Meta Ad variants for Campaign A-2'
      },
      {
        workspaceId,
        agentId: 'smm',
        status: 'pending',
        description: 'Approve new pricing page copy'
      },
      {
        workspaceId,
        agentId: 'cmo',
        status: 'pending',
        description: 'Sign off on Q3 Lead Gen budget'
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
