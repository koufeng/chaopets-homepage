import { DEFAULT_LOCALE, LOCALES, isLocale } from "./types";
import type { Locale } from "./types";
import zh from "./zh";
import en from "./en";

export type { Locale };
export { LOCALES, DEFAULT_LOCALE, isLocale, LOCALE_LABELS } from "./types";

export type Translations = typeof zh;

export const dictionaries: Record<Locale, Translations> = {
  zh,
  en: en as unknown as Translations,
};

export function getDict(lang: Locale): Translations {
  return dictionaries[lang] ?? dictionaries[DEFAULT_LOCALE];
}

/**
 * 从 URL pathname 解析当前 locale。
 * 例如 `/en/beasts/jin` -> "en"，`/beasts/jin` -> "zh"。
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return segments[0];
  }
  return DEFAULT_LOCALE;
}

/**
 * 把一个"逻辑路径"前缀化到指定 locale。默认 locale (zh) 不加前缀。
 * - localizedPath('/origin', 'zh') -> '/origin'
 * - localizedPath('/origin', 'en') -> '/en/origin'
 * - localizedPath('/', 'en')       -> '/en/'
 */
export function localizedPath(path: string, lang: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LOCALE) return clean;
  if (clean === "/") return `/${lang}/`;
  return `/${lang}${clean}`;
}

/**
 * 把一个完整的 pathname (如 `/en/beasts/jin`) 切到目标 locale 的同名页面。
 */
export function switchLocaleHref(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  let logical = segments;
  if (logical.length > 0 && isLocale(logical[0])) {
    logical = logical.slice(1);
  }
  const logicalPath = logical.length === 0 ? "/" : `/${logical.join("/")}`;
  return localizedPath(logicalPath, target);
}

/**
 * 接力函数：解析 Astro.url.pathname 并返回 t 字典 + 当前 locale。
 */
export function getI18n(pathname: string): { lang: Locale; t: Translations } {
  const lang = getLocaleFromPath(pathname);
  return { lang, t: getDict(lang) };
}
