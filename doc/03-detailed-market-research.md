# 03 — Detailed Market Research

**Purpose:** A detailed, cited market view of where compliance-ready, accessibility-first analytics components sit in the embedded analytics landscape today. Includes a competitor compliance comparison matrix, an enforcement-date horizon scan, the accessible-chart prior art, and the procurement expectations regulated-industry buyers are bringing into 2026 and beyond.

**Audience:** Product strategy, marketing, sales engineering, leadership, and anyone preparing a defensible market story.

**Related documents:** [02 — Market Research Summary](./02-market-research-summary.md) (non-technical) · [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) · [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md) · [14 — Source and Evidence Index](./14-source-and-evidence-index.md)

---

## 1. Market frame

### 1.1 The embedded analytics layer

Embedded analytics — the practice of placing charts, dashboards, and query controls inside another application rather than running them as a standalone tool — has matured from an add-on feature into a procurement category. The vendor landscape clusters into three rough strata:

1. **Hosted embedded BI platforms** — Sigma, ThoughtSpot Everywhere, Looker Embedded, Tableau Embedded, Power BI Embedded, Domo Everywhere, GoodData, Holistics, Luzmo (formerly Cumul.io). These deliver an entire analytics experience (data modeling + visualization + governance + iframe or SDK) as a packaged product.
2. **Headless analytics layers** — Cube, Explo, Mode (Datadog), Preset, Lightdash. Semantic layer plus an embedding story; often paired with a separate visualization library.
3. **Visualization SDKs and component libraries** — IBM Carbon Charts, Highcharts (including its accessibility module), Visa Chart Components, AnyChart, Plotly.js, Apache ECharts, AntV G2/G6, Vega-Lite, Recharts, Tremor, Nivo, Visx, AG Grid (tables). These are the building blocks customers use to construct their own analytics experiences.

The Remarkable suite straddles strata 2 and 3 — `remarkable-ui` is a visualization SDK; `remarkable-pro` is a pre-configured suite for the Embeddable hosted platform. The product story is closer to Sigma's "components-with-platform-context" model than to a pure visualization library like Highcharts.

### 1.2 Why compliance matters in this market specifically

Embedded analytics rides on the deployment story of the host application. A bank, hospital, federal agency, or defense contractor adopts the embedding vendor's components only if those components inherit cleanly into the host's compliance position. This makes the analytics layer a *compliance multiplier*: a well-designed components library accelerates the host's audit and procurement; a poorly designed one blocks it.

The vendors above are differentiated on price, ergonomics, and breadth. Compliance posture is rarely the *primary* differentiator today, even though it has become a procurement gate. That gap is the opportunity this market research is built to surface.

---

## 2. Regulatory horizon scan

The single biggest near-term driver for compliance-ready analytics is the wall of enforcement deadlines arriving between 2025 and 2028. The dates below come from the issuing authority.

| Standard / regulation | Authority | Key date | What changes |
|---|---|---|---|
| **DOJ ADA Title II Web Rule** | US Department of Justice[^1] | Final rule published April 2024; compliance required 26 April 2027 (state/local governments with 50,000+ population) and 26 April 2028 (smaller entities and special districts). Federal Register Interim Final Rule (20 April 2026) extended the larger-entity deadline to 26 April 2027. | State and local government web content and mobile apps must meet WCAG 2.1 Level AA. Vendors selling to them are pulled into the requirement contractually. |
| **European Accessibility Act (EAA, Directive 2019/882)** | European Commission[^2] | Application date 28 June 2025 *(requires validation)*. | Designated private-sector products and services — including banking, e-commerce, e-books, consumer ICT — must meet harmonized EU accessibility requirements. |
| **EU AI Act (Regulation 2024/1689)** | European Commission[^3] | Entered into force 1 August 2024. Prohibited AI practices and AI-literacy obligations applied from 2 February 2025. Governance rules and general-purpose AI obligations from 2 August 2025. Full applicability 2 August 2026. High-risk biometric and similar systems from 2 December 2027. Product-integrated high-risk systems from 2 August 2028. | Affects analytics products that incorporate AI/ML; tiered obligations by risk class. |
| **EU DORA (Regulation 2022/2554)** | EIOPA / EU[^4] | Entered into application 17 January 2025. | EU financial entities and their critical ICT third-party providers must meet ICT risk-management, incident-reporting, resilience-testing, and oversight requirements. |
| **CMMC 2.0** | US Department of Defense[^5] | Phased rollout into DoD contracts. Levels 1–3 (Foundational, Advanced, Expert). | Defense contractors handling FCI/CUI must demonstrate cybersecurity practices appropriate to their tier. |
| **NYDFS Part 500** | New York Department of Financial Services | In force; ongoing annual certifications and updates. | NY-regulated financial entities must maintain a cybersecurity program with named CISO, MFA, encryption, and incident reporting. |
| **WCAG 2.2** | W3C[^6] | Published 5 October 2023; updated 12 December 2024. Adds 9 new Success Criteria over WCAG 2.1; obsoletes SC 4.1.1 Parsing. | Becomes the de-facto target for new accessibility programs even where regulators still cite earlier versions. |
| **Revised Section 508** | US Access Board[^7] | Standard cites WCAG 2.0 Level AA — the *gap* between this and current WCAG 2.2 is worth noting for vendors. | Applies to US federal ICT acquisitions. |

