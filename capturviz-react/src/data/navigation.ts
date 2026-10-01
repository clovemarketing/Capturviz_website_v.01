export interface NavLink { label: string; to: string }

export const MAIN_NAV: NavLink[] = [
  { label: "Industries", to: "/industries" },
  { label: "Technology", to: "/technology" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: "Industries", to: "/industries" },
  { label: "Technology & deliverables", to: "/technology" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Cookies", to: "/cookies" },
  { label: "Accessibility", to: "/accessibility" },
];
