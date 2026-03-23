import { useState, useEffect } from 'react';
import { useCategoryStore } from '@/stores/categoryStore';
import { useProductStore } from '@/stores/productStore';
import ConfirmDialog from '@/components/ConfirmDialog';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState<{ id?: string; name: string; imageUrl: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore();
  const { products } = useProductStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSkeleton count={4} />;

  const handleSave = () => {
    if (!editModal || !editModal.name.trim()) return;
    if (editModal.id) {
      updateCategory(editModal.id, { name: editModal.name, imageUrl: editModal.imageUrl });
      toast({ title: 'Updated', description: 'Category updated.' });
    } else {
      addCategory({ id: `cat-${Date.now()}`, name: editModal.name, imageUrl: editModal.imageUrl });
      toast({ title: 'Added', description: 'Category added.' });
    }
    setEditModal(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCategory(deleteId);
      toast({ title: 'Deleted', description: 'Category removed.' });
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      <h1 className="text-xl font-bold">Categories</h1>

      <div className="space-y-2">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.name).length;
          return (
            <Card key={c.id} className="p-3 flex items-center gap-3">
              <img src={c.imageUrl} alt={c.name} className="w-12 h-12 rounded-md object-cover bg-muted" />
              <div className="flex-1">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{count} products</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditModal({ id: c.id, name: c.name, imageUrl: c.imageUrl })}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(c.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          );
        })}
      </div>

      <Button onClick={() => setEditModal({ name: '', imageUrl: '' })} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" /> Add Category
      </Button>

      <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
        <DialogContent className="max-w-[90vw] rounded-lg">
          <DialogHeader>
            <DialogTitle>{editModal?.id ? 'Edit' : 'Add'} Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input value={editModal?.name ?? ''} onChange={(e) => setEditModal((m) => m ? { ...m, name: e.target.value } : m)} />
            </div>
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input value={editModal?.imageUrl ?? ''} onChange={(e) => setEditModal((m) => m ? { ...m, imageUrl: e.target.value } : m)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} disabled={!editModal?.name.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Category" description="This will permanently remove the category." confirmLabel="Delete" destructive onConfirm={handleDelete} />
    </div>
  );
};

export default Categories;
