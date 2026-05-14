"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { Locale } from "@/i18n/types";
import { localizedPath } from "@/i18n";
import { beasts as beastData, localizeBeast, type BeastId } from "@/data/beasts";
import { PageShell } from "@/components/next/page-shell";
import { WxSiteFooter, WxSiteHeader } from "@/components/next/wx-site-chrome";

import boothBg from "@/assets/images/booth-bg.png";

import pendantFrontNivi from "@/assets/images/pendant/pf-nivi.png";
import pendantBackNivi from "@/assets/images/pendant/pb-nivi.png";
import pendantFrontSuki from "@/assets/images/pendant/pf-suki.png";
import pendantBackSuki from "@/assets/images/pendant/pb-suki.png";
import pendantFrontGoya from "@/assets/images/pendant/pf-goya.png";
import pendantBackGoya from "@/assets/images/pendant/pb-goya.png";
import pendantFrontYellen from "@/assets/images/pendant/pf-yellen.png";
import pendantBackYellen from "@/assets/images/pendant/pb-yellen.png";
import pendantFrontNora from "@/assets/images/pendant/pf-nora.png";
import pendantBackNora from "@/assets/images/pendant/pb-nora.png";
import pendantFrontXuan from "@/assets/images/pendant/pf-xuan.png";
import pendantBackXuan from "@/assets/images/pendant/pb-xuan.png";
import pendantFrontYao from "@/assets/images/pendant/pf-yao.png";
import pendantBackYao from "@/assets/images/pendant/pb-yao.png";
import pendantFrontHundun from "@/assets/images/pendant/pf-hundun.png";
import pendantBackHundun from "@/assets/images/pendant/pb-hundun.png";

import emoteNivi01 from "@/assets/images/emote/nivi/01.png";
import emoteNivi02 from "@/assets/images/emote/nivi/02.png";
import emoteNivi03 from "@/assets/images/emote/nivi/03.png";
import emoteNivi04 from "@/assets/images/emote/nivi/04.png";
import emoteNivi05 from "@/assets/images/emote/nivi/05.png";
import emoteNivi06 from "@/assets/images/emote/nivi/06.png";
import emoteGoya01 from "@/assets/images/emote/goya/01.png";
import emoteGoya02 from "@/assets/images/emote/goya/02.png";
import emoteGoya03 from "@/assets/images/emote/goya/03.png";
import emoteGoya04 from "@/assets/images/emote/goya/04.png";
import emoteGoya05 from "@/assets/images/emote/goya/05.png";
import emoteGoya06 from "@/assets/images/emote/goya/06.png";
import emoteNora01 from "@/assets/images/emote/nora/01.png";
import emoteNora02 from "@/assets/images/emote/nora/02.png";
import emoteNora03 from "@/assets/images/emote/nora/03.png";
import emoteNora04 from "@/assets/images/emote/nora/04.png";
import emoteNora05 from "@/assets/images/emote/nora/05.png";
import emoteNora06 from "@/assets/images/emote/nora/06.png";
import emoteYellen01 from "@/assets/images/emote/yellen/01.png";
import emoteYellen02 from "@/assets/images/emote/yellen/02.png";
import emoteYellen03 from "@/assets/images/emote/yellen/03.png";
import emoteYellen04 from "@/assets/images/emote/yellen/04.png";
import emoteYellen05 from "@/assets/images/emote/yellen/05.png";
import emoteYellen06 from "@/assets/images/emote/yellen/06.png";

import illustration01 from "@/assets/images/illustration/01.png";
import illustration02 from "@/assets/images/illustration/02.png";
import illustration03 from "@/assets/images/illustration/03.png";
import illustration04 from "@/assets/images/illustration/04.png";
import illustration05 from "@/assets/images/illustration/05.png";
import illustration06 from "@/assets/images/illustration/06.png";
import illustration07 from "@/assets/images/illustration/07.png";
import illustration08 from "@/assets/images/illustration/08.png";
import illustration09 from "@/assets/images/illustration/09.png";
import illustration10 from "@/assets/images/illustration/10.png";
import illustration11 from "@/assets/images/illustration/11.png";
import illustration12 from "@/assets/images/illustration/12.png";
import illustration13 from "@/assets/images/illustration/13.png";
import illustration14 from "@/assets/images/illustration/14.png";
import illustration15 from "@/assets/images/illustration/15.png";
import illustration16 from "@/assets/images/illustration/16.png";
import illustration17 from "@/assets/images/illustration/17.png";

