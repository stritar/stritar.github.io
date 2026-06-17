# 11 — Technical Roadmap

**Purpose:** A phased, actionable roadmap from the current state of the Remarkable suite to a credible compliance-ready position. Each phase has measurable acceptance criteria, an effort estimate, an owner function, and explicit dependencies. Includes a risk register, a file-level change list (Annex A), and copy-pasteable scaffolds for the missing governance documents (Annex B).

**Audience:** Engineering leadership, program management, the (to-be-appointed) Accessibility Lead, Platform/DevSecOps, Product Marketing, Compliance/GRC.

**Related documents:** [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) · [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) · [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) · [06 — Repository Technical Analysis](./06-repository-technical-analysis.md) · [14 — Source and Evidence Index](./14-source-and-evidence-index.md)

---

## 1. How to read this roadmap

Five phases. Each phase is sized in months, with the recognition that any given organization may compress or extend the timeline based on team size and existing commitments. The phases overlap deliberately — Phase 2 work can begin while Phase 1 is in flight.

**Effort bands** (analyst estimate; engineering should re-estimate):

- **S** — under 1 sprint (≤ 2 weeks)
- **M** — 1–3 sprints (2–6 weeks)
- **L** — 1–2 quarters (1–6 months)
- **XL** — 2+ quarters or cross-team (6+ months)

**Owner functions** (a function may be one named person or a small team):

- **Eng** — repository maintainers / library engineers
- **DevSecOps** — platform / security tooling
- **A11y Lead** — accessibility-focused engineering / consulting lead
- **Design Systems** — design system lead
- **Product** — Product Management / Marketing
- **Legal** — Legal / Privacy counsel
- **Compliance** — GRC / Compliance officer
- **Embeddable Platform** — the broader Embeddable platform team

---

## 2. Phase 0 — Foundations (target: 1–2 months)

Goal: land everything that has long pole on its own but high downstream value. These are the artifacts a procurement officer looks at *first*.

### Deliverables

| ID | Deliverable | Effort | Owner | Acceptance criterion |
|---|---|---|---|---|
| 0.1 | `SECURITY.md` in both repos | S | Eng | Document present, includes disclosure email, PGP key fingerprint, scope, response SLA, safe-harbor language |
| 0.2 | `ACCESSIBILITY.md` in both repos | S | A11y Lead | Document present, includes target conformance, evaluation methods, known issues, contact |
| 0.3 | `CONTRIBUTING.md` in both repos | S | Eng | Document present, includes workflow, review expectations, sign-off requirement |
| 0.4 | `CODE_OF_CONDUCT.md` in both repos | S | Eng | Contributor Covenant 2.1 with contact information |
| 0.5 | `CODEOWNERS` files configured | S | Eng | Both repos have a CODEOWNERS file aligned with maintainers |
| 0.6 | `eslint-plugin-jsx-a11y` added in both repos | S | Eng + A11y Lead | Lint passes; rules at error severity |
| 0.7 | `@axe-core/react` added to `vitest.setup.ts` in both repos | M | A11y Lead | At least one test in each repo invokes axe; failures fail CI |
| 0.8 | Storybook `@storybook/addon-a11y` registered in `remarkable-ui/.storybook/main.ts` | S | Eng | Addon present; a11y panel renders in stories |
| 0.9 | Scaffold `remarkable-pro/.storybook/` and add a11y addon | M | Eng | Storybook builds for PRO; at least 3 PRO components have stories |
| 0.10 | `.github/dependabot.yml` in both repos | S | DevSecOps | Weekly checks for npm + actions; grouped majors |
| 0.11 | `.github/workflows/codeql.yml` in both repos | S | DevSecOps | CodeQL scans on PR; alerts visible in Security tab |
| 0.12 | Secret scanning enabled on both repos | S | DevSecOps | GitHub Secret Scanning + push protection on |
| 0.13 | Stand up the internal trust-center page (stub OK) | M | Product | URL exists; links to GH-hosted artifacts |

### Acceptance for Phase 0

- All four governance docs present in both repos.
- `jsx-a11y`, `axe-core`, Storybook a11y addon all configured and *failing the build on regressions*.
- Dependabot active and producing PRs.
- CodeQL workflow active and reporting.
- Trust-center URL exists, even if mostly stub content.

### Dependencies

None. Phase 0 is entirely self-contained.

### What this unlocks

The four foundational documents and the supply-chain tooling get the libraries past the *first* procurement screen. They don't make the libraries compliance-ready on their own — they make the path forward credible.

