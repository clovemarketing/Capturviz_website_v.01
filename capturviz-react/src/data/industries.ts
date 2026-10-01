import type { IconName } from "../components/Icon/Icon";
import type { ServiceSlug } from "./services";

export interface Industry {
  id: string;
  icon: IconName;
  name: string;
  short: string;
  intro: string;
  helps: string[];
  services: ServiceSlug[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "aec",
    icon: "build",
    name: "Architecture, engineering & construction",
    short: "Existing conditions, design coordination and construction verification.",
    intro: "Design and construction teams need reliable existing conditions before they draw, and clear records as work progresses.",
    helps: [
      "Existing-conditions surveys before design",
      "Coordination between new design and what’s built",
      "Progress records and verification during construction",
      "As-built documentation at handover",
    ],
    services: ["scan-to-bim", "progress-monitoring", "mobile-3d-scanning"],
  },
  {
    id: "industrial",
    icon: "factory",
    name: "Industrial & manufacturing",
    short: "Plant layouts, retrofit planning and documentation of complex spaces.",
    intro: "Plants and production spaces change often and are hard to measure by hand. A scan captures dense, complex areas in one visit.",
    helps: [
      "Layout planning for new lines and equipment",
      "Retrofit and upgrade design",
      "Documentation of congested services and structures",
      "Reducing time people spend in restricted areas",
    ],
    services: ["mobile-3d-scanning", "scan-to-bim", "digital-twins"],
  },
  {
    id: "property",
    icon: "property",
    name: "Commercial real estate & property management",
    short: "Floor plans, area records and remote walkthroughs for portfolios.",
    intro: "Owners and managers need accurate, consistent records across buildings, and a way to show spaces without a site visit.",
    helps: [
      "Measured floor plans for leasing and space planning",
      "Remote walkthroughs for tenants, buyers and consultants",
      "Portfolio records kept to one standard",
      "Baseline records before refurbishment",
    ],
    services: ["floor-plans", "digital-twins"],
  },
  {
    id: "healthcare",
    icon: "care",
    name: "Healthcare & education",
    short: "Accurate records for renovation, compliance planning and facilities teams.",
    intro: "Hospitals, campuses and schools run continuously. Capture is planned around occupants and gives facilities teams records they can rely on.",
    helps: [
      "Renovation and expansion planning in live buildings",
      "Facilities and maintenance records",
      "Space utilisation and planning studies",
      "Documentation ahead of compliance work",
    ],
    services: ["floor-plans", "scan-to-bim", "digital-twins"],
  },
];
