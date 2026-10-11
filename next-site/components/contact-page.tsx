import { contactConfigured } from "@/lib/contact/store";
import { ContactForm } from "./contact-form";
import { Intro } from "./site-shell";
export function ContactPage() {
  return (
    <>
      <Intro
        label="START A CONVERSATION"
        title="What are you working towards?"
        description="Tell us about the problem, the people involved and what you want to improve. A clear starting point is more useful than a perfect specification."
      />
      <section className="wrap contact-layout">
        <aside className="contact-aside">
          <span className="eyebrow">DIRECT TO UMAR</span>
          <h2>
            Let’s find a useful
            <br />
            place to start.
          </h2>
          <p>
            Not sure which service fits? Describe the challenge. We can discuss the right next step
            before defining a scope.
          </p>
          <a className="text-link" href="mailto:ilyvantadigital@gmail.com">
            ilyvantadigital@gmail.com ↗
          </a>
          <div className="note">
            <strong>What happens next?</strong>
            <p>
              We review your brief, clarify the unknowns and discuss whether there’s a good fit.
              Pricing and timing follow an agreed scope.
            </p>
          </div>
          <a className="text-link" href="https://wa.me/923195753848">
            Prefer WhatsApp? ↗
          </a>
        </aside>
        <ContactForm enabled={contactConfigured()} />
      </section>
    </>
  );
}
