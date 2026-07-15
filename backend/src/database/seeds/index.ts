import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  console.log('Seeding database...');

  // Create cylinder types
  const cylinders = [
    { sizeKg: 6, description: '6kg LPG Cylinder' },
    { sizeKg: 12.5, description: '12.5kg LPG Cylinder' },
    { sizeKg: 15, description: '15kg LPG Cylinder' },
    { sizeKg: 50, description: '50kg LPG Cylinder' },
  ];

  for (const cylinder of cylinders) {
    const existing = await prisma.cylinderType.findFirst({
      where: { sizeKg: cylinder.sizeKg },
    });
    if (!existing) {
      await prisma.cylinderType.create({
        data: {
          sizeKg: cylinder.sizeKg,
          description: cylinder.description,
        },
      });
    }
  }

  console.log('Cylinder types seeded');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { phone: '2340000000000' },
    update: {},
    create: {
      fullName: 'System Admin',
      phone: '2340000000000',
      passwordHash: '$2b$10$placeholder-hash-change-in-production',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('Admin user seeded:', adminUser.id);
  console.log('Seeding complete');
}

seed()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