The cumulative picture: a procurement-team-led buyer in early 2027 is screening vendors against WCAG 2.1 AA at minimum, with growing pressure to cite 2.2 AA, plus a SOC 2 / ISO 27001 / DORA / sector-specific overlay. Vendors with no public position on these standards are progressively filtered out.

---

## 3. Competitor landscape

### 3.1 Embedded BI / analytics SDKs

The **"AI builder shipped"** column tracks whether the vendor has shipped an AI-assisted dashboard / chart authoring capability through 2024–2025; this matters because AI capability is now baseline (Forrester Wave Q2 2025: "AI is now a core capability of BI platforms"). The **"AI-isolation posture"** column tracks whether the vendor publishes a position on what data the model sees and whether customer data may be used to train it — the basis of the second positioning pillar developed in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md). "Not stated" is itself a finding.

| Vendor | Category | Hosting model | AI builder shipped (2024–2025) | AI-isolation posture | Where they position |
|---|---|---|---|---|---|
| **Sigma** | Embedded BI | Cloud-only (multi-region) | Yes — Sigma + Anthropic MCP (Nov 2024) | Not stated explicitly; MCP framing is extensibility, not isolation | Spreadsheet-style data exploration; enterprise governance |
| **ThoughtSpot Everywhere** | Embedded BI | Cloud + customer-managed options | Yes — Spotter GA Nov 2024; Spotter Embedded beta | Not stated; references SOC 2, ISO, HIPAA, FedRAMP at the platform level | Natural-language search; enterprise BI |
| **Looker Embedded** (Google Cloud) | Embedded BI | GCP-hosted | Yes — Looker + Gemini | Inherits GCP customer-data position | Semantic model, deep GCP integration |
| **Power BI Embedded** (Microsoft) | Embedded BI | Azure | Yes — Copilot in Power BI (late 2024 GA) via Azure OpenAI | Inherits Azure OpenAI position (private endpoints / PrivateLink available) | Office 365 ecosystem; large existing customer base |
| **Tableau Embedded** (Salesforce) | Embedded BI | Salesforce-hosted | Yes — Tableau Einstein (Sep 2024) | Inherits Salesforce Einstein Trust Layer (vendor-published) | Visualization heritage; broad market |
| **Domo Everywhere** | Embedded BI | Cloud | Yes — DomoGPT / AI Service Layer | Not stated explicitly for the embed surface | Self-service for ops teams |
| **Mode (Datadog)** | Embedded analytics | Cloud | Limited | Not stated | Engineering / dev-analytics niche |
| **GoodData** | Embedded analytics | Cloud + on-prem | Yes — agentic AI ecosystem | Not stated for embed surface; on-prem option present | Multi-tenant SaaS focus |
| **Holistics** | Embedded BI | Cloud | Limited | Not stated | As-code analytics |
| **Luzmo (Cumul.io)** | Embedded analytics SDK | Cloud | Limited / emerging | Not stated | SaaS-product-builder positioning |
| **Cube** | Headless semantic layer | OSS + Cloud | n/a (semantic layer, not viz) | Not stated | Modeling layer, paired with own viz |
| **Explo** (Omni, 2025) | Embedded analytics | Cloud | Yes — emerging | Not stated | White-label dashboards for SaaS products |
| **Preset** | Hosted Apache Superset | Cloud | Limited | Not stated | OSS-derived enterprise BI |
| **Lightdash** | Headless analytics layer | OSS + Cloud | Limited | Not stated | dbt-native BI |
| **Qlik (Embedded)** | Embedded BI | Cloud + on-prem | Yes — Qlik Answers | Not stated for embed | Augmented analytics; in-memory engine |
| **Hex** | Notebook + dashboards | Cloud | Yes — Hex Magic | Not stated | Notebook-to-dashboard for data teams |
| **Embeddable** (this vendor) | Embedded analytics platform + components | Cloud (Embeddable platform) | Roadmap — see [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) | **AI-isolation contract planned** (host-owned data, BYO-model, audit hooks via Phase 3 `onAuditEvent` — see [16 §3](./16-ai-bridge-positioning.md)) | Components-led, design-system-rich, host-application-friendly |

