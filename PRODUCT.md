# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Static HTML5 / CSS3 / Vanilla JavaScript (enhanced from Webflow foundation with custom responsive CSS engine and interactive modals).

## Users
Claims handlers, insurance adjusters, claims analysts, and compliance supervisors responsible for reviewing, verifying, and deciding on complex property & casualty insurance claims.

## Product Purpose
Gnotheia is an AI agent copilot and decision-support workspace for insurance claims management. It automates policy checks, evaluates submitted claim line items against complex business rules, flags high-risk or ambiguous claims for Human-in-the-Loop (HITL) review, and provides transparent explainability for every AI-driven evaluation.

## Positioning
An enterprise-grade insurance evaluation copilot that fuses deterministic rule checking with LLM contextual analysis, strict HITL workflows, and full decision auditability.

## Operating Context
High-throughput claims processing desktop environment. Operators require high-contrast dark mode interfaces (#28243a / #171520 / #242034), instant scanability of tabular data, rapid multi-state sorting, and frictionless drill-down into claim details, model inference parameters, and decision traces.

## Capabilities and Constraints
- Semantic responsive tables (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) enclosed in `.table-responsive`.
- Strict design system classes for all buttons, badges, key-value grids, and cards.
- Modal conventions: Close/Cancel action ALWAYS on the left (`.button_gn_sec.btn-close-modal`), primary action on the right (`.button_gn` or utility `.button_gn_sec.dark`).
- Strict 1:1 visual parity preservation: root `GHNOTHEIA/` original files are untouched; all work happens in `gnotheia-responsive/`.
- No unsolicited MCP testing without user request (Rule 5).

## Brand Commitments
- Name: Gnotheia Agent (InnovAtite / GA)
- Color accent: Neon teal (#03ffac / #10b981), Amber warning (#f59e0b), Coral danger (#ee3b76), Violet accents (#9cbdff / #5b5185).
- Reference design system: `styleguide.html`.

## Evidence on Hand
- Live multi-screen application: `index.html` (dashboard), `claim-detail.html` (claim review & model env modal), `rules-management.html`, `hitl-reasons.html`, `explainability.html`, `reference-data.html`.

## Product Principles
1. **Decision Clarity First**: Core data (Claim ID, Policy ID, Status, Amounts, Dates) must be instantly readable without truncation or awkward wrapping.
2. **Transparent Explainability**: Every AI inference must provide inspectable model parameters, execution tokens, and deterministic rule paths.
3. **Ergonomic Consistency**: Every button, input, and badge must reuse shared global classes across the entire application.
