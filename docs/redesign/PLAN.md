# Portfolio redesign plan

Status: core implementation completed after the owner selected scope option 1 (About, projects, and scroll structure). Browser visual verification remains outstanding.

Use [AUDIT.md](AUDIT.md) as evidence and [RESTYLE-GUIDE.md](RESTYLE-GUIDE.md) as the proposed design contract.

## Decisions to get from Bilal

The owner selected scope option 1. The recommended plain vertical project articles were used, with Plated first, as stated before implementation. The remaining choices below apply to any later expansion of scope.

1. Exactly which areas should change: page structure/scrolling, About, and projects only; those plus hero/navigation; or the whole site except Off the Clock?
2. How should projects stack: two full-width vertical articles (recommended after inspecting the two-project portfolio), one featured project plus a compact second entry, or a more animated vertical sticky stack? Which project should lead?
3. When drafting final copy, confirm Winter 2027 availability, the Plated/Nest mapping to the generic resume project titles, and any current claims absent from the resume that Bilal wants to retain. Ask for a personal motivation sentence only if Bilal wants a more personal About draft.

The guide provides a complete working direction. Additional decisions do not require repeating the audit.

## Implemented core

- Reading order is Hero, About, Projects, Experience, Stack, Off the Clock, Contact.
- About is a compact introduction grounded in the Markdown resume, with education/location facts alongside it. It leads with current OPS work and puts AWS leadership before GDG.
- Plated and Nest are full-width articles in normal flow, using real screenshots, brief contributions, readable outcomes, and live links. Unconfirmed uptime/reliability claims were removed.
- Scoped Chakra Petch/Share Tech Mono styles improve reading size, contrast, spacing, and mobile collapse without changing the other sections' styles. Existing loaded font weights are reused.
- Native wheel scrolling replaces Lenis; its unused package was removed. Anchor smoothing and reduced-motion handling remain.
- The rail's ordering and active-section tracking follow the new structure. Stable numeric aliases remain unchanged, so the rail displays sector IDs 02, 03, 01 before 04-06. These identify existing shortcuts, not sequence positions.
- The hero's existing scroll button now targets About, the next section. Its styling and copy are unchanged.
- Experience, Skills, Contact, boot, and Off the Clock presentation/content are unchanged. Their audit findings remain deferred to a broader scope.
- Build, lint, and existing command checks passed after the final code changes. Production JavaScript decreased from 381.34 kB to 361.18 kB (gzip: 120.80 kB to 115.74 kB).
- Both screenshot assets were visually inspected. Their full intrinsic proportions are preserved and descriptions match what they show.

## Second pass: card systems (September 30, 2026)

The owner asked for a more distinctive, Cyberpunk 2077-flavored presentation with overlapping projects. This supersedes the "no overlapping cards" rule for Projects.

- Copy lives in `src/content/profile.ts`, `projects.ts`, and `experience.ts`. Personal lines not taken from the resume are flagged `draft: true` and need the owner's approval.
- About is a character sheet (`ProfileCard.tsx`): photo (`public/assets/avatar.png`), active gig, facts, and tabs for Bio, Attributes, Cyberware, and Affiliations. Tabs support arrow, Home, and End keys; below 768px the panels stack without tabs.
- Projects is an overlapping dossier fan (`DossierFan.tsx`) at 1024px and wider: rotated case files lift on hover or focus and open into a modal with the full write-up. Escape closes it and focus returns to the card. Below 1024px, and with reduced motion, the files render as a plain stack with everything inline. A third "Classified" card is a draft placeholder.
- Experience is a set of access badges on a lanyard line (`AccessBadge.tsx`). OPS is the active badge; leadership is two affiliation badges, AWS first. The OPS "upcoming" stub and the unconfirmed "three of us" bullet were removed.
- Section headings decode when they scroll into view. Cards rise in with CSS scroll-driven animation, starting partially visible, and only when supported and motion is allowed.
- The hero tagline now reads from `HERO_TAGLINE`, which is also a draft.
- Verified: build, lint, and command checks pass. Headless Chrome at 375, 768, 1024, and 1440px showed no horizontal overflow and no console errors. The dialog focus trap, Escape, focus return, profile tab keys, rail commands (`projects`, `exp`, `03`, `off_grid`), and the reduced-motion fallback all behaved correctly. Trackpad feel, real-device contrast, and Lighthouse were not measured.

## Third pass (September 30, 2026)

- Hero: city brightened (64% instead of 32%), content vertically centered with the instrument strip in view, a tighter tagline, a one-line factual intro, and an "Active gig" ID chip at 1024px and wider that jumps to the profile.
- Experience: replaced the access badges with a journal-style gig log (`GigJournal.tsx`), with a vertical tab list, objectives, outcomes, and stack. Arrow, Home, and End keys work. Below 900px each gig is a stacked card.
- Leadership: its own section (`sections/Leadership.tsx`, `content/leadership.ts`) and rail sector `07`. Each group has outcomes, what I did, and "What I took from it" (drafts).
- Projects: the case-file modal is now a large document with the build, why I built it, key decisions, what I learned, and a sticky outcomes/stack aside. It is used at every width, so mobile cards stay short. Why and learned lines, and decision reasoning, are drafts pending Bilal's answers.
- Stack: groups follow the resume (adds Python, HTML, CSS, .NET, ASP.NET, CloudWatch, GCE, VS Code). A "shipped with" block maps skills to the jobs and projects that used them.
- Contact: rebuilt as a left-aligned holocall card with the photo, availability, a short pitch, and email/LinkedIn/GitHub/resume rows. The footer strip was restyled.
- Off the clock: the accordion was replaced by a bento grid. Photo tiles for the cat and games; designed tiles (icon, system diagram, topographic pattern) for the rest. Each tile accepts an `img` path.
- Verified with headless Chrome at 375, 768, 1024, and 1440px: no overflow or page errors, modal focus trap and return, gig tab keys, and rail commands `lead`, `07`, `exp`. Build, lint, and command checks pass.

