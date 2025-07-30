import { create } from "zustand";
import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";

// Internet Identity configuration based on environment
const getIdentityProvider = () => {
  const network = process.env.DFX_NETWORK || "local";

  if (network === "ic") {
    // Production - Mainnet
    return "https://identity.ic0.app";
  } else {
    // Development - Local
    return "http://uzt4z-lp777-77774-qaabq-cai.localhost:4943/";
  }
};

export interface AuthState {
  // State
  isAuthenticated: boolean;
  principal: string | null;
  identity: Identity | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: () => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  principal: null,
  identity: null,
  isLoading: false,
  error: null,

  // Initialize auth client and check for existing session
  initialize: async () => {
    try {
      set({ isLoading: true, error: null });

      const authClient = await AuthClient.create({
        idleOptions: {
          idleTimeout: 10 * 60 * 1000, // 10 minutes
          onIdle: () => {
            get().logout();
          },
        },
      });

      const isAuthenticated = await authClient.isAuthenticated();

      if (isAuthenticated) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();

        set({
          isAuthenticated: true,
          identity,
          principal,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          identity: null,
          principal: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to initialize authentication",
        isLoading: false,
      });
    }
  },

  // Login with Internet Identity
  login: async () => {
    try {
      set({ isLoading: true, error: null });

      const authClient = await AuthClient.create();
      const identityProvider = getIdentityProvider();

      await new Promise<void>((resolve, reject) => {
        authClient.login({
          identityProvider,
          onSuccess: () => {
            const identity = authClient.getIdentity();
            const principal = identity.getPrincipal().toText();

            set({
              isAuthenticated: true,
              identity,
              principal,
              isLoading: false,
            });
            resolve();
          },
          onError: (error: unknown) => {
            console.error("Login error:", error);
            set({
              error: error instanceof Error ? error.message : "Login failed",
              isLoading: false,
            });
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error("Login error:", error);
      set({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false,
      });
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ isLoading: true, error: null });

      const authClient = await AuthClient.create();
      await authClient.logout();

      set({
        isAuthenticated: false,
        identity: null,
        principal: null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
      set({
        error: error instanceof Error ? error.message : "Logout failed",
        isLoading: false,
      });
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

// Hook for easy access to auth state and actions
export const useAuth = () => {
  const store = useAuthStore();

  return {
    // State
    isAuthenticated: store.isAuthenticated,
    principal: store.principal,
    identity: store.identity,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    login: store.login,
    logout: store.logout,
    initialize: store.initialize,
    clearError: store.clearError,
  };
};

// Utility function to get current environment info
export const getEnvironmentInfo = () => {
  const network = process.env.DFX_NETWORK || "local";
  const isDevelopment = network !== "ic";
  const identityProvider = getIdentityProvider();

  return {
    network,
    isDevelopment,
    identityProvider,
  };
};
