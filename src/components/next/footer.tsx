"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/types";
import { getDict, localizedPath } from "@/i18n";
import { getShichen, localizeShichen } from "@/lib/time";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const year = new Date().getFullYear();
  const lulumartUrl = process.env.NEXT_PUBLIC_LULUMART_URL || "https://lulumart.app";
  const [shichen, setShichen] = useState("");

  useEffect(() => {
    const s = localizeShichen(getShichen(), lang);
    setShichen(`${t.footer.nowLabel} · ${s.name} · ${s.vibe}`);
  }, [lang, t.footer.nowLabel]);

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="brand-block">
          <p className="footer-mark">
            {t.brand.name} · {t.brand.nameLatin}
          </p>
          <p className="footer-tag">{t.brand.tagline}</p>
        </div>
        <nav className="footer-nav" aria-label={t.nav.primaryAria}>
          <div>
            <h4>{t.footer.explore}</h4>
            <ul>
              <li><Link href={localizedPath("/", lang)}>{t.footer.homeLink}</Link></li>
              <li><Link href={localizedPath("/origin", lang)}>{t.footer.originLink}</Link></li>
              <li><Link href={localizedPath("/beasts", lang)}>{t.footer.beastsLink}</Link></li>
              <li><Link href={localizedPath("/series", lang)}>{t.footer.seriesLink}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.resonate}</h4>
            <ul>
              <li><Link href={localizedPath("/resonance", lang)}>{t.footer.resonanceLink}</Link></li>
              <li><a href={lulumartUrl} rel="noopener" target="_blank">{t.footer.purchaseLink}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.company}</h4>
            <ul>
              <li><a href="https://www.xiaohongshu.com/" rel="noopener" target="_blank">{t.footer.xhsLink}</a></li>
              <li><a href="https://weibo.com/" rel="noopener" target="_blank">{t.footer.weiboLink}</a></li>
              <li><a href="mailto:hi@wuxing-beasts.com">{t.footer.emailLink}</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <p>{t.footer.rightsPrefix.replace("{year}", String(year))}{t.footer.rights}</p>
        <p className="footer-shichen" aria-live="polite">{shichen}</p>
      </div>
    </footer>
  );
}
