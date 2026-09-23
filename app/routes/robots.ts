import type { Route } from "./+types/robots";

import config from "../../heyo-docs-docs.config";

export function loader({ request }: Route.LoaderArgs) {
  const siteOrigin = new URL(config.siteUrl ?? request.url).origin;

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /heyo-docs/__heyo-docs/",
      "Disallow: /heyo-code-audit/__heyo-docs/",
      "",
      `Sitemap: ${siteOrigin}/sitemap.xml`,
      "",
    ].join("\n"),
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}
