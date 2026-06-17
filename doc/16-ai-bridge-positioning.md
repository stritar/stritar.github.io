# 16 — AI-Bridge Positioning

**Purpose:** Develop the second positioning pillar — **"AI-built, never AI-exposed"** — that runs alongside the "compliance-ready analytics components" category already established in [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md). Set out the market evidence, the architectural reason Embeddable can credibly occupy this position, the new buyer personas, the messaging track, and the implications for the existing roadmap and risk register.

**Audience:** Product leadership, marketing, sales, partnerships, the executive team. Anyone who needs to understand how the AI-bridge pillar relates to the existing compliance-ready position and how the two are presented as one coherent go-to-market.

**Related documents:** [00 — The Two Pillars](./00-the-two-pillars.md) · [01 — Executive Overview](./01-executive-overview.md) · [03 — Detailed Market Research](./03-detailed-market-research.md) · [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) · [15 — Final Summary](./15-final-summary.md)

---

## 1. The thesis in one paragraph

Anyone with an AI subscription can now build a dashboard in minutes — ThoughtSpot Spotter, Tableau Einstein, Sigma + Anthropic MCP, Power BI Copilot, Looker + Gemini, Qlik Answers, Hex Magic all shipped through 2024 and 2025. But the institutions Embeddable's buyer base actually sells into — big enterprises, government agencies, healthcare systems, intelligence and defense — cannot expose their data environments to an external model. The libraries Embeddable already publishes have an architectural property the rest of the embedded-BI market does not: data fetching, authentication and tenancy are delegated to the host runtime; the libraries themselves carry no outbound network calls, no telemetry, no third-party SDKs, no credential handling, no cryptography (see [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)). That restraint, paired with the 666-token design system and a no-code builder, is the **bridge**: AI assists the *builder* without ever touching the *runtime data*, the result looks native inside the host product, and a non-technical user can author a dashboard without any of it leaving the host's tenancy boundary.

The compliance-ready category in [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) remains the lead. This document adds the second pillar that sells to the same room, with the same evidence-led discipline, and answers a question the existing pillar does not: *"How do we get the AI productivity our board is asking for without the data exposure our CISO will not approve?"*

---

## 2. The two trends colliding

### 2.1 Trend A — AI-built analytics is now table stakes

Every major embedded-BI vendor shipped an AI builder between Q3 2024 and Q4 2025:

| Vendor | AI capability | Shipped |
|---|---|---|
| ThoughtSpot | Spotter (replaces Sage) — generative AI agent for conversational BI[^1] | Nov 2024 GA |
| Tableau (Salesforce) | Tableau Einstein — agentic AI redesign of the platform[^2] | Sep 2024 |
| Sigma Computing | Sigma + Anthropic MCP (Model Context Protocol) extensibility[^3] | Nov 2024 |
| Microsoft Power BI | Copilot in Power BI — "ask any question" via Azure OpenAI[^4] | Late 2024 GA |
| Google Looker | Looker + Gemini conversational analytics[^5] | 2024 |
| Qlik | Qlik Answers — conversational AI for analytics[^6] | 2024 |
| GoodData | Agentic AI ecosystem for embedded analytics[^7] | 2024–2025 |
| Hex | Hex Magic — natural-language → SQL → chart → narrative[^8] | 2024 |

Forrester now describes generative-AI integration as a baseline capability of every BI platform: "AI is now a core capability of BI platforms" (Q2 2025)[^9]. Gartner's 2025 hype cycle places AI-ready data and AI agents at the peak[^10], and by 2028 Gartner projects more than 95% of enterprises will use GenAI APIs/models or deploy GenAI-enabled apps in production[^11].

The implication: **no embedded-analytics vendor can credibly enter a 2026 conversation without an AI story.** The question is no longer whether to ship AI features. It is what those features will be allowed to do.

### 2.2 Trend B — Regulated buyers cannot expose their data environments to AI

In the same window, regulators across the US, EU, UK, and supranational bodies converged on a tight set of constraints on AI access to sensitive data:

