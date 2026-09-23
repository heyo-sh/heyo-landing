import type { Config } from "@react-router/dev/config";
import { documentationPaths } from "@heyo-sh/heyo-docs/node";

import codeAuditConfig from "./heyo-code-audit-docs.config";
import config from "./heyo-docs-docs.config";

/** Cloudflare serves prebuilt docs; the Worker is reserved for request actions. */
export default {
  ssr: true,
  async prerender() {
    const docs = await documentationPaths(process.cwd(), config);
    return [
      ...docs.map((path) => `/heyo-docs${path}`),
      ...(await documentationPaths(process.cwd(), codeAuditConfig)).map(
        (path) => `/heyo-code-audit${path}`,
      ),
      "/robots.txt",
      "/sitemap.xml",
      "/rss.xml",
      "/llms.txt",
      "/llms-full.txt",
      "/heyo-docs/llms.txt",
      "/heyo-docs/llms-full.txt",
      "/heyo-code-audit/llms.txt",
      "/heyo-code-audit/llms-full.txt",
    ];
  },
} satisfies Config;