---

## 3. Phase 1 — Accessibility AA (target: 3–6 months)

Goal: take both libraries to a defensible WCAG 2.2 Level AA position with chart-level accessibility.

### Deliverables

| ID | Deliverable | Effort | Owner | Acceptance criterion |
|---|---|---|---|---|
| 1.1 | Appoint or contract the Accessibility Lead | S (decision) | Product / Leadership | Named owner; reporting line set |
| 1.2 | First systematic WCAG 2.2 AA walkthrough against UI primitives | L | A11y Lead | Every SC in the SC map (see [09 Section 3](./09-accessibility-readiness-plan.md)) converted from Untested to Pass/Partial/Fail |
| 1.3 | Chart-data-table fallback in `ChartCard` | L | Eng + A11y Lead | Every chart inherits a programmatic `<table>` alternative; toggle in chart card menu |
| 1.4 | Accessible chart summary statements | M | A11y Lead | `aria-label` + `aria-describedby` summary on every chart; summary generated from data and overridable |
| 1.5 | Keyboard chart traversal pattern | L | Eng + A11y Lead | Charts focusable; Tab/Arrow/Enter/Escape conform to Highcharts pattern |
| 1.6 | ARIA live regions for filter changes | M | Eng + A11y Lead | Filter-change events announce via `aria-live="polite"` |
| 1.7 | `prefers-reduced-motion` honored everywhere | M | Design Systems + Eng | All Chart.js animations gated; all CSS transitions guarded |
| 1.8 | `prefers-contrast` and `forced-colors` palettes | M | Design Systems | High-contrast palette variants; `forced-colors`-aware CSS where required |
| 1.9 | Contrast metadata on semantic tokens | M | Design Systems | Token catalog includes contrast pairs against backgrounds; CI check verifies pairs meet 4.5:1 (text) / 3:1 (non-text) |
| 1.10 | Skip-link / landmark structure on dashboard wrappers | S | Eng | Required landmarks present where appropriate; skip-link patterns documented |
| 1.11 | Heading hierarchy review | S | Eng | Existing heading levels reviewed; missing headings added; documented |
| 1.12 | Pinned AT/browser support matrix (see [09 Section 5](./09-accessibility-readiness-plan.md)) | S | A11y Lead | Matrix published; walkthrough cadence agreed |
| 1.13 | First VPAT 2.5 / ACR authored | L | A11y Lead + Product | Public ACR published on trust center; dated; signed |
| 1.14 | Visual regression CI (Chromatic or equivalent) for Storybook | M | Eng | Visual diffs gate merges; regressions caught in PR |

### Acceptance for Phase 1

- Walkthrough complete: SC map populated.
- Chart-a11y pattern implemented; all charts have data-table fallback, summary, keyboard traversal, and live-region announcement.
- Motion, contrast, and forced-colors preferences honored.
- VPAT 2.5 ACR published on the trust center.
- Storybook a11y addon green for all stories.

### Dependencies

- Phase 0 must be complete (tooling, governance docs).
- A11y Lead must be appointed before deliverables 1.2 onward begin.

### What this unlocks

The single biggest unlock in the whole roadmap. With WCAG 2.2 AA conformance and a published VPAT, the libraries clear the accessibility screen at procurement. Government, healthcare, EU-private-sector, and accessibility-conscious enterprise buyers become viable.

---

## 4. Phase 2 — Security, supply chain, SDLC (target: 2–4 months; can overlap Phase 1)

Goal: mature the security tooling, supply-chain integrity, and SDLC documentation to the level a SOC 2 auditor or sophisticated buyer expects.

### Deliverables

| ID | Deliverable | Effort | Owner | Acceptance criterion |
|---|---|---|---|---|
| 2.1 | SBOM emission at release time (CycloneDX + SPDX) | M | DevSecOps | Both formats produced and attached as GitHub Release assets |
| 2.2 | npm provenance enabled on publish workflow | S | DevSecOps | `npm publish --provenance`; consumers can verify with `npm audit signatures` |
| 2.3 | Signed commits / signed tags enforced on default branch | M | Eng + DevSecOps | Branch protection rule requires signed commits |
| 2.4 | SCA via OSV-Scanner (or Snyk) | M | DevSecOps | PR check and scheduled scan; triage SLA in `SECURITY.md` |
| 2.5 | Published vulnerability disclosure SLA | S | Security + Legal | `SECURITY.md` includes P0/P1/P2 windows |
| 2.6 | One-page SDLC summary published | S | Eng + Compliance | Summary maps to NIST SSDF SP 800-218 practices |
| 2.7 | Component-level STRIDE threat model documented | M | Eng + Security | Threat model artifact lives in `docs/security/threat-model.md`; reviewed annually |
| 2.8 | ESLint rule banning `dangerouslySetInnerHTML` outside the known-safe file | S | Eng | Rule active; existing usage allowlisted with comment |
| 2.9 | Document data-handling, encryption-delegation, and air-gap commitments | M | Product + Eng | Trust-center pages published |
| 2.10 | DPA template (with Legal) | M | Legal | Template available on request; subprocessor list public |