type BeastSlug = "nivi" | "suki" | "goya" | "yellen" | "nora" | "xuan" | "yao" | "hundun";

type ArchiveBeast = {
  id: BeastId;
  slug: BeastSlug;
  number: string;
  code: string;
  title: string;
  displayName: string;
  emotionTagline: string;
  elementDetail: string;
  sound: string;
  intro: string;
  pendantFront: StaticImageData;
  pendantBack: StaticImageData;
};

const idToSlug: Record<BeastId, BeastSlug> = {
  jin: "nivi",
  mu: "suki",
  shui: "goya",
  huo: "yellen",
  tu: "nora",
  xuan: "xuan",
  yao: "yao",
  hundun: "hundun",
};

const pendantImages: Record<BeastSlug, { front: StaticImageData; back: StaticImageData }> = {
  nivi: { front: pendantFrontNivi, back: pendantBackNivi },
  suki: { front: pendantFrontSuki, back: pendantBackSuki },
  goya: { front: pendantFrontGoya, back: pendantBackGoya },
  yellen: { front: pendantFrontYellen, back: pendantBackYellen },
  nora: { front: pendantFrontNora, back: pendantBackNora },
  xuan: { front: pendantFrontXuan, back: pendantBackXuan },
  yao: { front: pendantFrontYao, back: pendantBackYao },
  hundun: { front: pendantFrontHundun, back: pendantBackHundun },
};

const codeBySlug: Record<BeastSlug, string> = {
  nivi: "JIN · 金",
  suki: "MU · 木",
  goya: "SHUI · 水",
  yellen: "HUO · 火",
  nora: "TU · 土",
  xuan: "YIN · 阴",
  yao: "YANG · 阳",
  hundun: "HUNDUN · 混沌",
};

const extraCopy: Record<BeastSlug, Pick<ArchiveBeast, "elementDetail" | "sound" | "intro">> = {
  nivi: {
    elementDetail: "金 · 锋",
    sound: "金属轻鸣",
    intro: "生于金秋初露的清晨，骨子里藏着锋芒，但绝不轻易显露。它对真实有近乎洁癖的执着，也只对值得的人说真话。",
  },
  suki: {
    elementDetail: "木 · 生",
    sound: "风铃轻响",
    intro: "春不语，自有花来。Suki 总在细小处生长，把被忽略的心情重新扶正，像新叶贴在掌心。",
  },
  goya: {
    elementDetail: "水 · 柔",
    sound: "潮汐回声",
    intro: "它不替你哭，只让你流。Goya 靠近所有冷暖，把情绪整理成透明潮汐，温柔但始终保有边界。",
  },
  yellen: {
    elementDetail: "火 · 炽",
    sound: "火苗跃动",
    intro: "哪怕只有一秒，也要明亮地烧。Yellen 讨厌冷场，也最懂被看见的勇气，燃起热望但不烧伤自己。",
  },
  nora: {
    elementDetail: "土 · 承",
    sound: "低低鼾声",
    intro: "慢一点没事，山也是这样长起来的。Nora 把日子重新种回土里，稳稳接住那些来不及安放的心事。",
  },
  xuan: {
    elementDetail: "阴 · 夜",
    sound: "墨气沉落",
    intro: "夜很深，但夜也很懂。Xuan 在灯灭之处出现，听见你最里面的话，让你从喧哗里收回自己。",
  },
  yao: {
    elementDetail: "阳 · 光",
    sound: "日光破云",
    intro: "我为你掀开云。Yao 把心里的好天气照出来，也让别人被看见，像第一缕晨光越过屋脊。",
  },
  hundun: {
    elementDetail: "混沌 · 万象",
    sound: "五音归一",
    intro: "一切边界尚未命名时，Hundun 已经醒来。它保存混乱，也保存可能，等待某件事被重新选择。",
  },
};

