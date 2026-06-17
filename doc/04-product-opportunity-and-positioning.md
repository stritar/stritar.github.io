# 04 — Product Opportunity and Positioning

**Purpose:** Translate the market evidence in [03 — Detailed Market Research](./03-detailed-market-research.md) and the repository state in [05 — Repository Overview](./05-repository-overview.md) into concrete positioning options for the Remarkable suite. Names buyer personas, the stakeholder map, messaging directions, packaging options, the MIT vs commercial-support trade-off, and the principal risks.

**Audience:** Product leadership, marketing, sales, partnerships, the executive team. Anyone shaping how Remarkable is described externally.

**Related documents:** [03 — Detailed Market Research](./03-detailed-market-research.md) · [05 — Repository Overview](./05-repository-overview.md) · [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md)

---

## 1. The position to claim

The Remarkable suite has the technical foundation to credibly claim a specific position with **two parallel pillars**:

1. **"The embedded analytics component suite that survives a regulated-industry procurement screen."** This is the compliance-ready pillar developed in this document.
2. **"The embedded analytics component suite that lets AI help build the dashboard without ever touching the data."** This is the AI-bridge pillar developed in full in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md). It runs alongside, sells to the same buyer, and rests on the same architectural property: data fetching delegated to the host, no outbound network from the libraries, no telemetry, no third-party SDKs.

Both pillars are supported by the same five sub-pillars, the first three of which the suite already has in skeleton form and the last two of which are the work sequenced in [11 — Technical Roadmap](./11-technical-roadmap.md):

1. **A small, principled security surface.** No direct network, no hidden telemetry, no third-party analytics, no cryptographic key handling. Buyers reviewing the libraries find a manageable security surface.
2. **A mature design-token system.** The three-layer (core / semantic / component) 666-token architecture in `remarkable-ui` is the engineering substrate that allows accessibility, themeability, brand control, and constrained AI output to coexist. AI-generated dashboards compose only from approved tokens, not from free-form pixels.
3. **A clean integration model with the Embeddable platform.** Data fetching, authentication, and tenancy flow through the host runtime; components are pure render plus interaction. This is exactly the architecture regulated-industry buyers prefer because it puts the security boundary — including the AI-isolation boundary — where they expect it.
4. **A planned, evidence-backed accessibility and compliance program.** The work to take both libraries to WCAG 2.2 AA, to publish a VPAT, to ship SBOM, to provide audit-event hooks — all sequenced in [11 — Technical Roadmap](./11-technical-roadmap.md).
5. **Architectural alignment for AI assistance without AI exposure.** The libraries' restraint (no outbound network, host-owned data, audit hooks) becomes the **AI-isolation contract** regulated buyers ask for. The model sees user intent, schema, and design-token vocabulary. The model does not see rows, identifiers, regulated-data classifications, or credentials. Full architecture in [16 — AI-Bridge Positioning §3](./16-ai-bridge-positioning.md) and the data-flow walkthrough in [16 §10](./16-ai-bridge-positioning.md).

This is not "we will be compliant tomorrow" and it is not "we have private AI." It is "we have built the foundation, we know the gaps, and we are doing the work in public" — applied to both pillars. That positioning withstands scrutiny in a way blanket compliance or "private AI" claims do not.

---

## 2. Suggested product category

We recommend introducing a new category framing rather than fighting for share in "embedded BI" as a generic.

| Old framing | New framing |
|---|---|
| "Embedded BI platform" | **"Compliance-ready analytics components"** |
| "BI for SaaS" | "Production-grade analytics components for regulated and high-trust software" |
| "Customer-facing analytics" | "Analytics components for products with disabled users, audited workflows, and procurement reviews" |

The new framing accomplishes three things:

1. **It moves us off the price/feature treadmill** with Sigma, ThoughtSpot, Power BI, and the rest of the embedded-BI pack. We don't beat them on breadth; we beat them on the screen.
2. **It is a category they cannot easily counter-position into** in the short term because their accessibility positions are unevenly developed and their corporate compliance, while strong, is not the differentiator they currently lead with.
3. **It maps directly to the way buyers describe their need** — "we need analytics, but it has to pass our procurement / accessibility / audit screen."

---

## 3. Buyer personas

Six buyer personas matter most. Each cares about a different combination of evidence.

### 3.1 The CISO / VP of Security at a regulated SaaS company

