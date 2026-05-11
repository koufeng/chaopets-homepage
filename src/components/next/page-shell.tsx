"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/types";
import { LOCALE_LABELS } from "@/i18n/types";
import { getShichen, styleFromShichen, localizeShichen } from "@/lib/time";
import { Header } from "./header";
import { Footer } from "./footer";

export function PageShell({
  lang,
  pageId = "page",
  noHeader = false,
  noFooter = false,
  noAura = false,
  children,
}: {
  lang: Locale;
  pageId?: string;
  noHeader?: boolean;
  noFooter?: boolean;
  noAura?: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = LOCALE_LABELS[lang].html;
    document.documentElement.dataset.locale = lang;
    document.documentElement.dataset.page = pageId;
    const paint = () => {
      const s = getShichen();
      document.body.setAttribute("style", styleFromShichen(s));
      document.documentElement.dataset.shichen = localizeShichen(s, lang).name;
    };
    paint();
    const timer = window.setInterval(paint, 5 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [lang, pageId]);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {!noAura ? (
        <>
          <div className="shichen-aura" aria-hidden="true" />
          <div className="scrim-vignette" aria-hidden="true" />
        </>
      ) : null}
      {!noHeader ? <Header lang={lang} current={pageId === "home" ? "home" : pageId.split("-")[0]} /> : null}
      <main id="main">{children}</main>
      {!noFooter ? <Footer lang={lang} /> : null}
    </>
  );
}
