import Link from "next/link";
import type { CSSProperties } from "react";
import type { BeastId } from "@/data/beasts";
import { beasts, beastsById, localizeBeast } from "@/data/beasts";
import { getDict, localizedPath } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { PageShell } from "@/components/next/page-shell";
import { BeastStage } from "@/components/next/beast-stage";

export function BeastDetailView({ lang, beastId }: { lang: Locale; beastId: BeastId }) {
  const t = getDict(lang);
  const raw = beastsById[beastId];
  const beast = localizeBeast(raw, lang);
  const idx = beasts.findIndex((b) => b.id === beast.id);
  const prev = localizeBeast(beasts[(idx - 1 + beasts.length) % beasts.length], lang);
  const next = localizeBeast(beasts[(idx + 1) % beasts.length], lang);
  const lulumartUrl = process.env.NEXT_PUBLIC_LULUMART_URL || "https://lulumart.app";
  const vars = {
    "--c-aura": beast.palette.aura,
    "--c-deep": beast.palette.deep,
    "--c-glow": beast.palette.glow,
    "--c-ink": beast.palette.ink,
    "--c-surface": beast.palette.surface,
    "--g1": beast.palette.gradient[0],
    "--g2": beast.palette.gradient[1],
    "--g3": beast.palette.gradient[2],
  } as CSSProperties;

  return (
    <PageShell lang={lang} pageId={`beast-${beast.id}`}>
      <article className={`beast-page lang-${lang}`} style={vars}>
        <header className="beast-hero">
          <div className="wrap beast-hero-grid">
            <aside className="stage-wrap fade-up">
              <BeastStage beast={beast} expanded particleCount={48} />
              <p className="hint" aria-hidden="true">{t.beast.rotateHint}</p>
            </aside>
            <div className="meta fade-up">
              <p className="eyebrow">{t.beast.archive} · {beast.element}</p>
              <h1 className="name">
                <span className="primary">{lang === "zh" ? beast.nameZh : beast.nameLatin}</span>
                <span className="secondary">{lang === "zh" ? beast.nameLatin : beast.nameZh}</span>
              </h1>
              <p className="tag">{beast.emotionTagline}</p>
              <p className="signature">{t.beast.sigPrefix}{beast.signature}{t.beast.sigSuffix}</p>
              <dl className="stats">
                <div><dt>{t.beast.element}</dt><dd>{beast.element}</dd></div>
                <div><dt>{t.beast.emotion}</dt><dd>{beast.emotion}</dd></div>
                <div><dt>{t.beast.hour}</dt><dd>{beast.hour.label}</dd></div>
              </dl>
              <div className="beast-actions">
                <Link href={localizedPath("/resonance", lang)} className="btn btn-primary" data-event="beast_to_resonance">{t.beast.ctaResonance}</Link>
                <a href={lulumartUrl} rel="noopener" target="_blank" className="btn btn-ghost" data-event="beast_to_lulumart">{t.beast.ctaPurchase}</a>
              </div>
            </div>
          </div>
        </header>
        <section className="story">
          <div className="wrap story-grid">
            <div className="story-copy fade-up">
              <p className="eyebrow">{t.beast.storyPrologue}</p>
              <p className="opening text-balance">{beast.storyOpening}</p>
            </div>
            <ul className="fragments">
              {beast.storyFragments.map((f, i) => (
                <li key={f} className="fragment fade-up" style={{ "--delay": `${i * 0.12}s` } as CSSProperties}>
                  <span className="num">0{i + 1}</span><p>{f}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <nav className="beast-nav">
          <div className="wrap nav-inner">
            <Link href={localizedPath(`/beasts/${prev.id}`, lang)} className="nav-link" rel="prev">
              <span className="arrow">←</span><span className="meta"><span className="meta-label">{t.beast.navPrev}</span><span className="meta-name">{prev.displayName} · {prev.element}</span></span>
            </Link>
            <Link href={localizedPath("/beasts", lang)} className="nav-back">{t.beast.navBack}</Link>
            <Link href={localizedPath(`/beasts/${next.id}`, lang)} className="nav-link nav-next" rel="next">
              <span className="meta"><span className="meta-label">{t.beast.navNext}</span><span className="meta-name">{next.displayName} · {next.element}</span></span><span className="arrow">→</span>
            </Link>
          </div>
        </nav>
      </article>
    </PageShell>
  );
}
