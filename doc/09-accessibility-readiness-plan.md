# 09 — Accessibility Readiness Plan

**Purpose:** A detailed plan for taking the Remarkable suite from its current accessibility baseline to a credible, audit-ready WCAG 2.2 Level AA position with serviceable chart accessibility — the level most regulated-industry buyers will require.

**Audience:** Engineering (UI lead and design-system lead), the (to be appointed) Accessibility Lead, QA, Product Marketing (for VPAT authoring), and any compliance reviewer evaluating the libraries against Section 508, EN 301 549, or ADA Title II.

**Related documents:** [08 — Detailed Compliance Gap Analysis (Area A1)](./08-detailed-compliance-gap-analysis.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) · [13 — Glossary](./13-glossary.md)

---

## 1. Why this plan exists

Three forces converge on the accessibility work:

1. **Procurement reality.** Section 508 ICT Refresh cites WCAG 2.0 AA[^1]; the DOJ ADA Title II Web Rule (April 2024) requires WCAG 2.1 AA for state and local government web content with deadlines of 26 April 2027 (50,000+ population) and 26 April 2028 (smaller entities)[^2]; EN 301 549 v3.2.1 references WCAG 2.1 AA for European public-sector procurement; the EU Accessibility Act extends accessibility obligations to private-sector products and services applying from 28 June 2025 *(requires validation)*. Buyers will ask for a VPAT and an Accessibility Conformance Report (ACR).
2. **Product reality.** The Remarkable suite ships strong control accessibility (Radix dropdown/tooltip, react-day-picker, hand-written keyboard navigation in `SelectFieldContent`) and weak chart accessibility (Chart.js renders to `<canvas>`, no data-table fallback, no sonification, zero `prefers-reduced-motion` handling). The gap is real but bounded.
3. **Reputational reality.** A vendor that wants to position itself as the "compliance-ready analytics component" choice cannot ship inaccessible charts. The Highcharts Accessibility module[^3], IBM Carbon Charts, Visa Chart Components[^4], and the Chartability framework[^5] have set a credible bar in this market.

This plan operationalizes the work to close that gap.

---

## 2. Target conformance and scope

| Decision | Position |
|---|---|
| WCAG conformance target | **WCAG 2.2 Level AA**. (We target the most recent version so that the same work also satisfies WCAG 2.1 AA and Section 508 ICT Refresh.) |
| Section 508 position | Conformance to the Revised 508 Standards (which cite WCAG 2.0 AA). We claim the higher standard. |
| EN 301 549 position | Chapter 9 (web content) conforms by virtue of WCAG 2.2 AA conformance. Chapter 11 (non-web software) is mostly N/A; Chapter 12 (documentation) requires our docs to be accessible. |
| ADA Title II position | Components support WCAG 2.1 AA out of the box; we therefore meet the technical-standard requirement of the DOJ rule. (The rule applies to state and local governments using the product, not to Embeddable as a vendor — but vendors are routinely asked to evidence the standard.) |
| Chart accessibility | Every chart ships with a data-table textual alternative, an accessible summary statement, focusable elements, and keyboard navigation. Sonification is a future enhancement, not a launch requirement. |
| Scope | All public components in `remarkable-ui` and `remarkable-pro`. Internal-only utility components are out of scope for conformance claims. |
| Out-of-scope (this plan) | Native mobile a11y, AT-only operating systems, the Embeddable canvas editor experience (separate scope). |

---

## 3. The WCAG 2.2 Success Criterion map

This table lists every Level A and Level AA Success Criterion in WCAG 2.2 with a current posture per repository and the principal evidence (file path or absence-of-evidence) backing the rating. WCAG 2.2 contains 50 Success Criteria at the AA cumulative level (30 Level A + 20 additional at Level AA) following the removal of 4.1.1 Parsing[^6].

Postures: **Pass** (no work needed), **Partial** (some work needed), **Fail** (substantive work needed), **Untested** (we have not validated either way and treat as Fail until we do).

> Note: the postures below are an analyst's *initial* assessment from static review. A formal VPAT requires a tested walkthrough per criterion. This table is the starting point for that walkthrough.

### Principle 1 — Perceivable

