# context.md — Brand & Design Context for AI Build Agents

Purpose: this file is the single source of truth an AI coding agent (Claude Code, Cursor, Copilot, etc.) should read before generating **any** HTML/CSS/JS for this project. It captures tone, visual system, and content facts so the agent doesn't invent inconsistent styling or copy.

---

## 1. What this project is

**Singularity** is a national-level student hackathon. The website is a static marketing site (v1: HTML/CSS/JS, no framework) built to get students to apply and sponsors to reach out. Functional structure benchmark: mhacks.org (single scrolling page, anchor nav, hero → about → sponsors → timeline → FAQ → footer pattern). Visual direction: **Mumbai retro travel-poster**, inspired directly by the attached reference image (black taxi, giant glowing yellow lettering, Marine Drive skyline at dusk, sun-aged poster texture).

## 2. Visual identity (must be followed exactly, not reinterpreted)

### Color tokens
```css
:root {
  --color-black: #1A1A1A;      /* taxi black, primary dark bg / text */
  --color-black-deep: #0F0F0F; /* darkest bg, footer */
  --color-yellow: #F4B400;     /* taxi yellow, primary brand color */
  --color-yellow-bright: #FFC72C; /* CTA hover / highlight */
  --color-teal-dusk: #1B4B5A;  /* Marine Drive sky mid-tone */
  --color-teal-deep: #0E2A38;  /* Marine Drive sky dark, section bg */
  --color-orange-neon: #E8542B;/* neon outline accent, secondary CTA */
  --color-paper: #F3ECDD;      /* aged poster off-white, light section bg */
  --color-text-on-dark: #F3ECDD;
  --color-text-on-light: #1A1A1A;
}
```
Do not substitute generic SaaS colors (no default blue/purple gradients, no pure white `#FFFFFF` backgrounds — use `--color-paper` instead to preserve the "aged poster" feel).

### Typography
- **Headlines/display:** a bold poster/display face with personality (candidates: "Bungee," "Anton," "Passion One," or a licensed vintage-Bollywood-poster-style face if available). Headlines are allowed to be oversized and slightly irregular — this is a poster, not a corporate deck.
- **Body:** clean, high-legibility sans (candidates: "Inter," "Work Sans," "Manrope"). Never use the display font for paragraph copy or form labels.
- Headline treatment: key hero words get a **neon-glow effect** — layered `text-shadow` in yellow/orange to mimic the glowing outlined lettering in the reference image. Example:
```css
.glow-text {
  color: var(--color-yellow);
  text-shadow:
    0 0 4px var(--color-yellow-bright),
    0 0 12px var(--color-orange-neon),
    0 0 24px rgba(232, 84, 43, 0.6);
}
```

### Recurring visual motifs
- **Checkerboard strip** (black/yellow squares) as a section divider — echoes taxi livery.
- **Skyline silhouette** (simple SVG of a generic South Mumbai-style skyline, Marine Drive curve, sea) used in hero background and footer.
- **Grain/noise overlay** on hero and dark sections for the aged-poster look (a semi-transparent PNG noise texture or CSS `background-blend-mode`, applied subtly — should not hurt text contrast/legibility).
- **Taxi-meter counters**: stat numbers that animate/tick up like a meter when scrolled into view.
- Avoid: flat modern gradients (blue-to-purple SaaS look), rounded "friendly" illustration style, stock photography of generic laptops/people-in-hoodies — none of that matches the theme.

### Motion principles
- Subtle scroll-reveal (fade + slight translate-y) on section entry.
- Hover states: glow intensifies, slight scale (1.02–1.05), never jarring.
- Respect `prefers-reduced-motion: reduce` — disable non-essential animation for users who set it.
- No animation should block content from being readable if JS fails to load (progressive enhancement — content is in the HTML regardless).

## 3. Voice & tone

- Confident, energetic, a little theatrical (poster/film energy) — but copy stays clear and scannable, never purple prose.
- Speak to students like peers, not like a corporate brochure: short punchy headlines, direct CTAs ("Build the next big thing," "Apply now," not "Kindly submit your application").
- Speak to sponsors with business clarity: lead with numbers and outcomes, not adjectives.
- Avoid clichés like "join us on this incredible journey" — the reference image's confidence (bold type, bold color, no hedging) should carry into copywriting too.

## 4. Site structure the agent should assume

Single scrolling `index.html` with anchor-linked sections in the header nav, matching mhacks.org's pattern, unless `implementation.md` specifies a hybrid multi-page structure. Sections, in order:

1. `#home` — Hero (name, tagline, dates, CTAs, stat counters)
2. `#legacy` — About Us: Our Legacy
3. `#next-frontier` — The Next Frontier
4. `#why-sponsor` — Why Sponsor Us
5. `#sponsorship-tiers` — Sponsorship Tiers (Platinum/Gold/Silver/Custom)
6. `#tracks` — Tracks & Challenges
7. `#team` — Meet the Team
8. `#contact` — Contact Us (sponsor inquiry form + brochure download)

Persistent header (logo + nav + Apply CTA) and footer (sponsor CTA, socials, contact, legal) wrap every section. See `implementation.md` for whether Sponsorship Tiers is broken out as its own page.

## 5. Known content facts (fill in as confirmed — do not invent numbers)

> The agent must **never fabricate** dates, prize pool amounts, sponsor names, past-edition statistics, or team member names. Where real content isn't yet supplied, use clearly-marked placeholders such as `[EVENT DATE]`, `[PRIZE POOL TBD]`, `[TEAM MEMBER NAME]` so they're easy to find-and-replace later. Do not invent testimonials or fake sponsor logos.

- Event name: Singularity
- Level: National-level hackathon
- Theme: Mumbai retro
- Reference structural benchmark: mhacks.org
- Everything else (dates, venue, prize pool, tracks, tiers, team, past stats): **pending — see PRD.md §8 Content Dependencies**

## 6. Non-negotiable technical constraints

- Stack: plain HTML5 + CSS3 + vanilla JS only for v1. No React/Vue/build tooling unless `implementation.md` says otherwise.
- Mobile-first responsive (most student traffic will be mobile).
- Accessible: real semantic tags, alt text, sufficient contrast even with the yellow/black/teal palette, visible focus states.
- Fast: optimized images, minimal JS, no heavy animation libraries.
- Content should be easy to update without deep code changes (see `implementation.md` for the data-driven content pattern — e.g., tracks/team/tiers rendered from JS arrays/JSON rather than hardcoded repeated markup blocks).

## 7. When in doubt

If a requirement is ambiguous, default to: **(1)** matching the retro-Mumbai visual system over generic modern web trends, **(2)** matching mhacks.org's proven information architecture and interaction patterns over inventing new ones, **(3)** simplicity and performance over cleverness, since this is a 2-developer v1 build on a hackathon timeline.
