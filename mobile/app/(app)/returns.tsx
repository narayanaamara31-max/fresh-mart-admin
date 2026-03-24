import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, SafeAreaView, Alert } from 'react-native';
import { useReturnStore } from '@/src/stores/returnStore';
import { ReturnRequest, ReturnStatus } from '@/src/types';
import { Button } from '@/components/ui/Button';
import { RotateCcw, X, CheckCircle, XCircle, Clock } from 'lucide-react-native';

const tabs: ReturnStatus[] = ['Pending', 'Approved', 'Rejected'];

const Returns = () => {
  const [tab, setTab] = useState<ReturnStatus>('Pending');
  const [selected, setSelected] = useState<ReturnRequest | null>(null);
  const { returns, updateReturnStatus } = useReturnStore();

  const filtered = returns.filter((r: ReturnRequest) => r.status === tab);

  const handleAction = (id: string, status: ReturnStatus) => {
    Alert.alert(
      `${status} Return`,
      `Are you sure you want to ${status.toLowerCase()} this return?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: status, 
          style: status === 'Rejected' ? 'destructive' : 'default',
          onPress: () => {
            updateReturnStatus(id, status);
            setSelected(null);
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="p-4 bg-white border-b border-slate-100 flex-row space-x-2">
        {tabs.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            className={`px-4 py-2 rounded-full border flex-1 items-center ${
              tab === t ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'
            }`}
          >
            <Text className={`text-xs font-bold ${tab === t ? 'text-white' : 'text-slate-500'}`}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="space-y-3 pb-20">
          {filtered.length === 0 ? (
            <View className="flex-1 items-center justify-center py-20">
               <RotateCcw size={48} color="#cbd5e1" />
               <Text className="text-lg font-bold text-slate-900 mt-4">No {tab.toLowerCase()} returns</Text>
            </View>
          ) : (
            filtered.map((r) => (
              <TouchableOpacity
                key={r.id}
                onPress={() => setSelected(r)}
                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900">#{r.orderId}</Text>
                  <Text className="text-xs text-slate-500">{r.customerName}</Text>
                  <Text className="text-xs text-slate-600 mt-1" numberOfLines={1}>{r.reason}</Text>
                </View>
                <Text className="text-[10px] text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-slate-900">Return: {selected?.orderId}</Text>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <X size={24} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <ScrollView className="space-y-6">
              <View className="space-y-1">
                <Text className="text-sm font-bold text-slate-700">Customer</Text>
                <Text className="text-sm text-slate-500">{selected?.customerName}</Text>
              </View>

              <View className="space-y-1">
                <Text className="text-sm font-bold text-slate-700">Reason</Text>
                <Text className="text-sm text-slate-900">{selected?.reason}</Text>
                {selected?.description && <Text className="text-sm text-slate-500 italic mt-1">{selected.description}</Text>}
              </View>

              <View>
                <Text className="text-sm font-bold text-slate-700 mb-2">Proof Photo</Text>
                <Image source={{ uri: selected?.photoUrl }} className="w-full h-48 rounded-xl bg-slate-100" resizeMode="cover" />
              </View>

              {selected?.status === 'Pending' && (
                <View className="flex-row space-x-3 pt-4">
                  <TouchableOpacity 
                    onPress={() => handleAction(selected.id, 'Approved')}
                    className="flex-1 h-12 bg-green-600 rounded-xl items-center justify-center flex-row"
                  >
                    <CheckCircle size={18} color="white" />
                    <Text className="text-white font-bold ml-2">Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleAction(selected.id, 'Rejected')}
                    className="flex-1 h-12 bg-red-600 rounded-xl items-center justify-center flex-row"
                  >
                    <XCircle size={18} color="white" />
                    <Text className="text-white font-bold ml-2">Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Returns;
