# Portfolio restyle guide

Status: core direction implemented following the owner's scope choice of About, projects, and scroll structure. Hero/navigation restyling and other section changes remain optional. Read with [the audit](AUDIT.md) and [the implementation plan](PLAN.md).

## Design read

Reading this as a developer portfolio for recruiters and other engineers, with a cyberpunk identity and a calmer reading flow. Preserve the brand and rebuild the reading hierarchy around specific work and a straightforward introduction.

Taste settings are qualitative design choices: `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 4`. The existing page reads approximately 8/7/4: individually theatrical layouts, substantial movement, and uneven density. Reduce motion and competing layout ideas while retaining the visual character.

## Scope

The requested core is page structure, scrolling, About Me, and project arrangement. Resume reconciliation is part of the content audit. Hero, navigation, experience presentation, skills, and contact are proposed extensions to confirm with the owner. Off the Clock stays intact.

Treat the cyberpunk reference as a source for brand vocabulary, and the taste/redesign skills as tools for hierarchy and restraint. Their generic one-accent, default-light-mode, added-motion, and extremely dense HUD recommendations do not override this brief. Keep the existing dark theme and yellow/magenta identity. Native scrolling is a deliberate response to the request for easier browsing.

Applied references:

- `portfolio-site/.agents/skills/design-taste-frontend/SKILL.md`: audit first, preserve brand assets, motivate motion, remove scripted copy.
- `portfolio-site/.agents/skills/redesign-existing-projects/SKILL.md`: improve the existing stack with focused changes.
- `references/skills/CYBERPUNK-SKILL.md`: Night City colors, industrial typography, chamfers, terminal motifs.
- `references/skills/DESIGN-SKILL.md`: readable interaction, purposeful animation, explicit before/after reviews.

## Page structure

Recommended sequence:

```text
Hero              Name, specific role/context, View work, Resume
About me          A brief introduction and current context
Selected projects Plated and Nest in a natural vertical stack
Experience        OPS, Sikh Sparks, Liza Bilal Enterprise; leadership
Stack             Existing terminal with resume-aligned content
Off the clock     Existing section
Contact           Direct invitation and clear availability, if confirmed
```

About should be short enough that readers reach projects quickly. Projects demonstrate what Bilal builds; Experience supplies professional context. An experience-first order is still reasonable if the owner wants OPS to be the primary recruiting signal. Choose once and align navigation with that order.

Keep section element IDs stable: `hero`, `about`, `projects`, `experience`, `skills`, `offgrid`, `contact`. Preserve existing numeric command aliases unless the owner chooses to renumber them. Moving content does not require breaking bookmarked anchors or the command grammar.

## Visual rules

| Element | Direction |
| --- | --- |
| Base | Retain `#050508`, `#0d0d14`, and `#141420`. Use solid surfaces behind reading text. |
| Primary accent | Keep `#fcee0a` for primary actions and occasional emphasis. |
| Secondary accent | Keep `#ed1e79` for selected trim and leadership details. Do not make every badge magenta. |
| Cyan | Keep `#25e1ed` for links or terminal information. Avoid making it a third competing theme. |
| Main text | Keep `#e8e8e8`. |
| Secondary text | Keep `#8a9bb0` or use brighter `#a7b2c1` for small important text. Existing muted text already passes solid-background contrast checks. |
| Dim ink | `#4a5568` only for decoration; never for dates, metric explanations, or navigation labels. |
| Corners | Square layout, chamfered primary buttons and screenshot frames. Avoid clipping whole text articles. |
| Borders | Quiet rules for grouping; neon trim for a small number of focal elements. |
| Glow | Limited to the wordmark, primary interactions, and a few small accents. Body text stays crisp. |
| Backgrounds | Keep city imagery in the hero and existing Off the Clock/contact treatment. Let About and project text sit on stable dark fields. |

Solid-color checks: `#a7b2c1` has approximately 9.48:1 contrast on the base and 9.02:1 on the surface. Verify actual image-backed and translucent combinations in the browser. Normal text must reach 4.5:1 and qualifying large text 3:1. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## Typography and spacing

For revised reading sections, use Chakra Petch for headings and body, with Share Tech Mono for terminal commands and compact numeric details. This gives two consistent voices and removes the need for Orbitron scoreboards. Load the necessary body weights before applying this pairing. Compare body readability in a rendered preview before committing. Off the Clock can keep its existing typography through scoped section styles.

- Body: 17-18px, regular or medium, line height 1.6-1.7, maximum 60-65 characters per line.
- Section headings: approximately 32-44px on desktop, 28-34px on mobile. Use meaningful headings such as "About me" and "Selected projects."
- Project names: approximately 28-36px; stronger than their metadata, quieter than the hero.
- Essential labels: at least 13-14px as a design target, with restrained letter spacing. Do not use 9px labels to explain important numbers.
- Uppercase: short navigation labels, terminal chrome, and selected display headings. Keep prose in sentence case.
- Container: preserve the current 1240px maximum as a starting point. Allow readable text to be considerably narrower.
- Section padding: 64-80px desktop, 40-56px mobile. Adjust optically after preview, rather than forcing every section to occupy a viewport.
- Article gaps: 40-64px; within an article, 16-24px between related blocks.

Use shared spacing/type tokens for the revised sections. Avoid new inline spacing values in every component. Scope changes so Off the Clock does not silently inherit an unwanted redesign.

## Projects: current direction (second pass)

The owner chose an overlapping dossier fan over plain articles. The fan is a desktop enhancement only. Every project must stay fully readable in the dialog, in the stacked layout below 1024px, and with reduced motion. Overlap may hide parts of a resting card, but never content that is unavailable elsewhere. The earlier guidance below is kept for reference.

