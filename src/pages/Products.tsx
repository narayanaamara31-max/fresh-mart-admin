import { useState, useEffect } from 'react';
import { useProductStore } from '@/stores/productStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { products, toggleAvailability, deleteProduct } = useProductStore();
  const { categories } = useCategoryStore();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSkeleton count={4} />;

  let filtered = products;
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  if (catFilter !== 'All') filtered = filtered.filter((p) => p.category === catFilter);

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      toast({ title: 'Deleted', description: 'Product removed successfully.' });
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Products</h1>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', ...categories.map((c) => c.name)].map((c) => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
              catFilter === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No products found" icon={<Package className="h-10 w-10" />} />
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <Card key={p.id} className="p-3 flex items-center gap-3">
              <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-md object-cover bg-muted" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <p className="text-xs font-semibold">₹{p.price}/{p.unit} · Stock: {p.stock}</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={p.isAvailable} onCheckedChange={() => toggleAvailability(p.id)} />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/products/edit/${p.id}`)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Button
        onClick={() => navigate('/products/add')}
        className="fixed bottom-20 right-4 rounded-full h-14 w-14 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Product"
        description="This product will be permanently removed."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Products;
