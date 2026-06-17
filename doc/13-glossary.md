# 13 — Glossary

**Purpose:** Plain-English definitions of the accessibility, security, privacy, analytics and regulated-industry terms used throughout this documentation set. Aimed at readers who are not specialists in any one of these fields.

**Audience:** Anyone reading the documentation set who wants a quick definition without leaving the page.

**Related documents:** [README](./README.md) · [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md) · [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) · [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)

---

## How to use this glossary

Terms are grouped by topic. The first time a term is used in any document we either define it inline or link to its entry here. When a term has a broader public meaning than the way we use it, the entry calls that out.

---

## Accessibility

**Accessibility (a11y).** Designing software so people with disabilities can use it. "a11y" is shorthand: the letter "a", eleven letters, the letter "y".

**WCAG (Web Content Accessibility Guidelines).** The W3C standard for how to build accessible web content. Organized into four principles — Perceivable, Operable, Understandable, Robust — and three conformance levels: A, AA, AAA. The current version is **WCAG 2.2**, published 5 October 2023 and updated 12 December 2024.

**WCAG 2.2 vs 2.1.** WCAG 2.2 adds 9 new Success Criteria and marks one criterion (4.1.1 Parsing) as obsolete. Conformance to 2.2 AA is the de-facto target for new regulated-industry work.

**Success Criterion (SC).** A single, testable rule inside WCAG (for example SC 1.4.3 Contrast (Minimum)). Conformance is claimed against the full set of criteria at a given level.

**ARIA (Accessible Rich Internet Applications).** A W3C specification for HTML attributes (like `aria-label`, `aria-expanded`, `role="menuitem"`) that expose richer semantics to assistive technologies than plain HTML allows.

**Assistive technology (AT).** Hardware or software a person with a disability uses to interact with computers: screen readers (NVDA, JAWS, VoiceOver, TalkBack), magnifiers, voice-control software (Dragon NaturallySpeaking), alternative keyboards, switch devices.

**Section 508.** A US federal law (29 U.S.C. §794d) that requires federal agencies' ICT (information and communication technology) to be accessible. The technical standard cited by the current Section 508 ICT Refresh is **WCAG 2.0 Level AA** — a gap with the current WCAG 2.2 that procurement officials need to be aware of.

**Revised 508 Standards.** The 2017 update that harmonized Section 508 with WCAG 2.0 and with the European EN 301 549 standard.

**EN 301 549.** The European harmonized standard for ICT accessibility (current version v3.2.1). Equivalent of Section 508 for public-sector procurement in the EU. It cites WCAG 2.1 AA at the chapter dealing with web content.

**ADA Title II.** The portion of the Americans with Disabilities Act that applies to state and local governments. In April 2024 the US Department of Justice published a final rule requiring web content and mobile apps from state and local governments to meet **WCAG 2.1 Level AA** by **26 April 2027** (entities serving 50,000+ people) or **26 April 2028** (smaller entities and special districts).

**European Accessibility Act (EAA, Directive 2019/882).** EU directive that requires designated products and services — including e-commerce, e-books, banking services and consumer ICT — to be accessible. Member-state laws transposing the directive apply from **28 June 2025** *(requires validation)*.

**VPAT / ACR.** The Voluntary Product Accessibility Template (current revision 2.5) is the standard form used in US public-sector procurement to describe how a product conforms to accessibility standards. An ACR (Accessibility Conformance Report) is the filled-in document a vendor publishes. Procurement officers ask for an ACR by name.

**Chartability.** A published evaluation framework (Frank Elavsky, 2022 onward) of 50 testable heuristics for chart and data-visualization accessibility. Organized around the four POUR principles plus three extra principles specific to data visualization (Compromising, Assistive, Flexible). Referenced as the de-facto chart-a11y heuristic set.

**Sonification.** Representing data using sound rather than (or in addition to) visuals. Useful for trends and patterns; required by some sector accessibility expectations and offered by Highcharts and similar vendors as a chart-a11y feature.

**Reduced motion (`prefers-reduced-motion`).** A CSS media query that lets a user signal at the operating-system level that they want fewer animations. WCAG SC 2.3.3 expects software to honor it.

**Forced colors (`forced-colors`).** A CSS media query that lets a user signal they have a high-contrast or custom-color OS theme active. WCAG SC 1.4.11 and related criteria expect software to honor it.

