import { useState, useEffect } from 'react';
import { useDeliveryStore } from '@/stores/deliveryStore';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const mobileSchema = z.string().length(10).regex(/^\d+$/);

const DeliveryBoys = () => {
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [active, setActive] = useState(true);
  const [error, setError] = useState('');
  const { deliveryBoys, addDeliveryBoy, toggleActive } = useDeliveryStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSkeleton count={3} />;

  const handleSave = () => {
    if (!name.trim()) { setError('Name is required'); return; }
    const mResult = mobileSchema.safeParse(mobile);
    if (!mResult.success) { setError('Enter a valid 10-digit mobile'); return; }
    addDeliveryBoy({ id: `d-${Date.now()}`, name, mobile, isActive: active, assignedOrders: [] });
    toast({ title: 'Added', description: `${name} added as delivery boy.` });
    setShowAdd(false);
    setName(''); setMobile(''); setActive(true); setError('');
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      <h1 className="text-xl font-bold">Delivery Boys</h1>

      <div className="space-y-2">
        {deliveryBoys.map((d) => (
          <Card key={d.id} className="p-4 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.mobile}</p>
            </div>
            <Badge variant={d.assignedOrders.length > 0 ? 'default' : 'secondary'} className="text-xs">
              {d.assignedOrders.length} orders
            </Badge>
            <Switch checked={d.isActive} onCheckedChange={() => toggleActive(d.id)} />
          </Card>
        ))}
      </div>

      <Button onClick={() => setShowAdd(true)} className="fixed bottom-20 right-4 rounded-full h-14 w-14 shadow-lg" size="icon">
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-[90vw] rounded-lg">
          <DialogHeader><DialogTitle>Add Delivery Boy</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Mobile *</label>
              <Input type="tel" inputMode="numeric" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Active</label>
              <Switch checked={active} onCheckedChange={setActive} />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
          <DialogFooter><Button onClick={handleSave}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryBoys;
