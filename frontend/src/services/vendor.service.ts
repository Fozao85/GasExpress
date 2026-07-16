import { api } from './api';

export interface VendorProfile {
  id: string;
  businessName: string;
  ownerName: string;
  email: string | null;
  phone: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  isOpen: boolean;
  openingTime: string | null;
  closingTime: string | null;
  verificationStatus: string;
  averageRating: number;
  totalOrders: number;
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  cylinderTypeId: string;
  cylinderSize: number;
  description: string | null;
  price: number;
  stockQuantity: number;
  inStock: boolean;
}

export interface Dashboard {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    activeOrders: number;
    completedOrders: number;
    todayOrders: number;
    totalRevenue: number;
    todayRevenue: number;
    lowStockItems: number;
    averageRating: number;
  };
  business: {
    isOpen: boolean;
    verificationStatus: string;
  };
}

export interface VendorOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  status: string;
  paymentMethod: string | null;
  paymentStatus: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes: string | null;
  estimatedDeliveryAt: string | null;
  createdAt: string;
  items: OrderItem[];
  address: { id: string; addressLine: string; city: string | null; region: string | null };
  lastStatus: { id: string; status: string; note: string | null; createdAt: string } | null;
}

export interface VendorOrderDetail extends VendorOrder {
  statusHistory: { id: string; status: string; note: string | null; createdAt: string }[];
}

export interface OrderItem {
  id: string;
  cylinderSize: number;
  description: string | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface VendorOrdersResponse {
  orders: VendorOrder[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface CylinderType {
  id: string;
  name: string;
  sizeKg: number;
  description: string | null;
}

export async function getVendorProfile(): Promise<VendorProfile> {
  const { data } = await api.get('/vendors/me');
  return data.data;
}

export async function updateVendorProfile(input: {
  businessName?: string;
  phone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  isOpen?: boolean;
  openingTime?: string;
  closingTime?: string;
}): Promise<VendorProfile> {
  const { data } = await api.patch('/vendors/me', input);
  return data.data;
}

export async function getVendorInventory(): Promise<InventoryItem[]> {
  const { data } = await api.get('/vendors/me/inventory');
  return data.data.inventory;
}

export async function addInventoryItem(input: {
  cylinderTypeId: string;
  stockQuantity: number;
  price: number;
}): Promise<InventoryItem> {
  const { data } = await api.post('/vendors/me/inventory', input);
  return data.data;
}

export async function updateInventoryItem(
  inventoryId: string,
  input: { stockQuantity?: number; price?: number }
): Promise<InventoryItem> {
  const { data } = await api.patch(`/vendors/me/inventory/${inventoryId}`, input);
  return data.data;
}

export async function deleteInventoryItem(inventoryId: string): Promise<void> {
  await api.delete(`/vendors/me/inventory/${inventoryId}`);
}

export async function getVendorOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<VendorOrdersResponse> {
  const { data } = await api.get('/vendors/me/orders', { params });
  return data.data;
}

export async function getVendorOrderById(id: string): Promise<VendorOrderDetail> {
  const { data } = await api.get(`/vendors/me/orders/${id}`);
  return data.data;
}

export async function updateOrderStatus(
  id: string,
  input: { status: string; note?: string }
): Promise<{ id: string; orderNumber: string; status: string }> {
  const { data } = await api.patch(`/vendors/me/orders/${id}/status`, input);
  return data.data;
}

export async function getVendorDashboard(): Promise<Dashboard> {
  const { data } = await api.get('/vendors/me/dashboard');
  return data.data;
}

export async function listCylinderTypes(): Promise<CylinderType[]> {
  const { data } = await api.get('/categories');
  return data.data.categories;
}
