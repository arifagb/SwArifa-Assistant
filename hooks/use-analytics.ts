/**
 * Hook para gerenciar Firebase Analytics
 */

import { useEffect } from "react";
import {
  initializeAnalytics,
  logSearchDefense,
  logViewCounter,
  logVoteCounter,
  logShareStrategy,
  logAddFavorite,
  logRemoveFavorite,
  logLogin,
  logLogout,
  logSync,
  logOverlayToggle,
} from "@/lib/firebase-analytics";

export function useAnalytics() {
  useEffect(() => {
    initializeAnalytics().catch(console.error);
  }, []);

  return {
    logSearchDefense,
    logViewCounter,
    logVoteCounter,
    logShareStrategy,
    logAddFavorite,
    logRemoveFavorite,
    logLogin,
    logLogout,
    logSync,
    logOverlayToggle,
  };
}
