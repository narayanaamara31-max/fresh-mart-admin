import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useProductStore } from '@/src/stores/productStore';
import { useCategoryStore } from '@/src/stores/categoryStore';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { Plus, Package, Pencil, Trash2 } from 'lucide-react-native';
import { Product } from '@/src/types';

const Products = () => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const { products, toggleAvailability, deleteProduct } = useProductStore();
  const { categories } = useCategoryStore();
  const router = useRouter();

  let filtered = products;
  if (search) filtered = filtered.filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()));
  if (catFilter !== 'All') filtered = filtered.filter((p: Product) => p.category === catFilter);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Product",
      "This product will be permanently removed.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            deleteProduct(id);
          } 
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="p-4 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {['All', ...categories.map((c) => c.name)].map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCatFilter(c)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                catFilter === c ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'
              }`}
            >
              <Text className={`text-xs font-bold ${catFilter === c ? 'text-white' : 'text-slate-500'}`}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList<Product>
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 mb-2">
            <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-row items-center">
              <Image 
                source={{ uri: item.imageUrl }} 
                className="w-14 h-14 rounded-lg bg-slate-100 mr-4" 
                resizeMode="cover"
              />
              <View className="flex-1 mr-2">
                <Text className="text-sm font-bold text-slate-900" numberOfLines={1}>{item.name}</Text>
                <Text className="text-[10px] text-slate-500 mb-1">{item.category}</Text>
                <Text className="text-xs font-bold text-blue-600">₹{item.price}/{item.unit} · Stock: {item.stock}</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} />
                <TouchableOpacity 
                   onPress={() => router.push(`/(app)/products/edit/${item.id}`)}
                   className="p-2"
                >
                  <Pencil size={18} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity 
                   onPress={() => handleDelete(item.id)}
                   className="p-2"
                >
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Package size={48} color="#cbd5e1" />
            <Text className="text-lg font-bold text-slate-900 mt-4">No products found</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        onPress={() => router.push('/(app)/products/add')}
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full items-center justify-center shadow-lg"
      >
        <Plus size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Products;
