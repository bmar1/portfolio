# Portfolio audit

Reviewed: September 30, 2026. Scope: source, content, assets, and build checks. This records the initial baseline; see [PLAN.md](PLAN.md) for the subsequent core implementation.

The portfolio has a recognizable cyberpunk identity. The main problem is that its presentation delays the useful information: an abstract introduction, a long experience section before projects, and a desktop project section that redirects vertical scrolling sideways. Several attempts at casual writing also sound scripted. The updated resume offers better material than the current slogans.

This is a source-based audit. No connected browser was available, so rendered layouts, actual scrolling feel, live project destinations, Lighthouse scores, and mobile screenshots remain unverified. No site implementation was changed.

## Evidence and proposed changes

| Priority | Before | After | Why |
| --- | --- | --- | --- |
| P0 | `Experience.tsx` describes OPS as upcoming and gives it one line. | Give the Fall 2026 OPS role a complete entry with React/ASP.NET ticketing migration and 120+ Ministry of Finance users. | The updated resume documents substantive work there. The site currently underplays the newest experience. |
| P0 | `Projects.tsx` advertises Plated's 90% uptime and Nest's 20% "fewer blowups." | Omit these pending independent confirmation. Use resume-supported outcomes with clear labels. | Neither figure appears in the updated resume. This does not establish that either is false. |
| P0 | About claims Nest's queue was rebuilt twice; Experience describes a team of three shipping in the same week. | Remove or confirm these anecdotes before using them. | The updated resume does not substantiate them. Personality should come from the owner, not invented development stories. |
| P1 | Projects use a `260vh` wrapper, a sticky `h-screen` viewport, and an animated horizontal track at 1024px and above. | Two project articles in normal vertical document flow. | Readers can scan, compare, and continue scrolling without changing direction. The current mobile/reduced-motion fallback already demonstrates a viable vertical presentation. |
| P1 | About opens with "Adapter layers," followed by "Product builder × Engineering rigor" and three disconnected paragraphs. | "About me" with two connected paragraphs and a small factual sidebar. | The existing heading names an implementation detail, while the body repeats project evidence instead of introducing Bilal. |
| P1 | Hero says "I fix the part everyone scrolled past." Contact asks about something "boring" that needs fixing. | If these sections enter scope, use clear positioning and a direct contact invitation. | Both are polished slogans with little personal information. The earlier `request.md` also rejects the "boring parts" framing. |
| P1 | Most sections have 7rem vertical padding; About has 9rem above and below plus a 6rem gap before facts. | Use a responsive spacing scale and keep related information together. | Large repeated gaps stretch the page without improving hierarchy. Exact sizing requires visual verification. |
| P1 | `--color-nc-text-dim: #4a5568` is used for essential dates, metric labels, and inactive navigation. | Use an accessible secondary text token for meaningful text; reserve dim ink for decoration. | Calculated contrast is 2.70:1 on `#050508` and 2.57:1 on `#0d0d14`. Normal text needs at least 4.5:1. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). |
| P1 | Desktop rail exposes numeric links while its only descriptive flyout is `aria-hidden`; mobile displays numbers with screen-reader-only descriptions. | Add accessible link names in every mode; if navigation enters scope, make topic labels visible too. | Numbers alone do not tell readers where links go. This is discoverability and accessible naming, not a reason to remove the terminal theme. |
| P2 | Four font families divide headings, body, commands, and numbers; several labels are 0.58-0.62rem. | Consolidate typography within revised sections and make essential labels readable. | Technical character can come from a few consistent decisions rather than four competing voices. |
| P2 | `App.tsx` enables Lenis wheel smoothing with a 1.2-second duration, alongside CSS smooth scrolling and custom anchor calls. | Prefer native wheel scrolling and retain modest smooth anchor navigation. | Multiple scrolling treatments complicate tuning. The perceived lag is a hypothesis to verify with a trackpad and wheel. |
| P2 | Resume buttons still download the PDF; the new source is Markdown. | Verify that the downloadable PDF matches the new source before release. | The PDF predates the Markdown file by modification time. Its contents were not inspected, so a mismatch is a risk rather than a confirmed finding. |
| P2 | Skills omit .NET, Python, CloudWatch, and GCE from the new resume. | Reconcile skills with current experience and the resume. | Missing .NET is especially noticeable once OPS work is featured. Do not delete older skills solely because they are absent from this resume. |
| P2 | Metadata repeats "adapter layers nobody screenshots"; no Open Graph tags or skip link appear in the inspected entry files. | Use a factual description, add a skip link, and prepare sharing metadata during implementation. | These are useful finishing tasks, secondary to content and scroll flow. |

## Resume reconciliation

Source: `portfolio-site/public/assets/Bilal_Umar_Resume_SWE-1.md`. It is formatted awkwardly as a converted table but contains readable content. Formatting repair of the resume itself is outside this redesign plan.

| Area | Supported material | Treatment |
| --- | --- | --- |
| OPS | Fall 2026 co-op; MPBSDP, Cluster Applications Branch; React and ASP.NET migration; CRUD REST APIs and ticket forms; 120+ Ministry of Finance users. | Lead the experience section with this work. Do not invent an exact start/end date. |
| OPS AI workflow | Model-tier routing and session-scoped context; 4+ hours of improvement reported. | Describe the workflow plainly. Confirm the measurement period before publishing a time-saving statistic. |
| Sikh Sparks | 100+ organizations; 3+ platform APIs; 60% faster publishing; 4+ inboxes; 200+ daily messages. | Attach outcomes to specific contributions instead of separating them into a decorative scoreboard. |
| Liza Bilal Enterprise Inc. | December 2025-April 2026; AWS/React website with 200+ users; 22% faster initial load; Express reporting API saving 2+ hours weekly. | Keep a compact previous-role entry; use the full company name. |
| Meal and grocery platform | 100+ users; 400+ recipes; 3 external APIs; 86% test coverage; Docker/JUnit/Mockito pipeline on EC2 and RDS. | Use these for the current Plated entry, subject to confirming that the resume's generic project title refers to Plated. |
| Rental search app | 150+ successful searches; under 30 seconds; 140+ results per search; RabbitMQ workers on GKE. | Use these for the current Nest entry, subject to confirming the project-name mapping. Avoid presenting averages as guaranteed performance. |
| Leadership | AWS Student Builder Groups: 8+ event curriculum for 75+ students. GDG: 3+ workshops, 120+ attendees per term. | Keep AWS first, consistent with the earlier project brief. Dates in the current site are not supplied by the new resume. |
| Education | Seneca Polytechnic, Computer Programming & Analysis, August 2027, GPA 3.4. | Use program and graduation date in About. GPA is optional and need not become a visual metric. |
| Availability | Current site says Winter 2027 internships; new resume does not state availability. | Confirm whether that is still the desired call to action. |

## Existing strengths

- Keep the yellow wordmark, dark city imagery, clipped corners, and recognizable palette.
- Keep Off the Clock's content and accordion layout, as requested.
- Preserve the useful keyboard commands, `/` shortcut, project image alt text, focus outlines, and reduced-motion paths.
- Keep real screenshots rather than generating decorative replacement product interfaces.
- Keep the current React/TypeScript/Vite/Tailwind v4 stack and existing icon family.

## Baseline checks

All three existing checks passed on September 30, 2026:

- `npm.cmd run build`: TypeScript and Vite production build succeeded; JavaScript output 381.34 kB / 120.80 kB gzip.
- `npm.cmd run lint`: passed.
- `npm.cmd run check`: existing command-parser checks passed.

These confirm a working code baseline, not visual quality, accessible interaction, or performance scores.
