"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import en from "@/locales/en.json"
import jp from "@/locales/jp.json"
import { Locale } from "@/types/language"
import { Theme } from "@/types/theme"
import { AppContextType } from "@/interfaces/appContext"


const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en")
    const [translations, setTranslations] = useState(en)

    useEffect(() => {
        setTranslations(locale === "en" ? en : jp)
    }, [locale])

    const t = (key: string) => {
        return translations[key as keyof typeof translations] ?? key
    };

    return (
        <AppContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) throw new Error("useApp must be used inside AppProvider")
    return context
}