### Acceptance for Phase 2

- SBOM emitted at every release, in both CycloneDX and SPDX.
- npm publish provenance enabled and verifiable.
- CodeQL + OSV-Scanner (or Snyk) running and gating PRs.
- `SECURITY.md` with disclosure SLA published.
- Component-level threat model documented and version-controlled.
- Trust-center pages live (data handling, encryption posture, air-gap support).

### Dependencies

- Phase 0 must be complete.
- Embeddable corporate compliance posture (SOC 2 / ISO 27001 status) should be validated to know what the libraries can inherit.

### What this unlocks

The libraries become acceptable to a sophisticated CISO. Security questionnaires can be answered with citations rather than promises. The corporate SOC 2 / ISO 27001 / FedRAMP work (the larger Embeddable platform initiative) now has solid component-level evidence to lean on.

---

## 5. Phase 3 — Auditability, RBAC hooks, procurement readiness (target: 3–6 months)

Goal: deliver the hooks the host needs to make a regulated-industry deployment work, and finish the procurement-artifact pack.

### Deliverables

| ID | Deliverable | Effort | Owner | Acceptance criterion |
|---|---|---|---|---|
| 3.1 | `onAuditEvent(payload)` hook in theme/runtime layer | M | Eng + Embeddable Platform | Event schema documented; emits component-mount, filter-change, drilldown, export events |
| 3.2 | `clientContext.permissions` contract documented and consumed | M | Eng + Embeddable Platform | At least one PRO component (export menu) gates on the permission contract |
| 3.3 | Export gating via permissions | S | Eng | Export menu disabled when `permissions.export` is false |
| 3.4 | Public trust-center page launched | M | Product Marketing + Legal | URL live; links to VPAT, SOC 2 (corporate), SBOM, subprocessor list, BAA template, DPA template, status page |
| 3.5 | BAA template authored | M | Legal | Standard BAA available for HIPAA customers |
| 3.6 | Subprocessor list published and maintained | S | Legal + Compliance | Public, dated; customers notified per DPA's window on change |
| 3.7 | Standard MSA / SLA published | M | Sales + Legal | Standard SLA, escalation path, named contacts |
| 3.8 | Sector-specific overlays for fintech, healthcare, government, defense | L | Product + Compliance | Per-sector positioning page on trust center cross-referencing the relevant standards |
| 3.9 | PRO bumped to 1.0 with SemVer commitment + deprecation policy | M | Eng + Product | 1.0 released; deprecation policy published |
| 3.10 | Annual VPAT refresh cadence established | S | A11y Lead | Cadence documented; calendar reminder set |

### Acceptance for Phase 3

- Audit-log hook live in both libraries with documented schema.
- Permissions contract documented and used in at least one PRO component.
- Trust-center page launches publicly.
- BAA + DPA + subprocessor list + MSA all available.
- PRO at 1.0 with stated SemVer commitment.

### Dependencies

- Phase 1 and Phase 2 must be substantially complete — the trust-center page only makes sense once the artifacts to link from it exist.
- Embeddable corporate work on SOC 2 / ISO 27001 / BAA capability must be far enough along to back the trust-center claims.

### What this unlocks

The libraries (plus the platform) are now positioned to win regulated-industry deals. Sales has the artifact pack. Procurement teams can check every box.

---

## 6. Phase 4 — Sector certifications support and continuous improvement (ongoing)

Goal: support sector-specific certifications and maintain the position over time.

### Deliverables

