# 14 — Source and Evidence Index

**Purpose:** Single authoritative index that classifies every claim made elsewhere in this documentation set. Lets a reader trace any statement to its origin and judge how much weight to put on it.

**Audience:** Compliance reviewers, auditors, technical reviewers, anyone fact-checking the analysis.

**Related documents:** [README](./README.md) · [06 — Repository Technical Analysis](./06-repository-technical-analysis.md) · [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) · [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) · [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) · [03 — Detailed Market Research](./03-detailed-market-research.md)

---

## How to read this index

Every claim in this documentation set falls into one of four categories. Throughout the docs you may see parenthetical tags such as *(observed)*, *(inferred)*, *(requires validation)*, or numbered footnotes `[^N]` linking back to entries here.

| Tag | Meaning |
|---|---|
| **Directly observed** | A fact established by reading files in the two repositories. Cited by file path (and line where useful). |
| **Market research with citation** | A claim grounded in a publicly available source (standards body, vendor docs, regulatory text). Cited by URL in [03 — Detailed Market Research](./03-detailed-market-research.md) and the citation pack. |
| **Reasonable assumption** | An inference drawn from observed facts plus general industry knowledge. Should be challenged before being relied on for material decisions. |
| **Requires validation** | A statement whose truth we cannot establish from this audit alone. Flagged so the right stakeholder can confirm or refute it. |

The full repository audit was conducted on 27 May 2026 against the two source trees in `/Users/denisstritar/remarkable-a11y/remarkable-pro` and `/Users/denisstritar/remarkable-a11y/remarkable-ui`. Findings reflect those snapshots; subsequent commits may change the picture.

---

## Section 1 — Directly observed facts about the repositories

### 1.1 Architecture and packaging

| Claim | Evidence |
|---|---|
| `remarkable-pro` is at version 0.3.1 and `remarkable-ui` is at version 3.0.16 | `remarkable-pro/package.json`, `remarkable-ui/package.json` |
| Both libraries are published under the MIT license | `remarkable-pro/LICENSE`, `remarkable-ui/LICENSE` |
| Both repositories belong to the `embeddable-hq` GitHub organization | `repository.url` fields in both `package.json` files |
| `remarkable-pro` depends on `@embeddable.com/remarkable-ui ^3.0.16` — i.e. PRO is layered on top of UI | `remarkable-pro/package.json` |
| `remarkable-ui` builds via `tsup` (ESM-only, dual entry points: `index` and `styles`) | `remarkable-ui/tsup.config.ts` |
| `remarkable-pro` builds via raw `tsc` (no bundler) | `remarkable-pro/package.json` build script |
| Both repositories target Node ≥18 and use TypeScript strict mode with `noUncheckedIndexedAccess` | `tsconfig.json` in each repo |
| Both repositories run Vitest with a `jsdom` environment | `vitest.config.ts` and `vitest.setup.ts` in each repo |
| Architecture is documented in each repo's `ARCHITECTURE.md` | `remarkable-pro/ARCHITECTURE.md` (13.1 KB), `remarkable-ui/ARCHITECTURE.md` (8.0 KB) |

### 1.2 Component inventory

| Claim | Evidence |
|---|---|
| `remarkable-ui` ships chart components for bars, lines, scatter, bubble, pies, donut, KPIs, heatmaps, pivot tables and tables (paginated and scrollable) | `remarkable-ui/src/components/charts/` directory tree |
| `remarkable-ui` ships editor/control components: DateRangePicker, DateRangePickerField, NumberField, TextField, SingleSelectField, MultiSelectField, Switch, Dropdown | `remarkable-ui/src/components/editors/` |
| `remarkable-pro` ships Embeddable-SDK-wired variants of each chart (e.g. `BarChartDefaultPro`, `BarChartStackedPro`, `BarChartGroupedPro`, plus horizontal, line, KPI, pie, donut, scatter, bubble and combo variants) | `remarkable-pro/src/components/charts/` |
| `remarkable-pro` provides 16+ editor variants including a `FilterBuilderPro` (default, compact, modal) | `remarkable-pro/src/components/editors/filters/` |
| The two libraries together contain ~215 `.tsx` source files (139 in `remarkable-ui`, 76 in `remarkable-pro`) | File count |