### 3.2 Accessibility-positioned chart libraries (the most relevant prior art)

These are the libraries Remarkable should benchmark against — they have made accessibility a public position.

| Library | License | Accessibility posture |
|---|---|---|
| **Highcharts Accessibility module**[^8] | Commercial (Highcharts) | Public; module-based. Provides keyboard navigation, screen-reader description, sonification (in partnership with Georgia Tech's Sonification Lab), data-table support, tactile-export for embossing, voice-input compatibility. The de-facto accessibility benchmark in commercial JS charting. |
| **IBM Carbon Charts** | Apache 2.0 | Public; part of the Carbon Design System. Strong design-token foundation, screen-reader compatibility, keyboard support, color-blind palettes. |
| **Visa Chart Components**[^9] | OSS (Visa, BSD-3-Clause) | Self-describes as "accessibility focused, framework-agnostic set of data experience design systems components for the web." Built on Stencil.js as web components. Mission: "enable developers to build equal data experiences for everyone, everywhere." |
| **AnyChart Accessibility module** | Commercial | Public accessibility feature page; less widely cited than Highcharts. |
| **Plotly.js accessibility plugin** | OSS (plotly.js MIT) + commercial enterprise | Less mature than Highcharts; growing. |
| **Chartability**[^10] | OSS framework | Not a chart library but the heuristic evaluation framework other libraries cite. Created by Frank Elavsky (originally 2022); covers 50 heuristics across the four POUR principles plus three data-vis-specific principles (Compromising, Assistive, Flexible). |

The pattern of the leaders is consistent: data-table fallback + accessible summary + keyboard chart traversal + sonification (in the most advanced cases). Remarkable can stand on this prior art rather than inventing the patterns; the engineering work is well-understood.

### 3.3 General-purpose chart libraries (for context)

The libraries below are not direct competitors on compliance positioning but anchor the market for raw chart functionality: **AG Grid** (tables), **Recharts**, **Tremor**, **Nivo**, **Visx**, **Apache ECharts**, **AntV G2/G6**, **Vega-Lite**, **D3**.

---

## 4. Competitor compliance comparison matrix

A side-by-side view of where the most relevant vendors stand on the documents and attestations procurement teams ask for. **"Public"** means the vendor publishes the artifact on their website; **"On request"** means the vendor will provide it under NDA; **"Not stated"** means we could not find a public position at the time of this audit and the reader should not infer either presence or absence.

The **"AI-isolation posture"** column tracks whether the vendor publishes a position on what data the model sees, whether customer data may be used to train external models, and whether BYO-model deployment is supported — the procurement artifact for the AI-bridge pillar developed in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md). Most cells read "Not stated," which is itself the finding.

