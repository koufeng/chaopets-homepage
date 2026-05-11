import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/types";
import { getDict, localizedPath } from "@/i18n";
import { beasts, groupShot, localizeBeast } from "@/data/beasts";
import { PageShell } from "@/components/next/page-shell";
import { BeastCard } from "@/components/next/beast-card";
import { SectionHeading } from "@/components/next/section-heading";

export function SeriesView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const localized = beasts.map((b) => localizeBeast(b, lang));
  const lulumartUrl = process.env.NEXT_PUBLIC_LULUMART_URL || "https://lulumart.app";
  return (
    <PageShell lang={lang} pageId="series">
      <section className="scene series-hero">
        <div className="wrap series-hero-grid">
          <div className="copy fade-up">
            <SectionHeading eyebrow={t.series.eyebrow} title={t.series.title} description={t.series.desc} as="h1" />
            <ul className="bullets">{t.series.bullets.map((b) => <li key={b}><span className="dot" />{b}</li>)}</ul>
            <div className="actions"><a href={lulumartUrl} rel="noopener" target="_blank" className="btn btn-primary" data-event="series_outlink">{t.series.ctaPrimary}<span aria-hidden="true">↗</span></a><Link href={localizedPath("/beasts", lang)} className="btn btn-ghost">{t.series.ctaSecondary}</Link></div>
          </div>
          <figure className="art fade-up">
            <Image src={groupShot} alt={t.series.caption} width={1200} height={580} priority />
            <figcaption>{t.series.caption}</figcaption>
          </figure>
        </div>
      </section>
      <section className="scene series-list">
        <div className="wrap">
          <SectionHeading eyebrow={t.series.lineupEyebrow} title={t.series.lineupTitle} description={t.series.lineupDesc} align="center" />
          <div className="grid">{localized.map((beast) => <BeastCard key={beast.id} beast={beast} lang={lang} />)}</div>
        </div>
      </section>
      <section className="scene future-cta fade-up">
        <div className="wrap future-inner">
          <p className="eyebrow">{t.series.futureEyebrow}</p>
          <h2 className="future-title">{t.series.futureTitle1}<br />{t.series.futureTitle2}</h2>
          <p className="future-tag">{t.series.futureTag1}<br />{t.series.futureTag2}</p>
          <a href={lulumartUrl} rel="noopener" target="_blank" className="btn btn-primary" data-event="series_future_outlink">{t.series.futureCta}</a>
        </div>
      </section>
    </PageShell>
  );
}
