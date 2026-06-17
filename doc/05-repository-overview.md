# 05 — Repository Overview

**Purpose:** A plain-English description of the two repositories that make up the Remarkable suite. What each does, how they relate, what they are good at, where the gaps are, and what they could become.

**Audience:** Product managers, business stakeholders, sales engineers, leadership, and anyone who needs to talk about the product to a non-engineering audience.

**Related documents:** [06 — Repository Technical Analysis](./06-repository-technical-analysis.md) (deeper, engineering-flavored) · [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) · [11 — Technical Roadmap](./11-technical-roadmap.md)

---

## 1. The simple picture

Embeddable ships two open-source libraries that together let other companies put analytics dashboards inside their own products:

```
                            ┌────────────────────────────────────┐
                            │  remarkable-pro                    │
                            │  Pre-built, ready-to-drop-in       │
                            │  analytics components for the      │
                            │  Embeddable platform               │
                            └────────────┬───────────────────────┘
                                         │ uses
                            ┌────────────▼───────────────────────┐
                            │  remarkable-ui                     │
                            │  Open-source charts, controls and  │
                            │  design tokens — the building      │
                            │  blocks anyone can use directly    │
                            └────────────────────────────────────┘
```

- **Remarkable UI** is the lower layer. Think of it as a kit of parts: charts, dropdowns, date pickers, tables, and a design system that lets you style everything through CSS variables. A developer can install it, import the pieces they want, and build their own analytics UI.
- **Remarkable PRO** is the higher layer. It takes those parts and pre-wires them into Embeddable's hosted analytics platform. A customer who is already using Embeddable can drop in a ready-made bar chart, KPI tile, filter, or pivot table without writing front-end code.

Embeddable describes Remarkable PRO as "Embeddable's production-ready component suite" and as the offering for "teams that want world-class customer-facing analytics with speed, polish, and complete control." [^1]

---

## 2. What each repository does

### Remarkable UI

This is the open-source primitives library, published on npm as `@embeddable.com/remarkable-ui`. It contains:

- Around a dozen chart types: bar, line, scatter, bubble, pie, donut, KPI, heatmap, pivot table, and two table variants
- Seven kinds of input controls: date range pickers, number and text inputs, single- and multi-select dropdowns, switches
- A library of ~12 shared user-interface pieces: buttons, cards, tooltips, typography, dropdown menus, dividers, skeleton loaders
- A 666-token design system arranged in three layers (raw colors and spacing → semantic intents like "background" and "text" → component-specific overrides)
- A workshop view (Storybook) showing each component in isolation

It is at **version 3.0.16** at the time of this audit. It is stable and patch-released frequently. Its overall character: a well-organized, technically clean primitive library that a UI engineering team would be happy to adopt.

### Remarkable PRO

This is the Embeddable-platform-wired suite, published as `@embeddable.com/remarkable-pro`. It contains:

- 12+ chart variants that map directly to analytics use cases: default and stacked bar charts, grouped variants, KPI tiles with comparison, donut with label, scatter, bubble, combo charts
- 16+ editor variants including a powerful filter builder (with default, compact, and modal layouts)
- A theme system that wires colors, formatting, internationalization, and chart-specific styling into the Embeddable platform
- Full internationalization (English and German at the time of this audit) with translation infrastructure for adding more languages
- Export pipelines for CSV, XLSX, and PNG that let end users download data and screenshots

It is at **version 0.3.1**. The version number signals that PRO is still considered pre-1.0 — breaking changes can land in any release. It is actively developed but not yet on a stable API contract.

---

## 3. How the two relate

Remarkable PRO depends on Remarkable UI. Every PRO chart and control is composed of UI primitives. PRO adds the bits that UI alone cannot provide:

| What PRO adds on top of UI |
|---|
| Pre-wired Embeddable SDK integration so each component is a drop-in inside the Embeddable canvas |
| Internationalization (English and German today, infrastructure to add more) |
| Localized formatters for numbers, currencies, dates, and percentages |
| Export-to-Excel / CSV / PNG pipelines |
| A filter builder for query controls |
| Default theme overrides tuned for the Embeddable product |

This means a customer using Embeddable today is consuming PRO (and therefore UI underneath it) without seeing the layering. A customer building their own analytics product from scratch could use UI directly and skip PRO entirely.

---

## 4. What the suite is good at today

Several things stand out as genuine strengths, observable directly in the source code:

1. **A clean, mature design system.** The 666-token, three-layer CSS variable architecture is professionally executed. Customers can re-theme the entire library by setting a handful of semantic variables.
2. **Strong accessibility on the input controls.** Dropdowns, date pickers, single- and multi-select fields, and switches inherit accessibility from vetted third-party primitives (Radix, react-day-picker) plus a custom keyboard-navigation layer. This is the slice of UI most likely to be touched by keyboard and screen-reader users.
3. **A predictable, testable component structure.** Each PRO component splits its logic from its SDK wiring through a `definition.ts` / `*.emb.ts` pattern that keeps the SDK integration intentionally minimal. This makes the components easy to test, document, and reason about.
4. **A small, principled security surface.** The libraries do not call the network themselves — data fetching is delegated to the Embeddable platform. There is no third-party analytics, no telemetry, no error reporting, no cookies, no environment variables, and only one `dangerouslySetInnerHTML` use (rendering a hardcoded SVG icon, not user content).
5. **Internationalization in PRO.** Approximately 248 translation call-sites are wired through i18next. Adding a third or fourth language is a content task, not an engineering project.
6. **Clean dependency hygiene with deliberate hardening signals.** The XLSX dependency is pinned to a community fork (`@e965/xlsx`) and `axios` is force-overridden to a known-safe version — both signal awareness of supply-chain risk.