| Vendor | VPAT / ACR | WCAG conformance stated | SOC 2 Type II | ISO 27001 | HIPAA BAA | FedRAMP authorization | On-prem option | License | Accessible chart story | Sonification | AI-isolation posture |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Sigma** | On request | 2.1 AA (stated) | Public | Public (US/EU) | Available | In Process / TBD *(requires validation)* | Cloud-first | Commercial | Partial | No | Not stated (MCP framing is extensibility, not isolation) |
| **ThoughtSpot Everywhere** | On request | 2.1 AA (stated) | Public | Public | Available | In Process *(requires validation)* | Both | Commercial | Partial | No | Not stated for Spotter embed surface |
| **Looker Embedded** | Inherits Google Cloud posture | Google a11y commitment | GCP scope | GCP scope | Available | Yes (GCP) | GCP | Commercial | Limited | No | Inherits GCP customer-data posture |
| **Power BI Embedded** | Public (Microsoft) | 2.1 AA | Public (Azure) | Public (Azure) | Available | Yes (Azure Government, US) | Azure | Commercial | Strong | No | Inherits Azure OpenAI (private endpoints / PrivateLink available) |
| **Tableau Embedded** | Public | 2.1 AA | Public (Salesforce) | Public | Available | Yes (Salesforce GovCloud) | Both | Commercial | Strong (Tableau a11y improvements) | No | Inherits Salesforce Einstein Trust Layer |
| **Apache Superset** / **Preset** | Not stated (community); Preset publishes | n/a (community) | Preset: in scope | Preset: in scope | Preset: available | n/a | Both | Apache 2.0 | Limited | No | Not stated |
| **Highcharts** (library) | On request | 2.1 AA (with a11y module) | n/a (library) | n/a | n/a | n/a | n/a | Commercial | **Best in class** | **Yes** | n/a (library, no AI builder) |
| **IBM Carbon Charts** | Inherits IBM Carbon | 2.1 AA target | n/a | n/a | n/a | n/a | n/a | Apache 2.0 | Strong | No | n/a (library) |
| **Visa Chart Components** | Inherits Visa | Accessibility-first | n/a | n/a | n/a | n/a | n/a | BSD-3-Clause | Strong | No | n/a (library) |
| **Plotly Dash Enterprise** | On request | 2.1 AA (Enterprise) | Public | Public | Available | Available *(requires validation)* | Both | Commercial | Partial | No | Not stated for embed surface |
| **Embeddable / Remarkable** (today) | Not yet authored | Not yet stated | Inherits Embeddable corporate — *requires validation* | Inherits Embeddable corporate — *requires validation* | Inherits — *requires validation* | Inherits — *requires validation* | Inherits platform | MIT (libraries) | Absent today; planned | Future | Architecture supports AI-isolation contract (host-owned data, no outbound network, audit hooks via Phase 3 `onAuditEvent`); contract not yet published |
| **Embeddable / Remarkable** (Phase 1 target) | Public VPAT 2.5 ACR | 2.2 AA | Inherits corporate | Inherits corporate | Inherits corporate | Inherits platform | Inherits platform | MIT (libraries) | Data table + summary + keyboard | Future enhancement | **AI-isolation contract published** (BYO-model, no-training warranty, AI-event audit schema — see [16 §10](./16-ai-bridge-positioning.md)) |

> Footnote on this matrix: vendor positions move quickly. The matrix is an as-of-audit snapshot. Several cells are *(requires validation)* because they depend on FedRAMP authorization status that can change month to month. The point of the matrix is the *shape* of the market, not the cell-level certainty: the embedded-BI strata are well-attested on SOC 2 and ISO 27001 but weak on accessibility; the chart-library strata are strong on accessibility (Highcharts especially) but offer no organizational attestations; the AI-isolation column is largely empty across the embedded-BI strata — the second positioning gap the Remarkable suite can occupy. The Remarkable suite sits in both gaps.

---

## 5. The opportunity gap

The matrix above reveals a real, defensible position. There is no vendor today that simultaneously:

1. Publishes a substantive WCAG 2.2 AA position with chart-level accessibility (Highcharts publishes accessibility but at the library level only, not as part of a hosted analytics platform).
2. Inherits a hosted-platform's corporate compliance posture (SOC 2 / ISO 27001 / HIPAA BAA capability).
3. Provides pre-configured, drop-in analytics components rather than a kit-of-parts.
4. Ships with an explicit air-gap / sovereign-cloud support story.

Embeddable, with the Remarkable suite plus the platform's corporate work, can occupy this gap. The work to close the gap is sequenced in [11 — Technical Roadmap](./11-technical-roadmap.md). The positioning to claim the gap is described in [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md).

---

## 5.1 The AI-exposure gap — the second open category

A parallel, equally defensible gap is visible in the AI dimension. Full treatment in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md); this section sets out the market evidence in the same format as the compliance gap above.

### 5.1.1 Trend — AI-built analytics is now baseline

Every major embedded-BI vendor shipped an AI builder through 2024–2025:

