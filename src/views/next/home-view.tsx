import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/types";
import { getDict, localizedPath } from "@/i18n";
import { groupShot, localizeBeast, specialBeasts, wuxingBeasts } from "@/data/beasts";
import { PageShell } from "@/components/next/page-shell";
import { HomeHero } from "@/components/next/home-hero";
import { BeastCard } from "@/components/next/beast-card";
import { SectionHeading } from "@/components/next/section-heading";

export function HomeView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const localizedWuxing = wuxingBeasts.map((b) => localizeBeast(b, lang));
  const localizedSpecial = specialBeasts.map((b) => localizeBeast(b, lang));
  const lulumartUrl = process.env.NEXT_PUBLIC_LULUMART_URL || "https://lulumart.app";

  return (
    <PageShell lang={lang} pageId="home" noHeader>
      <HomeHero lang={lang} />
      <section id="origin" className="scene fade-up">
        <div className="wrap origin-grid">
          <div className="copy">
            <SectionHeading eyebrow={t.home.originEyebrow} title={t.home.originTitle} description={t.home.originDesc} />
            <p className="invocation"><em>{t.home.originVow}</em></p>
            <p className="meta">{t.home.originMeta}</p>
            <Link href={localizedPath("/origin", lang)} className="btn btn-ghost">{t.home.originMore}</Link>
          </div>
          <aside className="origin-aside" aria-hidden="true">
            <div className="seal"><span className="seal-zh">五</span><span className="seal-zh">行</span></div>
            <div className="vert"><span>木</span><span>火</span><span>土</span><span>金</span><span>水</span></div>
          </aside>
        </div>
      </section>

      <hr className="divider-flow" />
      <section className="scene archive">
        <div className="wrap">
          <SectionHeading eyebrow={t.home.archiveEyebrow} title={t.home.archiveTitle} description={t.home.archiveDesc} align="center" />
          <div className="archive-row archive-five">{localizedWuxing.map((beast) => <BeastCard key={beast.id} beast={beast} lang={lang} showStory />)}</div>
          <div className="archive-divider" aria-hidden="true"><span className="line" /><span className="char">{t.home.archiveTrioDivider}</span><span className="line" /></div>
          <div className="archive-row archive-three">{localizedSpecial.map((beast) => <BeastCard key={beast.id} beast={beast} lang={lang} showStory />)}</div>
          <div className="archive-cta fade-up"><Link href={localizedPath("/beasts", lang)} className="btn">{t.home.archiveAll}</Link></div>
        </div>
      </section>

      <hr className="divider-flow" />
      <section className="scene series">
        <div className="wrap series-grid">
          <div className="copy fade-up">
            <SectionHeading eyebrow={t.home.seriesEyebrow} title={t.home.seriesTitle} description={t.home.seriesDesc} />
            <ul className="series-points">{t.home.seriesPoints.map((point) => <li key={point}><span>·</span>{point}</li>)}</ul>
            <div className="series-actions">
              <a href={lulumartUrl} className="btn btn-primary" rel="noopener" target="_blank" data-event="series_outlink">{t.home.seriesCtaPrimary}<span aria-hidden="true">↗</span></a>
              <Link href={localizedPath("/series", lang)} className="btn btn-ghost">{t.home.seriesCtaSecondary}</Link>
            </div>
          </div>
          <div className="series-art fade-up">
            <div className="art-frame"><Image src={groupShot} alt={t.home.seriesCaption} width={1080} height={520} loading="lazy" /></div>
            <p className="art-cap">{t.home.seriesCaption}</p>
          </div>
        </div>
      </section>

      <section className="scene final-cta fade-up">
        <div className="wrap final-inner">
          <p className="eyebrow">{t.home.finalEyebrow}</p>
          <h2 className="final-title">{t.home.finalTitle}</h2>
          <p className="final-tag">{t.home.finalTag}</p>
          <Link href={localizedPath("/resonance", lang)} className="btn btn-primary final-btn" data-event="final_resonance_cta">{t.home.finalCta}<span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </PageShell>
  );
}
