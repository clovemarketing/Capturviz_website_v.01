import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import { INDUSTRIES } from "../../data/industries";
import PointCloud from "../../components/PointCloud/PointCloud";
import ServiceList from "../../components/ServiceList/ServiceList";
import CtaBand from "../../components/CtaBand/CtaBand";
import Icon from "../../components/Icon/Icon";
import { SiteScanVisual, FloorPlanVisual } from "../../components/Illustrations/Illustrations";
import "./Home.css";

const STEPS = [
  { t: "Scope", d: "Tell us about the space and the outcome you need." },
  { t: "Capture", d: "We scan on site with mobile equipment." },
  { t: "Process", d: "Data is registered, cleaned and checked." },
  { t: "Model", d: "We produce the models, plans or twin you ordered." },
  { t: "Deliver", d: "You receive the files and a handover summary." },
];

export default function Home() {
  usePageMeta({
    title: "CapturViz Reality Capture | Mobile 3D Scanning & Scan-to-BIM",
    description:
      "CapturViz turns buildings and sites into point clouds, BIM models, digital twins and floor plans your design, construction and facility teams can use.",
  });

  return (
    <div className="home">
      {/* Hero: the logo's viewfinder framing a live point-cloud scan */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="frame">
            <PointCloud />
            <span className="corner tl" aria-hidden="true" />
            <span className="corner tr" aria-hidden="true" />
            <span className="corner bl" aria-hidden="true" />
            <span className="corner br" aria-hidden="true" />
            <div className="hero-copy glass">
              <h1 id="hero-title">Capture reality. Build with confidence.</h1>
              <p className="lede">
                We turn physical spaces into clear, usable digital information for design, construction, property and facility teams.
              </p>
              <div className="actions">
                <Link className="btn btn-primary" to="/contact">Request a scan</Link>
                <Link className="btn btn-glass" to="/services">Explore services</Link>
              </div>
              <div className="chips" aria-label="Popular services">
                <Link className="chip" to="/services/mobile-3d-scanning">Mobile 3D scanning</Link>
                <Link className="chip" to="/services/scan-to-bim">Scan-to-BIM</Link>
                <Link className="chip" to="/services/digital-twins">Digital twins</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="svc-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="svc-title">From a site walk to the files your team works in</h2>
            <p className="lede">
              Choose one service or combine them. Every project starts with an agreed scope, so you know what you’ll receive before we capture anything.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      <section aria-labelledby="why-title">
        <div className="wrap">
          <h2 id="why-title" className="section-head">Why teams start with a scan</h2>
          <div className="split">
            <div className="split-main panel glass">
              <SiteScanVisual />
              <div>
                <h3>Existing conditions you can measure</h3>
                <p>Drawings go out of date. A scan records the space as it stands today, so designers and contractors work from the same reference instead of assumptions.</p>
                <p className="muted">Capture combines 3D spatial data with panoramic imagery, so you can measure and also see what’s there.</p>
              </div>
            </div>
            <div className="split-aside">
              <p>See every capture method, processing step and deliverable in one place.</p>
              <Link className="btn btn-glass" to="/technology">Technology & deliverables</Link>
            </div>
          </div>

          <div className="split rev home-split-gap">
            <div className="split-main night panel">
              <div>
                <h3>Made for the people who use the data</h3>
                <p>Architects, engineers, contractors, owners and facility managers each need something different from the same building. We shape the deliverable around how your team will use it.</p>
                <div className="actions"><Link className="btn btn-glass" to="/industries">Industries we serve</Link></div>
              </div>
              <FloorPlanVisual />
            </div>
            <div className="split-aside">
              <p>Planning a project? Request a scan online and we’ll come back with a scope.</p>
              <Link className="btn btn-glass" to="/contact">Request a scan</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ind-title">
        <div className="wrap">
          <div className="section-head"><h2 id="ind-title">Sectors we work in</h2></div>
          <div className="grid-2">
            {INDUSTRIES.map((ind) => (
              <Link key={ind.id} className="tile glass" to={`/industries#${ind.id}`}>
                <Icon name={ind.icon} />
                <h3>{ind.name}</h3>
                <p className="muted">{ind.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="how-title">How a project runs</h2>
            <p className="lede">Five stages, with the scope and deliverables agreed before anyone arrives on site.</p>
          </div>
          <ol className="steps inline">
            {STEPS.map((s) => (
              <li key={s.t} className="glass"><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
            ))}
          </ol>
          <div className="actions"><Link className="btn btn-glass" to="/how-it-works">Read the full process</Link></div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
