import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import PageHero from "../../components/PageHero/PageHero";
import Icon from "../../components/Icon/Icon";
import CtaBand from "../../components/CtaBand/CtaBand";
import { SiteScanVisual } from "../../components/Illustrations/Illustrations";
import "./Technology.css";

const STAGES = [
  { icon: "scan" as const, t: "Capture", d: "Mobile scanning records millions of 3D points as we move through the space, together with panoramic imagery. Mobile capture covers large and complex areas efficiently." },
  { icon: "twin" as const, t: "Processing", d: "Scans are registered into a single coordinate system, cleaned of noise and checked for coverage against the agreed scope." },
  { icon: "bim" as const, t: "Production", d: "From the processed data we build the models, drawings, twins or comparisons in your scope, then check them before handover." },
];

/** Formats are typical options only — confirm per project (see handoff: “unverified until CapturViz confirms”). */
const DELIVERABLES = [
  { d: "Point cloud", use: "Base data for modeling, measurement and coordination", formats: ["E57", "RCP/RCS", "LAS"] },
  { d: "Panoramic imagery", use: "Visual context and remote inspection", formats: ["JPG"], note: "or web viewer" },
  { d: "BIM model", use: "Design, coordination and asset records", formats: ["RVT", "IFC"] },
  { d: "2D drawings & floor plans", use: "Leasing, planning, fit-out and records", formats: ["DWG", "PDF"] },
  { d: "Digital twin", use: "Remote walkthroughs and shared reference", formats: [], note: "Hosted link" },
  { d: "Comparison outputs", use: "Progress tracking and design verification", formats: ["PDF"], note: "report, plus model or cloud overlays" },
];

export default function Technology() {
  usePageMeta({
    title: "Technology & Deliverables | CapturViz Reality Capture",
    description: "How CapturViz captures, processes and delivers reality data: point clouds, panoramic imagery, BIM models, drawings and digital twins.",
  });

  return (
    <div className="technology-page">
      <PageHero
        title="Technology & deliverables"
        lede="What we capture, how it’s processed and what you can receive at the end."
        crumbs={[{ label: "Home", to: "/" }, { label: "Technology & deliverables" }]}
      />

      <section className="section-tight">
        <div className="wrap grid-3">
          {STAGES.map((s) => (
            <div key={s.t} className="tile glass"><Icon name={s.icon} /><h3>{s.t}</h3><p className="muted">{s.d}</p></div>
          ))}
        </div>
      </section>

      <section aria-labelledby="matrix">
        <div className="wrap">
          <div className="section-head">
            <h2 id="matrix">Deliverables</h2>
            <p className="lede">Typical formats are shown below. Final formats, versions and detail levels are confirmed for each project during scoping.</p>
          </div>
          <div className="table-wrap glass">
            <table className="deliverables">
              <thead>
                <tr><th scope="col">Deliverable</th><th scope="col">Typical use</th><th scope="col">Typical formats</th></tr>
              </thead>
              <tbody>
                {DELIVERABLES.map((row) => (
                  <tr key={row.d}>
                    <td>{row.d}</td>
                    <td>{row.use}</td>
                    <td>
                      {row.formats.map((f) => <code key={f}>{f}</code>)}
                      {row.note && <span> {row.note}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div className="split-main panel glass">
            <SiteScanVisual />
            <div>
              <h3>Built to open in your tools</h3>
              <p>Point cloud formats such as E57 are widely supported by design and BIM software, and our Scan-to-BIM models are built for Revit and other leading BIM platforms. Tell us your software and version so we can match it.</p>
            </div>
          </div>
          <div className="split-aside">
            <p>Need a specific format or standard?</p>
            <Link className="btn btn-glass" to="/contact">Ask during scoping</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head"><h2>Accuracy, stated plainly</h2></div>
          <div className="panel glass">
            <p>Accuracy depends on the equipment, the environment and what the data is for. Rather than promising a single figure for every job, we agree an accuracy target with you before capture and record it with the delivered data.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
