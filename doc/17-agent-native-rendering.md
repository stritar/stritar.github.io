# 17 — Agent-Native Rendering

**Status:** Forward-looking / exploratory. This document is a *horizon scan and architectural fit assessment*, not a roadmap commitment. The frameworks it discusses (A2UI, AG-UI, MCP Apps) are early-stage and moving; specifics are marked *requires validation* where they rest on external specs that may change. Created 31 May 2026.

**Purpose:** Assess a third positioning surface raised by the team — **rendering branded, native-looking analytics *inside the AI-agent interface itself*** (Claude's side-panel, an agent host, an A2UI/AG-UI client) — and test how well it fits the libraries and the position already established in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md). The finding: this is the **runtime delivery counterpart** to Pillar 2's build-time AI bridge, strongly aligned in thesis and largely compatible in architecture, contingent on one hard constraint (keep the model out of the data path) and one net-new build (an agent-facing rendering surface).

**Audience:** Product leadership, engineering, partnerships, the executive team. Anyone weighing whether "analytics rendered inside the agent" is a direction Embeddable should scope — and what it would and would not require of the Remarkable libraries.

**Related documents:** [00 — The Two Pillars](./00-the-two-pillars.md) · [01 — Executive Overview](./01-executive-overview.md) · [04 — Product Opportunity and Positioning](./04-product-opportunity-and-positioning.md) · [06 — Repository Technical Analysis](./06-repository-technical-analysis.md) · [11 — Technical Roadmap](./11-technical-roadmap.md) · [13 — Glossary](./13-glossary.md) · [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md)

---

## 1. The thesis in one paragraph

If AI agents become the primary surface through which people consume data — the "de-facto web browser" of the next cycle — then customer-facing analytics does not disappear; it moves. The dashboard stops being a page in a browser and becomes a component rendered *inside the agent's interface*. At that point a generic, unbranded chart streamed by an agent is a commodity, and the differentiator becomes the same one Embeddable already sells in the browser: **does the output look native, on-brand, and trustworthy inside the surface the user is actually looking at?** This is not a new pillar so much as the **runtime delivery counterpart** to the build-time AI bridge in [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md). Pillar 2 answers *"how is the dashboard built without exposing data to a model?"* This document answers *"how is that dashboard rendered, branded and governed, when the surface is an agent rather than a browser?"* The same architectural property that makes the build-time bridge credible — host-owned data, no outbound calls, a token-composed component library — is what makes the runtime surface credible too. The libraries do not need to be rebuilt; a new rendering surface needs to be added, and one isolation constraint needs to be held.

The browser-embedding position stays the lead. This document is a scan of an adjacent surface, written so leadership can decide whether — and when — to scope it. It deliberately does not commit the roadmap.

---

## 2. The external frameworks

Three early standards are converging on the same idea: an agent describes a UI, and a client renders it natively in the agent surface. They differ in *how much they constrain what gets rendered* — which turns out to be the axis that matters most for this position.

### 2.1 A2UI (Agent-to-UI)

A declarative, agent-driven UI protocol created by **Google with contributions from CopilotKit and the open-source community**, framed around one question: *"how can AI agents safely send rich UIs across trust boundaries?"*[^a2ui] The flow: the agent/LLM generates a UI as declarative JSON → messages stream over a transport (e.g. A2A) → a client parser receives them → a renderer instantiates **native platform widgets** (Angular, Flutter, React) → drawn from a **Widget Registry**, described as a *"pre-approved component catalog preventing injection attacks."* User interaction flows back to the agent, which streams updates. Two properties matter here: rendering is **declarative data, not executable code**, and the renderable surface is **constrained to a pre-approved component catalog**. As of this scan: **v0.8** is the stable release (surfaces, components, data binding); **v0.9** is in draft; Apache-2.0 licensed. *Requires validation* — versions and message-type names move.

The architecture as the team sketched it (server side: `Agent → A2UI Generator → Transport (SSE/WS/A2A)`; client side: `Client (Stream Reader) → Message Parser → Renderer → Native UI`) matches this. The accompanying data-flow names the message types worth noting: **`surfaceUpdate`** (component definitions), **`dataModelUpdate`** (the data the surface binds to), **`beginRendering`** (an explicit render signal that prevents a flash of incomplete content), and **`userAction`** (interaction sent back to the server, over a separate A2A message in that sketch). *Requires validation against the current A2UI spec.*

### 2.2 AG-UI (Agent-User Interaction Protocol)

An *"open, lightweight, event-based protocol that standardizes how AI agents connect to user-facing applications,"* originated by **CopilotKit** with LangGraph and CrewAI, now open and community-supported.[^agui-docs] [^agui-ms] Bi-directional **event streaming** over standard web transports (HTTP, WebSockets); ~16 building blocks including streaming chat, **generative UI (static and declarative)**, shared state, tool calls, and interrupts. AG-UI positions itself in a protocol triad: **MCP** connects agents to tools/data, **A2A** connects agents to agents, and **AG-UI** connects the **agent to the user**. Marked "Supported" across many agent frameworks (LangGraph, CrewAI, Microsoft Agent Framework, Google ADK, Mastra, Pydantic AI). It is more an event/transport standard than a component model — it standardizes *how* UI events stream, leaving *what* renders to the application.

### 2.3 MCP Apps

An extension to the **Model Context Protocol** that lets MCP servers return *"interactive HTML interfaces (data visualizations, forms, dashboards) that render directly in the chat"* inside MCP hosts such as **Claude and Claude Desktop**.[^mcpapps] [^mcpapps-spec] A tool declares a UI resource (`_meta.ui.resourceUri` pointing to a `ui://` resource); the host fetches it and renders it in a **sandboxed iframe** inside the conversation; the app and host communicate bidirectionally over a `postMessage` JSON-RPC dialect (`ui/` methods). This is the "return the whole dashboard in the MCP response and Claude renders it in a side-panel" idea, made precise. Two properties matter here, and they cut the other way from A2UI: the renderable surface is **free-form HTML in an iframe**, not a pre-approved component catalog; and the default data flow routes **tool results through the agent** (`server → agent → app`), which has a direct bearing on §5. Supported today by Claude, Claude Desktop, VS Code GitHub Copilot, Goose, and others; an extension to core MCP, so host support varies. *Requires validation — the spec (dated 2026-01-26 in the published examples) is evolving.*

### 2.4 The axis that matters

| | What the agent emits | What the client renders | Branding / governance leverage |
|---|---|---|---|
| **A2UI** | declarative JSON surface | **native widgets from a pre-approved registry** | **High** — the catalog and its styling are controlled, not the model |
| **AG-UI** | UI events (incl. generative UI) | application-defined | Medium — depends on the app's component layer |
| **MCP Apps** | a `ui://` HTML resource | **free-form HTML in a sandboxed iframe** | Lower by default — HTML is arbitrary unless the server constrains it |

The single most useful observation in this scan: **A2UI's "pre-approved Widget Registry" is the model that fits Embeddable's strengths most directly.** A registry of governed, token-styled, accessible components is precisely what `remarkable-ui`/`remarkable-pro` already are. The MCP Apps "arbitrary HTML in an iframe" model can deliver the same outcome, but only if the *server author* supplies the constrained, branded component layer — which is exactly the gap Embeddable would fill.

---

## 3. Why this extends Pillar 2 rather than replacing it

[16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) frames AI as an assistant to the **builder**: a user describes a dashboard, the model produces a declarative spec from intent + schema + design tokens, and the host renders and executes it (16 §10). That is a **build-time** act, and the resulting dashboard is a persistent artifact rendered in the host product.

Agent-native rendering is the **runtime** counterpart: the dashboard (or a single chart) is generated and rendered *live, in conversation, inside the agent surface*. The two share one spine:

- **Same thesis on output.** 16 §9 already argues the win is native-looking output composed only from the host's design tokens — *"the AI cannot emit free-form pixels; it can only compose token-compliant outputs."* That argument is *stronger*, not weaker, when the surface is an agent: an unbranded, foreign-looking chart in a Claude side-panel is exactly the "generic, not branded enough" outcome the team flagged.
- **Same component substrate.** The 666-token, three-layer design system and the component libraries are the branding mechanism in both cases.
- **Same buyer.** The regulated buyer who will not expose data to a model in the builder will not expose it at runtime either. The isolation contract is the through-line.
- **A seed already exists.** The "AI chat" capability described across the sector landing pages — *"users ask in plain language and get a text answer plus a chart … the model sees the question and the schema; the model never sees the records"* — is the same interaction pattern, today rendered into the host's canvas. Agent-native rendering is that pattern with a different rendering target.

So this is an *extension of the same position to a new surface*, governed by the same discipline — not a competing bet.

---

## 4. Architectural fit

The libraries' existing shape maps onto the A2UI model with little conceptual friction. (See [06 — Repository Technical Analysis](./06-repository-technical-analysis.md) for the underlying audit.)

| Agent-rendering concept (A2UI terms) | Existing Remarkable asset | Fit |
|---|---|---|
| **Widget Registry** (pre-approved component catalog) | `remarkable-ui`/`remarkable-pro` components, each with a declarative `meta` in `definition.ts` (inputs, events, props) | **Strong** — the library *is* a governed catalog; A2UI renders native React among its targets |
| **`surfaceUpdate`** (declarative component tree) | the declarative dashboard spec already described in 16 §10 (chart types, layout, filters) | **Strong** — same declarative-spec shape |
| **`dataModelUpdate`** (data the surface binds to) | data fetched via the host runtime's `loadData(LoadDataRequest) → DataResponse` path | **Conditional** — fits *only if the host, not the model, sources it* (see §5) |
| **Data binding** (resolved client-side) | inputs + load results → component props mapping in `definition.ts` | **Strong** — render and data are already separated |
| **`userAction`** (interaction → server) | component events (e.g. `onSegmentClick`) mapped to Embeddable event payloads | **Strong** — interaction model already exists |
| **Design-token styling** of rendered widgets | the 666-token, three-layer (core / semantic / component) CSS-variable system | **Strong** — the brand mechanism the surface needs |
| **Audit of agent-driven actions** | the planned `onAuditEvent` hook (Phase 3 of [11 — Technical Roadmap](./11-technical-roadmap.md)) | **Strong** — the same enforcement point |

The reframing from [16 §3](./16-ai-bridge-positioning.md) applies again: what once looked like a minimal feature set is the architectural advantage. A component library with a declarative per-component contract, host-delegated data, no outbound calls, and a token system is close to a drop-in "branded Widget Registry" for an agent surface.

---

## 5. The critical reconciliation — the data path

This is the one place where the agent-rendering surface can *contradict* the position rather than extend it, and it must be stated plainly.

Pillar 2's load-bearing promise is **"the model never saw the rows"** (16 §10, step 5). The agent frameworks, as commonly drawn, push data through the agent:

- In **A2UI**, the agent generates both `surfaceUpdate` *and* `dataModelUpdate` — so in the naive flow, the actual data is produced on the agent/server side.
- In **MCP Apps**, the default flow is explicitly `server → agent → app`: tool results pass through the agent before reaching the rendered app, which means **the rows can enter the model's context**.

Left unconstrained, either flow would put the model in the data path — the precise thing the regulated buyer will not approve, and the precise thing [16 §A2](./16-ai-bridge-positioning.md) flags as the weakness of competitor MCP framing ("extensibility, not isolation").

The reconciliation is the same architectural move the build-time bridge already makes, applied to the transport:

1. **The agent emits the surface/spec only** — the component tree (`surfaceUpdate`), composed from the pre-approved registry and the token vocabulary. The model produces *structure*, not *data*.
2. **The host resolves the data inside its own tenancy** — `dataModelUpdate` is filled by the host runtime's authenticated, audit-logged `loadData` path, and bound into the rendered widget **without the rows passing through the model's context**. In MCP-Apps terms, that means delivering data to the sandboxed app directly rather than as model-visible tool output; in A2UI terms, sourcing `dataModelUpdate` host-side rather than agent-side.
3. **Every agent-driven render emits an audit event** via `onAuditEvent`, so the action lands in the host's SIEM.

Held this way, the surface is not just compatible with the isolation contract — it *is* the isolation contract, extended to a new rendering target. And it is a differentiator: the raw A2UI / MCP-Apps story has no data-isolation position, which is the same open quadrant [16 §5](./16-ai-bridge-positioning.md) identifies. Embeddable would be the layer that makes "analytics in the agent" safe to put in front of a CISO.

> **Language discipline (per [README](./README.md) and [16](./16-ai-bridge-positioning.md)).** Do not say "AI-safe rendering" or "private agent UI." Say *AI-isolated by architecture* (host-owned data path + audit hooks), *the agent renders the surface; the host owns the data*, and *requires validation against the target framework's data-flow*.

---

## 6. What is net-new

Everything in §4 is reuse. The genuinely new work is the **rendering surface and its transport** — Embeddable has no agent-facing renderer today; the libraries render into the *host product's* React tree, not into an agent host. A scoped build would need:

- **An agent-renderable catalog adapter** — expose `remarkable-ui`/`remarkable-pro` components as a Widget Registry an agent client can instantiate (A2UI), or as a constrained, token-styled component layer inside an MCP-Apps `ui://` resource. The per-component `meta` in `definition.ts` is the natural source of the registry manifest.
- **A transport binding** — consume `surfaceUpdate` over the relevant channel (A2A / SSE / WebSocket for A2UI or AG-UI; the `ui://` resource + `postMessage` JSON-RPC for MCP Apps), and round-trip `userAction`.
- **A host-owned data resolver** — the §5 mechanism: bind `dataModelUpdate` from the host's `loadData` path without routing rows through the model.
- **Accessibility parity at the new surface** — the chart-data-table fallback and ARIA work planned in [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) must carry into the agent-rendered output; an inaccessible chart in an agent panel fails the same WCAG criteria as one in a browser.

This is an *additive surface*, not a re-architecture of either library.

---

## 7. Implications for the roadmap

[16 §14](./16-ai-bridge-positioning.md) states the build-time AI-bridge pillar "does not need a new phase" — it lands on the existing four-phase plan in [11 — Technical Roadmap](./11-technical-roadmap.md). That remains true *for the build-time pillar*. **Agent-native rendering is the thing that would add a phase** — a runtime delivery workstream that depends on, but sits beyond, the current plan.

It should not be started until its prerequisites are met, because they are the same prerequisites that gate everything else:

- **Phase 1 (Accessibility AA)** must be in hand first — the chart-a11y pattern is a prerequisite for any new rendering target, not an afterthought.
- **Phase 3 (`onAuditEvent`, `clientContext.permissions`)** is the isolation-enforcement point the §5 reconciliation depends on.
- The **AI-isolation contract** ([16 §10](./16-ai-bridge-positioning.md)) must be published, because it is the artifact that makes the agent surface sellable to the regulated buyer.

A reasonable sequencing: treat this as a **post-Phase-3 exploratory spike** — a thin prototype against whichever framework has stabilized (A2UI's Widget Registry model is the closest architectural fit; MCP Apps has the largest installed host base via Claude). Decide on evidence from the spike, not from the hype cycle.

---

## 8. Risks (positioning lens)

Extends the registers in [04 §10](./04-product-opportunity-and-positioning.md) and [16 §15](./16-ai-bridge-positioning.md).

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Standards immaturity / churn** — A2UI (v0.8/v0.9), AG-UI, and MCP Apps are all early and moving; building too early means rework | High | Medium | Keep it an exploratory spike, not a committed build. Target the declarative-registry seam (most stable conceptually). Re-validate spec versions before any commit. |
| R2 | **Model-in-data-path leak** — naive A2UI/MCP-Apps flows route rows through the agent, breaking the isolation contract | Medium | High | The §5 reconciliation is mandatory: agent emits surface only; host resolves data in-tenancy; audit every render. Treat as a hard acceptance gate. |
| R3 | **Agent-host fragmentation** — A2UI, AG-UI, MCP Apps, and proprietary agent UIs may not converge; multiple adapters | Medium | Medium | Build the catalog/data layer once behind a thin transport seam; add bindings per surface as demand proves out. Don't pre-build for all three. |
| R4 | **Accessibility regression at the new surface** — an agent-rendered chart that skips the data-table fallback fails WCAG just as a browser one would | Medium | High | Carry the Phase 1 chart-a11y pattern into the adapter as a non-negotiable; test the rendered output with AT, not just the browser components. |
| R5 | **Overclaim / "AI-washing"** — "branded AI analytics" read as marketing | Medium | High | Same discipline as Pillar 1 and Pillar 2: lead with architecture (token registry, host-owned data, audit hooks), not adjectives. |
| R6 | **Browser embedding deprioritized** — chasing the agent surface starves the lead position | Low–Medium | Medium | This is explicitly a *scan*, not a pivot. Browser embedding stays the lead; agent rendering is gated behind Phase 3. |

---

## 9. Open questions

- Which framework does Embeddable validate first — **A2UI** (best architectural fit via the Widget Registry) or **MCP Apps** (largest installed host base via Claude today)?
- Is the agent surface a **runtime delivery channel for dashboards built in the host**, a **live conversational generation** surface, or both?
- Does the §5 host-owned data resolver hold cleanly inside an MCP-Apps iframe and an A2UI client, given each framework's data-flow defaults? (*requires a prototype to answer*)
- Does the corporate AI/model-hosting decision (open question in [16](./16-ai-bridge-positioning.md)) change the answer — e.g. does a BYO-model-in-tenant deployment make the agent surface easier to isolate?
- Have any customers actually asked for analytics rendered in an agent surface, or is this anticipatory? (Demand signal should gate the spike.)

---

## 10. Recommended next steps

1. **Treat this as a scan, not a commitment.** Keep browser embedding the lead; revisit this surface after Phase 3.
2. **Publish the AI-isolation contract first** ([16 §10](./16-ai-bridge-positioning.md)) — it is the prerequisite artifact for *any* AI surface, build-time or runtime.
3. **When ready, run a thin prototype** against the declarative-registry seam (A2UI Widget Registry first; MCP Apps as the host-reach option), proving the §5 host-owned data path end-to-end.
4. **Carry accessibility into the adapter from day one** — the Phase 1 chart-a11y pattern is a gate, not a follow-up.
5. **Gate on a real demand signal** — confirm a customer or prospect actually wants analytics in an agent surface before scoping the build.

---

## Key takeaways

- The team's "analytics rendered branded inside the agent" idea is **the runtime delivery counterpart to the build-time AI bridge** in [16](./16-ai-bridge-positioning.md) — strongly aligned in thesis, not a competing bet.
- The Remarkable libraries map cleanly onto **A2UI's pre-approved Widget Registry** model: a governed, token-styled, declarative component catalog is exactly what they are.
- The frameworks differ on how much they constrain rendering: **A2UI (declarative registry)** fits Embeddable's strengths best; **MCP Apps (free-form HTML in an iframe)** has the largest host reach but needs the server to supply the constrained component layer — which is Embeddable's opening.
- The one hard constraint is the **data path**: agent emits the surface, the host resolves the data in-tenancy, the model never sees the rows. Held that way, the surface *is* the isolation contract extended — and a differentiator, since raw A2UI/MCP-Apps has no isolation story.
- It is **net-new scope** (an agent-facing rendering surface + transport), gated behind Phase 1 accessibility and Phase 3 audit/permissions. Best treated as a **post-Phase-3 exploratory spike**, decided on prototype evidence and a real demand signal.

---

## Related documents

- [16 — AI-Bridge Positioning](./16-ai-bridge-positioning.md) — the build-time pillar this document extends to runtime
- [00 — The Two Pillars](./00-the-two-pillars.md) — plain-English entry point above both pillars
- [06 — Repository Technical Analysis](./06-repository-technical-analysis.md) — the `definition.ts`/`meta` and design-token evidence behind §4
- [09 — Accessibility Readiness Plan](./09-accessibility-readiness-plan.md) — the chart-a11y pattern that must carry to the new surface
- [11 — Technical Roadmap](./11-technical-roadmap.md) — the four phases this workstream sits beyond
- [13 — Glossary](./13-glossary.md) — MCP and related definitions

---

## Citations

[^a2ui]: A2UI project site, Google with CopilotKit and the open-source community, <https://a2ui.org/>. Architecture, "Widget Registry" / "pre-approved component catalog," declarative-data model, and v0.8 (stable) / v0.9 (draft) status retrieved 31 May 2026; versions and message-type names are subject to change.
[^agui-docs]: AG-UI documentation, "Introduction," <https://docs.ag-ui.com/introduction>. "Open, lightweight, event-based protocol"; MCP / A2A / AG-UI protocol triad; ~16 building blocks. Retrieved 31 May 2026.
[^agui-ms]: Microsoft Community Hub, "AG-UI: The Future of Agent-Driven User Interfaces," <https://techcommunity.microsoft.com/blog/appsonazureblog/ag-ui-the-future-of-agent-driven-user-interfaces/4515769>.
[^mcpapps]: Model Context Protocol, "MCP Apps" overview, <https://modelcontextprotocol.io/extensions/apps/overview>. `_meta.ui.resourceUri` / `ui://` resource, sandboxed-iframe rendering, `server → agent → app` data flow, host support. Retrieved 31 May 2026.
[^mcpapps-spec]: MCP Apps extension specification and examples (dated 2026-01-26 in the published spec path), <https://apps.extensions.modelcontextprotocol.io>. Extension to core MCP; host support varies; spec evolving.
