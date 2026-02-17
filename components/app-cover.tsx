import { View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";

export function AppCover() {
  const colors = useColors();

  return (
    <View className="w-full rounded-2xl overflow-hidden border border-border shadow-lg" style={{ aspectRatio: 9 / 16 }}>
      <Image
        source={require("@/assets/images/cover-new.png")}
        className="w-full h-full"
        resizeMode="contain"
      />
      {/* Overlay com gradiente */}
      <LinearGradient
        colors={["rgba(15, 20, 25, 0)", "rgba(15, 20, 25, 0.8)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />
      {/* Conteúdo da capa */}
      <View className="absolute inset-0 justify-end p-4">
        <View className="gap-1">
          <Text className="text-xl font-bold text-white">SwArifa Assistant</Text>
          <Text className="text-xs text-gray-300">
            Encontre os melhores counters para suas defesas
          </Text>
        </View>
      </View>
    </View>
  );
}
