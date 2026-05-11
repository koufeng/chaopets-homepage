import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/types";
import { getDict, localizedPath } from "@/i18n";
import { groupShot } from "@/data/beasts";
import { PageShell } from "@/components/next/page-shell";

export function NotFoundView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <PageShell lang={lang} pageId="404">
      <section className="lost">
        <div className="wrap inner">
          <p className="eyebrow">{t.notFound.eyebrow}</p>
          <h1>{t.notFound.title}</h1>
          <p className="meta">{t.notFound.meta}</p>
          <div className="actions"><Link href={localizedPath("/", lang)} className="btn btn-primary">{t.notFound.ctaPrimary}</Link><Link href={localizedPath("/beasts", lang)} className="btn btn-ghost">{t.notFound.ctaSecondary}</Link></div>
          <figure className="art"><Image src={groupShot} alt="" width={1200} height={580} loading="lazy" /></figure>
        </div>
      </section>
    </PageShell>
  );
}
