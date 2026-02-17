import { View, TextInput, Pressable, Text } from "react-native";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
}

export function SearchBar({ 
  placeholder = "Search...", 
  onSearch, 
  onClear 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChangeText = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <View className="flex-row items-center bg-surface border border-border rounded-lg px-4 py-3 gap-2">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#B0B8C1"
        value={query}
        onChangeText={handleChangeText}
        className="flex-1 text-foreground text-base"
      />
      {query.length > 0 && (
        <Pressable onPress={handleClear}>
          <Text className="text-muted text-lg">✕</Text>
        </Pressable>
      )}
    </View>
  );
}
