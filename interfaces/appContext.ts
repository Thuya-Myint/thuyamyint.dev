import { Locale } from "@/types/language";

export interface AppContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  toggleLocale: () => void


}