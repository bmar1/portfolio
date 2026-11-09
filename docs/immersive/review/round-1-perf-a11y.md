# Performance & accessibility review, round 1

Reviewed repo: `Portfolio-immersive/portfolio-site`. Scope: `src/experiences/braindance`, `src/experiences/metro`, `src/experiences/breach`, plus the shared helpers in `src/experiences/shared/`. The main site (`src/App.tsx`, `src/sections/*`) was out of scope except where it affects a shared file.

## Build/lint status

- `npm run build` — **clean**. `tsc -b && vite build` completed with 0 errors, 2296 modules transformed, all five chunks (`App-*`, `ShaderStage-*`, `LabLauncher-*`, `index-*`) emitted normally.
- `npm run lint` — **clean**. `eslint .` returned 0 errors / 0 warnings.

Both confirmed clean from a fresh run, no regressions from the "last verified clean" baseline.

## Scores (1-10, 10 = best)

| Direction | Reduced-motion compliance | Keyboard/focus a11y | Contrast | Cleanup/leak safety | Mobile fallback coverage | Overall score |
|---|---|---|---|---|---|---|
| braindance | 10 | 7 | 7 | 10 | 9 | **9** |
| metro | 9 | 9 | 6 | 10 | 6 | **8** |
| breach | 9 | 7 | 8 | 9 | 9 | **8** |

Notes on how these were derived are in the per-direction sections below. No direction has a P0 that breaks the *reduced-motion* or *cleanup* contract — the one true P0 (WebGL-failure crash) is shared code (`ShaderStage.tsx`) and affects all three equally, so it isn't double-counted against any single direction's score but is called out explicitly below.

## Per-direction findings

### braindance

- **P0 bugs (real breakage, must fix):**
  - None specific to braindance beyond the shared `ShaderStage` WebGL-failure issue (see "Shared / cross-cutting" below — affects `Hero.tsx` at `src/experiences/braindance/sections/Hero.tsx:28`).

- **P1 issues (should fix):**
  - Micro-label text fails contrast. `--bd-text-mute: #5c5c62` (`src/experiences/braindance/braindance.css:20`) is used for real, readable UI text — `.dates`, `.layerLabel`, `.outcomeLabel`, `.stageKicker`, `.footerNote`, `.captionSource`, `.fragmentNumber`, `.statLabel` (e.g. `Tracks.module.css:117`, `:148`, `:241`; `Recordings.module.css:118`, `:174`; `EndOfPlayback.module.css:11`, `:83`; `Factions.module.css:73`, `:126`, `:149`; `Fragments.module.css:68`) — all at 0.65–0.78rem (≈10.4–12.5px, "normal" size, requires 4.5:1). Measured contrast: `#5c5c62` on `--bd-void #0a0a0c` = **2.98:1**; on `--bd-surface #131316` = **2.79:1**. Both fail WCAG AA (needs 4.5:1 for normal text, and these are below even the 3:1 large-text floor). This is a systemic token choice, not a one-off typo, so fixing the token (lighten to roughly `#7c7c84`+ for ~4.5:1 on void) fixes every usage at once.
  - No custom `:focus-visible` style anywhere in `braindance.css` or any `*.module.css` (confirmed via full-text search — zero `outline`/`:focus` rules in the whole directory). Default browser focus ring still renders (not suppressed), so this is not a hard failure, but several interactive elements sit on clip-path corners or dark chrome (`Hero.module.css:109` `.primaryCta`/`.secondaryCta`) where the default ring may get visually clipped or hard to see against `--bd-void`. Recommend an explicit `:focus-visible` treatment like metro's.

- **P2 nitpicks:**
  - `Factions.tsx` and `Fragments.tsx` gate their entire pinned scene vs. fallback render by `isDesktop && !reduced` computed in JS (`showScene`), rather than relying on a CSS breakpoint toggle like `Tracks`/`Recordings` do. Functionally fine (confirmed both branches render correctly), just an inconsistent pattern within the same directory worth normalizing later.
  - `ScrambleText.tsx` in loop mode (`loop: true`, used for the Classified recording title, `Recordings.tsx:147`) re-renders via `setTimeout` + `requestAnimationFrame` indefinitely for as long as the component is mounted — intentional per the comment, cheap (`setDisplay` on a single short string), not a real leak since it's cleared on unmount, but worth being aware it's a persistent timer for the life of the page once that section exists in the DOM.

