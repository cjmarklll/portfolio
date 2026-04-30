import en from "./en";
import zh from "./zh";
import { Locale, TranslationDict } from "./types";

export const translations: Record<Locale, TranslationDict> = { en, zh };

export type { Locale, TranslationDict };
export { en, zh };
