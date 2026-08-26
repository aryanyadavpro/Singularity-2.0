# implementation.md — Technical Implementation Plan

Companion to `PRD.md` (what/why), `context.md` (look/feel), `agent.md` (how agents/devs should behave). This file is the "how it's actually built" reference.

---

## 1. Site structure decision

**Recommendation: single-page scrolling site with anchor sections**, matching mhacks.org, for these sections: Home, About Us (Legacy + Next Frontier as two sub-sections), Why Sponsor Us, Tracks & Challenges, Meet the Team, Contact Us.

**Exception: Sponsorship Tiers gets its own page** (`sponsorship-tiers.html`) linked from the "Why Sponsor Us" section and from the nav, because:
- The tier comparison table is content-heavy and benefits from a focused, linkable, shareable URL (sponsors forward this link internally).
- Keeps the homepage from becoming too long/heavy.

Final page set:
```
index.html                → Home, Legacy, Next Frontier, Why Sponsor (teaser), Tracks, Team, Contact
sponsorship-tiers.html    → Full tier comparison + custom deliverables
404.html                  → themed not-found page
```
If the team prefers full single-page instead, only `index.html` changes — all components/CSS stay identical, just move the tiers markup into a section instead of a page. Flag this decision before Sprint 1 starts (see PRD §10).

## 2. File/folder structure

```
/singularity-site
├── index.html
├── sponsorship-tiers.html
├── 404.html
├── /assets
│   ├── /images
│   │   ├── hero-bg.webp
│   │   ├── skyline.svg
│   │   ├── taxi-illustration.svg
│   │   ├── noise-texture.png
│   │   ├── /team          (headshots)
│   │   └── /tracks        (track icons/illustrations)
│   ├── /fonts              (self-hosted display + body font files, woff2)
│   └── /docs
│       └── singularity-brochure.pdf
├── /styles
│   ├── tokens.css          (color/type/spacing variables — shared, careful-review file)
│   ├── base.css            (reset, base typography, global utility classes — shared)
│   ├── components.css      (buttons, cards, nav, footer, forms — shared)
│   ├── home.css
│   ├── sponsorship-tiers.css
│   └── animations.css      (scroll-reveal, glow, counter, checkerboard divider)
├── /scripts
│   ├── main.js              (nav toggle, smooth scroll, active-link highlighting — shared)
│   ├── countdown.js
│   ├── counters.js          (taxi-meter stat counter animation, IntersectionObserver)
│   ├── scroll-reveal.js     (IntersectionObserver-based reveal, respects prefers-reduced-motion)
│   ├── form.js               (contact/sponsor form validation + submit handler)
│   └── data
│       ├── tracks.js         (array of track objects → rendered into #tracks grid)
│       ├── tiers.js           (array of tier objects → rendered into comparison table)
│       └── team.js            (array of team member objects → rendered into #team grid)
├── sitemap.xml
├── robots.txt
└── README.md
```

**Why data files (`/scripts/data/*.js`) instead of hardcoded repeated HTML blocks:** tracks, tiers, and team members are the three content types most likely to change frequently (new sponsors added mid-campaign, team changes, tracks finalized late). Rendering these from a small JS array into the DOM means updating content = editing one array, not hunting through repeated markup. Keep this pattern simple — plain JS array of objects + a `render()` function per section, no templating engine needed.

Example pattern (`tracks.js`):
```js
export const tracks = [
  {
    id: "ai-ml",
    title: "AI / ML",
    tagline: "Build systems that learn.",
    description: "[TODO: track description]",
    icon: "assets/images/tracks/ai-ml.svg"
  },
  // ...
];
```
Rendered by a small function in `main.js` or a dedicated `render-tracks.js` that maps this array into card markup on `DOMContentLoaded`.

## 3. Shared components (build once, reuse everywhere)

