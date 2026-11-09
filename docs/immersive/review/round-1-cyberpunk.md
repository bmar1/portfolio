# Cyberpunk authenticity review, round 1

Reviewed against `references/skills/CYBERPUNK-SKILL.md` (the CP2077 UI Art Bible rubric). Screenshots read from `docs/immersive/shots/round-1/` (all desktop stops 00–05 for braindance/metro/breach, spot-checked mobile 00 for all three plus braindance mobile 02). Source read: `braindance.css`, `Hero.module.css`, `Tracks.tsx` (braindance); `metro.module.css`, `stations.ts` (metro); `breach.css`, `Hero.tsx`, `HexNav.tsx` (breach); `shared/RecruiterLane.tsx` + `recruiter-lane.css`.

## Scores (1-10, 10 = best)

| Direction | Intended sub-style | Color/shape/animation law compliance | Specific CP2077 reference fidelity | Overall score | One-line verdict |
|---|---|---|---|---|---|
| braindance | Entropism/Neo-Militarism | 7 | 8 | **7** | Nails the braindance-editor scrubber concept and keeps the palette almost entirely grey/green/red — undercut only by the stock bright-yellow "Recruiter mode" pill that doesn't belong in this world. |
| metro | Neo-Militarism | 8 | 9 | **8** | The most disciplined of the three: red+cyan only, hard/clipped corners, a real departures board and a real line-interchange diagram — this is the strongest, most rule-abiding direction. |
| breach | Neo-Kitsch | 7 | 6 | **7** | Gold+purple-on-near-black and the symmetrical octagon clip-path are textbook Neo-Kitsch; the hex grid is a nav menu wearing Breach Protocol's skin rather than the actual sequence/buffer minigame. |

## Per-direction findings

### braindance

**Where it nails the sub-style**
- `braindance.css` tokens are almost entirely greyscale (`--bd-void:#0a0a0c`, `--bd-surface:#131316`, `--bd-text:#d9d9d4`, `--bd-text-dim:#94949a`) with exactly one accent family reserved for terminal signal (`--bd-green:#3ddc74`) and one reserved for alerts/redaction (`--bd-red:#ff4d58`) — this is the Entropism "one accent maximum" law applied correctly, and the red-for-alerts-only use (the REC dot in `braindance__desktop__00.png`, the "CLASSIFIED" stamp in `braindance__desktop__03.png`) matches the brief's Neo-Militarism cross note.
- Shape law: buttons use a single precise `clip-path` nick (`Hero.module.css` `.primaryCta`), not organic rounding; body copy and cards are square. Scanlines (`.bd-scanlines::after`) and a single fixed grain pass are applied once globally, which matches the skill's CRT/terminal texture guidance for Entropism/hacker contexts.
- CP2077 reference: `Tracks.tsx` is the standout. It's a horizontal scroll-scrubbed timeline literally labeled "Audio, signal density" (a waveform bar row) and "Thermal, track heat" (a heat-fill bar) per role — this is a direct, accurate translation of the game's braindance editor's layered-track scrubber, not a generic "glitchy video" gesture. The `REC 00:00:00 PLAYBACK HEAD ACTIVE` hero chip (`braindance__desktop__00.png`) and the `REC_01`/`REC_02` file tags on project stills (`braindance__desktop__02.png`, `__03.png`) reinforce the recording/playback framing well.

**Where it breaks the sub-style's laws**
- **Color law violation, P0:** the fixed "Recruiter mode" button (bottom-right in every single braindance screenshot, e.g. `braindance__desktop__00.png` through `__05.png`) is hardcoded `background: #fcee0a` in `recruiter-lane.css` — that is the skill's `--nc-yellow`, the Kitsch primary. Entropism's color law is explicit: *"Greyscale only... If you're tempted to add cyan or yellow, you've left Entropism."* This is the single largest authenticity break in the direction, and it's permanently on-screen, not a one-off.
- **Shape law violation, P1:** that same button is `border-radius: 999px` — a full pill. The skill's global rule is explicit: *"`border-radius: 0` always — cyberpunk has no pill buttons."* Entropism additionally mandates "Hard 90-degree corners only. No clip-path." A full pill is the most un-Entropism shape possible.
- **Minor color note, P2:** `--bd-green: #3ddc74` is a fairly saturated mint-green used on a solid-fill CTA (`.primaryCta`, visible as the green "VIEW THE RECORDING" button in `braindance__desktop__00.png`). The skill's Entropism token is `--ent-green-dim: #1A4A1A`, a much darker/dimmer green. The current green reads closer to a healthy terminal green than a "dim" one — not wrong, but push it a shade darker/desaturated to lean harder into "necessity over style."

