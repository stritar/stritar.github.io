# 00 — The Two Pillars

**Purpose:** A plain-English entry point to the whole documentation set. Introduces the two parallel opportunities the rest of the docs develop, in language anyone can follow on first read.

**Audience:** Anyone arriving cold — board members, partners, prospects, new hires, investors. Read this first. It will not take long.

**Related documents:** [README](./README.md) (the document index) · [01 — Executive Overview](./01-executive-overview.md) (Pillar 1 leadership briefing) · [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) (Pillar 2 in detail) · [15 — Final Summary](./15-final-summary.md) (the single-screen punchline)

---

## The world in one paragraph

Companies everywhere want to put charts and dashboards inside their products. Two pressures have changed how those companies buy. Their **procurement teams** now demand compliance evidence as a gate, not a nice-to-have — vendors who can't produce a current accessibility report, a SOC 2 attestation, a software bill of materials and a trust-center page are filtered out before the engineering team gets a vote. Their **boards** want AI in everything — but their **CISOs** will not let AI near their data. Most analytics vendors solve for one of these or the other. Embeddable, paired with the Remarkable libraries, is in a rare position to solve for both.

This documentation set develops the two opportunities that follow — one pillar each — and the joint go-to-market that puts them in the same room with the same buyer.

---

## Pillar 1 — Compliance-ready analytics components

**What it means in plain English.** Big buyers in regulated industries — banks, hospitals, government agencies, defence contractors — cannot adopt analytics that fail their compliance screen. The screen asks for named documents: an accessibility report, a security attestation, a software bill of materials, a data-processing agreement, a business-associate agreement, a public trust-center page. Most embedded-BI vendors have *some* of these. None of them combines the full set with chart-level accessibility and pre-configured drop-in components. That gap is Pillar 1.

**Who this is for.** A CISO, a Chief Medical Information Officer, an accessibility officer, a public-sector program manager, a fintech head of platform, a defence-industry software lead. Different titles, same procurement-led purchase.

**Why now.** Hard enforcement deadlines arriving across 2025–2028: US ADA Title II web rule, European Accessibility Act, EU DORA for financial services, EU AI Act, CMMC for US defence contracts. These are not optional and not far away.

**The plain-English short of the evidence.** *VPAT* is the accessibility report procurement officers ask for by name. *SOC 2* is the security attestation enterprise buyers ask for. *SBOM* is the software bill of materials supply-chain teams ask for. *BAA* is the business-associate agreement HIPAA-covered buyers ask for. *Trust center* is the public web page that holds all of the above. The vendor with the documents wins disproportionately.

**Where to read more.** [01 — Executive Overview](./01-executive-overview.md) for the leadership briefing · [02 — Market Research Summary](./02-market-research-summary.md) for the non-technical market view · [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) for the buyer personas and messaging tracks.

---

## Pillar 2 — AI-built, never AI-exposed

**What it means in plain English.** Anyone with an AI subscription can now build a dashboard in minutes. Every major embedded-BI vendor shipped an AI feature through 2024 and 2025 — ThoughtSpot Spotter, Tableau Einstein, Sigma + Anthropic MCP, Power BI Copilot, Looker + Gemini, Qlik Answers, Hex Magic. But the institutions Embeddable sells into — big enterprises, government, healthcare, intelligence, defence — cannot expose their data environments to an external model. Their regulators are converging on the same rule (EU AI Act, US OMB M-24-10, NIST AI RMF, BaFin AI/ICT guidance, UK FCA, DoD CDAO, NHS data-sovereignty policy). Their CISOs are not approving the tools (Proofpoint 2025: 81% of CISOs worry about data leaked into AI training; Deloitte 2025: 73% of enterprises put data privacy as the top AI risk). Embeddable's libraries were built without outbound network calls, without telemetry, without third-party SDKs, and with data fetching delegated to the host platform. That makes them the bridge: **AI helps with the build, the host owns the data, the two never touch.**

**Who this is for.** A Head of AI Governance, a Chief Data Officer, the line-of-business analyst who is not a developer, the same procurement-led buyers as Pillar 1.

