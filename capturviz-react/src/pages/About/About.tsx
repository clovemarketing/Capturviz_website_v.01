import { usePageMeta } from "../../hooks/usePageMeta";
import PageHero from "../../components/PageHero/PageHero";
import CtaBand from "../../components/CtaBand/CtaBand";
import showcase from "../../assets/brand-showcase.jpg";
import "./About.css";

const PRINCIPLES = [
  { t: "Accuracy is agreed, not assumed", d: "We set accuracy and detail targets with you before capture and document them with the results." },
  { t: "Deliverables fit your tools", d: "Files are prepared for the software and workflows your team already uses." },
  { t: "Plain communication", d: "Clear scopes, clear timelines and a named contact from enquiry to handover." },
];

export default function About() {
  usePageMeta({
    title: "About CapturViz | Reality Capture for the Built Environment",
    description: "CapturViz helps design, construction, property and facility teams turn physical spaces into accurate, usable digital information.",
  });

  return (
    <div className="about-page">
      <PageHero
        title="About CapturViz"
        lede="We help teams turn physical spaces into clear, usable digital information, so decisions are based on what’s actually there."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />
      <section className="section-tight">
        <div className="wrap grid-3">
          {PRINCIPLES.map((p) => (
            <div key={p.t} className="tile glass"><h3>{p.t}</h3><p className="muted">{p.d}</p></div>
          ))}
        </div>
      </section>
      <section aria-labelledby="brand">
        <div className="wrap">
          <div className="section-head">
            <h2 id="brand">Our mark</h2>
            <p className="lede">The CapturViz mark is a viewfinder: four corners framing a lens. It stands for the moment a real space is captured and made usable.</p>
          </div>
          <figure className="showcase">
            <img
              src={showcase}
              alt="CapturViz logo shown on signage, a mug, a laptop, apparel and business cards, with primary, white, monochrome, stacked and icon-only versions"
              loading="lazy"
              width={1400}
              height={933}
            />
          </figure>
        </div>
      </section>
      <CtaBand title="Work with us" />
    </div>
  );
}