| SC | Title | Level | UI | PRO | Evidence / notes |
|---|---|---|---|---|---|
| 1.1.1 | Non-text Content | A | Fail | Fail | Charts have no alt text or data-table alternative. Icons mostly come from `@tabler/icons-react` but their accessible-name behavior in component context is untested. |
| 1.2.1 – 1.2.5 | Time-based media | A/AA | Pass | Pass | No video/audio in scope. |
| 1.3.1 | Info and Relationships | A | Partial | Partial | Headings exist in a few places (Card `<h1>`, KpiChart `<h2>`); zero landmark roles. Charts do not expose tabular data programmatically. |
| 1.3.2 | Meaningful Sequence | A | Partial | Partial | Visual order generally matches DOM order; not validated for filter+chart layouts. |
| 1.3.3 | Sensory Characteristics | A | Pass | Pass | No reliance on "click the red button" instructions. |
| 1.3.4 | Orientation | AA | Pass | Pass | Layouts are responsive; no orientation lock. |
| 1.3.5 | Identify Input Purpose | AA | Untested | Untested | Inputs do not carry `autocomplete` attributes — review against the SC's defined list. |
| 1.4.1 | Use of Color | A | Untested | Untested | Chart color palette (semantic chart-color tokens 1–10) needs validation for color-blind users; status colors not paired with shape/icon. |
| 1.4.2 | Audio Control | A | Pass | Pass | No autoplay audio. |
| 1.4.3 | Contrast (Minimum) | AA | Fail | Fail | No token in the 666-token system carries contrast metadata. Many semantic-token combinations need explicit pairing and validation. |
| 1.4.4 | Resize Text | AA | Partial | Partial | CSS-variable architecture supports zoom in principle; chart text inside `<canvas>` does not reflow. |
| 1.4.5 | Images of Text | AA | Pass | Pass | No text rendered as image in components. |
| 1.4.10 | Reflow | AA | Untested | Untested | Multi-column dashboard layouts need narrow-viewport validation. |
| 1.4.11 | Non-text Contrast | AA | Fail | Fail | No `forced-colors` handling; chart elements have no minimum 3:1 contrast attestation. |
| 1.4.12 | Text Spacing | AA | Partial | Partial | Component CSS uses relative units in most places; needs systematic validation. |
| 1.4.13 | Content on Hover or Focus | AA | Partial | Partial | Tooltips via Radix likely conform; chart tooltips (Chart.js) need validation. |

### Principle 2 — Operable

| SC | Title | Level | UI | PRO | Evidence / notes |
|---|---|---|---|---|---|
| 2.1.1 | Keyboard | A | Partial | Partial | Selects/dropdowns/date pickers conform via Radix and react-day-picker plus hand-written keyboard handling in `SelectFieldContent`. Charts are not keyboard-operable. |
| 2.1.2 | No Keyboard Trap | A | Untested | Untested | Modal `FilterBuilderProModal` needs a focus-trap audit. |
| 2.1.4 | Character Key Shortcuts | A | Pass | Pass | No global single-character shortcuts. |
| 2.2.1 | Timing Adjustable | A | Pass | Pass | No time-limited content in components themselves. |
| 2.2.2 | Pause, Stop, Hide | A | Untested | Untested | Chart animation is on by default with no pause control (see SC 2.3.3 below). |
| 2.3.1 | Three Flashes or Below | A | Pass | Pass | No flashing content. |
| 2.3.3 | Animation from Interactions (AAA, often required) | AAA | Fail | Fail | No `prefers-reduced-motion` guards anywhere in the codebase. |
| 2.4.1 | Bypass Blocks | A | Fail | Fail | No skip links; no landmark roles. |
| 2.4.2 | Page Titled | A | N/A | N/A | Title is the host application's responsibility. |
| 2.4.3 | Focus Order | A | Partial | Partial | Generally OK in controls; chart focus order not defined because charts are not focusable. |
| 2.4.4 | Link Purpose (In Context) | A | Pass | Pass | Few intra-component links; those that exist have purpose. |
| 2.4.5 | Multiple Ways | AA | N/A | N/A | Host application concern. |
| 2.4.6 | Headings and Labels | AA | Partial | Partial | Headings are sparse; labels on inputs are present but not systematically validated. |
| 2.4.7 | Focus Visible | AA | Partial | Partial | `:focus-visible` styles exist in a handful of modules (Select option, Input field, Ghost button) but not consistently. |
| 2.4.11 | Focus Not Obscured (Minimum) | AA (new in 2.2) | Untested | Untested | New criterion; needs validation against the modal-overlay components. |
| 2.5.1 | Pointer Gestures | A | Pass | Pass | Single-pointer alternatives exist for any drag-style interaction. |
| 2.5.2 | Pointer Cancellation | A | Pass | Pass | Standard button behavior. |
| 2.5.3 | Label in Name | A | Untested | Untested | Visible label vs accessible name parity needs systematic audit. |
| 2.5.4 | Motion Actuation | A | Pass | Pass | No motion-triggered functionality. |
| 2.5.7 | Dragging Movements | AA (new in 2.2) | Pass | Pass | No drag-only interactions. |
| 2.5.8 | Target Size (Minimum) | AA (new in 2.2) | Untested | Untested | 24×24 CSS pixel minimum — needs validation against button tokens. |

