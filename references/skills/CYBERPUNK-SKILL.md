---
name: cyberpunk-night-city-ui
description: "Cyberpunk 2077–faithful UI design intelligence. 4 canonical sub-styles (Kitsch, Neo-Militarism, Neo-Kitsch, Entropism), full Night City color tokens, typography system (Rajdhani, Orbitron, Blender, Chakra Petch), CSS effect recipes (glitch, neon glow, scanlines, clip-path corners, HUD panels), and per-style component rules. Actions: build, design, implement, review, fix, restyle, apply-style. Elements: button, card, navbar, sidebar, modal, form, table, badge, HUD, panel. Styles: neo-militarism, neo-kitsch, kitsch, entropism, glitch, neon-glow, scanlines, clipped-corners. Topics: color palette, typography, animation, clip-path, box-shadow, text-shadow, CSS variables, layout."
---

# Cyberpunk Night City UI — Design Intelligence

Design system grounded in the official Cyberpunk 2077 UI Art Bible and the four canonical Night City sub-styles. Every rule maps to real in-game visual decisions made by CD Projekt Red's UI team. Use this skill whenever building any interface that must feel sharp, aggressive, and authentically cyberpunk — not generically "futuristic".

---

## The Four Canonical Sub-Styles

Understanding which sub-style to apply is the most important decision. These are not interchangeable moods — each has strict visual laws.

| Sub-Style | Motto | Who Uses It | Energy |
|-----------|-------|-------------|--------|
| **Kitsch** | Style over Substance | Street-level, gangs, everyday citizens | Loud, rebellious, cheap-flashy |
| **Neo-Militarism** | Substance over Style | Corporations, NCPD, Militech, Arasaka | Cold, authoritative, weaponized |
| **Neo-Kitsch** | Substance AND Style | Ultra-wealthy, celebrities, corporate elite | Opulent, precise, dangerously beautiful |
| **Entropism** | Necessity over Style | Post-crash survivors, legacy tech | Austere, utilitarian, desaturated |

### How to Choose

- **Portfolio / personal brand / gaming site / landing page** → Kitsch (street energy, maximum visual impact)
- **SaaS dashboard / admin panel / corporate tool / data-heavy UI** → Neo-Militarism (authority and clarity)
- **Luxury product / premium SaaS / high-end e-commerce** → Neo-Kitsch (wealth signal, refined aggression)
- **Hacker aesthetic / terminal UI / retro-tech / dev tool** → Entropism (raw, minimal, functional)
- **Mixed UI** → Establish one style as dominant; use secondary style only for intentional contrast zones

---

## Color System

### Master Palette — Night City Tokens

```css
:root {
  /* === BACKGROUNDS === */
  --nc-void:        #050508;   /* Deep space black — universal base */
  --nc-surface:     #0d0d14;   /* Card / panel background */
  --nc-surface-2:   #141420;   /* Elevated surface */
  --nc-surface-3:   #1c1c2e;   /* Modal / overlay */

  /* === PRIMARY NEONS (use sparingly — one dominant per style) === */
  --nc-yellow:      #FCEE0A;   /* Kitsch primary — the iconic CP2077 yellow */
  --nc-yellow-hot:  #FFEB0B;   /* Brighter variant, OnePlus Cyberpunk edition */
  --nc-cyan:        #25E1ED;   /* HUD accent — pairs with red/yellow */
  --nc-cyan-bright: #00F3FF;   /* Max glow variant */
  --nc-magenta:     #ED1E79;   /* Kitsch secondary / danger accent */
  --nc-magenta-hot: #FF0055;   /* Maximum aggression */
  --nc-green:       #05FFA1;   /* Terminal / success / Entropism accent */
  --nc-purple:      #9B30FF;   /* Neo-Kitsch luxury accent */

  /* === NEO-MILITARISM PALETTE === */
  --nm-red:         #C5003C;   /* Primary UI color (bold CP2077 choice) */
  --nm-red-dark:    #880425;   /* Deep red — borders, inactive */
  --nm-red-bright:  #FF4A57;   /* Alert / emphasis */
  --nm-white:       #E8E8E8;   /* Body text on dark */
  --nm-grey-cold:   #8A9BB0;   /* Secondary text, muted UI */
  --nm-steel:       #2A3444;   /* Panel tint, cold blue-grey */

  /* === NEO-KITSCH PALETTE === */
  --nk-gold:        #D4AF37;   /* Real gold — not cheap yellow */
  --nk-gold-bright: #F5D060;   /* Highlight / shimmer */
  --nk-ivory:       #F5F0E8;   /* Natural material warmth */
  --nk-marble:      #E8E2D9;   /* Stone texture suggestion */
  --nk-chrome:      #C0C0C8;   /* Metallic shine */
  --nk-deep:        #0A0812;   /* Near-black with warm undertone */
  --nk-purple-rich: #4A0E6B;   /* Exclusive accent */

  /* === ENTROPISM PALETTE === */
  --ent-grey-1:     #2E2E2E;   /* Primary surface */
  --ent-grey-2:     #4A4A4A;   /* Secondary / borders */
  --ent-grey-3:     #6B6B6B;   /* Muted text */
  --ent-off-white:  #C8C8C8;   /* Body text */
  --ent-green-dim:  #1A4A1A;   /* Only allowed accent — dim terminal green */

  /* === SEMANTIC === */
  --nc-danger:      #FF4A57;
  --nc-warning:     #FCEE0A;
  --nc-success:     #05FFA1;
  --nc-info:        #25E1ED;
}
```

