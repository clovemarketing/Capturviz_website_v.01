import { getService } from "../../../data/services";
import ServiceLayout from "../../../components/ServiceLayout/ServiceLayout";

import "./DigitalTwins.css";

export default function DigitalTwins() {
  const service = getService("digital-twins");
  return (
    <ServiceLayout service={service}>
      <section className="twin-compare">
        <div className="wrap grid-2">
          <div className="tile glass"><h3>Digital twin</h3><p className="muted">The space as captured: navigable, measurable and visual. Best for walkthroughs, reference and remote review.</p></div>
          <div className="tile glass"><h3>BIM model</h3><p className="muted">An object-based model built from the scan. Best for design, coordination and asset data.</p></div>
        </div>
      </section>
    </ServiceLayout>
  );
}
