import LegalLayout, { type LegalSection } from "../../components/LegalLayout/LegalLayout";
import "./Terms.css";

const SECTIONS: LegalSection[] = [
  { heading: "Using this website", body: "Content on this site is provided for general information about CapturViz services and may change without notice." },
  { heading: "Services", body: "Project work is governed by the scope, quote and agreement issued for each project, not by this page." },
  { heading: "Intellectual property", body: "The CapturViz name, logo and website content belong to their respective owners and may not be reused without permission." },
  { heading: "Liability", body: "[Limitation of liability wording to be provided by legal counsel.]" },
  { heading: "Governing law", body: "[Jurisdiction to be confirmed.]" },
];

export default function Terms() {
  return <LegalLayout title="Terms of use" seoTitle="Terms of Use" sections={SECTIONS} className="terms-page" />;
}
