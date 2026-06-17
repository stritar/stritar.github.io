# 01 — Executive Overview

**Purpose:** A single-document, leadership-friendly summary of the entire analysis: the market opportunity, the state of the Remarkable suite, the compliance gap, and the recommended path forward.

**Audience:** Embeddable leadership, the executive team, the board, key investors, and senior partners. Anyone who needs the headlines without reading the full documentation set.

**Related documents:** [00 — The Two Pillars](./00-the-two-pillars.md) · [02 — Market Research Summary](./02-market-research-summary.md) · [05 — Repository Overview](./05-repository-overview.md) · [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) · [15 — Final Summary](./15-final-summary.md) · [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)

---

## 1. Why this document exists

Embeddable has built two analytics-component libraries — `remarkable-ui` (the open primitives layer) and `remarkable-pro` (the Embeddable-platform-wired suite). They power the analytics layer of products in a market where the buyer profile is shifting: more regulated, more procurement-driven, more sensitive to accessibility and security attestation. This document summarizes whether the libraries are ready to win in that market, where the gaps are, and what it would take to close them.

The honest, one-sentence version of the answer:

> The libraries have an unusually clean foundation and a small, defensible security surface, but they are not yet ready to survive a strict regulated-industry procurement screen. A focused program would put them there — and would position Embeddable in a category of one across two parallel pillars: compliance-ready analytics components and the AI-bridge for regulated data.

---

## 2. The market opportunity

Embedded analytics is mature; **compliance-ready** embedded analytics is not. The vendors that dominate embedded BI (Sigma, ThoughtSpot, Power BI Embedded, Tableau Embedded, Looker Embedded) carry strong corporate attestations like SOC 2 and ISO 27001 but generally lag on chart-level accessibility. The vendors that lead on chart accessibility (Highcharts, IBM Carbon Charts, Visa Chart Components) are libraries without organizational attestations because libraries can't carry them.

**The top-right quadrant — hosted-platform compliance inheritance plus serious chart-level accessibility plus pre-configured drop-in components — is open.** The Remarkable suite, paired with Embeddable's corporate work, can occupy it.

Three forces make this a near-term conversation rather than a distant one:

- **Enforcement deadlines.** US ADA Title II Web Rule (26 April 2027 / 2028 phased compliance dates). EU Accessibility Act (28 June 2025 application *requires validation*). EU DORA (in force 17 January 2025). EU AI Act (full applicability 2 August 2026). CMMC 2.0 phased rollout into US defense contracts.
- **Procurement institutionalization.** Buyer security and accessibility teams now require named documents (VPAT, SOC 2 report, SBOM, BAA, DPA) rather than vendor promises.
- **Buyer profile match.** The companies most likely to embed analytics — fintech, healthcare SaaS, government modernization, defense developer tooling — are precisely the companies under these pressures.

A **fourth force** is now visible and is developed as the second positioning pillar in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md): AI has commoditized dashboard authoring (ThoughtSpot Spotter, Tableau Einstein, Sigma + Anthropic MCP, Power BI Copilot, Looker + Gemini all shipped through 2024–2025), but regulated buyers cannot expose their data environments to AI. The same procurement-led buyer who screens for SOC 2 and a VPAT is now also being asked to map a vendor to NIST AI RMF, OMB M-24-10, BaFin AI/ICT guidance, FCA, or DoD CDAO. Embeddable's architectural restraint — host-owned data, no telemetry, no third-party SDKs — is the bridge. The plain-English overview of both pillars is in [00 — The Two Pillars](./00-the-two-pillars.md).

Full landscape, competitor matrix, and citations: [03 — Detailed Market Research](./03-detailed-market-research.md). Plain-English summary: [02 — Market Research Summary](./02-market-research-summary.md). The AI-bridge pillar in detail: [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md).

---

## 3. The product opportunity

Three positioning options the organization can consider, ranked by defensibility:

| Position | Description | Strength | Risk |
|---|---|---|---|
| **Compliance-ready analytics components + AI-bridge for regulated data** *(recommended)* | Two parallel pillars, same buyer, same artifact pack: (1) pre-configured analytics components with hosted-platform compliance inheritance and chart-level accessibility, plus (2) "AI-built, never AI-exposed" — AI assists the builder while the host owns the runtime data (full treatment in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)). | No vendor today owns either category. Procurement deadlines and AI/regulator collision both create urgency. | Requires disciplined engineering and documentation work, plus language discipline on both pillars to avoid overclaim. |
| Embedded analytics for regulated industries | A sector-vertical position (fintech, healthcare, gov) | Easier to message; aligns with sales motion | Less defensible against competitors who match on features |
| Continue as a general embedded-analytics vendor | The current position | Lowest investment | Loses to vendors with more breadth or lower price; eventually loses to vendors who establish a compliance or AI-isolation position |

Detailed personas, packaging options, messaging directions, and the MIT-vs-commercial-support trade-off: [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md).

---

## 4. The state of the suite

**Strengths** that are observable directly in the code:

- A mature 666-token design system arranged in three layers (core / semantic / component).
- A small, principled security surface: no direct network, no telemetry, no third-party SDKs, no cookies, no credential handling, no cryptography.
- Strong accessibility on interactive controls (dropdowns, date pickers, switches) via vetted primitives (Radix, react-day-picker) plus hand-written keyboard navigation.
- Internationalization in `remarkable-pro` (English + German, infrastructure for more).
- Clean dependency hygiene with deliberate hardening signals (xlsx pinned to the `@e965/xlsx` fork, axios pinned via override).
- Strong CI gates: lint, type-check, test, SonarCloud SAST on every PR.

**Gaps** that block adoption by regulated-industry buyers today:

- Charts render to a `<canvas>` element with no data-table alternative — fundamentally inaccessible to screen-reader users.
- No automated accessibility testing (`eslint-plugin-jsx-a11y`, `@axe-core/react`, Storybook a11y addon all absent).
- No `prefers-reduced-motion`, `prefers-contrast`, or `forced-colors` handling.
- Governance documentation missing in both repos: `SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`.
- No automated supply-chain scanning: no Dependabot, no CodeQL, no SBOM emission, no npm provenance.
- `remarkable-pro` is pre-1.0 (0.3.1) and has no Storybook — visual discovery requires the Embeddable canvas.
- No public-facing procurement artifact pack (VPAT, BAA template, DPA template, subprocessor list, trust-center page).

Full inventory, file paths, and dependency-by-dependency review: [06 — Repository Technical Analysis](./06-repository-technical-analysis.md). Non-technical summary: [05 — Repository Overview](./05-repository-overview.md).

---

## 5. The compliance gap

Twenty compliance areas examined; six rate **P0** today (block regulated-industry adoption); the rest rate P1 or P2.

| Area | Current rating | Priority |
|---|---|---|
| Accessibility | Basic | **P0** |
| Security tooling | Emerging | **P0** |
| Documentation | Basic | **P0** |
| Dependency management | Emerging | **P0** |
| Vulnerability management | Basic | **P0** |
| Procurement readiness | Basic | **P0** |

The fix for every P0 is identified and bounded. None of the areas requires re-architecting either library. Several adjacent items rate "Unknown" because their resolution depends on Embeddable corporate posture (SOC 2 status, ISO 27001 status, BAA capability, FedRAMP authorization) rather than work in the libraries themselves — confirming those is a leadership task, not an engineering task.

Full matrix (twenty areas, with evidence, gap, recommendation, priority, effort, owner), procurement-artifact checklist, and sector-specific overlays: [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md).

---

## 6. The recommended path forward

A four-phase program, with continuous-improvement work continuing indefinitely after that. Phase ordering reflects dependencies; phase *duration* depends on team composition and tooling and is intentionally not stated here — see [11 — Technical Roadmap](./11-technical-roadmap.md) for sequencing detail.

**Phase 0 — Foundations.** Land the four governance documents (`SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`). Add `eslint-plugin-jsx-a11y`, `@axe-core/react`, the Storybook a11y addon. Configure Dependabot, CodeQL, SBOM emission, npm publish provenance. Stand up the internal trust-center page.

