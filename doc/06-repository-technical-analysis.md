# 06 — Repository Technical Analysis

**Purpose:** A detailed, evidence-grounded technical analysis of both repositories. Reads as a code review of the two libraries together, focused on what they actually do, how they fit together, and where the gaps are.

**Audience:** Engineering, architecture, platform and DevSecOps reviewers. Compliance reviewers who want to verify the claims in [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md).

**Related documents:** [05 — Repository Overview](./05-repository-overview.md) (non-technical) · [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) · [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) · [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) · [14 — Source and Evidence Index](./14-source-and-evidence-index.md)

---

## 1. The two repositories in context

The Remarkable suite is delivered as two npm packages that ship from two GitHub repositories under the `embeddable-hq` organization:

| Aspect | `remarkable-ui` | `remarkable-pro` |
|---|---|---|
| npm package | `@embeddable.com/remarkable-ui` | `@embeddable.com/remarkable-pro` |
| Version at audit | 3.0.16 | 0.3.1 |
| Role | Open primitive library (charts, controls, design tokens) | Pre-configured Embeddable-SDK-wired components built on top of `remarkable-ui` |
| Build tool | `tsup` (ESM-only, dual entries `index` + `styles`) | `tsc` (no bundler) |
| Test runner | Vitest + jsdom | Vitest + jsdom |
| Storybook | Yes (`9.0.17`) | No (`.storybook/` folder absent) |
| License | MIT | MIT |
| Internal docs | `ARCHITECTURE.md` (8 KB), `README.md` | `ARCHITECTURE.md` (13 KB), `README.md` |
| Repository governance docs (CONTRIBUTING, SECURITY, ACCESSIBILITY, CODE_OF_CONDUCT) | None present | None present |

`remarkable-pro` declares `@embeddable.com/remarkable-ui ^3.0.16` as a runtime dependency in [remarkable-pro/package.json](../remarkable-pro/package.json). The two packages are therefore not parallel — PRO is a higher-level wrapper that composes UI primitives into ready-to-drop-in Embeddable components.

### Why the version-number gap matters

`remarkable-ui` at 3.0.16 signals a library that has gone through two major-version breaking changes and is in stable patch mode. `remarkable-pro` at 0.3.1 still flies the "pre-1.0" flag: under SemVer that means breaking changes can land in any patch release. Stakeholders evaluating PRO for enterprise commitments need to know that PRO has not yet reached its own API stability milestone, even though the underlying UI library has.

---

## 2. Architecture

### 2.1 `remarkable-ui`

The repository's `src/` is organized by component family:

```
remarkable-ui/src/
├── components/
│   ├── charts/
│   │   ├── bars/                 (BarChart.tsx + tests + stories)
│   │   ├── lines/                (LineChart.tsx + tests + stories)
│   │   ├── scatter/              (ScatterChart, BubbleChart + tests + stories)
│   │   ├── pies/                 (PieChart, DonutChart + tests + stories)
│   │   ├── kpis/                 (KpiChart + hooks)
│   │   ├── tables/
│   │   │   ├── Table/            (TablePaginated, TableScrollable)
│   │   │   ├── HeatMap/
│   │   │   └── PivotTable/
│   │   └── shared/               (ChartCard and chart-level shared pieces)
│   ├── editors/
│   │   ├── dates/                (DateRangePicker, DateRangePickerField)
│   │   ├── inputs/               (NumberField, TextField)
│   │   ├── selects/              (SingleSelectField, MultiSelectField + shared SelectFieldContent)
│   │   └── Switch/
│   └── shared/                   (Button, ActionIcon, Card, Dropdown, Tooltip, Typography, …)
├── styles/
│   ├── global.css                (CSS variable declarations — 666 tokens)
│   ├── global.tokens.ts          (TypeScript-side token mirror)
│   ├── styles.constants.ts
│   └── styles.utils.ts
└── index.ts                      (public surface — ~82 named exports)
```

Each leaf component folder typically contains:

- `Component.tsx` — the React implementation
- `Component.module.css` — scoped CSS modules
- `Component.test.tsx` — Vitest test
- `Component.stories.tsx` — Storybook story
- Optional `.types.ts`, `.utils.ts`, `.hooks.ts`

The leading-by-example structure is the shared `SelectFieldContent.tsx` and the `Switch.tsx` component, both of which implement keyboard navigation and ARIA attributes themselves rather than relying on a downstream library.

