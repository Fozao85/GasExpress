import type { PrismaClient } from '@prisma/client';

interface SeedContext {
  customers: { user: { id: string }; profileId: string }[];
  vendors: { user: { id: string }; profileId: string }[];
  riders: { user: { id: string }; profileId: string }[];
}

export async function seedNotifications(prisma: PrismaClient, ctx: SeedContext) {
  const { customers, vendors, riders } = ctx;
  let count = 0;

  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);

  for (const c of customers) {
    const existing = await prisma.notification.findFirst({
      where: { userId: c.user.id, notificationType: 'welcome' },
    });
    if (!existing) {
      await prisma.notification.create({
        data: {
          userId: c.user.id,
          title: 'Welcome to GasNow',
          body: 'Your account has been created successfully. Start ordering gas today!',
          notificationType: 'welcome',
          createdAt: hoursAgo(720),
        },
      });
      count++;
    }
  }

  for (const v of vendors) {
    const existing = await prisma.notification.findFirst({
      where: { userId: v.user.id, notificationType: 'vendor_approved' },
    });
    if (!existing) {
      await prisma.notification.create({
        data: {
          userId: v.user.id,
          title: 'Vendor Approved',
          body: 'Your vendor account has been verified. You can now receive orders.',
          notificationType: 'vendor_approved',
          createdAt: hoursAgo(720),
        },
      });
      count++;
    }
  }

  for (const r of riders) {
    const existing = await prisma.notification.findFirst({
      where: { userId: r.user.id, notificationType: 'rider_active' },
    });
    if (!existing) {
      await prisma.notification.create({
        data: {
          userId: r.user.id,
          title: 'Ready to Ride',
          body: 'Your rider account is active. You will be notified of new delivery assignments.',
          notificationType: 'rider_active',
          createdAt: hoursAgo(720),
        },
      });
      count++;
    }
  }

  const orderNotification = await prisma.notification.findFirst({
    where: { notificationType: 'order_seeded' },
  });
  if (!orderNotification) {
    await prisma.notification.create({
      data: {
        userId: vendors[0].user.id,
        title: 'Sample Orders Created',
        body: '10 sample orders have been created for development and testing.',
        notificationType: 'order_seeded',
        createdAt: hoursAgo(48),
      },
    });
    count++;
  }

  console.log(`  ✓ ${count} notifications seeded`);
}
