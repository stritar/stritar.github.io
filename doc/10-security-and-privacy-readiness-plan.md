# 10 — Security and Privacy Readiness Plan

**Purpose:** A detailed security and privacy plan for the Remarkable suite. Covers the threat model for the components themselves, the assumptions the libraries make about the host platform, the supply-chain and SDLC tooling we need to add, the deployment models we expect to support, and the sector-specific overlays for HIPAA, GDPR, SOC 2, ISO 27001, FedRAMP and CMMC buyers.

**Audience:** Security, privacy, GRC, platform engineering, and any compliance reviewer evaluating the libraries.

**Related documents:** [08 — Detailed Compliance Gap Analysis (Areas A2-A14)](./08-detailed-compliance-gap-analysis.md) · [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [13 — Glossary](./13-glossary.md)

---

## 1. The position to defend

The Remarkable libraries occupy an unusually small security footprint. We want to defend that footprint deliberately rather than accidentally. The position to defend is:

- The libraries make **no direct network requests**. Data fetching is delegated to the Embeddable runtime (`@embeddable.com/core`).
- The libraries hold **no authentication state**. AuthN/AuthZ flow through the host application via the SDK's `clientContext`.
- The libraries store **no durable user data** in the browser. One `sessionStorage` entry exists for chart-color theme metadata; nothing else persists.
- The libraries embed **no third-party telemetry, analytics, error reporting, or cookies**.
- The libraries perform **no cryptographic operations**. Crypto is the platform's responsibility.

This narrow surface is a feature. It means a buyer's security review focuses on the host platform — which the buyer has more leverage over — and on the supply chain. It also means a single regression (e.g., adding a Sentry SDK without ceremony) would be a disproportionate change to the security posture. Future-proofing means documenting this position so a future contributor does not accidentally widen the surface.

---

## 2. Component-level threat model (STRIDE-scoped)

We use STRIDE — Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege — applied to the components specifically (not the platform).

### 2.1 Spoofing

| Threat | Vector | Current state | Mitigation |
|---|---|---|---|
| Spoofed `clientContext` from a compromised host integration | The library trusts whatever the host passes in. | Inherent to the integration model. | Out of scope at the component layer; document the trust assumption. The host application is responsible for authenticating the `clientContext` it provides. |
| Theme injection from a compromised theme provider | CSS variable values could embed malicious content; CSS injection is not arbitrary code, but it can affect rendering. | No theme-input validation. | Document that theme values are not a security boundary; recommend host applications treat the theme provider as a trust-equivalent component. |

### 2.2 Tampering

| Threat | Vector | Current state | Mitigation |
|---|---|---|---|
| Tampered npm package | A malicious build of `@embeddable.com/remarkable-pro` or `@embeddable.com/remarkable-ui` is published. | No npm provenance configured on the publish workflow. | **Add `npm publish --provenance`** to release workflow. Buyers verify with `npm audit signatures`. |
| Tampered dependency | A compromised transitive dependency injects malicious code. | No SBOM, no CodeQL, no SCA. SonarCloud SAST only. | Add Dependabot + CodeQL + SBOM emission at release. Document a vulnerability response SLA in `SECURITY.md`. |
| In-memory tampering by host page JS | The library runs in the host page's JS context; anything in that context can alter the library. | Inherent to the embedding model. | Document the trust boundary — components are not isolated from the host page. Components rely on the host's CSP for defense-in-depth. |

### 2.3 Repudiation

| Threat | Vector | Current state | Mitigation |
|---|---|---|---|
| Users export data and deny doing so | No audit hook around the export pipeline. | The export pipeline ([remarkable-pro/src/theme/utils/export.utils.ts](../remarkable-pro/src/theme/utils/export.utils.ts)) does not emit an audit event. | Add an optional `onAuditEvent` hook (see [08 — Area A4](./08-detailed-compliance-gap-analysis.md)). The host's SIEM records the event. |
| Users change filters and deny doing so | No audit hook around filter changes. | Same as above. | Same. The schema includes `filter-change`, `drilldown`, `chart-export`, `component-mount`. |

### 2.4 Information disclosure

| Threat | Vector | Current state | Mitigation |
|---|---|---|---|
| Data exfiltration via the export pipeline | Authorized user exports data they should not have access to. | The export pipeline honors a `data-no-export` DOM attribute as an opt-out. No role-aware gating. | Add a `clientContext.permissions.export` contract; PRO export menu respects it. Pair with audit logging. |
| Data exfiltration via PNG raster | DOM-to-image rasterizes everything in scope; a malicious host page CSS could exfiltrate cross-origin pixel content (unlikely under modern browser security). | No special handling. | Host-application defense (CSP frame ancestors, isolated origin) is the primary mitigation. |
| Data leak via DOM inspection | The library exposes data values as text nodes for tooltips, labels, etc. Anyone with browser dev tools can read them — but anyone with dev tools also has network-tab access. | Inherent. | Document explicitly. Recommend hosts not pass data they consider sensitive at the UI layer if the user is not authorized to see it. |
| Data leak via `sessionStorage` | The single `sessionStorage` write persists only theme color assignments, not user data. | Limited; documented in [06 — Section 7.2](./06-repository-technical-analysis.md). | None required; document explicitly. |
| Data leak via cross-frame `postMessage` | The libraries do not send `postMessage` themselves. The host may use `postMessage` to push data into the embedded analytics; that boundary belongs to the host. | Library does not send `postMessage`. | Document. |
| Future XSS via the existing `dangerouslySetInnerHTML` | One occurrence in [`ChartCardMenuPro.tsx:24`](../remarkable-pro/src/components/charts/shared/ChartCard/ChartCardMenuPro/ChartCardMenuPro.tsx) renders a URL-decoded SVG icon from a hardcoded source. Safe today; a future contributor could route user input through it. | Inherent. | Add an ESLint rule banning `dangerouslySetInnerHTML` except in this one file (with comment). Add a unit test that verifies the rendered output is the expected SVG and not arbitrary HTML. |

### 2.5 Denial of service

| Threat | Vector | Current state | Mitigation |
|---|---|---|---|
| Memory exhaustion via very large datasets | Chart.js performance degrades with very large datasets; the library does not enforce a row cap. | No data-size guards. | Document recommended dataset sizes; surface a `maxRows`-style warning in dev mode. |
| Re-render storms via data-binding patterns | A component remounted in a loop by a poorly-written host page can burn CPU. | Inherent to React. | Documentation; no library-level mitigation. |

### 2.6 Elevation of privilege

| Threat | Vector | Current state | Mitigation |
|---|---|---|---|
| Components performing privileged operations the host did not authorize | Components do not call the network or hold credentials. | N/A. | Document. The library has no privileges to elevate. |

---

## 3. Authentication and authorization assumptions (delegated)

The libraries make a single, principled assumption: **all authentication and authorization is the host application's responsibility**, routed through the Embeddable SDK runtime.

The `clientContext` object carried by the SDK is the integration point. The library consumes it for:

- Time zone (for date formatting)
- Locale and language (for i18n)
- Theme overrides

The library does *not* consume `clientContext` for:

- Authorization decisions about which charts to render (that's the host's job)
- Data filtering by user role (that's the host's job)
- Audit identity attribution (the host attaches the user identity to the audit event)

We recommend adding a documented `clientContext.permissions` shape that PRO components consult for fine-grained gating — see [08 — Area A5](./08-detailed-compliance-gap-analysis.md). The library should *consult* permissions, not *enforce* them — defense in depth requires the host to also enforce them server-side.

---

## 4. Audit logging strategy

A common procurement question: "How will I be able to prove who saw what, when?"

Today the libraries provide no answer. The recommended strategy:

### 4.1 Event schema

Add an `onAuditEvent(payload)` callback to the theme/runtime layer. Define a minimal, stable schema:

```ts
type AuditEvent =
  | { kind: 'component-mounted'; componentName: string; at: ISO8601 }
  | { kind: 'filter-changed';  componentName: string; filter: FilterSummary; at: ISO8601 }
  | { kind: 'drilldown';       componentName: string; dimension: string; value: string; at: ISO8601 }
  | { kind: 'export';          componentName: string; format: 'csv' | 'xlsx' | 'png'; rowCount?: number; at: ISO8601 };
```

The library emits the event; the host translates it into its SIEM pipeline (Splunk, Datadog, ElasticSearch). The library never sees the audit log itself — that's the host's responsibility under whichever regime applies (HIPAA §164.312(b), SOC 2 CC7.2, etc.).

### 4.2 What the library guarantees

- Events fire on a defined, documented set of user-visible actions.
- The schema is versioned; additive changes only within a major version.
- Events do not include raw cell values by default (to keep payloads small and not duplicate the data path).
- Events include enough context for the host to correlate them with the user identity it already holds.

### 4.3 What the library does not do

- Persist audit events.
- Send them across the network.
- Attach user identities.
- Encrypt them.

All of these are the host's responsibility.

---

## 5. Privacy and data handling

The libraries' privacy story is simple — and that simplicity is the message.

**What the libraries see:** Data values flow into the React component tree as props from the Embeddable SDK runtime. They are rendered as text nodes, chart pixels, table cells. They are not transformed beyond formatting.

**What the libraries persist:** One `sessionStorage` entry under the key `embeddable` containing chart-color assignments (not user data). Nothing else.

**What the libraries emit:** Currently nothing. After the proposed `onAuditEvent` work: a defined event schema. After the proposed permissions work: a `clientContext.permissions` read.

**What leaves the browser:** Only via the export pipeline (CSV / XLSX / PNG), and only on explicit user action. The export is a Blob download, not a server round-trip — the data does not pass through Embeddable infrastructure.

This story should be published as a one-page "data handling" document in the trust center.

### 5.1 GDPR posture

| Article | Position |
|---|---|
| Art. 25 (privacy by design) | The libraries minimize data persistence and have a small surface. We document this position. |
| Art. 28 (processor / DPA) | The libraries are not a processor — they are software components. The Embeddable platform may be a processor under the host's DPA; that contract is at the corporate level. |
| Art. 32 (security of processing) | The libraries inherit transport and at-rest encryption from the host. We document this delegation. |
| Art. 35 (DPIA) | We provide DPIA inputs (see Section 7 below) so a host's privacy officer can complete their own DPIA without re-discovering our internals. |

### 5.2 HIPAA posture

The libraries do not constitute a Business Associate on their own. The Embeddable platform may be a Business Associate of customers that handle PHI. The libraries do not store, transmit, or process PHI beyond rendering it in the browser. The host application is responsible for PHI minimum-necessary and access controls. We document this position.

---

## 6. Encryption posture (delegated)

- The libraries perform no cryptographic operations.
- Encryption-in-transit (TLS to the data source) is the host application's responsibility.
- Encryption-at-rest is the data source's responsibility.
- Token storage is the host application's responsibility.
- FIPS 140-3 compliance is the operating environment's responsibility.

The strongest statement we can make is: the libraries do not introduce cryptographic risk because they hold no keys, no tokens, no secrets, no data-at-rest. We publish this statement explicitly.

---

## 7. DPIA inputs (for host privacy officers)

Hosts running their own DPIA need a small set of inputs about the libraries. We publish:

1. **Categories of personal data processed:** zero. The libraries do not classify data; whatever data the host passes through is rendered.
2. **Recipients of personal data:** none beyond the host. No third-party data sharing.
3. **Cross-border transfers:** none. The libraries do not transfer data.
4. **Retention periods:** none. The libraries do not retain data beyond the React render cycle and the one theme-metadata `sessionStorage` entry.
5. **Security measures:** SDLC controls (see Section 9), supply-chain controls (Section 8), threat model (Section 2). Encryption controls are the host's.
6. **Data-subject rights:** N/A at the library level. The host fulfills subject-access, rectification, erasure, portability, and objection requests against its data source — the library has nothing to fulfill against.

---

## 8. Supply-chain controls (the work that lands first)

| Control | Tool | Current | Target |
|---|---|---|---|
| **Dependency updates** | Dependabot for npm + GitHub Actions ecosystems | not configured | configure both repos for weekly updates with grouped majors |
| **SCA (Software Composition Analysis)** | OSV-Scanner (preferred) or Snyk | not configured | configure GitHub Action on PR + scheduled scan |
| **SAST (Static Application Security Testing)** | SonarCloud + CodeQL | SonarCloud only | add CodeQL workflow |
| **Secret scanning** | GitHub Secret Scanning (built-in) | unknown status | enable explicitly; add a pre-commit secret-scanning hook |
| **SBOM emission** | CycloneDX + SPDX, generated at release | none | add to release workflow; publish as a GitHub Release asset |
| **npm provenance** | `npm publish --provenance` | not configured | configure release workflow |
| **License scanning** | OSV-Scanner license output or a dedicated tool | none | add to SBOM emission pipeline |
| **Signed commits** | GPG / SSH signing on protected branches | unknown | enforce signed commits on the default branch |
| **Branch protection** | GitHub branch protection | unknown | document and enforce protection rules |
| **Vulnerability disclosure** | `SECURITY.md` + security@ email + safe-harbor language | missing | land `SECURITY.md` per [11 — Annex B](./11-technical-roadmap.md) |
| **Disclosure SLA** | Documented in `SECURITY.md` | n/a | P0 7-day acknowledgment, 30-day fix target; P1 30-day acknowledgment, 90-day fix target |

These controls are sequenced as Phase 0 / Phase 2 of [11 — Technical Roadmap](./11-technical-roadmap.md).

---

## 9. Secure development lifecycle (SDLC) summary

We propose publishing a one-page SDLC summary that maps to NIST SSDF (SP 800-218). The summary covers:

1. **Plan:** threat-modeling cadence (annual + per-major-change). Security stakeholder review of architecture proposals.
2. **Design:** security-review checklist on PRs that touch security-relevant code (auth context, export pipeline, data-binding paths). Architectural decisions logged.
3. **Implement:** secure-by-default coding standards. ESLint enforcement of dangerous patterns (a custom rule banning `dangerouslySetInnerHTML` outside the known-safe file).
4. **Verify:** unit + integration tests, SonarCloud, CodeQL, axe (a11y), Dependabot, OSV-Scanner.
5. **Release:** changesets-driven SemVer, signed tags, npm provenance, SBOM emission.
6. **Maintain:** disclosure SLA, hotfix path, vulnerability triage, version-support window.

---

## 10. Deployment-model coverage

Buyers expect a vendor to state which deployment models they support. The Remarkable libraries are pure-browser code and therefore inherit the deployment model of the host application. We document explicitly which configurations are supported.

| Model | What the libraries require | Supported today? | Notes |
|---|---|---|---|
| **Multi-tenant SaaS** (host application is Embeddable's SaaS) | Standard browser environment + npm-installed components | Yes | The default. |
| **Single-tenant SaaS** (host application is a customer-owned SaaS deploying the Embeddable SDK) | Same as multi-tenant | Yes | The libraries make no multi-tenant assumptions; the host is responsible for tenant isolation. |
| **Self-hosted on-prem** | The host bundles the libraries; no internet egress required for the libraries themselves | Yes — *requires validation* of the Embeddable SDK's behavior in offline mode | The libraries do not call out; the SDK and host data source may. |
| **Sovereign cloud — AWS GovCloud (US)** | Same as multi-tenant; the host runs in GovCloud | Inherits the host's posture | Requires Embeddable platform to be GovCloud-deployable. |
| **Sovereign cloud — Azure Government** | Same | Inherits the host's posture | |
| **Sovereign cloud — DoD IL5+** | Same | Inherits the host's posture; *requires validation* of Embeddable platform availability | |
| **Sovereign cloud — Google Distributed Cloud** | Same | Inherits | |
| **Sovereign EU clouds** (OVH, T-Systems, Outscale Sovereign Cloud, etc.) | Same | Inherits | |
| **Air-gapped (no internet egress)** | The libraries themselves never call out. Required: SDK and data source also run with no egress; build artifacts hosted internally | Inherits — *see Section 11* | |

---

## 11. Air-gap, offline, and sovereign-cloud constraints

Intelligence and defense buyers — and a subset of healthcare, energy, and critical-infrastructure buyers — require zero outbound network traffic from the deployed application. The component layer's commitments to support this:

1. **No telemetry.** The libraries do not call out, full stop. We commit to keeping this true.
2. **No CDN-dependent assets.** All fonts, icons, images and styles are bundled with the library output. No `import url('https://fonts.googleapis.com/...')`. No external CDN references.
3. **No analytics, no Sentry, no third-party SDKs.** Already the case. Documented and ESLint-enforced.
4. **No "phone home" license validation.** The libraries are MIT-licensed; no license server.
5. **Offline build.** Customers can install the package from a private npm registry / mirror. We document the verification path: `npm install` + `npm audit signatures` + checksum verification.
6. **Documentation accessible offline.** Storybook can be built and served from the customer's own internal infrastructure (`npm run build-storybook`).

The Embeddable platform itself — the SDK and the data source — has its own air-gap story that lives outside this document. The components layer can claim air-gap support; the platform claim is a corporate question.

---

## 12. Sector-specific overlays

### 12.1 Healthcare (HIPAA + FDA + IEC 62304)

The most demanding sector for audit logging and access control.

- **HIPAA Security Rule §164.312(b)** — audit controls. Need the `onAuditEvent` hook from Section 4.
- **HIPAA Security Rule §164.308(a)(4)** — role-based access. Need the `clientContext.permissions` contract from Section 3.
- **FDA Cybersecurity in Medical Devices (Sept 2023)** — SBOM required for premarket submissions involving software. SBOM emission (Section 8) addresses.
- **IEC 62304** — software lifecycle for medical-device software. Our SDLC summary maps to this; SaMD customers will require a more detailed mapping document for any Class B/C device they build.

### 12.2 Fintech and banking

- **PCI DSS 4.0** — applicable only if cardholder data is in the analytics scope. The library never sees the cardholder data itself, but customers must validate the host's PCI scope.
- **DORA (EU, in force 17 January 2025)[^1]** — operational resilience requirements on EU financial entities and their critical ICT third-party providers. Our SDLC summary, incident-response SLA, and supply-chain controls address the relevant articles.
- **NYDFS Part 500** — annual certifications; named CISO requirement; multi-factor auth on the host.
- **SR 11-7 (US Federal Reserve)** — model risk management. If our analytics influence model-driven decisions (credit, market, ops), the host bank must validate the model layer; we provide the data-handling and audit-logging primitives to support that validation.

### 12.3 US government

- **FedRAMP Rev 5** — the platform's authorization regime (Low / Moderate / High baselines, aligned to NIST 800-53 Rev 5). The library's commitments: zero direct network, supply-chain controls in Section 8, deployment-model support in Section 10. The actual FedRAMP package is the platform's, not the library's.
- **Section 508 ICT Refresh** — accessibility ([09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)).
- **ADA Title II Web Rule** — accessibility; deadlines 26 April 2027 / 2028.

### 12.4 Defense (CMMC 2.0 + DFARS + DoD SRG IL2-IL6)

- **CMMC 2.0** — three levels, contractor-tier-based. Library commitments: SBOM, supply-chain controls, signed releases, vuln management SLA.
- **DFARS 252.204-7012** — CUI safeguarding per NIST SP 800-171. Host obligation.
- **DoD Cloud Computing SRG** — IL2 (public), IL4 (CUI), IL5 (CUI + classified at low side), IL6 (Secret). Inherits the host's posture.
- **ITAR considerations** — export-controlled technical data. If the host application handles export-controlled data, our components must not be the foreign-disclosure vector — our zero-egress posture and offline-deployable build address this directly.

### 12.5 Intelligence

- **ICD 503 / CNSSI 1253** — IC risk management. Inherits the host platform's authorization. Our deployment-model and air-gap commitments are the most relevant library-level statements.

### 12.6 Research and education

- **FERPA** — student data. Host obligation; library handles data the same way regardless of regulatory class.
- **NIH Data Management & Sharing Policy** — research data management. Library is not the system of record; provides analytics rendering.

### 12.7 EU cross-cutting

- **GDPR** — covered in Section 5.
- **EU AI Act (Regulation 2024/1689)** — entered into force 1 August 2024; prohibited practices applied from 2 February 2025; full applicability 2 August 2026[^2]. The libraries do not embed AI/ML models. Hosts that use analytics in AI-driven products may face additional obligations; the library is not the regulated entity.
- **EU Accessibility Act** — covered in [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md).

---

## 13. Open security questions

- What is the Embeddable corporate compliance posture today (SOC 2 Type II, ISO 27001, HIPAA BAA)? The library's story inherits from this answer; we must validate before publishing the trust-center page.
- Is there an internal vulnerability-disclosure program already? If yes, can we surface it publicly?
- Will signed commits be enforced on main? (Requires engineering team to set up commit signing for all maintainers.)
- Will SBOM be emitted in CycloneDX, SPDX, or both? (Recommend: both. Different buyers consume different formats.)
- Are there contractual SLAs with existing customers that the disclosure SLA must align with?

---

## Key takeaways

- The libraries' security position is "small surface, delegated everything." We defend this position deliberately by documenting it, not by adding tooling that contradicts it.
- The component-level threat model identifies five actionable items: the audit-log hook, the permissions contract, an ESLint rule around `dangerouslySetInnerHTML`, supply-chain tooling (Dependabot, CodeQL, SBOM, provenance), and a published `SECURITY.md` with a disclosure SLA.
- Encryption, authentication, and authorization are all delegated; the library publishes its delegation contract so buyers know what to ask the host about.
- Air-gap and sovereign-cloud support is a real and commercially valuable commitment — the libraries make zero outbound network calls today, and we should keep that true.
- Sector overlays do not change the library's commitments meaningfully; they change which host-platform obligations the buyer focuses on.

## Open questions

- See Section 13 above.

## Recommended next steps

1. Begin Phase 0 of [11 — Technical Roadmap](./11-technical-roadmap.md): land Dependabot, CodeQL, SBOM emission, npm provenance, and `SECURITY.md`.
2. Define and document the `onAuditEvent` schema and `clientContext.permissions` contract.
3. Add an ESLint rule banning `dangerouslySetInnerHTML` outside the known-safe file.
4. Validate the Embeddable corporate compliance posture (Open Questions in Section 13).
5. Publish the trust-center page outlined in [08 — Section C1](./08-detailed-compliance-gap-analysis.md).

## Related documents

- [08 — Detailed Compliance Gap Analysis](./08-detailed-compliance-gap-analysis.md)
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md)
- [11 — Technical Roadmap](./11-technical-roadmap.md)
- [06 — Repository Technical Analysis](./06-repository-technical-analysis.md)
- [13 — Glossary](./13-glossary.md)
- [14 — Source and Evidence Index](./14-source-and-evidence-index.md)

---

[^1]: EIOPA, "Digital Operational Resilience Act (DORA)" — application date 17 January 2025.
[^2]: European Commission, "Regulatory framework on AI" — AI Act phased dates.
