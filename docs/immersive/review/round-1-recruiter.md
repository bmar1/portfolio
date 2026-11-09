# Recruiter-persona review, round 1

*Reviewed as: a time-pressed recruiter/hiring manager with 60-90 seconds, screening for a co-op/new-grad SWE role. Not a Cyberpunk 2077 fan. Scrolling, not hunting for easter eggs.*

## Scores (1-10, 10 = best; 10 = "I have everything I need in under 90 seconds and enjoyed the trip")

| Direction | Time-to-identity | Time-to-first-project-proof | Time-to-contact | Recruiter Mode quality | Overall score |
|---|---|---|---|---|---|
| main | 8 (stop00 desktop is a boot animation with no facts; stop00 mobile has name+status+resume instantly) | 9 (stop02, Plated/Nest cards with real numbers) | 4 (no email/resume CTA found in the 0-90% scroll range on desktop; mobile has a Resume button at stop00 but no visible email) | n/a | 7 |
| braindance | 9 (stop00, name+status+resume button+recruiter-mode pill, all on screen at once) | 8 (stop01 desktop/mobile, Sikh Sparks & Liza Bilal numbers; stop02-03 for Plated/Nest) | 7 (Resume download at stop00; no email link seen in scroll, but resume alone covers most recruiter needs) | 9 (clean, complete, fast) | 8 |
| metro | 10 (stop00, name+status+two CTAs, plus a left-rail table of contents that previews the whole page) | 9 (stop02, Sikh Sparks/Liza Bilal numbers with real tech chips in a clean table) | 6 (Resume button at stop00; dedicated "06 END OF LINE" section implies an email CTA but it's past the 90%-scroll screenshot range, so not confirmed in-budget) | 9 (identical content to braindance, same quality) | 9 |
| breach | 3 (stop00 is a pure hacking-animation with zero name/role text, on both desktop and mobile; identity doesn't appear until mid-way through stop01) | 7 (stop01-02, "ACTIVE_PROCESSES"/"UPLOAD_LOG" sections have real numbers once you get past the jargon) | 6 (Resume presumably reachable the same way as the others, but not visible in the captured stops; also title text clips off-screen on mobile) | 9 (identical dialog content, equally good) | 6 |

## Per-direction walkthrough

### main

- **Desktop stop00 (0%):** A boot-sequence animation — "NC // NEURAL INTERFACE," a big glowing "BILAL UMAR," and a fake loading bar reading "100%." No role, no status, no CTA. If this is genuinely the first thing rendered (not an animation frame caught mid-flight), a recruiter sees a name and nothing else for the first screen. Mildly concerning but not fatal — it's short.
- **Desktop stop01 (18%):** This is where it pays off. A sidebar card ("ACTIVE 616 / Ontario Public Service · Software Developer Co-op," Toronto, Seneca, Aug 2027 grad) sits next to a tabbed bio panel with "Life Path: Streetkid → Corpo co-op" and plain-language bio text. By 18% scroll I know who this is, what they do, where they study, and when they graduate. Good.
- **Desktop stop02 (36%):** "Selected projects" — Plated (100+ people, 400+ recipes), Nest (150+ searches, 140+ results/search), and a "Classified" WIP card. Real numbers, real outcomes, immediately. This is the strongest project-proof moment of all four directions, this early.
- **Desktop stop03 (54%):** Experience timeline and leadership cards (AWS Student Builder Groups 75+/8+, GDG 120+/3+). Good supporting detail but by now I already have what I need.
- **Desktop stop04 (72%):** A `stack --all` terminal pseudo-prompt listing languages/frameworks/cloud/data tools. Useful and complete, but this is the *only* place I found a consolidated stack list on desktop main, and it's 72% down the page — later than I'd like for a hiring manager who stack-matches.
- **Desktop stop05 (90%):** "Off the clock" (gym, cat, trails, games). Pleasant, irrelevant to the hiring decision, and by this point I still have not seen an email address or a persistent "contact" CTA anywhere in the captured range.
- **Mobile stop00 (0%):** Completely different and much stronger: "ONLINE // TORONTO // OPEN FOR WINTER '27," name, tagline, one-line status + study info, and two buttons — "VIEW WORK" and "RESUME" — all in the first screen. This is the best single screenshot across all 8 route×viewport combinations for this persona. The desktop hero should look like this.
- **Mobile stop01-02:** Attributes/cyberware chips (stack!) and affiliations show up fast, then Classified/Infotech/experience. Efficient.
- **Mobile stop05 (90%):** Still "Off the clock" hobby content, still no visible email/contact link in the captured range.

**Reaction:** Mobile main nails the brief almost immediately. Desktop main buries the hero fact-sheet one scroll below a content-free boot animation, and never surfaces a contact method (email or persistent "Resume" link) within the 90%-scroll budget on either viewport — everything assumes a recruiter will keep scrolling past the hobby section or go hunting for a footer.

### braindance

- **Desktop & mobile stop00 (0%):** Name, status line ("Ontario Public Service · Software Developer Co-op"), a one-sentence pitch, a green "VIEW THE RECORDING" CTA, a "DOWNLOAD RESUME" button, and the yellow "Recruiter mode" pill all visible at once, no scrolling needed. This is the fastest, most complete single screen of any route for identity + contact.
- **Desktop stop01 (18%):** Two experience "recordings" side by side (Sikh Sparks, Liza Bilal Enterprise) with real metrics (100+ orgs, 60% faster publishing; 200+ users, 22% faster load). Problem: the two-column layout overflows the viewport — the left card's text is cut off at the left edge ("...platform." with no visible subject) and the right card's text is cut off at the right edge ("...the inter[nal]"). Readable info is there, but the framing is visibly broken on desktop.
- **Desktop stop02 (36%):** Plated project card — but the "DECISIONS / OUTCOMES" labels, the "100+ 400+ 86%" numbers, and a paragraph of body text are visually overlapping/stacked on top of each other. This is a legibility bug, not a style choice — numbers run through sentences.
- **Desktop stop03 (54%):** Nest project, clean this time — screenshot, two decision call-outs, readable.
- **Desktop stop04-05 (72-90%):** Leadership split-bar (AWS 75+/8+, GDG 120+/3+) and a "What I value" fragment. No stack chip list and no email/contact link surfaced in this desktop range outside the stop00 Resume button.
- **Mobile:** stop00 matches desktop (name/status/resume/recruiter-mode). stop01 has a text-overflow issue — a bullet about the Ontario Public Service AI workflow runs off the right edge of the viewport, partially obscured by the floating "Recruiter mode" button. stop03 cleanly shows Plated's outcomes (100+, 400+, 86%) and a full tech-chip row (Java, Spring Boot, React, AWS EC2, RDS, CloudWatch, Docker, JUnit, Mockito) — this is where stack actually becomes legible on mobile, and it's good once you reach it.

**Reaction:** The opening screen is excellent — best-in-class for this persona's top priority (identity + resume, instantly). The middle of the scroll has two concrete overlap/clipping bugs on desktop (stop01 two-column text clipping, stop02 overlapping numbers/text on Plated) that would look broken to anyone reviewing on a laptop, even though the underlying facts are all correct and present.

### metro

- **Desktop & mobile stop00 (0%):** A left-rail "subway map" table of contents (00 Bilal Umar → 06 End of Line) plus name, status, "VIEW THE WORK" and "RESUME" buttons, and "PRESS R FOR RECRUITER MODE" spelled out in plain text at the bottom-left. This is the only route that tells you Recruiter Mode exists without relying on you noticing a floating pill — a real accessibility/discoverability win.
- **Desktop stop01 (18%):** "Who I Am" bio in plain English, immediately followed by a "Current Service" table (styled like a transit departures board) listing Infotech (incoming, Winter 2027) and Ontario Public Service (boarding now, Fall 2026) with plain status chips ("INCOMING," "BOARDING NOW"). The transit metaphor is decorative, not obstructive — every fact is still in plain words right next to the metaphor.
- **Desktop stop02 (36%):** Sikh Sparks and Liza Bilal rows with full metrics (100+ orgs/60%/200+ msgs; 200+ users/22%/2+ hrs) and visible tech chips per row. Then "Cargo / Projects" begins with Plated, full contribution paragraph and screenshot.
- **Desktop stop03 (54%):** Nest card — fully legible, numbers (150+, 140+, <30s) and a 6-item tech-chip row, side-by-side with a screenshot, no overlap or clipping.
- **Desktop stop04 (72%):** "Interchange" — a two-line convergence chart (AWS Student Builder Groups vs GDG) meeting at "Seneca Central." It's a bit of an unnecessary visual metaphor for two bullet lists, but the numbers and bullets underneath are still plainly stated.
- **Desktop stop05 (90%):** "What I Value" cards, clean, then "06 End of Line" teased at the bottom (likely the contact section, just past the 90% capture).
- **Mobile:** Same structure, same clarity, no clipping or overlap bugs found in any captured stop.

**Reaction:** This is the only lab direction with zero legibility bugs across all 12 captured screenshots (6 stops × 2 viewports). The subway metaphor stays decorative — it never replaces a plain-English label, every section header has a plain-English subtitle, and the left rail doubles as a progress map so a recruiter always knows how much is left. It also explicitly tells you "R" exists instead of relying on a floating pill.

### breach

- **Desktop & mobile stop00 (0%):** "BREACH.NAV" toggle top-left, "> INITIATING BREACH SEQUENCE... > BYPASSING ICE," and a row of blinking hex codes with a loading bar. That's it. No name, no role, no status, no CTA, on either viewport. A recruiter's first 5-10 seconds here produce zero information. This is the weakest opening screen of the four directions for this persona.
- **Desktop stop01 (18%):** Catches the tail end of the bio ("...breaks at 2am" / "Too many hours in Cyberpunk 2077...") — so identity actually lands somewhere between 0-18%, but it's a trailing fragment, not a clean intro. Then "ACTIVE_PROCESSES" (jobs-as-processes metaphor) immediately followed by "Software Developer Co-op / Ontario Public Service," a plain description, and a 120+ users stat with tech chips. Once you're past the cold open, this section is actually clear.
- **Mobile stop01:** Same content, but the "ACTIVE_PROCESSI..." headline is clipped off the right edge of the viewport — a straightforward horizontal-overflow bug, not a style choice.
- **Desktop stop02-03 (36-54%):** "UPLOAD_LOG" → "DAEMON_01: PLATED," "DAEMON_02: NEST." The "daemon" jargon is immediately paired with the real project name and a plain description in the very next line, so the facts don't actually get lost — but it is one more layer of translation a tired reader has to do before reaching the number they want.
- **Desktop stop03 (54%):** Right edge of the Classified card is visibly cropped at the viewport boundary ("ENCRY[PTED]" cut off) — another horizontal-overflow instance.
- **Desktop/mobile stop04 (72%):** Leadership numbers — and here mobile shows GDG attendance as "37+" where desktop and every other route show "120+." This reads like a count-up animation caught mid-tween rather than a different number, but if a recruiter screenshots or skims quickly at exactly this scroll position, they get a materially different (and wrong) stat.
- **Stop05 (90%):** "QUICKHACKS" (values), same content as the other two lab routes, fine once you're used to the jargon layer.

**Reaction:** Breach is the most heavily "in-character" direction and it shows: it is the only direction where the very first screen gives a time-pressed reviewer literally nothing to work with, the only one with a mid-scroll data discrepancy (37+ vs 120+), and the only one with two separate horizontal-clipping instances in the captured stops.

## Things that would make a real recruiter bounce

**main**
- Desktop hero (stop00) is a content-free boot animation; the fact sheet is one full scroll below it.
- No email address or visible "Contact" CTA found anywhere in the 0-90% scroll range on either viewport (resume button exists on mobile only, at stop00).
- Consolidated stack list only appears at 72% scroll depth (desktop) — too late for someone keyword-scanning for a specific technology.

**braindance**
- Desktop stop01: two-column experience cards clip text at both the left and right edges of the viewport — sentences are cut off mid-word.
- Desktop stop02: numbers ("100+," "400+," "86%") visually overlap body paragraph text on the Plated card — this reads as a rendering bug, not a design choice.
- Mobile stop01: a bullet point runs off the right edge of the screen, partially hidden behind the floating "Recruiter mode" pill.
- No email link visible in the scroll range; only the resume download at stop00.

**metro**
- No hard bounce triggers found in the captured range. Minor: the "Interchange" convergence-chart metaphor (stop04) is visual flourish around content that would be equally clear as two plain bullet lists — low risk, but it's the one spot where the metaphor does more work than the facts need.

**breach**
- Stop00 (0% scroll, both viewports) shows zero identifying information — just a hacking-sequence animation. A recruiter who gives a page "one screen's worth of patience" before deciding whether to keep scrolling gets nothing to go on here.
- Mobile stop01: "ACTIVE_PROCESSES" headline is clipped by the viewport edge.
- Desktop stop03: "Classified" card's "ENCRYPTED" label is cropped at the viewport edge.
- Mobile stop04 shows "37+" GDG attendees vs. "120+" everywhere else — a mid-animation number that could read as a factual inconsistency if captured or skimmed at the wrong instant.
- The "daemon"/"upload_log"/"quickhacks" vocabulary layer is always paired with the plain term and description right next to it, so it doesn't hide facts — but it does add a half-beat of decoding before every section, which compounds with the cold open as a "work to extract the facts" problem.

## Is "Recruiter Mode" (press R) actually good enough to replace the full scroll for a time-pressed reviewer?

Tested live with Playwright on all three lab routes (`braindance`, `metro`, `breach`) by navigating to each route and pressing `R`. All three render the **exact same content** (they share one `RecruiterLane` component and one `storySpine` data source), and it is genuinely good: name, current role + org + one-line summary, an "Impact" list (120+ Ministry of Finance users, 100+ Plated users, 150+ Nest searches), a 10-item "Stack" chip list (Java, Spring Boot, React, AWS EC2, RDS, CloudWatch, Docker, JUnit, Mockito, RabbitMQ), a "Projects" list (Plated, Nest with one-line purpose each), a "Download resume" button, a direct `mailto:` link with the email address spelled out, and a "Back to the main site" link — all on one static screen, no scrolling. This is close to a perfect answer to the stated brief (role/impact/stack/contact/resume in one screen) and it would absolutely satisfy this persona in under 30 seconds, for braindance, metro, and breach alike.

Two real gaps, found via automated testing rather than screenshots:
1. **No focus trap.** With the dialog open, repeatedly pressing Tab moves keyboard focus *out of the visible modal and into the hidden page behind it* (the left nav links, then the hero CTAs) — confirmed on `/metro` via Playwright. A keyboard-only user who opens Recruiter Mode and then tries to Tab through it will lose track of where their focus went, since the modal is visually on top but not keyboard-isolated.
2. **Discoverability is inconsistent.** `metro`'s hero explicitly prints "PRESS R FOR RECRUITER MODE" in plain text. `braindance` and `breach` only show a small floating yellow pill labeled "Recruiter mode" with no hint that a keyboard shortcut exists — a mouse-less user has to either stumble onto `R` by chance or notice and click the pill.

`main` has no Recruiter Mode at all (`n/a` in the scores table, as expected) — a time-pressed recruiter on `main` has no escape hatch and must rely on the hero (strong on mobile, weak on desktop) and manual scrolling.

Keyboard-only Tab navigation on `/metro` (tested, not just reasoned through code) moved cleanly through the left-rail section links, then the hero's two CTA buttons, then at least two "VISIT STOP" project links deep in the page, eventually reaching an "EMAIL ME" button — nothing was a dead end or unreachable by keyboard, which is a genuine plus for the site's base navigation (separate from the Recruiter Mode focus-trap issue above).

## If you had to pick the direction most likely to not cost this person an interview

**Metro.** It is the only direction with a legible, complete, bug-free first screen on both desktop and mobile (name, status, two clear CTAs, and a literal "press R" hint), the only one where every section header pairs its metaphor with a plain-English subtitle so nothing requires decoding, and the only one of the four directions with zero clipping/overlap bugs across all 12 captured screenshots. Its project and experience sections put real numbers and tech stacks in a clean table format that a recruiter can keyword-scan in seconds, not a sentence they have to parse out of a paragraph. Braindance is a close second on raw speed (its opening screen is arguably even faster to read than metro's), but it loses points to two visible rendering bugs (overlapping numbers on Plated, clipped text in the two-column experience cards) that metro simply doesn't have. Main and breach both have a real chance of losing this recruiter before they get the full picture — main because its desktop hero shows nothing and contact is never surfaced in-budget, breach because its first screen is a content-free animation and its vocabulary layer, while not fatal, adds friction exactly where speed matters most.
