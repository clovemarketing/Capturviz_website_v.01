import { Link } from "react-router-dom";
import { SERVICES } from "../../data/services";
import { COMPANY_LINKS, LEGAL_LINKS } from "../../data/navigation";
import logoFull from "../../assets/logo-full.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot glass">
          <div>
            <img className="foot-logo" src={logoFull} alt="CapturViz" width={150} height={103} />
            <p className="muted">Reality capture for design, construction, property and facility teams.</p>
            <Link className="btn btn-primary" to="/contact">Request a scan</Link>
          </div>
          <div>
            <h3>Services</h3>
            <ul>{SERVICES.map((s) => <li key={s.slug}><Link to={s.path}>{s.name}</Link></li>)}</ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>{COMPANY_LINKS.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>{LEGAL_LINKS.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} CapturViz. All rights reserved.</span>
          <span>Capture reality. Build with confidence.</span>
        </div>
      </div>
    </footer>
  );
}
