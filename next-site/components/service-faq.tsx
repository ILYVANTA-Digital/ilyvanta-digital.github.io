import questions from "@/content/service-faqs.json";
import { SectionHeading } from "./site-shell";
export function ServiceFAQ({ slug }: { slug: string }) {
  const items = questions[slug as keyof typeof questions];
  if (!items) return null;
  return (
    <section className="section wrap service-questions">
      <SectionHeading label="BEFORE YOU DECIDE" title="The questions worth answering." />
      <div>
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