- **EU AI Act (Regulation 2024/1689)[^12]** — entered into force 1 August 2024; full applicability 2 August 2026. Annex III enumerates eight high-risk domains (biometrics, critical infrastructure, education, employment, access to essential services and benefits, law enforcement, migration and border control, administration of justice and democracy). Penalties for high-risk obligation violations: up to €15M or 3% of global annual turnover.
- **OMB M-24-10 (US, 28 March 2024)[^13]** — requires federal agencies (except DoD and the Intelligence Community) to inventory AI use cases at least annually, submit to OMB, publish publicly, and apply strict risk assessments for "safety- or rights-impacting AI." Compliance plans were due 180 days after issuance and updated every two years through 2036.
- **NIST AI RMF + NIST AI 600-1 Generative AI Profile[^14]** — voluntary framework for trustworthy AI; the GenAI Profile (July 2024) enumerates 12 GenAI-specific risk categories and a tiered governance model in which "high-risk systems in regulated environments should target Tier 3 or Tier 4."
- **BaFin AI/ICT guidance (Germany, 18 December 2025)[^15]** — the German financial regulator's guidance on managing ICT risks when using AI; applies to Capital Requirements Regulation entities and Solvency II insurers; emphasises third-party ICT risk, contractual safeguards, audit and access rights, incident reporting, exit strategies, and portability of models and data.
- **FCA AI Lab (UK, October 2024 onward)[^16]** — dedicated UK financial-services AI supervisory initiative; AI Live Testing pilot launched September 2025. The April 2024 FCA AI Update sets out how existing rules apply to AI use in financial services.
- **DoD CDAO AI Strategy (January 2026)[^17]** and the **DoD AI Cybersecurity Risk Management Tailoring Guide[^18]** — "AI solutions outside DoD control NOT authorized for non-public information; security/privacy safeguards required; continuous monitoring mandatory." Federated data catalogs expose system interfaces across all classification levels; third-party AI models are restricted.
- **NHS / BMA AI data-sovereignty position (May 2025)[^19]** — NHS England restricted source-code access to strengthen AI security; the British Medical Association noted that under the US CLOUD Act, US companies can be required to provide UK data to US authorities even if stored in UK or Europe; trust in technology companies for patient data sits at 27%.

The collective signal: **regulators are converging on the principle that sensitive data should not be exposed to AI models the customer does not control.** This is not a passing concern — it is becoming the procurement-defining position for the buyer base Embeddable targets.

### 2.3 Where the two trends collide

Every regulated buyer Embeddable wants to sell into is being told to ship AI features *and* not expose their data environment to AI. **No vendor currently squares that circle at the embedded-analytics layer.** The BI vendors lead with AI capability; the confidential-compute infrastructure vendors (Azure Confidential VMs, AWS Nitro Enclaves, GCP Confidential Space) lead with isolation; nobody packages both as an analytics product.

That gap is the second pillar.

---

## 3. Why Embeddable can occupy this bridge — the architecture is already there

The most important fact about the Remarkable libraries, for this positioning, is what they *do not* do. Documented in [06 — Repository Technical Analysis](./06-repository-technical-analysis.md):

- **No outbound network calls** in either library. The components do not call home, do not phone telemetry, do not ping a model.
- **No third-party SDKs and no telemetry.** There is no analytics-vendor SDK, no error-reporting SaaS, no embedded tracker.
- **No credential handling, no cookies, no cryptography.** The libraries do not see auth secrets; the host runtime does.
- **Data fetching, authentication, and tenancy delegated to the host runtime.** The components are pure render plus interaction. The security boundary lives in the host, where regulated buyers want it.
- **A 666-token, three-layer design system** (core / semantic / component) in `remarkable-ui`. Every visual output composes from approved tokens, not from free-form pixels.
- **`clientContext` and `onAuditEvent` hooks** planned in Phase 3 of [11 — Technical Roadmap](./11-technical-roadmap.md). These become the AI-isolation enforcement points — every AI-assisted action is auditable; every permission is owned by the host.

Reframe what looked like a minimal feature set in earlier rounds of analysis. **The libraries' restraint is the architectural feature, not a limitation.** A vendor whose libraries make outbound calls or carry SDKs would need to retrofit isolation. Embeddable does not.

What is added to make this an explicit AI-bridge pillar — not what is built fresh:

1. The **AI-isolation contract**: a published architectural statement of what the model sees (intent + schema + design tokens) and what it does not (rows, identifiers, PHI/PII, credentials).
2. **AI-event coverage** in the `onAuditEvent` hook so every AI-assisted action lands in the host's SIEM.
3. **A BYO-model deployment story**: customers wire their own LLM (Azure OpenAI in their tenant, Cohere on-prem, Mistral on-prem, watsonx) into a documented interface; Embeddable does not become a model vendor.

These are surface-area additions, not re-architecture.

---

## 4. The CISO anxiety, quantified

CISO and security surveys through 2024–2025 line up with the regulator signal:

