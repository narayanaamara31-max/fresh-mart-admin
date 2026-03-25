import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProductStore } from '@/src/stores/productStore';
import { useCategoryStore } from '@/src/stores/categoryStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { ArrowLeft } from 'lucide-react-native';
import { ProductUnit, Product, Category } from '@/src/types';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  price: z.coerce.number().positive('Must be > 0'),
  unit: z.enum(['kg', 'bunch', 'piece']),
  stock: z.coerce.number().int().min(0, 'Must be ≥ 0'),
  imageUrl: z.string().url('Must be a valid URL'),
  isAvailable: z.boolean(),
});

type FormOutput = z.infer<typeof schema>;
type FormInput = z.input<typeof schema>;

const ProductForm = () => {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const { products, addProduct, updateProduct } = useProductStore();
  const { categories } = useCategoryStore();
  const editing = products.find((p) => p.id === productId);

  const { handleSubmit, control, watch, formState: { errors } } = useForm<FormInput, any, FormOutput>({
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

  const onSubmit = (data: FormOutput) => {
    if (editing) {
      updateProduct(editing.id, data);
      Alert.alert("Success", `${data.name} updated successfully.`);
    } else {
      addProduct({ ...data, id: `p-${Date.now()}` } as Product);
      Alert.alert("Success", `${data.name} added successfully.`);
    }
    router.back();
  };

  const units: ProductUnit[] = ['kg', 'bunch', 'piece'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="space-y-6">
          <View>
            <Text className="text-sm font-bold text-slate-700 mb-2">Product Name *</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChangeText={onChange} placeholder="Enter product name" />
              )}
            />
            {errors.name && <Text className="text-xs text-red-500 mt-1">{errors.name.message}</Text>}
          </View>

          <View>
            <Text className="text-sm font-bold text-slate-700 mb-2">Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {categories.map((c) => (
                <Controller
                  key={c.id}
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      onPress={() => onChange(c.name)}
                      className={`px-4 py-2 rounded-full mr-2 border ${
                        value === c.name ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'
                      }`}
                    >
                      <Text className={`text-xs font-bold ${value === c.name ? 'text-white' : 'text-slate-500'}`}>{c.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              ))}
            </ScrollView>
            {errors.category && <Text className="text-xs text-red-500 mt-1">{errors.category.message}</Text>}
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-sm font-bold text-slate-700 mb-2">Price (₹) *</Text>
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input value={String(value)} onChangeText={onChange} keyboardType="numeric" />
                )}
              />
              {errors.price && <Text className="text-xs text-red-500 mt-1">{errors.price.message}</Text>}
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-slate-700 mb-2">Stock *</Text>
              <Controller
                control={control}
                name="stock"
                render={({ field: { onChange, value } }) => (
                  <Input value={String(value)} onChangeText={onChange} keyboardType="numeric" />
                )}
              />
              {errors.stock && <Text className="text-xs text-red-500 mt-1">{errors.stock.message}</Text>}
            </View>
          </View>

          <View>
            <Text className="text-sm font-bold text-slate-700 mb-2">Unit</Text>
            <View className="flex-row space-x-2">
              {units.map((u) => (
                <Controller
                   key={u}
                   control={control}
                   name="unit"
                   render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      onPress={() => onChange(u)}
                      className={`px-6 py-2 rounded-lg border ${
                        value === u ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'
                      }`}
                    >
                      <Text className={`text-sm font-bold ${value === u ? 'text-white' : 'text-slate-500'}`}>{u}</Text>
                    </TouchableOpacity>
                   )}
                />
              ))}
            </View>
          </View>

          <View>
            <Text className="text-sm font-bold text-slate-700 mb-2">Image URL *</Text>
            <Controller
              control={control}
              name="imageUrl"
              render={({ field: { onChange, value } }) => (
                <Input value={value} onChangeText={onChange} placeholder="https://..." />
              )}
            />
            {errors.imageUrl && <Text className="text-xs text-red-500 mt-1">{errors.imageUrl.message}</Text>}
            {imageUrl && imageUrl.startsWith('http') && (
              <Image source={{ uri: imageUrl }} className="mt-4 w-32 h-32 rounded-xl bg-slate-100" resizeMode="cover" />
            )}
          </View>

          <View className="flex-row items-center justify-between bg-slate-50 p-4 rounded-xl">
            <Text className="text-sm font-bold text-slate-700">Available</Text>
            <Controller 
              control={control} 
              name="isAvailable" 
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onCheckedChange={onChange} />
              )} 
            />
          </View>

          <View className="flex-row space-x-4 pt-4">
            <Button className="flex-1" onPress={handleSubmit(onSubmit)}>Save Product</Button>
            <Button variant="outline" className="flex-1" onPress={() => router.back()}>Cancel</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductForm;
