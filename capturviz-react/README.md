# CapturViz Website — React + TypeScript

Light-glass marketing site for CapturViz Reality Capture, built with **Vite + React 18 + TypeScript + React Router 6**.
Every page lives in its own folder with a `.tsx` and a `.css` file.

## Requirements
- Node.js 18 or newer (20+ recommended)
- npm 9+

## Run it
```bash
npm install          # install dependencies
npm run dev          # local dev server → http://localhost:5173
npm run build        # type-check + production build into /dist
npm run preview      # serve the /dist build locally
```

## Project structure
```
capturviz-react/
├── index.html                  # HTML shell, fonts, Organization JSON-LD
├── package.json / tsconfig.json / vite.config.ts
├── .env.example                # copy to .env and set VITE_FORM_ENDPOINT
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   └── _redirects              # SPA fallback for Netlify (see Deploy)
└── src/
    ├── main.tsx                # entry: BrowserRouter + global CSS
    ├── App.tsx                 # all routes
    ├── index.css               # design tokens + shared primitives (glass, buttons, grids, steps)
    ├── assets/                 # logo icon, wordmark, full logo, brand mockup
    ├── data/
    │   ├── services.ts         # copy, SEO and FAQ for all 5 services
    │   ├── industries.ts       # the 4 sectors
    │   └── navigation.ts       # header/footer link lists
    ├── hooks/usePageMeta.ts    # per-page title, description, OG, canonical, robots
    ├── components/
    │   ├── Header/             Header.tsx + Header.css   (glass nav, services dropdown, mobile menu)
    │   ├── Footer/             Footer.tsx + Footer.css
    │   ├── Layout/             Layout.tsx + Layout.css   (header + <Outlet/> + footer)
    │   ├── PageHero/           PageHero.tsx + PageHero.css (breadcrumbs + BreadcrumbList JSON-LD)
    │   ├── ServiceList/        ServiceList.tsx + .css
    │   ├── ServiceLayout/      ServiceLayout.tsx + .css  (shared service-page structure)
    │   ├── LegalLayout/        LegalLayout.tsx + .css    (shared legal-page structure)
    │   ├── CtaBand/            CtaBand.tsx + .css        ("Tell us about your space" bar → prefills Contact)
    │   ├── Faq/                Faq.tsx + .css
    │   ├── PointCloud/         PointCloud.tsx + .css     (animated hero scan, respects reduced motion)
    │   ├── Illustrations/      Illustrations.tsx + .css  (SVG scan + floor-plan visuals)
    │   ├── Icon/               Icon.tsx
    │   └── ScrollToTop/        ScrollToTop.tsx           (scroll/focus on route change, #hash support)
    └── pages/
        ├── Home/               Home.tsx + Home.css
        ├── Services/           Services.tsx + Services.css
        ├── services/
        │   ├── MobileScanning/      MobileScanning.tsx + .css
        │   ├── ScanToBim/           ScanToBim.tsx + .css
        │   ├── DigitalTwins/        DigitalTwins.tsx + .css
        │   ├── FloorPlans/          FloorPlans.tsx + .css
        │   └── ProgressMonitoring/  ProgressMonitoring.tsx + .css
        ├── Industries/         Industries.tsx + .css
        ├── Technology/         Technology.tsx + .css
        ├── HowItWorks/         HowItWorks.tsx + .css
        ├── Projects/           Projects.tsx + .css
        ├── About/              About.tsx + .css
        ├── Contact/            Contact.tsx + .css
        ├── Privacy/ Terms/ Cookies/ Accessibility/   each .tsx + .css
        └── NotFound/           NotFound.tsx + .css
```

## Routes
| Path | Page |
|---|---|
| `/` | Home |
| `/services` | Services overview |
| `/services/mobile-3d-scanning` | Mobile 3D scanning |
| `/services/scan-to-bim` | Scan-to-BIM modeling |
| `/services/digital-twins` | Digital twin generation |
| `/services/floor-plans` | Spatial documentation & floor plans |
| `/services/progress-monitoring` | Progress monitoring & site comparison |
| `/industries` | Industries (anchors: `#aec`, `#industrial`, `#property`, `#healthcare`) |
| `/technology` | Technology & deliverables |
| `/how-it-works` | Process + FAQ |
| `/projects` | Case-study template (empty until approved projects are added) |
| `/about` | About + brand mockup |
| `/contact` | Request a scan (supports `?service=<slug>`) |
| `/privacy` `/terms` `/cookies` `/accessibility` | Legal drafts (noindex) |
| `*` | 404 |

## Connect the contact form
1. Copy `.env.example` to `.env`.
2. Set `VITE_FORM_ENDPOINT` to your handler (Formspree, HubSpot, Basin, your own API). It receives a JSON POST.
3. Rebuild. Until this is set, the form validates but shows a "not connected" notice instead of sending.

## Editing content
- Service copy, SEO and FAQs → `src/data/services.ts`
- Industries → `src/data/industries.ts`
- Case studies → add objects to `CASE_STUDIES` in `src/pages/Projects/Projects.tsx`
- Colours, radii, fonts → tokens at the top of `src/index.css`

## Deploy
This is a single-page app, so the host must send every path to `index.html`.
- **Netlify:** `public/_redirects` is already included. Build `npm run build`, publish `dist`.
- **Vercel:** add `vercel.json` → `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- **Apache:** `.htaccess` with `FallbackResource /index.html`
- **Nginx:** `try_files $uri /index.html;`

## Before launch (from the handoff)
- Legal pages are templates — have them reviewed and fill in the bracketed entity details.
- File formats on Technology are “typical” — confirm which CapturViz actually delivers.
- Don’t add clients, case-study results, accuracy figures, addresses or certifications until verified.
- Don’t add LocalBusiness/address structured data until a real location is confirmed.
- For best SEO, consider pre-rendering (e.g. `vite-plugin-prerender` or migrating routes to a framework with SSR).
