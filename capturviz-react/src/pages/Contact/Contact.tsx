import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SERVICES } from "../../data/services";
import PageHero from "../../components/PageHero/PageHero";
import "./Contact.css";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT ?? "";

const PROPERTY_TYPES = [
  "Office / commercial", "Industrial / manufacturing", "Healthcare", "Education",
  "Residential", "Retail / hospitality", "Construction site", "Other",
];
const TIMELINES = ["As soon as possible", "Within a month", "1–3 months", "Just planning"];
const SERVICE_OPTIONS = [...SERVICES.map((s) => ({ value: s.slug, label: s.name })), { value: "not-sure", label: "Not sure yet" }];

interface FormState {
  name: string; company: string; email: string; phone: string; location: string;
  propertyType: string; services: string[]; area: string; timeline: string; message: string; consent: boolean;
}
type Field = "name" | "email" | "location" | "propertyType" | "message" | "consent";
type Status = { kind: "idle" | "sending" | "ok" | "error" | "unconfigured"; text?: string };

const EMPTY: FormState = {
  name: "", company: "", email: "", phone: "", location: "", propertyType: "",
  services: [], area: "", timeline: "", message: "", consent: false,
};

const ERRORS: Record<Field, string> = {
  name: "Enter your name.",
  email: "Enter an email address like name@company.com.",
  location: "Enter a city or address.",
  propertyType: "Choose a property type.",
  message: "Tell us a little about the project.",
  consent: "Tick the box so we can reply to you.",
};

function validate(f: FormState): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!f.name.trim()) e.name = ERRORS.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = ERRORS.email;
  if (!f.location.trim()) e.location = ERRORS.location;
  if (!f.propertyType) e.propertyType = ERRORS.propertyType;
  if (!f.message.trim()) e.message = ERRORS.message;
  if (!f.consent) e.consent = ERRORS.consent;
  return e;
}