| ID | Deliverable | Effort | Owner |
|---|---|---|---|
| 4.1 | Annual VPAT refresh | M | A11y Lead |
| 4.2 | Quarterly accessibility AT walkthroughs (T1/T2 matrix) | M (per quarter) | A11y Lead |
| 4.3 | Annual component-level threat model refresh | S | Security |
| 4.4 | Continuous SBOM publication at every release | (automated) | DevSecOps |
| 4.5 | Annual third-party penetration test (corporate level) | L | Compliance |
| 4.6 | Embeddable corporate SOC 2 Type II re-attestation | L | Compliance |
| 4.7 | Embeddable corporate ISO 27001 surveillance audit | L | Compliance |
| 4.8 | Sonification module (post-launch differentiation) | L | A11y Lead + Eng |
| 4.9 | RTL language support (if Arabic / Hebrew markets prioritized) | L | Design Systems + Eng |
| 4.10 | FedRAMP / IL5+ host platform support — *requires Embeddable corporate decision* | XL | Embeddable Platform |

This phase is open-ended. The cadence work (VPAT, walkthroughs, threat model, SBOM, pentest) is the operational engine that keeps the position credible.

---

## 7. Risk register

The risks that can derail the program, with mitigation plans.

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Accessibility Lead headcount not approved | M | High | Begin Phase 0 work that doesn't require the lead. Use external accessibility consultancy (Deque, TPGi) as a bridge. | Product / Leadership |
| R2 | Chart-data-table fallback introduces meaningful bundle-size regression | M | Medium | Lazy-load the fallback DOM via dynamic import. Measure before / after. | Eng |
| R3 | Embeddable corporate SOC 2 / ISO 27001 work slips | M | High | Plan trust-center launch around the corporate timeline, not vice versa. Use "inheriting from Embeddable platform — current posture available on request" until the corporate report lands. | Compliance |
| R4 | Competitor publishes a similar position before we do | L | Medium | Lead with credible evidence (VPAT, SBOM, trust center) rather than marketing claims; competitors who lead with claims can be challenged on evidence. | Product Marketing |
| R5 | A buyer asks for a certification we cannot deliver (FedRAMP High, IL5) | M | Medium | Be explicit about which certifications are in scope and which require the broader Embeddable platform work. Don't promise what we can't deliver. | Sales |
| R6 | Chart.js canvas-rendering becomes a long-term ceiling that's only solvable by switching renderers | L | High | Document the limit; treat sonification and DOM-overlay focus as the bridge; reassess SVG renderer post-Phase 3. | Eng + A11y Lead |
| R7 | A vulnerability is disclosed before SLA + disclosure process is live | M | High | Prioritize `SECURITY.md` in Phase 0. Have a temporary private disclosure channel (security@embeddable.com mailbox monitored daily). | Security |
| R8 | Existing customers don't want PRO to ship breaking changes to reach 1.0 | M | Medium | Communicate API stability commitment early; bundle breaking changes into one major release with a published migration guide. | Product + Eng |
| R9 | Procurement teams reject MIT-licensed libraries without commercial-support contracts | M | Medium | Pair MIT with a commercial support contract via the Embeddable platform. Document the support SLA. | Sales + Legal |
| R10 | Overclaim language slips into marketing materials | M | High | Review process: every marketing claim about compliance reviewed by Compliance. Standard language patterns documented (see [08 Section A — language discipline](./08-detailed-compliance-gap-analysis.md)). | Marketing + Compliance |

---

## 8. Sequencing summary

A condensed view of the four major phases on a 12-month timeline:

```
Month     1   2   3   4   5   6   7   8   9   10  11  12
Phase 0   ▓▓▓▓▓▓
Phase 1       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
Phase 2       ▓▓▓▓▓▓▓▓▓▓▓▓
Phase 3                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
Phase 4                                     ▓▓▓▓▓▓▓▓▓ ongoing →
```

Phase 0 ends month 2. Phase 1 begins month 2 and ends roughly month 8. Phase 2 begins month 2 and ends roughly month 6 — it overlaps Phase 1 because tooling work and accessibility work are largely independent. Phase 3 begins month 5 and ends roughly month 11. Phase 4 begins month 8 and continues indefinitely.

These numbers are guidance; engineering should re-estimate based on team size.

---

## Annex A — File-level change list

A concrete, ready-to-implement list of files to add or edit. These are the granular changes that, taken together, deliver Phase 0 and the bulk of Phase 2.

### Repository: `remarkable-ui`

