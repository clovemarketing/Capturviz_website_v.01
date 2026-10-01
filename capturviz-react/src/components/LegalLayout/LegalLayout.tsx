import { usePageMeta } from "../../hooks/usePageMeta";
import PageHero from "../PageHero/PageHero";
import "./LegalLayout.css";

export interface LegalSection { heading: string; body: string }

interface Props {
  title: string;
  seoTitle: string;
  sections: LegalSection[];
  className?: string;
}

/** Shared shell for Privacy, Terms, Cookies and Accessibility. Pages are noindex until legally reviewed. */
export default function LegalLayout({ title, seoTitle, sections, className = "" }: Props) {
  usePageMeta({ title: `${seoTitle} | CapturViz`, description: `${title} for the CapturViz website.`, noindex: true });

  return (
    <div className={`legal-page ${className}`}>
      <PageHero
        title={title}
        lede="Last updated: to be set on publication."
        crumbs={[{ label: "Home", to: "/" }, { label: title }]}
        actions={null}
      />
      <section className="section-tight">
        <div className="wrap">
          <div className="panel glass legal-prose">
            <div className="legal-note" role="note">
              Draft template. Have this page reviewed by qualified legal counsel and completed with CapturViz’s legal entity details before publishing.
            </div>
            {sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
