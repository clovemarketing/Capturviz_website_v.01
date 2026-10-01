import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import MobileScanning from "./pages/services/MobileScanning/MobileScanning";
import ScanToBim from "./pages/services/ScanToBim/ScanToBim";
import DigitalTwins from "./pages/services/DigitalTwins/DigitalTwins";
import FloorPlans from "./pages/services/FloorPlans/FloorPlans";
import ProgressMonitoring from "./pages/services/ProgressMonitoring/ProgressMonitoring";
import Industries from "./pages/Industries/Industries";
import Technology from "./pages/Technology/Technology";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import Cookies from "./pages/Cookies/Cookies";
import Accessibility from "./pages/Accessibility/Accessibility";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/mobile-3d-scanning" element={<MobileScanning />} />
        <Route path="services/scan-to-bim" element={<ScanToBim />} />
        <Route path="services/digital-twins" element={<DigitalTwins />} />
        <Route path="services/floor-plans" element={<FloorPlans />} />
        <Route path="services/progress-monitoring" element={<ProgressMonitoring />} />
        <Route path="industries" element={<Industries />} />
        <Route path="technology" element={<Technology />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="accessibility" element={<Accessibility />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