### Per-Style Color Rules

**Kitsch** — `--nc-yellow` dominant, `--nc-magenta` secondary, black base. Use both. Contrast is the point.

**Neo-Militarism** — `--nm-red` is the ONLY accent. CD Projekt Red's most controversial decision — they chose red as primary UI color and it works because the shade is neon-pink-red, not danger-red. Cyan (`--nc-cyan`) as complement. No yellow, no magenta.

**Neo-Kitsch** — `--nk-gold` and `--nk-purple-rich` over near-black. Never use plastic neons. Gradient metallics allowed.

**Entropism** — Greyscale only. `--ent-green-dim` for one terminal accent maximum. No neon. No gold. No chrome.

---

## Typography System

### Font Stack

```css
/* === CYBERPUNK 2077 OFFICIAL FONTS === */

/* PRIMARY — entire in-game HUD and menus */
/* Google Fonts: https://fonts.google.com/specimen/Rajdhani */
--font-primary: 'Rajdhani', 'Chakra Petch', sans-serif;

/* SECONDARY — non-critical labels, secondary info */
/* Google Fonts: https://fonts.google.com/specimen/Orbitron */
--font-display: 'Orbitron', 'Rajdhani', sans-serif;

/* MONO — terminals, code, data readouts, Entropism UIs */
/* Google Fonts: https://fonts.google.com/specimen/Share+Tech+Mono */
--font-mono: 'Share Tech Mono', 'Courier New', monospace;

/* KITSCH DISPLAY — in-your-face headings only */
/* Google Fonts: https://fonts.google.com/specimen/Chakra+Petch */
--font-kitsch: 'Chakra Petch', 'Rajdhani', sans-serif;

/* AUTHORITY — Neo-Militarism section headers */
/* Google Fonts: https://fonts.google.com/specimen/Black+Ops+One */
--font-military: 'Black Ops One', 'Orbitron', sans-serif;
```

```html
<!-- Google Fonts import — include all you need -->
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;700;900&family=Chakra+Petch:wght@300;400;600;700&family=Share+Tech+Mono&family=Black+Ops+One&display=swap" rel="stylesheet">
```

### Typography Scale Rules

| Use | Font | Weight | Transform | Notes |
|-----|------|--------|-----------|-------|
| Page/section hero | Orbitron or Chakra Petch | 700–900 | `uppercase` | Max aggression |
| Component headings | Rajdhani | 600–700 | `uppercase` | Standard |
| UI labels / nav items | Rajdhani | 500–600 | `uppercase` | Always caps in cyber UI |
| Body / descriptive text | Rajdhani | 400 | none | 16px min, 1.5 line-height |
| Data / stats | Orbitron | 400–700 | none | Numbers hit hard in Orbitron |
| Terminal / code | Share Tech Mono | 400 | none | Entropism and hacker contexts |
| Military headers | Black Ops One | 400 | `uppercase` | Neo-Militarism section titles only |

