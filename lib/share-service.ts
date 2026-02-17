/**
 * Share Service
 * 
 * Compartilhar composições e estratégias via clipboard, WhatsApp, Telegram, etc.
 */

import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export interface ShareData {
  defense: {
    monsters: string[];
    rating: number;
  };
  counter: {
    monsters: string[];
    rating: number;
    strategy: string;
    difficulty: string;
  };
}

/**
 * Copiar composição para clipboard
 */
export async function copyToClipboard(data: ShareData): Promise<boolean> {
  try {
    const text = formatCompositionText(data);
    await Clipboard.setStringAsync(text);
    console.log("✅ Composição copiada para clipboard");
    return true;
  } catch (error) {
    console.error("Erro ao copiar para clipboard:", error);
    return false;
  }
}

/**
 * Compartilhar via WhatsApp
 */
export async function shareViaWhatsApp(data: ShareData): Promise<boolean> {
  try {
    const text = formatCompositionText(data);
    const encodedText = encodeURIComponent(text);
    
    // WhatsApp URL scheme
    const whatsappUrl = `whatsapp://send?text=${encodedText}`;
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync("", {
        dialogTitle: "Compartilhar no WhatsApp",
        mimeType: "text/plain",
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Erro ao compartilhar no WhatsApp:", error);
    return false;
  }
}

/**
 * Compartilhar via Telegram
 */
export async function shareViaTelegram(data: ShareData): Promise<boolean> {
  try {
    const text = formatCompositionText(data);
    const encodedText = encodeURIComponent(text);
    
    // Telegram URL scheme
    const telegramUrl = `tg://msg?text=${encodedText}`;
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync("", {
        dialogTitle: "Compartilhar no Telegram",
        mimeType: "text/plain",
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Erro ao compartilhar no Telegram:", error);
    return false;
  }
}

/**
 * Compartilhar via sistema nativo
 */
export async function shareNative(data: ShareData): Promise<boolean> {
  try {
    const text = formatCompositionText(data);
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync("", {
        dialogTitle: "Compartilhar Estratégia",
        mimeType: "text/plain",
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Erro ao compartilhar:", error);
    return false;
  }
}

/**
 * Formatar dados de composição como texto
 */
function formatCompositionText(data: ShareData): string {
  const { defense, counter } = data;
  
  return `🎮 *SwArifa Assistant - Estratégia de Counter*

📍 *Defesa Original:*
${defense.monsters.join(" • ")}
Rating: ${defense.rating}/10

⚔️ *Counter Recomendado:*
${counter.monsters.join(" • ")}
Rating: ${counter.rating}/10

📋 *Estratégia:*
${counter.strategy}

🎯 *Dificuldade:* ${counter.difficulty}

---
Compartilhado via SwArifa Assistant
https://swgt.io`;
}

/**
 * Gerar link para compartilhar
 */
export function generateShareLink(data: ShareData): string {
  const params = new URLSearchParams({
    defense: data.defense.monsters.join(","),
    counter: data.counter.monsters.join(","),
    rating: data.counter.rating.toString(),
  });
  
  return `swgt.io/share?${params.toString()}`;
}

/**
 * Copiar link para compartilhar
 */
export async function copyShareLink(data: ShareData): Promise<boolean> {
  try {
    const link = generateShareLink(data);
    await Clipboard.setStringAsync(link);
    console.log("✅ Link de compartilhamento copiado");
    return true;
  } catch (error) {
    console.error("Erro ao copiar link:", error);
    return false;
  }
}
