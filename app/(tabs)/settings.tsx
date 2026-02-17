import { ScrollView, Text, View, TouchableOpacity, Switch } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useColors } from "@/hooks/use-colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const handleClearCache = async () => {
    try {
      await AsyncStorage.multiRemove(["favorites", "search_history"]);
      alert("Cache limpo com sucesso!");
    } catch (error) {
      console.error("Erro ao limpar cache:", error);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Configurações</Text>
            <Text className="text-sm text-muted">Personalize o app</Text>
          </View>

          {/* Appearance Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Aparência</Text>
            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Modo Escuro</Text>
                <Text className="text-xs text-muted">Tema escuro para melhor conforto</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={isDarkMode ? colors.primary : colors.muted}
              />
            </View>
          </View>

          {/* Language Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Idioma</Text>
            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Português (BR)</Text>
                <Text className="text-xs text-muted">Idioma do aplicativo</Text>
              </View>
              <Text className="text-sm text-accent font-semibold">✓</Text>
            </View>
          </View>

          {/* Data Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Dados</Text>
            <TouchableOpacity
              onPress={handleClearCache}
              className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between active:opacity-70"
            >
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Limpar Cache</Text>
                <Text className="text-xs text-muted">Remove favoritos e histórico</Text>
              </View>
              <Text className="text-lg text-error">→</Text>
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Sobre</Text>
            <View className="bg-surface rounded-lg p-4 border border-border gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Versão do App</Text>
                <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Desenvolvido por</Text>
                <Text className="text-sm font-semibold text-accent">Manus</Text>
              </View>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-sm text-muted">Baseado em</Text>
                <TouchableOpacity className="bg-background rounded-lg p-2 active:opacity-70">
                  <Text className="text-xs text-primary font-semibold text-center">
                    swgt.io
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Credits Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Créditos</Text>
            <View className="bg-surface rounded-lg p-4 border border-border gap-3">
              <Text className="text-xs text-muted leading-relaxed">
                SW Assistant BR é um aplicativo não oficial para Summoners War. Todos os dados de
                composições e counters são baseados no excelente trabalho da comunidade em swgt.io.
              </Text>
              <Text className="text-xs text-muted leading-relaxed">
                Summoners War é propriedade intelectual da Com2uS.
              </Text>
            </View>
          </View>

          {/* Spacing */}
          <View className="h-10" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
