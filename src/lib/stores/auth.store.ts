import { writable } from "svelte/store";
import type { AuthState } from '$lib/types/auth';


const initialState: AuthState = {
  session: null,
  loading: true,
  error: null,
};

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    setSession: (session: any | null) => {
      update((state) => ({
        ...state,
        session,
        loading: false,
        error: null,
      }));
    },
    setLoading: (loading: boolean) => {
      update((state) => ({ ...state, loading }));
    },
    setError: (error: string | null) => {
      update((state) => ({ ...state, error, loading: false }));
    },
    reset: () => set(initialState),
  };
}

export const authStore = createAuthStore();