**Why now.** AI in analytics has moved from novelty to table stakes inside a single year. At the same time, regulators have moved from suggestion to enforcement on AI data exposure. The collision is happening *right now* in the very deals Embeddable wants to close.

**The three sub-capabilities that make this pillar real.**

- **AI-assisted build.** A user describes the dashboard. The AI sees the user's intent and the schema of the host's data. The AI does not see the data itself. The result is a dashboard specification — declarative, auditable, owned by the host.
- **No-code for non-technical users.** The non-technical builder (a clinical lead, an operations manager, a policy researcher) gets AI-assisted authoring inside the tool their IT department already approved. No personal AI subscription their CISO will block. No data leaves the host's tenancy.
- **Native-looking components.** The output uses the host product's own design system — typography, colour, spacing — so the dashboard looks like part of the product, not an iframe pasted in from somewhere else. AI cannot emit free-form pixels; it can only compose token-compliant outputs.

**Where to read more.** [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) for the full treatment of this pillar — market evidence, competitor view, buyer personas, messaging, roadmap implications, and the architectural data-flow walkthrough that is the central artifact.

---

## Why both pillars share one buyer

Both pillars sell to the same room. The CISO who asks for the SOC 2 report is the same CISO who asks whether your AI features expose customer data. The procurement officer who screens for a VPAT is the same procurement officer who will soon screen for an AI-RMF profile. The Head of AI Governance is sitting at the table next to the privacy office. One artifact pack, one trust-center page, one sales motion.

| The buyer's question | Pillar that answers it |
|---|---|
| "Will adopting this slow my procurement or audit cycle?" | Pillar 1 — compliance-ready |
| "Will my disabled users be able to use what I build?" | Pillar 1 — accessibility |
| "Will adopting this expose my data to a model I don't control?" | Pillar 2 — AI-bridge |
| "Can my non-technical staff build dashboards without my CISO blocking the tool?" | Pillar 2 — no-code with isolation |
| "Will the result look native inside my product?" | Pillar 2 — design-token system |
| "Will the model be allowed to train on our data?" | Pillar 2 — no-training warranty |
| "Can we run this in an environment that has no public internet?" | Both — air-gap deployment |

---

## The joint opportunity in one line

**No vendor today sells both "survives a regulated-industry procurement screen" and "AI helps you build the dashboard without ever touching your data." Embeddable can.**

That is what this documentation set develops, in detail, across the rest of the folder.

---

## Where to read next

- *I have five minutes.* Read [15 — Final Summary](./15-final-summary.md).
- *I want the leadership briefing.* Read [01 — Executive Overview](./01-executive-overview.md) for Pillar 1, then [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) for Pillar 2.
- *I want to see what we'll say in a meeting.* Read [12 — Stakeholder Presentation Narrative](./12-stakeholder-presentation-narrative.md).
- *I want every detail.* Open the [README](./README.md) and follow the index.

---

## Plain-English glossary for this page

A few terms used above, in one line each. Fuller definitions live in [13 — Glossary](./13-glossary.md).

- **VPAT** — the accessibility report procurement officers ask for by name.
- **SOC 2** — the security attestation enterprise buyers ask for.
- **SBOM** — the software bill of materials supply-chain teams ask for.
- **BAA** — the business-associate agreement HIPAA-covered buyers ask for.
- **DPA** — the data-processing agreement EU privacy law requires.
- **Trust center** — the public web page that holds the documents above.
- **EU AI Act** — the EU regulation on AI; the high-risk classes carry the strictest obligations.
- **NIST AI RMF** — the US voluntary framework for trustworthy AI that regulated buyers are using to structure their AI inventories.
- **AI-isolation contract** — Embeddable's published statement of what the AI model sees (intent, schema, design tokens) and what it does not (rows, identifiers, regulated data, credentials).
- **BYO-model** — "bring your own model"; the customer chooses and hosts the AI; Embeddable consumes it via a documented interface.

---

## Language discipline

The whole documentation set avoids overclaim. We say *compliance-ready*, never *compliant*. We say *AI-isolated by architecture*, never *private AI* or *AI-safe*. Overclaim destroys credibility faster than any other failure mode in this market — that discipline applies on every page.
