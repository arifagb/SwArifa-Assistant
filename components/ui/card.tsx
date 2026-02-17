import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function Card({ title, subtitle, onPress, className, children }: CardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View className={cn(
        "bg-surface border border-border rounded-xl p-4 gap-2",
        className
      )}>
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
        {subtitle && <Text className="text-sm text-muted">{subtitle}</Text>}
        {children}
      </View>
    </Pressable>
  );
}