### 1.3 Testing

| Claim | Evidence |
|---|---|
| `remarkable-ui` contains 66 `.test.*` files against 139 `.tsx` source files (≈47% of source files have an adjacent test) | `find remarkable-ui/src -name "*.test.*"` |
| `remarkable-pro` contains 61 `.test.*` files against 76 `.tsx` source files (≈80%) | `find remarkable-pro/src -name "*.test.*"` |
| `remarkable-ui` has 38 Storybook story files and a configured `.storybook/main.ts` | `remarkable-ui/.storybook/main.ts`, story file count |
| `remarkable-pro` has zero Storybook stories and no `.storybook/` folder | absence of `*.stories.*` and `.storybook/` |
| No axe, jest-axe, `@axe-core/*` or pa11y dependency appears in either repo | grep across both `package.json` files |
| No `eslint-plugin-jsx-a11y` plugin is configured in either repo | `remarkable-pro/eslint.config.js`, `remarkable-ui/eslint.config.js` |

### 1.4 Accessibility signals

| Claim | Evidence |
|---|---|
| `remarkable-ui` contains ~96 occurrences of `aria-*` attributes across components | grep `aria-` in `remarkable-ui/src/` |
| `remarkable-pro` contains only ~5 occurrences of `aria-*` attributes | grep `aria-` in `remarkable-pro/src/` |
| Keyboard navigation is custom-implemented in the shared select content component (ArrowUp/Down/Home/End loop) | `remarkable-ui/src/components/editors/selects/shared/SelectFieldContent/SelectFieldContent.tsx` |
| Date pickers, dropdowns and tooltips delegate to accessible third-party primitives | `remarkable-ui/package.json` dependencies: `react-day-picker ^9.12.0`, `@radix-ui/react-dropdown-menu ^2.1.15`, `@radix-ui/react-tooltip ^1.2.8` |
| `:focus-visible` styles are defined in a small set of CSS modules (Select option, Input field, Ghost button) | `remarkable-ui/src/components/editors/selects/shared/SelectFieldOption.module.css`, `InputField.module.css`, `GhostButton.module.css` |
| Charts render through Chart.js into a `<canvas>` element without an accessible fallback (no associated `<table>`, no long description, no summary) | `remarkable-ui/src/components/charts/bars/BarChart.tsx` and sibling chart files |
| There are 4 heading uses (Card uses `<h1>`, KpiChart uses `<h2>`) and **zero** ARIA landmark roles | grep `<h[1-6]>`, `role="main"`, `role="region"`, `role="navigation"` |
| There are **zero** occurrences of `prefers-reduced-motion`, `prefers-contrast`, or `forced-colors` | grep across both repos |
| `remarkable-ui` does not register the Storybook `@storybook/addon-a11y` addon | `remarkable-ui/.storybook/main.ts` add-on list |
| `remarkable-pro` ships internationalization with English and German translations using i18next | `remarkable-pro/src/theme/i18n/i18n.ts`, `remarkable-pro/src/theme/i18n/translations/{en,de}.ts` |
| `remarkable-pro` has ~248 i18next call-sites | grep `t(` / i18next usage |
| `remarkable-ui` has no built-in i18n; strings are component-level only | absence of i18n setup in `remarkable-ui` |

### 1.5 Security and privacy signals

