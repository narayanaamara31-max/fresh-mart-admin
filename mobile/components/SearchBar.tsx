import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { cn } from '@/src/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ value, onChange, placeholder, className }: SearchBarProps) => {
  return (
    <View className={cn("flex-row items-center bg-white border border-slate-200 rounded-xl px-4 h-12 shadow-sm", className)}>
      <Search size={20} color="#94a3b8" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        className="flex-1 ml-3 text-slate-900"
        placeholderTextColor="#94a3b8"
      />
    </View>
  );
};

export default SearchBar;
