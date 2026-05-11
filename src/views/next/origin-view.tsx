import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/types";
import { getDict, localizedPath } from "@/i18n";
import { groupShot } from "@/data/beasts";
import { PageShell } from "@/components/next/page-shell";
import { ParticleField } from "@/components/next/particle-field";
import { SectionHeading } from "@/components/next/section-heading";

const elementColors = ["#F1D687", "#A8D6A8", "#9CCDE8", "#F5A6B8", "#D8B795"];

export function OriginView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <PageShell lang={lang} pageId="origin">
      <article className="origin">
        <section className="scene chapter intro">
          <ParticleField kind="aurora" count={36} className="origin-stars" />
          <div className="wrap intro-inner fade-up">
            <p className="eyebrow">{t.origin.eyebrow}</p>
            <h1 className="chapter-title">{t.origin.introTitle.map((line) => <span key={line} className="line">{line}</span>)}</h1>
            <p className="lead text-balance">{t.origin.intro}</p>
          </div>
        </section>
        <section className="scene chapter five-chi">
          <div className="wrap chi-grid">
            <div className="copy fade-up"><SectionHeading eyebrow={t.origin.fiveQiEyebrow} title={t.origin.fiveQiTitle} description={t.origin.fiveQiDesc} /></div>
            <ul className="chi-list">
              {t.origin.fiveQiList.map((it, i) => (
                <li key={it.c} className="chi-row fade-up" style={{ "--delay": `${i * 0.1}s`, "--c": elementColors[i] } as CSSProperties}>
                  <span className="chi-glyph">{it.c}</span><div><p className="chi-tag">{it.t}</p><p className="chi-desc">{it.d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="scene chapter calling">
          <div className="wrap calling-inner fade-up">
            <SectionHeading eyebrow={t.origin.callingEyebrow} title={t.origin.callingTitle} align="center" />
            <p className="vow text-balance">{t.origin.callingVow1}<br />{t.origin.callingVow2}</p>
            <div className="vow-meta">{t.origin.callingMeta.map((line) => <p key={line}>{line}</p>)}</div>
          </div>
        </section>
        <section className="scene chapter trio-chapter">
          <div className="wrap trio-inner">
            <div className="copy fade-up"><SectionHeading eyebrow={t.origin.trioEyebrow} title={t.origin.trioTitle} description={t.origin.trioDesc} /></div>
            <ul className="trio-cards">{t.origin.trioCards.map((card, i) => <li key={card.name} className="fade-up" style={{ "--delay": `${i * 0.1}s` } as CSSProperties}><h4>{card.name}</h4><p className="trio-tag">{card.tag}</p><p>{card.desc}</p></li>)}</ul>
          </div>
        </section>
        <section className="scene chapter unseal">
          <div className="wrap unseal-grid">
            <div className="art fade-up"><Image src={groupShot} alt={t.origin.unsealTitle} width={1080} height={520} loading="lazy" /></div>
            <div className="copy fade-up">
              <SectionHeading eyebrow={t.origin.unsealEyebrow} title={t.origin.unsealTitle} description={t.origin.unsealDesc} />
              <div className="unseal-actions"><Link href={localizedPath("/beasts", lang)} className="btn btn-primary">{t.origin.unsealCtaPrimary}</Link><Link href={localizedPath("/resonance", lang)} className="btn btn-ghost">{t.origin.unsealCtaSecondary}</Link></div>
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
