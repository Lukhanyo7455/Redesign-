# Life Choices homepage redesign

## Original problem statement
"Redesign the background theme of this website and stop using cards a lot instead have an image placeholder and test on the side , change the family for live leaders quest health 4 life and reform the differently and beautifully , otherwise leave everything else as it is" — site: https://lifechoices-frontend.mdunyelwalukhanyo.workers.dev

## Architecture
React (CRA) frontend only: framer-motion, lenis. Components in src/components/site, content in src/data/site.js. All routes currently render the homepage.

## Implemented (2026-10-20)
- New theme: bone/sand paper, ink and moss dark sections, lime accent, grain
- Fonts: Bricolage Grotesque (display), Instrument Serif (accents, programme names), Figtree (body)
- Cards removed: every section now uses an image placeholder with text beside it, or a list layout
- Interventions (Family Affairs, Health4Life, Leaders’ Quest, Academy) reworked into alternating rows with large italic serif names and parallax placeholders
- Intro overlay, masked hero headline, 3D parallax hero image, count-up stats, slow serif marquee, SVG favicon

## Update (2026-10-21)
- Whole site set to Plus Jakarta Sans, white backgrounds (footer stays dark), relaxed line spacing everywhere
- Removed numbering, eyebrow dashes and paragraph underline dashes
- Removed footer donate CTA band; added full-width image banner (user-supplied photo) in its place
- Nav dropdown: blur/scale entrance, staggered items, lime sweep + arrow on hover, sliding hover pill, rotating chevron

## Update 2 (2026-10-21)
- Photo banner moved to top (full-screen first view); soft green gradient site background; image placeholders tinted green
- All 4 programme rows identical: text left, image right
- 21st birthday popup (2005–2026) with confetti (canvas-confetti), shows once per browser session

## Update 3 (2026-10-21)
- User photos placed in all image boxes (public/photos), background gradient toned down to near-white
- Footer fixed: .container-lc padding bug (was overriding py-*) resolved, 4-column aligned grid
- 21-year timeline auto-scrolling slider (8 milestones; most years marked "Year TBC" pending client data)

## Update 4 (2026-10-21)
- Permanent "Celebrating 21 years" nav badge (shows "21" on small screens) reopens confetti popup
- Timeline rebuilt with client years/photos: 2005, 2013, 2015, 2017, 2019 + empty slots for 2021 and 2026

## Update 5 (2026-10-21)
- 2021/2026 milestones filled with client photos; partner logo marquee (IDC, Don Bosco Mondo, Argon)
- All images uncropped (FitImage: contain + blurred backdrop, frames match native ratios); hero parallax zoom removed
- "More confetti" button removed; popup + confetti on every page load
- Banner lead description added; footer wordmark outlined in lime with hover fill

## Update 6 (2026-10-22)
- Backend: POST /api/donations (MOCKED demo gateway, card ending 0002 = decline), GET /api/donations/stats (demo goal R210,000), POST /api/contact (stored in Mongo)
- /get-involved & /donate: banner, 3-step checkout (amount/frequency/programme → details → card) with live 3D card flip, progress bar, confetti + receipt
- /contact: banner, form, contact details, Google map embed
- Footer wordmark = original logo (badge + script) as lime outline, fills on hover

## Backlog
- P1: Inner pages (About, Interventions detail, Stories, Contact, Get Involved)
- P2: Replace image placeholders with real photography