| Claim | Evidence |
|---|---|
| Neither library calls `fetch`, `axios`, `XMLHttpRequest` or `WebSocket` directly | grep across both `src/` trees |
| All data fetching is routed through `@embeddable.com/core` / `@embeddable.com/react` (the Embeddable runtime) | `loadData` import in `remarkable-pro` component `definition.ts` files; `@embeddable.com/*` in `remarkable-pro/package.json` |
| `remarkable-pro` writes a single `sessionStorage` entry under the key `embeddable` to persist chart color assignments across page refreshes | `remarkable-pro/src/theme/styles/styles.utils.ts:47` |
| Export pipeline exists for CSV, XLSX and PNG via `xlsx` and `dom-to-image-more` | `remarkable-pro/src/theme/utils/export.utils.ts` |
| The export pipeline honors a `data-no-export` DOM attribute as an opt-out signal | `remarkable-pro/src/theme/utils/export.utils.ts:91` |
| `xlsx` is pinned to the `@e965/xlsx` fork rather than the upstream SheetJS distribution | `remarkable-pro/package.json` dependencies |
| `axios` is force-overridden to `1.13.6` | `remarkable-pro/package.json` `overrides` |
| There is exactly one use of `dangerouslySetInnerHTML` across both repos — used to render a URL-decoded SVG icon, not user-controlled HTML | `remarkable-pro/src/components/charts/shared/ChartCard/ChartCardMenuPro/ChartCardMenuPro.tsx:24` |
| `react-markdown` (with `remark-gfm`) is the only Markdown renderer; it sanitizes by default | `remarkable-ui/package.json` |
| Neither library bundles or invokes any third-party analytics, telemetry, error-reporting or cookies (no `gtag`, `posthog`, `segment`, `amplitude`, `sentry`, `document.cookie`) | grep across both repos |
| Neither library reads or writes process environment variables | grep `process.env` |
| Neither library defines a CSP, sandboxed iframe or postMessage protocol | grep across both repos |

### 1.6 Continuous integration

| Claim | Evidence |
|---|---|
| Both repositories run a `pull-request.yml` GitHub Actions workflow that performs lint, type-check, test and build on each PR | `.github/workflows/pull-request.yml` in each repo |
| Both repositories run a `sonar.yml` workflow that submits the source tree to SonarCloud for SAST | `.github/workflows/sonar.yml`, `sonar-project.properties` |
| Both repositories use `changesets` for versioning and have `release.yml` and `publish.yml` workflows for the version-PR + npm publish flow | `.github/workflows/release.yml`, `.github/workflows/publish.yml`, `.changeset/` directory |
| Neither repository defines a Dependabot configuration, CodeQL workflow, or Snyk integration | absence of `.github/dependabot.yml`, `.github/workflows/codeql.yml` |
| Neither repository contains a `SECURITY.md`, `CONTRIBUTING.md`, `ACCESSIBILITY.md` or `CODE_OF_CONDUCT.md` at the root | directory listings |

### 1.7 Design system

| Claim | Evidence |
|---|---|
| `remarkable-ui` defines a three-layer CSS-variable token system (core, semantic, component) totaling 666 tokens | `remarkable-ui/src/styles/global.tokens.ts`, `remarkable-ui/src/styles/global.css` |
| The semantic layer includes chart colors numbered `--em-sem-chart-color--1` through `--em-sem-chart-color--10` | `remarkable-ui/src/styles/global.tokens.ts` |
| No token in the system is annotated with WCAG contrast metadata | grep for contrast-related comments in token files |

---

## Section 2 — Claims marked as inferred or requiring validation

The following statements appear in the documentation set but are not directly observable from the source tree alone. They should be confirmed before being used in material commercial communications.

| Claim | Why we flagged it | Where it appears |
|---|---|---|
| The Embeddable platform (the host SDK these libraries embed into) holds or is pursuing specific certifications such as SOC 2, ISO 27001, HIPAA-BAA, FedRAMP | This depends on the corporate posture of Embeddable, not the libraries themselves | [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) |
| Embeddable's customer base today skews toward (or away from) regulated sectors | We have no telemetry or customer-list evidence | [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) |
| The size of the embedded-analytics market and the share addressed by compliance-first products | We rely on cited industry analyst reports, not first-party data | [03 — Detailed Market Research](./03-detailed-market-research.md) |
| Specific competitors' VPAT or ACR documents are up to date | Vendor accessibility pages can lag behind product changes | [03 — Detailed Market Research](./03-detailed-market-research.md) |
| The chart components are *not* compliant with HIPAA, SOC 2, ISO 27001, FedRAMP, FIPS or CMMC | The libraries themselves are not the unit of certification — these certifications are issued against operating environments and organizations. The libraries are **compliance-ready building blocks**, not certified products | All docs — language discipline is applied throughout |
| Buyers in defense and intelligence sectors require air-gapped deployment | A general industry expectation, not specific to any single customer | [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) |
| The effort estimates (S / M / L / XL) attached to roadmap items in [11 — Technical Roadmap](./11-technical-roadmap.md) | Estimates are analyst judgement based on observed code, not from the engineering team | [11 — Technical Roadmap](./11-technical-roadmap.md) |

