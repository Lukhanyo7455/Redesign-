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

## Backlog
- P1: Inner pages (About, Interventions detail, Stories, Contact, Get Involved)
- P2: Replace image placeholders with real photography
