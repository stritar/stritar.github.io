# 08 — Detailed Compliance Gap Analysis

**Purpose:** A single comprehensive gap analysis covering all twenty compliance areas the brief identifies. For each area: current maturity, what we observed, what's missing, what to do about it, and how urgent it is. Plus the procurement-artifact checklist a regulated-industry buyer expects to be handed at evaluation time.

**Audience:** Compliance, security, accessibility, GRC, procurement, and engineering leadership who need a single page of truth about where Remarkable stands today.

**Related documents:** [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md) (non-technical version) · [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) · [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [14 — Source and Evidence Index](./14-source-and-evidence-index.md)

---

## How to read this document

Three things to set up before the matrix:

**1. Maturity scale (used in every row):**

| Rating | Definition |
|---|---|
| **Not started** | No evidence of work in this area. |
| **Basic** | Some scaffolding exists but is incomplete, inconsistent, or only addresses the easy cases. |
| **Emerging** | Substantive work is in place; coverage is partial; gaps are known. |
| **Mature** | Consistent coverage across the codebase; would survive an external audit pass. |
| **Unknown / needs investigation** | We cannot judge from this audit alone — usually because the answer depends on the Embeddable platform or organizational practices outside the repositories. |

**2. Priority scale (for the recommendation):**

| Level | When to use |
|---|---|
| **P0** | Blocks adoption by any regulated-industry buyer; address first. |
| **P1** | Blocks adoption by sophisticated buyers; address next. |
| **P2** | Procurement screening signal; address before scaled go-to-market. |
| **P3** | Continuous improvement; address as capacity allows. |

**3. Effort bands (analyst estimate; engineering should re-estimate):**

- **S** — under 1 sprint
- **M** — 1 to 3 sprints
- **L** — 1 to 2 quarters
- **XL** — 2+ quarters or cross-team

**4. Compliance language discipline.** We never claim "the libraries are HIPAA compliant" or "FedRAMP compliant" — compliance is a property of an operating environment, an organization, and an audit; not a library. Throughout we say *compliance-ready*, *observed gap*, *requires validation*. See [13 — Glossary](./13-glossary.md) and [14 — Source and Evidence Index](./14-source-and-evidence-index.md) for the language rules.

---

## Section A — The twenty-area compliance matrix

### A1. Accessibility compliance

| Field | Content |
|---|---|
| **Why it matters** | Section 508, EN 301 549, ADA Title II, EAA, and most enterprise procurement screens require WCAG conformance. Buyers ask for a VPAT/ACR. Inaccessible analytics excludes disabled users from data-driven decision-making and exposes vendors and customers to legal risk. |
| **Maturity** | **Basic** — strong on controls, absent on charts. |
| **Observed state** | Approximately 96 ARIA attributes in `remarkable-ui`, custom keyboard navigation in `SelectFieldContent`, Radix and react-day-picker accessible primitives, `:focus-visible` styles in a few CSS modules. Charts render to `<canvas>` with no accessible fallback. No `eslint-plugin-jsx-a11y`, no `@axe-core/*`, no Storybook a11y addon. No `prefers-reduced-motion`, `prefers-contrast`, or `forced-colors`. Zero landmarks; 4 heading uses. |
| **Gap** | Charts have no data-table, summary, or sonification alternative. No automated accessibility testing in CI. No motion/contrast/forced-colors handling. No published accessibility statement or VPAT/ACR. |
| **Recommendation** | Execute [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md): jsx-a11y lint, axe-core in tests, Storybook a11y addon, chart-fallback strategy (data table + summary + ARIA live regions), reduced-motion + forced-colors support, then VPAT 2.5 ACR authoring. |
| **Priority** | **P0** |
| **Effort** | **L** (jsx-a11y/axe/Storybook addon: S; chart fallback: L; VPAT: M) |
| **Owner** | Engineering (UI lead) + a designated Accessibility Lead |

### A2. Security compliance

| Field | Content |
|---|---|
| **Why it matters** | SOC 2, ISO 27001, FedRAMP, HIPAA Security Rule, PCI DSS 4.0, CMMC 2.0 all require disciplined security practices around the code and its supply chain. Procurement asks for evidence (reports, scan results, SBOMs, threat models). |
| **Maturity** | **Emerging** — SonarCloud SAST runs on PR; one safe `dangerouslySetInnerHTML`; deliberate supply-chain pins; but no Dependabot, CodeQL, Snyk, SBOM. |
| **Observed state** | SonarCloud workflow on both repos. No Dependabot config, no CodeQL workflow, no Snyk, no provenance configuration. One safe `dangerouslySetInnerHTML` use (URL-decoded hardcoded SVG icon). `xlsx` pinned to `@e965/xlsx` fork; `axios` pinned to `1.13.6` via overrides. |
| **Gap** | No automated dependency vulnerability scanning, no first-class code-scanning for the most common JS/TS vulnerabilities, no SBOM emission, no signed/provenance-published artifacts, no public SECURITY.md. |
| **Recommendation** | Add `.github/dependabot.yml`, `.github/workflows/codeql.yml`, SBOM generation at release time, npm provenance on publish, `SECURITY.md` with disclosure policy. See [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md). |
| **Priority** | **P0** |
| **Effort** | **M** |
| **Owner** | Platform/DevSecOps + repository maintainers |

### A3. Privacy and data governance

| Field | Content |
|---|---|
| **Why it matters** | GDPR Articles 25 and 32; HIPAA Privacy Rule; CCPA/CPRA; sector-specific privacy regimes. Buyers ask whether the component touches PII/PHI and how. |
| **Maturity** | **Emerging** — small and clean privacy surface. |
| **Observed state** | No direct network calls. One `sessionStorage` write in [remarkable-pro/src/theme/styles/styles.utils.ts:47](../remarkable-pro/src/theme/styles/styles.utils.ts) for chart color persistence (not user data). No cookies, no third-party telemetry, no error reporting, no analytics tracking. |
| **Gap** | No published data-handling statement. No DPIA template. No documentation of what the libraries store, what the host receives, what passes through export. |
| **Recommendation** | Publish a data-handling page (what the libraries see, what they persist, what they emit). Provide DPIA inputs as a reusable artifact. See [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md). |
| **Priority** | **P1** |
| **Effort** | **S** |
| **Owner** | Privacy/Legal + Engineering |

### A4. Audit logging

| Field | Content |
|---|---|
| **Why it matters** | HIPAA Security Rule §164.312(b), SOC 2 CC7.2/CC7.3, ISO 27001 A.8.15, FedRAMP AU controls. Regulated buyers expect to log who saw or exported what data, when. |
| **Maturity** | **Not started** at the component level. |
| **Observed state** | No event-emission hooks. The export pipeline does not emit an "exported data" event. Component interactions (filter changes, drilldowns) do not emit audit-eligible events. |
| **Gap** | The component layer offers nothing to the host application's audit log. |
| **Recommendation** | Add an optional `onAuditEvent(payload)` hook to the theme / runtime layer that fires on a defined set of events (component-mount, export, filter-change, drilldown). Let the host translate to its own SIEM pipeline. Document the event schema. |
| **Priority** | **P1** |
| **Effort** | **M** |
| **Owner** | Embeddable platform team + component library maintainers |

### A5. Role-based access control (RBAC)

| Field | Content |
|---|---|
| **Why it matters** | Healthcare, finance, government and defense buyers all require role-aware UIs (a viewer can see, an editor can change, an admin can govern). |
| **Maturity** | **Unknown / needs investigation** — depends on the Embeddable runtime, not the libraries. |
| **Observed state** | The libraries themselves have no RBAC primitives. Authorization is implicitly the host application's job via `clientContext`. |
| **Gap** | No documented contract for how components should react to role information passed in via `clientContext`. No example role-gated component variant in PRO. |
| **Recommendation** | Define and document a `clientContext.permissions` contract. Provide one or two examples (e.g., the export menu becomes read-only without `export:write`). |
| **Priority** | **P2** |
| **Effort** | **M** |
| **Owner** | Embeddable platform team |

### A6. Authentication and authorization assumptions

| Field | Content |
|---|---|
| **Why it matters** | Buyers want to know exactly which boundary they own and which the vendor owns. Misaligned assumptions cause data leaks. |
| **Maturity** | **Emerging** — the boundary is clear in code, but it is not documented for buyers. |
| **Observed state** | Components hold no auth tokens, no session, no API keys. All auth is delegated to the host application via the Embeddable runtime. |
| **Gap** | The boundary is implicit. A buyer reading the code can see it; a buyer reading marketing cannot. |
| **Recommendation** | Publish a short "boundary diagram" page that names who owns auth (the host application), how the SDK propagates context, and what the components guarantee not to do. |
| **Priority** | **P1** |
| **Effort** | **S** |
| **Owner** | Engineering + Product |

### A7. Encryption assumptions

| Field | Content |
|---|---|
| **Why it matters** | HIPAA, FedRAMP, FIPS 140-3, defense impact levels all require encryption in transit and at rest, often with specific algorithm and key-management constraints. |
| **Maturity** | **Unknown / needs investigation** — entirely delegated. |
| **Observed state** | No cryptography in either library. No subtle-crypto, no JOSE, no JWT, no bcrypt. Encryption is implicitly the platform's responsibility. |
| **Gap** | The libraries' lack of crypto is a strength (small surface) but unstated. Buyers ask. |
| **Recommendation** | Publish a one-paragraph statement that the libraries perform no cryptographic operations and inherit all transit/rest encryption from the host. |
| **Priority** | **P2** |
| **Effort** | **S** |
| **Owner** | Embeddable platform team |

### A8. Deployment environment requirements

| Field | Content |
|---|---|
| **Why it matters** | Regulated buyers want to know what environments the components will run in. Multi-tenant SaaS, single-tenant SaaS, on-prem, sovereign cloud, air-gapped — each demands different things. |
| **Maturity** | **Basic** — runs anywhere a browser does, but support is not stated. |
| **Observed state** | Pure browser-side React components. No assumption about server environment. No documented requirement for outbound connectivity (no telemetry endpoint, no CDN-required asset). |
| **Gap** | Deployment-model support is undocumented. No "works in air-gap" attestation. |
| **Recommendation** | Build the deployment-model table in [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) — multi-tenant SaaS, single-tenant SaaS, on-prem, air-gapped — and state what is supported. |
| **Priority** | **P2** |
| **Effort** | **S** |
| **Owner** | Product + Engineering |

### A9. Data residency and retention

| Field | Content |
|---|---|
| **Why it matters** | GDPR Article 28; FedRAMP impact levels; sector regulators in EU and select APAC jurisdictions. Buyers ask: "where does my data go and how long is it kept?" |
| **Maturity** | **Emerging** — the libraries' answer is "data stays in the browser; persistence is host-controlled." |
| **Observed state** | One `sessionStorage` entry (theme metadata, not user data). No durable storage. Exports go to the user's local machine via Blob download. |
| **Gap** | Not stated externally. |
| **Recommendation** | Document the libraries' position explicitly: zero server-side state, zero durable client-side state of user data, exports are user-initiated and local. |
| **Priority** | **P2** |
| **Effort** | **S** |
| **Owner** | Privacy/Legal + Engineering |

### A10. Testing and validation

| Field | Content |
|---|---|
| **Why it matters** | SOC 2 CC4/CC8, ISO 27001 A.8.29/A.8.31, IEC 62304 §5.7 all require evidence of testing. Procurement asks for coverage data and test types. |
| **Maturity** | **Emerging** — Vitest is in place; coverage is uneven; no a11y or security tests. |
| **Observed state** | Vitest + jsdom in both repos. ~47% test-to-source-file ratio in UI; ~80% in PRO. No `@axe-core/*`, no jest-axe, no contract tests against the Embeddable runtime. |
| **Gap** | No accessibility tests, no automated visual regression, no live screen-reader-walkthrough record. Coverage is not visibly enforced as a gate. |
| **Recommendation** | Add `@axe-core/react` to test setup; add Storybook visual-regression CI; document live AT walkthrough cadence; enforce coverage thresholds in CI. |
| **Priority** | **P1** |
| **Effort** | **M** |
| **Owner** | QA / Engineering |

### A11. Documentation requirements

| Field | Content |
|---|---|
| **Why it matters** | Procurement and security questionnaires expect named documents (security policy, accessibility statement, contributing guide). Their absence is a screening signal. |
| **Maturity** | **Basic** — strong internal architecture docs, missing external governance docs. |
| **Observed state** | Both repos: `README.md`, `ARCHITECTURE.md`, `CHANGELOG.md`. Missing: `SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`. |
| **Gap** | Four root-level governance docs absent. |
| **Recommendation** | Land the four documents from [11 — Annex B](./11-technical-roadmap.md) scaffolds in both repos. Cross-link them in `README.md`. |
| **Priority** | **P0** |
| **Effort** | **S** |
| **Owner** | Repository maintainers + Legal review |

### A12. Secure development lifecycle (SDLC)

| Field | Content |
|---|---|
| **Why it matters** | NIST SP 800-218 (SSDF), ISO 27001 A.8.25-A.8.31, SOC 2 CC8.1. Buyers want to see how code becomes a release. |
| **Maturity** | **Emerging** — CI gates exist; threat-modeling, signed releases, provenance and SBOM not yet. |
| **Observed state** | PR-gating workflows (lint, type-check, test, build, SonarCloud). Changesets for SemVer. npm publish workflow exists. |
| **Gap** | No threat-model artifact, no security-review checklist on PRs, no signed commits or signed releases, no npm provenance. |
| **Recommendation** | Publish a one-page SDLC summary. Adopt npm publish provenance. Add a PR template line for "security-relevant change?" Establish a threat-model cadence (annual + per-major-change). |
| **Priority** | **P1** |
| **Effort** | **M** |
| **Owner** | Engineering leadership |

### A13. Dependency management

| Field | Content |
|---|---|
| **Why it matters** | The single most common modern security failure is an outdated or compromised dependency. Buyers expect to see active hygiene. |
| **Maturity** | **Emerging** — deliberate pins exist but no automated update flow. |
| **Observed state** | `xlsx → @e965/xlsx` fork pin; `axios → 1.13.6` override; no Dependabot config; no Renovate; no scheduled lockfile-refresh job. |
| **Gap** | Updates happen by hand; nothing watches for newly disclosed vulnerabilities. |
| **Recommendation** | Add `.github/dependabot.yml` for both repos (npm + actions ecosystems, weekly cadence). Optional: Renovate for finer-grained control. |
| **Priority** | **P0** |
| **Effort** | **S** |
| **Owner** | Platform/DevSecOps |

### A14. Vulnerability management

| Field | Content |
|---|---|
| **Why it matters** | Same as A13, plus runtime application risk. SOC 2 CC7.1, ISO 27001 A.8.8. |
| **Maturity** | **Basic** — SonarCloud runs. |
| **Observed state** | SonarCloud SAST scans on PR and main. No GitHub Advanced Security / CodeQL, no Snyk, no OSV-Scanner, no SBOM. |
| **Gap** | Reliance on a single SAST source; no software composition analysis (SCA) beyond what Dependabot would provide. |
| **Recommendation** | Add CodeQL workflow; add SCA via OSV-Scanner or Snyk; document a triage SLA (P0 in 7 days, P1 in 30, etc.) in `SECURITY.md`. |
| **Priority** | **P0** |
| **Effort** | **M** |
| **Owner** | Platform/DevSecOps |

### A15. Design-system governance

| Field | Content |
|---|---|
| **Why it matters** | The design system controls the rendered appearance of every component — including color contrast (an accessibility requirement) and motion (a `prefers-reduced-motion` requirement). |
| **Maturity** | **Emerging** — clean 666-token system without accessibility metadata. |
| **Observed state** | Three-layer architecture (core/semantic/component). Tokens auto-generated into TS from CSS. No contrast metadata; no `forced-colors` palette; no `prefers-reduced-motion`-aware motion tokens. |
| **Gap** | Tokens carry no accessibility contracts. |
| **Recommendation** | Extend the token system with: contrast-pair metadata, a high-contrast/`forced-colors` palette, motion tokens that respond to `prefers-reduced-motion`. |
| **Priority** | **P1** |
| **Effort** | **M** |
| **Owner** | Design Systems Lead + Accessibility Lead |

### A16. API governance

| Field | Content |
|---|---|
| **Why it matters** | Consumers depend on stable APIs. Breaking changes in a regulated environment trigger revalidation cycles that can take months. |
| **Maturity** | **Basic for UI** (3.x with changesets), **Not yet** for PRO (0.3.x). |
| **Observed state** | Changesets in both repos. UI follows SemVer reasonably. PRO is pre-1.0 — breaking changes can land in patches. |
| **Gap** | No public API-stability commitment for PRO. No deprecation policy. |
| **Recommendation** | Bring PRO to 1.0 with an explicit SemVer commitment, paired with a published deprecation policy (e.g., one-minor-version deprecation window). |
| **Priority** | **P1** |
| **Effort** | **L** (gating on chart-a11y work) |
| **Owner** | Engineering + Product |

### A17. Change management

| Field | Content |
|---|---|
| **Why it matters** | SOC 2 CC8.1, ISO 27001 A.8.32, plus most enterprise expectations: changes should be reviewed, traceable, and reversible. |
| **Maturity** | **Emerging** — PR gates exist. |
| **Observed state** | PRs gated on lint/typecheck/test/build/SonarCloud. No CODEOWNERS file observed in either repo (would need confirmation). No published branch-protection policy. |
| **Gap** | Governance signals (CODEOWNERS, branch protection rules, signing) are not visible to a reviewer of the public repo. |
| **Recommendation** | Add `CODEOWNERS`; publish a contribution / review policy in `CONTRIBUTING.md`; document branch protection in the SDLC summary. |
| **Priority** | **P2** |
| **Effort** | **S** |
| **Owner** | Engineering leadership |

### A18. Release management

| Field | Content |
|---|---|
| **Why it matters** | A clean release process is the deliverable side of change management. Buyers want to know: how do you publish, sign, and notify of releases? |
| **Maturity** | **Emerging** — automated, not yet signed or provenance-enabled. |
| **Observed state** | Changesets → version PR → publish. No npm provenance. No signed git tags. No GPG-signed commits. |
| **Gap** | Provenance and signing are missing. |
| **Recommendation** | Enable npm publish provenance (`npm publish --provenance`); document the release process publicly; emit SBOM at release time. |
| **Priority** | **P1** |
| **Effort** | **S** |
| **Owner** | Platform/DevSecOps |

### A19. Procurement readiness

| Field | Content |
|---|---|
| **Why it matters** | A regulated-industry buyer's procurement team will hand the vendor a checklist of documents. If those documents do not exist, the deal stalls regardless of how good the product is. |
| **Maturity** | **Basic** — no public artifacts on the procurement side. |
| **Observed state** | No VPAT, no SOC 2 report, no ISO certificate, no SBOM, no DPA template, no public trust center, no published subprocessor list. |
| **Gap** | The full procurement artifact pack is missing (see Section B below). |
| **Recommendation** | Build the artifact pack outlined in Section B. Sequence in [11 — Technical Roadmap](./11-technical-roadmap.md). |
| **Priority** | **P0** for foundational artifacts (VPAT, SECURITY.md, SBOM); **P1** for the rest. |
| **Effort** | **L** overall |
| **Owner** | Product Marketing + Legal + Engineering + Compliance |

### A20. Enterprise support expectations

| Field | Content |
|---|---|
| **Why it matters** | Enterprise buyers want a contract, an SLA, an escalation path, named support contacts. MIT-licensed code does not satisfy this on its own. |
| **Maturity** | **Unknown / needs investigation** — depends on the Embeddable commercial wrapper. |
| **Observed state** | Both libraries are MIT-licensed. There is no published support policy attached to the libraries themselves. |
| **Gap** | The commercial wrapper around the libraries (SLA, support, escalation, hotfix policy) is not described in the docs that procurement would read. |
| **Recommendation** | Publish a "commercial support for Remarkable" page describing the SLA, escalation, named-contact and hotfix commitments customers receive through the Embeddable platform contract. |
| **Priority** | **P2** |
| **Effort** | **M** |
| **Owner** | Product Marketing + Sales + Legal |

---

## Section B — Procurement Artifacts Checklist

These are the documents and artifacts a regulated-industry buyer will ask for by name. They are the *outputs* of the work in [11 — Technical Roadmap](./11-technical-roadmap.md). Listed in roughly the order they tend to be requested.

| Artifact | What it is | Current state | Owner |
|---|---|---|---|
| **`SECURITY.md`** | Public disclosure policy: how to report a vulnerability, expected response window, PGP key. Scaffold in [11 — Annex B](./11-technical-roadmap.md). | Missing in both repos | Engineering + Security |
| **`ACCESSIBILITY.md`** | Public accessibility statement with conformance target, known issues, contact. Scaffold in [11 — Annex B](./11-technical-roadmap.md). | Missing in both repos | Accessibility Lead |
| **`CONTRIBUTING.md`** | Public contribution policy. Scaffold in [11 — Annex B](./11-technical-roadmap.md). | Missing in both repos | Engineering |
| **`CODE_OF_CONDUCT.md`** | Contributor Covenant 2.1 baseline. | Missing in both repos | Engineering |
| **VPAT 2.5 / ACR** | Voluntary Product Accessibility Template — the procurement-officer's accessibility document. Lists every WCAG / Section 508 / EN 301 549 criterion and the vendor's conformance position. | Not authored | Accessibility Lead + Product Marketing |
| **SOC 2 Type II report** | External auditor's attestation against the AICPA Trust Services Criteria over a defined period. Issued at the Embeddable corporate level, not the library level. | Unknown — *requires validation* with Embeddable corporate | Compliance/GRC |
| **ISO/IEC 27001 certificate** | External certification of the information security management system. Issued at the corporate level. | Unknown — *requires validation* | Compliance/GRC |
| **SBOM (CycloneDX + SPDX)** | Machine-readable component inventory, per release. | Not emitted | Platform/DevSecOps |
| **Penetration test summary** | A short executive summary of the most recent external pentest, with critical/high findings and remediation status. | Unknown — *requires validation* | Compliance/GRC |
| **BAA template** | Business Associate Agreement for HIPAA-covered customers. Issued at the corporate level. | Unknown — *requires validation* | Legal |
| **DPA template** | Data Processing Agreement for GDPR Article 28. Issued at the corporate level. | Unknown — *requires validation* | Legal |
| **Public trust center page** | A single web page that links every artifact above plus security FAQ, subprocessor list, status page, contact. | Not published | Product Marketing + Compliance |
| **Subprocessor list** | Public list of every third party that processes customer data. | Not published | Legal + Compliance |
| **Standard SLA / MSA** | The contractual commitments around uptime, response time, hotfix, support escalation. | Not published | Sales + Legal |
| **Threat-model summary** | A short, redactable summary of the most recent threat model. Optional but increasingly requested. | Not authored | Engineering + Security |
| **Vulnerability disclosure SLA** | Documented response windows for P0/P1/P2 findings. | Not published | Security |

---

## Section C — Public-Facing Artifact Outlines

For each major procurement artifact, here is a one-page outline of the document's structure. These are what we recommend the responsible owner fill out in the order outlined in [11 — Technical Roadmap](./11-technical-roadmap.md).

### C1. Trust Center Page Outline

A single web page (e.g., `embeddable.com/trust`) that gathers:

1. **Security overview** — one paragraph and a link to `SECURITY.md`.
2. **Certifications and reports** — SOC 2 Type II, ISO 27001, named pentest cadence. Link to gated downloads where applicable.
3. **Compliance posture** — HIPAA capability statement, GDPR posture (DPA available on request), Section 508/EAA position.
4. **Subprocessor list** — public, dated.
5. **Status page** — uptime and incident history.
6. **Accessibility statement** — link to `ACCESSIBILITY.md` / current VPAT.
7. **Data handling summary** — what the libraries see, what the platform stores, what leaves the EU/US.
8. **Disclosure policy** — link to `SECURITY.md` plus PGP/safe-harbor language.
9. **Contact** — security@, privacy@, accessibility@.

### C2. Public Accessibility Statement / VPAT 2.5 ACR Skeleton

Use the ITI VPAT 2.5 template structure:

1. **Product identification** — name (Remarkable PRO / Remarkable UI), version, date.
2. **Standards covered** — WCAG 2.1 AA, WCAG 2.2 AA, Revised Section 508, EN 301 549.
3. **Evaluation methods** — manual testing, automated scans (axe-core), keyboard-only walkthroughs, AT verification matrix.
4. **Conformance tables** — one per standard, with Pass / Partial / Fail / Not Applicable per criterion, plus remarks linking to the relevant component file.
5. **Known issues and roadmap** — explicit list of failed criteria with the planned fix in [11 — Technical Roadmap](./11-technical-roadmap.md).
6. **Contact and feedback** — accessibility@ address; user-feedback intake.
7. **Author and date** — signed by the Accessibility Lead.

### C3. DPA Template Outline (GDPR Article 28)

1. Parties, definitions, scope of processing.
2. Categories of data subjects and personal data.
3. Subject-matter and duration.
4. Sub-processing — opt-out window, subprocessor list reference.
5. International transfers — SCCs reference, supplementary measures.
6. Security measures (Annex II) — cross-reference to SOC 2 / ISO 27001.
7. Data-subject rights assistance.
8. Breach notification.
9. Audit rights.
10. Liability and indemnification.
11. Termination and data return/deletion.

### C4. Subprocessor List Outline

A dated table on the trust center:

| Subprocessor | Service | Data categories | Hosting location | DPA signed |

Updated on every change; customers notified per the DPA's opt-out window.

---

## Section D — Sector-specific overlays

The matrix above is sector-agnostic. The following overlays summarize the *additional* standards a given sector will expect on top.

| Sector | Additional standards to overlay | Most material gap today |
|---|---|---|
| **Healthcare / MedTech** | HIPAA Security Rule, FDA Cybersecurity in Medical Devices (Sept 2023), IEC 62304, ISO 13485, ISO 14971, HL7 FHIR for interop | Audit logging (A4) and accessibility (A1) |
| **Fintech / Banking** | PCI DSS 4.0, FFIEC IT Handbook, NYDFS Part 500, EU DORA (in force 17 January 2025), SR 11-7 for model-influenced decisions | Vulnerability management cadence (A14) and audit logging (A4) |
| **Government / Public sector** | FedRAMP Rev 5 (Mod or High), FISMA, NIST SP 800-53 Rev 5, Section 508, ADA Title II Web Rule (deadlines 26 April 2027 / 2028), EN 301 549 (EU) | Accessibility (A1) and procurement readiness (A19) |
| **Defense** | CMMC 2.0 (Level 2/3 typical for analytics tooling around CUI), DFARS 252.204-7012, DoD Cloud Computing SRG IL2-IL6, ITAR considerations | Deployment-model coverage (A8) — air-gap and IL5+ |
| **Intelligence** | ICD 503, CNSSI 1253, air-gap / cross-domain | Deployment-model coverage (A8) |
| **Academic / Research** | FERPA (where student data is in scope), NIH DMSP, IRB Common Rule | Privacy and data-governance documentation (A3) |
| **Cross-cutting EU** | GDPR (Articles 25, 28, 32, 35), EU Accessibility Act (applies from 28 June 2025 *(requires validation)*), EU AI Act (full applicability 2 August 2026 with earlier obligations from 2 February 2025), Digital Services Act | Privacy documentation (A3) and accessibility (A1) |

---

## Section E — Maturity heatmap

A one-glance view of where the suite is today across the twenty areas. The number after each rating is the priority from the matrix above.

| Area | Maturity | Priority |
|---|---|---|
| A1 Accessibility | Basic | P0 |
| A2 Security | Emerging | P0 |
| A3 Privacy | Emerging | P1 |
| A4 Audit logging | Not started | P1 |
| A5 RBAC | Unknown | P2 |
| A6 AuthN/AuthZ assumptions | Emerging | P1 |
| A7 Encryption assumptions | Unknown | P2 |
| A8 Deployment environment | Basic | P2 |
| A9 Data residency / retention | Emerging | P2 |
| A10 Testing and validation | Emerging | P1 |
| A11 Documentation | Basic | P0 |
| A12 SDLC | Emerging | P1 |
| A13 Dependency management | Emerging | P0 |
| A14 Vulnerability management | Basic | P0 |
| A15 Design-system governance | Emerging | P1 |
| A16 API governance | Basic | P1 |
| A17 Change management | Emerging | P2 |
| A18 Release management | Emerging | P1 |
| A19 Procurement readiness | Basic | P0 |
| A20 Enterprise support | Unknown | P2 |

Six P0 areas (the work that has to land first): accessibility, security tooling, governance documentation, dependency management, vulnerability management, procurement readiness foundations.

---

## Key takeaways

- The libraries are clean and well-architected, but multiple compliance areas score Basic or Not Started today. None requires re-architecting; all are addressable through focused engineering, documentation, and process work.
- Six P0 areas should be addressed first: accessibility (especially chart accessibility), security scanning, governance docs, dependency automation, vulnerability management, and the foundational procurement artifacts.
- Several areas (RBAC, encryption, enterprise support) score Unknown because the answer depends on the Embeddable corporate posture, not the libraries themselves. Those need confirmation from leadership rather than engineering work in the libraries.
- The full procurement artifact pack (Section B) is the ultimate output of this work — it is what a buyer will hand the vendor as a checklist.

## Open questions

- What is the Embeddable corporate compliance posture today (SOC 2, ISO 27001, HIPAA BAA capability, FedRAMP)?
- Is there an internal vulnerability-disclosure process that simply isn't published?
- Which sector(s) does Embeddable want to prioritize? The overlay table in Section D shows that different sectors weight different gaps.

## Recommended next steps

1. Confirm the sector priority with leadership (see [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)).
2. Begin Phase 0 of [11 — Technical Roadmap](./11-technical-roadmap.md): governance docs, jsx-a11y, axe-core, Dependabot, SBOM emission, npm provenance.
3. Validate the *Unknown* rows in the matrix with Embeddable corporate (encryption posture, BAA availability, existing certifications).
4. Begin VPAT 2.5 ACR authoring in parallel with Phase 1 accessibility work — the ACR is the largest deliverable on the procurement side and has long lead time.

## Related documents

- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md) — the non-technical version of this matrix
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) — A1 in depth
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) — A2-A9, A12-A14 in depth
- [11 — Technical Roadmap](./11-technical-roadmap.md) — phased delivery of these recommendations
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) — how this maps to go-to-market
- [13 — Glossary](./13-glossary.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)