1. **Header/Nav** — logo, anchor links, mobile hamburger, "Apply" CTA button, active-section highlight on scroll (IntersectionObserver watching each `<section id>`).
2. **Footer** — sponsor CTA line, quick links, social icons, contact email, skyline SVG motif, legal/credits line.
3. **Button component** — primary (yellow fill, black text, glow on hover) and secondary (outline, orange/teal) variants as reusable CSS classes (`.btn`, `.btn--primary`, `.btn--secondary`).
4. **Section divider** — checkerboard strip, used between major sections.
5. **Card component** — base card style reused for track cards, team cards, tier cards, with modifiers per context.
6. **Countdown timer** — target date from a single config constant; updates every second; degrades gracefully ("Applications open now" or similar) after the date passes.
7. **Stat counter** — animates 0 → target number when scrolled into view, "taxi meter" tick-up easing.
8. **Scroll reveal** — generic `.reveal` class + IntersectionObserver toggling a `.is-visible` class that CSS transitions on; disabled under `prefers-reduced-motion: reduce`.
9. **Contact/sponsor form** — client-side validation (required fields, email regex), fetch-based submit, inline success/error states, no page reload.

## 4. Page-by-page build notes

### 4.1 Home (`index.html #home`)
- Hero: full-bleed background (skyline + gradient teal sky + grain texture), centered lockup (event name in glow-text style), tagline, date/venue line, two CTAs (Apply / Sponsor Us).
- Stat strip directly below hero: 3–4 stat counters (e.g., participants target, colleges, tracks, prize pool) in a responsive row → stacks on mobile.
- Track preview: 3-up card teaser linking to `#tracks`, not the full grid (full grid lives in its own section further down).
- Countdown timer component, prominent placement in or just below hero.

