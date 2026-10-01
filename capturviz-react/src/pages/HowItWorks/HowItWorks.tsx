import { usePageMeta } from "../../hooks/usePageMeta";
import PageHero from "../../components/PageHero/PageHero";
import Faq from "../../components/Faq/Faq";
import CtaBand from "../../components/CtaBand/CtaBand";
import "./HowItWorks.css";

const STEPS = [
  { t: "Tell us about the project", d: "Share the location, building type, approximate area, access constraints and what you need at the end. Existing drawings help." },
  { t: "Agree the scope and quote", d: "We confirm the area to capture, deliverables, formats, detail level, accuracy target and timeline in writing." },
  { t: "Plan the site visit", d: "We arrange access, timing and any site safety requirements, working around occupants where needed." },
  { t: "Capture on site", d: "We scan the agreed areas with mobile equipment and check coverage before we leave." },
  { t: "Process and produce", d: "Data is registered and cleaned, then we build the models, drawings, twin or comparisons in scope and check them." },
  { t: "Deliver and support", d: "You receive the files with a handover summary. We answer questions as your team starts using the data." },
];

const FAQ = [
  { q: "How quickly can you deliver?", a: "Turnaround depends on area, complexity and deliverables. Your quote includes a timeline, and we’ll tell you up front if a deadline is tight." },
  { q: "Where do you work?", a: "Include the project location in your request and we’ll confirm coverage and any travel costs." },
  { q: "What do you need from us?", a: "Site access, a contact on the day, any safety requirements, and existing drawings or models if you have them." },
  { q: "Can we add deliverables later?", a: "Yes. Scan data can often be reused for new deliverables, such as adding a BIM model after an initial floor plan." },
];

export default function HowItWorks() {
  usePageMeta({
    title: "How It Works | CapturViz Reality Capture Process",
    description: "The CapturViz process from first enquiry to delivered files: scope, site capture, processing, modeling and handover.",
  });

  return (
    <div className="how-page">
      <PageHero
        title="How it works"
        lede="A clear process from first message to delivered files, with scope agreed before we arrive."
        crumbs={[{ label: "Home", to: "/" }, { label: "How it works" }]}
        actions={null}
      />
      <section className="section-tight">
        <div className="wrap">
          <ol className="steps how-steps">
            {STEPS.map((s) => (
              <li key={s.t} className="glass"><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="section-head"><h2>Common questions</h2></div>
          <Faq items={FAQ} />
        </div>
      </section>
      <CtaBand title="Ready to start?" />
    </div>
  );
}
