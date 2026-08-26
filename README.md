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

## Design Language — "Mumbai Retro"

| Token             | Value                | Usage                            |
| ------------------ | -------------------- | -------------------------------- |
| Taxi Black         | `#1A1A1A` / `#0F0F0F` | Backgrounds, primary text        |
| Taxi Yellow        | `#F4B400` / `#FFC72C` | CTAs, headlines, primary accent  |
| Marine Drive Teal  | `#1B4B5A` / `#0E2A38` | Section backgrounds, gradients   |
| Rust/Neon Orange   | `#E8542B`            | Secondary accent, hover states   |
| Off-white / Paper  | `#F3ECDD`            | Light sections, "aged poster"    |

## Getting Started

1. Clone the repo
2. Open `index.html` in a browser — no build step required
3. Content is driven by JSON files in `data/` — update there, not in HTML

## License

TBD
