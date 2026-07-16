import { api } from './api';

export interface CartItem {
  id: string;
  inventoryId: string;
  cylinderSize: number;
  description: string | null;
  price: number;
  quantity: number;
  stockQuantity: number;
  inStock: boolean;
}

export interface Cart {
  id: string;
  vendorId: string;
  vendorName: string;
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}

export interface Address {
  id: string;
  label: string | null;
  addressLine: string;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  cylinderSize: number;
  description: string | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string | null;
  paymentStatus: string;
  notes: string | null;
  estimatedDeliveryAt: string | null;
  createdAt: string;
  vendor: { id: string; businessName: string; phone: string; address: string };
  address: {
    id: string;
    label: string | null;
    addressLine: string;
    city: string | null;
    region: string | null;
  };
  items: OrderItem[];
  payment: { id: string; paymentMethod: string; amount: number; paymentStatus: string } | null;
  statusHistory: { id: string; status: string; note: string | null; createdAt: string }[];
}

export interface OrderListResponse {
  orders: Order[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface PaymentInfo {
  paymentId: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  authorizationUrl: string | null;
}

// Cart API
export async function getCart(): Promise<Cart | null> {
  const { data } = await api.get('/cart');
  return data.data;
}

export async function addToCart(
  inventoryId: string,
  vendorId: string,
  quantity: number
): Promise<Cart> {
  const { data } = await api.post('/cart', { inventoryId, vendorId, quantity });
  return data.data;
}

export async function updateCartItem(itemId: string, quantity: number): Promise<Cart> {
  const { data } = await api.put(`/cart/${itemId}`, { quantity });
  return data.data;
}

export async function removeCartItem(itemId: string): Promise<Cart | null> {
  const { data } = await api.delete(`/cart/${itemId}`);
  return data.data;
}

export async function clearCart(): Promise<void> {
  await api.delete('/cart');
}

// Address API
export async function listAddresses(): Promise<Address[]> {
  const { data } = await api.get('/addresses');
  return data.data.addresses;
}

export async function createAddress(input: {
  label?: string;
  addressLine: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}): Promise<Address> {
  const { data } = await api.post('/addresses', input);
  return data.data;
}

// Order API
export async function createOrder(input: {
  addressId: string;
  paymentMethod: 'CASH' | 'MOBILE_MONEY';
  notes?: string;
}): Promise<Order> {
  const { data } = await api.post('/orders', input);
  return data.data;
}

export async function listOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<OrderListResponse> {
  const { data } = await api.get('/orders', { params });
  return data.data;
}

export async function getOrderById(id: string): Promise<Order> {
  const { data } = await api.get(`/orders/${id}`);
  return data.data;
}

export async function cancelOrder(id: string): Promise<Order> {
  const { data } = await api.post(`/orders/${id}/cancel`);
  return data.data;
}

export async function getOrderStatusHistory(
  id: string
): Promise<{ id: string; status: string; note: string | null; createdAt: string }[]> {
  const { data } = await api.get(`/orders/${id}/status`);
  return data.data;
}

// Payment API
export async function initiatePayment(orderId: string): Promise<PaymentInfo> {
  const { data } = await api.post('/payments/initiate', { orderId });
  return data.data;
}

export async function getPaymentById(id: string): Promise<PaymentInfo> {
  const { data } = await api.get(`/payments/${id}`);
  return data.data;
}
