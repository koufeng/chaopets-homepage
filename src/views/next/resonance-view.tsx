"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { BeastId } from "@/data/beasts";
import { beasts, localizeBeast } from "@/data/beasts";
import { getDict, localizedPath } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { getLocalizedQuestions, matchBeast } from "@/lib/resonance";
import { PageShell } from "@/components/next/page-shell";
import { ParticleField } from "@/components/next/particle-field";
import { cn } from "@/lib/utils";

export function ResonanceView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const questions = useMemo(() => getLocalizedQuestions(lang), [lang]);
  const localized = useMemo(() => Object.fromEntries(beasts.map((b) => [b.id, localizeBeast(b, lang)])) as Record<BeastId, ReturnType<typeof localizeBeast>>, [lang]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [cur, setCur] = useState(0);
  const [result, setResult] = useState<BeastId | null>(null);
  const beast = result ? localized[result] : null;

  const pick = (stepId: string, optIdx: number) => {
    const nextAnswers = { ...answers, [stepId]: optIdx };
    setAnswers(nextAnswers);
    if (cur + 1 >= questions.length) setResult(matchBeast(nextAnswers));
    else setCur(cur + 1);
  };

  return (
    <PageShell lang={lang} pageId="resonance">
      <section className="resonance">
        <ParticleField kind="aurora" count={36} className="resonance-stars" />
        {!result ? (
          <div className="wrap quiz" id="quiz-view">
            <header className="quiz-head fade-up">
              <p className="eyebrow">{t.resonance.eyebrow}</p>
              <h1>{t.resonance.title}</h1>
              <p className="subtitle">{t.resonance.subtitle}</p>
            </header>
            <div className="progress" aria-hidden="true"><span className="bar" style={{ width: `${(cur / questions.length) * 100}%` }} /></div>
            <ol className="steps">
              {questions.map((q, qi) => (
                <li key={q.id} className={cn("step", cur === qi && "is-active")} data-step-index={qi} data-step-id={q.id}>
                  <p className="step-caption">{q.caption}</p>
                  <h2 className="step-prompt">{q.prompt}</h2>
                  <div className="options">
                    {q.options.map((o, oi) => (
                      <button key={o.label} type="button" className={cn("option", answers[q.id] === oi && "is-picked")} onClick={() => pick(q.id, oi)}>
                        <span className="opt-mark" /><span className="opt-label">{o.label}</span>
                      </button>
                    ))}
                  </div>
                  {qi > 0 ? <button type="button" className="step-back" onClick={() => setCur(Math.max(0, cur - 1))}>{t.resonance.backStep}</button> : null}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {beast ? (
          <div className="wrap result" id="result-view" aria-live="polite">
            <article className="result-card" style={{ "--c-aura": beast.palette.aura, "--c-deep": beast.palette.deep, "--c-glow": beast.palette.glow } as CSSProperties}>
              <div className="result-art"><div className="result-glow" aria-hidden="true" /><Image id="result-img" src={beast.image} alt={beast.displayName} width={720} height={720} /></div>
              <div className="result-meta">
                <p className="eyebrow">{t.resonance.resultEyebrow}</p>
                <h2 className="result-name"><span className="primary">{lang === "zh" ? beast.nameZh : beast.nameLatin}</span><span className="secondary">{lang === "zh" ? beast.nameLatin : beast.nameZh}</span></h2>
                <p className="result-tag">{beast.element} · {beast.emotion} · {beast.emotionTagline}</p>
                <p className="result-sig">「{beast.signature}」</p>
                <p className="result-story">{beast.storyOpening}</p>
                <div className="result-actions"><Link className="btn btn-ghost" href={localizedPath(`/beasts/${beast.id}`, lang)}>{t.resonance.resultArchive}</Link><button type="button" className="btn btn-primary" onClick={() => navigator.clipboard?.writeText(window.location.href)}>{t.resonance.resultCopy}</button></div>
                <button type="button" className="retake" onClick={() => { setResult(null); setAnswers({}); setCur(0); }}>{t.resonance.resultRetake}</button>
              </div>
            </article>
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}