**Critical rule:** NEVER use a rounded-serif or script font. Every font choice must read as technical, compressed, or industrial. Letter-spacing on uppercase: `0.05em` to `0.15em`.

---

## CSS Effect Recipes

These are the building blocks. Compose them per-style.

### 1. Neon Glow (Text)

```css
/* Cyan neon text */
.neon-cyan {
  color: var(--nc-cyan-bright);
  text-shadow:
    0 0 4px var(--nc-cyan-bright),
    0 0 12px var(--nc-cyan-bright),
    0 0 30px rgba(0, 243, 255, 0.6),
    0 0 60px rgba(0, 243, 255, 0.3);
}

/* Yellow neon text */
.neon-yellow {
  color: var(--nc-yellow);
  text-shadow:
    0 0 4px var(--nc-yellow),
    0 0 12px var(--nc-yellow),
    0 0 30px rgba(252, 238, 10, 0.6);
}

/* Flickering neon — use sparingly, never on body text */
@keyframes neon-flicker {
  0%, 100% { opacity: 1; text-shadow: 0 0 4px var(--nc-cyan-bright), 0 0 12px var(--nc-cyan-bright), 0 0 30px rgba(0,243,255,0.6); }
  92%       { opacity: 1; }
  93%       { opacity: 0.4; text-shadow: none; }
  94%       { opacity: 1; text-shadow: 0 0 4px var(--nc-cyan-bright), 0 0 12px var(--nc-cyan-bright); }
  96%       { opacity: 0.6; }
  97%       { opacity: 1; }
}
.neon-flicker { animation: neon-flicker 4s infinite; }
```

### 2. Neon Glow (Borders / Boxes)

```css
/* Standard neon border glow */
.glow-cyan  { box-shadow: 0 0 6px var(--nc-cyan), 0 0 20px rgba(37, 225, 237, 0.4), inset 0 0 6px rgba(37, 225, 237, 0.1); }
.glow-yellow { box-shadow: 0 0 6px var(--nc-yellow), 0 0 20px rgba(252,238,10,0.4), inset 0 0 6px rgba(252,238,10,0.1); }
.glow-red    { box-shadow: 0 0 6px var(--nm-red), 0 0 20px rgba(197,0,60,0.4), inset 0 0 6px rgba(197,0,60,0.1); }
.glow-magenta { box-shadow: 0 0 6px var(--nc-magenta), 0 0 20px rgba(237,30,121,0.4), inset 0 0 6px rgba(237,30,121,0.1); }

/* Hover intensify — add to interactive elements */
.glow-cyan:hover { box-shadow: 0 0 10px var(--nc-cyan), 0 0 40px rgba(37,225,237,0.6), 0 0 80px rgba(37,225,237,0.2), inset 0 0 10px rgba(37,225,237,0.15); }
```

### 3. Clipped Corners (THE signature cyberpunk shape)

```css
/* Single bottom-left clip — standard CP2077 button shape */
.clip-bl {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px));
}

/* Single top-right clip */
.clip-tr {
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);
}

/* Double diagonal — top-right + bottom-left (most common card shape) */
.clip-dual {
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
}

/* Aggressive 4-corner cut — panels, modals */
.clip-quad {
  clip-path: polygon(
    16px 0, calc(100% - 16px) 0,
    100% 16px, 100% calc(100% - 16px),
    calc(100% - 16px) 100%, 16px 100%,
    0 calc(100% - 16px), 0 16px
  );
}

/* Diagonal slash — extreme Kitsch / high-impact dividers */
.clip-slash {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 70%);
}
```

### 4. Glitch Effect

