import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, SafeAreaView, Alert } from 'react-native';
import { useDeliveryStore } from '@/src/stores/deliveryStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Plus, X, Truck } from 'lucide-react-native';

const DeliveryBoys = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [active, setActive] = useState(true);
  const [error, setError] = useState('');
  const { deliveryBoys, addDeliveryBoy, toggleActive } = useDeliveryStore();

  const handleSave = () => {
    if (!name.trim()) { setError('Name is required'); return; }
    if (mobile.length !== 10) { setError('Enter a valid 10-digit mobile'); return; }
    addDeliveryBoy({ id: `d-${Date.now()}`, name, mobile, isActive: active, assignedOrders: [] });
    Alert.alert("Success", `${name} added as delivery boy.`);
    setShowAdd(false);
    setName(''); setMobile(''); setActive(true); setError('');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 p-4">
        <View className="space-y-3 pb-20">
          {deliveryBoys.map((d) => (
            <View key={d.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-4">
                <Truck size={20} color="#64748b" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-slate-900">{d.name}</Text>
                <Text className="text-xs text-slate-500">{d.mobile}</Text>
                <View className="mt-1">
                  <Text className="text-[10px] text-blue-600 font-bold">{d.assignedOrders.length} active orders</Text>
                </View>
              </View>
              <Switch checked={d.isActive} onCheckedChange={() => toggleActive(d.id)} />
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setShowAdd(true)}
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full items-center justify-center shadow-lg"
      >
        <Plus size={28} color="white" />
      </TouchableOpacity>

      <Modal
        visible={showAdd}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAdd(false)}
      >
        <View className="flex-1 bg-black/40 justify-center p-6">
          <View className="bg-white rounded-2xl p-6 shadow-xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold text-slate-900">Add Delivery Boy</Text>
              <TouchableOpacity onPress={() => setShowAdd(false)}>
                <X size={24} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4 mb-8">
              <View>
                <Text className="text-sm font-bold text-slate-700 mb-2">Name *</Text>
                <Input value={name} onChangeText={setName} placeholder="Full Name" />
              </View>
              <View>
                <Text className="text-sm font-bold text-slate-700 mb-2">Mobile *</Text>
                <Input 
                   value={mobile} 
                   onChangeText={(t) => setMobile(t.replace(/\D/g, '').slice(0, 10))} 
                   keyboardType="numeric" 
                   maxLength={10}
                   placeholder="10-digit number"
                />
              </View>
              <View className="flex-row items-center justify-between bg-slate-50 p-3 rounded-lg">
                <Text className="text-sm font-bold text-slate-700">Active</Text>
                <Switch checked={active} onCheckedChange={setActive} />
              </View>
              {error ? <Text className="text-xs text-red-500">{error}</Text> : null}
            </View>

            <Button onPress={handleSave} className="w-full">Save</Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DeliveryBoys;
