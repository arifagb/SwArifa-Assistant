import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { MonsterCard } from "@/components/monster-card";
import { AppCover } from "@/components/app-cover";
import { searchMonsters, MONSTERS } from "@/lib/mock-data";
import { searchDefenseFromSwgt, getTrendingDefenses, checkSwgtHealth } from "@/lib/swgt-real-api";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonsters, setSelectedMonsters] = useState<string[]>([]);
  const [showMonsterGrid, setShowMonsterGrid] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<"connected" | "offline" | "checking">("checking");
  const [trendingDefenses, setTrendingDefenses] = useState<any[]>([]);

  // Verificar status da API ao iniciar
  useEffect(() => {
    const checkApi = async () => {
      setApiStatus("checking");
      const isHealthy = await checkSwgtHealth();
      setApiStatus(isHealthy ? "connected" : "offline");
    };
    checkApi();
  }, []);

  // Carregar defesas trending
  useEffect(() => {
    const loadTrending = async () => {
      const trending = await getTrendingDefenses();
      setTrendingDefenses(trending.slice(0, 3));
    };
    loadTrending();
  }, []);

  const handleMonsterSelect = (monsterId: string) => {
    if (selectedMonsters.includes(monsterId)) {
      setSelectedMonsters(selectedMonsters.filter((id) => id !== monsterId));
    } else if (selectedMonsters.length < 3) {
      setSelectedMonsters([...selectedMonsters, monsterId]);
    }
  };

  const handleSearch = async () => {
    if (selectedMonsters.length === 3) {
      setIsLoading(true);
      try {
        // Buscar do swgt.io em tempo real
        const monsterNames = selectedMonsters.map((id) => MONSTERS[id]?.name).filter(Boolean);
        const result = await searchDefenseFromSwgt(
          monsterNames[0],
          monsterNames[1],
          monsterNames[2]
        );

        if (result) {
          router.push({
            pathname: "/search-results",
            params: {
              monsters: JSON.stringify(selectedMonsters),
              result: JSON.stringify(result),
            },
          });
        } else {
          alert("Nenhum resultado encontrado. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao buscar:", error);
        alert("Erro ao buscar. Verifique sua conexão.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTextSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      const results = searchMonsters(text);
      setSearchResults(results.map((m) => m.id));
    } else {
      setSearchResults([]);
    }
  };

  const handleTrendingDefense = async (defense: any) => {
    // Simular seleção de defesa trending
    const monsterIds = defense.monsters
      .map((name: string) => Object.entries(MONSTERS).find(([_, m]) => m.name === name)?.[0])
      .filter(Boolean);

    if (monsterIds.length === 3) {
      setSelectedMonsters(monsterIds as string[]);
      setIsLoading(true);
      try {
        const result = await searchDefenseFromSwgt(
          defense.monsters[0],
          defense.monsters[1],
          defense.monsters[2]
        );

        if (result) {
          router.push({
            pathname: "/search-results",
            params: {
              monsters: JSON.stringify(monsterIds),
              result: JSON.stringify(result),
            },
          });
        }
      } catch (error) {
        console.error("Erro ao buscar trending:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const allMonsters = Object.values(MONSTERS);
  const monstersToDisplay = showMonsterGrid
    ? searchResults.length > 0
      ? searchResults
      : Object.keys(MONSTERS)
    : [];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* App Cover */}
          <AppCover />

          {/* Header */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-foreground">SwArifa Assistant</Text>
              <View
                className={cn(
                  "rounded-full px-2 py-1",
                  apiStatus === "connected"
                    ? "bg-success/20"
                    : apiStatus === "offline"
                      ? "bg-error/20"
                      : "bg-warning/20"
                )}
              >
                <Text
                  className={cn(
                    "text-xs font-semibold",
                    apiStatus === "connected"
                      ? "text-success"
                      : apiStatus === "offline"
                        ? "text-error"
                        : "text-warning"
                  )}
                >
                  {apiStatus === "connected"
                    ? "✅ Online"
                    : apiStatus === "offline"
                      ? "⚠️ Offline"
                      : "🔄 Verificando"}
                </Text>
              </View>
            </View>
            <Text className="text-xs text-muted">
              Encontre counters para suas defesas
            </Text>
          </View>

          {/* Trending Defenses */}
          {trendingDefenses.length > 0 && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">🔥 Trending Agora</Text>
              <View className="gap-2">
                {trendingDefenses.map((defense) => (
                  <TouchableOpacity
                    key={defense.id}
                    onPress={() => handleTrendingDefense(defense)}
                    className="bg-surface border border-border rounded-lg p-3 flex-row items-center justify-between"
                  >
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">
                        {defense.monsters.join(", ")}
                      </Text>
                      <Text className="text-xs text-muted">
                        ⭐ {defense.rating.toFixed(1)} • 📊 {defense.uses} usos
                      </Text>
                    </View>
                    <Text className="text-lg">→</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Search by Names */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Buscar por Nomes</Text>
            <TextInput
              placeholder="Digite 3 nomes de monstros..."
              placeholderTextColor="#B0B8C1"
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              value={searchQuery}
              onChangeText={handleTextSearch}
              editable={!isLoading}
            />

            {/* Selected Monsters Display */}
            {selectedMonsters.length > 0 && (
              <View className="flex-row gap-2 flex-wrap">
                {selectedMonsters.map((id) => (
                  <TouchableOpacity
                    key={id}
                    onPress={() => handleMonsterSelect(id)}
                    disabled={isLoading}
                    className="bg-primary rounded-full px-3 py-1 flex-row items-center gap-2"
                  >
                    <Text className="text-background font-semibold">
                      {MONSTERS[id]?.name}
                    </Text>
                    <Text className="text-background">✕</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Search Button */}
            <TouchableOpacity
              onPress={handleSearch}
              disabled={selectedMonsters.length !== 3 || isLoading}
              className={cn(
                "rounded-lg py-3 items-center justify-center flex-row gap-2",
                selectedMonsters.length === 3 && !isLoading ? "bg-primary" : "bg-border opacity-50"
              )}
            >
              {isLoading ? (
                <>
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text className="text-background font-semibold">Buscando...</Text>
                </>
              ) : (
                <Text className="text-background font-semibold">
                  Buscar ({selectedMonsters.length}/3)
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Results from Text Input */}
          {searchResults.length > 0 && !showMonsterGrid && (
            <View className="gap-2">
              <Text className="text-xs text-muted">Clique para adicionar</Text>
              <View className="flex-row flex-wrap gap-2">
                {searchResults.slice(0, 6).map((id) => (
                  <TouchableOpacity
                    key={id}
                    onPress={() => handleMonsterSelect(id)}
                    disabled={isLoading}
                  >
                    <MonsterCard
                      monster={MONSTERS[id]}
                      selected={selectedMonsters.includes(id)}
                      size="small"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Divider */}
          <View className="h-px bg-border" />

          {/* Search by Grid */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-foreground">Buscar por Lista</Text>
              <TouchableOpacity
                onPress={() => setShowMonsterGrid(!showMonsterGrid)}
                disabled={isLoading}
                className="bg-surface border border-border rounded-lg px-3 py-1"
              >
                <Text className="text-xs text-primary font-semibold">
                  {showMonsterGrid ? "Fechar" : "Abrir"}
                </Text>
              </TouchableOpacity>
            </View>

            {showMonsterGrid && (
              <View className="gap-3">
                <View className="flex-row flex-wrap gap-2 justify-center">
                  {allMonsters.map((monster) => (
                    <TouchableOpacity
                      key={monster.id}
                      onPress={() => handleMonsterSelect(monster.id)}
                      disabled={isLoading}
                    >
                      <MonsterCard
                        monster={monster}
                        selected={selectedMonsters.includes(monster.id)}
                        size="medium"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Spacing */}
          <View className="h-10" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
