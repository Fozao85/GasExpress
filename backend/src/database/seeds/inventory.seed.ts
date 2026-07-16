import type { PrismaClient } from '@prisma/client';

interface VendorRef {
  user: { id: string };
  profileId: string;
}

interface CylinderRef {
  id: string;
  sizeKg: number;
}

const PRICES: Record<number, number> = {
  6: 80,
  12.5: 150,
  15: 180,
  50: 500,
};

const STOCK: Record<number, number> = {
  6: 50,
  12.5: 35,
  15: 40,
  50: 15,
};

export async function seedInventory(
  prisma: PrismaClient,
  vendors: VendorRef[],
  cylinders: CylinderRef[]
) {
  let count = 0;

  for (const vendor of vendors) {
    for (const cyl of cylinders) {
      await prisma.vendorInventory.upsert({
        where: { vendorId_cylinderTypeId: { vendorId: vendor.profileId, cylinderTypeId: cyl.id } },
        update: {},
        create: {
          vendorId: vendor.profileId,
          cylinderTypeId: cyl.id,
          stockQuantity: STOCK[cyl.sizeKg] ?? 20,
          price: PRICES[cyl.sizeKg] ?? 100,
        },
      });
      count++;
    }
  }

  console.log(`  ✓ ${count} inventory records seeded`);
}
