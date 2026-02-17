/**
 * Share Buttons Component
 * 
 * Botões para compartilhar estratégias via diferentes canais
 */

import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import {
  copyToClipboard,
  shareNative,
  copyShareLink,
  type ShareData,
} from "@/lib/share-service";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  data: ShareData;
  onShareSuccess?: () => void;
}

export function ShareButtons({ data, onShareSuccess }: ShareButtonsProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleCopyClipboard = async () => {
    setIsSharing(true);
    try {
      const success = await copyToClipboard(data);
      if (success) {
        Alert.alert("✅ Sucesso", "Composição copiada para clipboard!");
        onShareSuccess?.();
      } else {
        Alert.alert("❌ Erro", "Falha ao copiar para clipboard");
      }
    } catch (error) {
      console.error("Erro ao copiar:", error);
      Alert.alert("❌ Erro", "Falha ao copiar para clipboard");
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    setIsSharing(true);
    try {
      const success = await copyShareLink(data);
      if (success) {
        Alert.alert("✅ Sucesso", "Link de compartilhamento copiado!");
        onShareSuccess?.();
      } else {
        Alert.alert("❌ Erro", "Falha ao copiar link");
      }
    } catch (error) {
      console.error("Erro ao copiar link:", error);
      Alert.alert("❌ Erro", "Falha ao copiar link");
    } finally {
      setIsSharing(false);
    }
  };

  const handleShareNative = async () => {
    setIsSharing(true);
    try {
      const success = await shareNative(data);
      if (success) {
        onShareSuccess?.();
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      Alert.alert("❌ Erro", "Falha ao compartilhar");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <View className="gap-2">
      <Text className="text-xs text-muted font-semibold mb-1">Compartilhar Estratégia</Text>

      <View className="flex-row gap-2">
        {/* Copy to Clipboard Button */}
        <Pressable
          onPress={handleCopyClipboard}
          disabled={isSharing}
          style={({ pressed }) => [
            {
              opacity: pressed && !isSharing ? 0.7 : 1,
            },
          ]}
          className={cn(
            "flex-1 flex-row items-center justify-center gap-1 px-3 py-2 rounded-lg border",
            "bg-surface border-border"
          )}
        >
          {isSharing ? (
            <ActivityIndicator size="small" color="#0a7ea4" />
          ) : (
            <Text className="text-lg">📋</Text>
          )}
          <Text className="text-xs font-semibold text-foreground">Copiar</Text>
        </Pressable>

        {/* Share Link Button */}
        <Pressable
          onPress={handleCopyLink}
          disabled={isSharing}
          style={({ pressed }) => [
            {
              opacity: pressed && !isSharing ? 0.7 : 1,
            },
          ]}
          className={cn(
            "flex-1 flex-row items-center justify-center gap-1 px-3 py-2 rounded-lg border",
            "bg-surface border-border"
          )}
        >
          {isSharing ? (
            <ActivityIndicator size="small" color="#0a7ea4" />
          ) : (
            <Text className="text-lg">🔗</Text>
          )}
          <Text className="text-xs font-semibold text-foreground">Link</Text>
        </Pressable>

        {/* Native Share Button */}
        <Pressable
          onPress={handleShareNative}
          disabled={isSharing}
          style={({ pressed }) => [
            {
              opacity: pressed && !isSharing ? 0.7 : 1,
            },
          ]}
          className={cn(
            "flex-1 flex-row items-center justify-center gap-1 px-3 py-2 rounded-lg border",
            "bg-primary"
          )}
        >
          {isSharing ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-lg">📤</Text>
          )}
          <Text className="text-xs font-semibold text-background">Mais</Text>
        </Pressable>
      </View>
    </View>
  );
}
