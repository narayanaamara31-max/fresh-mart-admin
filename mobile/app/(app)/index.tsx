import { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useOrderStore } from '@/src/stores/orderStore';
import { useProductStore } from '@/src/stores/productStore';
import { useRouter } from 'expo-router';
import StatCard from '@/components/StatCard';
import OrderCard from '@/components/OrderCard';
import { ShoppingCart, IndianRupee, Clock, Truck, AlertTriangle } from 'lucide-react-native';
import { Order, Product } from '@/src/types';

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { orders } = useOrderStore();
  const { products } = useProductStore();
  const router = useRouter();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const today = new Date().toDateString();
  const todayOrders = orders.filter((o: Order) => new Date(o.createdAt).toDateString() === today);
  const todayRevenue = todayOrders.reduce((s: number, o: Order) => s + o.total, 0);
  const pendingOrders = orders.filter((o: Order) => o.status === 'Placed').length;
  const ofdOrders = orders.filter((o: Order) => o.status === 'Out for Delivery').length;
  const recentOrders = [...orders].sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const lowStock = products.filter((p: Product) => p.stock < 10);

  return (
    <ScrollView 
      className="flex-1 bg-slate-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View className="p-4 space-y-6">
        <View className="flex-row flex-wrap">
          <View className="w-1/2 p-1">
            <StatCard icon={ShoppingCart} label="Today's Orders" value={todayOrders.length} />
          </View>
          <View className="w-1/2 p-1">
            <StatCard icon={IndianRupee} label="Today's Revenue" value={`₹${todayRevenue}`} />
          </View>
          <View className="w-1/2 p-1">
            <StatCard icon={Clock} label="Pending Orders" value={pendingOrders} />
          </View>
          <View className="w-1/2 p-1">
            <StatCard icon={Truck} label="Out for Delivery" value={ofdOrders} />
          </View>
        </View>

        <View>
          <Text className="text-base font-bold text-slate-900 mb-3 px-1">Recent Orders</Text>
          <View>
            {recentOrders.map((o) => (
              <OrderCard 
                key={o.orderId} 
                order={o} 
                onClick={() => router.push(`/(app)/orders/${o.orderId}`)} 
              />
            ))}
          </View>
        </View>

        {lowStock.length > 0 && (
          <View>
            <View className="flex-row items-center space-x-2 mb-3 px-1">
              <AlertTriangle size={18} color="#ef4444" />
              <Text className="text-base font-bold text-slate-900">Low Stock Alerts</Text>
            </View>
            <View className="space-y-2">
              {lowStock.map((p) => (
                <TouchableOpacity 
                  key={p.id} 
                  onPress={() => router.push(`/(app)/products/edit/${p.id}`)}
                  className="bg-red-50 p-4 rounded-xl border border-red-100 flex-row justify-between items-center"
                >
                  <Text className="text-sm font-semibold text-slate-900">{p.name}</Text>
                  <Text className="text-xs font-bold text-red-600">Stock: {p.stock}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
