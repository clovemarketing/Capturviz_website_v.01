import { getService } from "../../../data/services";
import ServiceLayout from "../../../components/ServiceLayout/ServiceLayout";
import { FloorPlanVisual } from "../../../components/Illustrations/Illustrations";
import "./FloorPlans.css";

export default function FloorPlans() {
  const service = getService("floor-plans");
  return (
    <ServiceLayout service={service}>
      <section className="plans-strip">
        <div className="wrap">
          <div className="panel glass service-note">
            <FloorPlanVisual />
            <div>
              <h2>Plans that match the building</h2>
              <p>Because the plans are drawn from scan data rather than old drawings, walls, openings and room sizes reflect what is actually built today.</p>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
