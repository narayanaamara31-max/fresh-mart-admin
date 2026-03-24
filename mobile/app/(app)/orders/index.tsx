import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useOrderStore } from '@/src/stores/orderStore';
import { useRouter } from 'expo-router';
import OrderCard from '@/components/OrderCard';
import { ShoppingBag } from 'lucide-react-native';
import { Order, OrderStatus } from '@/src/types';

const statuses: (OrderStatus | 'All')[] = ['All', 'Placed', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];
const dateFilters = ['Today', 'This Week', 'All'] as const;

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [dateFilter, setDateFilter] = useState<typeof dateFilters[number]>('All');
  const { orders } = useOrderStore();
  const router = useRouter();

  const now = new Date();
  const today = now.toDateString();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);

  let filtered = orders;
  if (statusFilter !== 'All') {
    filtered = filtered.filter((o: Order) => o.status === statusFilter);
  }
  if (dateFilter === 'Today') {
    filtered = filtered.filter((o: Order) => new Date(o.createdAt).toDateString() === today);
  } else if (dateFilter === 'This Week') {
    filtered = filtered.filter((o: Order) => new Date(o.createdAt) >= weekAgo);
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View className="p-4 space-y-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {statuses.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                statusFilter === s ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'
              }`}
            >
              <Text className={`text-xs font-bold ${statusFilter === s ? 'text-white' : 'text-slate-500'}`}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row space-x-2">
          {dateFilters.map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => setDateFilter(d)}
              className={`px-4 py-2 rounded-full border ${
                dateFilter === d ? 'bg-slate-800 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <Text className={`text-xs font-bold ${dateFilter === d ? 'text-white' : 'text-slate-500'}`}>
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => (
          <View className="px-4">
            <OrderCard 
              order={item} 
              onClick={() => router.push(`/(app)/orders/${item.orderId}`)} 
            />
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <ShoppingBag size={48} color="#cbd5e1" />
            <Text className="text-lg font-bold text-slate-900 mt-4">No orders found</Text>
            <Text className="text-slate-500">Try changing your filters</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Orders;
