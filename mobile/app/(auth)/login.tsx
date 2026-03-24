import { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuthStore } from '@/src/stores/authStore';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Leaf } from 'lucide-react-native';

const LoginScreen = () => {
  const [mobile, setMobile] = useState('');
  const { adminMobile, setOtpSent } = useAuthStore();
  const router = useRouter();

  const isValid = mobile.length === 10;

  const handleSendOtp = () => {
    if (mobile !== adminMobile) {
      alert('This mobile number is not registered as admin.');
      return;
    }
    setOtpSent(true);
    router.push({ pathname: '/(auth)/otp', params: { mobile } });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center p-6"
      >
        <View className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 items-center">
          <View className="w-16 h-16 rounded-full bg-blue-600 items-center justify-center mb-4">
            <Leaf size={32} color="white" />
          </View>
          
          <Text className="text-2xl font-bold text-slate-900 mb-1">FreshMart Admin</Text>
          <Text className="text-slate-500 mb-8">Jaggayyapeta</Text>
          
          <View className="w-full space-y-4 mb-6">
            <View>
               <Text className="text-sm font-medium text-slate-700 mb-2">Mobile Number</Text>
               <View className="flex-row items-center space-x-2">
                  <Text className="text-lg font-medium text-slate-500">+91</Text>
                  <View className="flex-1">
                    <Input
                      keyboardType="numeric"
                      maxLength={10}
                      value={mobile}
                      onChangeText={(text) => setMobile(text.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile"
                    />
                  </View>
               </View>
            </View>
          </View>
          
          <Button 
            onPress={handleSendOtp} 
            disabled={!isValid} 
            className="w-full"
          >
            Send OTP
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
