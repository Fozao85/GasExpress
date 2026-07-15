import { api } from './api';

export interface VendorListItem {
  id: string;
  businessName: string;
  phone: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  averageRating: number;
  isOpen: boolean;
  distance?: number;
  eta?: number;
  lowestPrice?: number;
  availableProducts: number;
}

export interface VendorDetail {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string | null;
  address: string;
  latitude: number | null;
  longitude: number | null;
  averageRating: number;
  isOpen: boolean;
  openingTime: string | null;
  closingTime: string | null;
  lowestPrice: number | null;
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

export interface Category {
  id: string;
  name: string;
  sizeKg: number;
  description: string | null;
}

export interface Promotion {
  id: string;
  title: string;
  discountType: string;
  value: number;
  validUntil: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface VendorListResponse {
  vendors: VendorListItem[];
  pagination: PaginationInfo;
}

export interface NearbyVendorsResponse {
  vendors: VendorListItem[];
}

export interface ProductItem {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorAddress: string;
  vendorRating: number;
  vendorIsOpen: boolean;
  size?: number;
  price: number;
  stockQuantity: number;
  inStock: boolean;
}

export interface ListVendorsParams {
  page?: number;
  limit?: number;
  lat?: number;
  lng?: number;
  radius?: number;
  sort?: 'distance' | 'speed' | 'rating' | 'price';
  category?: string;
  availability?: 'open' | 'all';
  q?: string;
}

export interface NearbyVendorsParams {
  lat: number;
  lng: number;
  radius?: number;
  limit?: number;
}

export interface SearchVendorsParams {
  q: string;
  lat?: number;
  lng?: number;
  page?: number;
  limit?: number;
}

export async function listVendors(params: ListVendorsParams) {
  const { data } = await api.get('/vendors', { params });
  return data.data as VendorListResponse;
}

export async function getNearbyVendors(params: NearbyVendorsParams) {
  const { data } = await api.get('/vendors/nearby', { params });
  return data.data as NearbyVendorsResponse;
}

export async function getVendorById(id: string) {
  const { data } = await api.get(`/vendors/${id}`);
  return data.data as VendorDetail;
}

export async function searchVendors(params: SearchVendorsParams) {
  const { data } = await api.get('/vendors/search', { params });
  return data.data as VendorListResponse;
}

export async function getVendorAvailability(id: string) {
  const { data } = await api.get(`/vendors/${id}/availability`);
  return data.data as {
    isOpen: boolean;
    openingTime: string | null;
    closingTime: string | null;
    stockStatus: string;
    totalProducts: number;
  };
}

export async function listCategories() {
  const { data } = await api.get('/categories');
  return data.data.categories as Category[];
}

export async function getProductsByCategory(id: string) {
  const { data } = await api.get(`/categories/${id}/products`);
  return data.data.products as ProductItem[];
}

export async function listPromotions() {
  const { data } = await api.get('/promotions');
  return data.data.promotions as Promotion[];
}