**Job-to-be-done:** "Don't let me ship something that fails our next SOC 2 audit, leaks PHI, or makes me the subject of a board meeting."

**What they look at first:** `SECURITY.md`, SBOM, vulnerability disclosure SLA, pentest summary, vendor security questionnaire.

**What we say to them:** "These components don't make outbound network calls, hold credentials, or embed third-party telemetry. Here is the SBOM. Here is the disclosure policy. Here is the threat model."

### 3.2 The CMIO / Chief Privacy Officer at a healthcare or life-sciences company

**Job-to-be-done:** "Make sure clinical or research analytics don't put PHI at risk; make sure clinicians with disabilities can use the tools."

**What they look at first:** HIPAA BAA, data-handling document, accessibility statement, audit-log schema.

**What we say to them:** "The libraries persist no PHI in the browser beyond the React render. Here's the BAA. Here's the audit-event schema so your SIEM gets the data it needs. The charts have data-table alternatives for clinicians using assistive technology."

### 3.3 The Accessibility Officer (or Diversity & Inclusion lead with accessibility in scope)

**Job-to-be-done:** "Make sure we don't ship something a disabled user files an ADA complaint about."

**What they look at first:** VPAT 2.5 / ACR, public accessibility statement, AT walkthrough record, known-issues list.

**What we say to them:** "Current VPAT here. WCAG 2.2 Level AA target. Quarterly AT walkthroughs. Known issues with target fix dates. The chart data-table fallback means every chart is reachable by screen-reader users."

### 3.4 The Public-Sector Program Manager

**Job-to-be-done:** "Comply with Section 508, EN 301 549, ADA Title II deadlines, and the agency's procurement screen."

**What they look at first:** VPAT, Section 508 conformance, FedRAMP authorization (if it applies), supply-chain evidence (SBOM, signed releases).

**What we say to them:** "VPAT cites WCAG 2.2 AA — exceeds Section 508's WCAG 2.0 floor. SBOM emitted at every release. Signed releases via npm provenance. We inherit FedRAMP authorization from the Embeddable platform deployment (requires validation of Embeddable's authorization status)."

### 3.5 The Head of Platform / Engineering Director at a fintech

**Job-to-be-done:** "Pass DORA, NYDFS, PCI scope tests; build customer-facing analytics on a foundation that won't surprise me at the next regulator review."

**What they look at first:** SOC 2 Type II, DORA-aligned operational resilience evidence, audit-log hooks, deployment-model options.

**What we say to them:** "The libraries delegate auth to your platform and emit audit events to your SIEM. Encryption posture is yours to control. Here's the DORA-aligned operational resilience statement. Here are the deployment-model options including sovereign EU clouds."

### 3.6 The Defense-Industry Software Lead

**Job-to-be-done:** "Build an analytics interface for a system handling CUI in an environment with strict supply-chain and air-gap requirements."

**What they look at first:** SBOM, signed releases, air-gap deployment statement, CMMC-aligned evidence.

**What we say to them:** "No outbound network. Bundled fonts and icons. Build artifacts cacheable in your private npm registry. CycloneDX + SPDX SBOM at every release. Signed releases with npm publish provenance."

### 3.7 The Head of AI Governance / Responsible AI Lead

**Job-to-be-done:** "Make sure every AI capability we adopt maps cleanly to our AI inventory, our NIST AI RMF profile, our EU AI Act conformity assessment, and the AI policy our board signed off on."

**What they look at first:** AI-isolation contract (model-exposure statement), data-flow diagram, no-training warranty, AI-event audit schema, the vendor's published AI governance position.

**What we say to them:** "Here is the AI-isolation contract. The model receives intent, schema, and the design-token vocabulary. The model does not receive rows, identifiers, PHI, PII, or credentials. Every AI-assisted action emits an audit event to your SIEM via `onAuditEvent`. Here is a conformity-assessment template you can drop into your AI-RMF profile." Full treatment in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md).

### 3.8 The Chief Data Officer / Head of Data Platform

**Job-to-be-done:** "Don't let analytics tooling extract our data into a third-party model. The warehouse is the perimeter — it stays that way."

**What they look at first:** host-owned data architecture statement, BYO-model and no-model deployment options, query-execution-stays-in-tenant guarantees.