### 2.2 `remarkable-pro`

The repository's `src/` is organized similarly, with one important addition — every component is paired with a `definition.ts` and a `*.emb.ts` SDK wrapper:

```
remarkable-pro/src/
├── components/
│   ├── charts/
│   │   ├── bars/                 (BarChartDefaultPro, BarChartStackedPro, BarChartGroupedPro, + horizontal)
│   │   ├── lines/                (LineChartDefaultPro, LineChartGroupedPro, LineChartComparisonDefaultPro)
│   │   ├── kpis/                 (KpiChartNumberPro, KpiChartNumberComparisonPro)
│   │   ├── pies/                 (PieChartPro, DonutChartPro, DonutLabelChartPro)
│   │   ├── scatter/              (ScatterChartPro, BubbleChartPro)
│   │   ├── combo/                (BarLineChartPro)
│   │   └── shared/               (ChartCard, ChartCardMenuPro)
│   ├── editors/
│   │   ├── dates/                (DateRangePickerPresetsPro, ComparisonPeriodSelectFieldPro)
│   │   ├── filters/              (FilterBuilderPro, FilterBuilderProCompact, FilterBuilderProModal)
│   │   └── …                     (SingleSelectFieldPro, MultiSelectFieldPro, NumberFieldPro, TextFieldPro)
│   ├── component.inputs.constants.ts
│   ├── component.subinputs.constants.ts
│   ├── preview.data.constants.ts
│   ├── types/                    (DisplayFormat.type.emb.ts, …)
│   └── utils/                    (timeRange.utils.ts, …)
├── editors/
│   └── ColorEditor/
├── theme/
│   ├── theme.constants.ts
│   ├── theme.types.ts
│   ├── defaults/
│   ├── formatter/
│   ├── i18n/
│   │   ├── i18n.ts                (i18next singleton)
│   │   └── translations/
│   │       ├── en.ts
│   │       └── de.ts
│   ├── styles/
│   └── utils/
│       └── export.utils.ts        (CSV / XLSX / PNG export pipeline)
├── utils/
└── types/
```

The PRO architecture's defining pattern is the [`definition.ts` / `*.emb.ts` split documented in `remarkable-pro/ARCHITECTURE.md`](../remarkable-pro/ARCHITECTURE.md):

- `definition.ts` is the single source of truth: `meta` (inputs, events), `preview`, `loadData*` functions, `events` mapping and `props` mapping.
- `*.emb.ts` is intentionally three lines: a re-export of `preview`, `meta`, and `defineComponent(Component, meta, config)`.

This separation has two important consequences for compliance work:

1. **The component is testable in isolation** — tests can import the React component and `definition` without bringing in the SDK.
2. **The SDK is the only network boundary** — components do not call `fetch`/`axios` themselves; data arrives through the `loadData` calls declared in `definition.ts` and resolved by the host runtime (`@embeddable.com/core` v2.13.7 at the time of this audit).

---

## 3. Component inventory

A breakdown of what each library ships, with test/story coverage.

### 3.1 Charts (remarkable-ui primitives)

| Component | Tests | Storybook story |
|---|---|---|
| BarChart | yes | yes |
| LineChart | yes | yes |
| ScatterChart | yes | yes |
| BubbleChart | yes | yes |
| PieChart | yes | yes |
| DonutChart | yes | yes |
| KpiChart | indirect (hook tests) | partial |
| HeatMap | not found alongside | not found |
| PivotTable | not found alongside | not found |
| TablePaginated | yes | partial |
| TableScrollable | not found alongside | not found |

### 3.2 Editors / controls (remarkable-ui primitives)

| Component | Tests | Storybook story |
|---|---|---|
| DateRangePicker | yes | yes |
| DateRangePickerField | yes | yes |
| NumberField | yes | yes |
| TextField | yes | yes |
| SingleSelectField | yes | yes |
| MultiSelectField | yes | partial |
| Switch | yes | yes |
| Dropdown (shared) | yes | — |

### 3.3 Charts (remarkable-pro)

`remarkable-pro` adds 12+ chart variants on top of UI primitives. Every one carries a `definition.ts` and `*.emb.ts`. Tests for chart definitions exist (~80% of source files have an adjacent test), but **none of the PRO components has a Storybook story** — the repository has no `.storybook/` configuration.

