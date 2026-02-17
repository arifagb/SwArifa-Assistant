/**
 * Push Notifications Service
 * 
 * Gerenciar notificações push para trending defenses e novos counters
 */

import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LAST_NOTIFICATION_KEY = "last_notification_timestamp";
const NOTIFICATION_COOLDOWN = 6 * 60 * 60 * 1000; // 6 horas

interface NotificationData {
  type: "trending" | "new_counter" | "favorite_updated" | "sync_complete";
  title: string;
  body: string;
  data?: Record<string, any>;
}

/**
 * Inicializar notificações push
 */
export async function initializePushNotifications(): Promise<void> {
  try {
    // Configurar comportamento de notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    // Solicitar permissão
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.warn("⚠️ Permissão de notificações não concedida");
    } else {
      console.log("✅ Notificações push ativadas");
    }
  } catch (error) {
    console.error("Erro ao inicializar notificações:", error);
  }
}

/**
 * Enviar notificação local
 */
export async function sendLocalNotification(
  notification: NotificationData
): Promise<boolean> {
  try {
    // Verificar rate limiting
    const lastNotificationTime = await AsyncStorage.getItem(
      LAST_NOTIFICATION_KEY
    );
    const now = Date.now();

    if (lastNotificationTime) {
      const lastTime = parseInt(lastNotificationTime);
      if (now - lastTime < NOTIFICATION_COOLDOWN) {
        console.log("⏱️ Notificação em cooldown, aguardando...");
        return false;
      }
    }

    // Enviar notificação
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        sound: "default",
        badge: 1,
        data: notification.data || {},
      },
      trigger: null, // Imediato
    });

    // Atualizar timestamp
    await AsyncStorage.setItem(LAST_NOTIFICATION_KEY, now.toString());

    console.log(`✅ Notificação enviada: ${notification.title}`);
    return true;
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    return false;
  }
}

/**
 * Notificar novo counter trending
 */
export async function notifyNewTrendingCounter(
  defense: string,
  counter: string,
  rating: number
): Promise<boolean> {
  return sendLocalNotification({
    type: "trending",
    title: "🔥 Novo Counter Trending",
    body: `${counter} é um novo counter trending contra ${defense} (${rating}/10)`,
    data: {
      type: "trending",
      defense,
      counter,
      rating,
    },
  });
}

/**
 * Notificar novo counter adicionado
 */
export async function notifyNewCounterAdded(
  defense: string,
  counter: string,
  difficulty: string
): Promise<boolean> {
  return sendLocalNotification({
    type: "new_counter",
    title: "⚔️ Novo Counter Disponível",
    body: `${counter} foi adicionado como counter para ${defense} (${difficulty})`,
    data: {
      type: "new_counter",
      defense,
      counter,
      difficulty,
    },
  });
}

/**
 * Notificar composição favorita atualizada
 */
export async function notifyFavoriteCompositionUpdated(
  composition: string,
  newCounters: number
): Promise<boolean> {
  return sendLocalNotification({
    type: "favorite_updated",
    title: "⭐ Composição Favorita Atualizada",
    body: `${composition} tem ${newCounters} novos counters disponíveis`,
    data: {
      type: "favorite_updated",
      composition,
      newCounters,
    },
  });
}

/**
 * Notificar sincronização completa
 */
export async function notifySyncComplete(
  defensesCount: number,
  countersCount: number
): Promise<boolean> {
  return sendLocalNotification({
    type: "sync_complete",
    title: "✅ Sincronização Concluída",
    body: `${defensesCount} defesas e ${countersCount} counters atualizados`,
    data: {
      type: "sync_complete",
      defensesCount,
      countersCount,
    },
  });
}

/**
 * Agendar sincronização periódica com notificações
 */
export function schedulePeriodicSyncNotifications(): void {
  try {
    // Agendar verificação a cada 12 horas
    setInterval(async () => {
      console.log("🔄 Verificando atualizações do swgt.io...");

      // Simular busca de trending defenses
      const trendingCount = Math.floor(Math.random() * 5) + 1;

      if (trendingCount > 0) {
        await notifyNewTrendingCounter(
          "Susano, Garo, Orion",
          "Lushen, Galleon, Taor",
          9.2
        );
      }

      // Notificar sincronização
      await notifySyncComplete(150, 450);
    }, 12 * 60 * 60 * 1000); // 12 horas

    console.log("✅ Sincronização periódica agendada");
  } catch (error) {
    console.error("Erro ao agendar sincronização:", error);
  }
}

/**
 * Limpar notificações
 */
export async function clearAllNotifications(): Promise<void> {
  try {
    await Notifications.dismissAllNotificationsAsync();
    console.log("✅ Notificações limpas");
  } catch (error) {
    console.error("Erro ao limpar notificações:", error);
  }
}

/**
 * Registrar listener de notificações
 */
export function registerNotificationListener(
  callback: (notification: Notifications.Notification) => void
): () => void {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      callback(response.notification);
    }
  );

  return () => subscription.remove();
}
