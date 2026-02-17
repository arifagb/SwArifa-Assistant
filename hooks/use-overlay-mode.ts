import { useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OVERLAY_MODE_KEY = "overlay_mode_enabled";
const OVERLAY_SIZE_KEY = "overlay_size";
const OVERLAY_POSITION_KEY = "overlay_position";

export interface OverlaySize {
  width: number;
  height: number;
}

export interface OverlayPosition {
  x: number;
  y: number;
}

export function useOverlayMode() {
  const [isOverlayEnabled, setIsOverlayEnabled] = useState(false);
  const [overlaySize, setOverlaySize] = useState<OverlaySize>({
    width: 300,
    height: 500,
  });
  const [overlayPosition, setOverlayPosition] = useState<OverlayPosition>({
    x: 0,
    y: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load overlay settings from storage
  useEffect(() => {
    loadOverlaySettings();
  }, []);

  const loadOverlaySettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem(OVERLAY_MODE_KEY);
      const size = await AsyncStorage.getItem(OVERLAY_SIZE_KEY);
      const position = await AsyncStorage.getItem(OVERLAY_POSITION_KEY);

      if (enabled) {
        setIsOverlayEnabled(JSON.parse(enabled));
      }

      if (size) {
        setOverlaySize(JSON.parse(size));
      }

      if (position) {
        setOverlayPosition(JSON.parse(position));
      }
    } catch (error) {
      console.error("Error loading overlay settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOverlayMode = async (enabled: boolean) => {
    try {
      setIsOverlayEnabled(enabled);
      await AsyncStorage.setItem(OVERLAY_MODE_KEY, JSON.stringify(enabled));

      if (Platform.OS === "android") {
        // Android: Use Picture-in-Picture mode
        // This would require native module integration
        console.log("Enabling PiP mode on Android");
      } else if (Platform.OS === "ios") {
        // iOS: Use floating window mode
        // This would require native module integration
        console.log("Enabling floating window mode on iOS");
      }
    } catch (error) {
      console.error("Error toggling overlay mode:", error);
    }
  };

  const updateOverlaySize = async (size: OverlaySize) => {
    try {
      setOverlaySize(size);
      await AsyncStorage.setItem(OVERLAY_SIZE_KEY, JSON.stringify(size));
    } catch (error) {
      console.error("Error updating overlay size:", error);
    }
  };

  const updateOverlayPosition = async (position: OverlayPosition) => {
    try {
      setOverlayPosition(position);
      await AsyncStorage.setItem(OVERLAY_POSITION_KEY, JSON.stringify(position));
    } catch (error) {
      console.error("Error updating overlay position:", error);
    }
  };

  const resetOverlaySettings = async () => {
    try {
      setOverlaySize({ width: 300, height: 500 });
      setOverlayPosition({ x: 0, y: 0 });
      await AsyncStorage.multiRemove([
        OVERLAY_SIZE_KEY,
        OVERLAY_POSITION_KEY,
      ]);
    } catch (error) {
      console.error("Error resetting overlay settings:", error);
    }
  };

  return {
    isOverlayEnabled,
    overlaySize,
    overlayPosition,
    isLoading,
    toggleOverlayMode,
    updateOverlaySize,
    updateOverlayPosition,
    resetOverlaySettings,
    isAndroid: Platform.OS === "android",
    isIOS: Platform.OS === "ios",
  };
}
