import { Pressable, Text, View } from "react-native";
import { Counter, getMonster } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface CounterCardProps {
  counter: Counter;
  onPress?: () => void;
}

function RatingStars({ rating }: { rating: number }) {
  const stars = Math.round(rating);
  return (
    <View className="flex-row gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} className={i <= stars ? "text-primary text-lg" : "text-muted text-lg"}>
          ★
        </Text>
      ))}
    </View>
  );
}

export function CounterCard({ counter, onPress }: CounterCardProps) {
  const monsters = counter.composition.monsters.map((id) => getMonster(id));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-lg p-4 border border-border gap-3 mb-3">
        {/* Monsters Row */}
        <View className="flex-row justify-center gap-2">
          {monsters.map((monster, index) => (
            <View key={index} className="items-center gap-1">
              <View className="w-14 h-14 rounded-lg bg-background items-center justify-center">
                <Text className="text-3xl">{monster?.icon || "?"}</Text>
              </View>
              <Text className="text-xs text-muted text-center w-14" numberOfLines={1}>
                {monster?.name || "Unknown"}
              </Text>
            </View>
          ))}
        </View>

        {/* Rating and Meta */}
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <RatingStars rating={counter.rating} />
            <View className="flex-row gap-2 items-center">
              <Text className="text-xs text-muted">{counter.votes} votos</Text>
            </View>
          </View>

          {/* Author and Date */}
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-muted">Por {counter.author}</Text>
            <Text className="text-xs text-muted">{counter.date}</Text>
          </View>
        </View>

        {/* Strategy Preview */}
        <View className="bg-background rounded-lg p-3">
          <Text className="text-sm text-foreground leading-relaxed" numberOfLines={2}>
            {counter.strategy}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
