export type Locale = "zh" | "en";

export const LOCALES: readonly Locale[] = ["zh", "en"] as const;
export const DEFAULT_LOCALE: Locale = "zh";

export const LOCALE_LABELS: Record<Locale, { short: string; long: string; html: string }> = {
  zh: { short: "中", long: "中文", html: "zh-CN" },
  en: { short: "EN", long: "English", html: "en" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
