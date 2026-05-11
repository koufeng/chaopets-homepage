import type { CSSProperties } from "react";
import type { ParticleKind } from "@/data/beasts";
import { cn } from "@/lib/utils";

function p(seed: number, salt: number) {
  const x = Math.sin(seed * 9301 + salt * 49297) * 23.30219;
  return x - Math.floor(x);
}

const palettes: Record<ParticleKind, { color: string; glow: string }> = {
  "gold-dust": { color: "rgba(255,225,150,1)", glow: "rgba(255,210,120,0.7)" },
  petal: { color: "rgba(212,239,198,1)", glow: "rgba(168,214,168,0.6)" },
  "water-drop": { color: "rgba(217,236,247,1)", glow: "rgba(156,205,232,0.7)" },
  ember: { color: "rgba(255,180,150,1)", glow: "rgba(245,166,184,0.7)" },
  "soil-mote": { color: "rgba(239,221,196,1)", glow: "rgba(216,183,149,0.5)" },
  mist: { color: "rgba(200,180,230,1)", glow: "rgba(126,91,168,0.5)" },
  aurora: { color: "rgba(255,240,200,1)", glow: "rgba(244,226,181,0.7)" },
  primordial: { color: "rgba(220,210,210,1)", glow: "rgba(120,110,130,0.5)" },
};

export function ParticleField({
  kind,
  count = 28,
  className,
  hueShift = 0,
}: {
  kind: ParticleKind;
  count?: number;
  className?: string;
  hueShift?: number;
}) {
  const palette = palettes[kind];
  const particles = Array.from({ length: count }, (_, i) => {
    const left = p(i, 1) * 100;
    const size = 3 + p(i, 2) * 8;
    const delay = -p(i, 3) * 16;
    const duration = 14 + p(i, 4) * 18;
    const drift = (p(i, 5) - 0.5) * 80;
    const rise = -(80 + p(i, 6) * 60);
    const opacity = 0.35 + p(i, 7) * 0.6;
    return { left, size, delay, duration, drift, rise, opacity };
  });

  return (
    <div className={cn("particle-field", `particle-${kind}`, className)} aria-hidden="true">
      {particles.map((pt, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              "--px": `${pt.drift}vw`,
              "--py": `${pt.rise}vh`,
              left: `${pt.left}%`,
              bottom: "-10%",
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              animationDuration: `${pt.duration}s`,
              animationDelay: `${pt.delay}s`,
              opacity: pt.opacity,
              background: palette.color,
              boxShadow: `0 0 ${pt.size * 2}px ${palette.glow}`,
              filter: `hue-rotate(${hueShift}deg)`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
