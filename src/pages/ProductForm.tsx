import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '@/stores/productStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ProductUnit } from '@/types';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  price: z.coerce.number().positive('Must be > 0'),
  unit: z.enum(['kg', 'bunch', 'piece']),
  stock: z.coerce.number().int().min(0, 'Must be ≥ 0'),
  imageUrl: z.string().url('Must be a valid URL'),
  isAvailable: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProductStore();
  const { categories } = useCategoryStore();
  const editing = products.find((p) => p.id === productId);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: editing ? {
      name: editing.name,
      category: editing.category,
      price: editing.price,
      unit: editing.unit,
      stock: editing.stock,
      imageUrl: editing.imageUrl,
      isAvailable: editing.isAvailable,
    } : {
      name: '', category: '', price: 0, unit: 'kg' as ProductUnit, stock: 0, imageUrl: '', isAvailable: true,
    },
  });

  const imageUrl = watch('imageUrl');

  const onSubmit = (data: FormData) => {
    if (editing) {
      updateProduct(editing.id, data);
      toast({ title: 'Updated', description: `${data.name} updated successfully.` });
    } else {
      addProduct({ ...data, id: `p-${Date.now()}` });
      toast({ title: 'Added', description: `${data.name} added successfully.` });
    }
    navigate(-1);
  };

  const units: ProductUnit[] = ['kg', 'bunch', 'piece'];

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">{editing ? 'Edit Product' : 'Add Product'}</h1>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name *</label>
            <Input {...register('name')} placeholder="Enter product name" />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Category *</label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Price (₹) *</label>
              <Input type="number" {...register('price')} />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Stock *</label>
              <Input type="number" {...register('stock')} />
              {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Unit</label>
            <Controller
              control={control}
              name="unit"
              render={({ field }) => (
                <div className="flex gap-2 mt-1">
                  {units.map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => field.onChange(u)}
                      className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                        field.value === u ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Image URL *</label>
            <Input {...register('imageUrl')} placeholder="https://..." />
            {errors.imageUrl && <p className="text-xs text-destructive mt-1">{errors.imageUrl.message}</p>}
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="mt-2 w-20 h-20 rounded-md object-cover bg-muted" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Available</label>
            <Controller control={control} name="isAvailable" render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="flex-1" onClick={handleSubmit(onSubmit)}>Save</Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