**Phase 1 — Accessibility AA.** Run a systematic WCAG 2.2 Level AA walkthrough. Implement the chart-data-table fallback, accessible summary statements, keyboard chart traversal, ARIA live regions for filter changes. Add `prefers-reduced-motion`, `prefers-contrast`, `forced-colors` support. Author the first VPAT 2.5 / ACR.

**Phase 2 — Security and supply chain (overlaps Phase 1).** Mature security tooling, SBOM in both CycloneDX and SPDX, signed commits, vulnerability disclosure SLA, component-level threat model. Publish the data-handling, encryption, and air-gap commitments.

**Phase 3 — Auditability, RBAC hooks, procurement readiness.** Add the `onAuditEvent` hook in the runtime. Define and document the `clientContext.permissions` contract. Publish the public trust-center page with the full artifact pack: VPAT, SBOM, SOC 2 (corporate inheritance), BAA template, DPA template, subprocessor list, MSA, SLA. Bring PRO to 1.0 with a stated SemVer commitment. Publish the AI-isolation architecture statement and the AI-RMF conformity-assessment template (see [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)) on the same trust-center page.

**Phase 4 — Sector certifications and continuous improvement.** VPAT refresh on a regular cadence. Periodic AT walkthroughs. Third-party pentests. Embeddable corporate SOC 2 / ISO 27001 surveillance audits. Sonification module, RTL language support, FedRAMP / IL5+ support if prioritized.

Phased detail, dependencies, effort bands per deliverable, acceptance criteria, the full risk register, and Annex A (concrete file-level change list) plus Annex B (governance-doc scaffolds): [11 — Technical Roadmap](./11-technical-roadmap.md).

---

## 7. The five decisions leadership needs to make

The engineering plan is bounded; the leadership decisions are not. Five decisions gate the program:

1. **Sector priority.** Which of the seven target sectors leads the go-to-market story? (Recommendation: choose one or two from healthcare, fintech, government, defense to focus the artifact pack.)
2. **Embeddable corporate compliance commitment.** Confirm or commit to SOC 2 Type II, ISO 27001 (where applicable), HIPAA BAA capability, and FedRAMP authorization at the platform level. The libraries' positioning *inherits* from this.
3. **Accessibility headcount.** Internal Accessibility Lead hire or contracted external accessibility partner (Deque, TPGi, Tenon, Level Access)? Phase 1 cannot begin without one or the other.
4. **External positioning timing.** Lead externally with "compliance-ready analytics components" *now* or *after* Phase 1 completes? The trade-off is risk-of-overclaim versus first-mover advantage.

5. **AI/model-hosting policy.** BYO-model only (customer wires their own LLM into a documented interface), Embeddable-hosted private model, or both? The libraries' architecture supports any of these — the messaging must pick. Detail in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md).

Detailed framing of each decision: [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md).

---

## 8. Material risks

The five risks that can derail the program:

1. **Overclaim.** Saying "we are HIPAA compliant" instead of "we are HIPAA compliance-ready" destroys credibility in this market faster than any other failure mode. Mitigation: strict language discipline; Compliance reviews every public claim.
2. **Embeddable corporate compliance timeline slips behind the libraries' timeline.** The libraries' position depends on corporate-level work (SOC 2 / ISO 27001 / BAA). Mitigation: sequence the trust-center launch around the corporate timeline; use "available on request" language until artifacts are public.
3. **Accessibility headcount not approved or delayed.** Phase 1 is the highest-leverage work and gates on someone owning it. Mitigation: cultivate consultancy relationships early; begin Phase 0 work that doesn't depend on the lead.
4. **A competitor launches a similar position.** Mitigation: lead with credible evidence (VPAT, SBOM, dated trust center), not marketing.
5. **Chart.js canvas-rendering becomes a long-term ceiling.** Mitigation: document the limit; use DOM-overlay focus patterns as the bridge; reassess SVG renderer post-Phase 3.

