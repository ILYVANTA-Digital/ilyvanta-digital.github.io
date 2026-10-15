import Link from "next/link";
import type articles from "@/content/articles.json";
import { Intro } from "./site-shell";
export function InsightArticle({ article: a }: { article: (typeof articles)[number] }) {
  return (
    <>
      <Intro label={`${a.category} / STUDIO NOTES`} title={a.title} description={a.summary} />
      <article className="article-body wrap">
        <p className="byline">
          By <Link href="/about/">Umar Ilyas</Link> · ILYVANTA Digital
        </p>
        <nav className="note" aria-label="In this guide">
          <strong>In this guide</strong>
          <ol>
            {a.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#section-${i + 1}`}>{s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
        {a.sections.map((s, i) => (
          <section key={s.heading} id={`section-${i + 1}`}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        <aside className="note">
          <h2>Questions to take into your next discussion</h2>
          <ul>
            {a.checklist.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </aside>
        {a.sources.length > 0 && (
          <section>
            <h2>Further reading</h2>
            <ul>
              {a.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url}>{s.label} ↗</a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="button-row">
          <Link className="button dark" href={`/services/${a.service}/`}>
            Explore the related service ↗
          </Link>
          <Link className="text-link" href="/insights/">
            All studio notes
          </Link>
        </div>
      </article>
    </>
  );
}
