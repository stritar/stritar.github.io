# Remarkable — Compliance-Ready Analytics Components

**Documentation set for stakeholder review.** Created 27 May 2026.

This folder contains a complete analysis of two parallel market opportunities — (1) compliance-ready analytics components in regulated industries, and (2) the AI-bridge for institutions that cannot expose their data environments to AI — an audit of the two Embeddable repositories that make up the Remarkable suite (`remarkable-pro` and `remarkable-ui`), and a phased roadmap to take the suite from its current state to a credible position on both pillars.

> **New reader? Start with [00 — The Two Pillars](./00-the-two-pillars.md)** for the plain-English overview of the two opportunities this set covers.

The set is organized in two layers — executive (Layer A) for non-technical readers, technical (Layer B) for deeper detail — plus a glossary, source/evidence index, and a final-summary punchline.

---

## TL;DR

| Question | Answer |
|---|---|
| Is there a market? | Yes — a defensible "compliance-ready analytics components" category is open today. No current vendor combines hosted-platform attestations, pre-configured components, chart-level accessibility, and air-gap support. |
| Is there a second opportunity? | Yes — AI has commoditized dashboard authoring (Spotter, Einstein, Copilot, MCP, Gemini through 2024–2025) but regulated buyers cannot expose their data to it. Embeddable's architecture is the bridge. Full treatment in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md); plain-English overview in [00 — The Two Pillars](./00-the-two-pillars.md). |
| Are the libraries ready? | The foundation is genuinely clean (small security surface, mature design system, strong control accessibility, no outbound network, host-owned data path), but six P0 compliance areas are not closed. Charts are not accessible to screen-reader users today. The AI-isolation contract is supported architecturally but has not yet been published. |
| How is the gap closed? | A four-phase program of focused engineering + documentation work. Phase ordering reflects dependencies; phase duration depends on team composition and tooling and is intentionally not specified in this set — see [11 — Technical Roadmap](./11-technical-roadmap.md). None of the work requires re-architecting either library. |
| What is the biggest risk? | Overclaim. "We are HIPAA compliant" destroys credibility in this market; "we are HIPAA compliance-ready" is defensible. The same rule applies on the AI side — "is private AI" / "AI-safe" without a qualifier destroys credibility; "AI-isolated by architecture" is defensible. |
| Where do I start reading? | [00 — The Two Pillars](./00-the-two-pillars.md) for the plain-English overview, then [15 — Final Summary](./15-final-summary.md) for the single-screen punchline, then [01 — Executive Overview](./01-executive-overview.md) for the full leadership briefing. |

---

## Recommended reading order

The set is interlinked, so you can jump in anywhere. These three orders are the most common.