Full risk register: [11 — Technical Roadmap, Section 7](./11-technical-roadmap.md#7-risk-register).

---

## 9. What this is worth

A precise dollar figure requires Embeddable-internal data. What we can say without overclaim:

- Embedded analytics is tracked by major analyst firms as a discrete category with double-digit annual growth through the mid-2020s *(requires validation against fresh analyst reports)*.
- Regulated sectors typically represent 30–50% of an embedded-analytics vendor's revenue at scale *(requires validation against Embeddable's actuals)*.
- Compliance-ready is most differentiating in the mid-market, where buyers prefer to *buy* compliance rather than build it. Mid-market regulated-industry deals carry an ACV uplift of 30–80% over commercial deals *(industry rule of thumb; requires validation)*.

The opportunity does not require winning the entire embedded-analytics market. It requires winning a defensible share of the regulated subset of it — and that share is one that no current vendor is positioned to take by default.

---

## 10. Recommendation

We recommend that Embeddable:

1. **Approve Phase 0 of the technical roadmap.** It is self-contained, requires modest engineering effort, and produces foundational artifacts (governance docs, lint, axe, Dependabot, CodeQL, SBOM) that pay back regardless of every other decision below.
2. **Validate the Embeddable corporate compliance posture** (SOC 2 status, ISO 27001 status, BAA capability, FedRAMP plans). The library positioning depends on it.
3. **Validate the Embeddable corporate AI/model-hosting posture** alongside compliance validation — BYO-model interface, no-training warranty, regional-model deployment. The AI-bridge pillar depends on it (see [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)).
4. **Commit to the Accessibility Lead role** — through internal hire or external consultancy.
5. **Pick one or two lead sectors** from healthcare, fintech, government, and defense to anchor the artifact pack.
6. **Plan the public trust-center launch** to coincide with Phase 3 completion, not earlier — to ensure the artifacts are real, dated, and defensible.

The bigger strategic question — "should Embeddable lead with compliance-readiness *and* AI-bridge-for-regulated-data as its primary differentiators?" — sits with leadership, but the technical work in Phase 0 + Phase 1 is the right move either way.

---

## Key takeaways

- A real market gap exists for compliance-ready analytics components, with hard regulatory deadlines through 2025–2028.
- A parallel gap exists for the AI-bridge — AI-built analytics that does not expose customer data to a model the customer doesn't control. Both pillars sell to the same buyer. Detail in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md); plain-English overview in [00 — The Two Pillars](./00-the-two-pillars.md).
- The Remarkable suite has the foundation to occupy both gaps but is not there today.
- Six P0 compliance areas need closure; none requires re-architecture; all are addressable inside the four-phase program.
- Five leadership decisions gate the program: sector priority, corporate compliance commitment, corporate AI/model-hosting commitment, accessibility headcount, external positioning timing.
- The largest risk is overclaim — on the compliance side ("is HIPAA compliant") and on the AI side ("is private AI"); the second largest is misalignment between the libraries' positioning and Embeddable corporate's compliance and AI posture.

## Open questions

- Where does Embeddable corporate stand on its own compliance posture today?
- What is Embeddable corporate's AI/model-hosting posture (BYO-model, no-training warranty, regional model deployment)?
- What is the headcount commitment for the program?
- Which sector(s) does the organization want to prioritize?
- Is there appetite to position publicly as "compliance-ready" and "AI-isolated by architecture" now, or prefer quiet preparatory work first?

## Recommended next steps

1. Read [00 — The Two Pillars](./00-the-two-pillars.md) for the plain-English overview of both opportunities.
2. Read [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) for a slide-deck-ready expansion.
3. Read [15 — Final Summary](./15-final-summary.md) for the single-screen headlines.
4. Read [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) for the second pillar in full.
5. Decide Phase 0 budget and headcount.
6. Confirm the corporate compliance posture and AI/model-hosting posture in parallel.

## Related documents

- [02 — Market Research Summary](./02-market-research-summary.md)
- [03 — Detailed Market Research](./03-detailed-market-research.md)
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
- [05 — Repository Overview](./05-repository-overview.md)
- [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)
- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md)
- [13 — Glossary](./13-glossary.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)
- [15 — Final Summary](./15-final-summary.md)
- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)
- [00 — The Two Pillars](./00-the-two-pillars.md)
