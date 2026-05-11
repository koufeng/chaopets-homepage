import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/types";

import jinImage from "@/assets/beasts/jin.png";
import muImage from "@/assets/beasts/mu.png";
import shuiImage from "@/assets/beasts/shui.png";
import huoImage from "@/assets/beasts/huo.png";
import tuImage from "@/assets/beasts/tu.png";
import xuanImage from "@/assets/beasts/xuan.png";
import yaoImage from "@/assets/beasts/yao.png";
import hundunImage from "@/assets/beasts/hundun.png";
import groupImage from "@/assets/beasts/group.png";

export type BeastId =
  | "jin"
  | "mu"
  | "shui"
  | "huo"
  | "tu"
  | "xuan"
  | "yao"
  | "hundun";

export type ParticleKind =
  | "gold-dust"
  | "petal"
  | "water-drop"
  | "ember"
  | "soil-mote"
  | "mist"
  | "aurora"
  | "primordial";

export type BeastCategory = "wuxing" | "special";

export interface I18nString {
  zh: string;
  en: string;
}
export interface I18nStringArray {
  zh: readonly string[];
  en: readonly string[];
}

export interface Beast {
  id: BeastId;
  glyph: string;
  element: I18nString;
  nameZh: string;
  nameLatin: string;
  category: BeastCategory;
  emotion: I18nString;
  emotionTagline: I18nString;
  signature: I18nString;
  storyOpening: I18nString;
  storyFragments: I18nStringArray;
  palette: {
    aura: string;
    deep: string;
    glow: string;
    ink: string;
    surface: string;
    gradient: [string, string, string];
  };
  particle: ParticleKind;
  hour: { from: number; to: number; label: I18nString };
  image: StaticImageData;
}

export interface LocalizedBeast {
  id: BeastId;
  glyph: string;
  element: string;
  nameZh: string;
  nameLatin: string;
  displayName: string;
  category: BeastCategory;
  emotion: string;
  emotionTagline: string;
  signature: string;
  storyOpening: string;
  storyFragments: readonly string[];
  palette: Beast["palette"];
  particle: ParticleKind;
  hour: { from: number; to: number; label: string };
  image: StaticImageData;
}