### For leadership
1. [00 — The Two Pillars](./00-the-two-pillars.md)
2. [15 — Final Summary](./15-final-summary.md)
3. [01 — Executive Overview](./01-executive-overview.md)
4. [02 — Market Research Summary](./02-market-research-summary.md)
5. [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)
6. [05 — Repository Overview](./05-repository-overview.md)
7. [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
8. [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md)
9. [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
10. [17 — Agent-Native Rendering](./17-agent-native-rendering.md) *(exploratory)*

### For engineering and security teams
1. [00 — The Two Pillars](./00-the-two-pillars.md) (optional pre-read)
2. [01 — Executive Overview](./01-executive-overview.md)
3. [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)
4. [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
5. [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
6. [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) (the architectural data-flow walkthrough is in §10)
7. [11 — Technical Roadmap](./11-technical-roadmap.md) — includes Annex A file-level changes and Annex B doc scaffolds
8. [14 — Source and Evidence Index](./14-source-and-evidence-index.md)
9. [17 — Agent-Native Rendering](./17-agent-native-rendering.md) *(exploratory scan; the architectural fit is in §4–§6)*

### For compliance and accessibility teams
1. [00 — The Two Pillars](./00-the-two-pillars.md) (optional pre-read)
2. [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
3. [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) — the full twenty-area matrix
4. [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) — the WCAG 2.2 SC map
5. [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
6. [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) — for the AI-governance angle
7. [13 — Glossary](./13-glossary.md) (reference)
8. [14 — Source and Evidence Index](./14-source-and-evidence-index.md)

---

## The full document index

### Layer A — Executive and introductory

| # | Title | Best for | Approx length |
|---|---|---|---|
| [00](./00-the-two-pillars.md) | The Two Pillars | Plain-English entry point above both pillars | 2–3 pages |
| [01](./01-executive-overview.md) | Executive Overview | Leadership single-document summary | 5–6 pages |
| [02](./02-market-research-summary.md) | Market Research Summary | Non-technical market view | 3–4 pages |
| [04](./04-product-opportunity-and-positioning.md) | Product Opportunity and Positioning | Product / sales / marketing | 6–7 pages |
| [05](./05-repository-overview.md) | Repository Overview | Non-technical view of both repos | 4–5 pages |
| [07](./07-compliance-readiness-overview.md) | Compliance Readiness Overview | Plain-English compliance view | 4–5 pages |
| [12](./12-stakeholder-presentation-narrative.md) | Stakeholder Presentation Narrative | Slide-deck-ready storyline | 7–8 pages |
| [13](./13-glossary.md) | Glossary | Reference for all docs | 6–7 pages |
| [15](./15-final-summary.md) | Final Summary | Single-screen punchline | 2 pages |
| [16](./16-ai-bridge-positioning.md) | AI-Bridge Positioning | Product / sales / marketing — second pillar | 10–12 pages |
| [17](./17-agent-native-rendering.md) | Agent-Native Rendering | Product / eng / partnerships — exploratory horizon scan | 6–7 pages |
| [18](./18-the-agent-shift-plain-english.md) | The Agent Shift, in Plain English | Anyone — non-technical explainer of the agent-surface idea | 1–2 pages |

### Layer B — Technical and detailed

| # | Title | Best for | Approx length |
|---|---|---|---|
| [03](./03-detailed-market-research.md) | Detailed Market Research | Citations, competitor matrix, horizon scan | 8–9 pages |
| [06](./06-repository-technical-analysis.md) | Repository Technical Analysis | Engineering / architecture audit | 9–10 pages |
| [08](./08-detailed-compliance-gap-analysis.md) | Detailed Compliance Gap Analysis | The 20-area matrix + procurement checklist | 12–14 pages |
| [09](./09-accessibility-readiness-plan.md) | Accessibility Readiness Plan | WCAG SC map, chart-a11y patterns, AT matrix | 10–11 pages |
| [10](./10-security-and-privacy-readiness-plan.md) | Security and Privacy Readiness Plan | STRIDE threat model, supply chain, sectors | 10–11 pages |
| [11](./11-technical-roadmap.md) | Technical Roadmap | Phased plan + Annex A files + Annex B doc scaffolds | 14–15 pages |
| [14](./14-source-and-evidence-index.md) | Source and Evidence Index | What is observed vs inferred vs to-validate | 5–6 pages |

### Layer C — Industry landing pages

Sector-tuned instantiations of the two-pillar positioning, sitting between the public homepage and the deeper docs above. See [landing-pages/README.md](./landing-pages/README.md) for the folder index.

| Sector | Lead deadline / regulator pressure | Page |
|---|---|---|
| Healthcare and MedTech | HIPAA + BAA · WCAG 2.2 AA · EAA (28 June 2025) · NHS CLOUD Act position | [landing-pages/healthcare.md](./landing-pages/healthcare.md) |
| Financial services and fintech | DORA (in force 17 January 2025) · BaFin AI/ICT · EU AI Act (2 August 2026) | [landing-pages/financial-services.md](./landing-pages/financial-services.md) |
| Public sector and government | ADA Title II (26 April 2027 / 2028) · Section 508 · OMB M-24-10 | [landing-pages/public-sector.md](./landing-pages/public-sector.md) |
| Energy and critical infrastructure | NIS2 · NERC CIP · IEC 62443 · EU AI Act Annex III · air-gap OT deployment | [landing-pages/energy.md](./landing-pages/energy.md) |
| Pharma and life sciences | GxP · 21 CFR Part 11 · EU Annex 11 validation · EMA · GDPR (trial subjects) | [landing-pages/life-sciences.md](./landing-pages/life-sciences.md) |
| Insurance | Solvency II model governance · EU AI Act high-risk (pricing/underwriting) · NAIC AI bulletin · GDPR | [landing-pages/insurance.md](./landing-pages/insurance.md) |
| Education and EdTech | FERPA · COPPA · ADA / Section 508 · EAA accessibility · GDPR (minors) | [landing-pages/education.md](./landing-pages/education.md) |
| Defense and intelligence | ITAR / EAR export control · CMMC / NIST 800-171 · air-gapped & classified networks · data sovereignty | [landing-pages/defense.md](./landing-pages/defense.md) |
| Manufacturing and industrial | IEC 62443 OT/IT boundary · NIS2 · trade-secret protection | [landing-pages/manufacturing.md](./landing-pages/manufacturing.md) |

---

## Audience routing

Quick guide for who should read what.

| If you are … | Start with | Then read |
|---|---|---|
| **CEO / leadership** | [00](./00-the-two-pillars.md) → [15](./15-final-summary.md) → [01](./01-executive-overview.md) | [12](./12-stakeholder-presentation-narrative.md) for the deck flow; [16](./16-ai-bridge-positioning.md) for Pillar 2 |
| **VP / Director of Product** | [00](./00-the-two-pillars.md) → [01](./01-executive-overview.md) → [04](./04-product-opportunity-and-positioning.md) | [16](./16-ai-bridge-positioning.md) for Pillar 2; [11](./11-technical-roadmap.md) for the program; [17](./17-agent-native-rendering.md) for the agent-surface scan |
| **VP / Director of Engineering** | [01](./01-executive-overview.md) → [06](./06-repository-technical-analysis.md) | [11](./11-technical-roadmap.md) → [09](./09-accessibility-readiness-plan.md) → [10](./10-security-and-privacy-readiness-plan.md) → [16 §3, §10](./16-ai-bridge-positioning.md) → [17](./17-agent-native-rendering.md) |
| **CISO / Head of Security** | [10](./10-security-and-privacy-readiness-plan.md) → [08](./08-detailed-compliance-gap-analysis.md) | [16](./16-ai-bridge-positioning.md) for the AI-isolation contract; [11](./11-technical-roadmap.md) Annex A + B |
| **Head of Compliance / GRC** | [07](./07-compliance-readiness-overview.md) → [08](./08-detailed-compliance-gap-analysis.md) | [10](./10-security-and-privacy-readiness-plan.md) sector overlays; [16](./16-ai-bridge-positioning.md) for AI governance |
| **Head of AI Governance / Responsible AI Lead** | [00](./00-the-two-pillars.md) → [16](./16-ai-bridge-positioning.md) | [10](./10-security-and-privacy-readiness-plan.md); [13](./13-glossary.md) for the AI-governance terms |
| **Accessibility Lead** | [09](./09-accessibility-readiness-plan.md) | [08 Area A1](./08-detailed-compliance-gap-analysis.md) → [11](./11-technical-roadmap.md) Phase 1 |
| **Sales / Marketing** | [00](./00-the-two-pillars.md) → [02](./02-market-research-summary.md) → [04](./04-product-opportunity-and-positioning.md) | [16](./16-ai-bridge-positioning.md) for Pillar 2 messaging (Track D); [03](./03-detailed-market-research.md) for citations |
| **Partner / Investor** | [00](./00-the-two-pillars.md) → [15](./15-final-summary.md) → [01](./01-executive-overview.md) | [16](./16-ai-bridge-positioning.md); [03](./03-detailed-market-research.md) → [11](./11-technical-roadmap.md) |
| **A regulated-industry prospect** | [07](./07-compliance-readiness-overview.md) | [08 Section B (procurement artifacts)](./08-detailed-compliance-gap-analysis.md) → [10](./10-security-and-privacy-readiness-plan.md) → [16 §10 (AI-isolation contract)](./16-ai-bridge-positioning.md) |

---

## How the documents link

- **Every claim about the libraries** is traceable to a file path. The full index is in [14 — Source and Evidence Index](./14-source-and-evidence-index.md).
- **Every claim about regulations or competitors** is cited in [03 — Detailed Market Research](./03-detailed-market-research.md).
- **Every compliance area** appears in the matrix in [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md).
- **Every roadmap deliverable** maps to a deliverable ID (0.1, 1.3, etc.) in [11 — Technical Roadmap](./11-technical-roadmap.md).
- **Every term we use** has a plain-English definition in [13 — Glossary](./13-glossary.md).

---

## Language discipline used across the set

This documentation set never uses these phrases:

- "is HIPAA compliant"
- "is SOC 2 compliant"
- "is FedRAMP compliant"
- "is ISO 27001 certified"
- "is FIPS-validated"
- "is AI-safe"
- "is private AI"
- "AI never touches your data" (without an architectural qualifier)
- "secure AI" / "compliant AI" (as standalone claims)

Compliance is a property of an organization, an environment, and an audit — not a software library. AI safety is a property of an architecture and a deployment — not a marketing claim. The set uses:

- *compliance-ready*
- *potential path to compliance*
- *observed gap*
- *requires validation*
- *evidence not found*
- *recommended control*
- *likely requirement*
- *AI-isolated by architecture* (paired with the architectural evidence: host-owned data path, audit hooks)
- *AI-built, never AI-exposed*
- *no model sees customer data unless the customer authorizes it*
- *BYO-model deployment supported*
- *AI-isolation contract documented at the host integration boundary*

If you find a phrase that overclaims, please flag it — overclaim is the single biggest risk to credibility in this market, on both the compliance side and the AI side.

---

## What this documentation set is, and is not

**This is:** an analyst-style audit of the repositories, a researched market view, a phased recommendation backed by file-level evidence and cited sources, and a complete artifact pack ready for stakeholder review.

**This is not:** a marketing document, a sales-ready collateral pack (those should be derived from it), a financial model, a hiring plan, a customer commitment, or a substitute for the actual VPAT, SOC 2 report, BAA template, or DPA template (which the program produces).

---

## Provenance and limitations

The audit was conducted on **27 May 2026** against `/Users/denisstritar/remarkable-a11y/remarkable-pro` and `/Users/denisstritar/remarkable-a11y/remarkable-ui`. Findings reflect those snapshots; subsequent commits may change the picture. Methodology, tooling, and explicit limitations are documented in [14 — Source and Evidence Index, Section 4](./14-source-and-evidence-index.md).

---

## Feedback

If you spot an error, an overclaim, or a missing perspective, please raise it. The set is designed to be the single source of truth for this work — if any part of it doesn't survive scrutiny, that's the first thing to fix.

---

## See also

- [00 — The Two Pillars](./00-the-two-pillars.md) — plain-English entry point above both pillars
- [15 — Final Summary](./15-final-summary.md) — the 2-page punchline if you only read one thing
- [01 — Executive Overview](./01-executive-overview.md) — the 5-page version for leadership
- [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) — the slide-deck flow
- [11 — Technical Roadmap](./11-technical-roadmap.md) — the actionable plan
- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) — full treatment of the AI-bridge pillar
- [17 — Agent-Native Rendering](./17-agent-native-rendering.md) — exploratory scan of rendering branded analytics inside the agent surface