| Action | File | Detail |
|---|---|---|
| Add | `SECURITY.md` | Scaffold from Annex B.1 below |
| Add | `ACCESSIBILITY.md` | Scaffold from Annex B.2 below |
| Add | `CONTRIBUTING.md` | Scaffold from Annex B.3 below |
| Add | `CODE_OF_CONDUCT.md` | Contributor Covenant 2.1 (Annex B.4 below) |
| Add | `CODEOWNERS` (under `.github/`) | List the maintainers responsible for each path |
| Edit | `eslint.config.js` | Add `eslint-plugin-jsx-a11y` (`recommended` ruleset) at error severity |
| Edit | `vitest.setup.ts` | Add `@axe-core/react` invocation pattern; export an `axeRun` helper |
| Edit | `.storybook/main.ts` | Register `@storybook/addon-a11y` |
| Add | `.github/dependabot.yml` | npm + actions; weekly cadence; grouped majors |
| Add | `.github/workflows/codeql.yml` | CodeQL JavaScript/TypeScript analysis |
| Add | `.github/workflows/sbom.yml` | Emit CycloneDX + SPDX SBOM on release |
| Edit | `.github/workflows/publish.yml` | Add `--provenance` flag; require `id-token: write` permission |
| Add | `docs/security/threat-model.md` (in-repo) | Component-level STRIDE model |
| Edit | `src/components/charts/shared/ChartCard/ChartCard.tsx` | Wire data-table fallback toggle + accessible summary |
| Edit | `src/components/charts/*/index.tsx` (all charts) | Gate Chart.js animation with `prefers-reduced-motion` |
| Edit | `src/styles/global.css` and `global.tokens.ts` | Add `forced-colors` and `prefers-contrast: more` variant tokens |
| Add | New module: `src/a11y/chart-accessibility.ts` | Shared keyboard-traversal helpers, summary generator, live-region helper |

### Repository: `remarkable-pro`

| Action | File | Detail |
|---|---|---|
| Add | `SECURITY.md` | Annex B.1 below |
| Add | `ACCESSIBILITY.md` | Annex B.2 below |
| Add | `CONTRIBUTING.md` | Annex B.3 below |
| Add | `CODE_OF_CONDUCT.md` | Annex B.4 below |
| Add | `CODEOWNERS` (under `.github/`) | |
| Edit | `eslint.config.js` | Add `eslint-plugin-jsx-a11y` |
| Edit | `vitest.setup.ts` | Add `@axe-core/react` |
| Add | `.storybook/` directory + `.storybook/main.ts` + `.storybook/preview.tsx` | Stand up Storybook; register a11y addon |
| Add | Storybook stories for at least the chart and filter-builder components | At minimum: BarChartDefaultPro, KpiChartNumberPro, FilterBuilderPro |
| Add | `.github/dependabot.yml` | Same as UI |
| Add | `.github/workflows/codeql.yml` | Same as UI |
| Add | `.github/workflows/sbom.yml` | Same as UI |
| Edit | `.github/workflows/publish.yml` | Provenance flag |
| Edit | `src/components/charts/shared/ChartCard/ChartCardMenuPro/ChartCardMenuPro.tsx` | Annotate the `dangerouslySetInnerHTML` use with a security comment + add unit test guarding expected output |
| Add | ESLint custom rule (or `no-restricted-syntax`) banning `dangerouslySetInnerHTML` outside the allowlisted file | |
| Add | Audit-event hook plumbing in `src/theme/` and component wiring | Optional `onAuditEvent` consumed from `clientContext` |
| Edit | `src/theme/utils/export.utils.ts` | Emit `export` audit events; gate on `clientContext.permissions.export` |

### Cross-cutting

- Open a tracking issue in each repo titled "Compliance-readiness program" with sub-issues per deliverable above.
- Add a label scheme: `phase-0`, `phase-1`, `phase-2`, `phase-3`, `phase-4`, `compliance-ready`, `a11y`, `security`, `procurement`.

---

## Annex B — Governance-document scaffolds

Copy-pasteable starting points. Each scaffold is intentionally short; the goal is to *exist publicly* with a clear contact and policy, not to be exhaustive. Refine with Legal and Compliance review before publication.

### B.1 `SECURITY.md` (scaffold)

```markdown
# Security Policy

## Reporting a vulnerability

If you believe you have found a security vulnerability in this library, please email **security@embeddable.com** with a description of the issue, steps to reproduce, and any relevant logs or proofs of concept.

For sensitive reports, encrypt your message with our PGP key:

- Fingerprint: `<TO BE GENERATED — published on https://embeddable.com/.well-known/security.txt>`

We acknowledge reports within 3 business days. We will keep you informed as we investigate.

## Scope

In scope:
- The source code of this repository (`<package name>`).
- Built artifacts published to npm under `@embeddable.com/<package>`.

Out of scope:
- The Embeddable platform infrastructure (report to the same address; we will route appropriately).
- Third-party dependencies (please report to the upstream maintainers).

