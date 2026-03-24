import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Order } from '@/src/types';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

const OrderCard = ({ order, onClick }: OrderCardProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Placed': return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'Confirmed': return { bg: 'bg-purple-100', text: 'text-purple-700' };
      case 'Out for Delivery': return { bg: 'bg-orange-100', text: 'text-orange-700' };
      case 'Delivered': return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'Cancelled': return { bg: 'bg-red-100', text: 'text-red-700' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-700' };
    }
  };

  const styles = getStatusStyles(order.status);

  return (
    <TouchableOpacity 
      onPress={onClick}
      className="bg-white p-4 rounded-lg border border-slate-100 mb-2 flex-row items-center justify-between"
    >
      <View className="flex-1">
        <View className="flex-row items-center space-x-2 mb-1 gap-2">
          <Text className="font-bold text-slate-900">#{order.orderId}</Text>
          <View className={`px-2 py-0.5 rounded-full ${styles.bg}`}>
             <Text className={`text-[10px] font-bold ${styles.text}`}>{order.status}</Text>
          </View>
        </View>
        <Text className="text-xs text-slate-500">{order.customerName} • ₹{order.total}</Text>
      </View>
      <ChevronRight size={18} color="#94a3b8" />
    </TouchableOpacity>
  );
};

export default OrderCard;
