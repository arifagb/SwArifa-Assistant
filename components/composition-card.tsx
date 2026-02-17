import { Pressable, Text, View } from "react-native";
import { Composition, getMonster } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface CompositionCardProps {
  composition: Composition;
  onPress?: () => void;
  showLeaderSkill?: boolean;
}

export function CompositionCard({
  composition,
  onPress,
  showLeaderSkill = true,
}: CompositionCardProps) {
  const monsters = composition.monsters.map((id) => getMonster(id));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-lg p-4 border border-border gap-3">
        {/* Monsters Row */}
        <View className="flex-row justify-center gap-3">
          {monsters.map((monster, index) => (
            <View key={index} className="items-center gap-1">
              <View className="w-16 h-16 rounded-lg bg-background items-center justify-center">
                <Text className="text-4xl">{monster?.icon || "?"}</Text>
              </View>
              <Text className="text-xs text-muted text-center w-16" numberOfLines={1}>
                {monster?.name || "Unknown"}
              </Text>
            </View>
          ))}
        </View>

        {/* Leader Skill */}
        {showLeaderSkill && (
          <View className="bg-background rounded-lg p-3 gap-1">
            <Text className="text-xs text-muted">Skill Líder</Text>
            <Text className="text-sm font-semibold text-primary">
              {composition.leaderSkill.bonus}
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              {composition.leaderSkill.description}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