---

## 5. Where the gaps are today

Equally observable from the source, and grouped by what they would block at procurement:

1. **Chart accessibility is fundamentally missing.** Chart.js renders to a `<canvas>` element, which has no text content for screen readers. There is no accompanying data table, summary, or sonification. For a buyer with accessibility requirements (US public sector, EU public sector, large healthcare systems, banks under regulator scrutiny), this is the single biggest blocker.
2. **No automated accessibility testing.** Neither `eslint-plugin-jsx-a11y`, nor `axe-core`, nor the Storybook accessibility addon is configured. Accessibility regressions can ship undetected.
3. **No `prefers-reduced-motion`, `prefers-contrast`, or `forced-colors` support.** Animations play unconditionally; there is no high-contrast theme variant.
4. **Public governance documentation is missing.** There is no `SECURITY.md` (disclosure policy), no `ACCESSIBILITY.md` (conformance statement), no `CONTRIBUTING.md` (community process), no `CODE_OF_CONDUCT.md`. These are screening signals for procurement and open-source-program offices, regardless of how strong the internal practice is.
5. **No automated supply-chain scanning.** SonarCloud handles source-code quality, but there is no Dependabot configuration, no CodeQL workflow, no Snyk, no software bill of materials (SBOM) emission at release, no published npm package provenance.
6. **PRO has no Storybook.** Customers and internal stakeholders cannot browse PRO components in isolation. Visual discovery requires a full Embeddable canvas.
7. **PRO is pre-1.0.** Breaking changes can ship in patch versions. Enterprise consumers expect a 1.0 commitment.

None of these gaps is catastrophic. None requires re-architecting either library. Each is solvable with focused engineering work, sequenced in [11 — Technical Roadmap](./11-technical-roadmap.md).

---

## 6. Recommended strategic direction

Two parallel directions seem to fit the evidence:

### Direction A — Keep the two-library structure; close the compliance gap

This is the lowest-risk option. The current architecture is sound. The gaps above are addressable in a six-to-twelve-month focused program (see [11 — Technical Roadmap](./11-technical-roadmap.md)). After that program, the libraries become the analytics-component layer of choice for any company already using Embeddable to build customer-facing analytics in a regulated industry.

### Direction B — Position the suite as "compliance-ready analytics components" externally

The market is not currently well-served by a single vendor that delivers production-grade embedded analytics components with a serious accessibility commitment. Embeddable could choose to lead with that positioning — not as a marketing claim ("we are compliant") but as a credible, evidence-backed product story ("we built these components so you can build a compliant analytics experience faster"). The differentiator is real prior art on accessible charts (Highcharts Accessibility module, IBM Carbon Charts, Visa Chart Components) is small enough that a credible entrant can carve out a defensible position.

These two directions are complementary, not exclusive. Direction A is the engineering program; Direction B is the go-to-market story that the program enables. The go-to-market story should not run ahead of the engineering work.

[04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) describes the positioning options in more detail.

---

## 7. The honest version

If a senior buyer in a regulated sector asked us today, "is this safe to adopt?" the truthful answer would be:

> The libraries themselves are technically clean and the surface for security review is small. The interactive controls have a respectable accessibility foundation. The charts are not accessible by default and the supply-chain and disclosure tooling that a procurement officer expects to see is not yet in place. With a focused six-to-twelve-month program the libraries could be positioned as a credible *compliance-ready* foundation. Today they would not survive a strict procurement screen.

That is the gap this documentation set is asking the organization to close.

---

## Key takeaways

- Two libraries, two roles: UI (open primitives) and PRO (Embeddable-wired suite). PRO depends on UI.
- UI is stable (3.x); PRO is still pre-1.0 (0.3.x).
- Strengths: clean design system, strong control accessibility, small security surface, good i18n, deliberate supply-chain pins.
- Gaps: chart accessibility, automated a11y testing, governance docs, supply-chain scanning, PRO maturity, motion/contrast preferences.
- None of the gaps is structural; all are addressable through focused engineering work.

## Open questions

- Should PRO be re-released as 1.0 only after the compliance roadmap completes, or earlier?
- Should "compliance-ready analytics components" become an explicit external position, or remain an internal commitment?
- Should the suite stay MIT-licensed, or move to a dual-license model that pairs MIT primitives with commercial enterprise support?

## Recommended next steps

1. Confirm the strategic direction (A only vs. A + B) with leadership.
2. Sequence and resource the engineering work in [11 — Technical Roadmap](./11-technical-roadmap.md).
3. Decide whether to lead with the go-to-market story now or after Phase 1 of the roadmap.

## Related documents

- [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)

---

[^1]: Embeddable documentation, "Remarkable Pro — Introduction." See [03 — Detailed Market Research](./03-detailed-market-research.md) for the citation list.
