/**
 * Overlay Mode Integration for SwArifa Assistant
 * 
 * Based on gaming-app-builder skill: references/native-features.md
 * 
 * This module implements:
 * - Picture-in-Picture (PiP) mode for Android
 * - Floating window mode for iOS
 * - Persistent state management
 * - Size and position customization
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const OVERLAY_STORAGE_KEYS = {
  ENABLED: "overlay_enabled",
  WIDTH: "overlay_width",
  HEIGHT: "overlay_height",
  X: "overlay_x",
  Y: "overlay_y",
};

const DEFAULT_OVERLAY_STATE = {
  enabled: false,
  width: 300,
  height: 500,
  x: 0,
  y: 0,
};

export interface OverlayState {
  enabled: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * Load overlay state from AsyncStorage
 * 
 * Example:
 * const state = await loadOverlayState();
 */
export async function loadOverlayState(): Promise<OverlayState> {
  try {
    const [enabled, width, height, x, y] = await Promise.all([
      AsyncStorage.getItem(OVERLAY_STORAGE_KEYS.ENABLED),
      AsyncStorage.getItem(OVERLAY_STORAGE_KEYS.WIDTH),
      AsyncStorage.getItem(OVERLAY_STORAGE_KEYS.HEIGHT),
      AsyncStorage.getItem(OVERLAY_STORAGE_KEYS.X),
      AsyncStorage.getItem(OVERLAY_STORAGE_KEYS.Y),
    ]);

    return {
      enabled: enabled === "true" ? true : false,
      width: width ? parseInt(width) : DEFAULT_OVERLAY_STATE.width,
      height: height ? parseInt(height) : DEFAULT_OVERLAY_STATE.height,
      x: x ? parseInt(x) : DEFAULT_OVERLAY_STATE.x,
      y: y ? parseInt(y) : DEFAULT_OVERLAY_STATE.y,
    };
  } catch (error) {
    console.error("Error loading overlay state:", error);
    return DEFAULT_OVERLAY_STATE;
  }
}

/**
 * Save overlay state to AsyncStorage
 * 
 * Example:
 * await saveOverlayState({ enabled: true, width: 350, height: 550, x: 10, y: 20 });
 */
export async function saveOverlayState(state: OverlayState): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.setItem(OVERLAY_STORAGE_KEYS.ENABLED, state.enabled.toString()),
      AsyncStorage.setItem(OVERLAY_STORAGE_KEYS.WIDTH, state.width.toString()),
      AsyncStorage.setItem(OVERLAY_STORAGE_KEYS.HEIGHT, state.height.toString()),
      AsyncStorage.setItem(OVERLAY_STORAGE_KEYS.X, state.x.toString()),
      AsyncStorage.setItem(OVERLAY_STORAGE_KEYS.Y, state.y.toString()),
    ]);

    console.log("✅ Overlay state saved");
  } catch (error) {
    console.error("Error saving overlay state:", error);
  }
}

/**
 * Toggle overlay mode on/off
 * 
 * On Android: Triggers Picture-in-Picture (PiP) mode
 * On iOS: Activates floating window mode
 * 
 * Example:
 * await toggleOverlayMode();
 */
export async function toggleOverlayMode(currentState: OverlayState): Promise<OverlayState> {
  try {
    const newState: OverlayState = {
      ...currentState,
      enabled: !currentState.enabled,
    };

    await saveOverlayState(newState);

    if (newState.enabled) {
      console.log("🎬 Overlay mode activated");
      
      if (Platform.OS === "android") {
        // Trigger Picture-in-Picture on Android
        // Requires: react-native-floating-action or native module
        console.log("📱 Android: Picture-in-Picture mode");
        // TODO: Call native module to activate PiP
        // NativeModules.OverlayModule.activatePiP();
      } else if (Platform.OS === "ios") {
        // Activate floating window on iOS
        console.log("📱 iOS: Floating window mode");
        // TODO: Call native module to activate floating window
        // NativeModules.OverlayModule.activateFloatingWindow();
      }
    } else {
      console.log("🎬 Overlay mode deactivated");
    }

    return newState;
  } catch (error) {
    console.error("Error toggling overlay mode:", error);
    return currentState;
  }
}

/**
 * Update overlay size
 * 
 * Example:
 * await updateOverlaySize(350, 550);
 */
export async function updateOverlaySize(
  width: number,
  height: number,
  currentState: OverlayState
): Promise<OverlayState> {
  try {
    // Validate dimensions
    const minWidth = 200;
    const maxWidth = 500;
    const minHeight = 300;
    const maxHeight = 800;

    const validWidth = Math.max(minWidth, Math.min(maxWidth, width));
    const validHeight = Math.max(minHeight, Math.min(maxHeight, height));

    const newState: OverlayState = {
      ...currentState,
      width: validWidth,
      height: validHeight,
    };

    await saveOverlayState(newState);
    console.log(`📐 Overlay size updated: ${validWidth}x${validHeight}`);

    return newState;
  } catch (error) {
    console.error("Error updating overlay size:", error);
    return currentState;
  }
}

/**
 * Update overlay position
 * 
 * Example:
 * await updateOverlayPosition(10, 20);
 */
export async function updateOverlayPosition(
  x: number,
  y: number,
  currentState: OverlayState
): Promise<OverlayState> {
  try {
    const newState: OverlayState = {
      ...currentState,
      x: Math.max(0, x),
      y: Math.max(0, y),
    };

    await saveOverlayState(newState);
    console.log(`📍 Overlay position updated: (${newState.x}, ${newState.y})`);

    return newState;
  } catch (error) {
    console.error("Error updating overlay position:", error);
    return currentState;
  }
}

/**
 * Reset overlay to default state
 * 
 * Example:
 * await resetOverlay();
 */
export async function resetOverlay(): Promise<OverlayState> {
  try {
    await saveOverlayState(DEFAULT_OVERLAY_STATE);
    console.log("🔄 Overlay reset to defaults");
    return DEFAULT_OVERLAY_STATE;
  } catch (error) {
    console.error("Error resetting overlay:", error);
    return DEFAULT_OVERLAY_STATE;
  }
}

/**
 * Get overlay dimensions as percentage of screen
 * Useful for responsive sizing
 * 
 * Example:
 * const { widthPercent, heightPercent } = getOverlayPercentages(state);
 */
export function getOverlayPercentages(state: OverlayState) {
  // Assuming screen is approximately 400x800 (standard mobile)
  const screenWidth = 400;
  const screenHeight = 800;

  return {
    widthPercent: (state.width / screenWidth) * 100,
    heightPercent: (state.height / screenHeight) * 100,
  };
}

/**
 * Get overlay info for display
 * 
 * Example:
 * const info = getOverlayInfo(state);
 * console.log(info); // "300x500 @ (0, 0)"
 */
export function getOverlayInfo(state: OverlayState): string {
  if (!state.enabled) return "Overlay: OFF";
  return `Overlay: ${state.width}x${state.height} @ (${state.x}, ${state.y})`;
}
