import {
  markdownForPage,
  pathnameFromMarkdownPath,
} from "@heyo-sh/heyo-docs/llm";
import type { LoaderFunctionArgs } from "react-router";

import { documentationSite } from "../lib/documentation-sites";

/** Serves Markdown only from the documentation site named in the URL prefix. */
export function loader({ params }: LoaderFunctionArgs) {
  const site = documentationSite(params.docsSite);
  const pagePathname = pathnameFromMarkdownPath(`/${params["*"] ?? ""}`);
  const page = pagePathname
    ? site?.markdownPages.find((candidate) => candidate.slug === pagePathname)
    : undefined;

  if (!page)
    return new Response("Not Found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });

  return new Response(markdownForPage(page), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
