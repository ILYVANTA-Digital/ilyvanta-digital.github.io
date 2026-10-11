import Image from "next/image";
import Link from "next/link";
import services from "@/content/services.json";
import solutions from "@/content/solutions.json";
import { ProjectGrid } from "./project-card";
import { SectionHeading } from "./site-shell";
export function Homepage() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner wrap">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" /> INDEPENDENT DIGITAL STUDIO
            </span>
            <h1>
              Thoughtful design.
              <br />
              Useful systems.
              <br />
              <em>Real possibility.</em>
            </h1>
            <p>
              We build websites, business software and AI workflows that make your next stage
              easier.
            </p>
            <div className="button-row">
              <Link className="button mint" href="/contact/">
                Start a project <span aria-hidden="true">↗</span>
              </Link>
              <Link className="hero-secondary" href="/work/">
                Explore our work <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <Image
              src="/assets/brand-sculpture.webp"
              alt="Interwoven teal glass and brushed-metal sculpture representing connected systems"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 55vw"
            />
            <div className="art-caption">
              <span>FORM / FUNCTION / CONNECTION</span>
              <span>ILYVANTA — 01</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom wrap">
          <span>WEB EXPERIENCES</span>
          <span>BUSINESS SOFTWARE</span>
          <span>AI & AUTOMATION</span>
          <span>WORKING INTERNATIONALLY ↗</span>
        </div>
      </section>
      <section className="section wrap">
        <SectionHeading
          label="01 / A BETTER WAY FORWARD"
          title="Start with the work that needs to work better."
        >
          <p>
            A website should explain your value. A system should remove friction. We connect the two
            around a clear business problem.
          </p>
        </SectionHeading>
        <div className="problem-grid">
          {[
            [
              "01",
              "Your website isn’t doing you justice.",
              "Help the right people understand your offer and take a confident next step.",
              "web-design-development",
            ],
            [
              "02",
              "Your team is doing the same work twice.",
              "Connect records, approvals and everyday handoffs in one practical workflow.",
              "custom-business-software",
            ],
            [
              "03",
              "You see the potential of AI. Now what?",
              "Find a useful starting point, test it carefully and keep people in control.",
              "ai-automation",
            ],
          ].map(([n, t, d, s]) => (
            <Link className="problem-card" href={`/services/${s}/`} key={n}>
              <span className="card-number">
                {n} <span aria-hidden="true">↗</span>
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="work-section section" id="work">
        <div className="wrap">
          <SectionHeading label="02 / SELECTED WORK — 04" title="Ideas you can explore.">
            <p>
              Four independent projects. Real sample workflows, explained decisions and an honest
              view of what’s ready.
            </p>
            <Link className="text-link" href="/work/">
              Explore all project studies ↗
            </Link>
          </SectionHeading>
          <ProjectGrid />
        </div>
      </section>
      <section className="section wrap">
        <SectionHeading
          label="03 / WHAT WE BRING"
          title="One clear direction. The right capabilities."
        >
          <p>
            From the first customer touchpoint to the systems behind it. Scope the work you need,
            without a stack you don’t.
          </p>
        </SectionHeading>
        <div className="service-list">
          {services.map((s, i) => (
            <Link href={`/services/${s.slug}/`} className="service-row" key={s.slug}>
              <span className="service-number">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.short}</p>
              <span className="round-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="systems-section">
        <div className="wrap systems-grid">
          <div>
            <span className="eyebrow">04 / BUILT AROUND YOUR DAY</span>
            <h2>
              Good software
              <br />
              makes the next
              <br />
              <em>step clearer.</em>
            </h2>
            <p>
              Give reception a shared view. Turn a message into a confirmed order. Make the handoff
              visible.
            </p>
            <Link className="button mint" href="/solutions/">
              Find your business workflow ↗
            </Link>
          </div>
          <div className="workflow-board">
            <div className="board-title">
              <span>THE CONNECTED WORKFLOW</span>
              <span className="sample-label">Illustration</span>
            </div>
            {[
              ["01", "A request comes in", "Website · customer · team"],
              ["02", "The right context is gathered", "Records · rules · human review"],
              ["03", "Work reaches the right person", "Assigned action · visible status"],
              ["04", "A clear outcome is recorded", "Confirmation · report · next step"],
            ].map(([n, t, d]) => (
              <div className="workflow-row" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
                <span aria-hidden="true">{n === "04" ? "✓" : "↓"}</span>
              </div>
            ))}
            <div className="board-foot">A system people can understand, use and maintain.</div>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <SectionHeading label="05 / HOW WE WORK" title="Clear decisions. No black box.">
          <Link className="text-link" href="/process/">
            See the complete process ↗
          </Link>
        </SectionHeading>
        <div className="process-grid">
          {[
            [
              "01",
              "Understand",
              "Map your audience, everyday friction and what a useful result looks like.",
            ],
            ["02", "Design", "Make the structure and key interactions concrete before building."],
            [
              "03",
              "Build & review",
              "Implement the agreed scope and review working versions together.",
            ],
            [
              "04",
              "Launch & hand over",
              "Check the complete journey and document how to run what we built.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span className="process-number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="studio-band">
        <div className="wrap studio-grid">
          <span className="eyebrow">
            A SMALL STUDIO.
            <br />A DIRECT CONVERSATION.
          </span>
          <div>
            <h2>
              Meet the person
              <br />
              behind the work.
            </h2>
            <p>
              ILYVANTA Digital is led by Umar Ilyas in Pakistan. You work directly with the person
              shaping the project, with clear scope, review points and an honest explanation of the
              trade-offs.
            </p>
            <Link className="text-link" href="/about/">
              About the studio ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <SectionHeading
          label="06 / YOUR BUSINESS, IN CONTEXT"
          title="Different industries. Specific challenges."
        >
          <p>
            We start with your workflow and constraints. These are areas we’re exploring and
            available to discuss, not a list of claimed client engagements.
          </p>
        </SectionHeading>
        <div className="industry-links">
          {solutions.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}/`}>
              {s.name}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
