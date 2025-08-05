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


export const getOrderStatusColor = (status?: string) => {
    if (!status) return "#9ca3af";
    const s = status.toLowerCase();
    if (s === "completed" || s === "delivered" || s === "done") return "#22c55e";
    if (s === "partial" || s === "processing" || s === "planned") return "#fde047";
    if (s === "pending") return "#FFC107";
    if (s === "cancelled" || s === "no" || s === "rejected") return "#ef4444";
    return "#5e8bc9ff";
};