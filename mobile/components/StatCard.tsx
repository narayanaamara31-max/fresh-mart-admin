import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => {
  return (
    <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-1">
      <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mb-2">
        <Icon size={20} color="#2563eb" />
      </View>
      <Text className="text-xs text-slate-500 font-medium mb-1">{label}</Text>
      <Text className="text-lg font-bold text-slate-900">{value}</Text>
    </View>
  );
};

export default StatCard;
