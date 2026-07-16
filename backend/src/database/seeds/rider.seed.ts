import type { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../common/services/password.service';

const RIDERS = [
  {
    fullName: 'Emmanuel Tetteh',
    phone: '233680000001',
    vehicle: 'Motorcycle',
    plate: 'GT-4521-20',
  },
  {
    fullName: 'Fatima Alhassan',
    phone: '233680000002',
    vehicle: 'Motorcycle',
    plate: 'GT-7834-21',
  },
  { fullName: 'Daniel Ashong', phone: '233680000003', vehicle: 'Tricycle', plate: 'GR-1122-22' },
];

export async function seedRiders(prisma: PrismaClient) {
  const passwordHash = await hashPassword('Password123!');
  const riders: { user: { id: string }; profileId: string }[] = [];

  for (const r of RIDERS) {
    const user = await prisma.user.upsert({
      where: { phone: r.phone },
      update: {},
      create: {
        fullName: r.fullName,
        phone: r.phone,
        email: null,
        passwordHash,
        role: 'RIDER',
        status: 'ACTIVE',
      },
    });

    const profile = await prisma.riderProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        vehicleType: r.vehicle,
        licenseNumber: r.plate,
        availability: 'ONLINE',
        totalDeliveries: 0,
      },
    });

    riders.push({ user, profileId: profile.id });
  }

  console.log(`  ✓ ${riders.length} riders seeded`);
  return riders;
}