**Why braindance scores well:** every pinned/scrubbed scene (`Tracks.tsx:44`, `Recordings.tsx:33`, `Factions.tsx:41`, `Fragments.tsx:32`) checks `reduced` (and `isDesktop` via the shared `useDesktopMedia(768)` hook) before creating any `gsap.context()`/`ScrollTrigger`, and every one of them calls `ctx.revert()` in the effect's cleanup. The 768px breakpoint is applied consistently everywhere (CSS media queries in `Tracks.module.css:38,61`, `Recordings.module.css:50,88,105,219` and the JS hook) — no component relies on "flexbox will probably handle it."

### metro

- **P0 bugs (real breakage, must fix):**
  - None specific to metro beyond the shared `ShaderStage` issue (`src/experiences/metro/components/Hero.tsx:17`).

- **P1 issues (should fix):**
  - Mobile breakpoint is **900px**, not ~768px, for the one layout-critical piece of this direction: the persistent line-nav / mobile rail switch (`metro.module.css:57` `.main { margin-left: 232px }` at `min-width: 900px`; `:300` `.nav { display: flex }` at `min-width: 900px`; `:430` `.mobileRail` hidden at `min-width: 900px`; `:492` `.mobileSheet` hidden at `min-width: 900px`). This *is* an actual mobile branch (not missing), just at the wrong breakpoint per the stated ~768px convention — devices between 768px and 900px (many tablets in portrait, e.g. 820px) get the cramped mobile rail instead of the roomier desktop nav, which is a real UX regression even though nothing is broken outright.
  - Other metro breakpoints are inconsistent across components: `.boardHead`/`.boardRow` (departures board) switch at `760px` (`metro.module.css:634,651`), `.stop`/`.lineDiagram` (Interchange SVG swap) switch at `860px` (`:801,944`), `.groupColumns` at `760px` (`:971`), `.valueGrid` at `720px` (`:1072`). None are "missing" a mobile branch, but the direction uses four different breakpoints (720/760/860/900) instead of one, which will produce visibly misaligned transition zones (e.g. nav still mobile-rail while the departures board has already gone to desktop-grid, between 760–900px).
  - Micro-label contrast failure, same pattern as braindance: `--nm-grey-dim: #5a6578` (`metro.module.css:16`) used for `.navLink` resting state, `.navFootText`, `.boardOutcomeLabel`, `.techChip`, `.groupPlace`, `.valueAnnounce`, `.contactFoot`, `.statusChip.statusDone` (many usages, e.g. `:410,630,771,1011,1101,1172`). Measured: `#5a6578` on `--nc-surface #0b0c12` = **3.31:1**; on `--nc-void #050508` = **3.46:1**. Both fail the 4.5:1 normal-text threshold (these are 0.66–0.82rem, not large text). Notably, `.navLink` is a real navigation link's resting-state color (`metro.module.css:361`), so this is the actual nav text color for every station not yet visited/active — a real, user-facing contrast bug, not just a caption.
  - Body/primary text color (`--nm-grey-cold: #8a9bb0`) is fine — measured **~6.9–7.2:1** against both `--nc-void` and `--nc-surface` — so the core body-copy contrast requirement is met; only the "-dim" micro-label tier fails.

- **P2 nitpicks:**
  - None of metro's GSAP-driven components (`Cargo.tsx`, `Interchange.tsx`) use `pin: true` — they're scroll-triggered reveals/line-draws, not pinned/horizontal scenes. That's an architecturally lighter choice than braindance/breach, which is fine, but it does mean metro's "mobile fallback for pinned/horizontal components" story is really just about the persistent `Nav` (see P1 above), not about multiple pinned scenes degrading.

**Why metro still scores well overall:** `Cargo.tsx:99` and `Interchange.tsx:23` both check `reduced` before building `gsap.context()` and both call `ctx.revert()` on cleanup. `Nav.tsx` and all interactive elements use real `<a>`/`<button>` elements (no click-only `<div>`s anywhere in metro). `metro.module.css:41` defines an explicit, good `:focus-visible { outline: 2px solid var(--nc-cyan); outline-offset: 2px }` globally — the best focus treatment of the three directions.

