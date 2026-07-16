import type { PrismaClient, User } from '@prisma/client';

const ADDRESSES: {
  customerIndex: number;
  label: string;
  addressLine: string;
  city: string;
  region: string;
  isDefault: boolean;
}[] = [
  {
    customerIndex: 0,
    label: 'Home',
    addressLine: '42 Independence Avenue',
    city: 'Accra',
    region: 'Greater Accra',
    isDefault: true,
  },
  {
    customerIndex: 0,
    label: 'Office',
    addressLine: '15 Liberation Road, Airport City',
    city: 'Accra',
    region: 'Greater Accra',
    isDefault: false,
  },
  {
    customerIndex: 1,
    label: 'Home',
    addressLine: '7 Osu Cemetery Road',
    city: 'Accra',
    region: 'Greater Accra',
    isDefault: true,
  },
  {
    customerIndex: 1,
    label: 'Workshop',
    addressLine: '23 Industrial Area Rd',
    city: 'Tema',
    region: 'Greater Accra',
    isDefault: false,
  },
  {
    customerIndex: 2,
    label: 'Home',
    addressLine: '55 Kumasi Market Circle',
    city: 'Kumasi',
    region: 'Ashanti',
    isDefault: true,
  },
  {
    customerIndex: 2,
    label: 'Shop',
    addressLine: '88 Adum High Street',
    city: 'Kumasi',
    region: 'Ashanti',
    isDefault: false,
  },
  {
    customerIndex: 3,
    label: 'Home',
    addressLine: '12 Takoradi Beach Road',
    city: 'Takoradi',
    region: 'Western',
    isDefault: true,
  },
  {
    customerIndex: 3,
    label: 'Guest House',
    addressLine: '34 Essipong Road',
    city: 'Takoradi',
    region: 'Western',
    isDefault: false,
  },
  {
    customerIndex: 4,
    label: 'Home',
    addressLine: '9 Tamale Central',
    city: 'Tamale',
    region: 'Northern',
    isDefault: true,
  },
  {
    customerIndex: 4,
    label: 'Farm',
    addressLine: '67 Gumani Road',
    city: 'Tamale',
    region: 'Northern',
    isDefault: false,
  },
];

export async function seedAddresses(prisma: PrismaClient, customers: User[]) {
  const created: { id: string; userId: string }[] = [];

  for (const addr of ADDRESSES) {
    const user = customers[addr.customerIndex];

    const existing = await prisma.address.findFirst({
      where: { userId: user.id, label: addr.label, addressLine: addr.addressLine },
    });

    if (existing) {
      created.push(existing);
      continue;
    }

    const address = await prisma.address.create({
      data: {
        userId: user.id,
        label: addr.label,
        addressLine: addr.addressLine,
        city: addr.city,
        region: addr.region,
        isDefault: addr.isDefault,
      },
    });
    created.push(address);

    if (addr.isDefault) {
      const profile = await prisma.customerProfile.findUnique({ where: { userId: user.id } });
      if (profile) {
        await prisma.customerProfile.update({
          where: { id: profile.id },
          data: { defaultAddressId: address.id },
        });
      }
    }
  }

  console.log(`  ✓ ${created.length} addresses seeded`);
  return created;
}
