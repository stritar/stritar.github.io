# 07 — Compliance Readiness Overview

**Purpose:** A non-technical, plain-English explanation of what compliance readiness means for an analytics-component library, why it matters for the regulated sectors Embeddable might want to serve, where the suite stands today, and what the path forward looks like.

**Audience:** Leadership, sales, partnerships, marketing, customer success, and any stakeholder who needs to talk credibly about compliance without diving into the technical detail in [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md).

**Related documents:** [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) · [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) · [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [13 — Glossary](./13-glossary.md)

---

## 1. What "compliance" actually means

"Compliance" is one of those words that sounds like a single thing and is actually six. When a buyer in a regulated industry says "we need this to be compliant," they usually mean some combination of:

1. **Accessibility** — the software is usable by people with disabilities. The standard is WCAG (a W3C document). The US public-sector version is Section 508. The European version is EN 301 549. The ADA Title II Web Rule sets hard deadlines in the US (26 April 2027 for the largest state and local governments, 26 April 2028 for smaller ones).
2. **Security** — the software is built and operated with disciplined practices that resist attack. The most common third-party attestations are SOC 2 (US, common) and ISO/IEC 27001 (international, certificate-based). Federal buyers want FedRAMP. Defense contractors want CMMC.
3. **Privacy** — the software respects data-subject rights and minimizes data collection. The most common framework is GDPR for the EU; HIPAA for US healthcare; FERPA for US education.
4. **Auditability** — when something goes wrong, the operator can prove who did what, when. Required by almost every framework.
5. **Procurement readiness** — the vendor can hand over a stack of documents that the buyer's risk team needs to approve the purchase (VPAT, SOC 2 report, SBOM, BAA, DPA, pentest summary, trust-center page).
6. **Operational maturity** — the vendor responds to vulnerabilities within stated windows, ships releases with proper signing and provenance, has named contacts for security and accessibility, and follows a disciplined development process.

A "compliance-ready" product handles all six well enough that a buyer in a regulated sector can adopt it without being the one who has to build the missing pieces.

---

## 2. Why this matters now

Three trends are converging:

### 2.1 Enforcement deadlines are real and close

- **DOJ ADA Title II Web Rule** (US, April 2024): state and local governments must meet WCAG 2.1 AA by 26 April 2027 (large entities) or 26 April 2028 (smaller). The rule applies to government users; vendors selling to them are pulled into the requirement contractually.
- **EU AI Act** (Regulation 2024/1689): entered into force 1 August 2024; prohibited AI practices applied from 2 February 2025; full applicability 2 August 2026. Analytics that influence consequential decisions can touch this.
- **EU DORA** (Regulation 2022/2554): in force 17 January 2025 for EU financial entities and their critical ICT third-party providers.
- **CMMC 2.0** (US Department of Defense): phased rollout into defense contracts. Defense contractors are already being told to prepare.
- **European Accessibility Act (EAA)**: applies to private-sector products and services from 28 June 2025 *(requires validation)*. Banking services, e-commerce, and consumer ICT are explicitly in scope.

### 2.2 Procurement is institutionalizing the screen

Five years ago, procurement officers in regulated industries occasionally asked about accessibility or SOC 2. Today they ask consistently and reject vendors who can't produce the documentation. The bar is no longer "do you have it?" — it is "show me the report, dated and signed."

### 2.3 Embedded analytics is being adopted by exactly these buyers

The companies most likely to embed analytics inside their products today — fintech platforms, healthcare SaaS, government modernization vendors, defense suppliers' developer-facing tooling — are exactly the companies under the regulatory pressures above. They cannot adopt analytics components that block their own compliance posture.

---

## 3. The target sectors

The brief asks about seven sectors. Each weights the six areas above differently.

| Sector | What they care most about | What they ask for at procurement |
|---|---|---|
| **Healthcare / MedTech** | Audit logging, privacy (PHI), accessibility, security | HIPAA BAA, SOC 2, accessibility statement, SBOM (FDA premarket), incident-response SLA |
| **Fintech / Banking** | Security, operational resilience, model governance, audit logging | SOC 2 Type II, ISO 27001, pentest, DORA evidence, PCI DSS if cards are in scope |
| **Government / Public sector** | Accessibility, security (FedRAMP), data residency | VPAT/ACR, FedRAMP authorization (Mod or High), Section 508 conformance, supply-chain attestations |
| **Defense** | Air-gap deployment, supply-chain integrity, CUI handling, accessibility (still applies) | SBOM, CMMC level, signed releases, DFARS 7012 evidence, ITAR-aware deployment |
| **Intelligence** | Air-gap deployment, classified-environment posture | ICD 503 alignment, no-egress posture, offline build path |
| **Academic / Research** | Privacy (FERPA, IRB), accessibility | Accessibility statement, data-handling document, FERPA position |
| **Other regulated enterprise** | Accessibility, security, privacy | SOC 2, accessibility statement, DPA, trust center |

Several priorities recur across sectors: **accessibility, audit logging, supply-chain integrity, and a publishable trust story.** A program that delivers those four well serves most of the list.

---

## 4. Where the Remarkable suite stands today

A one-paragraph summary you can use in conversation:

> The Remarkable libraries are technically clean and have an unusually small security footprint — they don't call the network, hold credentials, or run cryptography. The interactive controls (dropdowns, date pickers, multi-selects) have a respectable accessibility baseline thanks to vetted underlying primitives. The charts are not accessible today — they render to a canvas with no data-table alternative. The governance documentation a procurement officer expects (security policy, accessibility statement, contributing guide) is not in place. Six P0 areas need attention before the suite can be marketed as compliance-ready: accessibility (especially charts), security tooling (Dependabot, CodeQL, SBOM), governance documentation, dependency management, vulnerability management, and the procurement artifact pack. None of these requires re-architecting either library. All are addressable through focused engineering and documentation work.

The detailed matrix is in [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md). A condensed view:

| Area | Current rating | Priority |
|---|---|---|
| Accessibility | Basic | P0 |
| Security tooling | Emerging | P0 |
| Privacy | Emerging | P1 |
| Audit logging | Not started | P1 |
| RBAC | Unknown | P2 |
| Documentation | Basic | P0 |
| SDLC | Emerging | P1 |
| Dependency management | Emerging | P0 |
| Vulnerability management | Basic | P0 |
| Design-system governance | Emerging | P1 |
| API governance (PRO) | Basic (pre-1.0) | P1 |
| Procurement readiness | Basic | P0 |

(Five other areas omitted here for brevity; full list in [08](./08-detailed-compliance-gap-analysis.md).)

The headline: **six P0 areas, all addressable in one focused engineering and documentation program**.

---

## 5. The recommended roadmap (summary)

In the order it should land:

### Phase 0 — Foundations (1–2 months)
Add the governance documents (`SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`). Add `eslint-plugin-jsx-a11y`, `@axe-core/react`, Storybook a11y addon. Configure Dependabot, CodeQL, SBOM emission, npm provenance. Stand up a private trust-center page (even if mostly stubs).

### Phase 1 — Accessibility AA (3–6 months)
Land the chart-accessibility pattern (data table + summary + keyboard traversal + ARIA live regions). Add `prefers-reduced-motion`, `prefers-contrast`, `forced-colors` support. Run a first WCAG 2.2 AA walkthrough. Author the first VPAT 2.5 ACR.

### Phase 2 — Security and supply chain (2–4 months, can overlap Phase 1)
Mature the security tooling: triage SLAs, signed commits, branch protection, security review checklist on PRs. Define the audit-log hook schema. Publish the data-handling page.

### Phase 3 — Audit, RBAC, procurement (3–6 months)
Implement the audit-event hook in the runtime layer. Define and publish the `clientContext.permissions` contract. Land the export gating. Author the BAA / DPA templates with legal. Publish the public trust-center page.

### Phase 4 — Sector certifications support (ongoing)
Support the host platform's certification work (SOC 2 Type II, ISO 27001, FedRAMP, HIPAA BAA capability). Author sector-specific overlays. Establish the on-going AT walkthrough cadence and re-author the VPAT annually.

Detailed phase plans, dependencies, owners, effort bands, acceptance criteria, and the risk register are in [11 — Technical Roadmap](./11-technical-roadmap.md).

---

## 6. What we are not claiming

To keep the conversation credible:

- We are **not** claiming the libraries are HIPAA compliant, SOC 2 compliant, FedRAMP compliant, ISO 27001 certified, or FIPS-validated. None of these is an attribute of a software library — they are attributes of operating environments and corporate audits. The libraries can be a **building block** that makes the host's compliance work easier; they are not the unit of certification.
- We are **not** claiming the libraries are WCAG 2.2 AA conformant today. Several criteria fail or are untested. The plan in [09](./09-accessibility-readiness-plan.md) shows the path to conformance.
- We are **not** claiming the Embeddable platform's corporate compliance posture. That is a corporate question with its own evidence; this document only covers the libraries.

This discipline matters. A buyer who detects overclaim from a vendor — especially in compliance language — disengages quickly.

---

## 7. The biggest single decision the organization needs to make

The technical roadmap exists. The cost is bounded. The bigger question is one of positioning:

> Does Embeddable want to compete on accessibility and compliance, or on something else (speed, ergonomics, breadth, price)?

If accessibility and compliance are the position, the program in [11](./11-technical-roadmap.md) is the foundation. If they are not, the program still makes sense as defensive work — but the marketing investment looks different.

See [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) for the positioning options.

---

## Key takeaways

- "Compliance" actually means six related but distinct things: accessibility, security, privacy, auditability, procurement readiness, and operational maturity.
- Enforcement deadlines are real and close (DOJ ADA, EAA, DORA, EU AI Act, CMMC 2.0).
- Embedded analytics is being adopted by exactly the buyers under these pressures, so the question is when, not if.
- The Remarkable suite is technically clean today but has six P0 gaps that need to close before it can be positioned as compliance-ready.
- The fix is a focused engineering and documentation program, not a re-architecture.

## Open questions

- Which target sector should be prioritized — healthcare, fintech, government, or another?
- Where does Embeddable corporate stand on its own compliance posture (SOC 2, ISO 27001, HIPAA BAA, FedRAMP) — what can the libraries inherit?
- Is the organization willing to position itself externally as "compliance-ready" or does it prefer to keep the work internal and quiet?

## Recommended next steps

1. Pick one or two target sectors so the program can be scoped concretely.
2. Read [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) and [11 — Technical Roadmap](./11-technical-roadmap.md).
3. Decide Phase 0 budget and start.
4. Validate the inferred / requires-validation items about Embeddable corporate posture.

## Related documents

- [01 — Executive Overview](./01-executive-overview.md)
- [02 — Market Research Summary](./02-market-research-summary.md)
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [13 — Glossary](./13-glossary.md)