### breach

- **P0 bugs (real breakage, must fix):**
  - None specific to breach beyond the shared `ShaderStage` issue (`src/experiences/breach/components/Hero.tsx:87`).

- **P1 issues (should fix):**
  - `HexNav.module.css:105-111`: `.cell:focus-visible` sets `outline: none` and relies on the *same* rule block as `.cell:hover` (`background`/`border-color`/`transform: translateY(-2px)`) as the replacement focus indicator. This is a real, if partial, fix — there is a visible state change on focus — but it is shared 1:1 with hover, so a keyboard user tabbing through the hex grid gets no visual cue distinct from "the mouse happens to be over this," and the change (border tint + 2px lift) is subtler than a dedicated focus ring. Recommend adding a distinct `box-shadow`/outline-color specifically for `:focus-visible` on top of the shared hover styling.
  - `breach.css` and the per-component CSS files have **no** `@media (prefers-reduced-motion: reduce)` block at all (confirmed via full-text search — only `HexNav.module.css:154` has one, which just turns off the bottom-sheet slide-in `animation`). Compare to braindance (`braindance.css:117-123`, global transition-duration override) and metro (component-specific override on `.stop`). Breach's hover micro-animations — `breach-btn--primary`/`--ghost` `transform: translateY(-2px)` + box-shadow glow (`breach.css:149,156,167`), `.cell:hover` lift (`HexNav.module.css:106`) — will still animate under OS-level reduced-motion even though all the *scroll* choreography correctly short-circuits via the `useReducedMotion()` JS hook. Low severity (these are small, non-parallax hovers) but it's the one direction that skips the CSS-level defensive layer entirely.

- **P2 nitpicks:**
  - `UploadLog.tsx:124-127`: the `gsap.context()` callback returns an inner cleanup function (`() => { tween.scrollTrigger?.kill(); tween.kill() }`) that is never invoked by anything — `gsap.context()` does not call or store a callback's return value, so this reads as "defensive cleanup" but is dead code. Not a leak in practice because the outer `ctx.revert()` (`:131`) already kills every tween/ScrollTrigger created inside the context, including this one. Harmless, but worth removing so it doesn't look like the actual cleanup mechanism.
  - `NetworkReach.tsx`'s `Cluster` component builds `nodeCount` (14–64) SVG `<circle>`/`<line>` elements per leadership group and animates them all via GSAP stagger on scroll (`:56-65`). Reasonable for 2 groups / max ~64 nodes each, no measured issue, just flagging as the most DOM-heavy animated element in this direction if content ever scales up.

**Why breach still scores competitively:** every pinned/scrubbed/staggered component (`Hero.tsx:38`, `IdentityDaemon.tsx:18`, `ProcessMonitor.tsx:31`, `UploadLog.tsx:103`, `NetworkReach.tsx:43`, `Quickhacks.tsx:24`) checks `reduced` (or the derived `usePan`/`showScene` equivalent) before calling `gsap.context()`, and all of them call `ctx.revert()` on cleanup. All interactive controls — `HexNav` toggle/cells/close, `ProcessMonitor` row expanders, nav/contact links — are real `<button>`/`<a>` elements, so there are zero click-only `<div>`s with no keyboard path anywhere in this direction. `--nk-body #d9d3e4` (body copy) measures **~13.6:1** against `--nk-deep #0a0812`, and even the secondary `--nk-muted #948fa6` label color clears **~6.4:1** — breach has the cleanest contrast profile of the three because it didn't introduce a third, dimmer "-mute"/"-dim" text tier the way braindance and metro did.

## Shared / cross-cutting finding: ShaderStage WebGL failure is a real P0 across all three directions

`src/experiences/shared/ShaderStage.tsx:128-151` creates the `ogl` `Renderer` with no `try`/`catch`:

```130:137:src/experiences/shared/ShaderStage.tsx
    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.5) })
    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    container.appendChild(gl.canvas)
```

`ogl`'s `Renderer` (`node_modules/ogl/src/core/Renderer.js:43-45`) sets `this.gl` by trying `webgl2` then `webgl` via `canvas.getContext(...)`, with no fallback or thrown error of its own — if both return `null` (WebGL fully unavailable: old browser, GPU-disabled/locked-down environment, some automated/sandboxed browsers), `renderer.gl` is `null`, and the very next line (`gl.canvas.style.width = ...`) throws a `TypeError` inside the `useEffect`.

