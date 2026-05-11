import type { Locale } from "@/i18n/types";
import type { BeastId } from "@/data/beasts";

export interface I18nString {
  zh: string;
  en: string;
}

export interface QuizOption {
  label: I18nString;
  weights: Partial<Record<BeastId, number>>;
}

export interface QuizQuestion {
  id: string;
  prompt: I18nString;
  caption: I18nString;
  options: QuizOption[];
}

export interface LocalizedQuizOption {
  label: string;
  weights: Partial<Record<BeastId, number>>;
}

export interface LocalizedQuizQuestion {
  id: string;
  prompt: string;
  caption: string;
  options: LocalizedQuizOption[];
}

export const questions: readonly QuizQuestion[] = [
  {
    id: "season",
    prompt: { zh: "你诞生于哪一缕气息里？",         en: "Which breath did you take your first form in?" },
    caption: { zh: "第一签 · 节气溯源",            en: "First sigil · Source of season" },
    options: [
      { label: { zh: "春 · 万物初萌",   en: "Spring · all things just stirring" },     weights: { mu: 3 } },
      { label: { zh: "夏 · 烈烈生长",   en: "Summer · fierce growth" },                weights: { huo: 3 } },
      { label: { zh: "秋 · 锋芒初敛",   en: "Autumn · edge first sheathed" },          weights: { jin: 3 } },
      { label: { zh: "冬 · 沉静如井",   en: "Winter · still as a deep well" },         weights: { shui: 3 } },
      { label: { zh: "长夏 · 土厚归藏", en: "Late summer · earth-deep, stored away" }, weights: { tu: 3 } },
    ],
  },
  {
    id: "mood",
    prompt: { zh: "此刻你最想要的，是哪一种感受？", en: "Right now, which feeling do you most want?" },
    caption: { zh: "第二签 · 情绪此刻",            en: "Second sigil · Feeling now" },
    options: [
      { label: { zh: "一刀落下的痛快",       en: "The clean cut of a single decision" },    weights: { jin: 2, huo: 1 } },
      { label: { zh: "被慢慢托住的安心",     en: "The slow security of being held" },       weights: { tu: 2, mu: 1 } },
      { label: { zh: "一场被理解的雨",       en: "A rain that understands you" },           weights: { shui: 2, mu: 1 } },
      { label: { zh: "一次毫无保留地亮起来", en: "Lighting up with nothing held back" },    weights: { huo: 2, yao: 2 } },
      { label: { zh: "只想躲进自己里",       en: "Just to retreat into yourself" },         weights: { xuan: 2, shui: 1 } },
    ],
  },
  {
    id: "orientation",
    prompt: { zh: "当世界在喧哗时，你最像哪一种姿态？", en: "When the world is loud, which posture is most like you?" },
    caption: { zh: "第三签 · 阴阳之间",                en: "Third sigil · Between yin and yang" },
    options: [
      { label: { zh: "退到最暗处，把自己看清", en: "Retreat to the darkest place to see yourself clearly" }, weights: { xuan: 4 } },
      { label: { zh: "走到最亮处，让别人看见", en: "Step into the brightest light to be seen" },              weights: { yao: 4 } },
      { label: { zh: "不在场，也不缺席",       en: "Not present, yet not absent" },                            weights: { hundun: 4 } },
      { label: { zh: "都不太对，也都对",       en: "None quite fit—and all do" },                              weights: { hundun: 3, jin: 1, mu: 1, shui: 1, huo: 1, tu: 1 } },
    ],
  },
];

export type ResonanceAnswer = number;
export type ResonanceAnswers = Record<string, ResonanceAnswer>;

export function matchBeast(answers: ResonanceAnswers): BeastId {
  const scores: Record<string, number> = {
    jin: 0, mu: 0, shui: 0, huo: 0, tu: 0, xuan: 0, yao: 0, hundun: 0,
  };

  for (const q of questions) {
    const idx = answers[q.id];
    if (typeof idx !== "number") continue;
    const opt = q.options[idx];
    if (!opt) continue;
    for (const [id, w] of Object.entries(opt.weights)) {
      scores[id] = (scores[id] ?? 0) + (w ?? 0);
    }
  }

  let winner: BeastId = "jin";
  let max = -Infinity;
  for (const [id, score] of Object.entries(scores)) {
    if (score > max) {
      max = score;
      winner = id as BeastId;
    }
  }
  return winner;
}

export function localizeQuestion(q: QuizQuestion, lang: Locale): LocalizedQuizQuestion {
  return {
    id: q.id,
    prompt: q.prompt[lang],
    caption: q.caption[lang],
    options: q.options.map((o) => ({ label: o.label[lang], weights: o.weights })),
  };
}

export function getLocalizedQuestions(lang: Locale): LocalizedQuizQuestion[] {
  return questions.map((q) => localizeQuestion(q, lang));
}
