/**
 * Notifications Integration for SwArifa Assistant
 * 
 * Based on gaming-app-builder skill: references/native-features.md
 * 
 * This module implements:
 * - Push notification setup and permissions
 * - Notifications for trending counters
 * - Notifications for favorite composition updates
 * - Rate limiting to avoid spam
 */

import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATION_KEYS = {
  TRENDING_COUNTER: "last_trending_notification",
  FAVORITE_UPDATE: "last_favorite_notification",
  SYNC_COMPLETE: "last_sync_notification",
};

const NOTIFICATION_INTERVALS = {
  TRENDING_COUNTER: 6, // 6 hours
  FAVORITE_UPDATE: 12, // 12 hours
  SYNC_COMPLETE: 24, // 24 hours
};

/**
 * Setup notification handler
 * Call this once in app initialization (e.g., in app/_layout.tsx useEffect)
 */
export async function setupNotifications(): Promise<boolean> {
  try {
    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    
    if (status !== "granted") {
      console.warn("Notification permissions not granted");
      return false;
    }

    console.log("✅ Notifications setup complete");
    return true;
  } catch (error) {
    console.error("Notification setup error:", error);
    return false;
  }
}

/**
 * Notify user about new trending counter
 * 
 * Example:
 * await notifyNewTrendingCounter("Lushen", "Galleon", "Taor", 9.2);
 */
export async function notifyNewTrendingCounter(
  monster1: string,
  monster2: string,
  monster3: string,
  rating: number
): Promise<void> {
  await notifyIfReady(
    NOTIFICATION_KEYS.TRENDING_COUNTER,
    `New Trending Counter: ${monster1}, ${monster2}, ${monster3}`,
    `Rating: ${rating.toFixed(1)} ⭐ - Tap to view strategy`,
    NOTIFICATION_INTERVALS.TRENDING_COUNTER
  );
}

/**
 * Notify user about favorite composition update
 * 
 * Example:
 * await notifyFavoriteCompositionUpdated("Susano, Garo, Orion");
 */
export async function notifyFavoriteCompositionUpdated(
  composition: string
): Promise<void> {
  await notifyIfReady(
    NOTIFICATION_KEYS.FAVORITE_UPDATE,
    `Favorite Composition Updated`,
    `${composition} has new counters available`,
    NOTIFICATION_INTERVALS.FAVORITE_UPDATE
  );
}

/**
 * Notify user about sync completion
 * 
 * Example:
 * await notifySyncComplete(25);
 */
export async function notifySyncComplete(newCounters: number): Promise<void> {
  await notifyIfReady(
    NOTIFICATION_KEYS.SYNC_COMPLETE,
    `SwArifa Sync Complete`,
    `${newCounters} new counters added from swgt.io`,
    NOTIFICATION_INTERVALS.SYNC_COMPLETE
  );
}

/**
 * Internal: Send notification with rate limiting
 * 
 * Checks if enough time has passed since last notification
 * before sending a new one
 */
async function notifyIfReady(
  key: string,
  title: string,
  body: string,
  minIntervalHours: number
): Promise<void> {
  try {
    const lastTime = await AsyncStorage.getItem(key);
    const now = Date.now();
    const lastMs = lastTime ? parseInt(lastTime) : 0;
    const hoursPassed = (now - lastMs) / (1000 * 60 * 60) as number;

    // Check if enough time has passed
    if (hoursPassed < minIntervalHours) {
      console.log(`⏳ Rate limit: ${(minIntervalHours - hoursPassed).toFixed(1)}h remaining`);
      return;
    }

    // Send notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: key },
      },
      trigger: null, // Send immediately
    });

    // Update last notification time
    await AsyncStorage.setItem(key, now.toString());
    console.log(`📢 Notification sent: ${title}`);
  } catch (error) {
    console.error("Notification error:", error);
  }
}

/**
 * Handle notification taps
 * Call this in app/_layout.tsx useEffect to listen for taps
 * 
 * Example:
 * useEffect(() => {
 *   const subscription = setupNotificationHandler();
 *   return () => subscription?.remove();
 * }, []);
 */
export function setupNotificationHandler() {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const { title, body, data } = response.notification.request.content;

    console.log("📬 Notification tapped:", { title, body, data });

    // Navigate based on notification type
    if (data.type === NOTIFICATION_KEYS.TRENDING_COUNTER) {
      // Navigate to search results or trending page
      // router.push("/search-results");
    } else if (data.type === NOTIFICATION_KEYS.FAVORITE_UPDATE) {
      // Navigate to favorites
      // router.push("/(tabs)/favorites");
    }
  });
}

/**
 * Clear all notification rate limits
 * Useful for testing or when user explicitly wants to reset
 */
export async function clearNotificationLimits(): Promise<void> {
  try {
    await Promise.all(
      Object.values(NOTIFICATION_KEYS).map((key) =>
        AsyncStorage.removeItem(key)
      )
    );
    console.log("✅ Notification limits cleared");
  } catch (error) {
    console.error("Error clearing notification limits:", error);
  }
}

/**
 * Schedule periodic sync notifications
 * Call this to set up recurring notifications every 6 hours
 * 
 * Example:
 * await schedulePeriodicSync();
 */
export async function schedulePeriodicSync(): Promise<void> {
  try {
    // Schedule recurring notification every 6 hours
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "SwArifa Sync",
        body: "Checking for new counters from swgt.io...",
        data: { type: "sync" },
      },
      trigger: {
        seconds: 6 * 60 * 60, // 6 hours
        repeats: true,
      } as any,
    });

    console.log("⏰ Periodic sync scheduled (every 6 hours)");
  } catch (error) {
    console.error("Error scheduling periodic sync:", error);
  }
}
