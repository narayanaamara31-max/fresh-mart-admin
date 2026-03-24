import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { cn } from "@/src/lib/utils";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}

export function Button({ 
  onPress, 
  children, 
  disabled, 
  loading, 
  className,
  variant = "primary"
}: ButtonProps) {
  const baseStyles = "h-12 rounded-lg flex-row items-center justify-center px-4";
  const variants = {
    primary: "bg-blue-600 disabled:bg-blue-300",
    outline: "border border-slate-200 bg-transparent",
    ghost: "bg-transparent",
  };
  const textStyles = variant === "primary" ? "text-white font-semibold" : "text-slate-900 font-medium";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], className)}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "white" : "black"} />
      ) : typeof children === "string" ? (
        <Text className={textStyles}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
