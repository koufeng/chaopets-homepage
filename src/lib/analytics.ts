type EventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, props?: EventProps): void {
  if (typeof window === 'undefined') return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
    window.gtag?.('event', event, props);
  } catch {
    // analytics must never break the page
  }
}

export const Events = {
  HOME_HERO_VIEWED: 'home_hero_viewed',
  RESONANCE_OPENED: 'resonance_opened',
  RESONANCE_COMPLETED: 'resonance_completed',
  RESONANCE_SHARED: 'resonance_shared',
  BEAST_VIEWED: 'beast_viewed',
  BEAST_INTERACTED: 'beast_interacted',
  SERIES_OUTLINK: 'series_outlink',
  ORIGIN_FINISHED: 'origin_finished',
} as const;
