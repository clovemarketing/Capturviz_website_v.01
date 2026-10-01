import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import PageHero from "../../components/PageHero/PageHero";
import CtaBand from "../../components/CtaBand/CtaBand";
import "./Projects.css";

/**
 * CMS-ready case study shape. Add entries only with client approval —
 * never invent clients, locations, sizes, testimonials or results.
 */
export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  challenge: string;
  scope: string;
  deliverables: string;
  outcome: string;
  image?: string;
}

const CASE_STUDIES: CaseStudy[] = [];

const TEMPLATE_FIELDS: [string, string][] = [
  ["Sector", "Industry the project belongs to"],
  ["Challenge", "What the client needed to solve"],
  ["Scope", "Area captured and services used"],
  ["Deliverables", "What was handed over, and in which formats"],
  ["Outcome", "What the client could do with the data"],
];

export default function Projects() {
  usePageMeta({
    title: "Projects & Case Studies | CapturViz Reality Capture",
    description: "Reality capture case studies from CapturViz: the challenge, scope, deliverables and results of each project.",
  });

  return (
    <div className="projects-page">
      <PageHero
        title="Projects"
        lede="Case studies will appear here as projects are approved for publication."
        crumbs={[{ label: "Home", to: "/" }, { label: "Projects" }]}
        actions={null}
      />
      <section className="section-tight">
        <div className="wrap">
          {CASE_STUDIES.length === 0 ? (
            <>
              <div className="section-head">
                <h2>Case studies are on the way</h2>
                <p className="lede">We only publish projects with client approval. In the meantime, we’re happy to talk through work similar to yours.</p>
                <div className="actions"><Link className="btn btn-primary" to="/contact">Discuss your project</Link></div>
              </div>
              <div className="case glass" aria-label="Case study layout preview">
                <div className="case-media"><p>Project imagery<br /><span className="hint">Scan view, model or before-and-after</span></p></div>
                <dl>
                  {TEMPLATE_FIELDS.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
                </dl>
              </div>
            </>
          ) : (
            <div className="case-list">
              {CASE_STUDIES.map((c) => (
                <article key={c.slug} className="case glass">
                  <div className="case-media">{c.image ? <img src={c.image} alt="" /> : null}</div>
                  <dl>
                    <div><dt>Project</dt><dd>{c.title}</dd></div>
                    <div><dt>Sector</dt><dd>{c.sector}</dd></div>
                    <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                    <div><dt>Scope</dt><dd>{c.scope}</dd></div>
                    <div><dt>Deliverables</dt><dd>{c.deliverables}</dd></div>
                    <div><dt>Outcome</dt><dd>{c.outcome}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