There is **no `ErrorBoundary` anywhere in the app** (confirmed: no matches for `ErrorBoundary`/`componentDidCatch` in `src/`; `main.tsx` renders `<Root />` directly inside `<StrictMode>` with nothing else). An uncaught error thrown during a passive effect's commit phase with no boundary above it will unmount the whole React tree in production — i.e. a user without WebGL doesn't get the documented "static tinted div" fallback at all, they get a blank page, because that fallback path is the `reduced` branch, not a WebGL-capability branch. **`ShaderStage` currently only degrades for `prefers-reduced-motion`, never for "WebGL isn't available."** This is a hard requirement called out in the task brief ("does the component degrade gracefully, or could a WebGL failure break the whole page?") and the honest answer is: it could break the whole page. Recommend wrapping context creation in `try/catch` and falling back to the same static tinted div used for `reduced`, plus (defense in depth) a top-level `ErrorBoundary` around each experience route.

This affects `braindance/sections/Hero.tsx`, `metro/components/Hero.tsx`, and `breach/components/Hero.tsx` identically since all three mount `ShaderStage` the same way. It was not double-counted into each direction's "cleanup/leak safety" score individually since it's a shared-code defect, not a direction-specific regression, but it is the single most important fix across the whole lab wing.

Two secondary, lower-severity `ShaderStage` observations:
- Only the documented variants (`rain`, `dataStream`, `grid`) are actually used anywhere (braindance/metro/breach Heroes respectively); `noise` is defined but unused — no misuse found.
- No `webglcontextlost` listener — if the GPU context is lost mid-session (tab backgrounded too long, driver crash) after a successful initial mount, the render loop will just silently stop updating (no crash, since `requestAnimationFrame` keeps running and `gl` calls on a lost context are no-ops per spec), but there's no recovery/`webglcontextrestored` handling either. Low priority, noting for completeness.

## Console errors found (if any)

Loaded `/`, `/braindance`, `/metro`, `/breach` in fresh Playwright/Chromium contexts and captured all console output:

- `/braindance`, `/metro`, `/breach`: **no real errors.** Only dev-mode noise (Vite HMR connect messages, the React DevTools suggestion). `/braindance` additionally logged four benign Chromium GPU-driver performance warnings (`GL Driver Message ... GPU stall due to ReadPixels`, `GL_CLOSE_PATH_NV`) — this is a known ANGLE/ Chromium software-rendering artifact associated with CSS `clip-path` polygons under headless/SwiftShader rendering, not a JS error, and it self-silenced after four occurrences ("this message will no longer repeat"). Not treated as a bug, but noting in case it recurs more aggressively on real low-end GPUs given how heavily all three directions use `clip-path` for corner-notch styling.
- `/` (main site, out of scope but captured incidentally): logged a Lenis warning — *"Please ensure that the container has a non-static position... to ensure scroll offset is calculated correctly."* This is from the main site's own scroll setup, not from the lab experiences, and per the task scope was not investigated further.
- All four routes: exactly **one `<h1>`** each except `/`, which has **two** (main site, out of scope, flagged only for awareness). No duplicate `id` attributes found on any route.

## If you had to pick the most technically solid direction to ship

**Braindance.** It has the most consistent engineering discipline of the three: one breakpoint (768px) used everywhere via a single shared hook, every pinned/scrubbed scene checks both `reduced` and `isDesktop` before touching GSAP, and every effect cleans up with `ctx.revert()` — zero exceptions found. Its only real weakness is the same contrast-token mistake metro also makes (a "-mute" text tier that dips to ~2.8–3.0:1), which is a one-line token fix, not a structural problem. Breach is close behind — slightly better contrast overall, equally solid cleanup — but its focus-visible treatment is weaker and it skips the CSS-level reduced-motion safety net that both other directions have. Metro has the best focus-ring implementation of the three but loses points for the inconsistent (and sometimes 900px-late) mobile breakpoints on its signature nav, which is the one piece of UI every user touches first. None of the three has a direction-specific P0; the one true P0 (`ShaderStage` crashing on WebGL failure) is shared code and should be fixed once, upstream, regardless of which direction ships.
