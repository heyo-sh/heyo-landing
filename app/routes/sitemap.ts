import { createDocsModel } from "@heyo-sh/heyo-docs/model";
import { sitemapPaths, sitemapXml } from "@heyo-sh/heyo-docs/seo";
import type { Route } from "./+types/sitemap";

import { documentationSites } from "../lib/documentation-sites";

export function loader({ request }: Route.LoaderArgs) {
  const paths = Object.values(documentationSites).flatMap((site) => {
    const model = createDocsModel(
      site.config,
      site.pages,
      site.openApiDocuments,
    );
    return sitemapPaths(model).map((path) => `${site.basePath}${path}`);
  });
  const siteOrigin = new URL(
    documentationSites["heyo-docs"].config.siteUrl ?? request.url,
  ).origin;

  return new Response(sitemapXml(siteOrigin, paths), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
