/**
 * Auth Screen
 * 
 * Tela de autenticação com Google e Apple
 */

import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useSocialAuth } from "@/hooks/use-social-auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, error, loginWithGoogle, loginWithApple } = useSocialAuth();

  // Redirecionar se já autenticado
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      Alert.alert("✅ Sucesso", "Login com Google realizado com sucesso!");
    } catch (error) {
      Alert.alert("❌ Erro", error instanceof Error ? error.message : "Erro ao fazer login");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await loginWithApple();
      Alert.alert("✅ Sucesso", "Login com Apple realizado com sucesso!");
    } catch (error) {
      Alert.alert("❌ Erro", error instanceof Error ? error.message : "Erro ao fazer login");
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text className="mt-4 text-foreground">Carregando...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="justify-center px-6">
      <View className="gap-8">
        {/* Header */}
        <View className="items-center gap-2">
          <Text className="text-4xl font-bold text-foreground">SwArifa Assistant</Text>
          <Text className="text-base text-muted text-center">
            Sincronize seus favoritos e histórico entre dispositivos
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-error/10 border border-error rounded-lg p-3">
            <Text className="text-sm text-error font-semibold">{error}</Text>
          </View>
        )}

        {/* Google Login Button */}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          disabled={isLoading}
          className="flex-row items-center justify-center gap-3 bg-white border border-border rounded-lg px-6 py-3 active:opacity-80"
        >
          <Text className="text-lg">🔵</Text>
          <Text className="text-base font-semibold text-foreground">Continuar com Google</Text>
        </TouchableOpacity>

        {/* Apple Login Button */}
        <TouchableOpacity
          onPress={handleAppleLogin}
          disabled={isLoading}
          className="flex-row items-center justify-center gap-3 bg-foreground border border-border rounded-lg px-6 py-3 active:opacity-80"
        >
          <Text className="text-lg">🍎</Text>
          <Text className="text-base font-semibold text-background">Continuar com Apple</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 h-px bg-border" />
          <Text className="text-xs text-muted">OU</Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="items-center justify-center px-6 py-3"
        >
          <Text className="text-sm text-muted underline">Continuar sem login</Text>
        </TouchableOpacity>

        {/* Privacy Notice */}
        <View className="items-center gap-1">
          <Text className="text-xs text-muted text-center">
            Ao fazer login, você concorda com nossos
          </Text>
          <View className="flex-row gap-1 justify-center">
            <Text className="text-xs text-primary">Termos de Serviço</Text>
            <Text className="text-xs text-muted">e</Text>
            <Text className="text-xs text-primary">Política de Privacidade</Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