const emoteSources: Record<string, StaticImageData[]> = {
  nivi: [emoteNivi01, emoteNivi02, emoteNivi03, emoteNivi04, emoteNivi05, emoteNivi06],
  goya: [emoteGoya01, emoteGoya02, emoteGoya03, emoteGoya04, emoteGoya05, emoteGoya06],
  nora: [emoteNora01, emoteNora02, emoteNora03, emoteNora04, emoteNora05, emoteNora06],
  yellen: [emoteYellen01, emoteYellen02, emoteYellen03, emoteYellen04, emoteYellen05, emoteYellen06],
};

const illustrationImages = [
  illustration01,
  illustration02,
  illustration03,
  illustration04,
  illustration05,
  illustration06,
  illustration07,
  illustration08,
  illustration09,
  illustration10,
  illustration11,
  illustration12,
  illustration13,
  illustration14,
  illustration15,
  illustration16,
  illustration17,
];

const frameCount = 36;
const firstFrame = 4;
const frameNumbers = Array.from({ length: frameCount }, (_, index) => index + 1);
const slugAliases: Record<string, BeastSlug> = {
  jin: "nivi",
  mu: "suki",
  shui: "goya",
  huo: "yellen",
  tu: "nora",
};

function padFrame(slug: BeastSlug, frame: number) {
  if (slug === "nora" && frame >= 10) return `000${frame}`;
  return String(frame).padStart(4, "0");
}

function frameSrc(slug: BeastSlug, frame: number) {
  return `/images/${slug}/${padFrame(slug, frame)}.png`;
}

function normalizeSlug(value?: string): BeastSlug {
  const clean = value?.toLowerCase().trim() ?? "";
  if (clean in slugAliases) return slugAliases[clean];
  if (["nivi", "suki", "goya", "yellen", "nora", "xuan", "yao", "hundun"].includes(clean)) {
    return clean as BeastSlug;
  }
  return "yellen";
}

function makeArchiveBeasts(lang: Locale): ArchiveBeast[] {
  return beastData.map((beast, index) => {
    const localized = localizeBeast(beast, lang);
    const slug = idToSlug[beast.id];
    const pendant = pendantImages[slug];
    return {
      id: beast.id,
      slug,
      number: String(index + 1).padStart(3, "0"),
      code: codeBySlug[slug],
      title: localized.nameLatin,
      displayName: localized.displayName,
      emotionTagline: localized.emotionTagline,
      elementDetail: extraCopy[slug].elementDetail,
      sound: extraCopy[slug].sound,
      intro: extraCopy[slug].intro,
      pendantFront: pendant.front,
      pendantBack: pendant.back,
    };
  });
}

function preloadArchiveFrames(beasts: ArchiveBeast[]) {
  const run = () => {
    for (const beast of beasts) {
      for (const frame of frameNumbers) {
        if (frame === firstFrame) continue;
        const image = new window.Image();
        image.decoding = "async";
        image.src = frameSrc(beast.slug, frame);
      }
    }
  };

  const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 1));
  idle(run, { timeout: 1800 });
}

function SectionTitle({ index, title, subtitle }: { index: string; title: string; subtitle: string }) {
  return (
    <div className="archive-section-title">
      <p>
        <span>{index} — ARCHIVE</span>
        <i aria-hidden="true" />
      </p>
      <h2>
        <span>{title}</span>
        <span>{subtitle}</span>
      </h2>
    </div>
  );
}

