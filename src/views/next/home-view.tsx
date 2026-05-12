"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { Locale } from "@/i18n/types";
import { localizedPath } from "@/i18n";
import { PageShell } from "@/components/next/page-shell";

import logoBlack from "@/assets/images/logo-black.png";
import logoWhite from "@/assets/images/logo-white.png";
import bannerNivi from "@/assets/images/banner-nivi.png";
import bannerSuki from "@/assets/images/banner-suki.png";
import bannerGoya from "@/assets/images/banner-goya.png";
import bannerYellen from "@/assets/images/banner-yellen.png";
import bannerNora from "@/assets/images/banner-nora.png";
import bannerXuan from "@/assets/images/banner-xuan.png";
import bannerYao from "@/assets/images/banner-yao.png";
import bannerHundun from "@/assets/images/banner-hundun.png";
import boothNoraBg from "@/assets/images/booth-nora-bg.png";
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
    role: "One bright second",
    intro: "哪怕只有一秒，也要明亮地烧。Yellen 讨厌冷场，也最懂被看见的勇气。",
    gradient: ["#A0B5F8", "#F7BFDA"],
    archiveBg: "#FFEEEE",
    image: bannerYellen,
  },
  {
    slug: "nora",
    name: "NORA",
    zhName: "土 土",
    number: "005",
    element: "EARTH · 土",
    mood: "稳，不慌",
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
    role: "Hidden contract",
    intro: "一切边界尚未命名时，Hundun 已经醒来。它保存混乱，也保存可能。",
    gradient: ["#E0DDD7", "#B9B4C1"],
    archiveBg: "#EBEBEB",
    image: bannerHundun,
  },
];

const noraFrames = Array.from({ length: 36 }, (_, index) => {
  const frame = String(index + 1).padStart(index + 1 < 10 ? 4 : 5, "0");
  return `/images/nora/${frame}.png`;
});
const noraFrameIntervalMs = 80;

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
    const timer = window.setInterval(() => moveToNext((value) => nextIndex(value, 1)), 7800);
    return () => {
      window.clearInterval(timer);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    };
  }, [heroImagesReady, moveToNext]);

  return (
    <section className="wx-hero" style={vars} aria-label="Wuxing Beasts banner">
      <header className="wx-header">
        <Link className="wx-logo-link" href={localizedPath("/", lang)} aria-label="五行小兽首页">
          <Image src={logoBlack} alt="Wuxing Beasts" width={100} height={41} priority />
        </Link>
        <nav className="wx-nav" aria-label="Main">
          <a href="#origin">起源</a>
          <a href="#archive">档案馆</a>
          <a href="#portrait">灵兽志</a>
          <a href="#reborn">抽盒</a>
          <a href="#world">共鸣</a>
        </nav>
      </header>

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

      <article key={`${current.slug}-info`} className="wx-current-info">
        <span>№ {current.number}</span>
        <h2>{current.zhName}</h2>
        <p>{current.element}</p>
      </article>

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

function NoraTurntable() {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const drag = useRef({ active: false, x: 0, moved: false });
  const preloadedFrames = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    const images = noraFrames.map(() => new window.Image());
    preloadedFrames.current = images;

    const preloaders = images.map((img, index) => (
      new Promise<void>((resolve) => {
        img.decoding = "async";
        img.onload = () => {
          if (typeof img.decode === "function") {
            void img.decode().catch(() => undefined).finally(resolve);
            return;
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = noraFrames[index];
      })
    ));

    void Promise.all(preloaders).then(() => {
      if (!cancelled) setFramesReady(true);
    });

    return () => {
      cancelled = true;
      preloadedFrames.current = [];
    };
  }, []);

  useEffect(() => {
    if (paused || !framesReady) return;
    const timer = window.setInterval(() => setFrame((value) => (value + 1) % noraFrames.length), noraFrameIntervalMs);
    return () => window.clearInterval(timer);
  }, [paused, framesReady]);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!framesReady) return;
    drag.current = { active: true, x: event.clientX, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPaused(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!framesReady || !drag.current.active) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) < 8) return;
    drag.current = { active: true, x: event.clientX, moved: true };
    setFrame((value) => (value + (delta > 0 ? -1 : 1) + noraFrames.length) % noraFrames.length);
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!framesReady) return;
    if (!drag.current.moved) {
      setFrame((value) => (value + 1) % noraFrames.length);
    }
    drag.current.active = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <button
      type="button"
      className="wx-turntable"
      aria-label="拖拽或点击旋转 Nora"
      aria-busy={!framesReady}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <img
        src={noraFrames[frame]}
        alt="360 portrait of Nora"
        width={500}
        height={500}
        decoding="async"
        loading="eager"
        draggable={false}
      />
    </button>
  );
}

