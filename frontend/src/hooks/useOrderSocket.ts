import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from './useSocket';

export function useOrderSocket(vendorId?: string, riderId?: string) {
  const qc = useQueryClient();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    if (vendorId) {
      socket.subscribe('vendor', vendorId);
    }
    if (riderId) {
      socket.subscribe('rider', riderId);
    }

    const unsubStatus = socket.on('order:status', () => {
      qc.invalidateQueries({ queryKey: ['vendorOrders'] });
      qc.invalidateQueries({ queryKey: ['order'] });
    });

    const unsubNew = socket.on('order:new', () => {
      qc.invalidateQueries({ queryKey: ['vendorOrders'] });
    });

    return () => {
      unsubStatus();
      unsubNew();
      if (vendorId) socket.unsubscribe('vendor', vendorId);
      if (riderId) socket.unsubscribe('rider', riderId);
    };
  }, [vendorId, riderId]);
}
