import { getService } from "../../../data/services";
import ServiceLayout from "../../../components/ServiceLayout/ServiceLayout";
import { SiteScanVisual } from "../../../components/Illustrations/Illustrations";
import "./MobileScanning.css";

export default function MobileScanning() {
  const service = getService("mobile-3d-scanning");
  return (
    <ServiceLayout service={service}>
      <section className="mobile-scan-strip">
        <div className="wrap">
          <div className="panel glass service-note">
            <SiteScanVisual />
            <div>
              <h2>Points and pictures in one pass</h2>
              <p>Mobile capture records 3D spatial data and panoramic imagery together, so the same visit supports measurement, modeling and visual inspection.</p>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
