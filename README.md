# Heyo Landing

React Router and Cloudflare Workers site hosting independent documentation for
Heyo products.

## Documentation sites

| URL prefix          | Configuration                   | Content                    |
| ------------------- | ------------------------------- | -------------------------- |
| `/heyo-docs/`       | `heyo-docs-docs.config.ts`      | `content/heyo-docs/`       |
| `/heyo-code-audit/` | `heyo-code-audit-docs.config.ts` | `content/heyo-code-audit/` |

Each site has its own Heyo Docs configuration, page model, sidebar, metadata,
and prerendered paths. `app/lib/scoped-heyo-docs-vite.ts` namespaces the second
Vite adapter instance because the upstream adapter's virtual module IDs are
global. `app/lib/documentation-sites.ts` is the shared registry used by the
Markdown, LLM, and sitemap resource routes. Do not combine the content
directories or configurations: that would make one product's pages appear in
the other product's navigation.

## Local development

```bash
bun install
bun run dev
```

## Validation and deployment

```bash
bun run build
bun run typecheck
bun run deploy
```

`bun run deploy` publishes the built Worker and static assets through Wrangler.
