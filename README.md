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

## Landing page figures

`/` uses Hairline 0.5.0 for its interactive SVG illustrations. The hero uses
`Settle` (the whole hero panel activates it on hover); the community section
uses the landing page's original flickering contribution grid. The
"Open source, always" uses one custom figure, `public/hairline/conduit.js`,
mirrored to frame the text. Its standalone preview, `hairline-conduit.html`,
includes intensity, theme and play controls. The landing page mounts it through
`public/hairline/figure-embed.html`. Earlier `folio.js` and `mixer.js` designs
remain as alternatives with standalone previews. The remaining figures are
selected from `@lucasmarkes/hairline/react`.

The previous hero is kept as an alternative built with the
[hairline-create skill](https://hairline.lucasmarkes.com/skill):
`public/hairline/workbench.js` is its editable source,
`public/hairline/hairline-workbench.html` its standalone preview (with intensity,
theme and play controls), and `public/hairline/workbench-embed.html` its compact
embed. The unchanged upstream `kernel.js` and library are MIT licensed; see
`public/hairline/LICENSE`.

To regenerate a standalone preview after editing its figure's `.js` file, use
the upstream skill's `build.mjs`, `validate.mjs` and `look.mjs` scripts. None of
those scripts or the upstream kernel/bench should be edited locally.

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
