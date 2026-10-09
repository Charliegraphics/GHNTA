---
name: Gnotheia Agent Design System
description: Dark-mode enterprise UI system for AI-assisted insurance claims management
colors:
  primary: "#ee3b76"
  primary-gradient-start: "#ee3b76"
  primary-gradient-mid: "#e6683c"
  primary-gradient-end: "#ea993f"
  surface-base: "#1c182b"
  surface-card: "#242034"
  surface-bar: "#28243a"
  surface-row-even: "rgba(0, 0, 0, 0.05)"
  surface-row-hover: "rgba(91, 81, 133, 0.26)"
  border-default: "#49416a"
  border-subtle: "#38324f"
  border-accent: "#584e80"
  text-primary: "#ffffff"
  text-secondary: "#edecf0"
  text-muted: "#85809b"
  text-accent-violet: "#c4bee3"
  text-code: "#9cbdff"
  status-success: "#03ffac"
  status-success-bg: "rgba(3, 255, 172, 0.14)"
  status-warning: "#f59e0b"
  status-warning-bg: "rgba(245, 158, 11, 0.12)"
  status-danger: "#ee3b76"
  status-danger-bg: "rgba(238, 59, 118, 0.12)"
  btn-hover-violet: "#5b5185"
typography:
  font-primary: "Albert Sans, sans-serif"
  font-mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
  h1:
    fontSize: "1.5rem"
    fontWeight: 700
  h2:
    fontSize: "1.2rem"
    fontWeight: 700
  body:
    fontSize: "0.85rem"
    lineHeight: 1.45
  table-header:
    fontSize: "0.85rem"
    fontWeight: 600
    letterSpacing: "0.03em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "10px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "9px 20px"
  button-secondary-cancel:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.lg}"
    padding: "9px 20px"
  button-secondary-dark:
    backgroundColor: "{colors.surface-bar}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
---

# Design System

<!-- impeccable:design-schema 1 -->

## Overview
Gnotheia is a professional dark-mode desktop intelligence system for property & casualty claim handlers. Its visual language combines deep cosmic violet/indigo surfaces (`#1c182b`, `#242034`, `#28243a`) with vibrant, unambiguous semantic signals (neon teal for evaluated/verified, amber for warnings, coral for critical/hitl).

The single source of truth for all reusable components and rules is `styleguide.html`.

## Colors
- **Surfaces**:
  - `#1c182b` — App canvas background
  - `#242034` — Card and modal dialog containers
  - `#28243a` — Table header bars, pill badges, and input wrappers
  - `#141122` — Deep code/json embed containers
- **Borders**:
  - `#49416a` — Standard structural divider and table cell border
  - `#38324f` — Subtle internal card divider
  - `#584e80` — Active tab and focused input border
- **Semantic Accents**:
  - `#03ffac` / `#10b981` — Evaluated, approved, active status
  - `#f59e0b` — Warning, pending review, partial match
  - `#ee3b76` — Danger, flagged, critical failure, HITL trigger
  - `#9cbdff` — Identifier tags (Policy ID pills, IDs, mono hashes)
  - `#c4bee3` — Label secondary text

## Typography
- **Primary Font**: `Albert Sans`, system sans-serif fallback.
- **Monospace Font**: `JetBrains Mono`, `ui-monospace`, `Consolas`, `monospace` for IDs, claims numbers, policy codes, and technical audit data.
- **Hierarchy**:
  - Page Titles: `1.5rem` / `700`
  - Section Headings: `1.2rem` / `700`
  - Table Headers: `0.85rem` / `600`, uppercase, letter-spacing `0.03em`
  - Data Values: `0.88rem` / `500`
  - Secondary Labels (`.red-only`): `0.75rem` / `600`, uppercase

## Layout
- **Containers**: Responsive max-width wrappers up to 1400px.
- **Grids**: Key-value rows use `.div-block-81` (label left, data right).
- **Tables**: Semantic HTML tables wrapped in `.table-responsive` with sticky or cleanly rounded header bars (10px border-radius on outer ends).

## Elevation & Depth
- Flat, tonal layering instead of blurry multi-layer box-shadows.
- Modals receive high-elevation containment: `box-shadow: 0 24px 60px rgba(10, 8, 20, 0.65)`.
- Subtle zebra striping on alternating rows (`rgba(0, 0, 0, 0.05)`).
- Hover illumination on table rows: `rgba(91, 81, 133, 0.26)`.

## Shapes
- Modals: `12px` to `14px` border-radius.
- Cards & boxes: `8px` to `10px` border-radius.
- Action Buttons: `6px` to `8px` border-radius.
- Status Pills & Badges: Pill shape (`9999px` or `5px` for technical pills).

## Components
Strictly documented in `styleguide.html`:
1. `.button_gn` — Primary action button (gradient, white text).
2. `.button_gn_sec` — Secondary modal cancel button (left side of footer, hover `#5b5185`).
3. `.button_gn_sec.dark` — Utility button with dark border (Save as, Copy as JSON).
4. `.button_gn_sec.tertiary` — Outline button (Explain).
5. `.button_gn_sec.clear` — Ghost tab toggle.
6. `.btn-toggle-audit` — Full-width audit accordion toggle with rotating chevron.
7. `.status-badge` — Status badge (`.evaluated`, `.eval-ready`, `.needs-review`).
8. `.pill` — Monospace policy/version identifier badge.

## Do's and Don'ts
### Do:
- Always place Cancel/Close buttons on the **left** of modal footers.
- Always use semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
- Use `.pill` for `POL-` and `PC-` identifiers.
- Ensure all text has sufficient WCAG AA contrast against dark backgrounds.
- Keep `Evaluation date` on a single line (`white-space: nowrap !important;`).

### Don't:
- Never create ad-hoc button classes or arbitrary inline background colors.
- Never place Close/Cancel buttons on the right side of modal footers.
- Never wrap tables in custom layout divs that break native scrolling.
- Never run unsolicited browser tests or load heavy screenshots autonomously (Rule 5).
