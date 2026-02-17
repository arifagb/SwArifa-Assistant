import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { CompositionCard } from "@/components/composition-card";
import { CounterCard } from "@/components/counter-card";
import { CounterVote } from "@/components/counter-vote";
import { searchDefenses, getMonster } from "@/lib/mock-data";
import { useState } from "react";

export default function SearchResultsScreen() {
  const router = useRouter();
  const { monsters, result } = useLocalSearchParams<{ monsters: string; result?: string }>();
  const [selectedCounterId, setSelectedCounterId] = useState<string | null>(null);

  const monsterIds = monsters ? JSON.parse(monsters) : [];
  
  // Usar resultado da API se disponível, senão usar mock data
  let defense: any;
  if (result) {
    try {
      const apiResult = JSON.parse(result);
      defense = {
        composition: {
          id: apiResult.defense.id,
          monsters: apiResult.defense.monsters,
          rating: apiResult.defense.rating,
          strengths: [
            "Defesa balanceada com bom controle",
            "Monstros com builds versáteis",
          ],
          weaknesses: [
            "Vulnerável a speed teams",
            "Sem imunidade a debuffs críticos",
          ],
          notes: ["Considere adicionar imunidade", "Ajuste os builds conforme necessário"],
        },
        counters: apiResult.counters.map((c: any) => ({
          id: c.id,
          monsters: c.monsters,
          rating: c.rating,
          strategy: c.strategy,
          buildNotes: `Dificuldade: ${c.difficulty}`,
          votes: c.votes,
          trending: c.trending,
        })),
      };
    } catch (error) {
      console.error("Erro ao parsear resultado da API:", error);
      const defenses = searchDefenses(monsterIds);
      defense = defenses[0];
    }
  } else {
    const defenses = searchDefenses(monsterIds);
    defense = defenses[0];
  }

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

  const selectedCounter = defense.counters.find((c: any) => c.id === selectedCounterId);

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
              {defense.composition.strengths.map((strength: string, idx: number) => (
                <Text key={idx} className="text-sm text-foreground leading-relaxed">
                  • {strength}
                </Text>
              ))}
            </View>

            {/* Weaknesses */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-error">Pontos Fracos</Text>
              {defense.composition.weaknesses.map((weakness: string, idx: number) => (
                <Text key={idx} className="text-sm text-foreground leading-relaxed">
                  • {weakness}
                </Text>
              ))}
            </View>

            {/* Notes */}
            {defense.composition.notes.length > 0 && (
              <View className="gap-2">
                <Text className="text-sm font-semibold text-primary">Notas</Text>
                {defense.composition.notes.map((note: string, idx: number) => (
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
            {defense.counters.map((counter: any) => (
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

          {/* Counter Details with Vote */}
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

              {/* Vote Component */}
              <View className="pt-3 border-t border-border">
                <Text className="text-xs text-muted mb-2">Esta estratégia foi útil?</Text>
                <CounterVote
                  counterId={selectedCounter.id}
                  initialVotes={selectedCounter.votes || 0}
                  onVoteSuccess={(direction) => {
                    console.log(`✅ Voto ${direction} registrado para ${selectedCounter.id}`);
                  }}
                />
              </View>
            </View>
          )}

          {/* Spacing */}
          <View className="h-10" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
