import { useState, useEffect } from 'react';
import { useOrderStore } from '@/stores/orderStore';
import { useNavigate } from 'react-router-dom';
import OrderCard from '@/components/OrderCard';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { OrderStatus } from '@/types';
import { ShoppingBag } from 'lucide-react';

const statuses: (OrderStatus | 'All')[] = ['All', 'Placed', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];
const dateFilters = ['Today', 'This Week', 'All'] as const;

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [dateFilter, setDateFilter] = useState<typeof dateFilters[number]>('All');
  const { orders } = useOrderStore();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSkeleton count={4} />;

  const now = new Date();
  const today = now.toDateString();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);

  let filtered = orders;
  if (statusFilter !== 'All') {
    filtered = filtered.filter((o) => o.status === statusFilter);
  }
  if (dateFilter === 'Today') {
    filtered = filtered.filter((o) => new Date(o.createdAt).toDateString() === today);
  } else if (dateFilter === 'This Week') {
    filtered = filtered.filter((o) => new Date(o.createdAt) >= weekAgo);
  }

  return (
    <div className="p-4 pb-20 space-y-4">
      <h1 className="text-xl font-bold">Orders</h1>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
              statusFilter === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {dateFilters.map((d) => (
          <button
            key={d}
            onClick={() => setDateFilter(d)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              dateFilter === d ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-card border-border text-muted-foreground'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No orders found" description="Try changing your filters" icon={<ShoppingBag className="h-10 w-10" />} />
      ) : (
        <div className="space-y-2">
          {filtered.map((o) => (
            <OrderCard key={o.orderId} order={o} onClick={() => navigate(`/orders/${o.orderId}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
