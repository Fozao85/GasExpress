import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin.seed';
import { seedCylinders } from './cylinder.seed';
import { seedCustomers } from './customer.seed';
import { seedAddresses } from './address.seed';
import { seedVendors } from './vendor.seed';
import { seedInventory } from './inventory.seed';
import { seedRiders } from './rider.seed';
import { seedPromotions } from './promotion.seed';
import { seedOrders } from './order.seed';
import { seedNotifications } from './notification.seed';
import { seedPlatformSettings } from './platform-settings.seed';

const prisma = new PrismaClient();

interface CustomerRef {
  user: { id: string };
  profileId: string;
  addresses: { id: string }[];
}

interface VendorRef {
  user: { id: string };
  profileId: string;
}

interface RiderRef {
  user: { id: string };
  profileId: string;
}

async function main() {
  console.log('\n=== GasNow Development Seed ===\n');

  console.log('[0/11] Platform Settings');
  await seedPlatformSettings(prisma);

  console.log('[1/11] Admin');
  await seedAdmin(prisma);

  console.log('[2/11] Cylinder Types');
  const cylinders = await seedCylinders(prisma);

  console.log('[3/11] Customers');
  const customerUsers = await seedCustomers(prisma);

  console.log('[4/11] Addresses');
  const addresses = await seedAddresses(prisma, customerUsers);

  const customers: CustomerRef[] = [];
  for (const u of customerUsers) {
    const profile = await prisma.customerProfile.findUnique({ where: { userId: u.id } });
    if (profile) {
      customers.push({
        user: u,
        profileId: profile.id,
        addresses: addresses.filter((a) => a.userId === u.id),
      });
    }
  }

  console.log('[5/11] Vendors');
  const vendorResults = (await seedVendors(prisma)) as VendorRef[];

  console.log('[6/11] Inventory');
  await seedInventory(prisma, vendorResults, cylinders);

  console.log('[7/11] Riders');
  const riderResults = (await seedRiders(prisma)) as RiderRef[];

  console.log('[8/11] Promotions');
  await seedPromotions(prisma);

  console.log('[9/11] Orders');
  await seedOrders(prisma, {
    customers,
    vendors: vendorResults,
    riders: riderResults,
    cylinders,
  });

  console.log('[10/11] Notifications');
  await seedNotifications(prisma, {
    customers,
    vendors: vendorResults,
    riders: riderResults,
  });

  console.log('\n=== Seed Complete ===\n');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
