import type { PrismaClient } from '@prisma/client';

const PROMOTIONS = [
  {
    title: 'Free Delivery Over GHS 200',
    discountType: 'FREE_DELIVERY',
    value: 0,
    startDate: new Date('2026-01-01'),
    endDate: new Date('2026-12-31'),
    active: true,
  },
  {
    title: 'New Customer Discount',
    discountType: 'PERCENTAGE',
    value: 10,
    startDate: new Date('2026-01-01'),
    endDate: new Date('2026-12-31'),
    active: true,
  },
  {
    title: 'Weekend Promotion',
    discountType: 'PERCENTAGE',
    value: 5,
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-09-30'),
    active: true,
  },
  {
    title: 'Holiday Season Sale',
    discountType: 'PERCENTAGE',
    value: 15,
    startDate: new Date('2026-12-01'),
    endDate: new Date('2026-12-31'),
    active: false,
  },
  {
    title: 'Refer a Friend',
    discountType: 'FIXED',
    value: 20,
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-08-31'),
    active: true,
  },
];

export async function seedPromotions(prisma: PrismaClient) {
  let count = 0;

  for (const p of PROMOTIONS) {
    const existing = await prisma.promotion.findFirst({
      where: { title: p.title },
    });

    if (!existing) {
      await prisma.promotion.create({ data: p });
      count++;
    }
  }

  console.log(`  ✓ ${count} promotions seeded`);
}