- **ThoughtSpot Spotter** — GA November 2024; generative AI agent for conversational BI, replacing Sage[^ai-1].
- **Tableau Einstein** — September 2024 launch; agentic AI redesign of the platform[^ai-2].
- **Sigma + Anthropic MCP (Model Context Protocol)** — November 2024 extensibility integration[^ai-3].
- **Microsoft Power BI Copilot** — generally available late 2024; "ask any question" via Azure OpenAI[^ai-4].
- **Looker + Gemini** — 2024[^ai-5].
- **Qlik Answers** — 2024.
- **GoodData** — agentic AI ecosystem, 2024–2025.
- **Hex Magic** — natural-language → SQL → chart → narrative.

Forrester (Q2 2025): "AI is now a core capability of BI platforms"[^ai-6]. Gartner's 2025 Hype Cycle places AI-ready data and AI agents at the peak; by 2028, Gartner projects more than 95% of enterprises will use GenAI APIs/models or deploy GenAI-enabled apps in production[^ai-7].

### 5.1.2 Counter-trend — regulators converged on AI data exposure

Across US, EU, UK, and supranational bodies, the same window produced a tight set of constraints on AI access to sensitive data:

| Authority | Instrument | Key dates / status |
|---|---|---|
| European Commission | **EU AI Act (Regulation 2024/1689)** — Annex III high-risk classifications; tiered governance obligations; conformity assessment for high-risk systems[^ai-8] | Entered into force 1 August 2024; prohibited practices applied 2 February 2025; full applicability 2 August 2026 |
| White House OMB | **M-24-10** — federal agency AI inventories, rights-impacting AI impact assessments, third-party AI risk management[^ai-9] | Issued 28 March 2024 |
| NIST | **AI RMF + NIST AI 600-1 Generative AI Profile** — 12 GenAI risk categories; tiered governance model[^ai-10] | RMF January 2023; GenAI Profile July 2024 |
| BaFin (Germany) | **AI/ICT guidance** — managing ICT risks when using AI; applies to CRR entities and Solvency II insurers; third-party ICT risk, contractual safeguards, audit / access rights[^ai-11] | Issued 18 December 2025 |
| FCA (UK) | **AI Update** + **AI Lab + AI Live Testing pilot** — how existing rules apply to AI in financial services[^ai-12] | AI Update April 2024; AI Lab from October 2024; AI Live Testing September 2025 |
| US DoD | **AI Cybersecurity Risk Management Tailoring Guide** + **CDAO AI Strategy** — "AI solutions outside DoD control NOT authorized for non-public information"[^ai-13] | RM Tailoring Guide ongoing; CDAO strategy January 2026 |
| NHS England / BMA | Source-code access restrictions; data-sovereignty position citing the US CLOUD Act risk[^ai-14] | May 2025 |

### 5.1.3 CISO surveys — third-party AI exposure is the top-of-mind risk

| Survey (2024–2025) | Finding |
|---|---|
| Proofpoint Voice of the CISO 2025[^ai-15] | 81% high concern that sensitive data is leaked into AI training sets; 80% of US CISOs concerned over customer data loss via public GenAI |
| Panorays CISO 2025[^ai-16] | 91% report rising third-party incidents; only 3% have full visibility into 4th/nth-party supply chains |
| Kiteworks AI Security Gap 2025[^ai-17] | 83% of organizations lack visibility into third-party AI use; 44% of healthcare organizations lack privacy controls |
| Deloitte AI Enterprise 2025 (Aug–Sep)[^ai-18] | 73% cite data privacy/security as the top AI risk; 77% factor vendor country of origin into AI purchasing |
| BigID 2024 CISO[^ai-19] | 59 federal AI regulations issued in 2024 (double the prior year) |

### 5.1.4 The structural gap

The AI-isolation column in the §4 matrix tells the same story: **no embedded-BI vendor today publishes an AI-isolation position structured for regulated-industry procurement.** Confidential-compute infrastructure vendors (Azure Confidential VMs, AWS Nitro Enclaves, GCP Confidential Space) publish isolation but do not package analytics; BI vendors publish AI capability but do not package isolation. The intersection is empty.

This is the second pillar developed in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md). The same shape as the compliance gap. The same buyer. The same artifact pack — extended with an AI-isolation contract and an AI-RMF conformity-assessment template.

