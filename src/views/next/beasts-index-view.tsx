"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/types";
import { getDict } from "@/i18n";
import { localizeBeast, specialBeasts, wuxingBeasts } from "@/data/beasts";
import { PageShell } from "@/components/next/page-shell";
import { BeastCard } from "@/components/next/beast-card";
import { SectionHeading } from "@/components/next/section-heading";
import { cn } from "@/lib/utils";

export function BeastsIndexView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const [filter, setFilter] = useState<"all" | "wuxing" | "special">("all");
  const wuxingLocalized = wuxingBeasts.map((b) => localizeBeast(b, lang));
  const specialLocalized = specialBeasts.map((b) => localizeBeast(b, lang));

  return (
    <PageShell lang={lang} pageId="beasts">
      <section className="scene archive-hero">
        <div className="wrap archive-hero-inner fade-up">
          <SectionHeading eyebrow={t.beasts.eyebrow} title={t.beasts.title} description={t.beasts.desc} align="center" as="h1" />
          <div className="filter" role="tablist" aria-label={t.beasts.eyebrow}>
            {[
              ["all", t.beasts.filterAll],
              ["wuxing", t.beasts.filterWuxing],
              ["special", t.beasts.filterSpecial],
            ].map(([id, label]) => (
              <button key={id} className={cn("chip", filter === id && "is-active")} role="tab" aria-selected={filter === id} onClick={() => setFilter(id as typeof filter)}>{label}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="scene archive-grid-section">
        <div className="wrap">
          <h2 className="group-title fade-up" data-filter-hidden={filter === "special"}>{t.beasts.groupWuxing}</h2>
          <div className="grid grid-five" data-filter-hidden={filter === "special"}>{wuxingLocalized.map((beast) => <BeastCard key={beast.id} beast={beast} lang={lang} showStory />)}</div>
          <div className="group-divider fade-up"><span className="line" /><span className="char">{t.beasts.groupDivider}</span><span className="line" /></div>
          <h2 className="group-title fade-up" data-filter-hidden={filter === "wuxing"}>{t.beasts.groupSpecial}</h2>
          <div className="grid grid-three" data-filter-hidden={filter === "wuxing"}>{specialLocalized.map((beast) => <BeastCard key={beast.id} beast={beast} lang={lang} showStory />)}</div>
        </div>
      </section>
    </PageShell>
  );
}
