# 12 — Stakeholder Presentation Narrative

**Purpose:** A clear, slide-deck-ready narrative that can be used to present this work to leadership, the board, partners, investors, or a regulated-industry prospect. Each section is shaped to map directly to one or two slides. The narrative arcs from problem → market gap → opportunity → repo status → compliance gap → roadmap → risks → decision points.

**Audience:** Anyone presenting this work externally or to leadership. Sales engineers preparing a regulated-industry pitch. Founders presenting to investors. PMs presenting to executives.

**Related documents:** [01 — Executive Overview](./01-executive-overview.md) · [03 — Detailed Market Research](./03-detailed-market-research.md) · [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [15 — Final Summary](./15-final-summary.md)

---

## How to use this narrative

Each numbered section corresponds to one slide (sometimes two). The bullets under each section are the talking points; the table or quoted line is the visual element. Recommended deck length: 14–16 slides for a leadership review, 8–10 slides for a sales pitch.

Standard slide kit: a clean title slide, the 14 main sections below (plus two AI-bridge slides — 3.5 and 4b — that can run in the main deck or move to the appendix depending on audience), an appendix slide pointing to this docs set, and a Q&A slide.

---

## Slide 1 — Title

> **Compliance-Ready Analytics Components — and the AI-Bridge for Regulated Data**
> Two parallel positioning pillars, market opportunity, repository state, and the path forward for the Remarkable suite.

---

## Slide 2 — The market problem in one sentence

> Procurement teams in regulated industries — healthcare, fintech, government, defense — have institutionalized the compliance screen. Vendors who can't produce a current VPAT, SOC 2 report, SBOM, and trust-center page are filtered out before the engineering team gets a vote.

Talking points:

- This is a recent shift. Five years ago compliance was a "nice to have" in vendor screens. Today it's the gate.
- Embedded analytics — the practice of putting charts inside someone else's product — is being adopted by exactly the buyers under this pressure.
- The vendor that has the documents wins disproportionately.

---

## Slide 3 — Hard deadlines arriving

A table; this is the slide that creates urgency:

| Deadline | What | Who it affects |
|---|---|---|
| 17 January 2025 | EU DORA in force | EU financial entities and their critical ICT third-party providers |
| 2 February 2025 | EU AI Act prohibited practices apply | All EU AI deployments |
| 28 June 2025 | EU Accessibility Act applies | EU private-sector products and services (banking, e-commerce, consumer ICT) — *requires validation* |
| 2 August 2026 | EU AI Act full applicability | All EU AI deployments |
| 26 April 2027 | US ADA Title II Web Rule | US state and local governments (50,000+ population) |
| 26 April 2028 | US ADA Title II Web Rule | Smaller US state and local governments and special districts |
| Ongoing | CMMC 2.0 phased rollout | US defense contractors |

Talking point: "These deadlines pull a customer base into our procurement-screen world. They are not optional and they are not far away."

---

## Slide 3.5 — The AI complication

A two-column slide; left column lists AI builders shipped 2024–2025, right column lists regulator responses arriving in the same window.

| AI-built analytics is now table stakes | Regulators converged on AI data exposure |
|---|---|
| ThoughtSpot Spotter (Nov 2024 GA) | EU AI Act — full applicability 2 Aug 2026 |
| Tableau Einstein (Sep 2024) | US OMB M-24-10 (Mar 2024) — federal AI inventories |
| Sigma + Anthropic MCP (Nov 2024) | NIST AI RMF + GenAI Profile (July 2024) |
| Power BI Copilot (late 2024 GA) | BaFin AI/ICT guidance (Dec 2025) |
| Looker + Gemini (2024) | FCA AI Lab + Live Testing (Sep 2025) |
| Qlik Answers, GoodData agentic, Hex Magic | DoD CDAO AI strategy (Jan 2026); NHS data sovereignty (May 2025) |

Talking point: "Every embedded-BI vendor shipped an AI feature in the last year. In the same year, every regulator that matters to our buyer base converged on the principle that sensitive data should not be exposed to a model the customer doesn't control. We are **not racing to add AI on top of analytics.** We are the analytics layer that lets AI happen without exposing your data to it. Full treatment in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)."

---

## Slide 4 — The market gap, in one visual

A two-by-two:

```
                Hosted-platform compliance
                  (SOC 2 / ISO 27001 / BAA)
                          ↑
                          │
              Sigma  •    │    • (empty quadrant)
              ThoughtSpot │
              Power BI    │
                          │
       ───────────────────┼───────────────────→ Chart-level accessibility
                          │                       (WCAG 2.2 AA, VPAT, sonification)
                          │
                          │    • Highcharts
                          │    • IBM Carbon
                          │    • Visa Chart
                          │
```

Talking point: "Embedded BI vendors carry corporate compliance but not chart-level accessibility. Accessible chart libraries are accessible but don't carry organizational attestations. **The top-right quadrant is open.** The Remarkable suite, paired with the Embeddable platform's corporate work, can occupy it."

Caption (one line below the visual): "The same shape applies to AI capability × data-isolation posture — see Slide 4b in the appendix, sourced from [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)."

---

## Slide 4b — The AI-bridge gap, in the same visual (appendix)

A second two-by-two, intentionally mirroring Slide 4:

```
                       Strong AI builder
                              ↑
              ThoughtSpot     │
              Power BI Copilot│  ← (empty quadrant —
              Sigma + MCP     │     the AI-bridge position)
              Tableau Einstein│
              Looker + Gemini │
                              │
       ──────────────────────┼──────────────────→ Strong data-isolation posture
                              │                     (host-owned data, audit hooks,
                              │                      air-gap, no model exposure)
                              │
                              │   Confidential-compute infrastructure
                              │   (Azure Confidential VMs, AWS Nitro
                              │    Enclaves, GCP Confidential Space)
                              │   — but not packaged as analytics
```

Talking point: "Same shape, same empty quadrant. BI vendors lead with AI capability; infrastructure vendors lead with isolation; nobody ships both as a packaged analytics layer. Embeddable's architectural restraint plus the platform contract is the packaging. **Two pillars, one gap shape, one buyer.**"

---

## Slide 5 — Who buys this

A simplified version of the stakeholder map in [04 — Section 4](./04-product-opportunity-and-positioning.md):

| Stakeholder | What they ask for first |
|---|---|
| CISO / security | SOC 2 Type II, SBOM, SECURITY.md |
| CMIO / privacy | HIPAA BAA, data-handling document |
| Accessibility officer | VPAT 2.5 / ACR |
| Procurement / legal | DPA, MSA, subprocessor list |
| Engineering | Documentation, support SLA |

Talking point: "Every cell in that right column is something we can produce, or are already producing. The roadmap is the production schedule."

---

## Slide 6 — Where the Remarkable suite stands today (strengths)

Bullets:

- 666 design tokens organized in a three-layer architecture; mature theming and CSS-variable system.
- Strong accessibility on interactive controls (dropdowns, date pickers, multi-selects, switches) via vetted primitives and hand-written keyboard navigation.
- Small, principled security surface: no direct network, no telemetry, no third-party SDKs, no cookies, no credential handling, no cryptography.
- Internationalization in PRO (English and German today; infrastructure for more).
- Clean dependency hygiene with deliberate hardening signals (xlsx fork pin, axios override).

Talking point: "The foundation is genuinely good. This is not a rebuild."

---

## Slide 7 — Where the Remarkable suite stands today (gaps)

Bullets:

- **Charts are not accessible.** Chart.js renders to a `<canvas>` with no data-table alternative.
- **No automated accessibility testing.** No `eslint-plugin-jsx-a11y`, no axe-core, no Storybook a11y addon.
- **Governance documentation is absent.** No `SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`.
- **No automated supply-chain scanning.** No Dependabot, CodeQL, SBOM emission, npm provenance.
- **PRO is pre-1.0** and has no Storybook for visual discovery.
- **Six P0 compliance areas** need closure (accessibility, security tooling, governance docs, dependency mgmt, vuln mgmt, procurement readiness).

Talking point: "None of these is structural. All of them are addressable through focused engineering and documentation work."

---

## Slide 8 — The compliance gap, summarized

The condensed maturity heatmap from [08 — Section E](./08-detailed-compliance-gap-analysis.md):

| Area | Current rating |
|---|---|
| Accessibility | Basic |
| Security tooling | Emerging |
| Privacy | Emerging |
| Audit logging | Not started |
| Documentation | Basic |
| Dependency management | Emerging |
| Vulnerability management | Basic |
| API governance (PRO) | Basic (pre-1.0) |
| Procurement readiness | Basic |

Talking point: "Six P0 areas, all addressable inside one focused program. Several Unknown areas (RBAC, encryption, enterprise support) depend on the Embeddable platform's corporate posture and need leadership input, not engineering work in the libraries."

---

## Slide 9 — The four-phase roadmap

A phase-dependency visual (durations are intentionally not stated — they depend on team composition and tooling):

```
P0  ▶  Foundations
P1  ─▶ Accessibility AA          (begins after P0 lands)
P2  ─▶ Security & supply chain   (overlaps P1)
P3  ──▶ Audit, RBAC, procurement (overlaps the end of P1/P2)
P4  ───▶ Sector certifications, continuous improvement (ongoing)
```

- **Phase 0 — Foundations.** Governance docs, jsx-a11y, axe-core, Dependabot, CodeQL, SBOM emission. The "any procurement officer can see we're serious" tier.
- **Phase 1 — Accessibility AA.** Chart data-table fallback, summary statements, keyboard traversal, ARIA live regions, motion / contrast preferences. First VPAT 2.5 ACR.
- **Phase 2 — Security and supply chain.** npm provenance, signed commits, SCA, threat-model artifact, disclosure SLA, data-handling document, trust-center pages.
- **Phase 3 — Audit, RBAC, procurement.** Audit-event hook, permissions contract, public trust-center page, BAA + DPA + subprocessor list + MSA + SLA, PRO 1.0, AI-isolation architecture statement and AI-RMF conformity-assessment template (see [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)).
- **Phase 4 — Sector certifications support, continuous improvement.** VPAT refresh on a regular cadence, periodic AT walkthroughs, SBOM at every release, sonification, RTL, FedRAMP / IL5+ if prioritized.

Talking point: "These overlap deliberately. Phase 0 + Phase 1 are the highest-leverage block of work."

---

## Slide 10 — Decision points

Five decisions leadership needs to make:

1. **Sector priority.** Which of the seven target sectors leads the program? (Healthcare, fintech, government, defense are the largest candidates.)
2. **Embeddable corporate compliance commitment.** Will Embeddable corporate commit to (or confirm) the SOC 2 Type II, ISO 27001, HIPAA BAA, and FedRAMP work the libraries' positioning depends on?
3. **Embeddable corporate AI/model-hosting commitment.** BYO-model only, Embeddable-hosted private model, or both? Will Embeddable publish the no-training warranty and the AI-isolation contract? The AI-bridge pillar in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) depends on this; it should be sequenced alongside the compliance commitment above.
4. **Accessibility headcount.** Internal Accessibility Lead hire, or contracted external accessibility partner (Deque, TPGi, Tenon, Level Access)?
5. **Public positioning timing.** Lead externally with "compliance-ready analytics components + AI-bridge for regulated data" *now* or *after* Phase 1 completes?