export function HomeView({ lang }: { lang: Locale }) {
  const lulumartUrl = process.env.NEXT_PUBLIC_LULUMART_URL || "https://lulumart.app";

  return (
    <PageShell lang={lang} pageId="home-redesign" noHeader noFooter noAura>
      <div className="wx-home">
        <HomeCarousel lang={lang} />

        <section id="origin" className="wx-origin">
          <div className="wx-section-inner wx-origin-grid">
            <div>
              <p className="wx-kicker">ORIGIN · 起源</p>
              <h2>起源</h2>
              <p>
                天地初分，五行生息。小兽并非被召唤而来，它们原本就藏在人的情绪、时间与物件之间。
                当某个心愿足够清晰，契约便会亮起。
              </p>
              <a className="wx-text-link" href="#archive">Meet all eight</a>
            </div>
            <div className="wx-origin-note">
              <span>Wuxing spirits wake where daily life brushes against myth.</span>
            </div>
          </div>
        </section>

        <section id="archive" className="wx-archive">
          <div className="wx-section-inner">
            <p className="wx-kicker">CHARACTER ARCHIVE</p>
            <h2>角色档案馆</h2>
            <div className="wx-archive-grid">
              {beasts.map((beast) => (
                <article key={beast.slug} className="wx-archive-card" style={{ background: beast.archiveBg }}>
                  <span>№ {beast.number}</span>
                  <em>{beast.element}</em>
                  <Image src={beast.image} alt={beast.name} width={420} height={420} />
                  <h3>{beast.zhName}</h3>
                  <p>{beast.name}</p>
                  <small>情绪 · {beast.mood}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portrait" className="wx-portrait">
          <div className="wx-portrait-media">
            <Image src={boothNoraBg} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <NoraTurntable />
          </div>
          <div className="wx-portrait-copy">
            <p className="wx-kicker">SPOTLIGHT · № 005</p>
            <h2>
              360° portrait of <span>Yellen</span>.
            </h2>
            <h3>土 土</h3>
            <p>
              这一屏保留设计稿标题，同时使用 Nora 的展台背景与序列帧资源。默认自动旋转，鼠标移入暂停，拖拽或点击即可手动播放帧序列。
            </p>
            <div className="wx-detail-row">
              <span><b>ELEMENT</b>土 · 承载</span>
              <span><b>EMOTION</b>稳，不慌</span>
              <span><b>SOUND</b>轻软呼吸</span>
            </div>
          </div>
        </section>

        <section id="reborn" className="wx-reborn">
          <div className="wx-section-inner wx-reborn-grid">
            <div>
              <p className="wx-kicker">VINYL MINI FIGURE</p>
              <h2>古灵新生</h2>
              <p>
                The ritual of summoning, now pocket-sized. 每一次开盒，都是一次与五行情绪重新缔约。
              </p>
              <div className="wx-hero-actions">
                <a href={lulumartUrl} target="_blank" rel="noopener">前往抽盒</a>
                <Link href={localizedPath("/series", lang)}>系列详情</Link>
              </div>
            </div>
            <Image src={packaging} alt="Wuxing Beasts packaging" width={631} height={694} />
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

        <footer id="footer" className="wx-footer">
          <div className="wx-footer-main">
            <div className="wx-footer-brand">
              <Image src={logoWhite} alt="Wuxing Beasts" width={100} height={41} />
              <p>一座能呼吸的东方奇幻数字藏馆。山海集 © 2026 — 持续生长中。</p>
            </div>

            <nav className="wx-footer-nav" aria-label="Footer">
              <div>
                <h3>NAVIGATE 探索</h3>
                <a href="#origin">起源故事</a>
                <a href="#archive">角色档案馆</a>
                <a href="#portrait">灵兽志</a>
                <a href="#reborn">古灵新生</a>
              </div>
              <div>
                <h3>COMMUNITY 共鸣</h3>
                <a href="https://www.xiaohongshu.com/" target="_blank" rel="noopener">小红书 @五行小兽</a>
                <a href="https://weibo.com/" target="_blank" rel="noopener">微博 @山海集</a>
                <a href="https://www.douyin.com/" target="_blank" rel="noopener">抖音 @wuxingbeasts</a>
                <a href="https://discord.com/" target="_blank" rel="noopener">Discord</a>
              </div>
              <div>
                <h3>OFFICIAL 官方</h3>
                <a href={lulumartUrl} target="_blank" rel="noopener">lulumart.app · 抽盒</a>
                <a href="mailto:dev@wuxing-beasts.com">开发者支持</a>
                <a href="mailto:bd@wuxing-beasts.com">合作 · BD</a>
                <a href="#privacy">隐私 · 条款</a>
              </div>
            </nav>
          </div>

          <div className="wx-footer-bottom">
            <span>© 2026 SHANHAIJI · 山海集</span>
            <span>WǓ XÍNG BEASTS · ALL EIGHT BEASTS, ALL CONTRACTS HONORED.</span>
            <span>v 1.0 · MAY 2026</span>
          </div>
        </footer>
      </div>
    </PageShell>
  );
}
