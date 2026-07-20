import { api } from './api';

export interface AdminDashboard {
  totalCustomers: number;
  totalVendors: number;
  totalRiders: number;
  activeVendors: number;
  onlineRiders: number;
  totalOrders: number;
  pendingOrders: number;
  preparingOrders: number;
  readyOrders: number;
  inTransitOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenueTotal: number;
  averageVendorRating: number;
  averageRiderRating: number;
  lowInventoryVendors: number;
  pendingVendorApprovals: number;
  pendingRiderApprovals: number;
}

export interface AdminUser {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  role: string;
  status: string;
  createdAt: string;
  lastLogin: string | null;
}

export interface AdminUserDetail extends AdminUser {
  customerProfile: { totalSpent?: number; loyaltyPoints?: number } | null;
  vendorProfile: {
    businessName?: string;
    verificationStatus?: string;
    isOpen?: boolean;
    averageRating?: number;
  } | null;
  riderProfile: {
    vehicleType?: string;
    availability?: string;
    averageRating?: number;
    totalDeliveries?: number;
  } | null;
}

export interface PendingVendor {
  id: string;
  businessName: string;
  businessLicense: string | null;
  phone: string;
  address: string;
  ownerName: string;
  ownerPhone: string;
  submittedAt: string;
}

export interface PendingRider {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  vehicleType: string | null;
  licenseNumber: string | null;
  nationalId: string | null;
  registeredAt: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  vendorName: string;
  riderName: string | null;
  total: number;
  deliveryFee: number;
  paymentMethod: string | null;
  paymentStatus: string;
  itemCount: number;
  createdAt: string;
}

export interface AdminOrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  notes: string | null;
  createdAt: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: { name: string; phone: string };
  vendor: { id: string; businessName: string; phone: string; address: string };
  rider: { name: string; phone: string; vehicleType: string | null } | null;
  items: {
    cylinderSize: number;
    description: string | null;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  statusHistory: { id: string; status: string; note: string | null; createdAt: string }[];
  delivery: {
    id: string;
    pickupTime: string | null;
    departureTime: string | null;
    arrivalTime: string | null;
    completionTime: string | null;
  } | null;
}

export interface AdminPromotion {
  id: string;
  title: string;
  discountType: string;
  value: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface PlatformSettings {
  defaultDeliveryFee: number;
  freeDeliveryThreshold: number;
  supportPhone: string | null;
  supportEmail: string | null;
  maintenanceMode: boolean;
  minimumInventoryAlert: number;
}

export interface PaginatedResponse<T> {
  items?: T[];
  users?: T[];
  orders?: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export async function getAdminDashboard(): Promise<AdminDashboard> {
  const { data } = await api.get('/admin/dashboard');
  return data.data;
}

export async function getUsers(params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}): Promise<{
  users: AdminUser[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}> {
  const { data } = await api.get('/admin/users', { params });
  return data.data;
}

export async function getUserById(id: string): Promise<AdminUserDetail> {
  const { data } = await api.get(`/admin/users/${id}`);
  return data.data;
}

export async function updateUserStatus(
  id: string,
  status: string
): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/users/${id}/status`, { status });
  return data.data;
}

export async function deleteUser(id: string): Promise<{ id: string; deleted: boolean }> {
  const { data } = await api.delete(`/admin/users/${id}`);
  return data.data;
}

export async function getPendingVendors(): Promise<PendingVendor[]> {
  const { data } = await api.get('/admin/vendors/pending');
  return data.data.vendors;
}

export async function approveVendor(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/vendors/${id}/approve`);
  return data.data;
}

export async function rejectVendor(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/vendors/${id}/reject`);
  return data.data;
}

export async function suspendVendor(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/vendors/${id}/suspend`);
  return data.data;
}

export async function reactivateVendor(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/vendors/${id}/reactivate`);
  return data.data;
}

export async function getPendingRiders(): Promise<PendingRider[]> {
  const { data } = await api.get('/admin/riders/pending');
  return data.data.riders;
}

export async function approveRider(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/riders/${id}/approve`);
  return data.data;
}

export async function rejectRider(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/riders/${id}/reject`);
  return data.data;
}

export async function suspendRider(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/riders/${id}/suspend`);
  return data.data;
}

export async function reactivateRider(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.patch(`/admin/riders/${id}/reactivate`);
  return data.data;
}

export async function getAdminOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
  vendorId?: string;
  customerId?: string;
  riderId?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<{
  orders: AdminOrder[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}> {
  const { data } = await api.get('/admin/orders', { params });
  return data.data;
}

export async function getAdminOrderDetail(id: string): Promise<AdminOrderDetail> {
  const { data } = await api.get(`/admin/orders/${id}`);
  return data.data;
}

export async function cancelAdminOrder(id: string): Promise<{ id: string; status: string }> {
  const { data } = await api.post(`/admin/orders/${id}/cancel`);
  return data.data;
}

export async function getAdminPromotions(): Promise<AdminPromotion[]> {
  const { data } = await api.get('/admin/promotions');
  return data.data.promotions;
}

export async function createAdminPromotion(input: {
  title: string;
  description?: string;
  discount: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}): Promise<AdminPromotion> {
  const { data } = await api.post('/admin/promotions', input);
  return data.data;
}

export async function updateAdminPromotion(
  id: string,
  input: Partial<{
    title: string;
    description: string;
    discount: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }>
): Promise<AdminPromotion> {
  const { data } = await api.put(`/admin/promotions/${id}`, input);
  return data.data;
}

export async function deleteAdminPromotion(id: string): Promise<{ id: string; deleted: boolean }> {
  const { data } = await api.delete(`/admin/promotions/${id}`);
  return data.data;
}

export async function getPlatformSettings(): Promise<PlatformSettings> {
  const { data } = await api.get('/admin/settings');
  return data.data;
}

export async function updatePlatformSettings(
  input: Partial<PlatformSettings>
): Promise<PlatformSettings> {
  const { data } = await api.patch('/admin/settings', input);
  return data.data;
}
