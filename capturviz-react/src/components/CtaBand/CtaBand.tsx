import { useId, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CtaBand.css";

interface Props { title?: string; text?: string }

export default function CtaBand({
  title = "Tell us about your space",
  text = "Share the building, the size and what you need at the end. We’ll reply with a recommended scope and a quote.",
}: Props) {
  const id = useId();
  const [brief, setBrief] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/contact", { state: { brief: brief.trim() } });
  };

  return (
    <section>
      <div className="wrap">
        <div className="cta-band glass">
          <h2>{title}</h2>
          <p className="lede">{text}</p>
          <form className="ask" onSubmit={onSubmit} aria-label="Start a scan request">
            <label htmlFor={id} className="sr-only">Describe your project</label>
            <input
              id={id}
              type="text"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="e.g. 3-storey office, 2,000 m², need Revit model"
              autoComplete="off"
            />
            <button className="btn btn-primary" type="submit">Start request</button>
          </form>
        </div>
      </div>
    </section>
  );
}
