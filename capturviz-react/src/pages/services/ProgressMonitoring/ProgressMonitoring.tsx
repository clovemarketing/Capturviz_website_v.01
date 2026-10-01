import { getService } from "../../../data/services";
import ServiceLayout from "../../../components/ServiceLayout/ServiceLayout";

import "./ProgressMonitoring.css";

export default function ProgressMonitoring() {
  const service = getService("progress-monitoring");
  return (
    <ServiceLayout service={service}>
      <section className="progress-cadence">
        <div className="wrap">
          <div className="section-head"><h2>A typical monitoring cycle</h2></div>
          <ol className="steps">
            <li className="glass"><div><h3>Baseline capture</h3><p>Record the site before works or at the first milestone.</p></div></li>
            <li className="glass"><div><h3>Milestone captures</h3><p>Rescan on the agreed schedule.</p></div></li>
            <li className="glass"><div><h3>Compare and report</h3><p>Highlight what changed, or where work differs from the design.</p></div></li>
          </ol>
        </div>
      </section>
    </ServiceLayout>
  );
}