Talking point: "These are not engineering decisions. They are leadership decisions that gate the engineering work. The AI commitment in decision 3 is new in this round — it shapes whether Track D ('AI-built, never AI-exposed') is a credible message we can lead with or a follow-up we have to defer."

---

## Slide 11 — The principal risks

Top five risks from the combined registers:

| Risk | Mitigation |
|---|---|
| Overclaim destroys credibility | Strict language discipline; Compliance reviews every public claim |
| Embeddable corporate timeline slips | Sequence trust-center launch around the corporate timeline; use "available on request" for not-yet-public artifacts |
| Accessibility headcount not approved | Cultivate consultancy relationships (Deque, TPGi) early; begin Phase 0 work that doesn't gate on the lead |
| Competitor publishes similar position | Lead with evidence (VPAT, SBOM, dated trust center), not marketing |
| Chart.js canvas becomes long-term ceiling | Document the limit; use DOM-overlay focus; reassess SVG renderer post-Phase 3 |

Talking point: "These are manageable. Overclaim is the one that destroys the deal-stack permanently if we get it wrong, so it is the one to govern most carefully."

---

## Slide 12 — What success looks like at Phase 3 completion

Concrete:

- Public trust-center page live with VPAT, SBOM, SOC 2 (corporate inheritance), subprocessor list, BAA template, DPA template, status page, **AI-isolation contract**, and **AI-RMF conformity-assessment template** (see [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)).
- Both libraries shipping with `SECURITY.md`, `ACCESSIBILITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`.
- Every chart accessible to screen-reader and keyboard users.
- WCAG 2.2 AA VPAT 2.5 ACR published and maintained on a regular cadence.
- SBOM emitted at every release; releases signed with npm provenance.
- PRO at 1.0 with stated SemVer and deprecation policy.
- AI-bridge messaging (Track D) live, with the AI-isolation contract as the single procurement artifact.
- Sales motion with named regulated-industry references and a standard objection-handling kit for procurement-heavy deals.
- Accessibility, security, and AI-governance questionnaires answerable as routine work, not bespoke effort.

