import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as orderService from '../services/order.service';

export function useCart(enabled?: boolean) {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => orderService.getCart(),
    enabled: enabled ?? true,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { inventoryId: string; vendorId: string; quantity: number }) =>
      orderService.addToCart(input.inventoryId, input.vendorId, input.quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { itemId: string; quantity: number }) =>
      orderService.updateCartItem(input.itemId, input.quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => orderService.removeCartItem(itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => orderService.clearCart(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => orderService.listAddresses(),
  });
}

export function useCreateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { label?: string; addressLine: string; city?: string; region?: string }) =>
      orderService.createAddress(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['addresses'] }),
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      addressId: string;
      paymentMethod: 'CASH' | 'MOBILE_MONEY';
      notes?: string;
    }) => orderService.createOrder(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] });
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useOrders(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderService.listOrders(params),
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id!),
    enabled: !!id,
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderService.cancelOrder(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] });
      qc.invalidateQueries({ queryKey: ['order'] });
    },
  });
}

export function useOrderStatusHistory(id: string | undefined) {
  return useQuery({
    queryKey: ['order', id, 'status'],
    queryFn: () => orderService.getOrderStatusHistory(id!),
    enabled: !!id,
  });
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (orderId: string) => orderService.initiatePayment(orderId),
  });
}
