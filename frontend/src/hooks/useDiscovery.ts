import { useQuery } from '@tanstack/react-query';
import * as discoveryService from '../services/discovery.service';

export function useVendors(params: discoveryService.ListVendorsParams) {
  return useQuery({
    queryKey: ['vendors', params],
    queryFn: () => discoveryService.listVendors(params),
  });
}

export function useNearbyVendors(params: discoveryService.NearbyVendorsParams) {
  return useQuery({
    queryKey: ['vendors', 'nearby', params],
    queryFn: () => discoveryService.getNearbyVendors(params),
  });
}

export function useVendorDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: () => discoveryService.getVendorById(id!),
    enabled: !!id,
  });
}

export function useSearchVendors(params: discoveryService.SearchVendorsParams) {
  return useQuery({
    queryKey: ['vendors', 'search', params],
    queryFn: () => discoveryService.searchVendors(params),
    enabled: params.q.length > 0,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => discoveryService.listCategories(),
  });
}

export function useCategoryProducts(id: string | undefined) {
  return useQuery({
    queryKey: ['categories', id, 'products'],
    queryFn: () => discoveryService.getProductsByCategory(id!),
    enabled: !!id,
  });
}

export function usePromotions() {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: () => discoveryService.listPromotions(),
  });
}
