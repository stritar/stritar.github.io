# Industry Landing Pages

Nine landing pages, one per industry. Each one shows how Embeddable's two pillars solve that industry's biggest buying blocker. Written for a high-level non-technical stakeholder — the leader who needs to be convinced to fund or champion this — not a specialist in the industry's regulations.

**Format:** public marketing pages, 60–80 lines each. Embeddable leads in the hero and the pillars. "Remarkable" appears once per page in a parenthetical (e.g. "Embeddable, with the Remarkable component libraries") so technical readers can connect names without forcing the executive to learn a second brand.

## The nine pages

| Industry | File |
|---|---|
| Healthcare | [healthcare.md](./healthcare.md) |
| Financial services | [financial-services.md](./financial-services.md) |
| Public sector | [public-sector.md](./public-sector.md) |
| Energy and critical infrastructure | [energy.md](./energy.md) |
| Pharma and life sciences | [life-sciences.md](./life-sciences.md) |
| Insurance | [insurance.md](./insurance.md) |
| Education and EdTech | [education.md](./education.md) |
| Defense and intelligence | [defense.md](./defense.md) |
| Manufacturing and industrial | [manufacturing.md](./manufacturing.md) |

## The two pillars in one line

1. **Compliance-ready** — components that pass a regulated-industry procurement screen.
2. **AI-built, never AI-exposed** — AI helps build the dashboard, the host owns the data, the two never touch.

Full plain-English explanation in [00 — The Two Pillars](../00-the-two-pillars.md).

## How every page is structured

Use this as a wireframe template. Every page follows the same shape so a reader can jump sideways between industries and feel at home.

1. **Hero** — Headline. One-line subhead. Hero visual.
2. **The problem** — Why this industry can't buy most analytics today.
3. **Pillar 1 — Compliance-ready** — Opening line, then the three Embeddable capabilities re-framed as compliance answers. Visual.
4. **Pillar 2 — AI-built, never AI-exposed** — Opening line on what the model sees vs. never sees, then the same three capabilities re-framed for the AI-isolation lens. Visual.
5. **The scenario** — Short before / after story.
6. **One room, one buyer** — Who's in the procurement meeting, what they ask.
7. **The opportunity** — One-line punchline.
8. **Talk to us** — One-line CTA. Underneath, small text linking sideways to the other eight industry pages.

## The three Embeddable capabilities, in one line each

Both pillars on every page weave through these three:

- **Custom Canvas** — end users build their own dashboards inside your product, from datasets and templates you have already approved.
- **Dashboards as Code** — every dashboard lives as a reviewable, version-controlled file in your codebase.
- **AI chat** — end users ask questions in plain language, get text answers paired with chart visualizations, and save the charts straight to their canvas. Row-level access rules apply to every question; you bring your own model.

Each capability appears in **both** pillar sections on every page — once through the compliance lens, once through the AI-isolation lens.

## Visual notes

Every page has visual suggestions called out inline as `**Visual:**` blocks. They're written in plain language so a designer can sketch them without reading the full doc. The reusable primitives across all nine pages:

- **Two-pillar split** — one diagram, compliance artifacts on the left, AI data flow on the right.
- **Data-flow contract** — what the model sees (intent + schema + tokens) vs. what it never sees (rows + identifiers + regulated data).
- **Procurement-checklist redline** — the documents most vendors miss, crossed out in red; the ones we provide, ticked green.
- **Deadline timeline** — sector regulations marked, "today" plotted.
- **One-room persona panel** — illustrated portraits of the buyers, each annotated with the question they ask.

## Words we don't use

Overclaim kills credibility with regulated buyers. Always under-promise; let the architecture do the talking.

| Never say | Always say |
|---|---|
| "Compliant" | "Compliance-ready" |
| "Private AI" or "AI-safe" | "AI-isolated by architecture" |
| "WCAG conformant" | "WCAG 2.2 AA target" |
| "AI never touches your data" (alone) | "AI-built, never AI-exposed" |
| Acronym-first sentence ("HIPAA-ready", "DORA-aligned") | Consequence-first sentence ("Your privacy office can sign on first read") |

Full language rules in the [docs README](../README.md).

## See also

- [00 — The Two Pillars](../00-the-two-pillars.md) — the source positioning these pages instantiate.
- [04 — Product Opportunity and Positioning](../04-product-opportunity-and-positioning.md) — buyer personas per sector.
- [16 — AI-Bridge Positioning](../16-ai-bridge-positioning.md) — Pillar 2 in depth.
