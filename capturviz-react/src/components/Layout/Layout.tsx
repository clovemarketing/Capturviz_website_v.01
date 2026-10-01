import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <ScrollToTop />
      <Header />
      <main id="main" className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
