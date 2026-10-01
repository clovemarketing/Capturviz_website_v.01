export type IconName = "scan" | "bim" | "twin" | "plan" | "progress" | "build" | "factory" | "property" | "care";

const PATHS: Record<IconName, JSX.Element> = {
  scan: (
    <>
      <path className="accent" d="M4 10V7a3 3 0 0 1 3-3h3M22 4h3a3 3 0 0 1 3 3v3M28 22v3a3 3 0 0 1-3 3h-3M10 28H7a3 3 0 0 1-3-3v-3" />
      <circle cx="16" cy="16" r="5.5" />
    </>
  ),
  bim: (
    <>
      <path d="M16 4 27 10v12l-11 6-11-6V10z" />
      <path className="accent" d="M5 10l11 6 11-6M16 16v12" />
    </>
  ),
  twin: (
    <>
      <path d="M5 12 16 6l11 6-11 6z" />
      <path className="accent" d="M5 17l11 6 11-6M5 22l11 6 11-6" />
    </>
  ),
  plan: (
    <>
      <rect x="4" y="5" width="24" height="22" rx="2" />
      <path className="accent" d="M4 15h9v12M13 5v6M19 15h9M19 15v5" />
    </>
  ),
  progress: (
    <>
      <path d="M4 26h24M8 22v-6M14 22v-10M20 22v-7M26 22V8" />
      <path className="accent" d="M6 13l7-5 6 4 7-6" />
    </>
  ),
  build: (
    <>
      <path d="M5 27h22M8 27V12l8-6 8 6v15" />
      <path className="accent" d="M13 27v-7h6v7" />
    </>
  ),
  factory: (
    <>
      <path d="M4 27V14l7 4v-4l7 4v-4l7 4V6h3v21z" />
      <path className="accent" d="M9 23h3M16 23h3" />
    </>
  ),
  property: (
    <>
      <rect x="7" y="4" width="18" height="23" rx="1.5" />
      <path className="accent" d="M11 9h3M18 9h3M11 14h3M18 14h3M11 19h3M18 19h3" />
    </>
  ),
  care: (
    <>
      <path d="M4 27V12l12-7 12 7v15z" />
      <path className="accent" d="M16 13v8M12 17h8" />
    </>
  ),
};

/** Brand icon inside the glass badge (styles in index.css → .icon). */
export default function Icon({ name }: { name: IconName }) {
  return (
    <span className="icon">
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        {PATHS[name]}
      </svg>
    </span>
  );
}
