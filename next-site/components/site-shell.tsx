import Link from "next/link";
import { contactEmail } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow">THE NEXT USEFUL THING</span>
          <h2>
            Good work starts
            <br />
            with a conversation.
          </h2>
          <Link className="button mint" href="/contact/">
            Tell us what you’re thinking <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">DIRECT TO THE STUDIO</span>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <p>
            Based in Pakistan.
            <br />
            Open to working across time zones.
          </p>
          <div className="social-links">
            <a href="https://github.com/ILYVANTA-Digital">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/umar-ilyas-700437268/">LinkedIn ↗</a>
            <a href="https://wa.me/923195753848">WhatsApp ↗</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ILYVANTA Digital</span>
        <span>Independent studio · Led by Umar Ilyas</span>
        <Link href="/privacy/">Privacy</Link>
      </div>
    </footer>
  );
}
export function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      {children && <div className="section-description">{children}</div>}
    </div>
  );
}
export function Intro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro wrap">
      <div className="breadcrumbs">
        <Link href="/">Studio</Link>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </div>
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </section>
  );
}
export function ProjectCTA() {
  return (
    <aside className="project-cta wrap">
      <div>
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <h2>
          What could work better
          <br />
          in your business?
        </h2>
      </div>
      <Link className="button dark" href="/contact/">
        Start a project <span aria-hidden="true">↗</span>
      </Link>
    </aside>
  );
}
