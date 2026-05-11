"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { beasts, specialBeasts, wuxingBeasts, localizeBeast, type LocalizedBeast } from "@/data/beasts";
import { getDict, localizedPath, switchLocaleHref } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { LOCALES, LOCALE_LABELS } from "@/i18n/types";
import { BrandMark } from "./brand-mark";
import { cn } from "@/lib/utils";

function giantText(b: LocalizedBeast, l: Locale): string {
  if (l === "en") return b.nameLatin.toUpperCase();
  if (b.category === "wuxing") return `${b.glyph} 灵`;
  if (b.id === "hundun") return "混 沌";
  return b.glyph;
}

export function HomeHero({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const year = new Date().getFullYear();
  const items = useMemo(() => beasts.map((b) => localizeBeast(b, lang)), [lang]);
  const [order, setOrder] = useState(() => wuxingBeasts.map((b) => b.id));
  const [index, setIndex] = useState(0);
  const current = items.find((b) => b.id === order[index]) ?? items[0];
  const next = items.find((b) => b.id === order[(index + 1) % order.length]) ?? items[1];

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % order.length), 7000);
    return () => window.clearInterval(timer);
  }, [order.length]);

  const filter = (value: string) => {
    if (value === "all") setOrder(wuxingBeasts.map((b) => b.id));
    else if (value === "trio") setOrder(specialBeasts.map((b) => b.id));
    else setOrder([value as (typeof beasts)[number]["id"]]);
    setIndex(0);
  };

  const vars = {
    "--c-aura": current.palette.aura,
    "--c-deep": current.palette.deep,
    "--c-glow": current.palette.glow,
    "--c-ink": current.palette.ink,
    "--c-surface": current.palette.surface,
    "--g1": current.palette.gradient[0],
    "--g2": current.palette.gradient[1],
    "--g3": current.palette.gradient[2],
  } as CSSProperties;

  return (
    <section className={cn("hero-v2", `lang-${lang}`)} aria-label={t.brand.tagline} style={vars}>
      <header className="hero-top">
        <Link href={localizedPath("/", lang)} className="brand-mark" aria-label={t.nav.homeAria}>
          <span className="mark">
            <BrandMark size={32} />
          </span>
          <span className="brand-text">
            <span className="zh">{t.brand.name}</span>
            <span className="latin">{t.brand.nameLatin}</span>
          </span>
        </Link>

        <nav className="filter-pills" aria-label={t.nav.primaryAria}>
          <button className={cn("pill", order.length === 5 && "is-active")} onClick={() => filter("all")}>{t.home.heroFiltersAll}</button>
          {wuxingBeasts.map((b) => (
            <button key={b.id} className={cn("pill pill-glyph", order.length === 1 && order[0] === b.id && "is-active")} onClick={() => filter(b.id)} aria-label={b.id}>
              <span style={{ color: b.palette.deep }}>{b.glyph}</span>
            </button>
          ))}
          <button className={cn("pill", order.length === 3 && "is-active")} onClick={() => filter("trio")}>{t.home.heroFiltersTrio}</button>
        </nav>

        <div className="top-end">
          <div className="lang-switch" role="group" aria-label={t.nav.switcherAria}>
            {LOCALES.map((l) => (
              <Link key={l} href={switchLocaleHref(localizedPath("/", lang), l)} className={cn("lang-chip", l === lang && "is-active")} hrefLang={LOCALE_LABELS[l].html}>
                {LOCALE_LABELS[l].short}
              </Link>
            ))}
          </div>
          <Link className="pill social-pill" href={localizedPath("/resonance", lang)} data-event="hero_resonance">{t.nav.headerCta}</Link>
        </div>
      </header>

      <div className="card-stage">
        <article className="hero-card" id="hero-card" data-current-id={current.id}>
          <div className="card-glow" aria-hidden="true" />
          <div className="card-corner-tl">
            <span className="card-tag">{t.home.heroLabel} · <span>{current.element}</span></span>
          </div>
          <div className="card-canvas">
            <h1 className="bg-type">{Array.from(giantText(current, lang)).map((ch, i) => <span key={i} className="bg-char">{ch}</span>)}</h1>
            <div className="beast-frame">
              {items.map((b, i) => (
                <Image key={b.id} src={b.image} alt={b.displayName} width={780} height={780} priority={i === 0} className={cn("beast-img", b.id === current.id && "is-active")} />
              ))}
            </div>
          </div>
          <div className="card-bottom">
            <div className="meta-block">
              <p className="micro">{t.home.eyebrow} · {current.element}</p>
              <h2 className="card-name">
                <span className="primary">{lang === "zh" ? current.nameZh : current.nameLatin}</span>
                <span className="secondary">{lang === "zh" ? current.nameLatin : current.nameZh}</span>
              </h2>
              <p className="card-sig">「{current.signature}」</p>
              <div className="nav-block">
                <button className="round-btn prev" aria-label={t.home.heroPrev} onClick={() => setIndex((i) => (i - 1 + order.length) % order.length)}>‹</button>
                <button className="round-btn next" aria-label={t.home.heroNext} onClick={() => setIndex((i) => (i + 1) % order.length)}>›</button>
                <button className="thumb" aria-label={t.home.heroNext} onClick={() => setIndex((i) => (i + 1) % order.length)}>
                  <Image src={next.image} alt="" width={120} height={120} />
                </button>
              </div>
            </div>
            <Link href={localizedPath("/beasts", lang)} className="explore-cta" data-event="hero_explore_all">
              <span className="explore-text">{t.home.heroExplore}</span>
              <span className="explore-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      </div>

      <footer className="hero-bottom">
        <p className="copyright">{t.home.heroCopyright.replace("{year}", String(year))}</p>
        <a href="#origin" className="pill scroll-pill" data-event="hero_scroll_cue">
          <span>{t.home.scroll}</span>
          <span className="arrow" aria-hidden="true">↓</span>
        </a>
      </footer>
      <div className="bottom-fade" aria-hidden="true" />
    </section>
  );
}
