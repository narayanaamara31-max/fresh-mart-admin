import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOrderStore } from '@/src/stores/orderStore';
import { useDeliveryStore } from '@/src/stores/deliveryStore';
import { ArrowLeft, CheckCircle, Clock, Truck, XCircle, Package } from 'lucide-react-native';
import { Order, OrderStatus, DeliveryBoy } from '@/src/types';
import { Button } from '@/components/ui/Button';

const allStatuses: OrderStatus[] = ['Placed', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];

const OrderDetail = () => {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const { orders, updateOrderStatus, assignDeliveryBoy } = useOrderStore();
  const { deliveryBoys } = useDeliveryStore();
  const order = orders.find((o) => o.orderId === orderId);

  const [selectedDb, setSelectedDb] = useState('');

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-white p-4">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center mb-4">
          <ArrowLeft size={24} color="black" />
          <Text className="ml-2 text-lg">Back</Text>
        </TouchableOpacity>
        <Text className="text-slate-500">Order not found.</Text>
      </SafeAreaView>
    );
  }

  const handleStatusChange = (status: OrderStatus) => {
    Alert.alert(
      "Update Status",
      `Change status to "${status}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Update", 
          onPress: () => {
            updateOrderStatus(order.orderId, status);
          } 
        }
      ]
    );
  };

  const handleAssign = () => {
    if (selectedDb) {
      assignDeliveryBoy(order.orderId, selectedDb);
      const dbName = deliveryBoys.find((d) => d.id === selectedDb)?.name;
      Alert.alert("Success", `${dbName} assigned to ${order.orderId}.`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Placed': return <Package size={16} color="#2563eb" />;
      case 'Confirmed': return <CheckCircle size={16} color="#9333ea" />;
      case 'Out for Delivery': return <Truck size={16} color="#d97706" />;
      case 'Delivered': return <CheckCircle size={16} color="#059669" />;
      case 'Cancelled': return <XCircle size={16} color="#dc2626" />;
      default: return <Clock size={16} color="#475569" />;
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="p-4 space-y-4">
        <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-slate-900">#{order.orderId}</Text>
                <View className="flex-row items-center space-x-1 px-2 py-1 bg-slate-100 rounded-full">
                    {getStatusIcon(order.status)}
                    <Text className="text-xs font-bold text-slate-700 ml-1">{order.status}</Text>
                </View>
            </View>
            <Text className="text-sm text-slate-500"><Text className="font-semibold">Date:</Text> {new Date(order.createdAt).toLocaleDateString()}</Text>
            <Text className="text-sm text-slate-500"><Text className="font-semibold">Payment:</Text> {order.paymentMethod}</Text>
            <Text className="text-sm text-slate-500"><Text className="font-semibold">Customer:</Text> {order.customerName}</Text>
            <Text className="text-sm text-slate-500"><Text className="font-semibold">Phone:</Text> {order.customerMobile}</Text>
        </View>

        <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <Text className="text-base font-bold text-slate-900 mb-3">Items</Text>
            <View className="space-y-3">
              {order.items.map((item, i) => (
                <View key={i} className="flex-row justify-between items-center">
                  <Text className="text-sm text-slate-700">{item.productName} × {item.qty} {item.unit}</Text>
                  <Text className="text-sm font-bold text-slate-900">₹{item.lineTotal}</Text>
                </View>
              ))}
            </View>
            <View className="border-t border-slate-100 mt-4 pt-4 space-y-2">
                <View className="flex-row justify-between">
                    <Text className="text-sm text-slate-500">Subtotal</Text>
                    <Text className="text-sm text-slate-900">₹{order.subtotal}</Text>
                </View>
                {order.discount > 0 && (
                    <View className="flex-row justify-between">
                        <Text className="text-sm text-green-600">Discount</Text>
                        <Text className="text-sm text-green-600">-₹{order.discount}</Text>
                    </View>
                )}
                <View className="flex-row justify-between">
                    <Text className="text-sm text-slate-500">Delivery</Text>
                    <Text className="text-sm text-slate-900">₹{order.deliveryCharge}</Text>
                </View>
                <View className="flex-row justify-between pt-2 border-t border-slate-100">
                    <Text className="text-base font-bold text-slate-900">Total</Text>
                    <Text className="text-base font-bold text-blue-600">₹{order.total}</Text>
                </View>
            </View>
        </View>

        <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <Text className="text-base font-bold text-slate-900 mb-2">Delivery Address</Text>
            <Text className="text-sm text-slate-500 leading-5">{order.address}</Text>
        </View>

        <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
            <Text className="text-base font-bold text-slate-900 mb-1">Update Status</Text>
            <View className="flex-row flex-wrap">
              {allStatuses.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => handleStatusChange(s)}
                  className={`px-3 py-2 rounded-lg mr-2 mb-2 border ${
                    order.status === s ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'
                  }`}
                >
                  <Text className={`text-xs font-bold ${order.status === s ? 'text-white' : 'text-slate-600'}`}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
        </View>

        <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <Text className="text-base font-bold text-slate-900 mb-1">Assign Delivery Boy</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {deliveryBoys.filter(d => d.isActive).map((d) => (
                <TouchableOpacity
                  key={d.id}
                  onPress={() => setSelectedDb(d.id)}
                  className={`px-4 py-3 rounded-xl mr-3 border ${
                    selectedDb === d.id ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-200'
                  }`}
                >
                  <Text className={`text-sm font-bold ${selectedDb === d.id ? 'text-blue-600' : 'text-slate-700'}`}>{d.name}</Text>
                  <Text className="text-[10px] text-slate-500">{d.mobile}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button 
                onPress={handleAssign} 
                disabled={!selectedDb}
                className="w-full"
            >
                Assign Now
            </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;
