# 15 — Final Summary

**Purpose:** A single-screen punchline of the entire documentation set. Everything else in this folder supports the five points below.

**Audience:** The busiest readers — board members, executives, partners getting their first introduction. Also the page sales engineers print when they walk into a regulated-industry meeting.

**Related documents:** [01 — Executive Overview](./01-executive-overview.md) · [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) · [README](./README.md)

---

## The biggest market opportunity

**A defensible "compliance-ready analytics components" category is open today.** Embedded BI vendors (Sigma, ThoughtSpot, Power BI Embedded, Tableau, Looker) carry strong corporate attestations but lag on chart-level accessibility. Accessible chart libraries (Highcharts, IBM Carbon Charts, Visa Chart Components) lead on accessibility but cannot carry organizational attestations because they are libraries, not platforms. No vendor today combines pre-configured analytics components + hosted-platform compliance inheritance + serious chart accessibility + an air-gap/sovereign-cloud story. Embeddable + Remarkable can occupy that intersection. Enforcement deadlines (ADA Title II, EAA, EU AI Act, DORA, CMMC 2.0) make this a near-term opportunity, not a distant one.

---

## The biggest near-term accelerant — AI without exposure

**A parallel, equally defensible "AI-built, never AI-exposed" category is open today.** Every major embedded-BI vendor shipped an AI builder through 2024–2025 (ThoughtSpot Spotter, Tableau Einstein, Sigma + Anthropic MCP, Power BI Copilot, Looker + Gemini, Qlik Answers, Hex Magic). In the same window, regulators converged on the principle that sensitive data should not be exposed to a model the customer doesn't control (EU AI Act Annex III, OMB M-24-10, NIST AI RMF + GenAI Profile, BaFin AI/ICT, FCA AI Lab, DoD CDAO, NHS data sovereignty). CISO surveys back it: Proofpoint 2025 reports 81% high concern about data leaked into AI training; Deloitte 2025 reports 73% citing data privacy as the top AI risk; Kiteworks 2025 reports 83% lacking visibility into third-party AI. **Embeddable's libraries — no outbound network, no telemetry, host-owned data, audit hooks — are the bridge.** AI assists the builder; the host owns the runtime data; the two never touch. Plus a no-code experience for the non-technical user; plus native-looking output that uses the host's own design tokens. Two pillars, one buyer, one artifact pack. Full detail in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md); plain-English overview in [00 — The Two Pillars](./00-the-two-pillars.md).

---

## The biggest compliance gap

**Charts are not accessible to screen-reader users.** Chart.js renders to a `<canvas>` element with no data-table alternative, no accessible summary, no keyboard traversal, no ARIA live region for filter changes. For any buyer with Section 508, EN 301 549, ADA Title II, or EAA obligations, this is the single biggest blocker. Every other gap — governance documentation, supply-chain tooling, audit-event hooks — is straightforward by comparison. The chart-accessibility pattern is well-understood (Highcharts, Carbon, Visa Chart, Chartability framework define the bar). The work is bounded; it just hasn't started.

---

## The biggest technical gap

**The supply-chain and disclosure tooling that a procurement officer expects to see is not in place.** No Dependabot. No CodeQL. No `SECURITY.md`. No SBOM emission. No npm publish provenance. No published vulnerability-disclosure SLA. The libraries are technically clean and have a small security footprint, but a procurement screen does not look at code — it looks at artifacts. The artifacts do not exist yet. Phase 0 of the roadmap lands them in 1–2 months and is the highest-ROI work in the whole program.

---

## The biggest product positioning opportunity

**Re-categorize Remarkable as "compliance-ready analytics components."** Don't fight Sigma and ThoughtSpot on breadth or price. Don't compete with Recharts and Tremor on developer ergonomics. Stake out a category that maps directly to how regulated-industry buyers describe their need: "we need analytics, but it has to pass our procurement, accessibility, and audit screens." The category has no current owner. Embeddable has the foundation, the platform inheritance, and the engineering team to occupy it. The discipline that matters is language — say "compliance-ready," never "compliant," to keep credibility intact while the program runs.

---

## The recommended next 5 actions

1. **Approve Phase 0 of [11 — Technical Roadmap](./11-technical-roadmap.md).** Land `SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` in both repos. Add `eslint-plugin-jsx-a11y`, `@axe-core/react`, the Storybook a11y addon, Dependabot, CodeQL, SBOM emission, and npm publish provenance. Stand up the internal trust-center page. **Owner:** Engineering leadership.

2. **Validate the Embeddable corporate compliance and AI/model-hosting posture.** Confirm SOC 2 status, ISO 27001 status, HIPAA BAA capability, FedRAMP plans, and — added in this round — the AI/model-hosting policy (BYO-model, no-training warranty, regional deployment). The libraries' position depends on what the platform can inherit to them on both axes. **Owner:** Compliance / Leadership.

3. **Commit to the Accessibility Lead role.** Internal hire or contracted partner (Deque, TPGi, Tenon, Level Access). Phase 1 — the highest-leverage block of work — gates on someone owning it. **Owner:** Product / Leadership.

4. **Pick one or two lead sectors** from healthcare, fintech, government, and defense. The artifact pack and sales motion are scoped concretely once a sector is chosen. **Owner:** Product Leadership + Sales Leadership.

5. **Schedule the next milestone review.** The mid-point check on Phase 0 + Phase 1 + Phase 2 progress, before the public trust-center launch in Phase 3 (which should also carry the AI-isolation contract — see [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)). **Owner:** Program leadership.

---

## In one sentence

The libraries have an unusually clean foundation, the market has *two* open categories waiting for an owner (compliance-ready components and the AI-bridge for regulated data), the engineering work is bounded, and the principal risk in both is overclaim — which discipline alone can manage.

---

## Key takeaways

The sections above *are* the takeaways. If you only read this page, take those points and the in-one-sentence above with you.

## Open questions

- Embeddable corporate compliance posture (SOC 2, ISO 27001, HIPAA BAA, FedRAMP) — *requires validation*.
- Embeddable corporate AI/model-hosting policy (BYO-model, no-training warranty, regional deployment) — *requires validation*.
- Lead sector(s) for the go-to-market story.
- Accessibility Lead headcount commitment.
- Public-positioning timing — pre or post Phase 1 completion.

## Recommended next steps

See the numbered list above.

## Related documents

- [00 — The Two Pillars](./00-the-two-pillars.md) — plain-English overview of both pillars
- [01 — Executive Overview](./01-executive-overview.md) — the full leadership summary
- [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) — the slide-deck-ready version
- [11 — Technical Roadmap](./11-technical-roadmap.md) — the phased plan
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) — the matrix
- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) — full treatment of Pillar 2
- [README](./README.md) — the index
