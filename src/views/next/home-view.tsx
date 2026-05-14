"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/types";
import { localizedPath } from "@/i18n";
import { PageShell } from "@/components/next/page-shell";
import { WxSiteFooter, WxSiteHeader } from "@/components/next/wx-site-chrome";

import bannerNivi from "@/assets/images/banner-nivi.png";
import bannerSuki from "@/assets/images/banner-suki.png";
import bannerGoya from "@/assets/images/banner-goya.png";
import bannerYellen from "@/assets/images/banner-yellen.png";
import bannerNora from "@/assets/images/banner-nora.png";
import bannerXuan from "@/assets/images/banner-xuan.png";
import bannerYao from "@/assets/images/banner-yao.png";
import bannerHundun from "@/assets/images/banner-hundun.png";
import gulingBg from "@/assets/images/guling-bg.png";
import packaging from "@/assets/images/packaging.png";
import phone1 from "@/assets/images/phone-1.png";
import phone2 from "@/assets/images/phone-2.png";

type BeastProfile = {
  slug: string;
  name: string;
  zhName: string;
  number: string;
  element: string;
  mood: string;
  archiveElement: string;
  archiveMood: string;
  role: string;
  intro: string;
  gradient: [string, string];
  archiveBg: string;
  image: StaticImageData;
};

const beasts: BeastProfile[] = [
  {
    slug: "nivi",
    name: "NIVI",
    zhName: "金 金",
    number: "001",
    element: "METAL · 金",
    mood: "锋芒未藏",
    archiveElement: "JIN · 金",
    archiveMood: "锋芒未藏",
    role: "Bright edge",
    intro: "一寸光，一寸锋。它把判断力藏进柔软毛绒里，只在必要时发出清亮的回响。",
    gradient: ["#F7E3B4", "#F4BEBB"],
    archiveBg: "#FFF7E5",
    image: bannerNivi,
  },
  {
    slug: "suki",
    name: "SUKI",
    zhName: "木 木",
    number: "002",
    element: "WOOD · 木",
    mood: "慢慢复原",
    archiveElement: "MU · 木",
    archiveMood: "慢慢长好",
    role: "Quiet growth",
    intro: "春不语，自有花来。Suki 总在细小处生长，把被忽略的心情重新扶正。",
    gradient: ["#B2E9CC", "#BBCEF4"],
    archiveBg: "#E0F9E5",
    image: bannerSuki,
  },
  {
    slug: "goya",
    name: "GOYA",
    zhName: "水 水",
    number: "003",
    element: "WATER · 水",
    mood: "情绪共振",
    archiveElement: "SHUI · 水",
    archiveMood: "温柔但有边界",
    role: "Soft tide",
    intro: "它不替你哭，只让你流。Goya 靠近所有冷暖，把情绪整理成透明潮汐。",
    gradient: ["#ADE3F5", "#D9CFFF"],
    archiveBg: "#EEFAFF",
    image: bannerGoya,
  },
  {
    slug: "yellen",
    name: "YELLEN",
    zhName: "火 灵",
    number: "004",
    element: "FIRE · 火",
    mood: "明亮热望",
    archiveElement: "HUO · 火",
    archiveMood: "燃，但不烧自己",
    role: "One bright second",
    intro: "哪怕只有一秒，也要明亮地烧。Yellen 讨厌冷场，也最懂被看见的勇气。",
    gradient: ["#A0B5F8", "#F7BFDA"],
    archiveBg: "#FEE",
    image: bannerYellen,
  },
  {
    slug: "nora",
    name: "NORA",
    zhName: "土 土",
    number: "005",
    element: "EARTH · 土",
    mood: "稳，不慌",
    archiveElement: "TU · 土",
    archiveMood: "稳，不慌",
    role: "Grounded keeper",
    intro: "慢一点没事，山也是这样长起来的。Nora 把日子重新种回土里。",
    gradient: ["#E9CCB2", "#F4BBBB"],
    archiveBg: "#F2E3D2",
    image: bannerNora,
  },
  {
    slug: "xuan",
    name: "XUAN",
    zhName: "玄",
    number: "006",
    element: "YIN · 阴",
    mood: "静谧守夜",
    archiveElement: "YIN · 阴",
    archiveMood: "特殊形态 · 静谧守夜",
    role: "Inward night",
    intro: "夜很深，但夜也很懂。Xuan 在灯灭之处出现，听见你最里面的话。",
    gradient: ["#D9DCED", "#B7A3CC"],
    archiveBg: "#F2E3D2",
    image: bannerXuan,
  },
  {
    slug: "yao",
    name: "YAO",
    zhName: "曜",
    number: "007",
    element: "YANG · 阳",
    mood: "烈日高歌",
    archiveElement: "YANG · 阳",
    archiveMood: "特殊形态 · 烈日高歌",
    role: "Sunlit signal",
    intro: "我为你掀开云。Yao 把心里的好天气照出来，也让别人被看见。",
    gradient: ["#D5E7D4", "#A3B5CC"],
    archiveBg: "#E9EFE0",
    image: bannerYao,
  },
  {
    slug: "hundun",
    name: "HUNDUN",
    zhName: "混 沌",
    number: "008",
    element: "VOID · 混沌",
    mood: "五行归一",
    archiveElement: "HUNDUN · 混沌",
    archiveMood: "隐藏款 · 五行归一",
    role: "Hidden contract",
    intro: "一切边界尚未命名时，Hundun 已经醒来。它保存混乱，也保存可能。",
    gradient: ["#E0DDD7", "#B9B4C1"],
    archiveBg: "#EBEBEB",
    image: bannerHundun,
  },
];

