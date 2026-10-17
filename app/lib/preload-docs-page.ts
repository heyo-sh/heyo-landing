import type { DocsPage } from "@heyo-sh/heyo-docs/types";

/** The published runtime predates preload; new runtimes expose it per page. */
export async function preloadDocsPage(page: DocsPage | undefined) {
  if (page && "preload" in page && typeof page.preload === "function")
    await page.preload();
}