[^ai-1]: TechTarget, "ThoughtSpot AI agent Spotter enables conversational BI," <https://www.techtarget.com/searchbusinessanalytics/news/366615693/ThoughtSpot-AI-agent-Spotter-enables-conversational-BI>.
[^ai-2]: Salesforce / Tableau Einstein launch, "Six trends that shaped data management analytics in 2024," <https://www.techtarget.com/searchbusinessanalytics/feature/Six-trends-that-shaped-data-management-analytics-in-2024>.
[^ai-3]: Sigma Computing, "Embedded analytics and AI," <https://www.sigmacomputing.com/resources/library/embedded-analytics-and-ai>.
[^ai-4]: Microsoft, "Copilot in Power BI overview," <https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction>.
[^ai-5]: Genesys Growth, "Tableau Pulse vs Power BI Copilot vs Looker (Gemini)," <https://genesysgrowth.com/blog/tableau-pulse-vs-power-bi-copilot-vs-looker-looker-studio-(gemini)->.
[^ai-6]: Forrester, "AI is now a core capability of BI platforms," <https://www.forrester.com/blogs/ai-is-now-a-core-capability-of-bi-platforms/>.
[^ai-7]: Gartner, "Hype Cycle for Generative AI," <https://www.gartner.com/en/articles/hype-cycle-for-genai>.
[^ai-8]: European Commission, "Regulatory framework for AI," <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>.
[^ai-9]: White House OMB, "M-24-10 Advancing Governance, Innovation, and Risk Management for Agency Use of Artificial Intelligence," <https://www.whitehouse.gov/wp-content/uploads/2024/03/M-24-10-Advancing-Governance-Innovation-and-Risk-Management-for-Agency-Use-of-Artificial-Intelligence.pdf>.
[^ai-10]: NIST AI RMF, <https://www.nist.gov/itl/ai-risk-management-framework>; NIST AI 600-1 Generative AI Profile, <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf>.
[^ai-11]: BaFin, "Guidance on managing ICT risks when using AI," <https://www.bafin.de/SharedDocs/Veroeffentlichungen/EN/Meldung/2025/meldung_2025_12_18_orientierungshilfe_ikt_risiken_en.html>.
[^ai-12]: FCA, "AI Update," <https://www.fca.org.uk/publication/corporate/ai-update.pdf>; FCA, "Our AI approach," <https://www.fca.org.uk/firms/innovation/ai-approach>.
[^ai-13]: US DoD CIO, "AI Cybersecurity Risk Management Tailoring Guide," <https://dodcio.defense.gov/Portals/0/Documents/Library/AI-CybersecurityRMTailoringGuide.pdf>; US DoD CDAO, "AI Strategy for the Department of War," <https://media.defense.gov/2026/Jan/12/2003855671/-1/-1/0/ARTIFICIAL-INTELLIGENCE-STRATEGY-FOR-THE-DEPARTMENT-OF-WAR.PDF>.
[^ai-14]: British Medical Association, "AI, private platforms and the risk to NHS data sovereignty," <https://www.bma.org.uk/news-and-opinion/ai-private-platforms-and-the-risk-to-nhs-data-sovereignty>.
[^ai-15]: Proofpoint, "2025 Voice of the CISO Report," <https://www.proofpoint.com/us/newsroom/press-releases/proofpoint-2025-voice-ciso-report>.
[^ai-16]: Panorays, "2025 CISO Survey," <https://panorays.com/blog/2025-ciso-survey/>.
[^ai-17]: Kiteworks, "AI Security Gap 2025," <https://www.kiteworks.com/cybersecurity-risk-management/ai-security-gap-2025-organizations-flying-blind/>.
[^ai-18]: Spark Co, "Navigating data residency requirements in enterprise AI," <https://sparkco.ai/blog/navigating-data-residency-requirements-in-enterprise-ai>.
[^ai-19]: BigID, "2024 CISO Report," <https://bigid.com/blog/2024-ciso-report/>.

---

## 6. What buyers ask for, by stakeholder

Five buyer-side stakeholders typically gate a regulated-industry adoption. Each asks for a different set of artifacts.

