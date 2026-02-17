import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SavedComposition {
  id: string;
  monsters: [string, string, string];
  name: string;
  savedAt: string;
}

export default function CatalogScreen() {
  const [favorites, setFavorites] = useState<SavedComposition[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
    loadHistory();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem("favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  };

  const loadHistory = async () => {
    try {
      const saved = await AsyncStorage.getItem("search_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  };

  const removeFavorite = async (id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  const clearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem("search_history");
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Catálogo</Text>
            <Text className="text-sm text-muted">Favoritos e histórico</Text>
          </View>

          {/* Favorites Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Composições Favoritas</Text>
            {favorites.length === 0 ? (
              <View className="bg-surface rounded-lg p-6 items-center gap-2 border border-border">
                <Text className="text-lg text-muted">❤️</Text>
                <Text className="text-sm text-muted text-center">
                  Nenhuma composição favorita ainda
                </Text>
                <Text className="text-xs text-muted text-center">
                  Adicione composições aos favoritos para acessá-las rapidamente
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                {favorites.map((fav) => (
                  <View
                    key={fav.id}
                    className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between"
                  >
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">
                        {fav.name}
                      </Text>
                      <Text className="text-xs text-muted">
                        {new Date(fav.savedAt).toLocaleDateString("pt-BR")}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFavorite(fav.id)}
                      className="bg-error rounded-lg px-3 py-2"
                    >
                      <Text className="text-xs text-background font-semibold">Remover</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* History Section */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Histórico</Text>
              {history.length > 0 && (
                <TouchableOpacity
                  onPress={clearHistory}
                  className="bg-error rounded-lg px-3 py-1"
                >
                  <Text className="text-xs text-background font-semibold">Limpar</Text>
                </TouchableOpacity>
              )}
            </View>

            {history.length === 0 ? (
              <View className="bg-surface rounded-lg p-6 items-center gap-2 border border-border">
                <Text className="text-lg text-muted">🕐</Text>
                <Text className="text-sm text-muted text-center">
                  Nenhuma busca no histórico
                </Text>
                <Text className="text-xs text-muted text-center">
                  Suas buscas aparecerão aqui
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                {history.map((item, idx) => (
                  <View
                    key={idx}
                    className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between"
                  >
                    <Text className="text-sm text-foreground flex-1">{item}</Text>
                  <TouchableOpacity className="bg-primary rounded-lg px-3 py-2 active:opacity-70">
                    <Text className="text-xs text-background font-semibold">Buscar</Text>
                  </TouchableOpacity>
                  </View>
                ))}
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
