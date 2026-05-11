"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import type { LocalizedBeast } from "@/data/beasts";
import { localizedPath } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { cn } from "@/lib/utils";

function vars(beast: LocalizedBeast) {
  return {
    "--c-aura": beast.palette.aura,
    "--c-deep": beast.palette.deep,
    "--c-glow": beast.palette.glow,
    "--c-ink": beast.palette.ink,
    "--g1": beast.palette.gradient[0],
    "--g2": beast.palette.gradient[1],
    "--g3": beast.palette.gradient[2],
  } as CSSProperties;
}

export function BeastCard({
  beast,
  lang,
  size = "md",
  href,
  showStory = false,
}: {
  beast: LocalizedBeast;
  lang: Locale;
  size?: "sm" | "md" | "lg";
  href?: string;
  showStory?: boolean;
}) {
  const linkHref = href ?? localizedPath(`/beasts/${beast.id}`, lang);
  const dims = size === "sm" ? 220 : size === "lg" ? 540 : 360;

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const card = e.currentTarget;
    const tilt = card.querySelector<HTMLElement>(".beast-tilt");
    if (!tilt) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
  }

  function reset(e: PointerEvent<HTMLAnchorElement>) {
    e.currentTarget.querySelector<HTMLElement>(".beast-tilt")?.style.removeProperty("transform");
  }

  return (
    <Link
      className={cn("beast-card", `size-${size}`, `lang-${lang}`, "fade-up")}
      href={linkHref}
      data-beast={beast.id}
      data-event="beast_card_click"
      style={vars(beast)}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div className="halo" aria-hidden="true" />
      <div className="orb" aria-hidden="true">
        <span className="glyph">{beast.glyph}</span>
      </div>
      <div className="beast-tilt portrait">
        <Image src={beast.image} alt={`${beast.displayName} · ${beast.element}`} width={dims} height={dims} loading="lazy" />
        <span className="beast-shadow" />
      </div>
      <div className="meta">
        <p className="eyebrow">
          {beast.element} · {beast.emotion}
        </p>
        <h3 className="name">
          <span className="primary">{lang === "zh" ? beast.nameZh : beast.nameLatin}</span>
          <span className="secondary">{lang === "zh" ? beast.nameLatin : beast.nameZh}</span>
        </h3>
        {showStory ? <p className="signature">「{beast.signature}」</p> : null}
      </div>
    </Link>
  );
}
