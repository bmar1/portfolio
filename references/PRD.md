# Portfolio PRD — Bilal Umar

> **Philosophy anchor:** *"All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune."* — Paul Graham (via Emil Kowalski)
>
> Beauty is leverage. Taste is trained. Every invisible decision compounds.

---

## 1. Vision & Tone

A personal portfolio for **Bilal Umar**, a Computer Programming & Analysis student at Seneca Polytechnic with a focus on full-stack development, systems thinking, and clean engineering.

**Vibe:** Tech-forward, cyberpunk-lite. Not heavy neon-on-black sci-fi — more like the quiet hum of a terminal in a dark room. Think: thoughtful developer who has taste, not a gamer aesthetic. The look should feel like a Vercel dashboard crossed with a Raycast landing page, with a faint cyberpunk undercurrent (subtle grid lines, monospace accents, restrained glow effects).

**Three words:** Precise. Alive. Restrained.

---

## 2. Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headings | **Space Grotesk** | 600–700 | Geometric, slightly techy, not sci-fi |
| Body / Labels | **Inter** | 400–500 | Maximum legibility |
| Code / Accents | **JetBrains Mono** | 400 | Used sparingly for terminal moments, stat labels, dates |

**Rules:**
- H1: `clamp(3rem, 6vw, 5rem)` — large, confident
- Body: `1rem / line-height 1.65` — readable
- Monospace accent: never longer than a short label or stat. It signals "developer" without screaming it.
- No all-caps headings. No decorative italics.

---

## 3. Color System

### Base Palette (Dark Mode primary)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#080C10` | Page background — near-black with a blue tint |
| `--bg-surface` | `#0D1117` | Cards, sections |
| `--bg-elevated` | `#161B22` | Hover state surfaces, modals |
| `--border` | `#21262D` | Subtle borders |
| `--border-hover` | `#30363D` | Hovered borders |
| `--text-primary` | `#E6EDF3` | Main text |
| `--text-secondary` | `#8B949E` | Subtext, labels |
| `--text-muted` | `#484F58` | Timestamps, decorative |
| `--accent-cyan` | `#39D0D8` | Primary accent — links, highlights, hover glows |
| `--accent-violet` | `#9E7CFF` | Secondary accent — used once or twice, not everywhere |
| `--accent-glow` | `rgba(57, 208, 216, 0.12)` | Subtle background glow on cards |

**Cyberpunk-lite touches:**
- A faint `1px` dot-grid or line-grid SVG background on the hero — barely visible at 3–5% opacity.
- Accent cyan used for underlines, active states, cursor-like blinking elements — not applied to entire blocks.
- No solid neon blocks. Glow effects should feel like light leaking through cracks, not a Times Square billboard.

---

## 4. Site Architecture & Sections

The site is a **single-page** design with smooth anchor-based navigation (no page reloads). Each section has a distinct layout personality — no two sections should look structurally alike.

```
/
├── Hero
├── About
├── Projects
├── Skills & Stack
├── Experience
├── Off-Grid
└── Contact / Footer
```

---

## 5. Section Specifications

### 5.1 — Hero

**Goal:** Make the first impression feel alive. The visitor should sense motion before they read a word.

**Layout:** Full-viewport, non-centered. Uses a **split asymmetric layout**:
- Left 60%: Text content — large heading, subheading, CTA buttons
- Right 40%: Animated visual element (not a photo — a terminal-style live-typing component, or a subtle WebGL mesh, or an SVG grid that reacts to mouse movement)

**Content:**
```
[JetBrains Mono, small, muted]  > bilal@portfolio ~ $

[Space Grotesk, H1]
Building things that
actually work.

[Inter, body, secondary]
Full-stack developer. Systems thinker.
Currently studying @ Seneca Polytechnic.

[Two CTAs]
[Primary]  View Projects  →
[Ghost]    Download Resume
```