```css
/* Data-attribute glitch — requires data-text="SAME TEXT" on element */
.glitch {
  position: relative;
  color: var(--nc-cyan-bright);
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: var(--nc-void); /* must match parent bg */
}

.glitch::before {
  color: var(--nc-magenta);
  animation: glitch-top 2s infinite linear;
  clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
  transform: translateX(-3px);
}

.glitch::after {
  color: var(--nc-yellow);
  animation: glitch-bottom 2s infinite linear;
  clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  transform: translateX(3px);
}

@keyframes glitch-top {
  0%, 100% { transform: translateX(-3px); opacity: 1; }
  20%       { transform: translateX(3px) skewX(2deg); clip-path: polygon(0 10%, 100% 10%, 100% 35%, 0 35%); }
  40%       { transform: translateX(-2px); opacity: 0.8; }
  60%       { transform: translateX(4px) skewX(-1deg); }
  80%       { transform: translateX(-3px); clip-path: polygon(0 5%, 100% 5%, 100% 45%, 0 45%); }
}

@keyframes glitch-bottom {
  0%, 100% { transform: translateX(3px); opacity: 1; }
  25%       { transform: translateX(-4px) skewX(-2deg); clip-path: polygon(0 55%, 100% 55%, 100% 90%, 0 90%); }
  50%       { transform: translateX(2px); opacity: 0.9; }
  75%       { transform: translateX(-3px) skewX(1deg); }
}
```

### 5. Scanlines (CRT Overlay)

```css
/* Apply to a container — adds old-terminal texture */
.scanlines {
  position: relative;
}

.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 243, 255, 0.03) 3px,
    rgba(0, 243, 255, 0.03) 4px
  );
  pointer-events: none;
  z-index: 10;
}

/* Heavier scanlines for terminal/Entropism contexts */
.scanlines--heavy::after {
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 3px
  );
}
```

### 6. Grid Background (Night City spatial grid)

```css
.night-city-grid {
  background-color: var(--nc-void);
  background-image:
    linear-gradient(rgba(37, 225, 237, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 225, 237, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* Perspective grid — more dramatic for hero sections */
.night-city-grid--perspective {
  background-image:
    linear-gradient(rgba(37, 225, 237, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 225, 237, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  transform: perspective(800px) rotateX(20deg);
  transform-origin: top center;
}
```

### 7. HUD Corner Decorators

```css
/* Tactical brackets — adds to any card or panel via pseudo-elements */
.hud-bracket {
  position: relative;
}

.hud-bracket::before,
.hud-bracket::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--nc-cyan);
  border-style: solid;
}

.hud-bracket::before {
  top: -2px; left: -2px;
  border-width: 2px 0 0 2px;
}

.hud-bracket::after {
  bottom: -2px; right: -2px;
  border-width: 0 2px 2px 0;
}

/* Four-corner variant (use a wrapper + child pseudo) */
.hud-bracket-full {
  outline: 1px solid rgba(37, 225, 237, 0.2);
  box-shadow: inset 0 0 20px rgba(37, 225, 237, 0.05);
}
```

---

## Sub-Style Component Rules

### KITSCH — "Style Over Substance"

**Character:** Loud, rebellious, cheap-flashy, street-level. The Edgerunners logo energy. In-your-face contrast. Gold-plated plastic. Holographic everything.

**Color law:** Yellow (`--nc-yellow`) + Magenta (`--nc-magenta`) on black. Both must appear. Never just one.

**Shape law:** Mix clipped corners (`clip-bl`, `clip-tr`) with occasional full-round elements. Contradiction is the point. Diagonal slashes on dividers.

**Animation law:** Glitch effects encouraged. Flicker on hero text. Fast hover transitions (150ms). Hover glow intensification mandatory on interactive elements.

```css
/* KITSCH Button */
.btn-kitsch {
  font-family: var(--font-kitsch);
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--nc-void);
  background: var(--nc-yellow);
  border: none;
  padding: 0.75rem 2rem;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  cursor: pointer;
  position: relative;
  transition: background 150ms, box-shadow 150ms;
}

.btn-kitsch:hover {
  background: var(--nc-yellow-hot);
  box-shadow: 0 0 20px rgba(252,238,10,0.7), 0 0 40px rgba(252,238,10,0.3);
}

/* KITSCH Card */
.card-kitsch {
  background: var(--nc-surface);
  border: 1px solid var(--nc-yellow);
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
  padding: 1.5rem;
  box-shadow: 0 0 12px rgba(252,238,10,0.15), inset 0 0 12px rgba(252,238,10,0.05);
  position: relative;
}

.card-kitsch::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--nc-magenta), var(--nc-yellow));
}

/* KITSCH Badge */
.badge-kitsch {
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--nc-void);
  background: var(--nc-magenta);
  padding: 0.2rem 0.6rem;
  clip-path: polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
}
```

