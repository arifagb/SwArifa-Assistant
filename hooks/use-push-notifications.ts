/**
 * Hook para gerenciar notificações push
 */

import { useEffect, useRef } from "react";
import {
  initializePushNotifications,
  schedulePeriodicSyncNotifications,
  registerNotificationListener,
  notifyNewTrendingCounter,
  notifyFavoriteCompositionUpdated,
} from "@/lib/push-notifications-service";

export function usePushNotifications() {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Inicializar notificações
    initializePushNotifications().catch(console.error);

    // Agendar sincronização periódica
    schedulePeriodicSyncNotifications();

    // Registrar listener
    unsubscribeRef.current = registerNotificationListener((notification) => {
      console.log("📬 Notificação recebida:", notification);

      // Processar notificação
      const data = notification.request.content.data;
      if (data.type === "trending") {
        console.log(`🔥 Novo counter trending: ${data.counter}`);
      } else if (data.type === "favorite_updated") {
        console.log(`⭐ Composição favorita atualizada: ${data.composition}`);
      }
    });

    // Cleanup
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return {
    notifyNewTrendingCounter,
    notifyFavoriteCompositionUpdated,
  };
}