Visually browsing PRO components today therefore requires running the Embeddable canvas; there is no isolated visual workshop.

### 3.4 Editors (remarkable-pro)

The most distinctive PRO editor is `FilterBuilderPro` (with `Compact` and `Modal` variants). These are large, stateful filter UIs targeting the kind of query builders BI users expect. They are the components most likely to surface in procurement conversations about accessibility — large interactive forms with multiple control types.

### 3.5 Public API surface

`remarkable-ui/src/index.ts` exports approximately 82 named symbols: all charts, all editors, ~12 shared primitives (`Button`, `ButtonIcon`, `ActionIcon`, `Card`, `Dropdown`, `Tooltip`, `Typography`, `Divider`, `Skeleton`, etc.), a handful of utility hooks (`useDebounce`, `useResizeObserver`, date/object utilities) and chart/style constants.

`remarkable-pro` exports types, definitions and helpers rather than React component instances — the PRO components are intended to be consumed via the Embeddable SDK runtime, not imported directly into custom JSX.

---

## 4. Theming and design tokens

`remarkable-ui` defines a three-layer CSS-variable token system in `src/styles/global.css` (mirrored in `global.tokens.ts`):

| Layer | Prefix | Examples | Purpose |
|---|---|---|---|
| Core | `--em-core-*` | `--em-core-color-blue-500`, `--em-core-spacing-4`, `--em-core-font-size-base` | Raw primitives. Not for direct use by consumers. |
| Semantic | `--em-sem-*` | `--em-sem-background`, `--em-sem-text`, `--em-sem-chart-color--1` … `--10`, `--em-sem-status-success` | The brand-and-intent layer. Where teams override. |
| Component | `--em-{component}-*` | `--em-card-border-radius`, `--em-card-subtitle-color` | Per-component refinement. |

The system totals **666 tokens**. The architecture is mature and uncommonly clean. Two compliance-relevant observations:

1. **No token is annotated with WCAG contrast metadata.** A reader cannot ask the token system "which combinations meet 4.5:1?" — a contrast catalog would need to be added.
2. **No tokens for `prefers-contrast`, `forced-colors`, or `prefers-reduced-motion` are present.** The system has no high-contrast alternative palette and no reduced-motion variant.

`remarkable-pro` adds a runtime theme layer on top of UI tokens via `src/theme/theme.types.ts`, which defines a `Theme` interface with five sub-objects:

- `i18n` — language and translations (via i18next; English and German at audit time)
- `charts` — color maps, legend position, per-chart-type overrides for Chart.js options
- `styles` — styling defaults
- `formatter` — number, date, string and theme formatters
- `defaults` — comparison periods, date-range presets, chart menu options
- `clientContext` — timezone, custom client context

The theme is wired through component definitions; there is no global React context provider visible at the package boundary.

---

## 5. Dependencies and their compliance posture

### 5.1 `remarkable-ui` runtime dependencies

| Package | Pinned range | Compliance/security note |
|---|---|---|
| `chart.js` | `^4.5.0` | Renders to `<canvas>` — has no built-in screen-reader accessible output. Major lever for chart-a11y work. |
| `react-chartjs-2` | `^5.3.0` | Thin React wrapper for chart.js. |
| `chartjs-plugin-datalabels` | `^2.2.0` | Inline data labels on charts. |
| `chartjs-plugin-annotation` | `^3.1.0` | Annotations and threshold lines. |
| `@radix-ui/react-dropdown-menu` | `^2.1.15` | Accessibility-vetted primitive. Provides keyboard, focus and ARIA semantics. |
| `@radix-ui/react-tooltip` | `^1.2.8` | Accessibility-vetted primitive. |
| `react-day-picker` | `^9.12.0` | Accessibility-vetted date-grid component. |
| `@tabler/icons-react` | `^3.34.1` | SVG icon set. |
| `auto-text-size` | `^0.2.3` | Auto-fits text. |
| `dayjs` | `^1.11.19` | Date library; far lighter than moment. |
| `clsx` | `^2.1.1` | Class-name composition. |
| `mergician` | `^2.0.2` | Deep-merge utility. |
| `react-markdown` | `^10.1.0` | Markdown renderer; sanitizes by default. |
| `remark-gfm` | `^4.0.1` | GitHub-flavored Markdown extension. |

