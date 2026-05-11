import type { Locale } from "@/i18n/types";

export interface I18nString {
  zh: string;
  en: string;
}

export interface ShichenInfo {
  index: number;
  name: I18nString;
  zhi: string;
  hours: [number, number];
  element: "water" | "wood" | "fire" | "earth" | "metal";
  yinYang: "yin" | "yang";
  vibe: I18nString;
  gradient: [string, string, string];
}

export interface LocalizedShichen {
  index: number;
  name: string;
  zhi: string;
  hours: [number, number];
  element: ShichenInfo["element"];
  yinYang: ShichenInfo["yinYang"];
  vibe: string;
  gradient: [string, string, string];
}

export const SHICHEN: readonly ShichenInfo[] = [
  { index: 0,  name: { zh: "子时", en: "Hour of Zi" },  zhi: "子", hours: [23, 1],  element: "water", yinYang: "yin",  vibe: { zh: "夜深似井，水气最旺", en: "Night runs deep, water at its peak" }, gradient: ["#0E1530", "#1F2A55", "#3D4F8A"] },
  { index: 1,  name: { zh: "丑时", en: "Hour of Chou" }, zhi: "丑", hours: [1, 3],   element: "earth", yinYang: "yin",  vibe: { zh: "土归于静",           en: "Earth settles into stillness" },     gradient: ["#1A1326", "#3A2840", "#695168"] },
  { index: 2,  name: { zh: "寅时", en: "Hour of Yin" },  zhi: "寅", hours: [3, 5],   element: "wood",  yinYang: "yang", vibe: { zh: "木欲萌动",           en: "Wood begins to stir" },              gradient: ["#1B2A24", "#345D43", "#7AAA76"] },
  { index: 3,  name: { zh: "卯时", en: "Hour of Mao" },  zhi: "卯", hours: [5, 7],   element: "wood",  yinYang: "yin",  vibe: { zh: "初阳照木",           en: "First sun on wood" },                gradient: ["#3D5A3B", "#94B689", "#E1E1B5"] },
  { index: 4,  name: { zh: "辰时", en: "Hour of Chen" }, zhi: "辰", hours: [7, 9],   element: "earth", yinYang: "yang", vibe: { zh: "土承万生",           en: "Earth bears all life" },             gradient: ["#7E5532", "#D8B795", "#FBE9CC"] },
  { index: 5,  name: { zh: "巳时", en: "Hour of Si" },   zhi: "巳", hours: [9, 11],  element: "fire",  yinYang: "yin",  vibe: { zh: "阳气初炽",           en: "Yang begins to blaze" },             gradient: ["#A86B3D", "#E5A579", "#FFE4C2"] },
  { index: 6,  name: { zh: "午时", en: "Hour of Wu" },   zhi: "午", hours: [11, 13], element: "fire",  yinYang: "yang", vibe: { zh: "火旺成金",           en: "Fire bright into gold" },            gradient: ["#C2354F", "#F5A6B8", "#FBE2A4"] },
  { index: 7,  name: { zh: "未时", en: "Hour of Wei" },  zhi: "未", hours: [13, 15], element: "earth", yinYang: "yin",  vibe: { zh: "日落余温",           en: "Sunset warmth lingers" },            gradient: ["#A65840", "#E2A37F", "#F8DDB6"] },
  { index: 8,  name: { zh: "申时", en: "Hour of Shen" }, zhi: "申", hours: [15, 17], element: "metal", yinYang: "yang", vibe: { zh: "金气澄明",           en: "Metal qi clear and bright" },        gradient: ["#9B6B22", "#F1D687", "#FFE6A6"] },
  { index: 9,  name: { zh: "酉时", en: "Hour of You" },  zhi: "酉", hours: [17, 19], element: "metal", yinYang: "yin",  vibe: { zh: "日入金山",           en: "Sun sets behind golden mountains" }, gradient: ["#5A3B1B", "#A87731", "#F1D687"] },
  { index: 10, name: { zh: "戌时", en: "Hour of Xu" },   zhi: "戌", hours: [19, 21], element: "earth", yinYang: "yang", vibe: { zh: "土合归藏",           en: "Earth gathers and stores" },         gradient: ["#2B1F33", "#4F3B5C", "#A98AB4"] },
  { index: 11, name: { zh: "亥时", en: "Hour of Hai" },  zhi: "亥", hours: [21, 23], element: "water", yinYang: "yin",  vibe: { zh: "水气始凝",           en: "Water begins to gather" },           gradient: ["#0F1A36", "#243769", "#5570A8"] },
];

export function getShichen(date: Date = new Date()): ShichenInfo {
  const hour = date.getHours();
  if (hour === 23 || hour === 0) return SHICHEN[0];
  for (const s of SHICHEN) {
    const [from, to] = s.hours;
    if (hour >= from && hour < to) return s;
  }
  return SHICHEN[0];
}

export function localizeShichen(s: ShichenInfo, lang: Locale): LocalizedShichen {
  return {
    index: s.index,
    name: s.name[lang],
    zhi: s.zhi,
    hours: s.hours,
    element: s.element,
    yinYang: s.yinYang,
    vibe: s.vibe[lang],
    gradient: s.gradient,
  };
}

export function getLocalizedShichen(lang: Locale, date?: Date): LocalizedShichen {
  return localizeShichen(getShichen(date), lang);
}

export function shichenCSSVars(s: ShichenInfo): Record<string, string> {
  return {
    "--shichen-1": s.gradient[0],
    "--shichen-2": s.gradient[1],
    "--shichen-3": s.gradient[2],
  };
}

export function styleFromShichen(s: ShichenInfo): string {
  return Object.entries(shichenCSSVars(s))
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}