## Projects: original recommended stack

Use two full-width project articles, one below the other. Both are substantial enough to show fully; do not demote the second into a tiny tile merely to create asymmetry. Keep Plated first provisionally, matching the current site and resume order.

Desktop sketch:

```text
SELECTED PROJECTS

[ Plated screenshot: 7 columns ] [ Plated: 5 columns       ]
                                [ Purpose / contribution ]
                                [ Two useful outcomes    ]
                                [ Technologies + links   ]

                    quiet divider and normal scroll

[ Nest screenshot: 7 columns   ] [ Nest: 5 columns         ]
                                [ Same reading order     ]
```

Mobile: name and one-line purpose, screenshot, contribution, outcomes, technologies, links. DOM reading order should support this without duplicating content. Use CSS Grid for the desktop split. Each article stays in normal flow with content-driven height.

For each project, answer:

1. What is it, and who uses it?
2. What did Bilal build?
3. What evidence makes it worth opening?

Proposed Plated copy, assuming the generic resume project is Plated:

> A meal and grocery planner used by 100+ people. I built the Spring Boot backend, brought three recipe APIs into a shared format, and set up tested deployments on AWS.

Suggested evidence: **400+ recipes** and **86% test coverage**. Keep 100+ users in the introduction rather than repeating the same number in a separate counter.

Proposed Nest copy, assuming the generic resume project is Nest:

> A rental search app that gathers and ranks listings in one place. I used RabbitMQ to distribute collection and scoring work across GKE workers, returning 140+ results per search in under 30 seconds.

Suggested evidence: **150+ successful searches** and **under 30 seconds to results**, presented as reported results rather than a service guarantee. Trim repeated quantities if the layout becomes noisy.

Keep the existing real screenshots and live URLs. Use descriptive link text: "View Plated" and "View Nest." Add source links only when exact repository destinations are supplied or verified. Keep technology lists to the most informative 4-6 names, with fuller detail available in the resume.

Do not make outcomes animated counters or a row of dashboard tiles. A short readable line with a clear label is enough. No horizontal wheel conversion, artificial `vh` travel, sticky overlapping cards, mandatory carousel, or hover-only essential details.

Alternative choices if the owner prefers them:

- One featured project plus a compact second entry: useful when one is clearly the strongest or most relevant project.
- A subtle vertical sticky stack: more theatrical, but requires extra scroll and keyboard testing. Keep full content accessible and provide plain-flow mobile/reduced-motion presentation.
- Grouped by type: useful when the portfolio grows; unnecessary with only two projects.

## About Me

Replace the oversized abstract statement and three-column fragments with a modest heading, two connected paragraphs, and a narrow factual sidebar on desktop. Collapse to one column on mobile. Avoid repeating project metrics here.

Draft based only on the updated resume:

> I'm Bilal, a Computer Programming & Analysis student at Seneca Polytechnic. Right now, I'm at Ontario Public Service, working on a ticketing system with React and ASP.NET. Before that, I built publishing tools and a shared inbox for Sikh Sparks.
>
> I also lead the AWS Student Builder Groups at Seneca, where I've put together a cloud engineering curriculum, and serve as president of the Google Developer Group. Alongside that, I've shipped a meal planner and a rental search app.

Sidebar: Toronto, Seneca Polytechnic, graduating August 2027. Add availability only after confirming it.

This is a factual starting draft. A short sentence from Bilal about why he chooses these projects would make it more personal. Do not invent an origin story, motivation, hobby, or debugging anecdote. Off the Clock already provides personal interests and can keep doing that job.

## Copy rules

- Prefer specific verbs: built, migrated, integrated, tested, shipped, organized.
- Keep occasional casual wording when it sounds like Bilal. Do not manufacture jokes around every accomplishment.
- Retire "engineering rigor," "everyone scrolled past," "fewer blowups," and the "boring parts" theme in any sections selected for rewriting.
- Tie each number to the work that produced it. Avoid unsupported reliability claims.
- Avoid forced slogans, manifesto fragments, decorative micro-labels, and repeated terminal metaphors in prose.
- Use short sentences and ordinary punctuation. Keep command syntax in actual command interfaces.

## Scrolling, navigation, and motion

Recommend native wheel/trackpad scrolling. Use smooth anchor jumps only where appropriate; reduced-motion navigation should be immediate. Keep the terminal prompt as an optional shortcut.

If navigation enters scope, retain the side-rail concept but display short topic labels. On mobile, offer a clearly labeled compact menu or a small set of labeled shortcuts with access to the complete menu. Six unexplained numbers should not be the primary navigation. Preserve exact command aliases and accessible names.

Hero/boot changes are optional: preserve the existing skippable, session-only boot sequence unless the owner wants to shorten or remove it. Keep purposeful hover and press feedback at roughly 120-180ms. Do not add scroll-driven reveals that hide content until an animation finishes. Existing reduced-motion support is valuable and should be checked for every modified interaction. [MDN reduced-motion guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

Use a 44px touch-target design goal for primary controls. WCAG 2.2 AA's target-size minimum is 24px subject to exceptions; the larger goal is a usability choice, not a claim that AA requires 44px. [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## Review standard

The redesign succeeds when a visitor can quickly identify what Bilal does, read both projects with normal scrolling, understand his latest work, and reach the resume/contact actions. Cyberpunk character should remain obvious from the wordmark, palette, shapes, imagery, and terminal details. Content should remain readable without interacting with the decorative parts.
