import { prisma } from '../../database';
import { NotFoundError, ValidationError } from '../../common/exceptions/app-error';

interface CartItemResponse {
  id: string;
  inventoryId: string;
  cylinderSize: number;
  description: string | null;
  price: number;
  quantity: number;
  stockQuantity: number;
  inStock: boolean;
}

interface CartResponse {
  id: string;
  vendorId: string;
  vendorName: string;
  items: CartItemResponse[];
  subtotal: number;
  totalItems: number;
}

function mapCartItem(item: any): CartItemResponse {
  const inv = item.inventory;
  return {
    id: item.id,
    inventoryId: inv.id,
    cylinderSize: Number(inv.cylinderType.sizeKg),
    description: inv.cylinderType.description,
    price: Number(inv.price),
    quantity: item.quantity,
    stockQuantity: inv.stockQuantity,
    inStock: inv.stockQuantity > 0,
  };
}

export async function getCart(customerId: string): Promise<CartResponse | null> {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const cart = await prisma.cart.findFirst({
    where: { customerId: profile.id },
    include: {
      vendor: { select: { id: true, businessName: true } },
      items: {
        include: {
          inventory: {
            include: { cylinderType: true },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!cart) return null;

  const items = cart.items.map(mapCartItem);

  return {
    id: cart.id,
    vendorId: cart.vendor.id,
    vendorName: cart.vendor.businessName,
    items,
    subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  };
}

export async function addToCart(
  customerId: string,
  input: { inventoryId: string; vendorId: string; quantity: number }
): Promise<CartResponse> {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const inventory = await prisma.vendorInventory.findUnique({
    where: { id: input.inventoryId },
    include: { vendor: { select: { id: true, verificationStatus: true, isOpen: true } } },
  });

  if (!inventory) throw new NotFoundError('Product');
  if (inventory.vendor.verificationStatus !== 'VERIFIED')
    throw new ValidationError([{ field: 'vendorId', message: 'Vendor is not verified' }]);
  if (!inventory.vendor.isOpen)
    throw new ValidationError([{ field: 'vendorId', message: 'Vendor is currently closed' }]);
  if (inventory.stockQuantity < 1)
    throw new ValidationError([{ field: 'inventoryId', message: 'Product is out of stock' }]);
  if (inventory.stockQuantity < input.quantity) {
    throw new ValidationError([
      { field: 'quantity', message: `Only ${inventory.stockQuantity} units available` },
    ]);
  }

  const cart = await prisma.cart.upsert({
    where: {
      customerId_vendorId: {
        customerId: profile.id,
        vendorId: input.vendorId,
      },
    },
    create: {
      customerId: profile.id,
      vendorId: input.vendorId,
    },
    update: {},
  });

  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_inventoryId: {
        cartId: cart.id,
        inventoryId: input.inventoryId,
      },
    },
  });

  if (existing) {
    const newQty = existing.quantity + input.quantity;
    if (newQty > inventory.stockQuantity) {
      throw new ValidationError([
        { field: 'quantity', message: `Only ${inventory.stockQuantity} units available` },
      ]);
    }
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQty },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        inventoryId: input.inventoryId,
        quantity: input.quantity,
      },
    });
  }

  const result = await getCart(customerId);
  return result!;
}

export async function updateCartItemQuantity(
  customerId: string,
  itemId: string,
  quantity: number
): Promise<CartResponse> {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: {
      cart: true,
      inventory: { include: { cylinderType: true } },
    },
  });

  if (!item) throw new NotFoundError('Cart item');
  if (item.cart.customerId !== profile.id)
    throw new ValidationError([
      { field: 'itemId', message: 'Cart item does not belong to customer' },
    ]);

  if (quantity > item.inventory.stockQuantity) {
    throw new ValidationError([
      { field: 'quantity', message: `Only ${item.inventory.stockQuantity} units available` },
    ]);
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  const result = await getCart(customerId);
  return result!;
}

export async function removeCartItem(
  customerId: string,
  itemId: string
): Promise<CartResponse | null> {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!item) throw new NotFoundError('Cart item');
  if (item.cart.customerId !== profile.id)
    throw new ValidationError([
      { field: 'itemId', message: 'Cart item does not belong to customer' },
    ]);

  await prisma.cartItem.delete({ where: { id: itemId } });

  const remaining = await prisma.cartItem.count({ where: { cartId: item.cartId } });
  if (remaining === 0) {
    await prisma.cart.delete({ where: { id: item.cartId } });
    return null;
  }

  return getCart(customerId);
}

export async function clearCart(customerId: string): Promise<void> {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  await prisma.cartItem.deleteMany({
    where: { cart: { customerId: profile.id } },
  });
  await prisma.cart.deleteMany({
    where: { customerId: profile.id },
  });
}
