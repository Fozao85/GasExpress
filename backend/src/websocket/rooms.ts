export const RoomPrefix = {
  ORDER: 'order:',
  VENDOR: 'vendor:',
  RIDER: 'rider:',
  USER: 'user:',
} as const;

export function orderRoom(orderId: string): string {
  return `${RoomPrefix.ORDER}${orderId}`;
}

export function vendorRoom(vendorId: string): string {
  return `${RoomPrefix.VENDOR}${vendorId}`;
}

export function riderRoom(riderId: string): string {
  return `${RoomPrefix.RIDER}${riderId}`;
}

export function userRoom(userId: string): string {
  return `${RoomPrefix.USER}${userId}`;
}