**What we say to them:** "Data fetching is delegated to your platform. The libraries do not call out. Your warehouse is the perimeter — it stays that way. If you want an LLM in the loop, you bring your own — Azure OpenAI in your tenant, Cohere on-prem, Mistral on-prem, watsonx — and we consume it via a documented interface."

---

## 4. Stakeholder mapping

A consolidated view of who matters in a regulated-industry deal and what they ask for. This is the same data as Section 3 in [03 — Detailed Market Research](./03-detailed-market-research.md), expressed as a deal map.

| Stage | Who | Primary question | Artifact that closes the question |
|---|---|---|---|
| Initial screen | Procurement / vendor risk | "Are you a viable candidate?" | Trust-center page (single URL) |
| Security review | CISO / security team | "Will you fail my audit?" | SOC 2 Type II, SBOM, `SECURITY.md`, threat model |
| Privacy review | Privacy / CMIO | "Will you leak my regulated data?" | DPA, BAA, data-handling document |
| Accessibility review | Accessibility officer | "Will my disabled users complain?" | VPAT 2.5 / ACR, accessibility statement |
| Legal review | Legal counsel | "Will the contract protect us?" | MSA, SLA, indemnification, subprocessor list |
| Technical evaluation | Engineering / platform | "Can my team integrate this?" | Documentation, API stability commitment, support SLA |
| Commercial | Sales / vendor manager | "What does it cost?" | Pricing and packaging |

Every artifact in the right-hand column corresponds to a deliverable in [11 — Technical Roadmap](./11-technical-roadmap.md). The roadmap *is* the deal-enablement plan.

---

## 5. Differentiation versus competitors

Pulling from the matrix in [03 — Detailed Market Research](./03-detailed-market-research.md), Remarkable's differentiation lives in a small set of intersection points:

| Differentiator | Versus embedded BI vendors (Sigma, ThoughtSpot, Power BI Embedded, Tableau, Looker) | Versus chart libraries (Highcharts, IBM Carbon, Visa Chart) |
|---|---|---|
| Pre-configured drop-in components for analytics use cases | They have this | They don't (libraries are kit-of-parts) |
| Hosted-platform corporate compliance inheritance (SOC 2, ISO 27001, HIPAA BAA) | They have this | They don't (libraries can't carry organizational attestations) |
| Serious chart-level accessibility (data table + summary + keyboard + ARIA live) | They lag here | Highcharts leads; Carbon and Visa solid |
| Air-gap / sovereign-cloud explicit support | Mixed; depends on host | They generally don't speak to deployment models |
| MIT license on the library tier with commercial support on the platform tier | Some are commercial-only | The library tier alone doesn't give you the platform |
| Design-system depth (666 tokens, three-layer architecture) | Mixed | Strong in IBM Carbon; mixed elsewhere |

The unique intersection — pre-configured components + hosted-platform compliance inheritance + chart-level accessibility + air-gap support — is the defensible position.

---

## 6. Messaging directions

Three messaging tracks to test:

### Track A — "The analytics layer that doesn't slow your audit"

*Lead message:* "Build customer-facing analytics on components that pass your next SOC 2 / HIPAA / FedRAMP / accessibility review."

*Strongest with:* CISO and procurement personas.

*Risk:* commodity territory; many vendors gesture at compliance.

### Track B — "Accessibility-first analytics components"

*Lead message:* "WCAG 2.2 AA analytics components — including the charts. Built for products people with disabilities will actually use."

*Strongest with:* Accessibility officers, public-sector buyers, healthcare.

*Risk:* requires the Phase 1 work to be substantively complete before launch; overclaim risk is high.

### Track C — "Embedded analytics for regulated industries"

*Lead message:* "The analytics components your fintech, healthcare, government, or defense product was missing."

*Strongest with:* category-level positioning; targets entire sector verticals.

*Risk:* requires investment in vertical content and case studies.

### Track D — "AI-built, never AI-exposed"

*Lead message:* "Use AI to build the dashboard. Keep AI away from the data. Embeddable is the bridge."

*Strongest with:* CISO, Head of AI Governance (persona 3.7), Chief Data Officer (persona 3.8), regulated-sector buyers under EU AI Act, OMB M-24-10, BaFin AI/ICT guidance, FCA, or DoD CDAO scrutiny.

*Risk:* "AI-washing" accusation. Mitigated by the architectural evidence (no outbound network, host-owned data, audit hooks) and by strict language discipline (never "private AI" or "AI-safe" without an architectural qualifier — see the discipline section at the end of [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)).