### Principle 3 — Understandable

| SC | Title | Level | UI | PRO | Evidence / notes |
|---|---|---|---|---|---|
| 3.1.1 | Language of Page | A | N/A | N/A | Host application's responsibility. |
| 3.1.2 | Language of Parts | AA | N/A | N/A | i18next provides per-string locale; not exposed via `lang` attributes today. |
| 3.2.1 | On Focus | A | Untested | Untested | No focus-triggered context changes expected; needs validation. |
| 3.2.2 | On Input | A | Untested | Untested | Filter inputs may trigger automatic chart updates — needs review for AT impact. |
| 3.2.3 | Consistent Navigation | AA | N/A | N/A | Host concern. |
| 3.2.4 | Consistent Identification | AA | Partial | Partial | Component naming is consistent; verified by code review, not user test. |
| 3.2.6 | Consistent Help | A (new in 2.2) | N/A | N/A | Host concern. |
| 3.3.1 | Error Identification | A | Partial | Partial | Form components surface errors visually; AT exposure not validated. |
| 3.3.2 | Labels or Instructions | A | Partial | Partial | Most inputs have labels via the editor wrapper. |
| 3.3.3 | Error Suggestion | AA | Untested | Untested | |
| 3.3.4 | Error Prevention | AA | N/A | N/A | Host responsibility. |
| 3.3.7 | Redundant Entry | A (new in 2.2) | N/A | N/A | Host responsibility. |
| 3.3.8 | Accessible Authentication (Minimum) | AA (new in 2.2) | N/A | N/A | Host responsibility. |

### Principle 4 — Robust

| SC | Title | Level | UI | PRO | Evidence / notes |
|---|---|---|---|---|---|
| 4.1.2 | Name, Role, Value | A | Partial | Partial | ~96 ARIA attributes in UI; usage needs audit. PRO components rely on UI primitives. |
| 4.1.3 | Status Messages | AA | Fail | Fail | No `aria-live` regions; filter changes do not announce. |

### Summary

- **Pass**: ~14 criteria (mostly N/A or trivially satisfied).
- **Partial**: ~15 criteria — work scoped but tractable.
- **Fail**: ~7 criteria — substantive work needed (chart fallback, contrast, motion, status messages, skip/landmarks).
- **Untested**: ~14 criteria — needs a formal walkthrough.

The strongest commitment we can make today: every Fail criterion has a path to remediation in this plan. The Untested set converts to Pass/Partial/Fail through the VPAT-authoring walkthrough scheduled in Phase 1.

---

## 4. Chart-specific accessibility patterns

Charts are the largest source of accessibility risk in the suite. The state of the art (Highcharts Accessibility module, IBM Carbon Charts, Visa Chart Components, Plotly accessibility) has converged on a small set of patterns we should adopt:

### 4.1 The accessible-data-table fallback

Every chart renders an associated, programmatically-hidden-but-discoverable `<table>` containing the underlying data. The table is reachable by screen readers in two modes:

- **Auto-visible** when `prefers-reduced-motion: reduce` is set or when no canvas-accessible AT can render the chart.
- **Toggle** via a "View data as table" button in the chart card menu, always present.

Implementation lands in `ChartCard` (the shared chart wrapper) so that no individual chart needs to re-implement it. Data for the table comes from the same data binding the chart uses — there is no second data path.

### 4.2 The accessible summary statement

Every chart ships with a programmatic `aria-label` and an extended `aria-describedby` summary. The summary states:

1. The chart type ("Bar chart").
2. The number and identity of series.
3. The data extent and notable values ("Values range from 12 to 980; the largest value is in October").

Summaries are generated automatically from the data and configuration; an author can override.

### 4.3 Keyboard chart traversal

Charts become focusable. Once focused:

- Tab cycles between chart series.
- Arrow keys cycle between data points within a series.
- Enter / Space triggers the chart's drill-down event (the same event that mouse click fires).
- Escape returns focus to the chart container.

The Highcharts pattern is the reference; the Visa Chart Components pattern is also a good reference for SVG charts. Because we render via Chart.js to `<canvas>`, the focusable elements are overlay DOM nodes positioned absolutely over the canvas — a common technique.

