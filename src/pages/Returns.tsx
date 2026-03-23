import { useState, useEffect } from 'react';
import { useReturnStore } from '@/stores/returnStore';
import { ReturnRequest, ReturnStatus } from '@/types';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ConfirmDialog from '@/components/ConfirmDialog';
import StatusBadge from '@/components/StatusBadge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const tabs: ReturnStatus[] = ['Pending', 'Approved', 'Rejected'];

const Returns = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<ReturnStatus>('Pending');
  const [selected, setSelected] = useState<ReturnRequest | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; status: ReturnStatus } | null>(null);
  const { returns, updateReturnStatus } = useReturnStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSkeleton count={3} />;

  const filtered = returns.filter((r) => r.status === tab);

  const handleAction = () => {
    if (confirmAction) {
      updateReturnStatus(confirmAction.id, confirmAction.status);
      toast({ title: confirmAction.status === 'Approved' ? 'Return Approved' : 'Return Rejected' });
      setConfirmAction(null);
      setSelected(null);
    }
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      <h1 className="text-xl font-bold">Returns</h1>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors flex-1 ${
              tab === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={`No ${tab.toLowerCase()} returns`} icon={<RotateCcw className="h-10 w-10" />} />
      ) : (
        <div className="space-y-2">
          {filtered.map((r) => (
            <Card key={r.id} className="p-4 cursor-pointer" onClick={() => setSelected(r)}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold">{r.orderId}</p>
                  <p className="text-xs text-muted-foreground">{r.customerName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.reason}</p>
                </div>
                <p className="text-[10px] text-muted-foreground">{new Date(r.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[90vw] rounded-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Return: {selected.orderId}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <p className="text-sm"><span className="font-medium">Customer:</span> {selected.customerName}</p>
                <p className="text-sm"><span className="font-medium">Reason:</span> {selected.reason}</p>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <img src={selected.photoUrl} alt="Proof" className="w-full h-40 object-cover rounded-md bg-muted" />
                {selected.status === 'Pending' && (
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setConfirmAction({ id: selected.id, status: 'Approved' })}>
                      Approve
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => setConfirmAction({ id: selected.id, status: 'Rejected' })}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={() => setConfirmAction(null)}
        title={confirmAction?.status === 'Approved' ? 'Approve Return' : 'Reject Return'}
        description={`Are you sure you want to ${confirmAction?.status === 'Approved' ? 'approve' : 'reject'} this return?`}
        confirmLabel={confirmAction?.status === 'Approved' ? 'Approve' : 'Reject'}
        destructive={confirmAction?.status === 'Rejected'}
        onConfirm={handleAction}
      />
    </div>
  );
};

export default Returns;
