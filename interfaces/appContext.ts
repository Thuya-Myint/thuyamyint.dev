import { Locale } from "@/types/language";
import { Theme } from "@/types/theme";

export interface AppContextType {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: string) => string;
    toggleLocale: () => void


}