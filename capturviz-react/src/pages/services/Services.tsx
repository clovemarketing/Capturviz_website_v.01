import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import PageHero from "../../components/PageHero/PageHero";
import ServiceList from "../../components/ServiceList/ServiceList";
import CtaBand from "../../components/CtaBand/CtaBand";
import "./Services.css";

export default function Services() {
  usePageMeta({
    title: "Reality Capture Services | CapturViz",
    description: "Mobile 3D scanning, Scan-to-BIM, digital twins, floor plans and progress monitoring from CapturViz. One scan, many uses.",
  });

  return (
    <div className="services-page">
      <PageHero
        title="Services"
        lede="One capture can feed several deliverables. Start with what you need now and reuse the same scan data later."
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />
      <section className="section-tight">
        <div className="wrap"><ServiceList /></div>
      </section>
      <section>
        <div className="wrap grid-2">
          <div className="tile glass services-help">
            <h3>Not sure which service you need?</h3>
            <p className="muted">Describe the building and what you’re trying to do. We’ll recommend the lightest scope that gets you there.</p>
            <Link className="btn btn-primary" to="/contact?service=not-sure">Ask for a recommendation</Link>
          </div>
          <div className="tile glass services-help">
            <h3>Already have scan data?</h3>
            <p className="muted">If you hold existing point clouds, tell us the format and source. We’ll confirm whether we can model from them.</p>
            <Link className="btn btn-glass" to="/technology">Check deliverables & formats</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
