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

  console.log('[1/10] Admin');
  await seedAdmin(prisma);

  console.log('[2/10] Cylinder Types');
  const cylinders = await seedCylinders(prisma);

  console.log('[3/10] Customers');
  const customerUsers = await seedCustomers(prisma);

  console.log('[4/10] Addresses');
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

  console.log('[5/10] Vendors');
  const vendorResults = (await seedVendors(prisma)) as VendorRef[];

  console.log('[6/10] Inventory');
  await seedInventory(prisma, vendorResults, cylinders);

  console.log('[7/10] Riders');
  const riderResults = (await seedRiders(prisma)) as RiderRef[];

  console.log('[8/10] Promotions');
  await seedPromotions(prisma);

  console.log('[9/10] Orders');
  await seedOrders(prisma, {
    customers,
    vendors: vendorResults,
    riders: riderResults,
    cylinders,
  });

  console.log('[10/10] Notifications');
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
