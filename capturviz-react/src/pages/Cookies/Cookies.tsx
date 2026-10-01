import LegalLayout, { type LegalSection } from "../../components/LegalLayout/LegalLayout";
import "./Cookies.css";

const SECTIONS: LegalSection[] = [
  { heading: "What cookies are", body: "Cookies are small files stored by your browser that help websites work and understand how they are used." },
  { heading: "Cookies we use", body: "[List the essential, analytics and any marketing cookies in use. Non-essential cookies should only be set after consent where the law requires it.]" },
  { heading: "Managing cookies", body: "You can change cookie settings in your browser at any time." },
];

export default function Cookies() {
  return <LegalLayout title="Cookie policy" seoTitle="Cookie Policy" sections={SECTIONS} className="cookies-page" />;
}
