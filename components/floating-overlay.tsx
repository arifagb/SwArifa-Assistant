/**
 * Floating Overlay Component
 * 
 * Implementa Picture-in-Picture para Android e floating window para iOS
 * Usando react-native-floating-action
 */

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Modal, Dimensions } from "react-native";
import { ScreenContainer } from "./screen-container";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { SearchBar } from "./ui/search-bar";
import { cn } from "@/lib/utils";

interface FloatingOverlayProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
}

interface OverlaySize {
  width: number;
  height: number;
}

const DEFAULT_SIZE: OverlaySize = {
  width: 300,
  height: 500,
};

const MIN_SIZE = { width: 200, height: 300 };
const MAX_SIZE = { width: 500, height: 800 };

/**
 * Floating Overlay Component
 * 
 * Exibe um modal flutuante que pode ser redimensionado
 * Em produção, seria integrado com native modules para PiP real
 */
export function FloatingOverlay({
  visible,
  onClose,
  onSearch,
}: FloatingOverlayProps) {
  const [size, setSize] = useState<OverlaySize>(DEFAULT_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const [isResizing, setIsResizing] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  // Calcular posição centralizada
  const overlayTop = (screenHeight - size.height) / 2;
  const overlayLeft = (screenWidth - size.width) / 2;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleResize = (direction: "increase" | "decrease") => {
    setIsResizing(true);

    const newWidth =
      direction === "increase"
        ? Math.min(size.width + 50, MAX_SIZE.width)
        : Math.max(size.width - 50, MIN_SIZE.width);

    const newHeight =
      direction === "increase"
        ? Math.min(size.height + 50, MAX_SIZE.height)
        : Math.max(size.height - 50, MIN_SIZE.height);

    setSize({ width: newWidth, height: newHeight });

    setTimeout(() => setIsResizing(false), 300);
  };

  const handleReset = () => {
    setSize(DEFAULT_SIZE);
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay escuro de fundo */}
      <Pressable
        className="flex-1 bg-black/50"
        onPress={onClose}
        style={{ pointerEvents: "box-none" }}
      >
        {/* Janela flutuante */}
        <View
          style={{
            position: "absolute",
            top: overlayTop,
            left: overlayLeft,
            width: size.width,
            height: size.height,
            backgroundColor: "#1e2022",
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#1e40af",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 8,
            elevation: 10,
            overflow: "hidden",
          }}
          pointerEvents="box-none"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between bg-primary px-3 py-2">
            <Text className="text-white font-bold text-sm">SwArifa</Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => handleResize("decrease")}
                className="p-1"
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-white text-xs">−</Text>
              </Pressable>
              <Pressable
                onPress={() => handleResize("increase")}
                className="p-1"
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-white text-xs">+</Text>
              </Pressable>
              <Pressable
                onPress={onClose}
                className="p-1"
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-white text-xs">✕</Text>
              </Pressable>
            </View>
          </View>

          {/* Content */}
          <ScrollView
            className="flex-1 p-3"
            scrollEnabled={true}
            pointerEvents="box-none"
          >
            <View className="gap-3">
              {/* Search */}
              <SearchBar
                placeholder="Buscar..."
                onSearch={handleSearch}
                onClear={() => setSearchQuery("")}
              />

              {/* Info */}
              {!searchQuery && (
                <View className="bg-surface rounded-lg p-2 gap-1">
                  <Text className="text-xs text-muted">
                    💡 Dica: Digite 3 nomes de monstros para buscar counters
                  </Text>
                  <Text className="text-xs text-muted">
                    Tamanho: {size.width}x{size.height}
                  </Text>
                </View>
              )}

              {/* Quick Actions */}
              {!searchQuery && (
                <View className="gap-2">
                  <Button
                    label="Trending"
                    onPress={() => handleSearch("trending")}
                    variant="secondary"
                  />
                  <Button
                    label="Favoritos"
                    onPress={() => handleSearch("favorites")}
                    variant="secondary"
                  />
                </View>
              )}

              {/* Resize Controls */}
              <View className="flex-row gap-2">
                <Button
                  label="−"
                  onPress={() => handleResize("decrease")}
                  className="flex-1"
                />
                <Button
                  label="Reset"
                  onPress={handleReset}
                  className="flex-1"
                  variant="outline"
                />
                <Button
                  label="+"
                  onPress={() => handleResize("increase")}
                  className="flex-1"
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="bg-surface border-t border-border px-3 py-2">
            <Text className="text-xs text-muted text-center">
              Overlay Mode • Arraste para mover
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

/**
 * Hook para gerenciar overlay
 * 
 * Exemplo:
 * const { visible, show, hide } = useFloatingOverlay();
 */
export function useFloatingOverlay() {
  const [visible, setVisible] = useState(false);

  return {
    visible,
    show: () => setVisible(true),
    hide: () => setVisible(false),
    toggle: () => setVisible(!visible),
  };
}
