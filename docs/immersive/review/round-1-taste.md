# Taste review, round 1

## Scores (1-10, 10 = best)

| Direction | Score | One-line verdict |
|---|---|---|
| main (current site) | 7 | Competent, consistent Kitsch cyberpunk baseline with one shared-content em-dash slip; the bar the others need to clear. |
| braindance | 5 | Strongest concept (cinematic recovered-footage framing) but the pinned crossfade visibly double-exposes text and a banned filled-track bar shows up in Factions. |
| metro | 8 | Most intentional and best-organized of the four; the transit metaphor is followed all the way down to status pills and the interchange line-chart, with only cosmetic nits left. |
| breach | 5.5 | Best single new visual idea (the sunburst reach graph), but undercut by a nav pill that overlaps headlines everywhere, a mobile headline that gets clipped, and a resume stat that can render as the wrong number. |

## Per-direction findings

### braindance

- **Strongest moment:** the hero's "recovered footage" framing (`REC 00:00:00 PLAYBACK HEAD ACTIVE`, green phosphor monospace, muted off-black) is a genuinely distinct, non-generic take on the brief, and the five-stage pinned scene concept (purpose → contribution → decisions → outcomes → stack) is a real storytelling device, not decoration for its own sake.
- **Pre-Flight Check violations found:**
  - **Section 5.A / "Motion claimed, motion shown" (broken execution):** `braindance__desktop__02.png` shows two stages of the pinned crossfade visibly superimposed ("DECISIONS / OUTCOMES / Treat deployments as the product" ghosted over "100+ 400+ 86% / hardest challenge... I wired Docker"). This isn't a lucky-screenshot fluke: `Recordings.tsx` lines 38-53 scrubs 5 stages across only `stages.length * 480` px of scroll (≈2400px total, ~480px per stage) with `scrub: 1` easing, which means a normal fast scroll or trackpad flick will land inside a crossfade window often enough that users will see this same double-exposure live, not just in a mid-scrub screenshot.
  - **Section 9.F, "no scoring/progress bars with filled background tracks":** `braindance__desktop__04.png` (Factions/Interchange section) renders AWS-vs-GDG as a single horizontal bar with a filled green segment against a grey background track — exactly the banned comparison-bar pattern. Metro's equivalent section (converging line chart) solves the same comparison without this.
  - **Section 9.G, em-dash ban:** `src/content/leadership.ts:36` — "constant communication — and tying each session back..." renders verbatim in `braindance__desktop__04.png`. (Shared content file, so this also hits main/metro/breach equally; see Head-to-head.)
  - **Mobile floating-element overlap (Section 6.F / general readability):** `src/experiences/shared/recruiter-lane.css` fixes the "Recruiter mode" pill at `right/bottom: 1.25rem` with no scroll-aware dismissal or safe-area handling. On mobile it sits directly on top of body copy in `braindance__mobile__02.png`, `__03.png`, `__04.png`, and `__05.png` — not a one-off, it recurs at every scroll depth captured.
  - `braindance__mobile__04.png`'s "NO SIGNAL" classified placeholder is an intentional, on-brand design choice (confirmed in `Recordings.tsx`'s `ClassifiedCard`), not a bug — no violation there, just flagging it was investigated.
