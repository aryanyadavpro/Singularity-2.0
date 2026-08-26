# PRD — Singularity (National-Level Hackathon Website) v1

**Doc owner:** Founding team
**Status:** Draft for build kickoff
**Team size:** 2 developers
**Stack:** HTML, CSS, JS (no framework, no build step required for v1)
**Reference site (functional benchmark):** https://www.mhacks.org/
**Visual reference:** Mumbai retro travel-poster art — black-and-yellow Premier Padmini taxi, Marine Drive skyline, bold neon-outlined Devanagari/vintage lettering, dusk teal sky, sun-faded poster grain (see attached image)

---

## 1. Product Summary

Singularity is the marketing and sponsor-acquisition website for a national-level hackathon. Version 1 is a **static, content-driven site** (no backend, no auth, no dashboard) whose jobs are to:

1. Convince a student to apply / register interest.
2. Convince a sponsor to open a conversation with the organizing team.
3. Look and feel unmistakably "Mumbai" — retro, warm, confident, a little filmy — while staying legible and fast.

This is explicitly a **marketing site**, not an application portal. If a registration/application system is needed later, it's out of scope for v1 (see §9).

---

## 2. Goals & Success Metrics

| Goal | Metric (v1 launch target) |
|---|---|
| Sponsor conversions | Sponsor form submissions / brochure downloads tracked (even if just via email or a simple form handler) |
| Participant interest | External "Apply" CTA click-through to the actual application form/Google Form/Devfolio link |
| Performance | Lighthouse Performance ≥ 90, Accessibility ≥ 90 on mobile |
| Load speed | First Contentful Paint < 1.5s on 4G, total page weight < 2.5MB per page (images optimized) |
| Cross-device | Fully usable on 360px width mobile up to 1920px desktop |
| Launch readiness | All 8 pages/sections live, no broken links, no console errors |

---

## 3. Target Audience

1. **College students / developers (18–25)** across India considering applying — scanning on mobile, comparing hackathons, want to see prize pool, tracks, dates, and "is this legit / well-run."
2. **Corporate sponsors / brand & marketing / CSR / developer-relations teams** — want ROI, reach numbers, past edition proof, tier deliverables, and an easy way to request a call or download a brochure PDF.
3. **Campus ambassadors / partner colleges / press** — secondary audience, mostly served by the same content.

---

## 4. Design Language ("Mumbai Retro")

This is a **hard requirement**, not a nice-to-have. Every page must read as part of the same poster series.

- **Palette:**
  - Taxi Black `#1A1A1A` / `#0F0F0F` (backgrounds, primary text on light)
  - Taxi Yellow `#F4B400` / `#FFC72C` (primary accent, CTAs, headlines)
  - Marine Drive Teal `#1B4B5A` / dusk blue `#0E2A38` (section backgrounds, gradients)
  - Rust/Neon Orange `#E8542B` (secondary accent, outlines, hover states — echoes the neon-tube outline on the lettering in the reference image)
  - Off-white / paper `#F3ECDD` (light section backgrounds, "aged poster" feel)
- **Typography:**
  - Display/headline font: a bold, slightly rounded slab or vintage-poster display face (e.g. self-hosted or Google Fonts — "Bungee," "Kalam" for accents, or a licensed Devanagari-inspired display face). Headlines should feel hand-signed/painted, not corporate.
  - Body font: clean, highly legible sans (e.g. "Inter," "Work Sans") — retro flavor lives in headlines and graphics, not in paragraph text.
