import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  className?: string;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  className,
}: ButtonProps) {
  const baseClass = "rounded-lg py-3 px-6 items-center justify-center";
  
  const variantClass = {
    primary: "bg-primary",
    secondary: "bg-surface border border-primary",
    outline: "border border-border",
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: pressed && !disabled ? 0.8 : 1, transform: [{ scale: pressed && !disabled ? 0.97 : 1 }] },
      ]}
    >
      <View className={cn(baseClass, variantClass, disabled && "opacity-50", className)}>
        <Text className={cn(
          "font-semibold",
          variant === "primary" ? "text-background" : "text-foreground"
        )}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