Talking point: "This is the state that opens regulated-industry deals on both pillars."

---

## Slide 13 — What success looks like at maturity

Stretch goals:

- Sonification module (chart-a11y leadership tier).
- RTL language support if Arabic / Hebrew markets prioritized.
- Embeddable platform FedRAMP authorization, with the libraries listed in the package.
- IL5+ deployment path for defense and intelligence customers.
- Published reference deployments for BYO-model with private LLM hosting (Cohere on-prem, Mistral on-prem, watsonx) — see [16 §11–§12](./16-ai-bridge-positioning.md).
- Industry-recognized leadership position on accessible analytics components and on AI-isolation for regulated data.

Talking point: "We are not catching up to Sigma or ThoughtSpot on compliance — we are setting the bar they have to catch up to on chart accessibility *and* on AI-isolation."

---

## Slide 14 — The ask

Whatever the meeting's purpose, the ask is one of:

**For leadership review:**
- Approve Phase 0 + Phase 1 budget and headcount.
- Confirm the five decisions on Slide 10.
- Set a mid-program checkpoint review.

**For a sales / partner pitch:**
- Adopt Remarkable for the analytics layer of your product.
- Joint-pilot with one regulated-industry customer.
- Set a procurement-screen review with our trust-center materials and the AI-isolation contract.