Our recommendation: lead with **Track C** at the category level, support with **Track A** for security-focused buyers, **Track B** for accessibility-focused buyers, and **Track D** for AI-governance and data-platform buyers. The four can run as sub-pages and content tracks under the Track C umbrella. Track D's call-to-action is the *AI-isolation contract* — a single page on the trust center that a Head of AI Governance can drop directly into their AI inventory.

---

## 7. Packaging options

Three packaging directions to evaluate, not mutually exclusive.

### Option 1 — Stay MIT, monetize via the Embeddable platform contract (current)

The libraries remain free and openly accessible. Revenue comes from the Embeddable platform.

- **Strength:** lowest friction adoption; strongest open-source positioning; broad funnel.
- **Weakness:** procurement teams in regulated sectors are often uncomfortable adopting MIT-licensed software without a paired commercial-support contract. The Embeddable platform contract covers this, but the message has to be explicit.

### Option 2 — MIT primitives + commercial enterprise edition

Keep `remarkable-ui` MIT. Wrap `remarkable-pro` with an Enterprise tier that bundles SLAs, hotfixes, and named-contact support, even for customers who self-host or use the libraries without the full Embeddable platform.

- **Strength:** captures customers who want the libraries but not the full platform.
- **Weakness:** complicates the product story; risks confusing "Remarkable PRO" (the npm package) with "Remarkable PRO Enterprise" (the support package).

### Option 3 — Dual-license model

`remarkable-ui` remains MIT. `remarkable-pro` becomes dual-licensed: MIT for non-commercial / small commercial, commercial license for enterprise use.

- **Strength:** explicit revenue capture on the PRO library itself.
- **Weakness:** disrupts current customers; may reduce funnel; complicates messaging.

Our recommendation: **Option 1** as the foundation — the Embeddable platform contract is the right commercial vehicle, and the libraries' openness is a strength. Re-evaluate as the customer base expands.

### Option 4 — Enterprise + AI Governance tier (overlay on Option 1)

A potential premium tier above the existing platform contract, offered to regulated buyers under EU AI Act, OMB M-24-10, BaFin, FCA, or DoD CDAO scrutiny. Bundles the AI-bridge pillar's procurement artifacts: published AI-isolation contract, AI-RMF conformity-assessment template, model-isolation architecture documentation, dedicated AI-audit support, and named AI-governance SLA.

- **Strength:** captures the procurement uplift the AI-bridge pillar opens. Sized as an uplift on the 30–80% ACV uplift already typical of regulated-industry deals.
- **Weakness:** requires the corporate AI/model-hosting policy to be validated and documented first; without it, the tier sells against an unwritten contract.

Whether to introduce this tier is a leadership decision, not an engineering one. See [16 — AI-Bridge Positioning §13](./16-ai-bridge-positioning.md) for the GTM logic.

---

## 8. The MIT-vs-commercial-support trade-off

A specific concern raised by procurement teams: **"We don't adopt MIT-licensed software without a commercial-support contract."**

The answer is straightforward but needs to be in the sales motion explicitly:

> The Remarkable libraries are MIT-licensed because the open license accelerates adoption and lets the community contribute. Commercial support — SLAs, hotfixes, named-contact escalation — is provided through the Embeddable platform contract, which covers everything from data fetching to the components themselves. Customers running the libraries in production receive the same SLA whether they use one component or a hundred.

That paragraph should appear in the trust-center page, the MSA, and the standard sales deck.

---

## 9. Pricing hypothesis (notional)

We do not propose specific prices in this document — they require Embeddable's internal pricing data. What we can say:

- The current Embeddable platform price structure absorbs the components. No separate component pricing is needed.
- A possible "Enterprise" addition for regulated-industry customers (named SLA, hotfix, accelerated support response, dedicated TAM) is consistent with how SOC-2-ready SaaS vendors price the regulated-industry tier.
- Regulated-industry deals typically carry an ACV uplift of 30–80% over commercial deals — both because of the higher cost-to-serve and because of buyer ability to pay.

---

## 10. Risk register (positioning lens)