function PortraitStage({
  active,
  beasts,
  onSelect,
}: {
  active: ArchiveBeast;
  beasts: ArchiveBeast[];
  onSelect: (slug: BeastSlug) => void;
}) {
  const [frame, setFrame] = useState(firstFrame);
  const drag = useRef<{ x: number; frame: number } | null>(null);
  const frameRef = useRef(firstFrame);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    drag.current = null;
    frameRef.current = firstFrame;
    setFrame(firstFrame);
    for (const frameNumber of frameNumbers) {
      const image = new window.Image();
      image.decoding = "async";
      image.src = frameSrc(active.slug, frameNumber);
      image.decode?.().catch(() => undefined);
    }
  }, [active.slug]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  function queueFrame(nextFrame: number) {
    if (nextFrame === frameRef.current) return;
    frameRef.current = nextFrame;
    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      setFrame(frameRef.current);
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    drag.current = { x: event.clientX, frame: frameRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const delta = event.clientX - drag.current.x;
    const offset = Math.trunc(delta / 12);
    queueFrame((((drag.current.frame - offset - 1) % frameCount) + frameCount) % frameCount + 1);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section className="archive-portrait-section" aria-label="角色 360 度档案">
      <div className="archive-portrait">
        <div
          className="archive-portrait-card"
          style={{ "--booth-bg": `url(${boothBg.src})` } as CSSProperties}
          role="img"
          aria-label={`${active.title} 角色 360 度序列帧`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="archive-portrait-frame-stack" aria-hidden="true">
            {frameNumbers.map((frameNumber) => (
              <img
                key={`${active.slug}-${frameNumber}`}
                className={frameNumber === frame ? "archive-portrait-frame is-active" : "archive-portrait-frame"}
                src={frameSrc(active.slug, frameNumber)}
                alt=""
                draggable={false}
                decoding="async"
                loading="eager"
              />
            ))}
          </div>
        </div>

        <div className="archive-portrait-copy">
          <div className="archive-tabs" aria-label="切换灵兽">
            {beasts.map((beast) => (
              <button
                key={beast.slug}
                type="button"
                className={beast.slug === active.slug ? "is-active" : ""}
                aria-pressed={beast.slug === active.slug}
                onClick={() => onSelect(beast.slug)}
              >
                {beast.title}
              </button>
            ))}
          </div>
          <p className="archive-kicker">
            <i aria-hidden="true" />
            SPOTLIGHT — № {active.number}
          </p>
        <h1>
          <span>360° portrait of </span>
          <em>{active.title}.</em>
        </h1>
          <div className="archive-name-row">
            <span>{active.displayName}</span>
            <strong>{active.title} · {active.code}</strong>
          </div>
          <p className="archive-intro">{active.intro}</p>
          <dl className="archive-facts">
            <div>
              <dt>ELEMENT 元素</dt>
              <dd>{active.elementDetail}</dd>
            </div>
            <div>
              <dt>EMOTION 情绪</dt>
              <dd>{active.emotionTagline}</dd>
            </div>
            <div>
              <dt>SOUND 声音</dt>
              <dd>{active.sound}</dd>
            </div>
          </dl>
          <div className="archive-portrait-actions">
            <a href="#archive-pendants">
              进入档案
              <i aria-hidden="true">→</i>
            </a>
            <button type="button">解锁壁纸</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArchiveView({ lang, initialBeast }: { lang: Locale; initialBeast?: string }) {
  const archiveBeasts = useMemo(() => makeArchiveBeasts(lang), [lang]);
  const [activeSlug, setActiveSlug] = useState<BeastSlug>(() => normalizeSlug(initialBeast));
  const active = archiveBeasts.find((beast) => beast.slug === activeSlug) ?? archiveBeasts[3];
  const lulumartUrl = process.env.NEXT_PUBLIC_LULUMART_URL || "https://lulumart.app";

  useEffect(() => {
    if (initialBeast) return;
    const selected = new URLSearchParams(window.location.search).get("beast");
    if (selected) setActiveSlug(normalizeSlug(selected));
  }, [initialBeast]);

  useEffect(() => {
    const whenLoaded = () => preloadArchiveFrames(archiveBeasts);
    if (document.readyState === "complete") {
      whenLoaded();
      return;
    }
    window.addEventListener("load", whenLoaded, { once: true });
    return () => window.removeEventListener("load", whenLoaded);
  }, [archiveBeasts]);

  function selectBeast(slug: BeastSlug) {
    setActiveSlug(slug);
    const url = `${localizedPath("/archive", lang)}?beast=${slug}`;
    window.history.replaceState(null, "", url);
  }

  const emoteRows = archiveBeasts.map((beast, index) => {
    const sourceKey = ["nivi", "goya", "nora", "yellen"][index % 4];
    return { beast, images: emoteSources[sourceKey] };
  });
  const carouselImages = [...illustrationImages, ...illustrationImages];

  return (
    <PageShell lang={lang} pageId="archive" noHeader noFooter noAura>
      <div className="archive-page">
        <WxSiteHeader lang={lang} />
        <PortraitStage active={active} beasts={archiveBeasts} onSelect={selectBeast} />

        <section id="archive-pendants" className="archive-section archive-pendants">
          <SectionTitle index="01" title="包挂盲盒" subtitle="Wǔ Xíng Beasts blind box pendants." />
          <div className="pendant-grid">
            {archiveBeasts.map((beast) => (
              <article key={beast.slug} className="pendant-card">
                <div className="pendant-card-inner">
                  <div className="pendant-face pendant-front">
                    <span>№ {beast.number}</span>
                    <em>{beast.code}</em>
                    <Image src={beast.pendantFront} alt={`${beast.title} 包挂正面`} width={520} height={520} sizes="(max-width: 900px) 45vw, 22vw" />
                    <strong>{beast.title}</strong>
                    <small>情绪 · {beast.emotionTagline}</small>
                  </div>
                  <div className="pendant-face pendant-back">
                    <Image src={beast.pendantBack} alt={`${beast.title} 包挂背面`} width={520} height={520} sizes="(max-width: 900px) 45vw, 22vw" />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="archive-outlink" href={lulumartUrl} target="_blank" rel="noopener">
            前往 lulumart.app <span aria-hidden="true">→</span>
          </a>
        </section>

        <section className="archive-section archive-emotes">
          <SectionTitle index="02" title="表情延展" subtitle="Wǔ Xíng Beasts Emoticons." />
          <div className="emote-grid" aria-label="八只灵兽表情网格">
            {emoteRows.flatMap((row) =>
              row.images.map((image, imageIndex) => (
                <div key={`${row.beast.slug}-${imageIndex}`} className="emote-cell">
                  <Image src={image} alt={`${row.beast.title} 表情 ${imageIndex + 1}`} width={260} height={260} sizes="(max-width: 700px) 30vw, 16vw" />
                </div>
              )),
            )}
          </div>
        </section>

        <section className="archive-section archive-illustrations">
          <SectionTitle index="03" title="漫画插图" subtitle="Wǔ Xíng Beasts illustrations." />
          <div className="illustration-marquee" aria-label="漫画插图轮播">
            <div className="illustration-track">
              {carouselImages.map((image, index) => (
                <figure key={`${image.src}-${index}`}>
                  <Image src={image} alt={`五行小兽漫画插图 ${(index % illustrationImages.length) + 1}`} width={405} height={720} sizes="(max-width: 700px) 64vw, 24vw" />
                </figure>
              ))}
            </div>
          </div>
          <p className="archive-more">更多精彩周边持续开创中...</p>
        </section>

        <section className="archive-resonance-cta">
          <p>— 灵兽共鸣 · 一次溯源</p>
          <h2>测一下你与哪只灵兽同频</h2>
          <span>三道古签，四十二秒。完成后我们将为你招来守护灵兽，并生成专属社交分享卡。</span>
          <div className="archive-resonance-actions wx-reborn-actions">
            <Link href={localizedPath("/resonance", lang)}>
              招呼我的守护灵兽
              <i aria-hidden="true">→</i>
            </Link>
          </div>
        </section>

        <WxSiteFooter lang={lang} lulumartUrl={lulumartUrl} />
      </div>
    </PageShell>
  );
}