### 4.4 ARIA live regions for filter changes

When a filter changes the data displayed, the chart announces the change in an `aria-live="polite"` region. The announcement reads, for example, "Chart updated. Now showing 12 series across the last 30 days." This is the most impactful single change for keyboard and screen-reader users navigating a dashboard.

### 4.5 Reduced motion and forced colors

- All Chart.js `animation` options are gated by `prefers-reduced-motion: no-preference`. When the user prefers reduced motion, animations are disabled.
- A `forced-colors`-aware palette is added to the design system. Components render using `CanvasText`, `Highlight`, `LinkText` system color keywords when forced colors are active.

### 4.6 Sonification (future, not launch-critical)

Sonification (Highcharts' approach[^3]) is a powerful enhancement but not necessary for WCAG 2.2 AA conformance. We treat it as a Phase 4 (post-launch) enhancement, not a launch blocker. The Sonifier work referenced in the Highcharts Sonification Studio[^3] is the model we would follow if we adopted it.

---

## 5. Assistive-technology + browser support matrix

A vendor's accessibility claim is only as good as the AT/browser pairings they have tested against. This matrix is the commitment we will document in the VPAT and re-test before each release.

| Operating system | Assistive technology | Browser | Tier |
|---|---|---|---|
| Windows 10/11 | **NVDA** (current stable) | Firefox (latest) | **T1 — full support, tested every release** |
| Windows 10/11 | **NVDA** (current stable) | Chrome (latest) | T1 |
| Windows 10/11 | **JAWS** (current commercial) | Edge Chromium (latest) | T1 |
| macOS (current) | **VoiceOver** | Safari (latest) | T1 |
| iOS (current) | **VoiceOver** | Safari | **T2 — tested quarterly** |
| Android (current) | **TalkBack** | Chrome | T2 |
| Windows | **Dragon NaturallySpeaking** (current) | Edge | **T3 — best-effort; voice input** |
| Windows | **Windows Magnifier**, **ZoomText** | Edge | T3 — visual zoom |
| Windows (locked-down) | NVDA + managed-profile Chrome (no extensions, no developer tools) | n/a | T2 — government environments commonly run this configuration |
| Windows (locked-down) | JAWS + managed-profile Edge | n/a | T2 |

We do **not** test against IE11, legacy Edge, or out-of-support OS versions. We will state this exclusion explicitly in the VPAT.

---

## 6. Testing strategy

Three layers, sequenced in [11 — Technical Roadmap](./11-technical-roadmap.md):

### 6.1 Automated lint and unit

- **`eslint-plugin-jsx-a11y`** in both repos' `eslint.config.js`. Configured to error rather than warn on the recommended rule set. Catches the easy mistakes (missing labels, role misuse, redundant alt text).
- **`@axe-core/react`** invoked in `vitest.setup.ts` against rendered component trees in component tests. Configured to fail tests on violations.
- **`@storybook/addon-a11y`** registered in `remarkable-ui/.storybook/main.ts`. Adds the a11y panel to every story; configured to fail Chromatic / CI runs on regressions.

### 6.2 Story-driven visual and AT testing

- Every public component owns a Storybook story. (Today `remarkable-ui` has 38 stories; `remarkable-pro` has zero. PRO needs a Storybook scaffold — see [11 — Annex A](./11-technical-roadmap.md).)
- Stories include an "accessibility" sub-tab that runs axe in-page.
- For chart components, stories include both the canvas render and the data-table fallback as separate stories.

### 6.3 Manual AT walkthroughs

- A documented walkthrough script per component family (charts, controls, filter builders).
- Walkthrough cadence: per major release for T1; quarterly for T2; annually for T3.
- Results logged into a public ACR (see Section 7) and into the test-evidence index in [14 — Source and Evidence Index](./14-source-and-evidence-index.md).

---

## 7. The Accessibility Conformance Report (ACR) / VPAT

The ACR is the deliverable that turns the engineering work into procurement evidence. Authoring follows the [VPAT 2.5 INT template](https://www.itic.org/policy/accessibility/vpat) structure:

1. **Product identification** — Remarkable PRO and Remarkable UI, with versions as of the report date.
2. **Standards covered** — WCAG 2.1 AA + WCAG 2.2 AA + Revised Section 508 + EN 301 549.
3. **Evaluation methods** — automated (axe-core, Storybook a11y addon), manual (keyboard-only walkthroughs), assistive-technology (the matrix in Section 5).
4. **Conformance tables** — one per standard, with each criterion marked Supports / Partially Supports / Does Not Support / Not Applicable. Remarks reference specific components.
5. **Known issues and roadmap** — open issues with target remediation dates.
6. **Contact and feedback** — accessibility@embeddable.com (or equivalent).
7. **Author and date** — signed by the Accessibility Lead.

We publish the ACR on the public trust center page (see [08 — Section C1](./08-detailed-compliance-gap-analysis.md)).

---

## 8. Documentation requirements

In addition to the ACR:

- **`ACCESSIBILITY.md`** in both repos. Scaffold in [11 — Annex B](./11-technical-roadmap.md). States the conformance target, links to the ACR, names the contact channel, lists known issues with target fix dates.
- **Storybook a11y tab** is the developer-facing accessibility documentation. Each story carries notes about ARIA attributes, expected keyboard behavior, and AT expectations.
- **Per-component a11y notes** inline in Storybook docs.

---

## 9. User-preference handling

The libraries should respect a handful of OS / browser user preferences as a baseline:

| Preference | Required behavior |
|---|---|
| `prefers-reduced-motion: reduce` | Chart animations disabled. CSS transitions suppressed via `@media (prefers-reduced-motion: reduce)`. |
| `prefers-contrast: more` | Components render using a higher-contrast palette variant. |
| `forced-colors: active` (Windows High Contrast mode and equivalents) | Component CSS uses system color keywords (`CanvasText`, `Highlight`). Chart colors substitute system colors where possible. |
| `prefers-color-scheme: dark` | Already supported via theming; document explicitly. |
| `lang` attribute on the host page | Components respect locale via i18next; `lang` attributes are added to component containers where the language differs from the host. |

---

## 10. Open accessibility questions

- **Sonification scope.** Do we adopt sonification as a launch enhancement (joining Highcharts in the differentiated tier) or hold it for post-1.0?
- **Cognitive accessibility.** WCAG 2.2 added several criteria with cognitive-accessibility motivation (3.2.6, 3.3.7). Do we want to make a stronger position than minimum conformance?
- **RTL languages.** No RTL support is present today. Arabic and Hebrew markets are relevant for some target sectors. Do we add RTL in Phase 1 or later?
- **VPAT scope.** Do we author one VPAT covering both libraries, or two? (Recommend: one combined VPAT, with per-component remarks distinguishing UI primitives from PRO components.)

---

## Key takeaways

- Target is WCAG 2.2 Level AA across both libraries; the same work satisfies WCAG 2.1 AA, Section 508 ICT Refresh, and EN 301 549.
- Chart accessibility is the biggest single gap; the fix pattern (data-table fallback + summary + keyboard traversal + live regions) is well-understood.
- Six tooling and process additions (jsx-a11y, axe-core, Storybook a11y addon, Storybook for PRO, AT walkthrough cadence, VPAT authoring) close most of the gap.
- A pinned AT/browser support matrix turns vague accessibility claims into testable commitments.

## Open questions

- Headcount: who owns the Accessibility Lead role? Internal hire, external consultancy, or a contracted accessibility partner (Deque, Tenon, Level Access, TPGi)?
- Are there contractual obligations with existing customers that compress the timeline?
- Should we time the VPAT publication with the ADA Title II Web Rule deadlines or earlier?

## Recommended next steps

1. Appoint or contract the Accessibility Lead.
2. Land jsx-a11y, `@axe-core/react`, and the Storybook a11y addon in both repos (Phase 0 of [11 — Technical Roadmap](./11-technical-roadmap.md)).
3. Begin the chart-data-table fallback in `ChartCard` so that every chart inherits it at once.
4. Run a first WCAG 2.2 AA walkthrough against the UI primitives to convert Untested rows in the SC map into Pass/Partial/Fail.
5. Author the first ACR draft based on that walkthrough.

## Related documents

- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) (Area A1 in particular)
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)
- [13 — Glossary](./13-glossary.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)

---

[^1]: US Access Board / Section 508.gov, "Section 508 Laws and Policies." See [03 — Detailed Market Research](./03-detailed-market-research.md) for the citation list.
[^2]: ADA.gov, "Fact Sheet: New Rule on the Accessibility of Web Content and Mobile Apps Provided by State and Local Governments."
[^3]: Highcharts, "Accessibility" feature page.
[^4]: Visa Chart Components project, GitHub README.
[^5]: Chartability, fizz.studio.
[^6]: W3C, "Web Content Accessibility Guidelines (WCAG) 2.2."
