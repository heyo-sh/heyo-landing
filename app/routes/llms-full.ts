import { llmsFull } from "@heyo-sh/heyo-docs/llm";
import type { LoaderFunctionArgs } from "react-router";

import { documentationSite } from "../lib/documentation-sites";

/** The complete corpus for the documentation site named in the URL prefix. */
export function loader({ params, request }: LoaderFunctionArgs) {
  const site = documentationSite(params.docsSite);
  if (!site)
    return new Response("Not Found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });

  const siteUrl = params.docsSite
    ? new URL(`${site.basePath}/`, request.url).toString()
    : (site.config.siteUrl ?? new URL(request.url).origin);
  return new Response(llmsFull(site.markdownPages, siteUrl), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