// 标记为 TODO(brand) 的英文文案是诗意/品牌核心句子，机翻为草稿，请由品牌方/英文文案润色。
export const beasts: readonly Beast[] = [
  {
    id: "jin",
    glyph: "金",
    element: { zh: "金", en: "Metal" },
    nameZh: "金金",
    nameLatin: "Nivi",
    category: "wuxing",
    emotion: { zh: "锋芒", en: "Edge" },
    emotionTagline: {
      zh: "不被磨钝的少年心气",
      en: "A boy's edge that refuses to be dulled", // TODO(brand): refine
    },
    signature: {
      zh: "一寸光，一寸锋。",
      en: "An inch of light, an inch of edge.", // TODO(brand): refine
    },
    storyOpening: {
      zh: "金气藏锋于柔，遇决断之念，则铮然有声。",
      en: "Metal hides its edge in softness; meet it with resolve and it rings clear.", // TODO(brand)
    },
    storyFragments: {
      zh: [
        "生于金秋初露的清晨，毛色如初炼的麦芒。",
        "耳尖一缕金箔，是它与古谱缔约的凭证。",
        "它喜欢在抽屉与硬币之间打盹，听见钥匙声会立起来。",
      ],
      en: [
        "Born in the dewy dawn of early autumn, its fur the color of freshly refined wheat-tips.",
        "A strand of gold leaf at its ear—the proof of its pact with the ancient codex.",
        "It naps between drawers and coins; the rattle of keys makes it sit up.",
      ],
    },
    palette: {
      aura: "#F1D687",
      deep: "#9B6B22",
      glow: "#FFE6A6",
      ink: "#3A2A0E",
      surface: "#FBF1D8",
      gradient: ["#FFF4D6", "#F1D687", "#A87731"],
    },
    particle: "gold-dust",
    hour: {
      from: 15,
      to: 19,
      label: { zh: "申酉之交", en: "Hour of Shen–You · late afternoon" },
    },
    image: jinImage,
  },
  {
    id: "mu",
    glyph: "木",
    element: { zh: "木", en: "Wood" },
    nameZh: "木木",
    nameLatin: "Suki",
    category: "wuxing",
    emotion: { zh: "生长", en: "Growth" },
    emotionTagline: {
      zh: "微小但持续的复原力",
      en: "Quiet, ongoing recovery",
    },
    signature: {
      zh: "春不语，自有花来。",
      en: "Spring keeps silent; the flowers come on their own.", // TODO(brand)
    },
    storyOpening: {
      zh: "木气贯于四野，以静为生，以拙为长。",
      en: "Wood spreads through every field, growing in stillness, lasting through plainness.",
    },
    storyFragments: {
      zh: [
        "出生于初春第一场细雨，鬓角别一朵未开的雏菊。",
        "听见风铃就会鼓起腮帮子，风停了又安静睡去。",
        "它的体温总比他人低一度，像新叶贴在掌心。",
      ],
      en: [
        "Born in the first drizzle of early spring, a closed daisy tucked beside its ear.",
        "A wind chime puffs out its cheeks; when the wind stops, it falls asleep.",
        "Always one degree cooler than you—like a fresh leaf against your palm.",
      ],
    },
    palette: {
      aura: "#A8D6A8",
      deep: "#3F7A4A",
      glow: "#D4EFC6",
      ink: "#1F3A24",
      surface: "#EAF7E1",
      gradient: ["#EAF7E1", "#A8D6A8", "#3F7A4A"],
    },
    particle: "petal",
    hour: {
      from: 3,
      to: 7,
      label: { zh: "寅卯之时", en: "Hour of Yin–Mao · early morning" },
    },
    image: muImage,
  },
  {
    id: "shui",
    glyph: "水",
    element: { zh: "水", en: "Water" },
    nameZh: "水水",
    nameLatin: "Goya",
    category: "wuxing",
    emotion: { zh: "共情", en: "Empathy" },
    emotionTagline: {
      zh: "能与你的情绪一同起伏的人",
      en: "The one who rises and falls with your moods",
    },
    signature: {
      zh: "我并不替你哭，我只让你流。",
      en: "I do not cry for you—I only let you flow.", // TODO(brand): refine
    },
    storyOpening: {
      zh: "水气至柔，行于无形，能近一切冷暖。",
      en: "Water is the softest, moving without form, drawn close to every warmth and chill.",
    },
    storyFragments: {
      zh: [
        "在子夜的潮汐里成形，毛尖凝着上一片云的回声。",
        "听见低落的呼吸会无声靠近，把头埋进掌心。",
        "它说话很轻，像水珠落在另一颗水珠上。",
      ],
      en: [
        "Born in the midnight tide, its fur tipped with the echo of a passing cloud.",
        "Hearing low breath, it draws near in silence and buries its head in your palm.",
        "It speaks softly—like one droplet meeting another.",
      ],
    },
    palette: {
      aura: "#9CCDE8",
      deep: "#2D6A93",
      glow: "#D9ECF7",
      ink: "#0F2B43",
      surface: "#E6F2FA",
      gradient: ["#E6F2FA", "#9CCDE8", "#2D6A93"],
    },
    particle: "water-drop",
    hour: {
      from: 23,
      to: 27,
      label: { zh: "子丑之夜", en: "Hour of Zi–Chou · deep night" },
    },
    image: shuiImage,
  },
  {
    id: "huo",
    glyph: "火",
    element: { zh: "火", en: "Fire" },
    nameZh: "火火",
    nameLatin: "Yellen",
    category: "wuxing",
    emotion: { zh: "热望", en: "Yearn" },
    emotionTagline: {
      zh: "哪怕只有一秒，也要明亮地烧",
      en: "Even for one second, burn bright",
    },
    signature: {
      zh: "今天我在意，明天再说。",
      en: "Today I care—tomorrow can wait.", // TODO(brand): refine
    },
    storyOpening: {
      zh: "火气炽烈而短暂，于是它把每一刻都活成宣告。",
      en: "Fire is fierce and brief, so it makes every moment a declaration.",
    },
    storyFragments: {
      zh: [
        "生于盛夏午时，双角是初焰跳起的形状。",
        "心情高涨时尾尖会燃出小火苗，像一支不会熄灭的蜡烛。",
        "它最讨厌冷场，也最害怕被冷落。",
      ],
      en: [
        "Born at midsummer noon; its twin horns are the shape of a leaping flame.",
        "When excited, a small flame catches at its tail—like an undying candle.",
        "It hates an awkward silence—and fears being ignored most of all.",
      ],
    },
    palette: {
      aura: "#F5A6B8",
      deep: "#C2354F",
      glow: "#FBD0D9",
      ink: "#481420",
      surface: "#FCEDF0",
      gradient: ["#FCEDF0", "#F5A6B8", "#C2354F"],
    },
    particle: "ember",
    hour: {
      from: 11,
      to: 15,
      label: { zh: "午未之时", en: "Hour of Wu–Wei · midday" },
    },
    image: huoImage,
  },
  {
    id: "tu",
    glyph: "土",
    element: { zh: "土", en: "Earth" },
    nameZh: "土土",
    nameLatin: "Nora",
    category: "wuxing",
    emotion: { zh: "安顿", en: "Settle" },
    emotionTagline: {
      zh: "把日子重新种回土里的本事",
      en: "The knack for replanting your days into the soil",
    },
    signature: {
      zh: "慢一点没事，山也是这样长起来的。",
      en: "Slowing down is fine—mountains rose this way too.", // TODO(brand): refine
    },
    storyOpening: {
      zh: "土气至厚，承载万物之归。它从不催，也不躲。",
      en: "Earth is the deepest, holding all returns. It neither hurries nor hides.",
    },
    storyFragments: {
      zh: [
        "从一颗被遗忘的种子里苏醒，毛色像夕阳落在田埂上。",
        "喜欢被掌心覆盖时的重量，会发出极轻的鼾声。",
        '它的鼻尖能嗅到任何"被忽略"的小事。',
      ],
      en: [
        "Awoken from a forgotten seed, fur the color of sunset on a field path.",
        "It loves the weight of a palm covering it; a faint snore follows.",
        "Its nose can sense every small thing you've overlooked.",
      ],
    },
    palette: {
      aura: "#D8B795",
      deep: "#7E5532",
      glow: "#EFDDC4",
      ink: "#3D2613",
      surface: "#F6ECDD",
      gradient: ["#F6ECDD", "#D8B795", "#7E5532"],
    },
    particle: "soil-mote",
    hour: {
      from: 7,
      to: 11,
      label: { zh: "辰巳之时", en: "Hour of Chen–Si · forenoon" },
    },
    image: tuImage,
  },
  {
    id: "xuan",
    glyph: "玄",
    element: { zh: "玄 · 阴", en: "Xuan · Yin" },
    nameZh: "玄",
    nameLatin: "Xuan",
    category: "special",
    emotion: { zh: "内观", en: "Inward" },
    emotionTagline: {
      zh: "在喧哗里把自己收回来",
      en: "Calling yourself back from the noise",
    },
    signature: {
      zh: "夜很深，但夜也很懂。",
      en: "The night runs deep—and the night understands.", // TODO(brand)
    },
    storyOpening: {
      zh: "玄者，深也。它生于一切灯灭之处，听见你最里面的话。",
      en: "Xuan means depth. Born where every lamp goes out, it hears the words you keep deepest.",
    },
    storyFragments: {
      zh: [
        "诞自子时最暗的一瞬，眼瞳是落进井底的紫色月光。",
        "只在梦的边缘出现，醒来会留下一缕墨气。",
        '它从不出声，但你会"想起"它。',
      ],
      en: [
        "Born in the darkest moment of midnight; its eyes are violet moonlight at the bottom of a well.",
        "It appears only at the edge of dreams; waking, you find a trace of ink.",
        "It never speaks—yet you find yourself remembering it.",
      ],
    },
    palette: {
      aura: "#7E5BA8",
      deep: "#1F1530",
      glow: "#B89DDA",
      ink: "#0E0817",
      surface: "#231938",
      gradient: ["#1B1228", "#3F2A60", "#7E5BA8"],
    },
    particle: "mist",
    hour: {
      from: 23,
      to: 27,
      label: { zh: "深子时", en: "Deep Zi · the darkest hour" },
    },
    image: xuanImage,
  },
  {
    id: "yao",
    glyph: "曜",
    element: { zh: "曜 · 阳", en: "Yao · Yang" },
    nameZh: "曜",
    nameLatin: "Yao",
    category: "special",
    emotion: { zh: "显化", en: "Manifest" },
    emotionTagline: {
      zh: "把你心里的好天气照出来",
      en: "Casting out the bright weather inside you",
    },
    signature: {
      zh: "我为你掀开云。",
      en: "I lift the clouds for you.", // TODO(brand)
    },
    storyOpening: {
      zh: "曜者，光也。它在第一缕日光里苏醒，照见一切想被看见的事。",
      en: "Yao means light. It awakens in the first thread of dawn, illuminating all that wishes to be seen.",
    },
    storyFragments: {
      zh: [
        "诞自卯时最亮的一线，毛尖凝着金色的雾。",
        "走过的地方植物会朝它伸展。",
        "它喜欢被看见，也擅长让别人被看见。",
      ],
      en: [
        "Born at the brightest line of early morning; its fur tips hold a golden mist.",
        "Plants lean toward where it passes.",
        "It loves being seen—and is gifted at making others seen.",
      ],
    },
    palette: {
      aura: "#F4E2B5",
      deep: "#A88030",
      glow: "#FFF6DC",
      ink: "#2D200B",
      surface: "#FBF3DD",
      gradient: ["#FFF6DC", "#F4E2B5", "#A88030"],
    },
    particle: "aurora",
    hour: {
      from: 5,
      to: 9,
      label: { zh: "卯辰之晓", en: "Mao–Chen · dawn" },
    },
    image: yaoImage,
  },
  {
    id: "hundun",
    glyph: "混沌",
    element: { zh: "混沌", en: "Hundun" },
    nameZh: "混沌",
    nameLatin: "Hundun",
    category: "special",
    emotion: { zh: "万象", en: "All-form" },
    emotionTagline: {
      zh: "所有可能性都尚未被叫出名字",
      en: "All possibilities, none yet named",
    },
    signature: {
      zh: "我是你还没决定的样子。",
      en: "I am the shape you haven't decided on.", // TODO(brand)
    },
    storyOpening: {
      zh: "天地未分时，五行皆寄于一身。它便是那一身。",
      en: "Before heaven and earth divided, the five qi rested in a single body. It is that body.",
    },
    storyFragments: {
      zh: [
        "在一个无法被命名的时辰里成形，黑白交织如未落定的硬币。",
        "触碰它会同时感到五种触感：暖、凉、糙、滑、空。",
        "它很少出现，出现时往往意味着某件事正在被重新选择。",
      ],
      en: [
        "Formed in an hour that cannot be named, black and white woven like a coin still spinning.",
        "Touch it and feel all five at once: warmth, cool, rough, smooth, void.",
        "It rarely appears; when it does, something is being chosen again.",
      ],
    },
    palette: {
      aura: "#C9C2C8",
      deep: "#1A1A1F",
      glow: "#F2EDE6",
      ink: "#0D0B12",
      surface: "#2A2731",
      gradient: ["#0D0B12", "#5C5662", "#F2EDE6"],
    },
    particle: "primordial",
    hour: {
      from: 0,
      to: 24,
      label: { zh: "无定之时", en: "Unfixed hour" },
    },
    image: hundunImage,
  },
];

export const beastsById: Record<BeastId, Beast> = Object.fromEntries(
  beasts.map((b) => [b.id, b]),
) as Record<BeastId, Beast>;

export const wuxingBeasts = beasts.filter((b) => b.category === "wuxing");
export const specialBeasts = beasts.filter((b) => b.category === "special");

export const groupShot = groupImage;

export function isBeastId(value: string): value is BeastId {
  return value in beastsById;
}

export function localizeBeast(beast: Beast, lang: Locale): LocalizedBeast {
  return {
    id: beast.id,
    glyph: beast.glyph,
    element: beast.element[lang],
    nameZh: beast.nameZh,
    nameLatin: beast.nameLatin,
    displayName: lang === "zh" ? beast.nameZh : beast.nameLatin,
    category: beast.category,
    emotion: beast.emotion[lang],
    emotionTagline: beast.emotionTagline[lang],
    signature: beast.signature[lang],
    storyOpening: beast.storyOpening[lang],
    storyFragments: beast.storyFragments[lang],
    palette: beast.palette,
    particle: beast.particle,
    hour: { from: beast.hour.from, to: beast.hour.to, label: beast.hour.label[lang] },
    image: beast.image,
  };
}
