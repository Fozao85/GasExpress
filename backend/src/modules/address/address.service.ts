import { prisma } from '../../database';
import { NotFoundError } from '../../common/exceptions/app-error';

export async function listAddresses(userId: string) {
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: 'desc' }],
  });

  return addresses.map((a) => ({
    id: a.id,
    label: a.label,
    addressLine: a.addressLine,
    city: a.city,
    region: a.region,
    latitude: a.latitude ? Number(a.latitude) : null,
    longitude: a.longitude ? Number(a.longitude) : null,
    isDefault: a.isDefault,
  }));
}

function nullish<T>(val: T | undefined): T | null {
  return val === undefined ? null : val;
}

export async function createAddress(
  userId: string,
  input: {
    label?: string;
    addressLine: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
  }
) {
  if (input.isDefault) {
    await prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data: {
      userId,
      label: nullish(input.label),
      addressLine: input.addressLine,
      city: nullish(input.city),
      region: nullish(input.region),
      latitude: nullish(input.latitude),
      longitude: nullish(input.longitude),
      isDefault: input.isDefault ?? false,
    },
  });

  return {
    id: address.id,
    label: address.label,
    addressLine: address.addressLine,
    city: address.city,
    region: address.region,
    latitude: address.latitude ? Number(address.latitude) : null,
    longitude: address.longitude ? Number(address.longitude) : null,
    isDefault: address.isDefault,
  };
}

export async function updateAddress(
  userId: string,
  addressId: string,
  input: {
    label?: string;
    addressLine?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
  }
) {
  const existing = await prisma.address.findUnique({ where: { id: addressId } });
  if (!existing) throw new NotFoundError('Address');
  if (existing.userId !== userId) throw new NotFoundError('Address');

  if (input.isDefault) {
    await prisma.address.updateMany({
      where: { userId, isDefault: true, id: { not: addressId } },
      data: { isDefault: false },
    });
  }

  const data: any = {};
  if (input.label !== undefined) data.label = nullish(input.label);
  if (input.addressLine !== undefined) data.addressLine = input.addressLine;
  if (input.city !== undefined) data.city = nullish(input.city);
  if (input.region !== undefined) data.region = nullish(input.region);
  if (input.latitude !== undefined) data.latitude = nullish(input.latitude);
  if (input.longitude !== undefined) data.longitude = nullish(input.longitude);
  if (input.isDefault !== undefined) data.isDefault = input.isDefault;

  const address = await prisma.address.update({
    where: { id: addressId },
    data,
  });

  return {
    id: address.id,
    label: address.label,
    addressLine: address.addressLine,
    city: address.city,
    region: address.region,
    latitude: address.latitude ? Number(address.latitude) : null,
    longitude: address.longitude ? Number(address.longitude) : null,
    isDefault: address.isDefault,
  };
}

export async function deleteAddress(userId: string, addressId: string) {
  const existing = await prisma.address.findUnique({ where: { id: addressId } });
  if (!existing) throw new NotFoundError('Address');
  if (existing.userId !== userId) throw new NotFoundError('Address');

  await prisma.address.delete({ where: { id: addressId } });

  return { id: addressId };
}