| Survey (2024–2025) | Finding |
|---|---|
| Proofpoint Voice of the CISO 2025[^20] | 81% high concern that sensitive data is leaked into AI training sets; 80% of US CISOs concerned over customer data loss via public GenAI |
| Panorays CISO 2025[^21] | 91% report rising third-party incidents; only 3% have full visibility into 4th/nth-party supply chains; 81% report insufficient funding for third-party risk |
| Kiteworks AI Security Gap 2025[^22] | 83% of organizations lack visibility into third-party AI use; 44% of healthcare organizations lack privacy controls; financial services see doubled third-party breaches yet only 14% prioritize the risk |
| Deloitte AI Enterprise 2025 (Aug–Sep)[^23] | 73% cite data privacy/security as the top AI risk; 77% factor vendor country of origin into AI purchasing |
| BigID 2024 CISO[^24] | 59 federal AI regulations issued in 2024 (double the prior year) |

The collective shape: the people who say "no" to vendor AI features inside regulated buyers are *already at the table* — they have the survey data, they have the regulator language, and they are funded to ask the AI-exposure question explicitly. **The vendor who answers it in writing wins.**

---

## 5. The new competitor view — AI capability × data-isolation posture

The market gap shown on [Slide 4 of doc 12](./12-stakeholder-presentation-narrative.md) ("hosted-platform compliance × chart-level accessibility") has a parallel today on the AI dimension:

```
                       Strong AI builder
                              ↑
              ThoughtSpot     │
              Power BI Copilot│  ← (open quadrant —
              Sigma + MCP     │     the AI-bridge position)
              Tableau Einstein│
              Looker + Gemini │
              Qlik Answers    │
                              │
       ──────────────────────┼──────────────────→ Strong data-isolation posture
                              │                     (host-owned data, audit hooks,
                              │                      air-gap, no model exposure)
                              │
                              │   Confidential-compute infrastructure
                              │   (Azure Confidential VMs, AWS Nitro
                              │    Enclaves, GCP Confidential Space) —
                              │   but not packaged as analytics
```

The shape is the same as the existing compliance-readiness 2×2 — and the empty top-right exists for the same structural reason. **BI vendors lead with capability; infrastructure vendors lead with isolation; no one ships both as a packaged analytics layer.** Embeddable's architectural restraint plus the existing platform contract is the packaging.

The competitor matrix in [03 §4 — Detailed Market Research](./03-detailed-market-research.md) extends naturally with a new column: *AI-isolation posture (data exposed to model? training opt-out? BYO-model?)*. As of audit, most cells in that column read "Not stated" — which is itself the finding.

---

## 6. Buyer personas added by the AI angle

Three personas extend the set in [04 §3 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md).

### 6.1 The Head of AI Governance / Responsible AI Lead

**Job-to-be-done:** "Make sure every AI capability we adopt maps cleanly to our AI inventory, our NIST AI RMF profile, our EU AI Act conformity assessment, and the AI policy our board signed last quarter."

**What they look at first:** model-exposure statement, data-flow diagram, no-training warranty, AI-event audit schema, the vendor's published AI governance position.

**What we say to them:** "Here is the AI-isolation contract. The model receives intent, schema, and the design-token vocabulary. The model does not receive rows, identifiers, PHI, PII, or credentials. Every AI-assisted action emits an audit event to your SIEM via `onAuditEvent`. Here is a conformity-assessment template you can drop into your AI-RMF profile."

### 6.2 The Chief Data Officer / Head of Data Platform

**Job-to-be-done:** "Don't let analytics tooling extract our data into a third-party model. The warehouse is the perimeter — it stays that way."

**What they look at first:** host-owned data architecture statement, BYO-model and no-model deployment options, query-execution-stays-in-tenant guarantees.

**What we say to them:** "Data fetching is delegated to your platform. The libraries do not call out. Your warehouse is the perimeter — it stays that way. If you want an LLM in the loop, you bring your own — Azure OpenAI in your tenant, Cohere on-prem, Mistral on-prem, watsonx — and we consume it via a documented interface."

### 6.3 The non-technical builder (the "lowest common denominator user")

**Job-to-be-done:** "I need to build a dashboard. I am not a developer. The AI tools I would normally pay for personally are blocked by my CISO. I need the no-code option my company already approved."

**What they look at first:** can I build a dashboard by describing it in English? Does it look native inside the product I work in every day? Will my IT department block this tool?

**What we say to them:** "Describe what you want. The AI sees your intent and the schema available in the host. It does not see the data. The dashboard the builder produces uses your company's own design system, so it looks like part of the product. Everything runs inside the tenancy your IT department has already approved."

---

## 7. Messaging — adding Track D