---

## Security

**SOC 2.** An assurance report against the AICPA Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy). A **Type I** report describes controls at a point in time; a **Type II** report describes controls and their operating effectiveness over a window (typically 6–12 months). Type II is what enterprise buyers ask for.

**ISO/IEC 27001.** International standard for an information security management system (ISMS). The current revision is **ISO/IEC 27001:2022**. A 27001 certificate is issued by an accredited certification body after an external audit. Often paired with **ISO/IEC 27701:2019** for privacy.

**HIPAA.** The Health Insurance Portability and Accountability Act (US). The Security Rule (45 CFR §164.302–318) sets administrative, physical and technical safeguards for protected health information. A **BAA (Business Associate Agreement)** is the contract that puts a vendor under HIPAA obligations.

**HITECH.** The Health Information Technology for Economic and Clinical Health Act extended HIPAA's enforcement and breach-notification requirements.

**GDPR.** EU General Data Protection Regulation (Regulation 2016/679). Articles 25 (Data Protection by Design and by Default) and 32 (Security of Processing) are the most relevant to analytics software.

**DPIA (Data Protection Impact Assessment).** A documented analysis required by GDPR Article 35 when processing is likely to result in high risk to data-subject rights.

**DPA (Data Processing Agreement).** The contract between a controller and a processor required by GDPR Article 28.

**FedRAMP.** The Federal Risk and Authorization Management Program — the US government's program for authorizing cloud services for federal use. Three baselines: Low, Moderate, High. The current revision is **FedRAMP Rev 5**, aligned to NIST SP 800-53 Rev 5 *(requires validation of effective date)*.

**FISMA.** Federal Information Security Modernization Act — the umbrella US law that defines how federal agencies secure information systems. Implemented through NIST 800-53.

**FIPS 140-3.** US federal standard for cryptographic modules. The current standard supersedes FIPS 140-2; new validations are issued under 140-3.

**NIST SP 800-53.** US federal security and privacy control catalog. Current revision is **Rev 5**.

**NIST SSDF (SP 800-218).** Secure Software Development Framework — a catalog of practices for building secure software.

**NIST CSF 2.0.** The Cybersecurity Framework, current version 2.0. Often used by private sector and critical infrastructure operators to organize security programs.

**OWASP.** The Open Worldwide Application Security Project. Maintains the **Top 10** (the best-known list of common web app risks) and the **ASVS** (Application Security Verification Standard, a more detailed security verification checklist).

**CMMC 2.0.** Cybersecurity Maturity Model Certification — the US Department of Defense's regime for verifying that defense contractors meet specified cybersecurity practices in handling FCI/CUI. Three levels (Foundational, Advanced, Expert). Rollout is phased into DoD contracts.

**DFARS 252.204-7012.** A clause in the US Defense Federal Acquisition Regulation Supplement that requires defense contractors to safeguard Covered Defense Information per NIST SP 800-171 and to report cyber incidents.

**ITAR.** International Traffic in Arms Regulations — US export-control regime that restricts foreign access to defense-related technical data.

**ICD 503.** US Intelligence Community Directive 503 — the IC's risk-management framework for IT systems, building on NIST 800-37.

**CNSSI 1253.** Categorization and control selection guidance for national-security systems.

**Cloud Computing SRG (DoD IL2–IL6).** The DoD Cloud Computing Security Requirements Guide defines Impact Levels for cloud services hosting DoD data. IL2 is for unclassified public-release data; IL4/IL5 cover sensitive unclassified up to FOUO/CUI; IL6 covers classified up to SECRET.

**PCI DSS.** Payment Card Industry Data Security Standard. Current version is **PCI DSS 4.0** (with v4.0.1 clarifications). Applies to any environment that stores, processes or transmits cardholder data.

**DORA.** EU Digital Operational Resilience Act (Regulation 2022/2554). Entered into application **17 January 2025**. Applies to ~20 categories of EU financial entities plus their critical ICT third-party providers.

**NIS2.** EU Directive 2022/2555 on a high common level of cybersecurity. Expands the original NIS Directive's scope significantly.

**NYDFS Part 500.** New York State Department of Financial Services cybersecurity regulation — a model for state-level financial-services cyber requirements.

