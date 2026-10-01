import type { IconName } from "../components/Icon/Icon";

export type ServiceSlug =
  | "mobile-3d-scanning"
  | "scan-to-bim"
  | "digital-twins"
  | "floor-plans"
  | "progress-monitoring";

export interface FaqItem { q: string; a: string }

export interface Service {
  slug: ServiceSlug;
  path: string;
  icon: IconName;
  name: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  lede: string;
  uses: string[];
  receive: string[];
  fit: string[];
  faq: FaqItem[];
}

export const SERVICES: Service[] = [
  {
    slug: "mobile-3d-scanning",
    path: "/services/mobile-3d-scanning",
    icon: "scan",
    name: "Mobile 3D scanning",
    short: "Walk-through capture of point cloud data and panoramic imagery for existing conditions.",
    seoTitle: "Mobile 3D Scanning Services | CapturViz",
    seoDescription:
      "Mobile 3D scanning that captures point cloud data and panoramic imagery of buildings and sites, ready for modeling, plans and digital twins.",
    lede:
      "We walk the space with mobile scanning equipment and record dense 3D point data alongside panoramic imagery. It’s a fast way to document existing conditions, including complex and hard-to-reach areas.",
    uses: [
      "Recording existing conditions before design or renovation",
      "As-built records at handover",
      "Plant rooms, ceilings and congested service areas",
      "Creating the base data for BIM, plans or a digital twin",
    ],
    receive: [
      "Registered point cloud of the captured area",
      "Panoramic imagery linked to the scan",
      "A capture summary noting coverage and any limits",
    ],
    fit: [
      "Your drawings are missing, old or unreliable",
      "You need to document a large area with minimal disruption",
      "Several teams need to work from one shared record",
    ],
    faq: [
      { q: "How accurate is the scan?", a: "Accuracy depends on the equipment, the environment and the deliverable. We agree an accuracy target with you before capture and document it with the results, rather than quoting one number for every project." },
      { q: "Does the building need to be empty?", a: "Not necessarily. We plan capture around occupancy and access. Tell us about restricted areas, working hours and safety requirements when you request a scan." },
      { q: "How long does capture take?", a: "It depends on the size, layout and level of detail. Your quote includes an estimated time on site." },
    ],
  },
  {
    slug: "scan-to-bim",
    path: "/services/scan-to-bim",
    icon: "bim",
    name: "Scan-to-BIM modeling",
    short: "Point clouds converted into BIM models for Revit and other leading BIM platforms.",
    seoTitle: "Scan-to-BIM Modeling for Revit & BIM Platforms | CapturViz",
    seoDescription:
      "CapturViz converts point cloud scans into BIM models compatible with Revit and other leading BIM platforms, with scope and detail agreed up front.",
    lede:
      "We convert point cloud data into BIM models your team can open in Revit and other leading BIM platforms. The model’s scope and level of detail are agreed with you before modeling starts.",
    uses: [
      "Existing-conditions models for design teams",
      "Renovation, retrofit and fit-out planning",
      "Clash checking new design against what’s built",
      "Building records for owners and facilities teams",
    ],
    receive: [
      "BIM model built from the scan data",
      "Model scope sheet listing what is and isn’t modeled",
      "The source point cloud for reference",
    ],
    fit: [
      "Your design work happens in a BIM tool",
      "You need walls, floors, openings and services in a model, not just points",
      "You want one model to hand to consultants and contractors",
    ],
    faq: [
      { q: "Which software do you model in?", a: "Our models are built to be compatible with Revit and other leading BIM platforms. Confirm your platform and version when you request a quote." },
      { q: "How much detail is modeled?", a: "You decide. We agree which elements are modeled and at what level of detail before work starts, and record it in the scope sheet." },
      { q: "Can you model from scans we already have?", a: "Often, yes. Send details of the data source and format and we’ll confirm." },
    ],
  },
  {
    slug: "digital-twins",
    path: "/services/digital-twins",
    icon: "twin",
    name: "Digital twin generation",
    short: "A navigable digital record of your space that teams can open from anywhere.",
    seoTitle: "Digital Twin Generation for Buildings | CapturViz",
    seoDescription:
      "Navigable digital twins built from 3D scans and panoramic imagery, so owners, designers and facility teams can explore a space remotely.",
    lede:
      "A digital twin gives your team a navigable, measurable record of a space. Stakeholders can explore it remotely instead of arranging repeat site visits.",
    uses: [
      "Remote walkthroughs for clients, consultants and contractors",
      "Facility and asset reference for operations teams",
      "Due diligence and portfolio reviews",
      "A shared record that supports later modeling",
    ],
    receive: [
      "A navigable 3D record built from scan data and imagery",
      "Access details for your team",
      "The underlying scan data, if included in scope",
    ],
    fit: [
      "People who need to see the space can’t easily get there",
      "You want one record that design and operations can both use",
      "Site visits are costly, restricted or disruptive",
    ],
    faq: [
      { q: "Who can access the twin?", a: "Access is set up for the people you choose. Hosting and sharing options are confirmed in your scope." },
      { q: "Can it be updated later?", a: "Yes. A new capture can be added after works or changes, so the record stays current." },
      { q: "Is this the same as a BIM model?", a: "No. A twin shows the space as captured. A BIM model is an object-based model built from that data. Many clients use both." },
    ],
  },
  {
    slug: "floor-plans",
    path: "/services/floor-plans",
    icon: "plan",
    name: "Spatial documentation & floor plans",
    short: "Measured floor plans and drawings produced from scan data.",
    seoTitle: "Floor Plans & Spatial Documentation from 3D Scans | CapturViz",
    seoDescription:
      "Measured floor plans, drawings and area documentation produced from 3D scan data for property, leasing, planning and facility teams.",
    lede:
      "We produce measured floor plans and supporting drawings from scan data, so your space records reflect what’s actually built.",
    uses: [
      "Leasing, marketing and space planning",
      "Fit-out and refurbishment briefs",
      "Property and portfolio records",
      "Fire, safety and wayfinding planning bases",
    ],
    receive: [
      "2D floor plans for the agreed levels and areas",
      "Additional drawings such as sections or elevations, if scoped",
      "Room and area schedules, if scoped",
    ],
    fit: [
      "Existing plans are missing or don’t match the building",
      "You need consistent plans across several properties",
      "You need drawings quickly without a full BIM model",
    ],
    faq: [
      { q: "Do you measure areas to a specific standard?", a: "If you need a particular measurement standard, tell us when you request a quote and we’ll confirm whether it can be met." },
      { q: "Can plans be updated after a refurbishment?", a: "Yes. We can rescan changed areas and revise the drawings." },
      { q: "What formats will I get?", a: "Common options include CAD drawings and PDF. Final formats are confirmed during scoping." },
    ],
  },
  {
    slug: "progress-monitoring",
    path: "/services/progress-monitoring",
    icon: "progress",
    name: "Progress monitoring & site comparison",
    short: "Repeat captures that show what changed on site between milestones.",
    seoTitle: "Construction Progress Monitoring & Site Comparison | CapturViz",
    seoDescription:
      "Repeat 3D captures at agreed milestones to document progress and compare site conditions against earlier scans or the design model.",
    lede:
      "We capture the site at milestones you choose and compare each capture with earlier scans or the design model, so you can see what changed and where.",
    uses: [
      "Documenting progress at key milestones",
      "Checking installed work against the design",
      "Recording conditions before elements are covered up",
      "Supporting claims, handover and dispute records",
    ],
    receive: [
      "A capture at each agreed milestone",
      "Comparison outputs showing differences between captures or against the design",
      "A short summary of items to review",
    ],
    fit: [
      "You need dated, visual evidence of site conditions",
      "Work will be concealed by later trades",
      "Teams off site need a reliable view of progress",
    ],
    faq: [
      { q: "How often should we scan?", a: "That depends on the programme. Common patterns are fortnightly, monthly or at specific milestones. We’ll suggest a schedule when we see your plan." },
      { q: "Can you compare against our design model?", a: "If you share the model, we can compare capture to design. We’ll confirm the model format during scoping." },
      { q: "Who sees the results?", a: "Results are shared with the people you nominate." },
    ],
  },
];

export const getService = (slug: ServiceSlug): Service => {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
};
