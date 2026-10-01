import codeAuditConfig from "../../heyo-code-audit-docs.config";
import docsConfig from "../../heyo-docs-docs.config";
import uiConfig from "../../heyo-ui-docs.config";
import { pages as codeAuditMarkdownPages } from "virtual:heyo-docs-code-audit-content/server";
import { pages as codeAuditPages } from "virtual:heyo-docs-code-audit-content";
import { openApiDocuments as codeAuditOpenApiDocuments } from "virtual:heyo-docs-code-audit-openapi";
import { pages as docsMarkdownPages } from "virtual:heyo-docs-content/server";
import { pages as docsPages } from "virtual:heyo-docs-content";
import { openApiDocuments as docsOpenApiDocuments } from "virtual:heyo-docs-openapi";
import { pages as uiMarkdownPages } from "virtual:heyo-docs-ui-content/server";
import { pages as uiPages } from "virtual:heyo-docs-ui-content";
import { openApiDocuments as uiOpenApiDocuments } from "virtual:heyo-docs-ui-openapi";

export const documentationSites = {
  "heyo-docs": {
    basePath: "/heyo-docs",
    config: docsConfig,
    markdownPages: docsMarkdownPages,
    openApiDocuments: docsOpenApiDocuments,
    pages: docsPages,
  },
  "heyo-code-audit": {
    basePath: "/heyo-code-audit",
    config: codeAuditConfig,
    markdownPages: codeAuditMarkdownPages,
    openApiDocuments: codeAuditOpenApiDocuments,
    pages: codeAuditPages,
  },
  "heyo-ui": {
    basePath: "/heyo-ui",
    config: uiConfig,
    markdownPages: uiMarkdownPages,
    openApiDocuments: uiOpenApiDocuments,
    pages: uiPages,
  },
} as const;

type DocumentationSiteId = keyof typeof documentationSites;

export function documentationSite(id: string | undefined) {
  if (!id) return documentationSites["heyo-docs"];
  return Object.hasOwn(documentationSites, id)
    ? documentationSites[id as DocumentationSiteId]
    : undefined;
}
