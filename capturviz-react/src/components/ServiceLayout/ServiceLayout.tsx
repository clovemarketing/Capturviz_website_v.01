import { Link } from "react-router-dom";
import type { Service } from "../../data/services";
import { usePageMeta } from "../../hooks/usePageMeta";
import PageHero from "../PageHero/PageHero";
import Icon from "../Icon/Icon";
import Faq from "../Faq/Faq";
import ServiceList from "../ServiceList/ServiceList";
import CtaBand from "../CtaBand/CtaBand";
import "./ServiceLayout.css";

/** Shared structure for every service detail page. Each page passes its own data and can add extra sections. */
export default function ServiceLayout({ service, children }: { service: Service; children?: React.ReactNode }) {
  usePageMeta({ title: service.seoTitle, description: service.seoDescription });

  return (
    <div className={`service-page service-${service.slug}`}>
      <PageHero
        title={service.name}
        lede={service.lede}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.name }]}
        actions={
          <>
            <Link className="btn btn-primary" to={`/contact?service=${service.slug}`}>Request this service</Link>
            <Link className="btn btn-glass" to="/technology">Deliverables & formats</Link>
          </>
        }
      />

      <section className="section-tight">
        <div className="wrap grid-3">
          <div className="tile glass">
            <Icon name={service.icon} />
            <h3>What it’s for</h3>
            <ul className="ticks">{service.uses.map((u) => <li key={u}>{u}</li>)}</ul>
          </div>
          <div className="tile glass">
            <Icon name="plan" />
            <h3>What you receive</h3>
            <ul className="ticks">{service.receive.map((r) => <li key={r}>{r}</li>)}</ul>
            <p className="hint">File formats and detail level are confirmed in your scope.</p>
          </div>
          <div className="tile glass">
            <Icon name="build" />
            <h3>A good fit when</h3>
            <ul className="ticks">{service.fit.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>
      </section>

      {children}

      <section>
        <div className="wrap">
          <div className="section-head"><h2>Questions</h2></div>
          <Faq items={service.faq} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head"><h2>Related services</h2></div>
          <ServiceList exclude={service.slug} />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
