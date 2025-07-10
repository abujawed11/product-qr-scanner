// utils/statusColor.ts

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-yellow-500';
    case 'processing':
      return 'text-blue-400';
    case 'shipped':
      return 'text-purple-500';
    case 'delivered':
      return 'text-green-500';
    case 'cancelled':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}
