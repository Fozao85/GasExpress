import type { PrismaClient } from '@prisma/client';

const CYLINDER_TYPES = [
  { sizeKg: 6, description: '6kg LPG Cylinder' },
  { sizeKg: 12.5, description: '12.5kg LPG Cylinder' },
  { sizeKg: 15, description: '15kg LPG Cylinder' },
  { sizeKg: 50, description: '50kg LPG Cylinder' },
];

export async function seedCylinders(prisma: PrismaClient) {
  const created: { id: string; sizeKg: number }[] = [];

  for (const c of CYLINDER_TYPES) {
    const existing = await prisma.cylinderType.findFirst({
      where: { sizeKg: c.sizeKg },
    });

    if (existing) {
      created.push({ id: existing.id, sizeKg: Number(existing.sizeKg) });
    } else {
      const cylinder = await prisma.cylinderType.create({
        data: { sizeKg: c.sizeKg, description: c.description },
      });
      created.push({ id: cylinder.id, sizeKg: Number(cylinder.sizeKg) });
    }
  }

  console.log(`  ✓ ${created.length} cylinder types seeded`);
  return created;
}
