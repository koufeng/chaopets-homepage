export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="20" cy="6" r="1.6" fill="#F1D687" />
      <circle cx="33" cy="15" r="1.6" fill="#A8D6A8" />
      <circle cx="28" cy="32" r="1.6" fill="#9CCDE8" />
      <circle cx="12" cy="32" r="1.6" fill="#F5A6B8" />
      <circle cx="7" cy="15" r="1.6" fill="#D8B795" />
      <text x="20" y="24" textAnchor="middle" fontFamily="Noto Serif SC, serif" fontSize="13" fill="currentColor">
        五
      </text>
    </svg>
  );
}
