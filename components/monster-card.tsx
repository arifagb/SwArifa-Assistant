import { Pressable, Text, View } from "react-native";
import { Monster } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface MonsterCardProps {
  monster: Monster;
  onPress?: () => void;
  selected?: boolean;
  size?: "small" | "medium" | "large";
}

export function MonsterCard({
  monster,
  onPress,
  selected = false,
  size = "medium",
}: MonsterCardProps) {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-20 h-20",
    large: "w-24 h-24",
  };

  const textSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  const iconSizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-5xl",
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View
        className={cn(
          sizeClasses[size],
          "rounded-lg items-center justify-center gap-1",
          selected ? "bg-primary border-2 border-accent" : "bg-surface border border-border"
        )}
      >
        <Text className={iconSizeClasses[size]}>{monster.icon}</Text>
        <Text
          className={cn(
            textSizeClasses[size],
            "text-foreground font-semibold text-center px-1"
          )}
          numberOfLines={1}
        >
          {monster.name}
        </Text>
      </View>
    </Pressable>
  );
}
