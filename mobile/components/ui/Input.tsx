import { TextInput, View, Text } from "react-native";
import { cn } from "@/src/lib/utils";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
  secureTextEntry?: boolean;
  className?: string;
  label?: string;
  maxLength?: number;
}

export function Input({ 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType, 
  secureTextEntry, 
  className,
  label,
  maxLength
}: InputProps) {
  return (
    <View className="space-y-1">
      {label && <Text className="text-sm font-medium text-slate-700">{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        className={cn(
          "h-12 border border-slate-200 rounded-lg px-4 bg-white text-slate-900",
          className
        )}
      />
    </View>
  );
}
