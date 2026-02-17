import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { MonsterCard } from "@/components/monster-card";
import { AppCover } from "@/components/app-cover";
import { searchMonsters, MONSTERS } from "@/lib/mock-data";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonsters, setSelectedMonsters] = useState<string[]>([]);
  const [showMonsterGrid, setShowMonsterGrid] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleMonsterSelect = (monsterId: string) => {
    if (selectedMonsters.includes(monsterId)) {
      setSelectedMonsters(selectedMonsters.filter((id) => id !== monsterId));
    } else if (selectedMonsters.length < 3) {
      setSelectedMonsters([...selectedMonsters, monsterId]);
    }
  };

  const handleSearch = () => {
    if (selectedMonsters.length === 3) {
      router.push({
        pathname: "/search-results",
        params: {
          monsters: JSON.stringify(selectedMonsters),
        },
      });
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
            <Text className="text-2xl font-bold text-foreground">SwArifa Assistant</Text>
            <Text className="text-xs text-muted">
              Encontre counters para suas defesas
            </Text>
          </View>

          {/* Search by Names */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Buscar por Nomes</Text>
            <TextInput
              placeholder="Digite 3 nomes de monstros..."
              placeholderTextColor="#B0B8C1"
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              value={searchQuery}
              onChangeText={handleTextSearch}
            />

            {/* Selected Monsters Display */}
            {selectedMonsters.length > 0 && (
              <View className="flex-row gap-2 flex-wrap">
                {selectedMonsters.map((id) => (
                  <TouchableOpacity
                    key={id}
                    onPress={() => handleMonsterSelect(id)}
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
              disabled={selectedMonsters.length !== 3}
              className={cn(
                "rounded-lg py-3 items-center",
                selectedMonsters.length === 3 ? "bg-primary" : "bg-border opacity-50"
              )}
            >
              <Text className="text-background font-semibold">
                Buscar ({selectedMonsters.length}/3)
              </Text>
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
