import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SERVICES } from "../../data/services";
import { MAIN_NAV } from "../../data/navigation";
import iconUrl from "../../assets/icon.png";
import wordmarkUrl from "../../assets/wordmark.png";
import "./Header.css";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const svcBtnRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const inServices = pathname.startsWith("/services");

  // Close menus on route change
  useEffect(() => {
    setNavOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  // Close services dropdown on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSvcOpen(false);
      svcBtnRef.current?.focus();
    }
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <div className={`bar glass${navOpen ? " is-open" : ""}`}>
            <Link className="brand" to="/" aria-label="CapturViz home">
              <img className="brand-icon" src={iconUrl} alt="" width={34} height={34} />
              <img className="brand-wordmark" src={wordmarkUrl} alt="CapturViz" width={132} height={13} />
            </Link>

            <button
              className="menu-toggle"
              aria-expanded={navOpen}
              aria-controls="site-nav"
              aria-label="Menu"
              onClick={() => setNavOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>

            <nav id="site-nav" className={`nav${navOpen ? " open" : ""}`} aria-label="Main">
              <div className={`has-menu${svcOpen ? " open" : ""}`} ref={menuRef} onKeyDown={onMenuKey}>
                <button
                  ref={svcBtnRef}
                  className={`navlink${inServices ? " active" : ""}`}
                  aria-expanded={svcOpen}
                  aria-controls="svc-menu"
                  onClick={(e) => { e.stopPropagation(); setSvcOpen((v) => !v); }}
                >
                  Services
                </button>
                <div id="svc-menu" className="menu glass">
                  <Link to="/services">All services<small>Compare every service</small></Link>
                  {SERVICES.map((s) => (
                    <Link key={s.slug} to={s.path}>{s.name}<small>{s.short}</small></Link>
                  ))}
                </div>
              </div>
              {MAIN_NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className="navlink">{item.label}</NavLink>
              ))}
              <Link className="btn btn-primary nav-cta" to="/contact">Request a scan</Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