## Response SLA

- **Critical (P0)** — acknowledged in 3 business days; fix released within 7 calendar days.
- **High (P1)** — acknowledged in 5 business days; fix released within 30 calendar days.
- **Medium (P2)** — acknowledged in 10 business days; fix released within 90 calendar days.
- **Low (P3)** — acknowledged in 10 business days; fix scheduled in a normal release.

## Safe harbor

We will not pursue legal action against researchers who:
- Make a good-faith effort to avoid privacy violations, data destruction, or service interruption.
- Only interact with accounts you own or with explicit permission from the account holder.
- Report findings privately via the channel above before public disclosure.
- Do not exploit the issue beyond what is needed to confirm it.

## Acknowledgments

We credit reporters in release notes (with permission).
```

### B.2 `ACCESSIBILITY.md` (scaffold)

```markdown
# Accessibility Statement

We are committed to providing accessible analytics components for all users.

## Conformance target

This library targets **WCAG 2.2 Level AA** conformance. Conformance also satisfies WCAG 2.1 Level AA and the Revised Section 508 Standards (which cite WCAG 2.0 Level AA).

## Current status

A full Accessibility Conformance Report (ACR) is published at `<URL>`.

Known limitations are documented in the ACR. The most material current limitations:

- `<list current Fail / Partial / Untested SCs from the SC map in 09>`

## Evaluation methods

- Automated: `eslint-plugin-jsx-a11y`, `@axe-core/react` in CI, Storybook `addon-a11y`.
- Manual: keyboard-only walkthroughs.
- Assistive technology: NVDA + Firefox/Chrome, JAWS + Edge, VoiceOver + Safari, TalkBack + Chrome. Full matrix in the ACR.

## Feedback

If you experience an accessibility barrier, please email **accessibility@embeddable.com**. We commit to a response within 5 business days.

## Compatibility

We support current versions of major browsers and current commercial releases of major assistive technologies. Specific versions are listed in the ACR.

## Date

Statement last reviewed: `<DATE>`
```

### B.3 `CONTRIBUTING.md` (scaffold)

```markdown
# Contributing

Thank you for your interest in contributing.

## Code of conduct

Participation is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Reporting bugs and requesting features

Open an issue using the relevant template.

## Submitting changes

1. Fork the repository and create a topic branch.
2. Run the test suite (`npm test`) and the linter (`npm run eslint:check`) before opening a pull request.
3. Run accessibility checks (`npm run test -- --a11y` once the axe-core integration ships).
4. Include a Changeset (`npx changeset`) describing the change.
5. Open a PR; describe the change and link to the relevant issue.

## Review process

PRs require at least one approval from a maintainer (see CODEOWNERS). PRs touching security-relevant code require a second reviewer from the security maintainer team.

## Sign-off

Contributions require a Developer Certificate of Origin sign-off:

    git commit -s -m "Your message"

By signing off you certify the DCO terms from https://developercertificate.org/.

## Style

- Strict TypeScript; no `any` without comment.
- Component conventions documented in `ARCHITECTURE.md`.
- Tests required for new behavior.
```

### B.4 `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1)

Use the canonical Contributor Covenant 2.1 text from <https://www.contributor-covenant.org/version/2/1/code_of_conduct/>, with the enforcement contact set to `community@embeddable.com` (or equivalent).

---

## Key takeaways

- Five phases. Phase 0 is the unlock; Phase 1 is the biggest single bet; Phases 2–4 deepen and maintain the position.
- Effort estimates are S/M/L/XL bands; engineering should re-estimate.
- The risk register names ten material risks; the largest are: the corporate compliance timeline (R3), the Accessibility Lead headcount (R1), and language discipline (R10).
- Annex A turns the roadmap into a concrete file-level backlog.
- Annex B turns the missing governance docs into ready-to-edit scaffolds.

## Open questions

- Who owns the Accessibility Lead role?
- What is the headcount commitment for the program?
- Can the corporate SOC 2 / ISO 27001 timelines be confirmed so the trust-center launch can be planned?
- What is the priority order across the seven target sectors?

## Recommended next steps

1. Confirm Phase 0 budget and headcount.
2. Begin Phase 0 deliverables in parallel — they are independent.
3. Appoint the Accessibility Lead so Phase 1 can begin.
4. Validate the requires-validation items in [14 — Source and Evidence Index](./14-source-and-evidence-index.md) with Embeddable corporate.

## Related documents

- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
- [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)
