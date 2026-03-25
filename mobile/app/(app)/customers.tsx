import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useCustomerStore } from '@/src/stores/customerStore';
import { useOrderStore } from '@/src/stores/orderStore';
import SearchBar from '@/components/SearchBar';
import { Users, X, ChevronRight, Phone, MapPin, History } from 'lucide-react-native';
import { Customer, Order } from '@/src/types';

const Customers = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);
  const { customers } = useCustomerStore();
  const { orders } = useOrderStore();

  const filtered = customers.filter((c: Customer) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search)
  );

  const customerOrders = selected ? orders.filter((o: Order) => o.customerId === selected.id) : [];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="p-4 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search customers..." />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mx-4 mb-2 flex-row items-center justify-between"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-3">
                <Users size={20} color="#64748b" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-slate-900">{item.name}</Text>
                <Text className="text-xs text-slate-500">{item.mobile}</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-xs font-bold text-blue-600">₹{item.totalSpent}</Text>
              <Text className="text-[10px] text-slate-400">{item.totalOrders} orders</Text>
            </View>
            <ChevronRight size={16} color="#cbd5e1" className="ml-2" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Users size={48} color="#cbd5e1" />
            <Text className="text-lg font-bold text-slate-900 mt-4">No customers found</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-slate-900">{selected?.name}</Text>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <X size={24} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <ScrollView className="space-y-6">
              <View className="bg-slate-50 p-4 rounded-xl space-y-3">
                <View className="flex-row items-center">
                  <Phone size={16} color="#64748b" className="mr-2" />
                  <Text className="text-sm text-slate-700 ml-2">{selected?.mobile}</Text>
                </View>
                <View className="flex-row items-start">
                  <MapPin size={16} color="#64748b" className="mr-2 mt-0.5" />
                  <View className="flex-1 ml-2">
                    {selected?.addresses.map((a, i) => (
                      <Text key={i} className="text-sm text-slate-600 mb-1">{a}</Text>
                    ))}
                  </View>
                </View>
              </View>

              <View>
                <View className="flex-row items-center mb-4">
                  <History size={18} color="#2563eb" className="mr-2" />
                  <Text className="text-base font-bold text-slate-900 ml-2">Order History</Text>
                </View>
                {customerOrders.length === 0 ? (
                  <Text className="text-sm text-slate-400 italic">No orders found.</Text>
                ) : (
                  <View className="space-y-4">
                    {customerOrders.map((o) => (
                      <View key={o.orderId} className="flex-row justify-between items-center border-b border-slate-50 pb-4">
                        <View>
                          <Text className="text-sm font-bold text-slate-900">#{o.orderId}</Text>
                          <Text className="text-[10px] text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</Text>
                        </View>
                        <View className="items-end">
                          <Text className="text-sm font-bold text-blue-600">₹{o.total}</Text>
                          <View className="px-2 py-0.5 bg-slate-100 rounded-full mt-1">
                            <Text className="text-[10px] font-bold text-slate-600">{o.status}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Customers;
