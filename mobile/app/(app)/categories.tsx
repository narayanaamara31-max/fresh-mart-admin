import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, SafeAreaView, Alert } from 'react-native';
import { useCategoryStore } from '@/src/stores/categoryStore';
import { useProductStore } from '@/src/stores/productStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Pencil, Trash2, Plus, X } from 'lucide-react-native';
import { Product } from '@/src/types';

const Categories = () => {
  const [editModal, setEditModal] = useState<{ id?: string; name: string; imageUrl: string } | null>(null);
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore();
  const { products } = useProductStore();

  const handleSave = () => {
    if (!editModal || !editModal.name.trim()) return;
    if (editModal.id) {
      updateCategory(editModal.id, { name: editModal.name, imageUrl: editModal.imageUrl });
      Alert.alert("Success", "Category updated.");
    } else {
      addCategory({ id: `cat-${Date.now()}`, name: editModal.name, imageUrl: editModal.imageUrl });
      Alert.alert("Success", "Category added.");
    }
    setEditModal(null);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Category",
      "This will permanently remove the category.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            deleteCategory(id);
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 p-4">
        <View className="space-y-3 pb-20">
          {categories.map((c) => {
            const count = products.filter((p: Product) => p.category === c.name).length;
            return (
              <View key={c.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-row items-center">
                <Image 
                  source={{ uri: c.imageUrl }} 
                  className="w-12 h-12 rounded-lg bg-slate-100 mr-4" 
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900">{c.name}</Text>
                  <Text className="text-xs text-slate-500">{count} products</Text>
                </View>
                <TouchableOpacity 
                   onPress={() => setEditModal({ id: c.id, name: c.name, imageUrl: c.imageUrl })}
                   className="p-2"
                >
                  <Pencil size={18} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity 
                   onPress={() => handleDelete(c.id)}
                   className="p-2"
                >
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="p-4 bg-white border-t border-slate-100">
        <Button 
          onPress={() => setEditModal({ name: '', imageUrl: '' })} 
          className="w-full" 
          variant="outline"
        >
          <Plus size={18} color="#2563eb" className="mr-2" />
          <Text className="text-blue-600 font-bold ml-2">Add Category</Text>
        </Button>
      </View>

      <Modal
        visible={!!editModal}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModal(null)}
      >
        <View className="flex-1 bg-black/40 justify-center p-6">
          <View className="bg-white rounded-2xl p-6 shadow-xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold text-slate-900">{editModal?.id ? 'Edit' : 'Add'} Category</Text>
              <TouchableOpacity onPress={() => setEditModal(null)}>
                <X size={24} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4 mb-8">
              <View>
                <Text className="text-sm font-bold text-slate-700 mb-2">Name *</Text>
                <Input 
                  value={editModal?.name ?? ''} 
                  onChangeText={(text) => setEditModal((m) => m ? { ...m, name: text } : m)} 
                  placeholder="Category Name"
                />
              </View>
              <View>
                <Text className="text-sm font-bold text-slate-700 mb-2">Image URL</Text>
                <Input 
                  value={editModal?.imageUrl ?? ''} 
                  onChangeText={(text) => setEditModal((m) => m ? { ...m, imageUrl: text } : m)} 
                  placeholder="https://..."
                />
              </View>
            </View>

            <View className="flex-row space-x-3">
               <Button 
                onPress={handleSave} 
                className="flex-1"
                disabled={!editModal?.name.trim()}
              >
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Categories;
