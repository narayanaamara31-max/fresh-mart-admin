import { TouchableOpacity, View } from "react-native";
import { cn } from "@/src/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
  return (
    <TouchableOpacity
      onPress={() => onCheckedChange(!checked)}
      className={cn(
        "w-10 h-6 rounded-full p-1 transition-colors",
        checked ? "bg-blue-600" : "bg-slate-200",
        className
      )}
    >
      <View
        className={cn(
          "w-4 h-4 rounded-full bg-white transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </TouchableOpacity>
  );
}
