import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import "./NotFound.css";

export default function NotFound() {
  usePageMeta({ title: "Page not found | CapturViz", description: "This page doesn’t exist.", noindex: true });
  return (
    <section className="not-found">
      <div className="wrap">
        <div className="panel glass not-found-panel">
          <span className="nf-frame" aria-hidden="true"><span /></span>
          <h1>This page isn’t in frame</h1>
          <p className="lede">The link may be old or mistyped. Head back home or go straight to a scan request.</p>
          <div className="actions">
            <Link className="btn btn-primary" to="/">Go to home</Link>
            <Link className="btn btn-glass" to="/contact">Request a scan</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
