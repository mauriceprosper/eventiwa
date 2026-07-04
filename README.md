# Eventiwa — Everything events. One platform.

A vanilla HTML/CSS/JS static site. No build step, no framework, no dependencies
(just Google Fonts via CDN). Open the files in a browser or host anywhere.

## Brand
Blue → purple → white. Display font: Sora. Body font: Inter.
All colours live as CSS variables in `assets/css/theme.css`.

## Structure

```
eventiwa/
├── index.html              # Landing page (eventiwa.com)
├── storefront/             # Vendor storefront template (name.eventiwa.com)
│   └── index.html
├── dashboard/              # Vendor dashboard (manage portfolio, events, etc.)
│   └── index.html
├── jobs/                   # Job portal (job.eventiwa.com)
│   └── index.html
├── halls/                  # Hall portal (hall.eventiwa.com)
│   └── index.html
├── shop/                   # Shop & rent page
│   └── index.html
│
├── assets/
│   ├── css/
│   │   ├── theme.css       # Design tokens + base (imported everywhere)
│   │   ├── components.css  # Reusable UI: buttons, nav, footer, cards, filters
│   │   └── landing.css     # Landing-page-only styles
│   ├── js/
│   │   ├── constants.js    # Shared filter data: states, brand types, categories
│   │   ├── main.js         # Scroll-reveal + mobile nav (loaded everywhere)
│   │   └── include.js      # Optional partial-injection helper
│   ├── img/                # Images (empty — drop yours here)
│   └── icons/              # Icons (empty)
│
├── components/             # Shared nav/footer markup to copy into pages
│   ├── nav.html
│   ├── footer.html
│   └── README.md
│
├── data/                   # Sample data (JS arrays) — swap for a real backend
│   ├── jobs.js
│   ├── halls.js
│   ├── products.js
│   └── vendors.js
│
└── pages/                  # Spare folder for extra pages (about, pricing, etc.)
```

## Running locally

Because pages reference assets with absolute paths (e.g. `/assets/css/theme.css`)
and the optional include helper uses `fetch`, serve it over a local web server
rather than opening with `file://`:

```bash
# Python (already on most machines)
cd eventiwa
python3 -m http.server 5173
# then open http://localhost:5173
```

Or use the VS Code "Live Server" extension.

## How the pieces connect
- The landing page links out to `/jobs/`, `/halls/`, `/shop/`.
- The job, hall and shop portals render sample data from `/data/*.js` through
  working filters (type, category, state). Empty filters show an empty-state message.
- Filter dropdowns are populated from `/assets/js/constants.js` — edit that one
  file and every portal updates.
- The storefront is a static template; the dashboard is a visual stub.

## Where the real work goes next
1. Pick a backend (Firebase or Supabase) and replace the `data/*.js` arrays with
   live fetches.
2. Add auth for the dashboard.
3. Wire the subdomain routing (`name.eventiwa.com`) at the hosting/DNS layer, or
   move to a framework when you outgrow static files.
4. Decide monetization before launch — the CTAs currently promise "free".

## Admin Dashboard — admin.eventiwa.com

Access at `/admin/index.html`. On first visit, you'll be prompted to enter your email:
**mauriceprosper1@gmail.com** (hardcoded for now; use Firebase Admin SDK in production).

### What you can do:

- **Dashboard**: Stats overview (total vendors, halls, jobs, pending signups)
- **Registrations**: Review and approve new vendor signups (currently a stub; connects to Firebase Auth)
- **Event Brands**: Add decorators, planners, florists, etc. to seed the platform before launch
- **Jobs**: Post job openings on behalf of brands to fill the job portal
- **Halls**: Add halls with or without prices to populate the hall portal

All data is stored in `localStorage` for now (dev convenience). Swap to Firebase Firestore when you connect the backend:
- `localStorage.getItem("brands")` → Firestore collection `brands`
- `localStorage.getItem("halls")` → Firestore collection `halls`
- `localStorage.getItem("jobs")` → Firestore collection `jobs`
- Registrations would pull from Firestore `users` collection with a status field (`pending`, `approved`, `rejected`)

### Note on authentication:

The email gate is client-side (prompt). For production, implement via:
1. Firebase Auth (users sign in)
2. Firestore security rule that checks `doc.uid == request.auth.uid && user.email == "mauriceprosper1@gmail.com"`
3. Custom claim `admin: true` set via Admin SDK, checked in the frontend

This prevents unauthorized access even if someone modifies the browser.