| Stakeholder | What they ask for first | Tone of evaluation |
|---|---|---|
| **CISO / security team** | SOC 2 Type II, pentest summary, SBOM, vulnerability disclosure SLA, vendor security questionnaire | Skeptical; their job is to say no |
| **CMIO / privacy office** (healthcare) | HIPAA BAA, data-handling document, DPIA inputs | Risk-managing; will read the small print |
| **Accessibility officer** (often part of HR or Diversity & Inclusion) | VPAT / ACR, accessibility statement, AT walkthrough record | Often the first to identify the gap because they receive complaints |
| **Procurement / legal** | DPA, MSA, SLA, subprocessor list, IP indemnification | Process-oriented; expect named documents |
| **Engineering / platform** | Documentation, support SLA, API stability commitment, change log, deprecation policy | Most willing to advocate for the product if the dev experience is good |

Phase 0 of [11 — Technical Roadmap](./11-technical-roadmap.md) ships the foundational artifacts for the security team and accessibility officer; Phase 3 ships the procurement / legal pack. The CMIO pack is delivered alongside Phase 4.

---

## 7. Procurement expectations summary

A regulated-industry buyer's procurement team typically expects to receive a numbered list of documents within the first two weeks of due diligence. The Remarkable team should be prepared to deliver:

1. Current-dated VPAT 2.5 / ACR.
2. SOC 2 Type II report (corporate level).
3. ISO 27001 certificate (corporate level), if available.
4. SBOM for the most recent library release (CycloneDX or SPDX).
5. Penetration test executive summary (annual).
6. `SECURITY.md` link with disclosure SLA.
7. Data Processing Agreement template.
8. Subprocessor list.
9. Business Associate Agreement template, if HIPAA is in scope.
10. Standard MSA / SLA.
11. Sectoral-specific overlays as requested.
12. A trust-center URL that aggregates the above.

The bullet that most consistently distinguishes a "ready" vendor from a "promising" vendor at procurement: a working trust-center URL.

---

## 8. Trends shaping the next 24 months

Three trends to plan around:

1. **Procurement is decisively in charge.** Engineering can advocate for a vendor, but procurement gates the decision. Vendors with weak procurement artifacts are filtered before the engineering team gets a vote.
2. **VPATs are being demanded across private-sector buyers too.** The EAA and pressure from US enterprise customers (not just government) is pushing the VPAT from a "government-only" document to a baseline expectation.
3. **SBOM and software-supply-chain attestation is shifting from federal-only to industry-wide.** US Executive Order 14028 (2021) put SBOM on the federal agenda; PCI DSS 4.0, FDA premarket guidance, and EU CRA (Cyber Resilience Act, in force 10 December 2024 *(requires validation)*) are pulling it into private sector too.

A vendor preparing now for these trends — instead of reacting once procurement asks — has a measurable advantage.

---

## 9. Opportunity sizing and risks

Sizing the precise dollar value of the addressable market is outside the scope of this audit; reliable figures require Embeddable-internal data on existing customers, average deal sizes, and win-rate trends. **What we can say with confidence:**

- The largest analyst houses (Gartner, Forrester, IDC) all track embedded-analytics as a discrete category with double-digit annual growth through the mid-2020s *(requires validation against current analyst reports)*.
- The regulated sectors targeted by the brief — healthcare, fintech, government, defense — are typically 30–50% of an embedded-analytics vendor's revenue at scale *(requires validation)*.
- The compliance-ready accelerator is most pronounced in mid-market deals: large enterprises have the leverage to push compliance work onto any vendor; mid-market buyers prefer to buy compliance built-in.

**Risks specific to this market:**

- Compliance work has a long lead time. A six-to-twelve-month delay between starting the program and being able to claim the position is real.
- A competitor could announce a similar position; differentiation depends on credible evidence (the VPAT, the SOC 2 report, the trust-center page), not just claims.
- The MIT license on the libraries themselves is a strength for adoption but means commercial leverage comes from the Embeddable platform contract — the libraries cannot be the only commercial moat. Procurement teams in regulated industries are accustomed to commercial-support contracts; the Embeddable platform contract carries that weight.

---

## Key takeaways

