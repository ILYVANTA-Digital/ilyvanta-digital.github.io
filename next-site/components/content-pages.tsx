import Image from "next/image";
import Link from "next/link";
import services from "@/content/services.json";
import projects from "@/content/projects.json";
import solutions from "@/content/solutions.json";
import { Intro, ProjectCTA, SectionHeading } from "./site-shell";
import { ProjectCard, ProjectGrid } from "./project-card";

export function CaseStudy({ project: p }: { project: (typeof projects)[number] }) {
  return (
    <>
      <Intro label={p.category} title={p.headline} description={p.description} />
      <div className="wrap">
        <div className="case-actions">
          <span className="pill">Self-directed project · {p.original}</span>
          <a className="button dark" href={`/demo/${p.demo}/`}>
            Open interactive sample ↗
          </a>
        </div>
        <figure className="case-image">
          <Image src={p.image} alt={p.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" />
          <figcaption>Concept artwork · explore the working sample using the demo link</figcaption>
        </figure>
        <dl className="case-facts">
          <div>
            <dt>PROJECT</dt>
            <dd>{p.name}</dd>
          </div>
          <div>
            <dt>DESIGNED FOR</dt>
            <dd>{p.audience}</dd>
          </div>
          <div>
            <dt>TECHNOLOGY</dt>
            <dd>{p.stack}</dd>
          </div>
        </dl>
      </div>
      <section className="section wrap case-story">
        <aside>
          <span className="eyebrow">PROJECT NOTES</span>
          <nav aria-label="Case study sections">
            <a href="#challenge">The challenge</a>
            <a href="#decisions">Design decisions</a>
            <a href="#workflow">Try the workflow</a>
            <a href="#scope">Scope & next steps</a>
          </nav>
        </aside>
        <div>
          <section id="challenge">
            <span className="eyebrow">01 / OVERVIEW & CHALLENGE</span>
            <h2>Make the everyday work easier to follow.</h2>
            <p>{p.challenge}</p>
            <h3>Research approach</h3>
            <p>{p.research}</p>
            <h3>The goals</h3>
            <ul>
              {p.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>
          <section id="decisions">
            <span className="eyebrow">02 / ARCHITECTURE & DESIGN</span>
            <h2>The decisions behind the interface.</h2>
            <h3>System architecture</h3>
            <p>{p.architecture}</p>
            <h3>UX decisions</h3>
            <p>{p.ux}</p>
            <h3>UI system</h3>
            <p>{p.ui}</p>
          </section>
        </div>
      </section>
      <section id="workflow" className="workflow-section">
        <div className="wrap">
          <SectionHeading label="03 / IMPORTANT WORKFLOWS" title="Follow it from start to finish.">
            <p>
              These are interactive samples with fictional records. No real transactions are
              processed.
            </p>
          </SectionHeading>
          <div className="workflow-steps">
            {p.steps.map(([title, detail], i) => (
              <div key={title}>
                <span className="process-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            ))}
          </div>
          <div className="try-panel">
            <div>
              <span className="eyebrow">TRY THIS IN THE SAMPLE</span>
              <h3>{p.exercise}</h3>
              <p>Hosted separately · sample data · no real transactions</p>
            </div>
            <a className="button dark" href={`/demo/${p.demo}/`}>
              Explore the dashboard ↗
            </a>
          </div>
        </div>
      </section>
      <section id="scope" className="section wrap case-story">
        <aside>
          <span className="eyebrow">04 / AN HONEST VIEW</span>
        </aside>
        <div>
          <h2>What exists. What comes next.</h2>
          <h3>Implementation & testing</h3>
          <p>{p.tests}</p>
          <h3>Current limitations</h3>
          <p>{p.limits}</p>
          <h3>What we learned</h3>
          <p>{p.lesson}</p>
          <h3>Next iteration</h3>
          <p>{p.next}</p>
          <div className="note">
            <strong>What we would measure</strong>
            <p>{p.metrics}</p>
            <p>These are proposed measures, not achieved client results.</p>
          </div>
        </div>
      </section>
      <ProjectCTA />
    </>
  );
}
export function ServicesPage() {
  return (
    <>
      <Intro
        label="CAPABILITIES"
        title="The right tools for a clearer way forward."
        description="We connect customer-facing design with the systems behind your business. Start with a useful outcome, then choose the work that supports it."
      />
      <section className="wrap section service-grid">
        {services.map((s, i) => (
          <article className="capability-card" key={s.slug}>
            <span className="eyebrow">
              0{i + 1} / {s.name}
            </span>
            <h2>{s.short}</h2>
            <p>{s.description}</p>
            <Link className="text-link" href={`/services/${s.slug}/`}>
              Explore {s.name.toLowerCase()} ↗
            </Link>
          </article>
        ))}
      </section>
      <ProjectCTA />
    </>
  );
}
export function ServicePage({ service: s }: { service: (typeof services)[number] }) {
  const p = projects.find((p) => p.slug === s.project) ?? projects[0];
  return (
    <>
      <Intro label={s.name} title={s.short} description={s.description} />
      <section className="wrap service-detail">
        <div>
          <span className="eyebrow">THE STARTING POINT</span>
          <h2>{s.problem}</h2>
          <p>{s.approach}</p>
          <h3>What to bring to the first discussion</h3>
          <p>{s.inputs}</p>
          <h3>How we would evaluate the work</h3>
          <p>{s.measure}</p>
        </div>
        <aside className="scope-card">
          <span className="eyebrow">A POSSIBLE SCOPE</span>
          <h2>Practical deliverables.</h2>
          <ul>
            {s.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p>{s.boundary}</p>
          <Link className="button dark" href={`/contact/?service=${s.slug}`}>
            Discuss your requirements ↗
          </Link>
        </aside>
      </section>
      <section className="section wrap">
        <SectionHeading label="EXPLORE THE THINKING" title="A related project study.">
          <p>
            A self-directed example of our thinking, with a working sample and transparent
            limitations.
          </p>
        </SectionHeading>
        <div className="related-project">
          <ProjectCard project={p} index={projects.indexOf(p)} />
        </div>
      </section>
      <ProjectCTA />
    </>
  );
}
export function SolutionsPage() {
  return (
    <>
      <Intro
        label="BUSINESS CONTEXT"
        title="Your workflow comes first."
        description="A useful digital product starts with how your business actually works. Explore an approach, then discuss the details that make your situation different."
      />
      <section className="wrap section solution-list">
        {solutions.map((s, i) => (
          <article key={s.slug}>
            <span className="eyebrow">
              0{i + 1} / {s.name}
            </span>
            <h2>{s.headline}</h2>
            <p>{s.situation}</p>
            <Link className="text-link" href={`/solutions/${s.slug}/`}>
              Explore the approach ↗
            </Link>
          </article>
        ))}
      </section>
      <ProjectCTA />
    </>
  );
}
export function SolutionPage({ solution: s }: { solution: (typeof solutions)[number] }) {
  const p = projects.find((p) => p.slug === s.project) ?? projects[0];
  return (
    <>
      <Intro label={s.name} title={s.headline} description={s.situation} />
      <section className="wrap service-detail">
        <div>
          <h2>A practical place to start.</h2>
          <ol className="planning-list">
            {s.plan.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <h3>Scope needs to be explicit</h3>
          <p>{s.boundary}</p>
          <Link className="text-link" href={`/services/${s.service}/`}>
            Explore the relevant capability ↗
          </Link>
        </div>
        <aside className="scope-card">
          <span className="eyebrow">BEFORE WE BUILD</span>
          <h2>The questions worth asking.</h2>
          <ul>
            {s.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <Link className="button dark" href="/contact/">
            Talk about your workflow ↗
          </Link>
        </aside>
      </section>
      <section className="wrap section">
        <SectionHeading label="A WORKFLOW TO EXPLORE" title={p.name}>
          <p>Independent concept, not an industry client claim.</p>
        </SectionHeading>
        <div className="related-project">
          <ProjectCard project={p} index={projects.indexOf(p)} />
        </div>
      </section>
    </>
  );
}
export function WorkPage() {
  return (
    <>
      <Intro
        label="SELECTED WORK / 04"
        title="Open the project. Explore the thinking."
        description="Four self-directed projects with interactive samples. Each study explains the problem, the design decisions, the working scope and what still needs validation."
      />
      <section className="wrap section">
        <ProjectGrid />
      </section>
      <ProjectCTA />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <Intro
        label="THE STUDIO"
        title="Small by design. Direct by nature."
        description="ILYVANTA Digital is an independent digital studio led by Umar Ilyas, based in Pakistan and open to working with businesses internationally."
      />
      <section className="wrap studio-profile">
        <div className="founder-monogram" role="img" aria-label="Umar Ilyas initials">
          UI<span>UMAR ILYAS / FOUNDER</span>
        </div>
        <div>
          <span className="eyebrow">THE PERSON BEHIND THE WORK</span>
          <h2>Design and engineering, in the same conversation.</h2>
          <p>
            I’m interested in the point where a good interface meets a useful system: a guest
            finding the right stay, reception seeing the next task, or a team spending less time
            moving information between tools.
          </p>
          <p>
            The work shown here is self-directed. It demonstrates how I approach real workflow
            problems without presenting prototypes as completed client engagements.
          </p>
          <div className="button-row">
            <a className="text-link" href="https://www.linkedin.com/in/umar-ilyas-700437268/">
              Connect on LinkedIn ↗
            </a>
            <a className="text-link" href="https://github.com/ILYVANTA-Digital">
              Explore GitHub ↗
            </a>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading label="WORKING ACROSS BORDERS" title="Clear communication travels well.">
          <p>
            Available to discuss projects in the US, UK, Canada, Australia, UAE and Europe. These
            are target markets, not claimed office locations or client history.
          </p>
        </SectionHeading>
        <div className="problem-grid">
          {[
            [
              "Written scope",
              "Agree on the deliverables, assumptions and exclusions before work starts.",
            ],
            [
              "Working reviews",
              "Review real pages and workflows at defined checkpoints, not just a final reveal.",
            ],
            [
              "A usable handover",
              "Document the setup, ownership and maintenance responsibilities.",
            ],
          ].map(([t, d]) => (
            <div className="problem-card" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <ProjectCTA />
    </>
  );
}
export function ProcessPage() {
  return (
    <>
      <Intro
        label="THE PROCESS"
        title="From a useful question to a working answer."
        description="Each project has a written scope, concrete review points and clear acceptance criteria. Timing and cost are agreed after the requirements are understood."
      />
      <section className="wrap section process-detail">
        {[
          [
            "01",
            "Understand the problem",
            "Map your audience, current workflow, constraints and the outcome you need. Use fictional or anonymized sample data during discovery.",
            "Output: a brief, priorities, assumptions and the questions still open.",
          ],
          [
            "02",
            "Define & design",
            "Agree on the first complete journey, page structure, key states and visual direction. Review mobile layouts as part of the same design.",
            "Output: reviewed layouts, a scope and acceptance criteria.",
          ],
          [
            "03",
            "Build in reviewable steps",
            "Implement the agreed workflows, validate inputs and test the empty, error and recovery states as well as the happy path.",
            "Output: working previews and a visible list of completed and pending items.",
          ],
          [
            "04",
            "Test & prepare to launch",
            "Check production behavior, accessibility, links, metadata and service integrations. A preview review precedes a production change.",
            "Output: test results, launch requirements and a rollback plan.",
          ],
          [
            "05",
            "Hand over & learn",
            "Document the setup, access ownership and maintenance. Compare observed behavior against the outcomes agreed in the brief.",
            "Output: operating notes and a prioritized next-iteration list.",
          ],
        ].map(([n, t, d, o]) => (
          <article key={n}>
            <span className="process-number">{n}</span>
            <div>
              <h2>{t}</h2>
              <p>{d}</p>
              <p className="note">{o}</p>
            </div>
          </article>
        ))}
      </section>
      <ProjectCTA />
    </>
  );
}
export function InsightsPage() {
  return (
    <>
      <Intro
        label="STUDIO NOTES"
        title="Useful thinking before you build."
        description="Practical notes from ILYVANTA on defining the problem, making sound product decisions and evaluating the result."
      />
      <section className="wrap section">
        <article className="article-card">
          <span className="eyebrow">PROJECT PLANNING · BY UMAR ILYAS</span>
          <h2>How to prepare a useful project brief.</h2>
          <p>
            You don’t need a technical specification to start. You need a clear problem, a few
            examples and a shared way to recognize progress.
          </p>
          <Link className="text-link" href="/insights/prepare-a-project-brief/">
            Read the guide ↗
          </Link>
        </article>
      </section>
    </>
  );
}
export function BriefArticle() {
  return (
    <>
      <Intro
        label="PROJECT PLANNING / STUDIO NOTES"
        title="How to prepare a useful project brief."
        description="Start with the work you want to improve, not a shopping list of technologies. A good brief gives everyone enough context to make sensible decisions."
      />
      <article className="article-body wrap">
        <p className="byline">By Umar Ilyas · ILYVANTA Digital</p>
        {[
          [
            "Describe the problem in one paragraph",
            "Explain what is difficult today, who experiences it and what happens when it goes wrong. “Reception copies bookings from messages into a spreadsheet” is more useful than “we need a dashboard.”",
          ],
          [
            "Show one complete workflow",
            "Describe where a request starts, which people or systems touch it, and what a successful finish looks like. Include a common exception: a cancellation, a duplicate record or an unavailable product. Use fictional examples rather than sharing customer data.",
          ],
          [
            "Separate essential from later",
            "Choose the smallest complete workflow worth releasing. A hotel inquiry website and a live booking engine have different dependencies. Decide which is needed now and which should wait until the foundations are reliable.",
          ],
          [
            "Name the constraints early",
            "List the systems already in use, content you own, internal reviewers, budget range and any fixed dates. If a launch date depends on a payment account, approved copy or a data migration, make that dependency visible.",
          ],
          [
            "Define evidence of success",
            "Choose something observable: a visitor submitting a qualified inquiry, staff finding an unpaid balance or a customer completing an order. Record the current baseline if one exists. Do not invent a percentage improvement before measuring.",
          ],
          [
            "Decide who owns the result",
            "Clarify domain, source-code, provider-account and data ownership. Agree on who updates content, reviews access, monitors failures and pays recurring service costs after handover.",
          ],
        ].map(([t, d]) => (
          <section key={t}>
            <h2>{t}</h2>
            <p>{d}</p>
          </section>
        ))}
        <aside className="note">
          <h2>A starting brief you can use</h2>
          <p>
            We help [audience] do [task]. Today, [problem] happens because [context]. We want
            [observable outcome]. The first version must include [essential scope]. Our constraints
            are [budget, date, systems].
          </p>
        </aside>
        <Link className="button dark" href="/contact/">
          Share your project brief ↗
        </Link>
      </article>
    </>
  );
}
export function SearchPage() {
  return (
    <>
      <Intro
        label="SEARCH & AI VISIBILITY"
        title="Be clear. Be useful. Be easier to understand."
        description="Search visibility starts with accessible pages, useful answers and evidence people can evaluate. No special label or plugin guarantees a ranking or AI citation."
      />
      <section className="wrap article-body">
        <h2>SEO, AEO and GEO: what changes?</h2>
        <p>
          SEO helps a website be discovered and understood in search. AEO focuses on clearly
          answering specific questions. GEO describes efforts to make reliable source material
          useful in generative search experiences. All three depend on accurate, accessible content.
        </p>
        <h2>What we work on</h2>
        <ul>
          <li>Pages that return correctly, have their own canonical URLs and can be crawled.</li>
          <li>
            Service explanations that answer who the work is for, what is included and what evidence
            exists.
          </li>
          <li>
            Consistent organization and author details, descriptive images and truthful structured
            data.
          </li>
          <li>
            Internal links that connect a business problem to a service, a relevant example and a
            contact route.
          </li>
        </ul>
        <h2>What we measure</h2>
        <p>
          Relevant impressions, search queries, qualified visits and inquiries. Search Console and
          analytics must be connected to the actual production property before reporting results.
        </p>
        <h2>What we cannot promise</h2>
        <p>
          First-page rankings, instant indexing or inclusion in Google AI Overviews, ChatGPT or any
          other assistant. Platform decisions and competing content are outside our control.
        </p>
        <Link className="button dark" href="/services/seo-ai-search/">
          Explore the service ↗
        </Link>
      </section>
    </>
  );
}
export function PrivacyPage() {
  return (
    <>
      <Intro
        label="PRIVACY"
        title="Your inquiry deserves care."
        description="This notice explains how ILYVANTA Digital handles information you choose to share when discussing a project."
      />
      <article className="wrap article-body">
        <h2>Who receives your information</h2>
        <p>
          ILYVANTA Digital is an independent studio led by Umar Ilyas in Pakistan. For questions or
          requests about your information, email{" "}
          <a href="mailto:ilyvantadigital@gmail.com">ilyvantadigital@gmail.com</a>.
        </p>
        <h2>What you share</h2>
        <p>
          A project inquiry can include your name, email, company, country, website, requirements,
          budget and timeline. Optional referral details help us understand how you found the
          studio. Do not include passwords, payment details, patient records or other sensitive
          information.
        </p>
        <h2>Why it is used</h2>
        <p>
          We use an inquiry to assess the project and respond to you. Consent to contact you about
          the inquiry is required; it does not subscribe you to marketing.
        </p>
        <h2>Website form and service providers</h2>
        <p>
          When enabled, the form saves inquiries in PostgreSQL and uses Resend to send an agency
          notification and a receipt. Hosting, database and email providers process the information
          needed to operate those services. These providers may process data outside your country.
          If the form is unavailable, you can contact the studio directly by email.
        </p>
        <h2>Abuse protection and retention</h2>
        <p>
          The form uses short-lived, keyed hashes of network and email identifiers for rate
          limiting; raw IP addresses are not stored in the lead table. Hosting providers may
          maintain their own security logs. Inquiry records are intended to be reviewed or removed
          after 180 days unless an active project or another necessary record requires continued
          retention.
        </p>
        <h2>External services and sample projects</h2>
        <p>
          GitHub, LinkedIn, WhatsApp and hosted sample demos have their own data practices. Public
          demos are for fictional data only. They do not process real bookings, patient care or
          payments.
        </p>
        <h2>Analytics</h2>
        <p>
          This development version does not load advertising pixels or Google Analytics. If
          analytics is introduced, this notice and any required consent controls must be updated
          before activation.
        </p>
        <h2>Your choices</h2>
        <p>
          Contact the studio to ask about access, correction or deletion of your inquiry. We may
          need to verify that the request relates to your information. Avoid sending sensitive
          documents as proof.
        </p>
      </article>
    </>
  );
}