[04 §6 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) describes three messaging tracks: Track A (security-focused: "doesn't slow your audit"), Track B (accessibility-focused), Track C (sector-led umbrella). The AI-bridge pillar adds a fourth.

### Track D — "AI-built, never AI-exposed"

*Lead message:* "Use AI to build the dashboard. Keep AI away from the data. Embeddable is the bridge."

*Strongest with:* CISO, Head of AI Governance, Chief Data Officer, regulated-sector buyers under EU AI Act, OMB M-24-10, BaFin AI/ICT guidance, FCA, DoD CDAO scrutiny.

*Risk:* AI-washing accusation. Mitigated by the architectural evidence in §3 and by the language discipline at the end of this document.

*Recommendation:* run Track D in parallel with Track C (the sector-led umbrella). Test against Track A (security buyers) and Track B (accessibility buyers). Track D's call-to-action is the *AI-isolation contract* — a single page on the trust center that lets a Head of AI Governance drop the URL into their AI inventory.

---

## 8. The no-code builder as a first-class capability of this pillar

The original framing of this pillar named three sub-capabilities — AI-assisted build, no-code for non-technical users, and native-looking output. The first is the AI bridge itself; the second and third are the reason regulated buyers can adopt it.

The non-technical builder is the line-of-business analyst, the operations manager, the clinical lead, the policy researcher — someone who must produce a dashboard without writing code, without standing up a personal AI subscription their CISO will block, and without exporting data to a third-party builder. Today these users are either blocked entirely or forced into shadow IT.

The architectural answer is the same as in §3, applied to the builder UI: the AI assists schema introspection, layout suggestion, chart-type selection, natural-language filter specification, and accessibility-summary authoring. **The model sees the user's intent and the schema. It does not see the rows.** When the spec executes, data fetching goes through the host's authenticated, audit-logged path.

Market context underscoring the size of this gap:

- **41% of employees are now "business technologists"** (Gartner, via Integrate.io 2024)[^25] — non-IT workers building tech and analytics.
- BI adoption is still only ~26% organisation-wide[^26]. The usability ceiling is real.
- 70% of new applications are projected to use low-code or no-code by 2025[^27]; Fortune 500 adoption rises to ~38% by 2026.
- The no-code AI dashboard builders that exist today (Hex Magic, BlazeSQL, Noloco Nola[^28]) make natural-language-to-dashboard claims but **none of them publishes a regulated-buyer isolation position.** Same shape as the wider AI-builder gap, one layer down the stack.

The conclusion: **compliance-grade no-code is the new requirement, and there is no current owner.**

---

## 9. Native-looking components as a first-class capability of this pillar

The third sub-capability — analytics components that look native inside the host product — is not cosmetic. In regulated contexts the host's own design system is itself an artifact under change control (brand guidelines, accessibility commitments, clinical-safety patterns where colour and layout encode meaning). Analytics that visually break from the host product break trust, and in some sectors break compliance posture.

The architectural answer is the 666-token, three-layer design system in `remarkable-ui` (documented in [06 — Repository Technical Analysis](./06-repository-technical-analysis.md) and reinforced as Pillar 2 of the position in [04 §1 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)). **AI-generated outputs are constrained to the host's design language.** The AI cannot emit free-form pixels; it can only compose token-compliant outputs. The host product chooses the tokens; the AI fills them.

The competitive contrast:

- **iframe-based embedded BI** (Sigma, ThoughtSpot Everywhere, Looker, Power BI Embedded) always announces itself visually. There is a frame; there is chrome; the typography rarely matches; the buttons rarely match.
- **Component-based embedding** (Luzmo, Sisense Compose SDK, GoodData web components, Embeddable) can render natively into the host's React tree.
- **AI sharpens the gap.** AI-generated chrome that does not match the host product is a worse outcome than no AI at all — it produces a dashboard that looks foreign in the very product the AI is supposed to make better.

---

## 10. The data-flow walkthrough — the single most persuasive artifact

The architectural contract this pillar is willing to publish, in five steps:

```
1. Non-technical user types into the builder:
   "Show me revenue by region, last 12 months, broken down by product line."

2. The AI assistant (BYO-model or Embeddable-hosted) receives:
   - the user's intent (the prompt)
   - the schema and metadata available in the host's semantic layer
   - the design-token vocabulary available in remarkable-ui
   The AI assistant does NOT receive:
   - row-level data
   - customer identifiers
   - PHI, PII, or any regulated data classification
   - credentials, tokens, or session material

3. The AI produces a dashboard spec:
   - chart types, layout, filters, semantic-layer queries
   - declarative, auditable, version-controllable
   - composed entirely from the host's design tokens

4. The host platform executes the spec inside its own tenancy:
   - data fetched via the host's authenticated, audit-logged data path
   - rendered by remarkable-ui components using the host's tokens
   - an audit event emitted via onAuditEvent for every AI-assisted action
     (filter applied, chart added, drill executed, export taken)

5. The user sees the dashboard. The model never saw the rows.
```

