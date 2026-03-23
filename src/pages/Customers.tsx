import { useState, useEffect } from 'react';
import { useCustomerStore } from '@/stores/customerStore';
import { useOrderStore } from '@/stores/orderStore';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import StatusBadge from '@/components/StatusBadge';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users } from 'lucide-react';
import { Customer } from '@/types';

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);
  const { customers } = useCustomerStore();
  const { orders } = useOrderStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSkeleton count={4} />;

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search)
  );

  const customerOrders = selected ? orders.filter((o) => o.customerId === selected.id) : [];

  return (
    <div className="p-4 pb-20 space-y-4">
      <h1 className="text-xl font-bold">Customers</h1>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or mobile..." />

      {filtered.length === 0 ? (
        <EmptyState title="No customers found" icon={<Users className="h-10 w-10" />} />
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <Card key={c.id} className="p-4 cursor-pointer" onClick={() => setSelected(c)}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.mobile}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant="secondary" className="text-xs">{c.totalOrders} orders</Badge>
                  <span className="text-sm font-semibold">₹{c.totalSpent}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[90vw] rounded-lg max-h-[80vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <p className="text-sm"><span className="font-medium">Mobile:</span> {selected.mobile}</p>
                <div>
                  <p className="text-sm font-medium mb-1">Addresses</p>
                  {selected.addresses.map((a, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{a}</p>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Order History</p>
                  {customerOrders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No orders found.</p>
                  ) : (
                    <div className="space-y-2">
                      {customerOrders.map((o) => (
                        <div key={o.orderId} className="flex justify-between items-center text-sm border-b pb-2">
                          <div>
                            <p className="font-medium">{o.orderId}</p>
                            <p className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString('en-IN')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">₹{o.total}</span>
                            <StatusBadge status={o.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
