# Singularity 2.0 — National-Level Hackathon Website

> A static, content-driven marketing website for a national-level hackathon with a bold **Mumbai Retro** design language.

## Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, transitions, responsive layouts (no framework)
- **Vanilla JS** — Countdown timer, scroll animations, form handling (no build step)

## Project Structure

```
Singularity-2.0/
├── assets/               # Static assets (images, fonts, PDFs, icons)
│   ├── images/           # Optimized WebP images with fallbacks
│   ├── fonts/            # Self-hosted display & body fonts
│   ├── icons/            # SVG icons (social, UI, track icons)
│   └── docs/             # Downloadable PDFs (sponsor brochure, etc.)
├── css/                  # Stylesheets
│   ├── base/             # Reset, variables (design tokens), typography
│   ├── components/       # Reusable component styles (buttons, cards, nav, footer, etc.)
│   ├── sections/         # Page-section-specific styles
│   └── utilities/        # Helper classes, animations, media queries
├── js/                   # JavaScript modules
│   ├── components/       # Reusable JS components (navbar, form, counters)
│   └── utils/            # Helpers (IntersectionObserver, smooth scroll, etc.)
├── pages/                # Standalone HTML pages (if any sections are separate)
├── data/                 # JSON data files for content-driven rendering
├── index.html            # Main single-page entry (Home + anchored sections)
├── 404.html              # Custom 404 page matching theme
├── sitemap.xml           # SEO sitemap
├── robots.txt            # SEO robots
├── PRD.md                # Product Requirements Document
└── README.md             # This file
```

## Pages / Sections

| #   | Section             | Description                                         |
| --- | ------------------- | --------------------------------------------------- |
| 5.1 | Home                | Hero, stats, track teaser, trust strip, countdown   |
| 5.2 | About — Our Legacy  | Origin story, past highlights, milestones timeline  |
| 5.3 | The Next Frontier   | Vision, scale indicators, edition roadmap           |
| 5.4 | Why Sponsor Us      | Value prop, ROI framing, past sponsor proof         |
| 5.5 | Sponsorship Tiers   | Tier comparison table (Platinum/Gold/Silver/Custom) |
| 5.6 | Tracks & Challenges | Track cards grid, judging criteria                  |
| 5.7 | Meet the Team       | Core team + volunteers grid                         |
| 5.8 | Contact Us          | Sponsor inquiry form, brochure download, map        |

## Design Language & Global Color System

### Global Contrast Rules

| Background Category | Background Color / Gradient | Text Color | CTA Button Background & Text Color |
| ------------------- | --------------------------- | ---------- | ---------------------------------- |
| **Dark / Brown / Olive Backgrounds** | `#64502C` (Sponsors), `#897448` (Timeline), `#0F0F0F` (Hero) | `linear-gradient(to right, #f1eedd 0%, #f1eedd 100%)` (`#f1eedd`) | CTA Button: `linear-gradient(to right, #f1eedd 0%, #f1eedd 100%)` with text `#64502C` |
| **Light / Beige / Cream Backgrounds** | `linear-gradient(to right, #f1eedd 0%, #f1eedd 100%)` (`#f1eedd`) | `#64502C` | CTA Button: `#64502C` with text `#f1eedd` |
| **Floating Frosted Navbar** | Frosted cream pill `rgba(241, 238, 221, 0.45)` | `#64502C` | CTA Button: `linear-gradient(to right, #f1eedd 0%, #f1eedd 100%)` with text `#64502C` |

### Core Tokens

| Token             | Value                                                  | Usage                            |
| ----------------- | ------------------------------------------------------ | -------------------------------- |
| Cream Accent      | `linear-gradient(to right, #f1eedd 0%, #f1eedd 100%)` | Dark section text, CTA pills, light backgrounds |
| Deep Earth Brown  | `#64502C`                                              | Light section text, dark CTAs, nav text |
| Golden Olive      | `#897448`                                              | Timeline section background      |
| Taxi Black        | `#1A1A1A` / `#0F0F0F`                                  | Hero & footer background         |
| Taxi Yellow       | `#F4B400` / `#FFC72C`                                  | Hero typography accent glow      |

## Getting Started

1. Clone the repo
2. Open `index.html` in a browser — no build step required
3. Content is driven by JSON files in `data/` — update there, not in HTML

## License

TBD
