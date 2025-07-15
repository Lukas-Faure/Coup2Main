import { writable } from "svelte/store";
import { browser } from "$app/environment";

type Theme = "light" | "dark";

function createThemeStore() {
  const getInitialTheme = (): Theme => {
    if (!browser) return "light";

    const stored = localStorage.getItem("coup2main-theme") as Theme;
    if (stored && ["light", "dark"].includes(stored)) {
      return stored;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  };

  const { subscribe, set, update } = writable<Theme>(getInitialTheme());

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      if (browser) {
        localStorage.setItem("coup2main-theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
      set(theme);
    },
    toggleTheme: () => {
      update((currentTheme) => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        if (browser) {
          localStorage.setItem("coup2main-theme", newTheme);
          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark",
          );
        }
        return newTheme;
      });
    },
    initialize: () => {
      if (browser) {
        const theme = getInitialTheme();
        document.documentElement.classList.toggle("dark", theme === "dark");
        set(theme);
      }
    },
  };
}

export const themeStore = createThemeStore();
