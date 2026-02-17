/**
 * Counter Vote Component
 * 
 * Permite votar em counters com botões 👍 e 👎
 * Integra com swgt-real-api para registrar votos
 */

import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { voteCounter } from "@/lib/swgt-real-api";
import { cn } from "@/lib/utils";

interface CounterVoteProps {
  counterId: string;
  initialVotes: number;
  onVoteSuccess?: (direction: "up" | "down") => void;
}

export function CounterVote({
  counterId,
  initialVotes,
  onVoteSuccess,
}: CounterVoteProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (direction: "up" | "down") => {
    // Evitar votar duas vezes
    if (userVote === direction) {
      return;
    }

    setIsVoting(true);
    try {
      const success = await voteCounter(counterId, direction);

      if (success) {
        // Atualizar votos localmente
        if (direction === "up") {
          setVotes(votes + 1);
        } else {
          setVotes(Math.max(votes - 1, 0));
        }

        setUserVote(direction);
        onVoteSuccess?.(direction);

        // Feedback visual
        console.log(`✅ Voto ${direction} registrado para ${counterId}`);
      } else {
        console.error("Erro ao registrar voto");
      }
    } catch (error) {
      console.error("Erro ao votar:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <View className="flex-row items-center gap-2">
      {/* Upvote Button */}
      <Pressable
        onPress={() => handleVote("up")}
        disabled={isVoting || userVote === "up"}
        style={({ pressed }) => [
          {
            opacity: pressed && !isVoting ? 0.7 : 1,
          },
        ]}
        className={cn(
          "flex-row items-center gap-1 px-3 py-2 rounded-lg border",
          userVote === "up"
            ? "bg-success/20 border-success"
            : "bg-surface border-border"
        )}
      >
        {isVoting && userVote === "up" ? (
          <ActivityIndicator size="small" color="#22C55E" />
        ) : (
          <Text className={userVote === "up" ? "text-success" : "text-muted"}>
            👍
          </Text>
        )}
        <Text
          className={cn(
            "text-xs font-semibold",
            userVote === "up" ? "text-success" : "text-muted"
          )}
        >
          Útil
        </Text>
      </Pressable>

      {/* Vote Count */}
      <View className="flex-row items-center gap-1 px-2 py-2 bg-surface rounded-lg border border-border">
        <Text className="text-xs text-muted font-semibold">{votes}</Text>
      </View>

      {/* Downvote Button */}
      <Pressable
        onPress={() => handleVote("down")}
        disabled={isVoting || userVote === "down"}
        style={({ pressed }) => [
          {
            opacity: pressed && !isVoting ? 0.7 : 1,
          },
        ]}
        className={cn(
          "flex-row items-center gap-1 px-3 py-2 rounded-lg border",
          userVote === "down"
            ? "bg-error/20 border-error"
            : "bg-surface border-border"
        )}
      >
        {isVoting && userVote === "down" ? (
          <ActivityIndicator size="small" color="#EF4444" />
        ) : (
          <Text className={userVote === "down" ? "text-error" : "text-muted"}>
            👎
          </Text>
        )}
        <Text
          className={cn(
            "text-xs font-semibold",
            userVote === "down" ? "text-error" : "text-muted"
          )}
        >
          Inútil
        </Text>
      </Pressable>
    </View>
  );
}
