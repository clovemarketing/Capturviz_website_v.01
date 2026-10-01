import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top (or to #hash) on route change and moves focus to the page heading for screen readers. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
    const h1 = document.querySelector<HTMLHeadingElement>("main h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return null;
}