**Fixes, prioritized**
- P0: Re-skin `RecruiterLane` per-experience (accept a `theme` prop or CSS-variable override) so braindance's trigger uses `--bd-green`/greyscale instead of `#fcee0a`.
- P1: Change `.recruiter-toggle` / `.recruiter-toggle__key` border-radius to `0` (or a small clip-path nick) wherever it renders inside a lab experience; pill shape can stay only on the main Kitsch site where it's on-brand.
- P2: Darken `--bd-green` for large fills; keep the brighter value only for small text/glow accents.

### metro

**Where it nails the sub-style**
- Tokens in `metro.module.css` are a clean, correct implementation of the skill's Neo-Militarism rule set: `--nm-red:#c5003c`, `--nm-red-bright:#ff4a57`, `--nm-grey-cold:#8a9bb0`, `--nc-cyan:#25e1ed` — red primary, cyan complement, cold grey secondary text, and critically **no yellow, no magenta anywhere in the stylesheet**. This is the cleanest color-law compliance of the three directions.
- Shape law: every interactive chip/button uses a single precisely-clipped corner (`clip-path: polygon(0 0, calc(100% - Npx) 0, 100% Npx, 100% 100%, 0 100%)`), diagonal stripe textures (`.stripes`, `.stripesCyan`) are used sparingly on bars, and nothing is organically rounded except small `border-radius: 50%` status dots, which read as indicator lights, not buttons.
- Animation law: hover/active transitions are explicitly 100ms linear (`transition: background 100ms linear...`) throughout — matches the skill's Military = 100ms snap rule exactly, and there's no bounce/playful motion anywhere in the file.
- CP2077 reference: this is the strongest and most specific of the three. The left rail is literally a transit line nav — `NCART · LINE 1 / NIGHT CITY METRO`, stop codes `00`–`06` ("00 BILAL UMAR" ... "06 END OF LINE", from `stations.ts`), a vertical line-rail with lit/unlit stop dots (`metro__desktop__00.png`). The "Current Service" section (`metro__desktop__01.png`/`__02.png`) is a genuine departures board with `STATUS / SERVICE / ROUTE / DEPARTS` columns and live-feeling status chips (`INCOMING`, `BOARDING NOW`, `DEPARTED`) — this is a direct, well-executed NCART schedule-board reference, not just "red UI." The Interchange section (`metro__desktop__04.png`) renders two converging/diverging line paths meeting at a labeled "SENECA CENTRAL" interchange node — an accurate transit-map-diagram translation of two orgs (AWS Student Builder Groups / GDG) crossing at one place.

**Where it breaks the sub-style's laws**
- **Color law violation, P0 (shared with other two):** the same `#fcee0a` yellow pill "Recruiter mode" button sits bottom-right on every metro screenshot (`metro__desktop__00.png`–`__05.png`, `metro__mobile__00.png`). Neo-Militarism's law is explicit: *"No yellow, no magenta."* It's the only color/shape violation in an otherwise disciplined direction, but it's persistent and highly visible (bright yellow against an almost entirely red/black/cyan page reads as an obvious foreign object).
- **Shape law nit, P2:** the departure-board status chips (`INCOMING`, `BOARDING NOW`, `DEPARTED` in `metro__desktop__01.png`/`__02.png`) have a visibly soft corner radius in the screenshot even though `.statusChip` in the CSS has no explicit `border-radius` set (so this may be a rendering/font artifact rather than a true radius) — worth a visual sanity check live, since Neo-Militarism bans organic rounding on panels/chips.
- **UX collision, P1:** on `metro__mobile__00.png` the yellow Recruiter pill sits directly on top of the mobile progress rail / stop label ("00 BILAL UMAR"), partially overlapping it — beyond the style violation this is a layout bug.

**Fixes, prioritized**
- P0: Same fix as braindance — theme the Recruiter button to `--nm-red`/`--nc-cyan` (e.g. red border, transparent fill, clipped corner) instead of hardcoded yellow pill.
- P1: Reposition or reflow the Recruiter button on mobile so it doesn't overlap the bottom progress rail.
- P2: Confirm `.statusChip` renders with zero border-radius in the live DOM (screenshot may just be font rendering).

### breach

**Where it nails the sub-style**
- `breach.css` tokens are a correct, real-material Neo-Kitsch palette: `--nk-gold:#d4af37`, `--nk-gold-bright:#f5d060`, `--nk-purple:#2a1540`, `--nk-purple-bright:#b084e8`, over `--nk-deep:#0a0812` — gold over near-black with purple as the secondary accent, exactly per the skill's color law, and distinct from both main's neon `#fcee0a` and the other two labs' reds/greens.
- Shape law: `.breach-panel` uses a fully symmetrical 8-point clipped-corner polygon (all four corners cut equally via `--nk-corner`), which is precisely what the skill asks for — *"Clipped corners but precise and symmetrical"* — visible as the angular card edges in `breach__desktop__02.png`/`__03.png`.
- Animation law: `.breach-btn` transitions are `350ms` with a custom ease (`--nk-ease: cubic-bezier(0.16, 1, 0.3, 1)`), matching the skill's Neo-Kitsch 300-500ms "slow, deliberate" rule, and `breach-btn--primary:hover` does a gold glow + shimmer rather than a glitch — correct, since "refinement doesn't glitch" is an explicit Neo-Kitsch anti-pattern elsewhere.
- CP2077 reference, partial credit: the hero's "`> INITIATING BREACH SEQUENCE... > BYPASSING ICE`" terminal lines resolving into a row of real hex-pair cells (`5C 6F 16 FE 88 57 9C 22` in `breach__desktop__00.png`, confirmed in `Hero.tsx`'s `FINAL_HEX` array) and the "`ENCRYPTED // ACCESS DENIED`" locked panel (`breach__desktop__04.png`) are specific, accurate CP2077 Breach Protocol vocabulary and visual grammar — much better than a generic "hacker terminal."