**Kitsch anti-patterns:**
- Clean rounded corners with no clip-path → too soft, too modern
- Single neon color on black → not Kitsch, that's Entropism
- Quiet hover states → street UI is never quiet
- Thin, light typography → Kitsch screams, it doesn't whisper

---

### NEO-MILITARISM — "Substance Over Style"

**Character:** Corporate authority. Militech. NCPD. Cold, sharp, no warmth. Every element justifies itself functionally. CD Projekt Red used RED as the primary UI color — not to signal danger, but to project aggression and non-conformity. It reads as power, not warning, because the shade is neon-pink-red, not traffic-light-red.

**Color law:** Red (`--nm-red`) as primary. Cyan (`--nc-cyan`) as complement. Cold grey (`--nm-grey-cold`) for secondary text. Black base. No yellow, no magenta, no gold.

**Shape law:** Straight lines. Hard 90-degree corners OR precisely clipped corners (never organic). Parallel diagonal stripes as texture. Tight grid. Everything aligned to an invisible military grid.

**Animation law:** Minimal. State changes snap (100ms). No playful animations. Scanning line effects on load acceptable. Cursor becomes crosshair on targets.

```css
/* NEO-MILITARISM Button */
.btn-military {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--nm-red);
  background: transparent;
  border: 1px solid var(--nm-red);
  padding: 0.75rem 2rem;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
  cursor: pointer;
  transition: background 100ms, color 100ms, box-shadow 100ms;
  position: relative;
}

.btn-military::before {
  /* Diagonal stripe texture inside button */
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 4px,
    rgba(197, 0, 60, 0.06) 4px,
    rgba(197, 0, 60, 0.06) 5px
  );
  pointer-events: none;
}

.btn-military:hover {
  background: rgba(197, 0, 60, 0.12);
  color: var(--nm-red-bright);
  box-shadow: 0 0 8px rgba(197, 0, 60, 0.4), inset 0 0 8px rgba(197, 0, 60, 0.1);
}

/* NEO-MILITARISM Card / Panel */
.card-military {
  background: var(--nc-surface);
  border: 1px solid rgba(197, 0, 60, 0.4);
  border-left: 3px solid var(--nm-red);
  padding: 1.5rem;
  position: relative;
}

.card-military::after {
  /* Status indicator stripe at top */
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--nm-red);
  box-shadow: 0 0 8px var(--nm-red);
}

/* NEO-MILITARISM Table */
.table-military {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-primary);
  font-size: 0.875rem;
}

.table-military th {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--nm-red);
  border-bottom: 1px solid var(--nm-red);
  padding: 0.75rem 1rem;
  text-align: left;
}

.table-military td {
  color: var(--nm-white);
  border-bottom: 1px solid rgba(197, 0, 60, 0.15);
  padding: 0.75rem 1rem;
}

.table-military tr:hover td {
  background: rgba(197, 0, 60, 0.06);
  color: var(--nc-cyan);
}
```

**Neo-Militarism anti-patterns:**
- Any yellow or magenta → wrong sub-style
- Rounded corners on panels → authority has no softness
- Playful animations or bounce → militarism does not play
- Multiple accent colors → one dominant color is the rule (red)
- Gradient backgrounds → cold flat surfaces only

---

### NEO-KITSCH — "Substance AND Style"

**Character:** The 0.1% of Night City. Arasaka penthouse. Buying a Caliburn. Gold that isn't fake. Wood. Marble. Chrome. Same Kitsch color language but with real materials, perfect execution, and oppressive wealth signaling. Never cheap. Never loud without purpose.

**Color law:** Gold (`--nk-gold`) over near-black (`--nk-deep`). Purple (`--nk-purple-rich`) as accent. Metallic gradients allowed. No plastic neons.

**Shape law:** Clipped corners but precise and symmetrical. Gold border lines. Thin strokes. Never asymmetric unless intentional. Marble/wood texture in backgrounds.

**Animation law:** Slow, deliberate transitions (300–500ms). Gold shimmer on hover. Elegant, never frenetic.

