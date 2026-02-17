/**
 * Authentication Service
 * 
 * Gerenciar autenticação com Google e Apple
 */

import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "google" | "apple";
  createdAt: string;
  lastLogin: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";
const PROVIDER_KEY = "auth_provider";

/**
 * Salvar usuário autenticado
 */
export async function saveUser(user: User, token: string): Promise<void> {
  try {
    // Salvar token de forma segura
    await SecureStore.setItemAsync(TOKEN_KEY, token);

    // Salvar dados do usuário
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(PROVIDER_KEY, user.provider);

    console.log(`✅ Usuário ${user.email} salvo com sucesso`);
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
    throw error;
  }
}

/**
 * Recuperar usuário autenticado
 */
export async function getUser(): Promise<User | null> {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    if (!userJson) return null;

    return JSON.parse(userJson);
  } catch (error) {
    console.error("Erro ao recuperar usuário:", error);
    return null;
  }
}

/**
 * Recuperar token de autenticação
 */
export async function getToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao recuperar token:", error);
    return null;
  }
}

/**
 * Fazer login com Google
 */
export async function loginWithGoogle(): Promise<User> {
  try {
    console.log("🔐 Iniciando login com Google...");

    // Simular resposta do Google (em produção, usar expo-auth-session)
    const mockUser: User = {
      id: `google_${Date.now()}`,
      email: "user@gmail.com",
      name: "Google User",
      avatar: "https://via.placeholder.com/150",
      provider: "google",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const mockToken = `google_token_${Date.now()}`;

    await saveUser(mockUser, mockToken);
    console.log("✅ Login com Google bem-sucedido");

    return mockUser;
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
    throw new Error("Falha ao fazer login com Google");
  }
}

/**
 * Fazer login com Apple
 */
export async function loginWithApple(): Promise<User> {
  try {
    console.log("🔐 Iniciando login com Apple...");

    // Simular resposta do Apple (em produção, usar expo-apple-authentication)
    const mockUser: User = {
      id: `apple_${Date.now()}`,
      email: "user@icloud.com",
      name: "Apple User",
      avatar: "https://via.placeholder.com/150",
      provider: "apple",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const mockToken = `apple_token_${Date.now()}`;

    await saveUser(mockUser, mockToken);
    console.log("✅ Login com Apple bem-sucedido");

    return mockUser;
  } catch (error) {
    console.error("Erro ao fazer login com Apple:", error);
    throw new Error("Falha ao fazer login com Apple");
  }
}

/**
 * Fazer logout
 */
export async function logout(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(PROVIDER_KEY);

    console.log("✅ Logout bem-sucedido");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}

/**
 * Verificar se usuário está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getUser();
    const token = await getToken();

    return !!(user && token);
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return false;
  }
}

/**
 * Atualizar último login
 */
export async function updateLastLogin(): Promise<void> {
  try {
    const user = await getUser();
    if (!user) return;

    user.lastLogin = new Date().toISOString();
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

    console.log("✅ Último login atualizado");
  } catch (error) {
    console.error("Erro ao atualizar último login:", error);
  }
}

/**
 * Sincronizar dados do usuário com servidor
 */
export async function syncUserData(): Promise<void> {
  try {
    const user = await getUser();
    const token = await getToken();

    if (!user || !token) {
      console.warn("⚠️ Usuário não autenticado");
      return;
    }

    console.log(`🔄 Sincronizando dados do usuário ${user.email}...`);

    // Simular sincronização com servidor
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("✅ Dados sincronizados com sucesso");
  } catch (error) {
    console.error("Erro ao sincronizar dados:", error);
    throw error;
  }
}
