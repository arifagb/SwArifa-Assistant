/**
 * Element Filter Component
 * 
 * Filtro por elemento (água, fogo, vento, luz, escuridão)
 */

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { cn } from "@/lib/utils";

export type Element = "agua" | "fogo" | "vento" | "luz" | "escuridao" | null;

interface ElementFilterProps {
  selectedElement: Element;
  onElementChange: (element: Element) => void;
}

const ELEMENTS = [
  { id: "agua", label: "Água", emoji: "💧", color: "#3b82f6" },
  { id: "fogo", label: "Fogo", emoji: "🔥", color: "#ef4444" },
  { id: "vento", label: "Vento", emoji: "💨", color: "#10b981" },
  { id: "luz", label: "Luz", emoji: "⭐", color: "#fbbf24" },
  { id: "escuridao", label: "Escuridão", emoji: "🌙", color: "#8b5cf6" },
];

export function ElementFilter({
  selectedElement,
  onElementChange,
}: ElementFilterProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-sm font-semibold text-foreground">Filtrar por Elemento</Text>
        {selectedElement && (
          <TouchableOpacity
            onPress={() => onElementChange(null)}
            className="px-3 py-1 rounded-full bg-primary/10"
          >
            <Text className="text-xs text-primary font-semibold">Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {ELEMENTS.map((element) => (
          <TouchableOpacity
            key={element.id}
            onPress={() =>
              onElementChange(
                selectedElement === element.id ? null : (element.id as Element)
              )
            }
            className={cn(
              "flex-row items-center gap-2 px-4 py-2 rounded-full border",
              selectedElement === element.id
                ? "bg-primary border-primary"
                : "bg-surface border-border"
            )}
          >
            <Text className="text-lg">{element.emoji}</Text>
            <Text
              className={cn(
                "text-sm font-semibold",
                selectedElement === element.id
                  ? "text-background"
                  : "text-foreground"
              )}
            >
              {element.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

/**
 * Filtrar monstros por elemento
 */
export function filterByElement(
  monsters: any[],
  element: Element
): any[] {
  if (!element) return monsters;
  return monsters.filter((m) => m.element === element);
}

/**
 * Obter cor do elemento
 */
export function getElementColor(element: Element): string {
  const el = ELEMENTS.find((e) => e.id === element);
  return el?.color || "#666";
}

/**
 * Obter emoji do elemento
 */
export function getElementEmoji(element: Element): string {
  const el = ELEMENTS.find((e) => e.id === element);
  return el?.emoji || "❓";
}
