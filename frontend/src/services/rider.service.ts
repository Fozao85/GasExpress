import { api } from './api';

export interface RiderProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  vehicleType: string | null;
  licenseNumber: string | null;
  nationalId: string | null;
  availability: 'ONLINE' | 'OFFLINE' | 'BUSY';
  latitude: number | null;
  longitude: number | null;
  averageRating: number;
  totalDeliveries: number;
  createdAt: string;
}

export interface AvailableOrder {
  id: string;
  orderNumber: string;
  vendorName: string;
  vendorAddress: string;
  vendorPhone: string;
  vendorLatitude: number | null;
  vendorLongitude: number | null;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string | null;
  createdAt: string;
  items: { cylinderSize: number; description: string | null; quantity: number }[];
  deliveryAddress: {
    addressLine: string;
    city: string | null;
    region: string | null;
    latitude: number | null;
    longitude: number | null;
  };
}

export interface RiderOrder {
  id: string;
  orderNumber: string;
  status: string;
  vendorName: string;
  vendorAddress: string;
  vendorPhone: string;
  vendorLatitude: number | null;
  vendorLongitude: number | null;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string | null;
  createdAt: string;
  items: { cylinderSize: number; description: string | null; quantity: number }[];
  deliveryAddress: {
    addressLine: string;
    city: string | null;
    region: string | null;
    latitude: number | null;
    longitude: number | null;
  };
  recentStatuses?: { status: string; note: string | null; createdAt: string }[];
}

export interface RiderOrderDetail extends RiderOrder {
  customerName: string;
  customerPhone: string;
  notes: string | null;
  estimatedDeliveryAt: string | null;
  paymentStatus: string;
  statusHistory: { id: string; status: string; note: string | null; createdAt: string }[];
  delivery: {
    id: string;
    pickupTime: string | null;
    departureTime: string | null;
    arrivalTime: string | null;
    completionTime: string | null;
    lastTracking: { id: string; latitude: number; longitude: number; timestamp: string } | null;
  } | null;
}

export interface DeliveryHistoryItem {
  id: string;
  orderNumber: string;
  vendorName: string;
  total: number;
  createdAt: string;
  items: { cylinderSize: number; description: string | null; quantity: number }[];
  pickupTime: string | null;
  completionTime: string | null;
}

export interface DeliveryHistoryResponse {
  deliveries: DeliveryHistoryItem[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface RiderDashboard {
  stats: {
    availability: string;
    activeDeliveries: number;
    todayDeliveries: number;
    totalDeliveries: number;
    todayEarnings: number;
    totalEarnings: number;
    averageRating: number;
    availableOrders: number;
  };
}

export async function getRiderProfile(): Promise<RiderProfile> {
  const { data } = await api.get('/riders/me/profile');
  return data.data;
}

export async function updateRiderProfile(input: {
  vehicleType?: string;
  licenseNumber?: string;
  nationalId?: string;
}): Promise<RiderProfile> {
  const { data } = await api.patch('/riders/me/profile', input);
  return data.data;
}

export async function updateAvailability(input: {
  availability: 'ONLINE' | 'OFFLINE';
  latitude?: number;
  longitude?: number;
}): Promise<{ availability: string }> {
  const { data } = await api.patch('/riders/me/availability', input);
  return data.data;
}

export async function getAvailableOrders(): Promise<AvailableOrder[]> {
  const { data } = await api.get('/riders/me/available-orders');
  return data.data.orders;
}

export async function acceptOrder(
  orderId: string
): Promise<{ id: string; orderNumber: string; status: string }> {
  const { data } = await api.post(`/riders/me/orders/${orderId}/accept`);
  return data.data;
}

export async function getMyOrders(): Promise<RiderOrder[]> {
  const { data } = await api.get('/riders/me/orders');
  return data.data.orders;
}

export async function getRiderOrderById(id: string): Promise<RiderOrderDetail> {
  const { data } = await api.get(`/riders/me/orders/${id}`);
  return data.data;
}

export async function updateDeliveryStatus(
  id: string,
  input: { status: string; note?: string; latitude?: number; longitude?: number }
): Promise<{ id: string; orderNumber: string; status: string }> {
  const { data } = await api.patch(`/riders/me/orders/${id}/status`, input);
  return data.data;
}

export async function submitTracking(
  orderId: string,
  input: { latitude: number; longitude: number }
): Promise<{ id: string; latitude: number; longitude: number; timestamp: string }> {
  const { data } = await api.post(`/riders/me/orders/${orderId}/tracking`, input);
  return data.data;
}

export async function getDeliveryHistory(params?: {
  page?: number;
  limit?: number;
}): Promise<DeliveryHistoryResponse> {
  const { data } = await api.get('/riders/me/history', { params });
  return data.data;
}

export async function getRiderDashboard(): Promise<RiderDashboard> {
  const { data } = await api.get('/riders/me/dashboard');
  return data.data;
}

export async function rejectOrder(
  orderId: string
): Promise<{ id: string; orderNumber: string; status: string }> {
  const { data } = await api.post(`/riders/me/orders/${orderId}/reject`);
  return data.data;
}

export async function updateRiderLocation(input: {
  latitude: number;
  longitude: number;
}): Promise<{ latitude: number; longitude: number }> {
  const { data } = await api.patch('/riders/me/location', input);
  return data.data;
}

export interface RiderEarnings {
  periods: {
    today: { earnings: number; deliveries: number };
    week: { earnings: number; deliveries: number };
    month: { earnings: number; deliveries: number };
    allTime: { earnings: number; deliveries: number };
  };
  recentDeliveries: {
    id: string;
    orderNumber: string;
    vendorName: string;
    amount: number;
    completedAt: string;
  }[];
}

export async function getRiderEarnings(): Promise<RiderEarnings> {
  const { data } = await api.get('/riders/me/earnings');
  return data.data;
}
