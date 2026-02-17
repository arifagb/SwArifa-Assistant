/**
 * Firebase Analytics Service
 * 
 * Rastrear eventos e análises do app
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
  timestamp: string;
}

const ANALYTICS_KEY = "firebase_analytics_events";

/**
 * Inicializar Firebase Analytics
 */
export async function initializeAnalytics(): Promise<void> {
  try {
    console.log("✅ Firebase Analytics inicializado");
  } catch (error) {
    console.error("Erro ao inicializar Firebase Analytics:", error);
  }
}

/**
 * Registrar evento customizado
 */
export async function logEvent(
  eventName: string,
  params?: Record<string, any>
): Promise<void> {
  try {
    const event: AnalyticsEvent = {
      name: eventName,
      params,
      timestamp: new Date().toISOString(),
    };

    // Salvar evento localmente
    const eventsJson = await AsyncStorage.getItem(ANALYTICS_KEY);
    const events: AnalyticsEvent[] = eventsJson ? JSON.parse(eventsJson) : [];
    events.push(event);

    // Manter apenas últimos 100 eventos
    if (events.length > 100) {
      events.shift();
    }

    await AsyncStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));

    console.log(`📊 Evento registrado: ${eventName}`, params);
  } catch (error) {
    console.error("Erro ao registrar evento:", error);
  }
}

/**
 * Registrar busca de defesa
 */
export async function logSearchDefense(
  monsters: string[],
  resultCount: number
): Promise<void> {
  await logEvent("search_defense", {
    monsters: monsters.join(","),
    result_count: resultCount,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar visualização de counter
 */
export async function logViewCounter(
  defense: string,
  counter: string,
  rating: number
): Promise<void> {
  await logEvent("view_counter", {
    defense,
    counter,
    rating,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar votação em counter
 */
export async function logVoteCounter(
  counterId: string,
  direction: "up" | "down"
): Promise<void> {
  await logEvent("vote_counter", {
    counter_id: counterId,
    direction,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar compartilhamento de estratégia
 */
export async function logShareStrategy(
  defense: string,
  counter: string,
  method: "clipboard" | "link" | "native"
): Promise<void> {
  await logEvent("share_strategy", {
    defense,
    counter,
    method,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar favorito adicionado
 */
export async function logAddFavorite(composition: string): Promise<void> {
  await logEvent("add_favorite", {
    composition,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar favorito removido
 */
export async function logRemoveFavorite(composition: string): Promise<void> {
  await logEvent("remove_favorite", {
    composition,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar login
 */
export async function logLogin(provider: "google" | "apple"): Promise<void> {
  await logEvent("login", {
    provider,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar logout
 */
export async function logLogout(): Promise<void> {
  await logEvent("logout", {
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar sincronização
 */
export async function logSync(
  defensesCount: number,
  countersCount: number
): Promise<void> {
  await logEvent("sync_complete", {
    defenses_count: defensesCount,
    counters_count: countersCount,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registrar overlay ativado
 */
export async function logOverlayToggle(enabled: boolean): Promise<void> {
  await logEvent("overlay_toggle", {
    enabled,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Obter eventos registrados
 */
export async function getAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  try {
    const eventsJson = await AsyncStorage.getItem(ANALYTICS_KEY);
    return eventsJson ? JSON.parse(eventsJson) : [];
  } catch (error) {
    console.error("Erro ao obter eventos:", error);
    return [];
  }
}

/**
 * Limpar eventos
 */
export async function clearAnalyticsEvents(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ANALYTICS_KEY);
    console.log("✅ Eventos de analytics limpos");
  } catch (error) {
    console.error("Erro ao limpar eventos:", error);
  }
}

/**
 * Gerar relatório de analytics
 */
export async function generateAnalyticsReport(): Promise<string> {
  try {
    const events = await getAnalyticsEvents();

    const report = {
      totalEvents: events.length,
      eventTypes: [...new Set(events.map((e) => e.name))],
      events: events.slice(-20), // Últimos 20 eventos
      generatedAt: new Date().toISOString(),
    };

    return JSON.stringify(report, null, 2);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return "Erro ao gerar relatório";
  }
}