- **Texture & motifs:** grain/noise overlay on hero sections, subtle vintage paper texture, taxi checkerboard strip (black/yellow) as a recurring divider motif, skyline silhouette (Marine Drive / South Mumbai) as a footer or section-break element, neon-outline glow effect on key headline words (CSS text-shadow / drop-shadow, no heavy JS needed).
- **Imagery style:** if using photography, warm-toned/grain-filtered treatment matching the reference (desaturated blues, warm yellows) rather than flat modern SaaS photography. Illustration/vector taxi and skyline motifs are welcome and cheaper to produce than photography for v1.
- **Motion:** restrained — scroll-reveal fades/slides, hover glow on buttons/cards, marquee/ticker strip (optional) for sponsor logos or track names, taxi-meter-style number counters for stats. No heavy 3D, no framework-based animation libraries required (vanilla CSS transitions + IntersectionObserver is enough).

---

## 5. Information Architecture / Pages

All pages share a persistent header (logo, nav, primary CTA "Apply") and footer (sponsor CTA, socials, contact, credits). Recommend building as a **single scrolling homepage with anchor sections** (like mhacks.org) PLUS a couple of standalone pages, per below — confirm with team before dev starts (see open questions §10).

### 5.1 Home
- Hero: event name/logo lockup, one-line tagline, event dates, city/venue, prize pool teaser, primary CTAs ("Apply Now" / "Sponsor Us")
- Quick stats strip (expected participants, colleges, tracks, prize pool) — taxi-meter counter animation
- Snapshot of tracks (teaser, links to full Tracks section)
- Trust strip: past sponsor/partner logos (if v1, can be "Powered by" logos or placeholder)
- Countdown timer to event start (JS)

### 5.2 About Us — Our Legacy
- Origin story of the organizing team/club
- Past edition(s) highlights: numbers, photos, testimonials/quotes if available
- Milestones timeline (visual timeline component, reused pattern from Tracks/Sponsorship sections)

### 5.3 The Next Frontier
- Vision statement for this edition — why "national level," what's new/bigger
- Scale indicators: target participant count, colleges reached, city/venue, industry partners
- Roadmap/theme narrative tying back to "Singularity" branding

### 5.4 Why Sponsor Us
- Value proposition: audience reach, demographics, past media reach, social stats
- ROI framing: brand visibility, talent pipeline/recruiting angle, CSR alignment, product placement opportunities
- Logos/quotes from past sponsors if available (or "Trusted approach" framing if first edition)

### 5.5 Sponsorship Tiers
- Tiered comparison table: Platinum / Gold / Silver / Custom
- Each tier: price (or "Contact for pricing"), deliverables checklist (booth, logo placement, stage time, social mentions, resume access, swag bag inclusion, etc.)
- CTA: "Download Sponsorship Deck" (PDF) + "Talk to us" (contact form anchor)

### 5.6 Tracks & Challenges
- Grid/card layout of tracks (AI/ML, Web3, Fintech, Open Innovation, HealthTech, etc.)
- Each track card: short description, example problem statements, possibly track-specific prizes/sponsors
- Judging criteria summary (optional subsection)

### 5.7 Meet the Team
- Core organizing team grid (photo, name, role, socials)
- Technical committee / volunteers grid (can be smaller cards)
- Optional: faculty advisor / mentor callout

### 5.8 Contact Us
- Sponsor inquiry form: name, organization, email, phone, budget range/tier interest, message
- Brochure download CTA (PDF link)
- General contact info: email, social links, location/venue map embed (optional)
- Form must have client-side validation; v1 submission target = mailto fallback, Formspree/Getform/Basin (no-backend form service), or simple serverless endpoint — decide in Implementation doc

---

## 6. Functional Requirements

- FR1: Responsive nav with mobile hamburger menu, smooth-scroll to anchors, active-section highlighting on scroll.
- FR2: Countdown timer to event date (vanilla JS, updates live).
- FR3: Animated stat counters, triggered on scroll into view (IntersectionObserver).
- FR4: Scroll-reveal animations for section entrances (respect `prefers-reduced-motion`).
- FR5: Sponsorship tier comparison table — must be legible on mobile (either horizontal scroll or stacked card layout).
- FR6: Contact/sponsor form with inline validation (required fields, email format) and a success/error state — no page reload (fetch-based submit).
- FR7: Brochure download link (static PDF in `/assets/`).
- FR8: Team member cards — image + role + social icon links, consistent grid that reflows gracefully with odd counts.
- FR9: All internal navigation (nav bar + footer + CTA buttons) resolves correctly whether pages are separate HTML files or anchors on one page.
- FR10: 404 handling if built as multi-page (custom 404.html matching theme).