## Recommended implementation sequence

| Phase | Work | Files likely affected | Reviewable result |
| --- | --- | --- | --- |
| 1. Content | Reconcile resume facts, remove unconfirmed anecdotes/metrics, draft About and project text. Update OPS/skills if included in scope. | `sections/About.tsx`, `sections/Projects.tsx`; optionally `Experience.tsx`, `Skills.tsx`, `Hero.tsx`, `Contact.tsx`, `index.html` | A complete copy pass with outcomes tied to actual contributions. |
| 2. Structure | Apply the selected section order and align navigation; preserve anchor IDs and numeric command aliases. | `App.tsx`, `constants/sectors.ts`; optionally `SectorRail.tsx` | The visitor reaches a brief introduction and project evidence without crossing a long experience section. |
| 3. Project stack | Replace the horizontal pinned track with normal-flow articles. Reuse screenshots and URLs, make layouts responsive, remove obsolete pan measurements and CSS. | `sections/Projects.tsx`, scoped rules in `index.css` | Both projects can be read with normal vertical scrolling at every breakpoint. |
| 4. About and rhythm | Replace the manifesto layout, introduce scoped type/spacing rules, improve essential text contrast. | `sections/About.tsx`, scoped rules in `index.css`; font loading if needed | A compact connected introduction with facts grouped together. |
| 5. Optional shared UI | If selected, give navigation visible labels, make scrolling native, clarify hero/contact text, reduce decorative competition. | `SectorRail.tsx`, `App.tsx`, `Hero.tsx`, `HudStrip.tsx`, `Contact.tsx`, `index.css` | Faster orientation and consistent navigation without losing the cyberpunk frame. |
| 6. Finish | Check the resume download against the updated source, optimize project imagery without losing readable screenshots, prepare metadata/skip link where appropriate. | `public/assets`, `Hero.tsx`, `index.html`, `App.tsx` | Reliable document access, clearer sharing preview, and complete keyboard entry. |
| 7. Verify | Run existing checks and inspect desktop/mobile behavior and reduced motion. | Existing checks; targeted fixes in modified files | Verified screenshots and a concise implementation report. |

Work in the existing React 19, TypeScript, Vite, Tailwind v4, Framer Motion, and Lucide stack. No framework migration or new animation library is needed. Remove Lenis usage only if the selected scroll approach makes it unnecessary; remove the dependency separately after confirming no remaining imports.

## Scope safeguards

- Keep Off the Clock's content, image accordion, and interaction design intact. Inspect it after shared styles change.
- Preserve the wordmark asset and recognizable palette.
- Keep existing project URLs until replacements are verified. Do not fabricate source repository links.
- Preserve `#about`, `#projects`, and other element IDs. Keep numeric command mappings stable unless renumbering is explicitly chosen.
- Keep focus rings, keyboard commands, image alternatives, and reduced-motion behavior.
- Treat the Markdown resume as the current content source. Do not silently replace the PDF download with Markdown or regenerate a resume as part of styling work.
- Make the first implementation review focus on structure, About, and projects. Broader section changes depend on the owner's scope answer.

## Verification and acceptance

### Automated checks

Run `npm.cmd run build`, `npm.cmd run lint`, and `npm.cmd run check` after the integrated changes. Existing baseline checks passed during the audit. Add tests only if command behavior or another functional contract changes; do not write snapshots merely to mirror styling.

### Browser checks

Inspect at 375px, 768px, 1024px, and 1440px, plus a short desktop viewport. Check ordinary wheel scrolling, trackpad scrolling, Page Down, keyboard tab order, direct hash entry, and back-to-top. Verify 200% zoom, visible focus, and essential text contrast on actual backgrounds.

Confirm these existing commands still work: `projects`, `3`, `:3`, `03`, `exp`, `off_grid`, `stack --all`, `stack --filter java`, `clear`, and `help`. If numeric aliases are intentionally changed, update the command checks and documented behavior together.

Check reduced-motion preference, first-visit/repeat-visit boot behavior, screenshots loading or failing, live-link destinations, resume download, contact copy feedback, and Off the Clock. Verify any navigation active-state observer still works for sections taller than the viewport. Do not treat build success as proof of these behaviors.

Measure Lighthouse/Core Web Vitals in a browser when available. Targets: LCP under 2.5 seconds, CLS under 0.1, and INP under 200ms when field data or an appropriate interaction measurement is available. Report measured results separately from design targets.

### Acceptance criteria

- Normal downward scrolling reveals every project; no forced sideways travel or overlapping cards conceal information.
- About introduces Bilal using connected, resume-supported copy and at most a few supporting facts.
- The selected section order and navigation agree.
- OPS is presented with the current resume's substance if Experience enters scope.
- Important labels are readable; dim text is decorative only.
- The wordmark, dark city palette, chamfers, and terminal cues still identify the site as cyberpunk.
- Off the Clock remains intact.
- Claims and availability are confirmed or omitted; the downloadable resume's contents are verified before release.
- Automated checks pass and desktop/mobile/reduced-motion visual checks are documented.

## Current limitations

The audit verified code and build behavior, not rendered UI. Browser inventory was empty, so visual QA must happen during implementation with a connected browser. The existing PDF resume and external project destinations were not inspected. No redesign should be described as visually finished until those checks are performed.