const heroAutoplayMs = 5460;

function nextIndex(value: number, offset: number) {
  return (value + offset + beasts.length) % beasts.length;
}

function HomeCarousel({ lang }: { lang: Locale }) {
  const [active, setActive] = useState(7);
  const [exiting, setExiting] = useState<number | null>(null);
  const [heroImagesReady, setHeroImagesReady] = useState(false);
  const exitTimer = useRef<number | null>(null);
  const current = beasts[active];
  const preview = [1, 2].map((offset) => beasts[nextIndex(active, offset)]);
  const vars = {
    "--hero-a": current.gradient[0],
    "--hero-b": current.gradient[1],
  } as CSSProperties;
  const moveToNext = useCallback((resolveNext: (value: number) => number) => {
    if (!heroImagesReady) return;

    setActive((value) => {
      const next = resolveNext(value);
      if (next === value) return value;

      setExiting(value);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
      exitTimer.current = window.setTimeout(() => setExiting(null), 1180);
      return next;
    });
  }, [heroImagesReady]);

  useEffect(() => {
    let cancelled = false;
    const preloaders = beasts.map((beast) => (
      new Promise<void>((resolve) => {
        const img = new window.Image();
        const settle = () => {
          if (typeof img.decode === "function") {
            void img.decode().catch(() => undefined).finally(resolve);
            return;
          }
          resolve();
        };

        img.decoding = "async";
        img.onload = settle;
        img.onerror = () => resolve();
        img.src = beast.image.src;
        if (img.complete) settle();
      })
    ));

    void Promise.all(preloaders).then(() => {
      if (!cancelled) setHeroImagesReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!heroImagesReady) return;
    const timer = window.setInterval(() => moveToNext((value) => nextIndex(value, 1)), heroAutoplayMs);
    return () => {
      window.clearInterval(timer);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    };
  }, [heroImagesReady, moveToNext]);

  return (
    <section className="wx-hero" style={vars} aria-label="Wuxing Beasts banner">
      <WxSiteHeader lang={lang} home />

      <div className="wx-pet-stack" aria-hidden="true">
        {beasts.map((beast, index) => (
          <div
            key={beast.slug}
            className={index === active ? "is-active" : index === exiting ? "is-exiting" : ""}
          >
            <Image
              src={beast.image}
              alt=""
              width={1000}
              height={1000}
              sizes="(max-width: 900px) 100vw, 72vw"
              priority={beast.slug === "hundun"}
              loading={beast.slug === "hundun" ? undefined : "eager"}
            />
          </div>
        ))}
      </div>

      <div className="wx-hero-grid">
        <div className="wx-hero-copy">
          <h1>
            <span>Wǔ</span>
            <span>Xíng</span>
            <span>Beasts</span>
          </h1>
          <p>
            相传上古之时，天地初分，金、木、水、火、土五行之气化生万物。
            星轨交错、灵脉震颤之时，藏匿其间的小兽便会苏醒。
          </p>
          <div className="wx-hero-stats" aria-label="Collection stats">
            <span><strong>5,142</strong> 已共鸣灵兽</span>
            <span><strong>08</strong> 元素本体</span>
            <span><strong>∞</strong> 数字限定款</span>
          </div>
          <div className="wx-hero-actions">
            <Link href={localizedPath("/resonance", lang)}>灵兽共鸣测试</Link>
            <a href="#origin">小兽世界观</a>
          </div>
        </div>

        <div className="wx-hero-stage" aria-live="polite">
          <div className="wx-hero-name-mask">
            <div key={current.slug} className="wx-hero-name">{current.name}</div>
          </div>

          <div className="wx-card-rail" aria-label="Pet carousel controls">
            {preview.map((beast, index) => (
              <button
                key={beast.slug}
                type="button"
                className="wx-hero-card"
                style={{ "--card-a": beast.gradient[0], "--card-b": beast.gradient[1] } as CSSProperties}
                onClick={() => moveToNext((value) => nextIndex(value, 1))}
              >
                <span>{beast.name}</span>
                <Image src={beast.image} alt="" width={220} height={220} />
                <em>{String(index + 1).padStart(2, "0")}</em>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CharacterArchive({ lang }: { lang: Locale }) {
  const [activeIndex, setActiveIndex] = useState(3);
  const active = beasts[activeIndex];
  const vars = {
    "--archive-a": active.gradient[0],
    "--archive-b": active.gradient[1],
    "--archive-surface": active.archiveBg,
  } as CSSProperties;

  return (
    <section id="archive" className="wx-archive" style={vars}>
      <div className="wx-section-inner">
        <div className="wx-archive-heading">
          <div>
            <p className="wx-kicker wx-kicker-line">03 — ARCHIVE</p>
            <h2>
              <span>角色档案馆</span>
              <span>
                <em>Eight</em> beasts, eight emotions.
              </span>
            </h2>
          </div>
          <p>
            五元素本体 + 阴 / 阳 / 混沌三特殊形态。每只灵兽对应一种核心情绪，
            <mark>点击进入档案馆</mark>查看完整故事碎片、声音彩蛋与可解锁动态壁纸。
          </p>
        </div>

        <div className="wx-archive-showcase">
          <article className="wx-archive-feature" aria-live="polite">
            <div className="wx-archive-feature-top">
              <span>№ {active.number}</span>
              <em>{active.archiveElement}</em>
            </div>
            <div key={`${active.slug}-image`} className="wx-archive-feature-image">
              <Image
                src={active.image}
                alt={active.name}
                width={820}
                height={820}
                sizes="(max-width: 900px) 90vw, 48vw"
              />
            </div>
            <div key={`${active.slug}-copy`} className="wx-archive-feature-copy">
              <h3>{active.zhName}</h3>
              <strong>{active.name}</strong>
              <span>情绪 · {active.archiveMood}</span>
              <Link href={`${localizedPath("/archive", lang)}?beast=${active.slug}`}>查看详情 →</Link>
            </div>
          </article>

          <div className="wx-archive-picker" aria-label="选择角色">
            {beasts.map((beast, index) => (
              <button
                key={beast.slug}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                style={{
                  "--archive-card-bg": beast.archiveBg,
                } as CSSProperties}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <span>№ {beast.number}</span>
                <em>{beast.archiveElement}</em>
                <Image src={beast.image} alt="" width={260} height={260} />
                <strong>{beast.zhName}</strong>
                <b>{beast.name}</b>
                <small>情绪 · {beast.archiveMood}</small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeView({ lang }: { lang: Locale }) {
  const lulumartUrl = process.env.NEXT_PUBLIC_LULUMART_URL || "https://lulumart.app";

  return (
    <PageShell lang={lang} pageId="home-redesign" noHeader noFooter noAura>
      <div className="wx-home">
        <HomeCarousel lang={lang} />

        <section id="origin" className="wx-origin">
          <div className="wx-section-inner">
            <div className="wx-origin-head">
              <div className="wx-origin-title">
                <p className="wx-kicker wx-kicker-line">02 — ORIGIN</p>
                <h2>
                  <span>起源</span>
                  <span>
                    之 <em>Genesis</em>
                  </span>
                </h2>
              </div>
              <p className="wx-origin-intro">
                五行小兽并非宠物，而是<mark>"元素精灵"</mark>——它们体型娇小，毛茸柔软，
                却各自承载着五行之力的本源。山海集联合古谱学者解封图鉴，让这群跨越千年的精灵，重新走入人间。
              </p>
            </div>

            <div className="wx-origin-grid">
              <div className="wx-origin-myth">
                <p className="wx-origin-scroll">古谱卷一 · 第〇页</p>
                <h3>
                  天地初分，五行化生。<br />
                  每当星轨交错、<mark>灵脉震颤</mark>之时，藏匿于五行之间的小兽便会苏醒，
                  附着于人类的法阵之中，<mark>与命运缔结契约</mark>。
                </h3>
                <blockquote>
                  <p>"唤之以诚，则灵兽现身。"</p>
                  <cite>— 山海集 · 古谱学者</cite>
                </blockquote>
              </div>

              <div className="wx-origin-story">
                <p>
                  本系列由五只对应五行的元素小兽与三只特殊形态构成，每一只都是<mark>一种当代年轻人核心情绪</mark>的具象映射。
                  它们不替你解决问题，但替你把那种说不出口的状态，安静地接住。
                </p>
                <p>
                  每只小兽的造型融合了中国古代神兽基因与当代潮流美学：既保留瑞兽的瞳形与脊纹，
                  也带着 Z 世代喜爱的萌系比例与微表情。既有文化根基，又是世界通用的视觉语言。
                </p>
                <p>
                  除盲盒摆件之外，五行小兽 IP 还规划了 AI 陪伴宠物、互动漫剧、桌面与车载场景配件，
                  构建一个能够持续生长的、立体的灵兽生态。
                </p>
                <div className="wx-origin-signature" aria-label="山海集原创发行">
                  <strong>山海集</strong>
                  <span>由山海集原创发行</span>
                  <small>ORIGINAL IP · LULUMART × SHANHAIJI<br />自 2026 年春 · 持续生长</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CharacterArchive lang={lang} />

        <section
          id="reborn"
          className="wx-reborn"
          style={{ "--reborn-bg": `url(${gulingBg.src})` } as CSSProperties}
        >
          <div className="wx-section-inner wx-reborn-grid">
            <div className="wx-reborn-copy">
              <p className="wx-reborn-kicker">
                <span aria-hidden="true" />
                05 — RITUAL 拆盒之仪
              </p>
              <h2>
                <span>古灵新生</span>
                <span>
                  The <em>ritual</em> of
                </span>
                <span>summoning.</span>
              </h2>
              <p className="wx-reborn-text">
                每一只五行小兽都封存于一个朱砂盒中。摇一摇、称一称、透着光看一眼剪影——
                线下盲盒的所有惊喜瞬间，都会在 lulumart.app 中完整复刻。SSR 隐藏款拆开时，
                全屏会爆发对应五行的光芒，伴随古谱中的真名共鸣。
              </p>
              <div className="wx-reborn-actions">
                <a href={lulumartUrl} target="_blank" rel="noopener" data-event="reborn_lulumart_outlink">
                  <span>前往 lulumart.app</span>
                  <i aria-hidden="true">→</i>
                </a>
                <Link href={localizedPath("/series", lang)}>古灵新生 · 系列介绍</Link>
              </div>
            </div>
            <div className="wx-reborn-art">
              <Image
                src={packaging}
                alt="Wuxing Beasts packaging"
                width={631}
                height={694}
                sizes="(max-width: 900px) 82vw, 46vw"
              />
            </div>
          </div>
        </section>

        <section id="world" className="wx-phones">
          <div className="wx-section-inner">
            <p className="wx-kicker">MOBILE CONTRACT</p>
            <h2>Same world, smaller palm.</h2>
            <div className="wx-phone-pair">
              <Image src={phone1} alt="Wuxing Beasts mobile home" width={380} height={730} />
              <Image src={phone2} alt="Wuxing Beasts mobile contract" width={380} height={730} />
            </div>
          </div>
        </section>

        <WxSiteFooter lang={lang} lulumartUrl={lulumartUrl} />
      </div>
    </PageShell>
  );
}
