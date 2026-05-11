"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/i18n/types";
import { LOCALES, LOCALE_LABELS } from "@/i18n/types";
import { getDict, localizedPath, switchLocaleHref } from "@/i18n";
import { BrandMark } from "./brand-mark";
import { cn } from "@/lib/utils";

export function Header({ lang, current = "" }: { lang: Locale; current?: string }) {
  const t = getDict(lang);
  const pathname = usePathname() || localizedPath("/", lang);
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", href: localizedPath("/", lang), label: t.nav.home },
    { id: "origin", href: localizedPath("/origin", lang), label: t.nav.origin },
    { id: "beasts", href: localizedPath("/beasts", lang), label: t.nav.beasts },
    { id: "series", href: localizedPath("/series", lang), label: t.nav.series },
  ];
  const switchTargets = LOCALES.map((l) => ({
    locale: l,
    href: switchLocaleHref(pathname, l),
    short: LOCALE_LABELS[l].short,
    long: LOCALE_LABELS[l].long,
  }));

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href={localizedPath("/", lang)} className="brand" aria-label={t.nav.homeAria}>
          <span className="brand-mark">
            <BrandMark />
          </span>
          <span className="brand-text">
            <span className="brand-zh">{t.brand.name}</span>
            <span className="brand-latin">{t.brand.nameLatin}</span>
          </span>
        </Link>

        <nav className="primary" aria-label={t.nav.primaryAria}>
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <Link href={l.href} className={cn("nav-link", current === l.id && "is-current")}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="end">
          <div className="lang-switch" role="group" aria-label={t.nav.switcherAria}>
            {switchTargets.map((s) => (
              <Link
                key={s.locale}
                href={s.href}
                className={cn("lang-chip", s.locale === lang && "is-active")}
                hrefLang={LOCALE_LABELS[s.locale].html}
                aria-current={s.locale === lang ? "true" : undefined}
                title={s.long}
              >
                {s.short}
              </Link>
            ))}
          </div>
          <Link href={localizedPath("/resonance", lang)} className="btn btn-primary header-cta" data-event="header_resonance">
            <span>{t.nav.headerCta}</span>
            <span className="cta-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={t.nav.mobileToggleOpen}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-nav" className="mobile-nav" hidden={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.id}>
              <Link href={l.href} className={cn("nav-link", current === l.id && "is-current")}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={localizedPath("/resonance", lang)} className="nav-link nav-cta">
              {t.nav.headerCta}
            </Link>
          </li>
          <li className="mobile-lang">
            {switchTargets.map((s) => (
              <Link key={s.locale} href={s.href} className={cn("lang-chip", s.locale === lang && "is-active")} hrefLang={LOCALE_LABELS[s.locale].html}>
                {s.long}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </header>
  );
}
