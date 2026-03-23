import { useState, useEffect } from 'react';
import { useOrderStore } from '@/stores/orderStore';
import { useProductStore } from '@/stores/productStore';
import { useNavigate } from 'react-router-dom';
import StatCard from '@/components/StatCard';
import OrderCard from '@/components/OrderCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { ShoppingCart, IndianRupee, Clock, Truck, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { orders } = useOrderStore();
  const { products } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSkeleton count={6} />;

  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Placed').length;
  const ofdOrders = orders.filter((o) => o.status === 'Out for Delivery').length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const lowStock = products.filter((p) => p.stock < 10);

  return (
    <div className="p-4 pb-20 space-y-6">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={ShoppingCart} label="Today's Orders" value={todayOrders.length} />
        <StatCard icon={IndianRupee} label="Today's Revenue" value={`₹${todayRevenue}`} />
        <StatCard icon={Clock} label="Pending Orders" value={pendingOrders} />
        <StatCard icon={Truck} label="Out for Delivery" value={ofdOrders} />
      </div>

      <section>
        <h2 className="text-base font-semibold mb-3">Recent Orders</h2>
        <div className="space-y-2">
          {recentOrders.map((o) => (
            <OrderCard key={o.orderId} order={o} onClick={() => navigate(`/orders/${o.orderId}`)} />
          ))}
        </div>
      </section>

      {lowStock.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Low Stock Alerts
          </h2>
          <div className="space-y-2">
            {lowStock.map((p) => (
              <Card key={p.id} className="p-3 border-destructive/30 bg-destructive/5 cursor-pointer" onClick={() => navigate(`/products/edit/${p.id}`)}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-xs font-bold text-destructive">Stock: {p.stock}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
