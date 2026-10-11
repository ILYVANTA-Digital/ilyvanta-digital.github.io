"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { budgets, serviceOptions } from "@/lib/contact/options";
export function ContactForm({ enabled }: { enabled: boolean }) {
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [id, setId] = useState("");
  useEffect(() => {
    setId(crypto.randomUUID());
  }, []);
  function fieldError(name: string) {
    return errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || sent) return;
    setBusy(true);
    setErrors({});
    setMessage("");
    const data = new FormData(event.currentTarget);
    const query = new URLSearchParams(location.search);
    const payload = {
      ...Object.fromEntries(data),
      services: data.getAll("services"),
      consent: data.get("consent") === "true",
      utmSource: query.get("utm_source") || "",
      utmCampaign: query.get("utm_campaign") || "",
    };
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      setMessage(result.message || "Please contact the studio by email.");
      if (response.ok) {
        setSent(true);
      } else {
        setErrors(result.fields || {});
      }
    } catch {
      setMessage(
        "We could not confirm the submission. Your entries are still here; please email the studio if you are unsure.",
      );
    } finally {
      setBusy(false);
      requestAnimationFrame(() => status.current?.focus());
    }
  }
  return (
    <form
      ref={form}
      className="inquiry-form"
      action="/api/contact/"
      method="post"
      onSubmit={submit}
      aria-label="Project inquiry"
    >
      {!enabled && (
        <div className="form-notice full-width">
          The online inquiry form is being connected. For now, please{" "}
          <a href="mailto:ilyvantadigital@gmail.com">
            <u>email your project brief</u>
          </a>
          . Submitting here will not send an email or save your details yet.
        </div>
      )}
      <p className="form-help full-width">
        Fields marked * are required. Please use fictional examples instead of sending sensitive
        business or customer records.
      </p>
      <input type="hidden" name="submissionId" value={id} />
      <noscript>
        <p className="form-notice full-width">
          Please email your brief to{" "}
          <a href="mailto:ilyvantadigital@gmail.com">ilyvantadigital@gmail.com</a>. The interactive
          form needs JavaScript.
        </p>
      </noscript>
      <label>
        Name *
        <input
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {fieldError("name")}
      </label>
      <label>
        Work email *
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {fieldError("email")}
      </label>
      <label>
        Company <span>(optional)</span>
        <input name="company" autoComplete="organization" maxLength={160} />
      </label>
      <label>
        Website <span>(optional)</span>
        <input
          name="website"
          type="url"
          autoComplete="url"
          placeholder="https://"
          maxLength={500}
          aria-invalid={Boolean(errors.website)}
          aria-describedby={errors.website ? "website-error" : undefined}
        />
        {fieldError("website")}
      </label>
      <label>
        Country *
        <input
          name="country"
          autoComplete="country-name"
          required
          minLength={2}
          maxLength={100}
          aria-invalid={Boolean(errors.country)}
          aria-describedby={errors.country ? "country-error" : undefined}
        />
        {fieldError("country")}
      </label>
      <label>
        Project type *
        <select name="projectType" required defaultValue="">
          <option value="" disabled>
            Select project type
          </option>
          {[
            "New website",
            "Website redesign",
            "Business software",
            "AI workflow",
            "Search visibility",
            "Not sure",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        {fieldError("projectType")}
      </label>
      <label>
        Project stage *
        <select name="stage" required defaultValue="">
          <option value="" disabled>
            Select stage
          </option>
          {["Exploring options", "Ready to plan", "Design exists", "Existing product"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        {fieldError("stage")}
      </label>
      <label>
        Expected budget <span>(USD) *</span>
        <select name="budget" required defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          {budgets.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        {fieldError("budget")}
      </label>
      <label>
        Ideal timeline *
        <select name="timeline" required defaultValue="">
          <option value="" disabled>
            Select timeline
          </option>
          {["Flexible", "Within 1 month", "1–3 months", "3–6 months", "Later"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        {fieldError("timeline")}
      </label>
      <label>
        How did you find us? <span>(optional)</span>
        <input name="source" maxLength={200} />
      </label>
      <label className="full-width">
        What would you like to improve? *
        <textarea
          name="problem"
          required
          minLength={2}
          maxLength={1500}
          placeholder="Tell us what is difficult today and what a useful result would look like."
          aria-invalid={Boolean(errors.problem)}
          aria-describedby={errors.problem ? "problem-error" : undefined}
        />
        {fieldError("problem")}
      </label>
      <fieldset
        className="full-width"
        aria-describedby={errors.services ? "services-error" : undefined}
      >
        <legend>Services you’re considering *</legend>
        <div className="checkbox-grid">
          {serviceOptions.map((s) => (
            <label className="check-label" key={s}>
              <input type="checkbox" name="services" value={s} />
              {s}
            </label>
          ))}
        </div>
        {fieldError("services")}
      </fieldset>
      <label className="full-width">
        Anything else? <span>(optional)</span>
        <textarea name="message" maxLength={3000} />
        {fieldError("message")}
      </label>
      <div className="trap" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="websiteCompany" tabIndex={-1} autoComplete="off" maxLength={200} />
        </label>
      </div>
      <label className="check-label full-width">
        <input type="checkbox" name="consent" value="true" required />
        <span>
          I agree to be contacted about this inquiry and have read the{" "}
          <a href="/privacy/">privacy notice</a>. *
        </span>
      </label>
      <div
        ref={status}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={message ? `full-width form-status ${sent ? "" : "form-error"}` : "full-width"}
      >
        {message}
        {Object.keys(errors).length > 0 && (
          <ul>
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="full-width">
        <button className="button dark" type="submit" disabled={busy || sent || !id}>
          {busy ? "Sending…" : sent ? "Inquiry saved" : "Send project inquiry ↗"}
        </button>
        <p className="form-help" style={{ marginTop: 14 }}>
          This starts a conversation. It does not commit you to a project, price or schedule.
        </p>
      </div>
    </form>
  );
}
