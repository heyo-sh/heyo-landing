# Heyo Landing

React Router and Cloudflare Workers site hosting independent documentation for
Heyo products.

## Documentation sites

| URL prefix          | Configuration                    | Content                    |
| ------------------- | -------------------------------- | -------------------------- |
| `/heyo-docs/`       | `heyo-docs-docs.config.ts`       | `content/heyo-docs/`       |
| `/heyo-code-audit/` | `heyo-code-audit-docs.config.ts` | `content/heyo-code-audit/` |
| `/heyo-ui/`         | `heyo-ui-docs.config.ts`         | `content/heyo-ui/`         |

Each site has its own Heyo Docs configuration, page model, sidebar, metadata,
and prerendered paths. `app/lib/scoped-heyo-docs-vite.ts` namespaces every
additional Vite adapter instance because the upstream adapter's virtual module
IDs are global. `app/lib/documentation-sites.ts` is the shared registry used by
the Markdown, LLM, and sitemap resource routes. Do not combine the content
directories or configurations: that would make one product's pages appear in
the other product's navigation.

## Component previews (`/heyo-ui/`)

The heyo-ui site renders live previews of `@heyo-sh/heyo-ui`, which is a second
design system inside the same document. Two files make that safe:

- `app/components/heyo-ui-mdx-components.tsx` registers every component with a
  `HeyoUi` prefix, so a library component can never replace a documentation
  component of the same name (`Button`, `Badge`, `CodeBlock`, `Tabs`, `Tree`).
  Snippets shown to readers always use the real, unprefixed name.
- `app/theme.css` is the project's single Tailwind entry. heyo-ui redefines
  Tailwind's global scales (14px body text, 8px radii, its own font stack);
  the file hands those back to the documentation theme and re-applies heyo-ui's
  values scoped to `.heyo-ui` preview containers and to the popups the library
  portals to `document.body`. Add a preview with
  `<CodeSnippet previewClassName="heyo-ui">`.

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
