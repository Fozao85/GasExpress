import type { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../common/services/password.service';

export async function seedAdmin(prisma: PrismaClient) {
  const passwordHash = await hashPassword('Password123!');

  const user = await prisma.user.upsert({
    where: { phone: '233000000000' },
    update: {},
    create: {
      fullName: 'System Admin',
      phone: '233000000000',
      email: 'admin@gasnow.com',
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log(`  ✓ Admin: ${user.fullName} (${user.email})`);
  return user;
}