export default function Contact() {
  usePageMeta({
    title: "Request a Scan | Contact CapturViz",
    description: "Request a 3D scan, Scan-to-BIM model, digital twin or floor plans. Tell CapturViz about your space and get a scope and quote.",
  });

  const [params] = useSearchParams();
  const location = useLocation();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);

  // Pre-fill from ?service= and from the "Tell us about your space" bar
  useEffect(() => {
    const svc = params.get("service");
    const brief = (location.state as { brief?: string } | null)?.brief;
    setForm((f) => ({
      ...f,
      services: svc && !f.services.includes(svc) ? [...f.services, svc] : f.services,
      message: brief && !f.message ? brief : f.message,
    }));
  }, [params, location.state]);

  const set = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as Field]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const toggleService = (value: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(value) ? f.services.filter((s) => s !== value) : [...f.services, value],
    }));

  const onBlur = (key: Field) => () => {
    const e = validate(form);
    setErrors((er) => ({ ...er, [key]: e[key] }));
  };

  const focusStatus = () => setTimeout(() => statusRef.current?.focus(), 0);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      setStatus({ kind: "unconfigured", text: "Your request is complete, but this form is not connected to an inbox yet. Developer: set VITE_FORM_ENDPOINT in your .env file." });
      focusStatus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "ok", text: "Request sent. We’ll review your project details and reply by email to confirm scope and next steps." });
      setForm(EMPTY);
    } catch {
      setStatus({ kind: "error", text: "Your request didn’t send. Check your connection and try again." });
    }
    focusStatus();
  };

  const fieldClass = (k: Field) => `field${errors[k] ? " invalid" : ""}`;
  const err = (k: Field) => errors[k] && <p className="error" id={`e-${k}`}>{errors[k]}</p>;
  const describe = (k: Field, extra?: string) => [extra, errors[k] ? `e-${k}` : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className="contact-page">
      <PageHero
        title="Request a scan"
        lede="Tell us about the space and what you need. We’ll reply with a recommended scope and quote."
        crumbs={[{ label: "Home", to: "/" }, { label: "Request a scan" }]}
        actions={null}
      />

      <section className="section-tight">
        <div className="wrap contact-grid">
          <form className="panel glass contact-form" noValidate onSubmit={onSubmit}>
            <div className="form-grid">
              <div className={fieldClass("name")}>
                <label htmlFor="f-name">Full name <span className="req" aria-hidden="true">*</span></label>
                <input id="f-name" type="text" autoComplete="name" required value={form.name} onChange={set("name")} onBlur={onBlur("name")} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
                {err("name")}
              </div>
              <div className="field">
                <label htmlFor="f-company">Company</label>
                <input id="f-company" type="text" autoComplete="organization" value={form.company} onChange={set("company")} />
              </div>
              <div className={fieldClass("email")}>
                <label htmlFor="f-email">Work email <span className="req" aria-hidden="true">*</span></label>
                <input id="f-email" type="email" autoComplete="email" required value={form.email} onChange={set("email")} onBlur={onBlur("email")} aria-invalid={!!errors.email} aria-describedby={describe("email")} />
                {err("email")}
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone</label>
                <input id="f-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
              </div>
              <div className={fieldClass("location")}>
                <label htmlFor="f-location">Project location <span className="req" aria-hidden="true">*</span></label>
                <input id="f-location" type="text" required value={form.location} onChange={set("location")} onBlur={onBlur("location")} aria-invalid={!!errors.location} aria-describedby={describe("location")} />
                {err("location")}
              </div>
              <div className={fieldClass("propertyType")}>
                <label htmlFor="f-propertyType">Property type <span className="req" aria-hidden="true">*</span></label>
                <select id="f-propertyType" required value={form.propertyType} onChange={set("propertyType")} onBlur={onBlur("propertyType")} aria-invalid={!!errors.propertyType} aria-describedby={describe("propertyType")}>
                  <option value="">Choose one</option>
                  {PROPERTY_TYPES.map((p) => <option key={p}>{p}</option>)}
                </select>
                {err("propertyType")}
              </div>

              <fieldset className="full">
                <legend className="legend">Services needed</legend>
                <div className="checks">
                  {SERVICE_OPTIONS.map((o) => (
                    <label key={o.value} className="check">
                      <input type="checkbox" checked={form.services.includes(o.value)} onChange={() => toggleService(o.value)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <label htmlFor="f-area">Approximate area</label>
                <input id="f-area" type="text" placeholder="e.g. 1,500 m² or 16,000 sq ft" value={form.area} onChange={set("area")} />
              </div>
              <div className="field">
                <label htmlFor="f-timeline">Timeline</label>
                <select id="f-timeline" value={form.timeline} onChange={set("timeline")}>
                  <option value="">Choose one</option>
                  {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className={`${fieldClass("message")} full`}>
                <label htmlFor="f-message">Project details <span className="req" aria-hidden="true">*</span></label>
                <textarea id="f-message" required value={form.message} onChange={set("message")} onBlur={onBlur("message")} aria-invalid={!!errors.message} aria-describedby={describe("message", "h-message")} />
                <p className="hint" id="h-message">What will the data be used for? Mention software, formats or deadlines if you know them.</p>
                {err("message")}
              </div>

              <div className={`${fieldClass("consent")} full`}>
                <label className="check">
                  <input id="f-consent" type="checkbox" required checked={form.consent} onChange={set("consent")} aria-invalid={!!errors.consent} aria-describedby={describe("consent")} />
                  <span>I agree that CapturViz can use these details to respond to my request, as described in the <Link to="/privacy">privacy policy</Link>.</span>
                </label>
                {err("consent")}
              </div>
            </div>

            <div className="actions">
              <button className="btn btn-primary" type="submit" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Sending…" : "Send request"}
              </button>
            </div>
            <p className="hint">Fields marked * are required.</p>
            <div ref={statusRef} tabIndex={-1} role="status" className={`form-status ${status.kind}`}>
              {status.text}
            </div>
          </form>

          <aside className="night panel next-steps">
            <h2>What happens next</h2>
            <ol className="steps">
              <li><div><h3>We review your request</h3><p>and ask any questions about access or scope.</p></div></li>
              <li><div><h3>You get a scope and quote</h3><p>listing deliverables, formats and timeline.</p></div></li>
              <li><div><h3>We book the capture</h3><p>once you approve.</p></div></li>
            </ol>
          </aside>
        </div>
      </section>
    </div>
  );
}
