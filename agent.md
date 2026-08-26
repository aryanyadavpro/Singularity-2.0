# agent.md — Instructions for AI Coding Agents

This file governs how any AI agent (Claude Code, Cursor, Copilot Workspace, etc.) should behave while working in this repository. Read `context.md` (brand/design truth) and `PRD.md` (requirements) before generating code. Read `implementation.md` for the technical plan and file structure before writing a single file.

---

## 1. Read order for any agent starting fresh

1. `PRD.md` — what we're building and why
2. `context.md` — how it must look/sound (design tokens, tone, content rules)
3. `implementation.md` — how it's technically structured (file tree, components, data files)
4. Existing code in `/src` or `/` (whatever's already there) — never contradict established patterns without flagging it to the human first

## 2. Ground rules

- **Stack discipline:** HTML5, CSS3, vanilla JS only. No npm build step required to view the site locally (a `file://` or simple static server open should just work), unless `implementation.md` explicitly introduces a bundler — don't add one unprompted.
- **Don't invent content.** Dates, prize pools, sponsor names, team member names/photos, and testimonials must come from the human or from `context.md §5`. If missing, use bracketed placeholders (`[EVENT DATE]`) and leave a `<!-- TODO: content -->` HTML comment so it's greppable.
- **Don't invent visual direction.** Colors, fonts, and motifs come from `context.md §2`. If a new UI pattern is needed that isn't covered there, propose it in the response rather than silently freelancing a different style (e.g., don't switch to a generic purple-gradient SaaS look because it's a common default).
- **Accessibility and performance are requirements, not stretch goals.** Every new component must ship with alt text, semantic tags, keyboard support, and reasonable image sizing/lazy-loading — not added later as a cleanup pass.
- **No dead links / no placeholder `href="#"` in nav** — anchor links must resolve to real section IDs; external CTAs (Apply, brochure download) should link to a clearly marked placeholder URL if the real one isn't known yet, e.g. `href="#TODO-APPLY-LINK"`.
- **Keep diffs small and reviewable.** When editing existing files, use targeted edits, not full-file rewrites, unless the file is small or the change is structural.
- **Comment non-obvious CSS/JS** (e.g., the neon-glow technique, the counter animation, IntersectionObserver usage) briefly so a second developer can maintain it without reverse-engineering.

## 3. Two-developer split (recommended ownership)

To avoid merge conflicts on a small static site, split by **page/section ownership**, not by "HTML vs CSS vs JS" (that causes constant cross-file conflicts).

**Developer A — "Story & Sponsor" track**
- Home hero
- About Us: Our Legacy
- The Next Frontier
- Why Sponsor Us
- Sponsorship Tiers

**Developer B — "Build & Ops" track**
- Tracks & Challenges
- Meet the Team
- Contact Us (form + brochure download)
- Shared components: header/nav, footer, countdown timer, stat counters (own these since they touch every page)

Both developers share `styles/tokens.css` (design variables) and `styles/base.css` (resets/typography) — changes to these two files should be flagged/reviewed by the other dev before merging, since they affect everything.

## 4. Git workflow

- `main` — always deployable.
- Feature branches per section: `feature/hero`, `feature/sponsorship-tiers`, `feature/contact-form`, etc.
- Small, frequent commits with descriptive messages (`feat: add sponsorship tier comparison table`, not `updates`).
- PR (even in a 2-person team, a quick self-review or async review) before merging into `main`, especially for `tokens.css`, `base.css`, header/footer/nav.
- Tag `v1.0.0` at launch.

## 5. Definition of done (per section/page)

A section is "done" only when:
- [ ] Matches `context.md` visual system (colors, type, motifs)
- [ ] Responsive from 360px to 1920px, no horizontal scroll, no overlapping elements
- [ ] All copy is either real/approved or clearly marked as placeholder
- [ ] All interactive elements (buttons, form, nav links) work and go somewhere real or clearly-marked-placeholder
- [ ] Images have alt text and are optimized/lazy-loaded where below the fold
- [ ] No console errors/warnings
- [ ] Keyboard-navigable (tab order makes sense, focus visible)
- [ ] Checked in Chrome + Safari + one mobile device/emulator

## 6. What to do when requirements are ambiguous

Default order of precedence when something isn't specified:
1. Explicit instruction from the human in the current conversation
2. `PRD.md` requirement
3. `context.md` design/tone rule
4. mhacks.org's pattern for equivalent functionality (structural reference only — not visual reference)
5. Simplicity/performance-first judgment call, flagged to the human for confirmation rather than silently assumed for anything content-related (dates, pricing, names)

## 7. Explicitly out of scope for agents to add unprompted

- No backend/database code
- No user auth/login
- No payment integration
- No CMS
- No build tooling (webpack/vite/etc.) unless `implementation.md` says so
- No third-party analytics/tracking scripts unless requested (privacy — and it affects the performance budget)

## 8. Communication back to the human

When an agent completes a chunk of work, it should summarize: what was built, what design/content decisions were made (with reference to which doc justified them), and what's still marked as a placeholder/TODO — so the human can do a fast content-and-QA pass rather than re-reading all the code.
