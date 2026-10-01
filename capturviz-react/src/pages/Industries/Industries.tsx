import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import { INDUSTRIES } from "../../data/industries";
import { getService } from "../../data/services";
import PageHero from "../../components/PageHero/PageHero";
import Icon from "../../components/Icon/Icon";
import CtaBand from "../../components/CtaBand/CtaBand";
import "./Industries.css";

export default function Industries() {
  usePageMeta({
    title: "Industries We Serve | CapturViz Reality Capture",
    description: "Reality capture for AEC, industrial and manufacturing, commercial real estate and property management, and healthcare and education facilities.",
  });

  return (
    <div className="industries-page">
      <PageHero
        title="Industries"
        lede="Different sectors need different things from the same scan. Here’s how CapturViz supports each one."
        crumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />
      <section className="section-tight">
        <div className="wrap">
          {INDUSTRIES.map((ind) => (
            <article key={ind.id} id={ind.id} className="industry panel glass">
              <div>
                <Icon name={ind.icon} />
                <h2>{ind.name}</h2>
                <p className="muted">{ind.intro}</p>
                <div className="chips">
                  {ind.services.map((slug) => {
                    const s = getService(slug);
                    return <Link key={slug} className="chip" to={s.path}>{s.name}</Link>;
                  })}
                </div>
              </div>
              <div>
                <h3>Where scanning helps</h3>
                <ul className="ticks">{ind.helps.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Working in another sector?" text="If your space can be walked, it can usually be scanned. Tell us what you need and we’ll confirm." />
    </div>
  );
}
