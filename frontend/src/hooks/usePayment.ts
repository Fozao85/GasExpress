import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as paymentService from '../services/payment.service';

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (input: paymentService.InitiatePaymentInput) =>
      paymentService.initiatePayment(input),
  });
}

export function useVerifyPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: paymentService.VerifyPaymentInput) => paymentService.verifyPayment(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['order'] });
    },
  });
}

export function usePayment(id?: string) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentService.getPaymentById(id!),
    enabled: !!id,
  });
}