A compact register focused on positioning and go-to-market risks. The full engineering risk register is in [11 — Technical Roadmap, Section 7](./11-technical-roadmap.md#7-risk-register).

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| P1 | Overclaim destroys credibility | M | High | Strict language discipline (see [13 — Glossary](./13-glossary.md) and [08 — Section A](./08-detailed-compliance-gap-analysis.md)). Every public compliance claim reviewed by Compliance. |
| P2 | Embeddable corporate timeline slips behind roadmap | M | High | Sequence trust-center launch and procurement-artifact publication around the corporate timeline. Use "available on request" language for any artifact not yet public. |
| P3 | Competitor launches similar position | L–M | Medium | Lead with evidence (VPAT, SBOM, dated trust center). Competitors leading with marketing claims can be challenged on evidence. |
| P4 | Sales team unprepared for procurement-heavy deals | M | Medium | Sales enablement on the artifact pack. Standard objection-handling guide for procurement questions. |
| P5 | Existing customers feel disrupted by PRO 1.0 breaking changes | M | Medium | Communicate API stability commitment early. Bundle breaking changes into one major release with a migration guide. |
| P6 | Accessibility consultancy / Accessibility Lead unavailable | M | High | Cultivate relationships with multiple vendors (Deque, TPGi, Tenon, Level Access) early. |
| P7 | MIT license blocks adoption in some procurement contexts | L | Medium | Pair MIT with explicit commercial-support contract messaging (Section 8). |
| P8 | Marketing investment outpaces engineering delivery | M | Medium | Stage messaging launches behind the engineering milestones in [11 — Technical Roadmap](./11-technical-roadmap.md). Track A messaging in Phase 2, Track B in Phase 1 completion, Track C in Phase 3. |

---

## 11. Assumptions to validate

This positioning rests on assumptions that need confirmation before commercial commitment:

- Embeddable corporate is pursuing or holds SOC 2 Type II and/or ISO 27001 (*requires validation*).
- Embeddable corporate offers or plans to offer a BAA capability for HIPAA-covered customers (*requires validation*).
- Embeddable corporate has a stated AI/model-hosting policy (BYO-model interface, no training on customer data, regional model deployment) — *requires validation*. The AI-bridge pillar in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) depends on this.
- Embeddable's existing customer base has a meaningful share in the target sectors, or is willing to be (*requires validation*).
- There is internal alignment on the investment scope for the compliance-readiness program (*requires validation*).
- Marketing and sales leadership endorse the two-pillar (compliance-ready + AI-bridge) category framing (*requires validation*).

The first action implied by this document is *validating these assumptions* before launching any external messaging.

---

## Key takeaways

- The defensible position has **two pillars**: "compliance-ready analytics components" (developed here) and "AI-built, never AI-exposed" (developed in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)). They sell to the same buyer, use the same artifact pack, and rest on the same architectural property.
- Eight buyer personas matter (six in §3.1–§3.6, two added in §3.7–§3.8); each looks at a different document first; the engineering roadmap produces the documents in the right order.
- Recommended messaging: lead with Track C (sector-level "embedded analytics for regulated industries"), supported by Track A (security buyers), Track B (accessibility buyers), and Track D (AI-governance and data-platform buyers).
- Recommended packaging: stay MIT on the libraries; sell support through the Embeddable platform contract; evaluate an Enterprise + AI Governance tier overlay once the corporate AI/model-hosting policy is validated. Make the commercial-support story explicit in trust-center copy.
- The biggest go-to-market risk is overclaim — on the compliance side ("is compliant") and on the AI side ("is private AI"). The same discipline applies to both: "compliance-ready," not "compliant"; "AI-isolated by architecture," not "AI-safe."

## Open questions

- Which target sector should be the lead?
- What is Embeddable corporate's compliance posture today?
- What is Embeddable corporate's AI/model-hosting policy?
- What is the headcount commitment to the program?
- Should we author one VPAT covering both libraries or two?

## Recommended next steps

1. Validate the assumptions in Section 11 with leadership and Compliance.
2. Decide the lead sector for initial go-to-market.
3. Approve Phase 0 of [11 — Technical Roadmap](./11-technical-roadmap.md) so the foundational artifacts begin to land.
4. Use [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) for the leadership conversation.

## Related documents

- [00 — The Two Pillars](./00-the-two-pillars.md) — plain-English overview of both pillars
- [03 — Detailed Market Research](./03-detailed-market-research.md)
- [05 — Repository Overview](./05-repository-overview.md)
- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md)
- [13 — Glossary](./13-glossary.md)
- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) — full treatment of the AI-bridge pillar
