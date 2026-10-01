import { Link } from "react-router-dom";
import { SERVICES, type ServiceSlug } from "../../data/services";
import Icon from "../Icon/Icon";
import "./ServiceList.css";

export default function ServiceList({ exclude }: { exclude?: ServiceSlug }) {
  return (
    <div className="svc-list">
      {SERVICES.filter((s) => s.slug !== exclude).map((s) => (
        <Link key={s.slug} className="svc glass" to={s.path}>
          <Icon name={s.icon} />
          <span>
            <h3>{s.name}</h3>
            <p>{s.short}</p>
          </span>
          <span className="svc-go">View service</span>
        </Link>
      ))}
    </div>
  );
}
