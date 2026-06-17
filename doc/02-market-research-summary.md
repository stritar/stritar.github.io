# 02 — Market Research Summary

**Purpose:** A non-technical summary of the market opportunity for compliance-ready analytics components. Aimed at readers who want the headline of [03 — Detailed Market Research](./03-detailed-market-research.md) without the citation list.

**Audience:** Leadership, sales, marketing, partnerships, investors, and any stakeholder forming a first impression of the opportunity.

**Related documents:** [03 — Detailed Market Research](./03-detailed-market-research.md) · [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) · [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)

---

## 1. The one-paragraph version

Embedded analytics — putting charts and dashboards inside someone else's product — is a mature category with strong vendors. **Compliance-ready** embedded analytics — components built so they survive a procurement screen in regulated industries — is much narrower. The vendors that dominate embedded BI (Sigma, ThoughtSpot, Power BI Embedded, Tableau, Looker) carry strong corporate attestations like SOC 2 and ISO 27001 but generally lag on chart-level accessibility. The vendors that lead on chart accessibility (Highcharts Accessibility module, IBM Carbon Charts, Visa Chart Components) are libraries without organizational attestations. **No vendor today combines hosted-platform corporate compliance with serious chart-level accessibility and pre-configured drop-in components.** That gap is the opportunity Embeddable + Remarkable can occupy.

## 2. How niche is this opportunity?

Embedded analytics is not niche — it is a multi-billion-dollar adjacent market. *Compliance-ready* embedded analytics, defined as components that can survive a regulated-industry procurement screen out of the box, is an emerging sub-segment. The signal that it is emerging rather than niche: the same procurement teams who screen for SOC 2, VPAT, and BAA today have been doing so for less than five years for many product categories. The pattern that started with cloud infrastructure and has spread to SaaS in general is now reaching the analytics layer.

## 3. Why this matters now

Three near-term forces make this a 2026 conversation, not a 2030 one:

1. **Hard deadlines arriving.** US ADA Title II Web Rule deadlines fall on 26 April 2027 and 26 April 2028. The European Accessibility Act has been pulling private-sector products into scope since mid-2025. EU DORA has been in force since 17 January 2025. EU AI Act obligations are unfolding through 2026 and 2027.
2. **Procurement institutionalization.** Five years ago a procurement officer might have *asked* about accessibility or SOC 2. Today the question is *show me the report*. Vendors without the documents are filtered before the engineering team gets a vote.
3. **Buyer profile match.** The companies most likely to embed analytics inside their products are fintech, healthcare SaaS, government modernization vendors, and developer tools for regulated industries — exactly the companies under the pressures above. They cannot adopt analytics components that block their own compliance posture.

## 4. The target sectors

Seven sectors are in scope. They overlap in their requirements but differ in emphasis:

- **Healthcare and MedTech** — biggest emphasis on audit logging, privacy (PHI), and accessibility.
- **Financial technology and banking** — biggest emphasis on operational resilience (DORA, NYDFS), security attestations, and audit logging.
- **Government and public sector** — biggest emphasis on accessibility (Section 508, EN 301 549, ADA Title II) and FedRAMP authorization.
- **Academic and scientific research** — biggest emphasis on privacy (FERPA, IRB), accessibility, and openly published research-data policies.
- **Military / defense** — biggest emphasis on supply-chain integrity (CMMC 2.0, SBOM, signed releases), air-gap and offline deployment, CUI handling.
- **Intelligence and national security** — biggest emphasis on air-gap deployment, classified-environment posture, ICD 503 alignment.
- **Other regulated enterprise** (energy, critical infrastructure, regulated industries broadly) — biggest emphasis on SOC 2, accessibility, and a credible trust story.

A program that delivers accessibility, audit logging, supply-chain integrity, and a published trust story does well across all of them.

## 5. Who buys

Five buyer-side stakeholders typically gate a regulated-industry adoption. Each asks for different documents:

| Stakeholder | What they ask for |
|---|---|
| CISO / security team | SOC 2 Type II report, pentest summary, SBOM, vulnerability disclosure SLA |
| Privacy / compliance office | HIPAA BAA, DPA, data-handling document, DPIA inputs |
| Accessibility officer | VPAT 2.5 / ACR, accessibility statement, AT walkthrough record |
| Procurement / legal | MSA, SLA, subprocessor list, indemnification language |
| Engineering / platform | Documentation, support SLA, API stability commitment |

Producing those artifacts is the deliverable side of a compliance-ready position. Without them, the conversation stalls regardless of how good the product is.

## 6. Where the market is underserved

The detailed competitor comparison is in [03 — Detailed Market Research](./03-detailed-market-research.md). The short version: there is a real, defensible position open today for a vendor that simultaneously:

1. Publishes a substantive WCAG 2.2 Level AA position with chart-level accessibility.
2. Inherits a hosted-platform's corporate compliance posture (SOC 2, ISO 27001, HIPAA BAA capability).
3. Provides pre-configured, drop-in analytics components, not just a kit of parts.
4. Ships with an explicit air-gap / sovereign-cloud support story.

Each of these *exists individually* somewhere in the market. None of them exists *together*.

## 7. What buyers actually care about

When stakeholders in these sectors speak directly, the underlying concerns are usually:

- **"Will adopting this product slow my own audit or stall my own procurement cycle?"** — the gating question.
- **"Can I show evidence to my regulator?"** — the documentation question.
- **"Will my disabled users be able to use the analytics I build with this?"** — the moral and legal question.
- **"Will my CISO sign off on the security questionnaire?"** — the screen question.
- **"Will I get a real human to call when something breaks?"** — the support question.

A product that answers all five of these confidently — and with cited evidence — wins disproportionately in regulated sectors.

## 8. Honest about risks

This opportunity is real but bounded:

- **It has a 12–18 month build cycle** before the documentation is credible enough to defend in front of a buyer's procurement team.
- **It depends on the platform's corporate compliance posture** (SOC 2, ISO 27001, etc.) — the libraries alone cannot carry the position.
- **Competitors will move.** Sigma, ThoughtSpot, Luzmo and others are likely to make accessibility announcements through 2026. Embeddable's window is not infinite.
- **Compliance language has to be precise.** Overclaim destroys credibility faster than any other failure mode in this market.

## 9. How big is "big enough"?

A precise dollar sizing requires Embeddable's internal customer data; we do not have that for this audit. What we can say without overclaim:

- Embedded analytics is tracked by major analyst firms as a discrete category with double-digit annual growth through the mid-2020s.
- Regulated sectors typically represent 30–50% of an embedded-analytics vendor's revenue at scale.
- Compliance-ready is most differentiating in the mid-market, where buyers prefer to *buy* compliance rather than build it.

A focused program against this opportunity does not require dominating the entire embedded-analytics market — it requires winning a defensible share of the regulated-industry subset of it.

---

## Key takeaways

- Embedded analytics is mature; compliance-ready embedded analytics is emerging.
- Hard enforcement deadlines in 2025–2028 create urgency.
- No vendor today combines hosted-platform attestations + chart-level accessibility + drop-in components + air-gap support — that's the opening.
- Buyers in these sectors don't just want a product; they want a stack of documents. A compliance-ready vendor produces both.
- The opportunity is real but the window is months, not years.

## Open questions

- Which target sectors should Embeddable lead with?
- What is the Embeddable corporate compliance posture today, and what can the libraries inherit?
- Is the organization willing to position publicly as "compliance-ready" or prefer to do the work quietly first?

## Recommended next steps

1. Read [03 — Detailed Market Research](./03-detailed-market-research.md) for the competitor comparison matrix and citations.
2. Read [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) for the positioning options that follow from this.
3. Decide on sector priority and review the engineering plan in [11 — Technical Roadmap](./11-technical-roadmap.md).

## Related documents

- [03 — Detailed Market Research](./03-detailed-market-research.md)
- [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md)
- [07 — Compliance Readiness Overview](./07-compliance-readiness-overview.md)
- [05 — Repository Overview](./05-repository-overview.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
