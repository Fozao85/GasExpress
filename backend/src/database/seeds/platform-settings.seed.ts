import type { PrismaClient } from '@prisma/client';

export async function seedPlatformSettings(prisma: PrismaClient) {
  const existing = await prisma.platformSettings.findFirst();
  if (existing) {
    console.log(`  ✓ Platform settings already exist (fee=GHS ${existing.defaultDeliveryFee})`);
    return existing;
  }

  const settings = await prisma.platformSettings.create({
    data: {
      defaultDeliveryFee: 15,
      freeDeliveryThreshold: 200,
      supportPhone: '+233000000000',
      supportEmail: 'support@gasnow.com',
      maintenanceMode: false,
      minimumInventoryAlert: 5,
    },
  });

  console.log(
    `  ✓ Platform settings: fee=GHS ${settings.defaultDeliveryFee}, free≥GHS ${settings.freeDeliveryThreshold}`
  );
  return settings;
}