## 7. Non-Functional Requirements

- NFR1 — Performance: images served as WebP with fallback, lazy-loaded below the fold, total JS < 100KB uncompressed for v1, no unused CSS frameworks bundled wholesale.
- NFR2 — Accessibility: semantic HTML5 landmarks, alt text on all imagery, color contrast checked against WCAG AA (yellow-on-black and teal-on-black combos must be verified), keyboard-navigable nav and form, focus states visible (don't just rely on the neon glow for focus indication).
- NFR3 — SEO: unique `<title>`/meta description per page/section, Open Graph + Twitter Card tags with a poster-style share image, semantic heading hierarchy, sitemap.xml + robots.txt.
- NFR4 — Browser support: latest 2 versions of Chrome, Safari, Firefox, Edge; graceful degradation on older mobile Safari.
- NFR5 — Maintainability: content (dates, tiers, team members, tracks) should be easy to update without touching layout logic — see Implementation doc for data-driven rendering approach.
- NFR6 — No inline styles/scripts scattered ad hoc; centralized CSS (with variables) and modular JS files.

## 8. Content Dependencies (blockers before final copy pass)

The following must be supplied by the organizing team before final content freeze:
- Confirmed event dates, venue, and city
- Prize pool figure(s)
- Track list + problem statement themes (final)
- Sponsorship tier pricing and deliverables (final)
- Team member names, roles, photos, social links
- Past edition stats/photos/testimonials (if any — first edition can substitute "why this year is different")
- Brochure PDF and any sponsor deck assets
- Legal: code of conduct link, privacy note on the contact form (what happens to submitted data)

## 9. Out of Scope (v1)

- User accounts / login / team registration portal (participants apply via an external form/Devfolio link for v1)
- CMS/admin panel — content is hardcoded/JSON-driven in the repo
- Payment processing
- Multi-language support
- Backend database — form submissions go through a third-party form service or serverless function only
- Native mobile app

## 10. Open Questions (resolve before dev sprint 1)

1. Single scrolling page with anchors (mhacks.org style) vs. separate HTML pages per section? *(Recommendation: hybrid — Home is a single scrolling page with anchors for About/Why Sponsor/Tracks/Team/Contact, since those are mostly promotional; but "Sponsorship Tiers" may deserve its own page if the comparison table is heavy. Decide in Implementation doc §1.)*
2. Where do form submissions go (Formspree/Getform vs. a serverless function you control)?
3. Is there an existing logo/wordmark for "Singularity," or does one need to be designed as part of this build (the lettering style in the reference image)?
4. External application platform — Devfolio / Unstop / custom Google Form — for the "Apply" CTA target?
5. Do you have real sponsor/past-edition data, or is this a first edition (changes tone of "Our Legacy" and "Why Sponsor Us")?

## 11. Milestones (suggested, 2-developer team)

| Phase | Scope | Duration |
|---|---|---|
| 0. Setup | Repo, design tokens (colors/type/spacing), component library (buttons, cards, nav, footer), asset prep | 2–3 days |
| 1. Core pages | Home, About (Legacy + Next Frontier), Tracks | 4–5 days |
| 2. Sponsor pages | Why Sponsor, Sponsorship Tiers, Contact form | 4–5 days |
| 3. Team + polish | Meet the Team, animations, responsive QA, performance pass | 3–4 days |
| 4. Launch prep | SEO tags, cross-browser QA, content freeze, deploy | 2 days |

Total: ~3 weeks for 2 developers working in parallel (see `agent.md` for how work should be split).
