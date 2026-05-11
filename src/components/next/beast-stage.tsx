"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import type { LocalizedBeast } from "@/data/beasts";
import { cn } from "@/lib/utils";
import { ParticleField } from "./particle-field";

export function BeastStage({
  beast,
  expanded = false,
  particleCount = 36,
}: {
  beast: LocalizedBeast;
  expanded?: boolean;
  particleCount?: number;
}) {
  function onMove(e: PointerEvent<HTMLElement>) {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const stage = e.currentTarget;
    const tilt = stage.querySelector<HTMLElement>(".beast-tilt");
    if (!tilt) return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateZ(0)`;
  }

  return (
    <section
      className={cn("stage", { expanded })}
      data-beast={beast.id}
      style={
        {
          "--c-aura": beast.palette.aura,
          "--c-deep": beast.palette.deep,
          "--c-glow": beast.palette.glow,
          "--c-ink": beast.palette.ink,
          "--g1": beast.palette.gradient[0],
          "--g2": beast.palette.gradient[1],
          "--g3": beast.palette.gradient[2],
          "--c-surface": beast.palette.surface,
        } as CSSProperties
      }
      onPointerMove={onMove}
      onPointerLeave={(e) => e.currentTarget.querySelector<HTMLElement>(".beast-tilt")?.style.removeProperty("transform")}
    >
      <div className="atmos" aria-hidden="true" />
      <ParticleField kind={beast.particle} count={particleCount} className="stage-particles" />
      <div className="portrait beast-tilt">
        <Image src={beast.image} alt={beast.displayName} width={720} height={720} priority />
        <span className="beast-shadow" />
      </div>
    </section>
  );
}
