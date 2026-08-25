"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/locales/en.json";
import jp from "@/locales/jp.json";
import { Locale } from "@/types/language";
import { AppContextType } from "@/interfaces/appContext";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "@/utils/localstorage.utils";
import { StorageKey } from "@/configs/storageKeys";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  // ✅ External system sync (localStorage) — VALID useEffect
  useEffect(() => {
    const storedLocale = getItemFromLocalStorage<Locale>(StorageKey.Locale);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedLocale) setLocale(storedLocale);
    setHydrated(true);
  }, []);

  // ✅ Derived data — NOT state
  const translations = locale === "en" ? en : jp;

  const t = (key: string) => {
    return translations[key as keyof typeof translations] ?? key;
  };

  const toggleLocale = () => {
    const next = locale === "en" ? "jp" : "en";
    setLocale(next);
    setItemToLocalStorage(StorageKey.Locale, next);
  };

  // 🔑 Prevent hydration mismatch
  if (!hydrated) return null;

  return (
    <AppContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