---

## Section 3 — Market and standards citations

The full citation list (URLs and snippets) lives at the bottom of [03 — Detailed Market Research](./03-detailed-market-research.md). For each standard, the most authoritative source is cited rather than secondary commentary:

- W3C for WCAG 2.2 and ARIA
- US Access Board for Section 508
- ETSI for EN 301 549
- HHS Office for Civil Rights for HIPAA
- European Commission and Official Journal for EU regulations (EAA, AI Act, DORA, GDPR)
- NIST for SP 800-53, SP 800-66, SP 800-218 (SSDF), CSF 2.0
- FedRAMP PMO for FedRAMP baselines
- DoD CIO for CMMC and Cloud Computing SRG
- Vendor documentation for accessible chart libraries (Highcharts, IBM Carbon, Visa Chart Components)

If any cited URL has moved or changed since this audit, the canonical source — not the URL — is the binding reference.

---

## Section 4 — Audit methodology and limitations

**Tooling used:**
- `grep` / `find` across both source trees
- Read of every `ARCHITECTURE.md`, `README.md`, `CHANGELOG.md`, `package.json`, `tsconfig.json`, `vitest.config.ts`, `eslint.config.js`, `.github/workflows/*.yml`
- Spot reads of representative chart and editor component implementations
- Targeted WebFetch / WebSearch for the regulatory and competitive citations (logged in the citation pack)

**Explicit limitations:**
- We did not execute the test suites or measure runtime behavior.
- We did not run `npm audit`, `osv-scanner`, `snyk test` or any dynamic dependency scanner. Vulnerability counts in this set therefore reflect grep-level visibility only.
- We did not perform a live screen-reader walkthrough; accessibility findings reflect static analysis of source code.
- We did not contact the Embeddable platform team to verify any claim about the host runtime's compliance posture.
- We did not review the Embeddable platform's SDK source (`@embeddable.com/core`, `@embeddable.com/react`) because it is not part of this audit's scope.
- We did not validate any vendor's VPAT or certification claim against an actual certificate or audit letter.

---

## Key takeaways

- Every concrete claim about the two repositories is traceable to a file path inside them.
- Every claim about regulations, standards, or competitors comes with a URL in the citation pack — not analyst paraphrase.
- Statements about Embeddable's corporate compliance posture are flagged for validation; the libraries themselves are not the unit of certification.
- Effort estimates in the roadmap are analyst judgement and should be re-estimated by engineering before commitment.

## Open questions

- Is the Embeddable platform itself pursuing or holding SOC 2 / ISO 27001 / HIPAA BAA capability today? (See [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md).)
- What proportion of Embeddable's existing customer base is in the regulated sectors targeted by this work? (See [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md).)
- Are any external contributors (component developers, design partners) already producing components that would need to be brought into the same governance regime?

## Recommended next steps

1. Confirm or update the inferred / requires-validation items in Section 2 with input from Embeddable leadership, compliance, and engineering.
2. Re-run grep audits against `main` of both repos quarterly to detect drift from the snapshot captured here.
3. Add a `docs/` folder in each repository pointing back to this analysis so engineering decisions can cite it directly.

## Related documents

- [README](./README.md)
- [01 — Executive Overview](./01-executive-overview.md)
- [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
- [03 — Detailed Market Research](./03-detailed-market-research.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