This is the contract Embeddable can publish. It is also the contract every other AI-for-analytics vendor would have to retrofit. The AI-isolation contract belongs on the trust-center page next to the SBOM and the VPAT — it is the procurement artifact for the AI-bridge pillar.

---

## 11. Intelligence-community and classified-environment buyers

The sector treatment in [02 §4 — Market Research Summary](./02-market-research-summary.md) names intelligence and national security alongside defense as a target. The AI lens sharpens the message for these buyers specifically.

ICD 503 environments, IL5+ deployments, and air-gapped enclaves cannot use a cloud-hosted LLM at all. The "AI bridge" story for these buyers is not "Embeddable uses cloud AI safely." It is: **AI assistance happens inside your enclave, with a model you host yourself, and Embeddable's libraries make that model useful for dashboard building.**

The available private-LLM options now match the requirement:

- **Cohere Enterprise** publishes fully air-gapped deployments for data-sovereign architectures[^29].
- **Mistral AI Enterprise** ships open-weight models suited to private deployment.
- **Smaller open models** (Mistral 7B, Llama 3 8B) are now capable enough to handle ~80% of business use cases at a fraction of the compute cost, making in-enclave deployment economically viable.

The regulatory anchor for this segment is the DoD AI Cybersecurity Risk Management Tailoring Guide[^18]: "AI solutions outside DoD control NOT authorized for non-public information." Embeddable's posture maps to this directly — the libraries make no assumption about model location, and the AI-isolation contract holds whether the model lives in Azure OpenAI behind a private endpoint, in a customer's on-prem Cohere deployment, or in a defence enclave running Mistral.

---

## 12. Partnership and integration ecosystem

The AI-bridge pillar opens a set of natural co-sell relationships. None of these is a commitment in this document — they are the structural opportunities leadership should consider when scoping the trust-center launch and the sales motion.

