import type { PrismaClient, User } from '@prisma/client';
import { hashPassword } from '../../common/services/password.service';

const VENDORS = [
  {
    businessName: 'Safari Gas Ltd',
    ownerName: 'John Safari',
    phone: '233540000001',
    email: 'vendor1@safari-gas.com',
    lat: 5.6037,
    lng: -0.187,
    open: '07:00',
    close: '20:00',
    rating: 4.5,
  },
  {
    businessName: 'Shell Gas Accra',
    ownerName: 'Ama Serwaa',
    phone: '233540000002',
    email: 'vendor2@shell-gas.com',
    lat: 5.6137,
    lng: -0.197,
    open: '08:00',
    close: '21:00',
    rating: 4.2,
  },
  {
    businessName: 'Total Energies Kumasi',
    ownerName: 'Kwabena Danso',
    phone: '233540000003',
    email: 'vendor3@total-energies.com',
    lat: 6.6858,
    lng: -1.6224,
    open: '06:00',
    close: '22:00',
    rating: 4.8,
  },
  {
    businessName: 'GOIL Takoradi',
    ownerName: 'Esi Ackah',
    phone: '233540000004',
    email: 'vendor4@goil.com',
    lat: 4.8928,
    lng: -1.7741,
    open: '07:30',
    close: '19:30',
    rating: 4.0,
  },
  {
    businessName: 'Vivo Energy Tamale',
    ownerName: 'Sulemana Iddrisu',
    phone: '233540000005',
    email: 'vendor5@vivo-energy.com',
    lat: 9.4038,
    lng: -0.8392,
    open: '08:00',
    close: '18:00',
    rating: 4.6,
  },
];

export async function seedVendors(prisma: PrismaClient) {
  const passwordHash = await hashPassword('Password123!');
  const users: { user: User; profileId: string }[] = [];

  for (const v of VENDORS) {
    const user = await prisma.user.upsert({
      where: { phone: v.phone },
      update: {},
      create: {
        fullName: v.ownerName,
        phone: v.phone,
        email: v.email,
        passwordHash,
        role: 'VENDOR',
        status: 'ACTIVE',
      },
    });

    const profile = await prisma.vendorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        businessName: v.businessName,
        phone: v.phone,
        address: `${v.lat}, ${v.lng}`,
        latitude: v.lat,
        longitude: v.lng,
        openingTime: v.open,
        closingTime: v.close,
        verificationStatus: 'VERIFIED',
        averageRating: v.rating,
        isOpen: true,
      },
    });

    users.push({ user, profileId: profile.id });
  }

  console.log(`  ✓ ${users.length} vendors seeded`);
  return users;
}
