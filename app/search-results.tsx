import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { CompositionCard } from "@/components/composition-card";
import { CounterCard } from "@/components/counter-card";
import { searchDefenses, getMonster } from "@/lib/mock-data";
import { useState } from "react";

export default function SearchResultsScreen() {
  const router = useRouter();
  const { monsters } = useLocalSearchParams<{ monsters: string }>();
  const [selectedCounterId, setSelectedCounterId] = useState<string | null>(null);

  const monsterIds = monsters ? JSON.parse(monsters) : [];
  const defenses = searchDefenses(monsterIds);
  const defense = defenses[0];

  if (!defense) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-lg text-muted">Nenhuma defesa encontrada</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-primary rounded-lg px-6 py-3"
        >
          <Text className="text-background font-semibold">Voltar</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const selectedCounter = defense.counters.find((c) => c.id === selectedCounterId);

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-2xl text-primary">←</Text>
            </TouchableOpacity>
            <Text className="text-lg font-bold text-foreground">Counters</Text>
            <View className="w-6" />
          </View>

          {/* Defense */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted">Defesa Original</Text>
            <CompositionCard composition={defense.composition} />
          </View>

          {/* Defense Info */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            {/* Strengths */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-success">Pontos Fortes</Text>
              {defense.composition.strengths.map((strength, idx) => (
                <Text key={idx} className="text-sm text-foreground leading-relaxed">
                  • {strength}
                </Text>
              ))}
            </View>

            {/* Weaknesses */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-error">Pontos Fracos</Text>
              {defense.composition.weaknesses.map((weakness, idx) => (
                <Text key={idx} className="text-sm text-foreground leading-relaxed">
                  • {weakness}
                </Text>
              ))}
            </View>

            {/* Notes */}
            {defense.composition.notes.length > 0 && (
              <View className="gap-2">
                <Text className="text-sm font-semibold text-primary">Notas</Text>
                {defense.composition.notes.map((note, idx) => (
                  <Text key={idx} className="text-sm text-muted leading-relaxed">
                    • {note}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Counters List */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              {defense.counters.length} Counters Encontrados
            </Text>
            {defense.counters.map((counter) => (
              <TouchableOpacity
                key={counter.id}
                onPress={() =>
                  setSelectedCounterId(selectedCounterId === counter.id ? null : counter.id)
                }
              >
                <CounterCard counter={counter} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Counter Details */}
          {selectedCounter && (
            <View className="bg-surface rounded-lg p-4 border border-primary gap-3">
              <Text className="text-sm font-semibold text-primary">Estratégia Completa</Text>
              <Text className="text-sm text-foreground leading-relaxed">
                {selectedCounter.strategy}
              </Text>
              {selectedCounter.buildNotes && (
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-primary">Notas de Build</Text>
                  <Text className="text-sm text-foreground leading-relaxed">
                    {selectedCounter.buildNotes}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Spacing */}
          <View className="h-10" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