**SBOM (Software Bill of Materials).** A machine-readable inventory of components included in a software product. The two main formats are **CycloneDX** (OWASP) and **SPDX** (Linux Foundation). Increasingly demanded by federal buyers under Executive Order 14028.

**SSDLC (Secure Software Development Lifecycle).** A development process that bakes security activities (threat modeling, code review, scanning, dependency management) into every phase rather than bolting them on at release time.

**SAST / DAST / SCA.** Static / Dynamic / Software Composition Analysis. SAST scans source code, DAST tests running applications, SCA inventories and audits dependencies.

**CSP (Content Security Policy).** An HTTP response header that tells the browser which resources the page is allowed to load and what behavior is allowed. A common defense against XSS.

**RBAC / ABAC.** Role-Based Access Control assigns permissions via roles. Attribute-Based Access Control assigns permissions based on attributes of subjects, objects and context. ABAC is more expressive but harder to govern.

**Audit log.** An append-only, tamper-evident record of security-relevant events suitable for forensic and regulatory review. Distinct from operational telemetry.

**Threat model.** A structured analysis of how a system can be attacked, who would attack it, and what mitigations exist. **STRIDE** (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege) is one common framework.

---

## Privacy

**PII (Personally Identifiable Information).** Data that identifies or can identify a natural person. Definitions differ between US (NIST, HIPAA) and EU (GDPR's "personal data") frameworks.

**PHI (Protected Health Information).** PII in the healthcare context as defined by HIPAA.

**CUI (Controlled Unclassified Information).** US federal designation for unclassified information that nonetheless requires safeguarding. Defense contractor obligations focus heavily on CUI handling.

**Data residency.** Constraints on where data physically lives (jurisdiction of the data center). Distinct from sovereignty (jurisdictional law that applies to the data) and locality (where it is processed).

**Data minimization.** GDPR-aligned principle of collecting and retaining only the data needed for a specified purpose.

**Privacy by design.** GDPR Article 25's requirement that data-protection considerations be built into systems from the start, not retrofitted.

**Subprocessor.** A third party engaged by a processor to process personal data on behalf of a controller. Required to be disclosed in a public subprocessor list under most enterprise DPAs.

---

## AI governance

**EU AI Act (Regulation 2024/1689).** The European Union's regulation on artificial intelligence; entered into force 1 August 2024, full applicability 2 August 2026. Tiered obligations by risk class. Annex III enumerates eight high-risk domains (biometrics, critical infrastructure, education, employment, access to essential services and benefits, law enforcement, migration and border control, administration of justice and democracy); high-risk systems carry conformity-assessment obligations. Penalties for high-risk violations reach €15M or 3% of global annual turnover.

**Annex III (EU AI Act).** The list of high-risk AI uses in the EU AI Act. The list buyers map their vendor AI features against when deciding whether a procurement triggers the conformity-assessment obligation.

**OMB M-24-10.** The 28 March 2024 White House Office of Management and Budget memorandum, "Advancing Governance, Innovation, and Risk Management for Agency Use of Artificial Intelligence." Requires US federal civilian agencies (DoD and the Intelligence Community are out of scope) to inventory AI use cases at least annually, submit to OMB, post publicly, and apply strict risk assessments for "safety- or rights-impacting AI." Compliance plans run on biennial cycles through 2036.

**NIST AI RMF.** The NIST AI Risk Management Framework (initial release January 2023), a voluntary US framework for trustworthy AI. Structured as Govern / Map / Measure / Manage functions.

**NIST AI 600-1 / Generative AI Profile.** A July 2024 extension of the AI RMF for generative-AI systems. Enumerates 12 GenAI-specific risk categories and a tiered governance model (Tiers 1–4) in which high-risk systems in regulated environments should target Tier 3 or Tier 4 practices.

**BaFin AI/ICT guidance.** The 18 December 2025 guidance from Germany's Federal Financial Supervisory Authority on managing ICT risks when using AI. Applies to Capital Requirements Regulation entities and Solvency II insurers; emphasises third-party ICT risk management, due diligence, contractual safeguards, audit and access rights, incident reporting, exit strategies, and portability of models and data.

**FCA AI Update / AI Lab.** The UK Financial Conduct Authority's AI guidance — the April 2024 AI Update sets out how existing rules apply to AI use in financial services; the AI Lab (from October 2024) is a dedicated initiative for safe innovation; the AI Live Testing pilot launched September 2025.

**DoD CDAO.** The US Department of Defense Chief Digital and AI Office. Owns the DoD AI strategy (January 2026 update); enforces "DoD Data Decrees"; restricts third-party AI models for non-public DoD information.

**DoD AI Cybersecurity RM Tailoring Guide.** US DoD guidance on cybersecurity risk management for AI; explicitly states "AI solutions outside DoD control NOT authorized for non-public information" and mandates continuous monitoring.

**ICD 503.** Intelligence Community Directive 503; governs IT systems for classified environments. Relevant to AI deployments that must run inside air-gapped enclaves.

**BYO-model (bring your own model).** Deployment pattern where the customer chooses and hosts the LLM (Azure OpenAI in their tenant, Cohere on-prem, Mistral on-prem, watsonx, etc.) and the vendor (here, Embeddable) consumes it via a documented interface. The default deployment story for the AI-bridge pillar.

**AI-isolation contract.** The published architectural statement of which data an AI model sees and which it does not. For the Remarkable libraries: the model sees user intent, schema, and the design-token vocabulary; the model does not see rows, identifiers, regulated data, or credentials. The AI-bridge pillar's equivalent of the BAA / DPA — a procurement artifact, not a marketing claim.

**AI conformity assessment.** The documentation a regulated buyer produces to demonstrate that an AI system meets EU AI Act, NIST AI RMF, or sector-regulator (BaFin, FCA, OMB M-24-10) expectations. A vendor that ships a reusable conformity-assessment template shortens the buyer's compliance work.

**Confidential computing.** Hardware-enforced data-in-use encryption. Implementations include Azure Confidential VMs (AMD SEV-SNP, Intel TDX), AWS Nitro Enclaves (isolated EC2 execution environments with no persistent storage or external networking), and GCP Confidential Space (Confidential VMs, GKE Nodes, Dataflow). Often paired with private LLM hosting in regulated deployments.

**MCP (Model Context Protocol).** An Anthropic-developed (November 2024) protocol for connecting AI agents to enterprise data sources in a structured, governable way. Sigma's "Sigma + Anthropic MCP" integration is a notable embedded-BI implementation; framed by Sigma as extensibility rather than as a data-isolation contract.

**Einstein Trust Layer.** Salesforce's published architecture for data isolation in its Einstein AI features, including data masking, zero retention, and toxicity detection. Cited in this set as one of the few vendor-published AI-isolation positions among embedded-BI platforms.

---

## Healthcare / MedTech

**IEC 62304.** International standard for the software lifecycle of medical-device software. Classifies software into safety classes (A, B, C) based on potential harm.

**ISO 13485.** Quality Management System standard for medical-device manufacturers.

**ISO 14971.** Risk management standard for medical devices.

**SaMD (Software as a Medical Device).** IMDRF (International Medical Device Regulators Forum) term for software intended for medical purposes that performs those purposes without being part of a hardware medical device.

**FDA Cybersecurity Guidance.** The September 2023 FDA guidance "Cybersecurity in Medical Devices: Quality System Considerations and Content of Premarket Submissions" sets expectations for premarket cybersecurity documentation.

**HL7 FHIR.** Fast Healthcare Interoperability Resources — the modern standard for exchanging healthcare data between systems.

---

## Fintech / Banking

**SR 11-7.** US Federal Reserve guidance on model risk management. Relevant when analytics software contributes to credit, market, or operational risk decisions.

**FFIEC.** Federal Financial Institutions Examination Council. Publishes the IT Examination Handbook, the de-facto US bank examination reference.

**SEC Reg S-P.** US securities regulation on safeguarding customer information. Amended in 2024 with breach-notification requirements.

**PSD2 / PSD3.** EU Payment Services Directives. PSD2 introduced open banking; PSD3 is the proposed update.

---

## Government / Defense / Intelligence

**StateRAMP.** A FedRAMP-modeled program for US state and local governments.

**G-Cloud (UK).** UK government procurement framework for cloud services.

**NCSC Cloud Security Principles.** UK National Cyber Security Centre's 14 principles for assessing cloud-service security.

**Air-gap.** Physical or logical separation of a system from any external network. Common in classified environments and some critical-infrastructure deployments.

**Cross-domain solution (CDS).** A controlled mechanism for transferring data between security domains of different classifications.

---

## Research and education

**FERPA.** US Family Educational Rights and Privacy Act. Governs disclosure of student education records.

**NIH DMSP.** US National Institutes of Health Data Management and Sharing Policy (effective January 2023). Sets expectations for managing and sharing research data generated with NIH funding.

**IRB.** Institutional Review Board. The committee that reviews human-subjects research at a US research institution. Operates under the Common Rule (45 CFR Part 46).

---

## Cross-cutting EU

**EU AI Act (Regulation 2024/1689).** Entered into force 1 August 2024. Prohibited AI practices and AI-literacy obligations applied from **2 February 2025**; governance and general-purpose AI obligations from **2 August 2025**; full applicability **2 August 2026**; product-integrated high-risk systems **2 August 2028**.

**Digital Services Act (DSA).** EU regulation on online intermediaries and platforms.

---

## Analytics and data visualization

**Embedded analytics.** Analytics functionality (charts, dashboards, query builders) delivered inside another application rather than as a standalone analytics product.

**BI (Business Intelligence).** Umbrella term for analytics tools that turn data into business decisions. "BI tools" historically meant standalone products (Tableau, Power BI, Looker); "embedded BI" refers to BI delivered via SDK or iframe into a third-party app.

**Dashboard.** A composite view that arranges multiple charts, KPIs and controls on a single screen.

**KPI tile.** A single-value visualization that shows a headline metric (often with a comparison value and a trend indicator).

**Data table.** A tabular rendering of data. In an accessibility context, an "accessible data table" is the textual alternative offered alongside a chart for assistive-technology users.

**Pivot table.** A table that lets users dynamically group and aggregate rows and columns.

**Heatmap.** A 2-D grid where each cell's color encodes a numeric value.

**Filter / controller.** A user-input component (dropdown, multi-select, date range, search box) that constrains the data shown in nearby charts.

**Definition file.** In the Embeddable SDK, the `definition.ts` file that declares a component's inputs, events, and data-loading logic — the source of truth for how the component plugs into the platform.

**Theme.** The set of CSS variables, formatters, and translations that controls how a component renders.

**Design token.** A named, versioned design decision (color, spacing, type-scale value) stored in a central system rather than hardcoded.

**Three-layer token system.** Architecture in which raw primitives (core tokens) feed semantic intents (background, text, status) which in turn feed component-level overrides — the architecture used by `remarkable-ui`.

**Storybook.** Open-source workshop tool for building UI components in isolation. Often used as the home for accessibility checks via the `addon-a11y`.

---

## Embeddable-specific terms

**Embeddable SDK.** The runtime that wires Remarkable components into a host application. Provides data fetching, security context (`clientContext`), preview-mode behavior and the configuration UI.

**Remarkable UI.** The open-source primitives library (`@embeddable.com/remarkable-ui`).

**Remarkable PRO.** The pre-configured Embeddable-SDK-wired suite (`@embeddable.com/remarkable-pro`) built on top of Remarkable UI.

**`clientContext`.** A per-tenant object passed from the host application into the Embeddable runtime to carry security and theming context (timezone, user role, identifiers).

---

## Key takeaways

- Many terms in this set have a strict regulatory definition; we use them in their strict sense, not loosely.
- Section 508 still cites WCAG 2.0 even though WCAG 2.2 is current — that gap matters for buyers and is called out across the docs.
- "Compliance" is not a product attribute — it is a property of an organization, an environment, and an audit. Throughout this set we say *compliance-ready* when referring to the libraries themselves.

## Open questions

- Are there any sector-specific abbreviations the Embeddable team uses internally that should be added here?
- Should this glossary include a non-English equivalents table for the German market that Embeddable already supports?

## Recommended next steps

1. Use this glossary as the single source of truth for definitions across all docs.
2. When a doc introduces a new term, add it here and link rather than redefining.
3. Re-validate the "requires validation" entries (EAA application date, FedRAMP Rev 5 effective date) with primary sources before any commercial use.

## Related documents

- [README](./README.md)
- [00 — The Two Pillars](./00-the-two-pillars.md)
- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
- [10 — Security and Privacy Readiness Plan](./10-security-and-privacy-readiness-plan.md)
- [03 — Detailed Market Research](./03-detailed-market-research.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)
- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)
