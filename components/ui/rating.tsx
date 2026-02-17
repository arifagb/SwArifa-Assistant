import { View, Pressable, Text } from "react-native";

interface RatingProps {
  value: number;
  max?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: "small" | "medium" | "large";
}

export function Rating({
  value,
  max = 5,
  onRate,
  readonly = false,
  size = "medium",
}: RatingProps) {
  const sizeClass = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-2xl",
  }[size];

  return (
    <View className="flex-row gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Pressable
          key={i}
          onPress={() => !readonly && onRate?.(i + 1)}
          disabled={readonly}
        >
          <Text className={`${sizeClass} ${i < value ? "text-yellow-400" : "text-muted"}`}>
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