**Animation specifics (Emil philosophy):**
- The terminal prefix `> bilal@portfolio ~ $` types in character-by-character with a `cursor: |` blink, then fades to muted. Seen once on load — never repeats.
- H1 words stagger in: `translateY(20px) opacity: 0` → `translateY(0) opacity: 1`, 50ms between words. Ease-out custom curve: `cubic-bezier(0.23, 1, 0.32, 1)`.
- The background grid pulses very subtly (opacity 3% → 5% → 3%, 4s loop) — barely perceptible but adds breathing.
- Mouse movement on the right visual causes a spring-based parallax shift (low stiffness, high damping — `useSpring` from Framer Motion).
- **No hero animation loops or autoplay videos.** The page should feel fast.

**Non-traditional aspect:** The heading is left-aligned and bleeds past the typical content column. No centered hero. No hero image. No full-bleed photo.

---

### 5.2 — About

**Goal:** Humanize without being a wall of text. Technical competence + character in one glance.

**Layout:** **Broken grid** — two columns of unequal weight, vertically misaligned to feel intentional:
- Left: Short 3-paragraph bio + a few "sidebar facts" (in monospace micro-labels)
- Right: An angular card or image-masked element — either a stylized avatar with a clipping mask (polygon clip-path), or a skewed container showing a quote/value statement

**Bio content:**
> I build software with the kind of attention you usually only see in products we talk about for years. I care about the part nobody notices — the normalization layer, the index, the error message that actually helps. Currently studying Computer Programming & Analysis at Seneca, leading technical workshops at Google Developers Group, and shipping real things.

**Sidebar micro-facts (JetBrains Mono):**
```
📍  Toronto, ON
🎓  Seneca Polytechnic — CPA, 2024–Present
🔧  Currently leading @ GDG Seneca
💡  Open to internships
```
(Note: Use SVG icons from Lucide, not emoji — match the skills reference)

**Non-traditional aspect:** The right column card is clipped with `clip-path: polygon(0 8%, 100% 0, 100% 92%, 0% 100%)` — a skewed parallelogram that feels designed, not accidental.

**Animation:** Right card fades and slides in from right as it enters viewport. `clip-path` reveal on image using `IntersectionObserver`. Stagger the sidebar facts (30ms each).

---

### 5.3 — Projects

**Goal:** Show depth, not breadth. Three projects, each with enough detail to feel real.

**Layout:** **Stacked feature cards** — not a grid. Each project gets its own horizontal row that fills the section width. Alternates: text-left / visual-right, then text-right / visual-left.

Each card:
```
┌──────────────────────────────────────────────────────────┐
│  [Tag: "Featured Project"]                               │
│                                                          │
│  [Project Name, H2]                                      │
│  [1–2 sentence description]                              │
│                                                          │
│  [Achievement metrics: 3 stats in monospace]             │
│    86% test coverage   |   16% load reduction   |  3 APIs│
│                                                          │
│  [Tech stack: pill badges]                               │
│  [Links: GitHub ↗  |  Live ↗]                           │
│                                     [Visual/Screenshot]  │
└──────────────────────────────────────────────────────────┘
```

**Projects:**
1. **Plated** — `plated-app.online` — Full-stack meal planning (Java Spring Boot, React, AWS, PostgreSQL)
2. **Route Optimization System** — C/C++, Agile, greedy algorithm, 12% cost reduction
3. **Nest** — `nest-one-eta.vercel.app` — Rental search with scored rankings & AI-directed development

**Visual element per card:** Not a screenshot. A stylized terminal mock-up or ASCII-art-style diagram using `<pre>` or SVG, representing something from that project. For Plated: a small API response tree. For Route: a node graph. For Nest: a ranked list output. These feel more authentic than stock screenshots.

**Animation (Emil philosophy):**
- Each card uses `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` reveal as it enters viewport. Once only, with `IntersectionObserver`.
- Stats count up from 0 when the card enters view. Duration: 800ms, ease-out.
- Tag badge animates in first (100ms delay), then heading, then body — stagger 60ms each.
- Hover: card border transitions from `--border` to `--accent-cyan` (200ms ease). Subtle `--accent-glow` shadow blooms under the card. **No layout shift on hover.**

