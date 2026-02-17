/**
 * Hook para gerenciar autenticação social (Google/Apple)
 */

import { useEffect, useState, useCallback } from "react";
import {
  loginWithGoogle,
  loginWithApple,
  logout,
  getUser,
  isAuthenticated,
  updateLastLogin,
  syncUserData,
  type User,
  type AuthState,
} from "@/lib/auth-service";

export function useSocialAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });

  // Verificar autenticação ao iniciar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        const authenticated = await isAuthenticated();
        if (authenticated) {
          const user = await getUser();
          await updateLastLogin();
          await syncUserData();

          setState({
            isAuthenticated: true,
            user,
            token: "cached_token",
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    };

    checkAuth();
  }, []);

  const handleLoginGoogle = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const user = await loginWithGoogle();
      setState({
        isAuthenticated: true,
        user,
        token: "google_token",
        isLoading: false,
        error: null,
      });

      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao fazer login";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const handleLoginApple = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const user = await loginWithApple();
      setState({
        isAuthenticated: true,
        user,
        token: "apple_token",
        isLoading: false,
        error: null,
      });

      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao fazer login";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      await logout();
      setState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao fazer logout";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  return {
    ...state,
    loginWithGoogle: handleLoginGoogle,
    loginWithApple: handleLoginApple,
    logout: handleLogout,
  };
}