### 4.2 About Us — Our Legacy (`#legacy`)
- Narrative copy block (short — 2–3 paragraphs max, this is a poster site not a blog).
- Optional photo strip/gallery from past edition (if available) — lazy-loaded, grid or horizontal scroll.
- Milestone timeline (reuse a simple stepped-list component; mhacks.org's numbered timeline is a good structural reference — vertical list with markers, not a complex custom SVG chart for v1).

### 4.3 The Next Frontier (`#next-frontier`)
- Vision statement, larger scale numbers (this year's targets), can reuse the stat-counter component with different numbers than the hero strip (this year's ambition vs. Home's headline stat — avoid duplicating identical numbers).

### 4.4 Why Sponsor Us (`#why-sponsor`)
- Value prop bullets/cards (reach, demographics, ROI angles).
- Teaser of tiers with a clear "See full sponsorship tiers →" link to `sponsorship-tiers.html`.

### 4.5 Sponsorship Tiers (`sponsorship-tiers.html`)
- Comparison table: Platinum / Gold / Silver columns + a "Custom" callout card below.
- **Mobile handling:** stack as individual cards (one per tier, each listing its deliverables) rather than forcing a horizontal-scroll table — better usability on phones, which is most of the traffic.
- CTA at bottom: "Download Brochure" (PDF) + "Talk to us" (anchors back to `index.html#contact`).

### 4.6 Tracks & Challenges (`#tracks`)
- Full grid, data-driven from `tracks.js`.
- Each card: icon/illustration, title, short description; optional "View problem statements" expand/collapse (native `<details>`/`<summary>` is a good lightweight choice — no custom JS needed for the expand behavior).

### 4.7 Meet the Team (`#team`)
- Data-driven from `team.js`. Two groups: Core Organizers, Technical Committee (render as two labeled grids from the same component, filtered by a `group` field in the data).
- Card: photo (with graceful placeholder/initials avatar if photo missing), name, role, 1–2 social icon links.

### 4.8 Contact Us (`#contact`)
- Form fields: name, organization, email, phone (optional), interest (dropdown: sponsorship tier interest / general), message.
- Validation: required name/email/message, email format check, inline error messages, disable submit button while submitting, success message replaces form (or shows above it) on success.
- **Submission handling (v1, no backend):** use a static form backend service (e.g., Formspree, Getform, or Basin — pick one, add its endpoint to `form.js`) OR a `mailto:` fallback if no service is set up yet. Decide and document the chosen service + its endpoint/config in the README before contact form work starts.
- Brochure download: direct link to `/assets/docs/singularity-brochure.pdf`, `download` attribute set.

## 5. Countdown/date & content config

Centralize all "content facts that will change" in one small config object rather than scattering literals through HTML, e.g. `scripts/data/config.js`:
```js
export const config = {
  eventName: "Singularity",
  eventDates: "[TODO: e.g. Feb 14–15, 2027]",
  eventDateISO: "2027-02-14T09:00:00+05:30", // used by countdown.js
  venue: "[TODO: venue, city]",
  applyUrl: "#TODO-APPLY-LINK",
  prizePool: "[TODO: ₹ amount]",
  contactEmail: "[TODO: [email protected]]"
};
```
Header, hero, footer, and countdown all import from this one file — changing the event date in one place updates it everywhere.

## 6. Performance & asset guidelines

- Hero background and any large imagery: WebP with a JPEG fallback if needed, sized/compressed for max ~200–300KB.
- Fonts: self-host as `.woff2`, subset if possible, `font-display: swap`.
- Grain/noise texture: keep the PNG small (tileable, small dimensions, repeated via CSS) rather than one giant noise image.
- Lazy-load all below-the-fold images (`loading="lazy"`).
- No animation/JS library dependencies for v1 — vanilla JS + CSS transitions/`IntersectionObserver` cover every interaction listed above.
- Minify CSS/JS before deploy (a simple build step is fine — e.g. a one-off script or basic Node minifier — but keep local dev framework-free; don't introduce a dev server requirement for basic editing).

## 7. Deployment (v1)

- Static hosting: Netlify, Vercel (static export), GitHub Pages, or Cloudflare Pages — any works since there's no backend. Recommend Netlify or Vercel for free form-handling integrations and easy preview deploys per branch/PR.
- Set up a `robots.txt` + `sitemap.xml` at root.
- Configure a custom 404.html matching the theme.
- Add Open Graph/Twitter Card meta tags with a poster-style share image (reuse the hero art) so social shares look intentional.

## 8. Suggested build order (maps to PRD §11 milestones)

1. **Setup:** `tokens.css`, `base.css`, fonts, header/footer/nav shell, button/card components, checkerboard divider, grain texture — both devs align on this before splitting off.
2. **Parallel build (per agent.md §3 ownership split):**
   - Dev A: Home hero + stat counters + countdown → Legacy → Next Frontier → Why Sponsor teaser
   - Dev B: Tracks grid (+ data file) → Team grid (+ data file) → Contact form + brochure link
3. **Joint:** Sponsorship Tiers page (content-heavy, worth pairing on) + cross-linking between `index.html` and `sponsorship-tiers.html`.
4. **Polish pass (both):** scroll-reveal on all sections, responsive QA at 360/768/1024/1440px, Lighthouse pass, SEO meta tags, 404 page, sitemap/robots.
5. **Launch:** deploy, smoke-test all links/forms in production, tag `v1.0.0`.

## 9. Testing checklist before launch

- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90 (mobile)
- [ ] All nav/footer/CTA links resolve (no `#` dead links)
- [ ] Countdown timer shows correct live countdown and degrades gracefully post-event-start
- [ ] Contact form: validation works, submits successfully, shows success/error state
- [ ] Brochure PDF downloads correctly
- [ ] Responsive check at 360px, 768px, 1024px, 1440px, 1920px — no overlap/overflow
- [ ] Keyboard navigation works through nav, all cards' links, and the form
- [ ] `prefers-reduced-motion` respected (animations disabled)
- [ ] No console errors on any page
- [ ] Cross-browser: Chrome, Safari (incl. iOS Safari), Firefox
