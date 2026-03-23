import { OrderStatus } from '@/types';

export const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
  'Placed': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'Confirmed': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'Out for Delivery': { bg: 'bg-orange-100', text: 'text-orange-800' },
  'Delivered': { bg: 'bg-green-100', text: 'text-green-800' },
  'Cancelled': { bg: 'bg-red-100', text: 'text-red-800' },
};

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  const colors = statusColors[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
