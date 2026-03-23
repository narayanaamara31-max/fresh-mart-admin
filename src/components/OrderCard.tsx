import { Order } from '@/types';
import StatusBadge from './StatusBadge';
import { Card } from '@/components/ui/card';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

const OrderCard = ({ order, onClick }: OrderCardProps) => {
  const time = new Date(order.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <Card className="p-4 cursor-pointer active:scale-[0.98] transition-transform" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-sm">{order.orderId}</p>
          <p className="text-xs text-muted-foreground">{order.customerName}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
        <span className="font-semibold text-foreground">₹{order.total}</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{time}</p>
    </Card>
  );
};

export default OrderCard;