**For an investor conversation:**
- The opportunity is two defensible categories — compliance-ready components and the AI-bridge for regulated data — in a market with hard deadlines and institutional buyers.
- The work is bounded (identified gaps, all addressable) and the position is durable (procurement-defended on both pillars).
- Ask: continued investment in the engineering and trust-center program.

---

## Slide 15 — Q&A / appendix

Point to this documentation set:

- [01 — Executive Overview](./01-executive-overview.md)
- [03 — Detailed Market Research](./03-detailed-market-research.md) — the citations
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) — the buyer personas
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md) — the matrix
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) — the WCAG SC map
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md) — the threat model
- [11 — Technical Roadmap](./11-technical-roadmap.md) — the phased plan
- [15 — Final Summary](./15-final-summary.md) — the headlines

---

## Notes for the presenter

A few patterns to apply:

- **Lead with the deadlines (Slide 3).** They create urgency. Don't bury them in the appendix.
- **Use the two-by-two on Slide 4 as the single most-important visual.** It does the positioning work in five seconds.
- **Avoid the word "compliant" without a qualifier.** Always say "compliance-ready," "WCAG 2.2 AA target," or "passes the procurement screen."
- **Acknowledge the gaps explicitly (Slide 7).** Credibility comes from the gaps you name, not from the strengths you list.
- **Bring the artifacts to the meeting if they exist.** A printed VPAT, a printed SBOM, a screenshot of the trust-center page — physical artifacts move conversations forward more than slide claims.

---

## Key takeaways

- The narrative arcs: problem (procurement institutionalization + AI / data-exposure collision) → two parallel opportunities (top-right quadrants on both 2×2s) → repo state → gaps → phased roadmap → decisions → asks.
- Slide 3 (deadlines) and Slide 4 (the two-by-two) carry most of the weight.
- The five decisions on Slide 10 are leadership decisions, not engineering decisions — they should be the focus of the discussion. Decision 3 (AI/model-hosting policy) is the one added in this round.
- The ask is calibrated to the audience.

## Open questions

- Should this be one deck (full leadership review) or two (one for leadership, one for sales)?
- Are there existing customer logos or quotes that can be incorporated, or is the deck launching against a clean slate?

## Recommended next steps

1. Build the slide deck from this narrative.
2. Walk it through with the leadership team before any external use.
3. Build a 6-slide sales-conversation cut-down from the same narrative.

## Related documents

- [00 — The Two Pillars](./00-the-two-pillars.md) — plain-English overview of both pillars
- [01 — Executive Overview](./01-executive-overview.md)
- [02 — Market Research Summary](./02-market-research-summary.md)
- [03 — Detailed Market Research](./03-detailed-market-research.md)
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [15 — Final Summary](./15-final-summary.md)
- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) — full treatment of Pillar 2