- **Concrete fixes, prioritized:**
  - P0: Fix the Recordings pin/scrub so stage N+1 doesn't become visible until stage N has fully faded (increase per-stage scroll distance, or snap crossfade progress instead of raw scrub, or use GSAP's `toggleActions` boundaries instead of a single shared scrub timeline).
  - P0: Reposition or auto-collapse the recruiter-mode pill on mobile (e.g., shrink to icon-only after first scroll, or move to a non-overlapping position) so it stops sitting over paragraph text.
  - P1: Replace the Factions comparison bar with a non-filled-track visual (ticks, two aligned number columns, or metro's converging-lines pattern).
  - P1: Strip em-dashes from shared content (`leadership.ts`, `experience.ts`, `projects.ts`) — fixes all four routes at once.

### metro

- **Strongest moment:** the "Interchange" section (`metro__desktop__04.png`) — two converging/diverging line charts meeting at "SENECA CENTRAL" to visualize two leadership roles sharing a root — is a genuinely novel, on-theme data visualization. It is exactly the kind of thing Section 10 of the skill wants (a named pattern reached for deliberately) rather than a bento grid with icons.
- **Pre-Flight Check violations found:**
  - **Section 9.G, em-dash/en-dash ban:** `src/content/leadership.ts:56` — "Delivering events is one thing. Making them understandable for everyone in the room — not just people who already know the stack — is the hard part." uses two em-dashes, visible in `metro__desktop__04.png`'s italic pull-quote. Same shared-content issue as braindance.
  - **Eyebrow restraint (Section 4.7):** `metro__desktop__05.png` ("What I Value") repeats the identical eyebrow label `SERVICE ANNOUNCEMENT` on all four cards in the same section. The rule caps eyebrow *count per page*, but four identical, mechanically-stamped labels in one section reads just as templated as the thing the rule is trying to prevent — it adds nothing the card title doesn't already say.
  - **Content correctness concern (not a skill rule, but worth flagging):** `metro__mobile__01.png` shows a stat "120+ / MINISTRY OF FINANCE USERS" attached to the Ontario Public Service role, which is tagged "BOARDING NOW" / Fall 2026 and described as "Getting a ministry's ticketing system off a vendor-locked platform" — i.e., a role that is still in progress. Claiming a finished-sounding usage metric for unfinished work is the kind of "fake-precise number" Section 4.9 warns about even though the number itself isn't AI-invented (it traces to `content/experience.ts:45`). Worth double-checking this is real/approved data before shipping.
  - Shares the same floating "Recruiter mode" pill overlap as braindance/breach (`recruiter-lane.css`), visible in `metro__mobile__00.png` through `__05.png` sitting over the bottom status bar / card edges, though it's less disruptive here because Metro's own bottom nav bar is in roughly the same zone, so the overlap reads more like two bottom bars competing than text being covered.
- **Concrete fixes, prioritized:**
  - P1: Strip the em-dashes from `leadership.ts:56` (and the rest of the shared content pass above).
  - P1: Vary or remove the repeated "SERVICE ANNOUNCEMENT" eyebrow in the What I Value cards — drop it entirely, the card titles already carry the meaning.
  - P2: Confirm the "120+ Ministry of Finance users" stat is accurate for a role described as still being set up; if it's aspirational, relabel it as scope rather than usage.
  - P2: Give the shared recruiter pill a metro-aware position (it currently collides visually with Metro's own bottom progress bar).

### breach

- **Strongest moment:** the "Network Reach" sunburst (`breach__desktop__04.png`, `NetworkReach.tsx`) — node density that scales with the real outcome count, animated in via scrub, is a genuinely distinctive replacement for the generic two-card leadership layout every other direction (including main) uses. The accordion-style "Active Processes" table for jobs is also a nice fit for the OS metaphor.
- **Pre-Flight Check violations found:**
  - **Persistent overlap bug (general UI correctness):** `src/experiences/breach/components/HexNav.module.css` fixes `.toggle` at `top: 1.25rem; left: 1.25rem; z-index: 9000` with no scroll-position awareness. It visibly sits on top of headline/body text in `breach__mobile__01.png` (covers "...Software Developer / op"), `__02.png`, `__03.png`, `__04.png`, `__05.png`, and `breach__desktop__01.png`. This is the single most visible bug in the set — it happens at every scroll depth, both viewports.
  - **Mobile text clipping:** `breach__mobile__01.png` shows the section heading rendering as "ACTIVE_PROCESSI" — the word is cut off at the right edge of the viewport. Root cause in code: `breach.css:33` sets `overflow-x: hidden` on the root, and the mobile `.breach-h2` override (`breach.css:202-204`, `clamp(1.75rem, 8vw, 2.25rem)`) has no `overflow-wrap`/`word-break` safeguard for a 16-character all-caps word in a wide display font (Unbounded, bold). The overflow is silently clipped instead of wrapping.
  - **Credibility-risk on a scrub-tied counter:** `breach__mobile__04.png` shows "Google Developer Groups / 37+ / ATTENDEES A TERM" where every other route (and `leadership.ts:47`) says 120+. This is not a data bug — `NetworkReach.tsx:62-76` deliberately ticks the number up from 0 to `target` as the user scrolls through the sunburst's scrub window — but it means a resume-credibility number can display an incomplete, wrong-looking value if the page is viewed, captured, or deep-linked at a non-settled scroll position. Tying a trust-bearing stat directly to scroll scrub (rather than, say, triggering the full count-up once on entry) is fragile for exactly the kind of number a recruiter is supposed to take at face value.
  - **Eyebrow overload (Section 4.7, mechanical count):** counting `uppercase tracking`-style micro-labels across the page: hero's `BREACH.NAV` chip + `INITIATING BREACH SEQUENCE`, `TOP -0 PID` (Active Processes), `RUN ./UPLOAD_LOG` plus three sub-eyebrows `UPLOAD_LOG // DAEMON_01/02/03` (one per project), `SCAN --REACH` (Network Reach), `QUICKHACKS --LIST` (Quickhacks). With roughly 6 sections, the rule caps eyebrows at `ceil(6/3) = 2`; Breach runs closer to 7-8 distinct eyebrow-style labels. The terminal/command-line conceit makes each individual label feel in-theme, but stacked together across every section it reads as the same templated rhythm the rule exists to catch, just reskinned in mono.
- **Concrete fixes, prioritized:**
  - P0: Make `BREACH.NAV` scroll-aware (shrink to just the key-hint after the first scroll, or move off the content column, or give it a solid non-transparent backdrop sized to never sit over a headline).
  - P0: Add `overflow-wrap: break-word` (or reduce the mobile floor size further / allow 2-line wrap) to `.breach-h2` so headlines never get silently clipped.
  - P1: Decouple the Network Reach counter's final value from scrub position — count up to completion once the section is in view (`whileInView`/`toggleActions: "play none none none"`) rather than binding the displayed number directly to scroll progress.
  - P2: Cut at least half the eyebrow-style labels (the per-project `UPLOAD_LOG // DAEMON_0X` tags and `SCAN --REACH` are the easiest to drop without losing the OS conceit).

## Head-to-head vs main

**braindance vs main:** Conceptually this is the most ambitious of the three and the hero alone is better than main's — the "recovered footage" framing has a clearer point of view than main's generic neural-interface boot screen. But as shipped, it reads as a regression: a recruiter scrolling at normal speed will likely see the double-exposed text glitch in Recordings, and the banned filled-track comparison bar in Factions looks like an unstyled dashboard widget dropped into an otherwise cinematic page. Fix the pin/scrub timing and this jumps ahead of main; right now it's behind it.

**metro vs main:** This is the one direction that unambiguously reads as more intentional and premium than main. Main's "HUD with tabs" approach is competent but generic-cyberpunk; metro's transit-map structure gives every section a reason to exist in that specific visual language (status pills that mean "incoming/boarding/departed" instead of decorative badges, a line chart that's actually about the content instead of a bento tile). The only things holding it back from a clean win are the two small copy/polish issues above (em-dashes, repeated eyebrow), both trivial to fix.

**breach vs main:** Breach has the single best new component in the whole round (the reach sunburst) and a strong, coherent OS/netrunner voice. But right now it reads as a regression relative to main, not an improvement, because the nav-overlap bug and the mobile headline clipping are the kind of thing a reviewer notices in the first ten seconds, before they ever get to appreciate the sunburst. This is a "great bones, broken execution" direction — the idea is ahead of main, the current build is not.

## If you had to pick one direction to refine further

**Metro.** It is the only direction where the metaphor, the layout, and the content density all pull in the same direction without fighting each other, and its remaining issues are copy-level (em-dashes, one repeated eyebrow label) rather than structural or load-bearing bugs. I'd refine it by porting over breach's two best ideas as enhancements rather than switching lanes: swap metro's current two-card leadership layout for something closer to breach's reach-graph (it would fit the "line/interchange" metaphor even better than breach's own terminal theme does), and consider breach's accordion-style job table as an alternative to metro's current always-expanded service rows if the Current Service section ever gets a fourth or fifth entry. Braindance's crossfade bug and breach's two P0 layout bugs are both fixable, but neither direction currently clears the bar metro is already over.