```css
/* NEO-KITSCH Button */
.btn-neokitsch {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--nk-deep);
  background: linear-gradient(135deg, var(--nk-gold) 0%, var(--nk-gold-bright) 50%, var(--nk-gold) 100%);
  border: none;
  padding: 0.875rem 2.5rem;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  cursor: pointer;
  transition: all 350ms ease;
  position: relative;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
}

.btn-neokitsch:hover {
  background: linear-gradient(135deg, var(--nk-gold-bright) 0%, #FFE97A 50%, var(--nk-gold-bright) 100%);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.2);
  transform: translateY(-1px);
}

/* NEO-KITSCH Card */
.card-neokitsch {
  background: linear-gradient(145deg, var(--nk-deep) 0%, #12101C 100%);
  border: 1px solid var(--nk-gold);
  clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px));
  padding: 2rem;
  position: relative;
  box-shadow:
    0 0 0 1px rgba(212,175,55,0.1),
    0 8px 32px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(212,175,55,0.2);
}

.card-neokitsch::before {
  /* Gold shimmer line at top */
  content: '';
  position: absolute;
  top: 0; left: 24px; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--nk-gold-bright), transparent);
}

/* NEO-KITSCH Input */
.input-neokitsch {
  font-family: var(--font-primary);
  font-size: 0.9rem;
  color: var(--nk-ivory);
  background: rgba(212, 175, 55, 0.04);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-bottom: 2px solid var(--nk-gold);
  padding: 0.75rem 1rem;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
  outline: none;
  transition: border-color 350ms, box-shadow 350ms;
  width: 100%;
}

.input-neokitsch:focus {
  border-bottom-color: var(--nk-gold-bright);
  box-shadow: 0 4px 12px rgba(212,175,55,0.2);
}
```

**Neo-Kitsch anti-patterns:**
- Cheap plastic neons (`--nc-yellow`, `--nc-magenta`) → those are Kitsch, not Neo-Kitsch
- Asymmetric chaotic layouts → Neo-Kitsch has money and precision
- Fast / glitchy animations → refinement doesn't glitch
- Flat backgrounds → the ultra-rich have texture (marble, dark wood grain, chrome)

---

### ENTROPISM — "Necessity Over Style"

**Character:** Post-crash survival tech. Late 90s/early 2000s. Straight shapes. Desaturated. Monotone. Silicon Valley early-days meets decay. Dev tools, hacker UIs, retro-terminal aesthetics.

**Color law:** Greyscale only. One terminal-green (`--ent-green-dim`) accent maximum. If you're tempted to add cyan or yellow, you've left Entropism.

**Shape law:** Hard 90-degree corners only. No clip-path. No diagonals. Grid-based layouts. Dense information, no breathing room is intentional.

```css
/* ENTROPISM Base */
.panel-entropism {
  font-family: var(--font-mono);
  background: var(--ent-grey-1);
  border: 1px solid var(--ent-grey-2);
  color: var(--ent-off-white);
  padding: 1rem;
  font-size: 0.8rem;
  line-height: 1.6;
}

.btn-entropism {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ent-off-white);
  background: var(--ent-grey-2);
  border: 1px solid var(--ent-grey-3);
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  transition: background 100ms, color 100ms;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.btn-entropism:hover {
  background: var(--ent-grey-3);
  color: var(--ent-green-dim);
  border-color: var(--ent-green-dim);
}
```

---

## Layout Rules

### Grid System

All cyberpunk layouts are rooted in a **tight asymmetric grid**. Never centered-card-in-whitespace. Night City is dense.

```css
/* Cyberpunk layout base */
.cp-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;         /* Tight gap — not 16px/24px like clean UIs */
  padding: 0;       /* No padding on outer grid — content hits edges */
  background: var(--nc-void);
  min-height: 100vh;
}

/* HUD-style panel layout */
.cp-hud {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  grid-template-columns: 240px 1fr 1fr;
  grid-template-rows: 48px 1fr 40px;
  gap: 2px;
  height: 100vh;
  background: rgba(37, 225, 237, 0.05);
}
```

### Spacing Philosophy

Cyberpunk UIs are **dense**. Reduce standard spacing by ~40%.

| Context | Standard | Cyberpunk |
|---------|----------|-----------|
| Card padding | 24px | 12–16px |
| Section gap | 64px | 32–40px |
| Component gap | 16px | 4–8px |
| Border radius | 8–12px | 0px (clipped corners instead) |
| Line-height body | 1.75 | 1.5 |

---

## Interaction Rules (All Styles)

