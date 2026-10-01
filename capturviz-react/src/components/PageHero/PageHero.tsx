import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./PageHero.css";

export interface Crumb { label: string; to?: string }

interface Props {
  title: string;
  lede: string;
  crumbs: Crumb[];
  /** Default actions: Request a scan + See how it works. Pass `null` to hide, or custom nodes. */
  actions?: ReactNode | null;
}

const DOMAIN = "https://capturviz.com";

export default function PageHero({ title, lede, crumbs, actions }: Props) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${DOMAIN}${c.to ?? (typeof window !== "undefined" ? window.location.pathname : "")}`,
    })),
  };

  const defaultActions = (
    <>
      <Link className="btn btn-primary" to="/contact">Request a scan</Link>
      <Link className="btn btn-glass" to="/how-it-works">See how it works</Link>
    </>
  );
  const shown = actions === undefined ? defaultActions : actions;

  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="panel glass page-hero-panel">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
          {shown && <div className="actions">{shown}</div>}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}