### 5.2 `remarkable-pro` runtime dependencies (beyond UI)

| Package | Pinned range | Compliance/security note |
|---|---|---|
| `@embeddable.com/core` | `^2.13.7` | Embeddable runtime — the platform delegating data fetching, auth and tenancy. |
| `@embeddable.com/react` | `^2.13.7` | React integration for the Embeddable runtime. |
| `@embeddable.com/remarkable-ui` | `^3.0.16` | Peer library (this audit's `remarkable-ui`). |
| `i18next` | `^25.3.2` | Localization. ~248 call-sites. |
| `chroma-js` | `^3.1.2` | Color manipulation for palette generation. |
| `dom-to-image-more` | `^3.6.3` | DOM-to-image rasterization for PNG export. Loads images into a foreign object — a known exfiltration vector if untrusted content is in scope. |
| `xlsx` (as `@e965/xlsx ^0.20.3`) | pinned | A community fork of SheetJS. The pin to `@e965/xlsx` instead of the upstream `xlsx` is a deliberate choice consistent with concerns about the upstream distribution path. |
| `fast-equals` | `^6.0.0` | Equality utility. |
| `dayjs` | `^1.11.14` | Date library. |

The `package.json` also pins `axios` via an `overrides` block to `1.13.6`, even though no source file imports axios directly. The override constrains the version that transitive dependencies can resolve.

### 5.3 Dev dependencies of note

Both repositories carry a strong dev-dep set: TypeScript 5.8, Vitest 4, ESLint 9, Prettier 3, Storybook 9 (UI only), `madge` for circular-dependency checks, `changesets/cli` for versioning. **No `eslint-plugin-jsx-a11y`** plugin is configured in either repo's `eslint.config.js`. **No `@axe-core/*` package** appears in either dev-dep set.

---

## 6. Testing and CI

### 6.1 Vitest configuration

Both repositories' `vitest.config.ts` and `vitest.setup.ts` configure jsdom-based unit testing with v8 coverage. Neither registers `jest-axe`, `vitest-axe`, or any chart-rendering test harness beyond React Testing Library.

Coverage proportions:

| Repository | Test files | Source `.tsx` files | Approx coverage by file |
|---|---|---|---|
| `remarkable-ui` | 66 | 139 | ≈47% |
| `remarkable-pro` | 61 | 76 | ≈80% |

Note: this measures *file* coverage, not *line* coverage. We did not execute the suites in this audit, so we report only that coverage configuration exists and that adjacent test files exist for many components.

### 6.2 GitHub Actions

Both repositories run the same five-workflow set (with one extra each):

| Workflow file | What it does |
|---|---|
| `pull-request.yml` | Lint, type-check, test, build on PR |
| `sonar.yml` | SonarCloud SAST analysis |
| `release.yml` | Changesets version-PR automation |
| `publish.yml` | npm publish on version-PR merge |
| `release-automation.yml` (PRO only) | Additional release automation |
| `deploy-storybook.yml` (UI only) | Publishes Storybook to GitHub Pages |

SonarCloud configuration (`sonar-project.properties`) excludes test, type, story and `definition.ts` files from scanning.

**Absent and notable:**

- No `dependabot.yml`
- No `.github/workflows/codeql.yml`
- No Snyk, OSV-Scanner or Trivy integration
- No `npm provenance` configuration on publish workflows (statement only — would need to inspect the workflow file to confirm)
- No branch-protection or signed-commits policy is observable from the workflow files alone

---

## 7. Security observations

### 7.1 Data fetching

Neither repository imports `fetch`, `axios`, `XMLHttpRequest` or `WebSocket` directly. Data arrives via the Embeddable SDK runtime through `loadData(...)` calls expressed in component `definition.ts` files (see `remarkable-pro/ARCHITECTURE.md` for the canonical pattern). This is favorable from a compliance standpoint: there is one network boundary, and it is the host platform.

### 7.2 Client-side persistence

A single `sessionStorage` write exists in [remarkable-pro/src/theme/styles/styles.utils.ts:47](../remarkable-pro/src/theme/styles/styles.utils.ts), persisting chart color assignments across page refreshes under the key `embeddable`. The stored value is not user data — it is theme-color-assignment metadata — but its presence should be documented in any DPIA.

### 7.3 The export pipeline

[remarkable-pro/src/theme/utils/export.utils.ts](../remarkable-pro/src/theme/utils/export.utils.ts) exposes `exportCSV`, `exportXLSX` and `exportPNG`. The first two use `xlsx`/Blob; the third uses `dom-to-image-more`. The pipeline honors a `data-no-export` attribute on DOM nodes as an opt-out signal at line 91 — a useful primitive for redacting sensitive elements from exports.

From a compliance perspective, the export pipeline is the principal place where data leaves the browser under the user's control. Three observations:

1. There is no audit-log hook that emits an event "user X exported data Y at time Z." For HIPAA, GDPR, SOC 2 audit requirements, an audit hook is the kind of feature procurement reviewers will look for.
2. The PNG export rasterizes the live DOM; any CSS-injected content (theme variables) is captured. A maliciously themed page could exfiltrate cross-origin pixel content if the host application allowed it — but this is a host-application threat, not a component threat.
3. The CSV/XLSX export is a pure client-side blob download; there is no server round-trip. This is favorable for data-residency expectations.

### 7.4 Markup injection surface

A single use of `dangerouslySetInnerHTML` exists at [remarkable-pro/src/components/charts/shared/ChartCard/ChartCardMenuPro/ChartCardMenuPro.tsx:24](../remarkable-pro/src/components/charts/shared/ChartCard/ChartCardMenuPro/ChartCardMenuPro.tsx). It renders a URL-decoded SVG data URL into an icon span. The source string is hardcoded — not user input — so this is currently safe. It is, however, exactly the kind of construct that has to be flagged in a threat model because the moment input flows into it, it becomes an XSS surface.

`react-markdown` is the only Markdown renderer in scope and sanitizes by default. No `eval`, `Function(...)`, or `innerHTML` assignments were found.

### 7.5 Authentication, authorization, secrets

Neither repository contains authentication or authorization logic; both delegate to the Embeddable SDK and to the host application via `clientContext`. No secrets or API keys appear in the source. No environment variables are read. No third-party analytics, telemetry, error reporting (Sentry, posthog, segment, amplitude) or cookies (`document.cookie`) are bundled. This is favorable for buyers worried about hidden network exfiltration.

### 7.6 Encryption

No cryptography code is present in either library. Encryption is implicitly the host platform's responsibility. This means any FIPS 140-3 attestation or KMS commentary needs to come from the Embeddable platform, not from these libraries.

---

## 8. Accessibility observations (summary; full plan in [09](./09-accessibility-readiness-plan.md))

| Signal | Evidence |
|---|---|
| ARIA attributes in `remarkable-ui` | ~96 occurrences. Concentrated in `Switch`, `SingleSelectField`, `PivotTable`. |
| ARIA attributes in `remarkable-pro` | ~5 occurrences only. |
| Keyboard navigation hand-written | Yes — best example is `SelectFieldContent.tsx` (Arrow/Home/End loop). |
| Keyboard navigation via accessible primitives | Yes — Radix dropdown menu, Radix tooltip, react-day-picker date grid. |
| `:focus-visible` styling | Sparse but present (Select option, Input field, Ghost button modules). |
| Chart canvas accessibility | None. Charts render to `<canvas>` via Chart.js with no associated `<table>`, summary, longdesc, or sonification. |
| Landmarks (`role="main"`, `role="region"`, `role="navigation"`) | Zero. |
| Headings | 4 occurrences (Card uses `<h1>`, KpiChart uses `<h2>`). |
| `prefers-reduced-motion` | Zero. |
| `prefers-contrast` / `forced-colors` | Zero. |
| Axe / jsx-a11y / Storybook a11y addon | None configured. |
| i18n | `remarkable-pro` only (English + German). No RTL support found. |

The headline finding: the **interactive controls** (selects, dropdowns, date pickers, switch) inherit a respectable accessibility baseline through Radix and react-day-picker and a handful of hand-written components. The **charts** do not — Chart.js canvases are inaccessible by default and no fallback is in place.

---

## 9. Documentation maturity

| Doc | `remarkable-ui` | `remarkable-pro` |
|---|---|---|
| `README.md` | yes | yes |
| `ARCHITECTURE.md` | yes (8 KB) | yes (13 KB) |
| `CHANGELOG.md` | yes | yes |
| `CONTRIBUTING.md` | missing | missing |
| `SECURITY.md` | missing | missing |
| `ACCESSIBILITY.md` | missing | missing |
| `CODE_OF_CONDUCT.md` | missing | missing |
| Storybook | yes | missing |

The internal architecture docs are unusually good (the PRO `ARCHITECTURE.md` walks through the `definition.ts` / `*.emb.ts` pattern in detail). The external governance documentation is absent. For a procurement officer screening for "does this vendor follow responsible-disclosure practices?" the absence of `SECURITY.md` is a missing signal regardless of how strong the actual internal practice is.

---

## 10. Build, packaging and release

`remarkable-ui` uses `tsup` to emit two entry points:

- `dist/index.js` — the runtime library
- `dist/styles.js` — a separate entry that yields the CSS-variable token surface

Externals include React/ReactDOM, `@radix-ui/*`, `chart.js`, `clsx` and `mergician`. ESM only.

`remarkable-pro` uses raw `tsc` to emit `dist/`. ESM only.

Both repositories use `changesets` for SemVer management and have a release workflow that opens a version PR and publishes to npm on merge.

Two compliance-relevant absences:

1. **No npm publish provenance configured.** Procurement reviewers increasingly ask for npm provenance (sigstore-signed package metadata).
2. **No SBOM generation step.** Neither workflow emits a CycloneDX or SPDX artifact at release.

---

## 11. Maintainability risks

- **PRO is at version 0.3.1.** Pre-1.0 status combined with no Storybook makes the PRO surface harder to evaluate and document for downstream teams.
- **The chart-rendering layer is built on Chart.js.** Chart.js's canvas rendering is a long-term ceiling on accessibility unless paired with parallel DOM-based fallbacks. Migrating later to an SVG-based renderer is a non-trivial refactor.
- **No design-system contrast metadata.** Adding contrast pairs and `forced-colors` support after the fact is more painful than baking them into the token system from the start.
- **Test rigor is uneven.** Several chart components (HeatMap, PivotTable, TableScrollable) lack adjacent test files. Coverage may be acceptable but it is not visibly enforced as a gate.

---

## 12. What we did not analyze

For transparency about scope:

- We did not execute the Vitest suites.
- We did not run `npm audit`, `osv-scanner`, or any dynamic dependency scan.
- We did not bundle and measure runtime size.
- We did not review the Embeddable SDK (`@embeddable.com/core`, `@embeddable.com/react`) source — it is a black box for this audit.
- We did not perform a live screen-reader walkthrough.

These would be sensible next steps for an engineering follow-up.

---

## Key takeaways

- The two libraries together are technically clean: strict TypeScript, vitest + jsdom, MIT license, CI lint+test gates, mature 666-token design system in `remarkable-ui`.
- `remarkable-ui` is at stable 3.x; `remarkable-pro` is still 0.3.x and lacks Storybook. The maturity gap is real and worth a stakeholder conversation.
- Security surface area is small and tightly scoped to the host runtime (no direct network, no third-party telemetry, one safe `dangerouslySetInnerHTML`, deliberate xlsx fork pin).
- Accessibility is moderately strong on controls (Radix + react-day-picker + hand-written keyboard nav) and **absent on charts** (Chart.js canvases, no fallback).
- Governance documentation (`SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`) and supply-chain tooling (Dependabot, CodeQL, SBOM, provenance) are not yet in place.

## Open questions

- Does the Embeddable platform's SDK runtime carry compliance commitments (SOC 2 Type II, ISO 27001, HIPAA BAA capability) that the libraries can inherit? See [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md).
- What is the planned cadence to bring `remarkable-pro` to 1.0?
- Is there an existing private SECURITY/disclosure process that simply isn't published?

## Recommended next steps

1. Run the Vitest suites and `npm audit` to convert the static observations above into runtime evidence.
2. Add governance documentation (`SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`) to both repositories — scaffolds provided in [11 — Technical Roadmap Annex B](./11-technical-roadmap.md).
3. Add `eslint-plugin-jsx-a11y` to both repositories' lint configs and `@axe-core/react` to test setup.
4. Add `dependabot.yml` and `codeql.yml` to both repositories.
5. Begin the chart-a11y fallback strategy described in [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md).

## Related documents

- [05 — Repository Overview](./05-repository-overview.md) — non-technical version of this analysis
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)
