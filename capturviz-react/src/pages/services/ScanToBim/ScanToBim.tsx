import { getService } from "../../../data/services";
import ServiceLayout from "../../../components/ServiceLayout/ServiceLayout";

import "./ScanToBim.css";

export default function ScanToBim() {
  const service = getService("scan-to-bim");
  return (
    <ServiceLayout service={service}>
      <section className="bim-scope">
        <div className="wrap">
          <div className="night panel">
            <h2>Agree the model before we build it</h2>
            <p>Every Scan-to-BIM project comes with a scope sheet: which elements are modeled, to what level of detail, in which platform and version. You sign it off before modeling starts, so there are no surprises at handover.</p>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
