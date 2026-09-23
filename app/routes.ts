import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("robots.txt", "routes/robots.ts"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("rss.xml", "routes/rss.ts"),
  route("llms.txt", "routes/llms.ts"),
  route("llms-full.txt", "routes/llms-full.ts"),
  route(":docsSite/llms.txt", "routes/llms.ts", {
    id: "routes/llms-site",
  }),
  route(":docsSite/llms-full.txt", "routes/llms-full.ts", {
    id: "routes/llms-full-site",
  }),
  route(":docsSite/__heyo-docs/markdown/*", "routes/markdown.ts"),
  route("heyo-docs-internal/openapi-request", "routes/openapi-request.ts"),
  route("heyo-docs-internal/ai-chat", "routes/ai-chat.ts"),
  route("heyo-docs/*", "routes/docs.tsx"),
  route("heyo-code-audit/*", "routes/docs-code-audit.tsx"),
  route("*", "routes/page.tsx"),
] satisfies RouteConfig;
