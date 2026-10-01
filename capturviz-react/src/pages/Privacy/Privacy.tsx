import LegalLayout, { type LegalSection } from "../../components/LegalLayout/LegalLayout";
import "./Privacy.css";

const SECTIONS: LegalSection[] = [
  { heading: "Who we are", body: "[Legal entity name, registered address and contact details to be confirmed.]" },
  { heading: "What we collect", body: "Information you submit through our forms, such as your name, company, email, phone number and project details, and basic technical data needed to run this website." },
  { heading: "How we use it", body: "To respond to enquiries, prepare scopes and quotes, deliver services and meet legal obligations. We do not sell your personal information." },
  { heading: "How long we keep it", body: "[Retention periods to be confirmed.]" },
  { heading: "Your rights", body: "Depending on where you live, you may have rights to access, correct, delete or restrict use of your data. Contact us to make a request." },
  { heading: "Contact", body: "[Privacy contact to be confirmed.]" },
];

export default function Privacy() {
  return <LegalLayout title="Privacy policy" seoTitle="Privacy Policy" sections={SECTIONS} className="privacy-page" />;
}