- The embedded analytics market is mature in terms of vendors and features, but compliance-readiness is unevenly distributed.
- Embedded BI platforms (Sigma, ThoughtSpot, Power BI, Tableau, Looker) carry strong corporate attestations but lag on chart-level accessibility.
- The accessible-chart libraries (Highcharts, Carbon, Visa Chart) carry strong chart-a11y but no corporate attestations (because they are libraries, not platforms).
- No vendor today combines both — that is the opportunity Embeddable + Remarkable can occupy.
- Enforcement deadlines through 2025–2028 (ADA Title II, EAA, EU AI Act, DORA, CMMC 2.0) make this a near-term commercial story, not a long-term aspiration.

## Open questions

- What is the precise revenue mix today across the seven target sectors? Decisions about *which* sectors to lead with should be informed by that data.
- Which competitors are likely to make a serious accessibility move in 2026? (Sigma, ThoughtSpot, and Luzmo are most likely to publish ACRs in the next year *(requires validation)*.)
- Are there partnerships (with Deque, Tenon, Level Access, TPGi) that could compress the accessibility timeline?

## Recommended next steps

1. Decide on a sector priority for the initial go-to-market story (see [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)).
2. Validate the analyst-report sizing claims and competitor compliance positions against fresh sources before any external use.
3. Decide on partnerships (accessibility consultancies, pentest vendors) early — long lead times.
4. Begin the engineering and documentation work in [11 — Technical Roadmap](./11-technical-roadmap.md).

## Related documents

- [00 — The Two Pillars](./00-the-two-pillars.md) — plain-English overview of both opportunities
- [02 — Market Research Summary](./02-market-research-summary.md) — non-technical version
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)
- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) — full treatment of the AI-bridge pillar

---

## Citations

[^1]: US Department of Justice, "Fact Sheet: New Rule on the Accessibility of Web Content and Mobile Apps Provided by State and Local Governments." Available at <https://www.ada.gov/resources/2024-03-08-web-rule/>. Compliance deadlines: 26 April 2027 (50,000+ population), 26 April 2028 (under 50,000 and special districts).

[^2]: European Commission, "European Accessibility Act," <https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en>. (Application date 28 June 2025 is widely cited; *requires validation* against Directive 2019/882 transposition deadlines per Member State.)

[^3]: European Commission, "Regulatory framework on Artificial Intelligence," <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>. Phased enforcement: in force 1 August 2024; prohibited practices applied 2 February 2025; governance and GPAI rules 2 August 2025; full applicability 2 August 2026; high-risk biometric systems 2 December 2027; product-integrated high-risk 2 August 2028.

[^4]: EIOPA, "Digital Operational Resilience Act (DORA)," <https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en>. "Entered into application on 17 January 2025." Applies to ~20 categories of EU financial entities and their critical ICT third-party service providers.

[^5]: US Department of Defense CIO, Cybersecurity Maturity Model Certification (CMMC) program pages — phased rollout into DoD contracts; three levels (Foundational, Advanced, Expert).

[^6]: W3C, "Web Content Accessibility Guidelines (WCAG)," <https://www.w3.org/WAI/standards-guidelines/wcag/>. WCAG 2.2 published 5 October 2023, updated 12 December 2024; adds 9 new Success Criteria over WCAG 2.1; obsoletes SC 4.1.1 Parsing.

[^7]: Section508.gov, "Laws & Policies," <https://www.section508.gov/manage/laws-and-policies/>. Section 508 ICT Refresh harmonizes federal requirements with WCAG 2.0 — *gap with current WCAG 2.2 noted*.

[^8]: Highcharts, "Accessibility" feature pages — describes keyboard navigation, sonification (with Georgia Tech Sonification Lab), data table support, tactile export, screen-reader and voice-input support, "Highcharts Sonification Studio."

[^9]: Visa Chart Components, GitHub project — self-describes as "an accessibility focused, framework agnostic set of data experience design systems components for the web" — mission "enable developers to build equal data experiences for everyone, everywhere." BSD-3-Clause license.

[^10]: Chartability, <https://chartability.fizz.studio/>. Created by Frank Elavsky and Fizz Studio; 50 heuristic tests across 7 principles (POUR plus Compromising, Assistive, Flexible). Designed for chart and data-visualization accessibility evaluation.

Embeddable corporate framing: Embeddable documentation, "Remarkable Pro — Introduction," <https://docs.embeddable.com/component-libraries/remarkable-pro/introduction>. Quoted phrases include "Embeddable's production-ready component suite" and "teams that want world-class customer-facing analytics with speed, polish, and complete control."
