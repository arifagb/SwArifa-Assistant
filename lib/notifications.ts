import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LAST_NOTIFICATION_KEY = "last_notification_time";
const NOTIFICATION_INTERVAL_HOURS = 6; // Notificar a cada 6 horas

/**
 * Configurar handler de notificações
 */
export async function setupNotifications() {
  try {
    // Configurar como as notificações são exibidas quando o app está em foreground
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    // Pedir permissão para notificações
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.warn("Notificações não foram autorizadas");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao configurar notificações:", error);
    return false;
  }
}

/**
 * Enviar notificação de novo counter trending
 */
export async function notifyNewTrendingCounter(
  defenseMonsters: string[],
  counterMonsters: string[],
  rating: number
) {
  try {
    const lastNotificationTime = await AsyncStorage.getItem(LAST_NOTIFICATION_KEY);
    const now = Date.now();
    const lastTime = lastNotificationTime ? parseInt(lastNotificationTime) : 0;
    const hoursSinceLastNotification = (now - lastTime) / (1000 * 60 * 60);

    // Só enviar notificação se passou o intervalo mínimo
    if (hoursSinceLastNotification < NOTIFICATION_INTERVAL_HOURS) {
      return;
    }

    const defenseStr = defenseMonsters.join(" / ");
    const counterStr = counterMonsters.join(" / ");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⭐ Novo Counter Trending!",
        body: `${counterStr} é um excelente counter para ${defenseStr}`,
        data: {
          defense: JSON.stringify(defenseMonsters),
          counter: JSON.stringify(counterMonsters),
          rating: rating.toString(),
        },
      },
      trigger: null, // Enviar imediatamente
    });

    // Atualizar último tempo de notificação
    await AsyncStorage.setItem(LAST_NOTIFICATION_KEY, now.toString());
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
}

/**
 * Enviar notificação de composição favorita atualizada
 */
export async function notifyFavoriteCompositionUpdated(
  compositionMonsters: string[],
  newCountersCount: number
) {
  try {
    const composition = compositionMonsters.join(" / ");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔔 Sua composição favorita foi atualizada!",
        body: `${newCountersCount} novos counters adicionados para ${composition}`,
        data: {
          composition: JSON.stringify(compositionMonsters),
          newCountersCount: newCountersCount.toString(),
        },
      },
      trigger: null, // Enviar imediatamente
    });
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
}

/**
 * Enviar notificação de sincronização de dados
 */
export async function notifySyncComplete(newCompositionsCount: number) {
  try {
    if (newCompositionsCount === 0) {
      return; // Não notificar se não há novidades
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "✅ Dados sincronizados!",
        body: `${newCompositionsCount} novas composições adicionadas do swgt.io`,
        data: {
          newCompositionsCount: newCompositionsCount.toString(),
        },
      },
      trigger: null, // Enviar imediatamente
    });
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
}

/**
 * Agendar sincronização periódica com notificações
 */
export async function schedulePeriodicSync() {
  try {
    // Agendar notificação a cada 6 horas
    const sixHoursInSeconds = 6 * 60 * 60;
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔄 Sincronizando dados...",
        body: "Buscando novas composições e counters do swgt.io",
      },
      trigger: {
        seconds: sixHoursInSeconds,
        repeats: true,
        type: "timeInterval",
      } as any, // Type assertion para compatibilidade
    });
  } catch (error) {
    console.error("Erro ao agendar sincronização:", error);
  }
}

/**
 * Cancelar todas as notificações agendadas
 */
export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Erro ao cancelar notificações:", error);
  }
}