- **cursor: pointer** on ALL interactive elements — non-negotiable
- **cursor: crosshair** on Neo-Militarism targets / scan zones
- **Hover transitions:** Kitsch 150ms / Military 100ms / Neo-Kitsch 300ms / Entropism 100ms
- **Focus rings:** Replace default browser ring with neon glow: `outline: 2px solid var(--nc-cyan); outline-offset: 2px;`
- **Active/pressed state:** Always darken + scale(0.98) — tactile feedback matters
- **Loading states:** Scanline sweep animation, never a standard spinner. Or blinking cursor (`_`) for Entropism.
- **Empty states:** Data terminal "NO SIGNAL" message in mono font, not a friendly illustration

---

## Typography Rules (All Styles)

- `text-transform: uppercase` on ALL labels, buttons, nav items, headings — always
- `letter-spacing: 0.05em` minimum on all uppercase text
- `border-radius: 0` always — cyberpunk has no pill buttons
- Body text minimum: 15px Rajdhani Regular — it reads smaller than equivalent sans-serif
- Number/stat display: Orbitron — numbers look mechanical and precise
- NEVER mix more than 2 fonts on one page

---

## Common Anti-Patterns (Any Style)

| Anti-Pattern | Why It Breaks | Fix |
|---|---|---|
| Pill-shaped buttons (`border-radius: 9999px`) | Reads as Material Design / mobile app | `border-radius: 0` + clip-path |
| Pastel or muted colors | Cyberpunk is saturated to the point of pain | Full-saturation neons only |
| Centered hero with lots of whitespace | Night City is dense, not airy | Dense grid, edge-to-edge content |
| Rounded cards with drop shadow | Reads as Tailwind default | Flat + border + neon glow only |
| Multiple rainbow accent colors | No visual hierarchy | Max 2 accent colors per style |
| Thin 1px borders in grey | Disappears, has no energy | Neon-colored borders with glow |
| Standard `<select>` dropdowns | Breaks immersion | Custom-styled with clip-path + monospace |
| CSS variables with `var(--radius)` wrappers | Adds abstraction layer | Use values directly in cyberpunk contexts |
| Emojis as icons | Breaks the aesthetic entirely | Use Lucide/Heroicons SVG, styled with neon colors |
| `:focus` outline removal | Accessibility kill | Replace with neon glow outline |

---

## Pre-Delivery Checklist

### Style Authenticity
- [ ] Sub-style is chosen and consistent across ALL components (not mixed randomly)
- [ ] Color law for the chosen sub-style is followed (correct accent colors only)
- [ ] `text-transform: uppercase` applied to all labels, buttons, nav
- [ ] `border-radius: 0` everywhere — no pills, no rounded cards
- [ ] At least one `clip-path` shape applied (buttons, cards, or panels)
- [ ] Font is Rajdhani (UI) / Orbitron (display) — no system sans-serif fallbacks in hero areas
- [ ] Interactive elements have neon glow on `:hover`

### Technical
- [ ] All clickable elements have `cursor: pointer`
- [ ] Focus states replaced with neon outline (not removed)
- [ ] `prefers-reduced-motion` check wrapping all glitch / flicker animations
- [ ] Scanlines use `pointer-events: none` (never block interaction)
- [ ] Glitch pseudo-elements have same background-color as parent (for correct masking)
- [ ] `text-shadow` neon on headings, `box-shadow` neon on borders — both in use

### Contrast & Accessibility
- [ ] Text contrast ≥ 4.5:1 against background (neon on black easily passes)
- [ ] Color is NOT the only indicator — shape, label, position also differ
- [ ] All SVG icons have `aria-hidden="true"` + sibling text or `aria-label`

---

## Quick Reference: Sub-Style at a Glance

```
KITSCH        → Yellow + Magenta / Rajdhani+Chakra Petch / clip-bl,clip-tr / glitch ON / 150ms
NEO-MILITARISM → Red + Cyan / Orbitron+Rajdhani / clip-tr + diagonal stripes / glitch OFF / 100ms
NEO-KITSCH    → Gold + Purple / Orbitron / clip-dual + metallic gradient / shimmer ON / 350ms
ENTROPISM     → Grey + dim-green / Share Tech Mono / 90deg corners only / scanlines ON / 100ms
```
