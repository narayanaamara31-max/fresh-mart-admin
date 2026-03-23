import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '@/stores/orderStore';
import { useDeliveryStore } from '@/stores/deliveryStore';
import StatusBadge from '@/components/StatusBadge';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { OrderStatus } from '@/types';
import { toast } from '@/hooks/use-toast';

const allStatuses: OrderStatus[] = ['Placed', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, assignDeliveryBoy } = useOrderStore();
  const { deliveryBoys } = useDeliveryStore();
  const order = orders.find((o) => o.orderId === orderId);

  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [selectedDb, setSelectedDb] = useState('');

  if (!order) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
        <p className="mt-4 text-muted-foreground">Order not found.</p>
      </div>
    );
  }

  const handleStatusConfirm = () => {
    if (newStatus) {
      updateOrderStatus(order.orderId, newStatus);
      toast({ title: 'Status Updated', description: `Order ${order.orderId} is now "${newStatus}".` });
    }
    setConfirmStatus(false);
    setNewStatus('');
  };

  const handleAssign = () => {
    if (selectedDb) {
      assignDeliveryBoy(order.orderId, selectedDb);
      const dbName = deliveryBoys.find((d) => d.id === selectedDb)?.name;
      toast({ title: 'Assigned', description: `${dbName} assigned to ${order.orderId}.` });
    }
  };

  const activeDeliveryBoys = deliveryBoys.filter((d) => d.isActive);

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">{order.orderId}</h1>
        <StatusBadge status={order.status} />
      </div>

      <Card className="p-4 space-y-1">
        <p className="text-sm"><span className="text-muted-foreground">Date:</span> {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
        <p className="text-sm"><span className="text-muted-foreground">Payment:</span> {order.paymentMethod}</p>
        <p className="text-sm"><span className="text-muted-foreground">Customer:</span> {order.customerName}</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-2">Items</h3>
        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{item.productName} × {item.qty} {item.unit}</span>
              <span className="font-medium">₹{item.lineTotal}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{order.discount}</span></div>}
          <div className="flex justify-between"><span>Delivery</span><span>₹{order.deliveryCharge}</span></div>
          <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>₹{order.total}</span></div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-1">Delivery Address</h3>
        <p className="text-sm text-muted-foreground">{order.address}</p>
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Update Status</h3>
        <Select value={newStatus} onValueChange={(v) => { setNewStatus(v as OrderStatus); setConfirmStatus(true); }}>
          <SelectTrigger><SelectValue placeholder="Change status..." /></SelectTrigger>
          <SelectContent>
            {allStatuses.filter((s) => s !== order.status).map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Assign Delivery Boy</h3>
        <Select value={selectedDb} onValueChange={setSelectedDb}>
          <SelectTrigger><SelectValue placeholder="Select delivery boy..." /></SelectTrigger>
          <SelectContent>
            {activeDeliveryBoys.map((d) => (
              <SelectItem key={d.id} value={d.id}>{d.name} ({d.mobile})</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={handleAssign} disabled={!selectedDb}>Assign</Button>
      </Card>

      <ConfirmDialog
        open={confirmStatus}
        onOpenChange={setConfirmStatus}
        title="Update Order Status"
        description={`Change status to "${newStatus}"?`}
        confirmLabel="Update"
        onConfirm={handleStatusConfirm}
      />
    </div>
  );
};

export default OrderDetail;
