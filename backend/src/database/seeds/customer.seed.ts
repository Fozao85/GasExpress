import type { PrismaClient, User } from '@prisma/client';
import { hashPassword } from '../../common/services/password.service';

const CUSTOMERS = [
  { fullName: 'Kwame Asante', phone: '233670000001', email: 'kwame.asante@example.com' },
  { fullName: 'Akua Mensah', phone: '233670000002', email: 'akua.mensah@example.com' },
  { fullName: 'Yaw Owusu', phone: '233670000003', email: 'yaw.owusu@example.com' },
  { fullName: 'Abena Adjei', phone: '233670000004', email: 'abena.adjei@example.com' },
  { fullName: 'Kofi Boadi', phone: '233670000005', email: 'kofi.boadi@example.com' },
];

export async function seedCustomers(prisma: PrismaClient): Promise<User[]> {
  const passwordHash = await hashPassword('Password123!');
  const users: User[] = [];

  for (const c of CUSTOMERS) {
    const user = await prisma.user.upsert({
      where: { phone: c.phone },
      update: {},
      create: {
        fullName: c.fullName,
        phone: c.phone,
        email: c.email,
        passwordHash,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
    });

    await prisma.customerProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    users.push(user);
  }

  console.log(`  ✓ ${users.length} customers seeded`);
  return users;
}
