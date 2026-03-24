import { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/src/stores/authStore';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Leaf } from 'lucide-react-native';

const OTPScreen = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { login } = useAuthStore();
  const router = useRouter();
  const { mobile } = useLocalSearchParams();

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    login(mobile as string);
    router.replace('/(app)');
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(Array(6).fill(''));
    inputRefs.current[0]?.focus();
  };

  const maskedMobile = `+91 ${typeof mobile === 'string' ? mobile.slice(0, 5) + ' ' + mobile.slice(5) : ''}`;

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
          
          <Text className="text-2xl font-bold text-slate-900 mb-1">Verify OTP</Text>
          <Text className="text-slate-500 mb-8 text-center">Sent to {maskedMobile}</Text>
          
          <View className="flex-row justify-center space-x-2 mb-4">
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(i, text)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
                className="w-11 h-12 text-center text-lg font-bold border border-slate-200 rounded-lg bg-white"
              />
            ))}
          </View>

          {error ? <Text className="text-sm text-red-500 mb-4">{error}</Text> : null}
          
          <Button 
            onPress={handleVerify} 
            className="w-full mb-6"
          >
            Verify & Login
          </Button>

          <View className="items-center">
            {timer > 0 ? (
              <Text className="text-sm text-slate-500">Resend OTP in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text className="text-sm text-blue-600 font-semibold">Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;
