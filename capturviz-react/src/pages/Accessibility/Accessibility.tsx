import LegalLayout, { type LegalSection } from "../../components/LegalLayout/LegalLayout";
import "./Accessibility.css";

const SECTIONS: LegalSection[] = [
  { heading: "Our commitment", body: "We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA." },
  { heading: "What we have done", body: "Keyboard navigation, visible focus states, labelled form fields, semantic headings, sufficient colour contrast and reduced-motion support." },
  { heading: "Known limitations", body: "[Record any known issues after an accessibility audit.]" },
  { heading: "Feedback", body: "If anything on this site is hard to use, tell us through the request form and we will respond." },
];

export default function Accessibility() {
  return <LegalLayout title="Accessibility statement" seoTitle="Accessibility Statement" sections={SECTIONS} className="accessibility-page" />;
}