**Where it breaks the sub-style's laws / falls short on specificity**
- **Reference fidelity gap, P1:** the actual game mechanic is a grid of hex-pair buttons the player sequence-selects (in order, constrained by a limited buffer) to match a required code and "break" a daemon. `HexNav.tsx` reuses the hex-grid *visual* ("SELECT BUFFER TARGET... Pick a hex pair to jump the cursor to that daemon") but it's a plain click-to-navigate menu — there's no sequence constraint, no buffer limit, no daemon list, no code-matching logic. It's strong flavor/copy but not the minigame itself, so a player who knows Breach Protocol will recognize the words but not feel the puzzle.
- **Color law nit, P2:** the "Recruiter mode" button is still the shared `#fcee0a` plastic yellow pill, not `--nk-gold`. Breach is the one direction where this is *least* jarring (gold family, same visual neighborhood), but it's still the wrong gold — the skill explicitly calls out *"Cheap plastic neons (`--nc-yellow`, `--nc-magenta`) → those are Kitsch, not Neo-Kitsch"* — and it's still a pill, which breaks Neo-Kitsch's "precise and symmetrical" clipped-corner shape law same as the border-radius-0 global rule.
- **Minor animation note, P2:** the hero's hex-scramble intro runs on a fast `60ms` interval before settling — appropriately snappy for a "decrypting" beat, but double check this plays once and doesn't retrigger on scroll-back, since Neo-Kitsch favors "elegant, never frenetic" and a repeating fast scramble could tip that way on revisit.

**Fixes, prioritized**
- P1: Either implement a minimal real sequence/buffer mechanic (click hexes in the order shown to "unlock" the nav, 3-5 step sequence with a visible buffer track) or soften the copy so it doesn't over-promise a mechanic that isn't there (e.g. drop "SELECT BUFFER TARGET" for something that doesn't imply a puzzle).
- P2: Theme the Recruiter button to `--nk-gold` + the shared clipped-corner shape instead of the generic yellow pill.
- P2: Verify the hex-scramble intro is a true one-shot per the code (`revealed` state) and doesn't refire oddly on fast scroll.

## Does any direction accidentally re-create main's Kitsch look?

Not structurally — all three labs keep distinct, correctly-scoped CSS custom-property namespaces (`.braindance-root`, `.metroRoot`, `.breach-root`) and none of them use main's yellow+magenta pairing as their primary palette. Breach's gold is the closest neighbor to main's yellow in hue family, but it's a materially different, desaturated color (`#d4af37` vs `#fcee0a`) paired with purple instead of magenta, so it stays on the Neo-Kitsch side of the line, not Kitsch.

The one real, literal recreation of main's Kitsch yellow is the **shared `RecruiterLane` component** (`src/experiences/shared/recruiter-lane.css`, `#fcee0a`, `border-radius: 999px`): it is pixel-for-pixel main's primary neon, in main's primary shape (full pill), floating over all three labs unmodified. It's a deliberate "theme-neutral" choice per the code comment, but the effect is that Kitsch visually leaks into Entropism (braindance) and Neo-Militarism (metro) on every single screenshot of every single scroll depth. This is worth fixing before a final decision, since it's the most reproducible, most visible authenticity break across the whole round.

## If you had to pick the most authentically "Cyberpunk" direction

**Metro.** It has the cleanest, most law-abiding execution of its assigned sub-style (red+cyan only, hard/clipped corners throughout, 100ms snap transitions, zero yellow/magenta in its own stylesheet) and it pairs that discipline with the most specific, most legible CP2077 reference of the three — a real departures board with transit-style status states and a real line-interchange diagram, not just red paint on a generic layout. Braindance's braindance-editor scrubber (`Tracks.tsx`) is just as conceptually strong and arguably more inventive, but its color discipline is undercut more severely by the shared yellow Recruiter button (a bigger color-law violation for a greyscale-only style than for a red-primary style). Breach has the right palette and shape language but its signature reference — the Breach Protocol grid — is currently closer to themed copy than a felt mechanic. Once the shared Recruiter button is retheme'd per-direction, braindance would be metro's closest competitor.