**Confidential-compute infrastructure.** [Azure Confidential VMs](https://azure.microsoft.com/en-us/solutions/confidential-compute) (AMD SEV-SNP, Intel TDX), [AWS Nitro Enclaves](https://aws.amazon.com/ec2/nitro/nitro-enclaves/) (isolated execution environments on EC2 with no persistent storage or external networking), and [GCP Confidential Space](https://cloud.google.com/confidential-computing) (Confidential VMs, Confidential GKE Nodes, Confidential Dataflow). Embeddable positions as the analytics layer that runs inside the tenant's confidential boundary.

**Private LLM hosting.** [Azure OpenAI with private endpoints and PrivateLink](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/configure-private-link?view=foundry-classic), Cohere Enterprise, Mistral AI Enterprise, IBM watsonx. Embeddable is the consuming layer that turns these into dashboard-building assistance without leaking data.

**AI governance platforms.** [IBM watsonx.governance](https://www.ibm.com/new/announcements/ibm-is-a-leader-in-seven-ai-related-gartner-magic-quadrant-reports-in-2025-and-2026), [Alation](https://www.alation.com/gartner-magic-quadrant-data-analytics-governance-2026/), DataRobot. Natural integration partners on the AI-audit and AI-inventory side; Embeddable emits AI events into their catalogues.

**The bar competitors have already set on data residency.** [OpenAI expanded data residency](https://www.computerworld.com/article/4096675/openai-expands-data-residency-for-enterprise-customers.html) for ChatGPT Enterprise, ChatGPT Edu, and the API Platform in 2025; eligible customers keep content at rest in-region. The expectation is now established — Embeddable's published position must meet it or beat it.

---

## 13. GTM and pricing implications

Most pricing detail stays in [04 §9 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md). The AI-bridge pillar adds three considerations.

**A premium "Enterprise + AI Governance" tier.** The AI-isolation contract, AI conformity-assessment template, model-isolation documentation, and dedicated AI-audit support map naturally to a tier above the existing regulated-industry packaging. Sized as an uplift on the 30–80% ACV uplift already noted for regulated-industry deals. Whether to introduce this tier is a leadership decision, not an engineering one.

**Sales motion change.** Lead with a regulated-buyer prospect whose AI-governance team is already engaged. The AI-bridge story shortens the cycle because it answers questions the prospect's own AI policy is forcing them to ask — the AI-RMF profile they have to publish, the EU AI Act conformity assessment they have to complete, the BaFin third-party risk file they have to maintain. The artifact pack closes the conversation.

**Cross-sell into existing customers.** Embeddable platform customers who have not yet adopted AI features become candidates for the AI-bridge upgrade. They get AI without the data-exposure headache, and Embeddable expands inside accounts already on the books.

---

## 14. What this means for the existing roadmap

The [11 — Technical Roadmap](./11-technical-roadmap.md) does not need a new phase. The AI-bridge pillar lands cleanly on top of the work already planned:

- **Phase 0 (Foundations) is unchanged.** Governance docs, accessibility tooling, supply-chain tooling — all required for both pillars.
- **Phase 1 (Accessibility AA) is unchanged.** Chart accessibility is required regardless.
- **Phase 2 (Security and supply chain) is unchanged.** The data-handling and trust-center work serves both pillars.
- **Phase 3 is sharpened.** The `onAuditEvent` hook and `clientContext.permissions` contract — already planned — become the AI-isolation enforcement points. Document them with the AI lens explicitly.
- **Phase 4 adds three AI-specific deliverables:**
  - The **AI data-flow diagram and AI-isolation architecture statement**, published on the trust-center page next to the SBOM and the VPAT.
  - A **customer-facing warranty**: "no customer data is used to train external models." OpenAI's 2025 data residency posture sets the bar competitors must meet.
  - An **AI-RMF / EU-AI-Act conformity-assessment template** buyers can use to map Embeddable into their own AI inventory.

These three Phase 4 items are flagged as follow-ups; the roadmap is not edited in this document round.

A **runtime counterpart** to this build-time bridge — rendering branded analytics *inside the agent interface itself* (A2UI / AG-UI / MCP Apps) — is scanned separately in [17 — Agent-Native Rendering](./17-agent-native-rendering.md). It is exploratory and gated behind Phase 3; the "no new phase" statement above applies to the build-time pillar, and agent-native rendering is the surface that would add one.

---

## 15. Risks (positioning lens)

Extends the register in [04 §10 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md).

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| A1 | "AI-washing" — competitors and analysts treat every "AI bridge" claim as marketing | M | High | Lead with architectural evidence (no outbound network, host-owned data, audit hooks) — same evidence-over-marketing discipline as Pillar 1. Publish the AI-isolation contract; do not lead with adjectives. |
| A2 | Competitor counter-positions (Sigma + Anthropic MCP is closest today) | M | Medium | Sigma's MCP positioning is about *extensibility*, not isolation. Counter by explicitly publishing the AI-isolation contract — a procurement artifact, not a marketing claim. |
| A3 | Buyers ask for an LLM Embeddable doesn't ship | M | Low–Medium | Stay BYO-model. Document the interface clearly. Do not become a model vendor — that's a different business with different margins and a different risk profile. |
| A4 | EU AI Act classifies analytics-with-AI as high-risk under Annex III | L–M | Medium | Track Annex III interpretation closely; if applicable, publish a conformity-assessment template — turning the risk into a sales asset. |
| A5 | Overclaim on "private AI" or "AI-safe" without qualifier | M | High | Apply the language discipline at the foot of this document. Compliance review every public AI claim, same standard as Pillar 1 claims. |
| A6 | The corporate AI/model-hosting policy is not yet documented | M | Medium | Validate alongside the corporate compliance posture validation in [01 §10 — Executive Overview](./01-executive-overview.md). |
| A7 | "BYO-model" is heard by buyers as "you don't ship AI" | M | Medium | Pair the BYO-model interface with a default reference deployment (Azure OpenAI in customer tenant) and a documented private-model option (Cohere, Mistral). The story is "your model, our bridge," not "no model." |

---

## Language discipline (extends [README](./README.md))

Never use, without an architectural qualifier:

- "is AI-safe"
- "is private AI"
- "AI never touches your data"
- "secure AI"
- "compliant AI"

Use instead:

- *AI-isolated by architecture* (point to host-owned data path + audit hooks)
- *AI-built, never AI-exposed*
- *no model sees customer data unless the customer authorizes it*
- *BYO-model deployment supported*
- *AI-isolation contract documented at the host integration boundary*

The Pillar 1 rule applies fully here: overclaim destroys credibility faster than any other failure mode, and "private AI" is the AI-side equivalent of "is HIPAA compliant."

---

## Key takeaways

- AI-built analytics is now table stakes (every major embedded-BI vendor shipped an AI builder in 2024–2025), but regulated buyers cannot expose their data environments to AI (EU AI Act, OMB M-24-10, NIST AI RMF, BaFin, FCA, DoD CDAO, NHS).
- The Remarkable libraries' architectural restraint — no outbound network, host-owned data, no telemetry, no SDKs, audit hooks planned in Phase 3 — is the bridge. AI assists the *builder*; the host owns the *runtime data*.
- The 2×2 of AI capability × data-isolation posture has the same empty top-right quadrant as the compliance-readiness 2×2. The same buyer, the same artifact pack.
- Three sub-capabilities make this pillar real: AI-assisted build, a no-code experience for non-technical users, and native-looking components that compose only from the host's design tokens.
- The AI-isolation contract — a published data-flow statement on the trust-center page — is the single procurement artifact this pillar needs to ship.

## Open questions

- What is the corporate model-hosting policy? BYO-model only, or Embeddable-hosted private model, or both?
- Which sector leads the AI-bridge message externally — fintech (BaFin/FCA), federal (OMB M-24-10), defence/intel (DoD CDAO/ICD 503), or healthcare (NHS, HIPAA + AI overlap)?
- Should the AI-isolation contract launch alongside Phase 0 (early, to anchor the position) or alongside Phase 3 (with full audit-event coverage)?
- Is there appetite for a premium "Enterprise + AI Governance" pricing tier?

## Recommended next steps

1. **Validate Embeddable corporate's AI/model-hosting posture** alongside the compliance-posture validation in [01 §10 — Executive Overview](./01-executive-overview.md).
2. **Pick the lead persona for AI-bridge messaging** — likely Head of AI Governance, with CDO as the second seat. This shapes the artifact pack and the trust-center copy.
3. **Decide BYO-model versus Embeddable-hosted** as the default deployment story. The architecture supports both; the messaging must pick.
4. **Draft the AI-isolation contract** as a one-page artifact (the data-flow walkthrough in §10 is the substance) for Compliance review.
5. **Add the three Phase 4 AI deliverables** to [11 — Technical Roadmap](./11-technical-roadmap.md) once the corporate policy is confirmed.

## Related documents

- [00 — The Two Pillars](./00-the-two-pillars.md) — plain-English entry point above both pillars
- [01 — Executive Overview](./01-executive-overview.md) — leadership summary, both pillars
- [03 — Detailed Market Research](./03-detailed-market-research.md) — competitor matrix and citations
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) — Pillar 1 positioning detail; this doc extends §1, §3, §6
- [11 — Technical Roadmap](./11-technical-roadmap.md) — phased plan; AI-bridge sharpens Phase 3, adds three Phase 4 items
- [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md) — slide-deck flow; this doc adds Slide 3.5 and Slide 4b
- [13 — Glossary](./13-glossary.md) — definitions of EU AI Act, OMB M-24-10, NIST AI RMF, BaFin AI/ICT, BYO-model, AI-isolation contract, and related terms
- [15 — Final Summary](./15-final-summary.md) — single-screen punchline, both pillars
- [17 — Agent-Native Rendering](./17-agent-native-rendering.md) — the runtime counterpart: rendering branded analytics inside the agent surface (A2UI / AG-UI / MCP Apps)

---

## Citations

[^1]: TechTarget, "ThoughtSpot AI agent Spotter enables conversational BI," <https://www.techtarget.com/searchbusinessanalytics/news/366615693/ThoughtSpot-AI-agent-Spotter-enables-conversational-BI>.
[^2]: Salesforce / Tableau Einstein launch coverage, "Six trends that shaped data management analytics in 2024," <https://www.techtarget.com/searchbusinessanalytics/feature/Six-trends-that-shaped-data-management-analytics-in-2024>.
[^3]: Sigma Computing, "Embedded analytics and AI," <https://www.sigmacomputing.com/resources/library/embedded-analytics-and-ai>.
[^4]: Microsoft, "Copilot in Power BI overview," <https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction>; "Copilot in Power BI privacy and security," <https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-power-bi-privacy-security>.
[^5]: Genesys Growth comparison, "Tableau Pulse vs Power BI Copilot vs Looker (Gemini)," <https://genesysgrowth.com/blog/tableau-pulse-vs-power-bi-copilot-vs-looker-looker-studio-(gemini)->.
[^6]: Qlik, "Gartner Magic Quadrant 2024–2025," <https://www.qlik.com/us/gartner-magic-quadrant-business-intelligence>.
[^7]: GoodData positioning summary, via Luzmo, <https://www.luzmo.com/blog/gooddata-reviews>.
[^8]: Taskade, "Best AI dashboard builders," <https://www.taskade.com/blog/best-ai-dashboard-builders>.
[^9]: Forrester, "AI is now a core capability of BI platforms," <https://www.forrester.com/blogs/ai-is-now-a-core-capability-of-bi-platforms/>; "Key takeaways from the Forrester Wave: Business Intelligence Platforms, Q2 2025," <https://www.forrester.com/blogs/key-takeaways-from-the-forrester-wave-business-intelligence-platforms-q2-2025-research/>.
[^10]: Gartner, "Hype Cycle for Artificial Intelligence 2025," <https://www.gartner.com/en/articles/hype-cycle-for-artificial-intelligence>.
[^11]: Gartner, "Hype Cycle for Generative AI," <https://www.gartner.com/en/articles/hype-cycle-for-genai>.
[^12]: European Commission, "Regulatory framework for AI," <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>; Dataiku, "EU AI Act high-risk compliance requirements," <https://www.dataiku.com/stories/blog/eu-ai-act-high-risk-requirements>.
[^13]: White House Office of Management and Budget, "M-24-10 Advancing Governance, Innovation, and Risk Management for Agency Use of Artificial Intelligence" (28 March 2024), <https://www.whitehouse.gov/wp-content/uploads/2024/03/M-24-10-Advancing-Governance-Innovation-and-Risk-Management-for-Agency-Use-of-Artificial-Intelligence.pdf>.
[^14]: NIST, "AI Risk Management Framework," <https://www.nist.gov/itl/ai-risk-management-framework>; NIST AI 600-1, "Generative AI Profile," <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf>.
[^15]: BaFin, "Guidance on managing ICT risks when using AI" (18 December 2025), <https://www.bafin.de/SharedDocs/Veroeffentlichungen/EN/Meldung/2025/meldung_2025_12_18_orientierungshilfe_ikt_risiken_en.html>.
[^16]: FCA, "AI Update" (April 2024), <https://www.fca.org.uk/publication/corporate/ai-update.pdf>; FCA, "Our AI approach," <https://www.fca.org.uk/firms/innovation/ai-approach>.
[^17]: US DoD CDAO, "AI Strategy for the Department of War" (January 2026), <https://media.defense.gov/2026/Jan/12/2003855671/-1/-1/0/ARTIFICIAL-INTELLIGENCE-STRATEGY-FOR-THE-DEPARTMENT-OF-WAR.PDF>.
[^18]: US DoD CIO, "AI Cybersecurity Risk Management Tailoring Guide," <https://dodcio.defense.gov/Portals/0/Documents/Library/AI-CybersecurityRMTailoringGuide.pdf>.
[^19]: British Medical Association, "AI, private platforms and the risk to NHS data sovereignty," <https://www.bma.org.uk/news-and-opinion/ai-private-platforms-and-the-risk-to-nhs-data-sovereignty>; UK Parliament Lords Library, "AI in the NHS," <https://lordslibrary.parliament.uk/ai-in-the-nhs/>.
[^20]: Proofpoint, "2025 Voice of the CISO Report," <https://www.proofpoint.com/us/newsroom/press-releases/proofpoint-2025-voice-ciso-report>.
[^21]: Panorays, "2025 CISO Survey," <https://panorays.com/blog/2025-ciso-survey/>.
[^22]: Kiteworks, "AI Security Gap 2025: Organizations Flying Blind," <https://www.kiteworks.com/cybersecurity-risk-management/ai-security-gap-2025-organizations-flying-blind/>.
[^23]: Deloitte 2025 enterprise AI survey, via Spark Co, "Navigating data residency requirements in enterprise AI," <https://sparkco.ai/blog/navigating-data-residency-requirements-in-enterprise-ai>.
[^24]: BigID, "2024 CISO Report," <https://bigid.com/blog/2024-ciso-report/>.
[^25]: Integrate.io, "No-code transformations usage trends," <https://www.integrate.io/blog/no-code-transformations-usage-trends/>.
[^26]: Same source as [^25].
[^27]: WeWeb, "Dashboard builder guide: no-code AI best practices," <https://www.weweb.io/blog/dashboard-builder-guide-no-code-ai-best-practices>.
[^28]: Noloco, "AI dashboard generator no-code," <https://noloco.io/blog/ai-dashboard-generator-no-code>; BlazeSQL, "AI dashboard builder," <https://www.blazesql.com/ai-dashboard-builder>.
[^29]: Prem AI, "9 Azure OpenAI on-premise alternatives for data-sovereign enterprises 2026," <https://blog.premai.io/9-azure-openai-on-premise-alternatives-for-data-sovereign-enterprises-2026/>.