**Non-traditional aspect:** Full-width stacked cards that break the grid. The visual mock-up in the card is hand-crafted (not a screenshot), which signals authorship.

---

### 5.4 — Skills & Stack

**Goal:** Communicate technical range without an impersonal list.

**Layout:** **Scattered orbit / constellation layout** — not a badge list. A central label "My Stack" sits in the middle of a container. Skills radiate outward in a subtle orbital arrangement, grouped loosely by category (Languages, Frameworks, Cloud, Tools). Each skill is a small pill.

On hover of any skill, a faint `--accent-cyan` glow appears and a micro tooltip shows context:
```
Java → "Used for Spring Boot backend on Plated + Route Opt."
```

**Categories rendered as loose clusters (not strict columns):**
- Languages: Java, JavaScript, C#, C++, C, HTML, CSS
- Frameworks: Spring Boot, .NET, React.js, Node.js, Express.js, JUnit, Mockito
- Cloud & DevOps: AWS (EC2, RDS, S3), Docker, GitHub Actions
- Tools: Git, Jira, Postman, Cursor, Claude Code
- Databases: PostgreSQL, Oracle, MongoDB

**Non-traditional aspect:** No skill bars (they're meaningless). No star ratings. The constellation layout makes the tech density feel like an ecosystem, not a checklist.

**Animation:**
- Pills stagger in from opacity:0, translateY(12px) — 30ms intervals, grouped by category
- Hover tooltip: `scale(0.95) opacity:0` → `scale(1) opacity:1`, 150ms ease-out, origin from trigger

---

### 5.5 — Experience

**Goal:** Not a résumé paste. A narrative timeline.

**Layout:** **Vertical timeline with a living line** — a thin `2px` accent-cyan line runs vertically. Each experience node sits to the right of the line, connected by a dot. The line "grows" into the page as the user scrolls (using `scaleY` from top, driven by scroll progress).

**Nodes:**
```
◉ Technical Lead — GDG Seneca  [Dec 2025 – Present]
  Led workshops for 50+ students...
  Mentored 25+ in DSA & LeetCode...

◎ Event Coordinator — Markham Fair  [Dec 2023 – Feb 2024]
  Coordinated 100+ daily attendees...
```

**Styling details:**
- Current role node dot: filled `--accent-cyan`, pulsing ring animation (subtle)
- Past role node dot: hollow ring, `--border` color
- Timeline line: grows with scroll, creating a sense of the story being told

**Non-traditional aspect:** The growing line tied to scroll creates temporal movement — you are literally watching the timeline write itself.

**Animation:**
- Node text fades + slides in from left (`translateX(-16px)`) when it enters viewport
- Pulse ring: `scale(1) opacity(0.5)` → `scale(2) opacity(0)`, 2s loop, `ease-out` — only on active role dot

---

### 5.6 — Off-Grid

**Goal:** Let the person behind the engineer breathe. This is the most casual, least technical section on the site — a deliberate gear-shift. No metrics, no tech stack, no bullet points masquerading as personality. Just Bilal.

**Tone:** Warm, direct, a little dry. Written like a good tweet, not a LinkedIn bio.

**Layout:** **Soft editorial layout** — starts with a full-width muted hero image (`personal_hero.png`), then drops into a loose two-column arrangement below: a short paragraph on the left, and a vertical stack of interest cards on the right.

**Hero image block:**
- Full-width, `max-height: 480px`, `object-fit: cover`, `object-position: center`
- Overlaid with a subtle gradient: `linear-gradient(to bottom, transparent 60%, var(--bg-base))` — so the image bleeds naturally into the section background
- `border-radius: 16px` with a `1px solid var(--border)` frame
- Placeholder: `public/assets/personal_hero.png` — final version will feature the cat
- No caption. The image speaks.

**Section label (small, monospace, muted):**
```
[JetBrains Mono, small]
off the clock
```

**Left column — short prose:**
> Outside of code, I'm chasing PRs at the gym — you'll catch me on chest day before I'll miss it. I eat clean, move often, and think about system design in the shower. When I'm not debugging at a keyboard, I'm probably exploring a trail, dominating a session of whichever game grabbed my attention, or losing track of time with my cat.

**Right column — interest cards (stacked, informal):**

Each card is minimal: a small icon (Lucide), a label, a one-liner. No borders — just a slightly elevated background and gentle padding. These feel like sticky notes, not feature cards.

```
[🏋️ → Dumbbell icon]  Gym
  Chest, shoulders, back. In that order.

[🎮 → Gamepad icon]  Video Games
  The kind that reward pattern recognition.

[🥗 → Apple icon]  Eating Clean
  Whole foods, high protein. Not a diet — a default.

[🗺️ → Map icon]  System Design
  I think about distributed systems for fun. Yes, really.

[🌿 → Leaf icon]  Nature
  Trails, parks, anywhere without a notification.

[🐱 → Cat icon]  Cats
  Have one. He runs the household.
```

**Styling — deliberately softer than the rest of the site:**
- Background: matches `--bg-base` — no contrast shift, flows naturally
- Card backgrounds: `--bg-surface` at 60% opacity — very subtle lift
- Text: `--text-secondary` for the one-liners (lighter, more casual)
- Icon color: `--accent-violet` — the secondary accent gets its moment here instead of cyan, signaling a mode change
- No glows. No cyan. No borders on cards. The site exhales here.

**Non-traditional aspect:** The transition from a rigid terminal-toned portfolio to a soft editorial section is itself the statement. It humanizes every technical section that came before it. Most portfolios end at contact; this one lets you meet the person first.

**Animation:**
- Hero image: `clip-path: inset(0 0 20% 0)` → `inset(0 0 0 0)` reveal as section enters viewport, 600ms ease-out — slower and softer than project cards
- Left prose: fades in `opacity: 0` → `opacity: 1`, no translation — pure dissolve, 500ms
- Interest cards: stagger in from `translateY(12px) opacity: 0`, 40ms intervals — casual, not dramatic
- No hover effects on cards — they're ambient, not interactive

---

### 5.7 — Contact / Footer

**Goal:** End the page with intention. Make reaching out feel easy and human.

**Layout:** **Centered call-to-action block** with oversized heading, then a row of links, then a minimal footer strip.

**Content:**
```
[Space Grotesk, very large]
Let's build
something.

[Inter, body, secondary]
Open to internships, contracts, and conversations
worth having.

[Links row]
  bumar@myseneca.ca
  linkedin.com/in/bumar
  github.com/bumar

[Footer strip]
  © 2026 Bilal Umar   ·   Built with React + Vite   ·   [↑ Back to top]
```

**Non-traditional aspect:** The heading is intentionally large — it should feel like a statement, not a form. No contact form (friction-free: mailto link or copy-to-clipboard on email).

**Animation:**
- Email link on hover: text slides up via `clip-path: inset(0 0 100% 0)` revealing the email address below a decorative underline. 200ms ease-out.
- "Back to top" smoothly scrolls. The `↑` arrow bounces once on hover (translateY: 0 → -4px → 0, spring, bounce: 0.3).

---

## 6. Navigation

**Not a traditional navbar.** Instead, a **minimal floating pill** — centered at the top of the viewport, `position: fixed`. Contains only icon/text links to sections.

```
[ bumar ]  ·  About  ·  Projects  ·  Stack  ·  Experience  ·  Contact
```

- Background: `rgba(13, 17, 23, 0.8)` + `backdrop-filter: blur(12px)` — glassmorphism, restrained
- Border: `1px solid var(--border)` with a subtle hover glow
- Active section indicator: the current section's link gets a `--accent-cyan` dot underneath or color change
- On scroll past hero: pill fades in with `opacity: 0 → 1`, `translateY(-8px) → translateY(0)`, 200ms ease-out. Hidden before then (hero has its own CTA).
- Mobile: collapses to a hamburger menu that opens a full-screen overlay with staggered link entries

**Pill sizing:** `padding: 10px 20px`, `border-radius: 9999px`

---

## 7. Global Micro-interactions (Emil Philosophy Applied)

These are the invisible details that compound:

| Element | Interaction | Spec |
|---------|-------------|------|
| All buttons | `:active` scale press | `scale(0.97)`, 100ms ease-out |
| CTA primary button | Hover | Border glow blooms `--accent-cyan`, `box-shadow: 0 0 16px rgba(57,208,216,0.25)` |
| All links | Hover underline | Clip-path reveal left-to-right, 200ms |
| Project card | Hover border | `--border` → `--accent-cyan`, 200ms |
| Nav pill links | Hover | color transitions to `--accent-cyan`, 150ms |
| Tooltips | Appear | `scale(0.95) opacity:0` → `scale(1) opacity:1`, 150ms from trigger origin |
| Scroll progress | Hero background grid | Opacity subtly decreases as user scrolls away |

**KeyRule (from Emil):** UI animations ≤300ms. Keyboard-initiated actions: no animation. `prefers-reduced-motion`: keep opacity fades only, remove all transform motion.

---

## 8. Performance & Technical Constraints

- **Stack:** React + Vite + TypeScript (already initialized in `portfolio-site/`)
- **Animations:** Framer Motion for spring-based interactions. CSS transitions for all simple state changes (hover, active). WAAPI for scroll-triggered reveals.
- **No Framer Motion shorthand `x`/`y` props** — use `transform: "translateX()"` for hardware acceleration under load.
- **Font loading:** `<link rel="preconnect">` for Google Fonts. `font-display: swap`.
- **Images:** WebP, lazy-loaded via `loading="lazy"`. No large hero images.
- **Icons:** Lucide React — no emojis as icons.
- **Target:** Lighthouse 90+ Performance. 95+ on Accessibility.

---

## 9. Responsive Strategy

| Breakpoint | Adaptation |
|------------|-----------|
| `≥1280px` | Full two-column layouts, constellation at full size |
| `1024–1279px` | Two-column preserved, reduced font sizes |
| `768–1023px` | Two-column collapses to stacked, projects become single-column |
| `<768px` | Fully single-column. Nav pill → hamburger overlay. Hero becomes stacked. |

**Mobile hero:** Text takes full width. Animated visual (right 40%) hidden on mobile — the terminal typing component remains as a single decorative element above the H1.

---

## 10. What Makes This Non-Traditional

A summary of the intentional deviations from portfolio conventions:

| Convention | This Site |
|-----------|-----------|
| Centered hero | Left-aligned asymmetric split |
| Photo in About | Skewed polygon clipped card |
| Project grid cards | Full-width alternating stacked cards |
| Skills badge list | Constellation/orbit layout |
| Standard vertical timeline | Scroll-driven growing line |
| Top-bar navbar | Floating center pill (appears after hero) |
| Skipping straight to contact | Off-Grid section — meet the person first |
| Contact form | Large statement heading + mailto |

---

## 11. Open Questions (Pre-Build)

- [ ] **Avatar/photo:** Will there be a headshot? If so, PNG with transparent bg preferred. If not, the About right-column uses a stylized text/quote card instead.
- [ ] **Project visuals:** Confirm whether to use real screenshots (with clipping masks) or hand-crafted ASCII/SVG terminal mocks.
- [ ] **Resume PDF:** Link to downloadable PDF — needs to be created/hosted before launch.
- [ ] **Domain:** Is there a custom domain already, or deploy to Vercel default?
- [ ] **Dark mode only** or **light + dark toggle?** (Recommendation: dark only — it's the identity of the site. A toggle creates inconsistency with the cyberpunk-lite brand.)
- [ ] **Off-Grid hero image:** `personal_hero.png` is the placeholder. Final image should be placed at `public/assets/personal_hero.png` before launch. Landscape crop preferred (16:9 or wider). WebP format recommended.
- [ ] **Off-Grid prose tone:** The current draft is a starting point — happy to adjust the voice, add/remove interests, or rephrase the cat line. This section should feel written by you, not about you.