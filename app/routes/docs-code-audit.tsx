import { DocsApp } from "@heyo-sh/heyo-docs";
import {
  createDocsModel,
  findDocsPage,
  findOpenApiEndpoint,
} from "@heyo-sh/heyo-docs/model";
import { changelogGroupForPage } from "@heyo-sh/heyo-docs/navigation";
import { docsSeoMeta } from "@heyo-sh/heyo-docs/seo/react-router";
import { grainTheme } from "@heyo-sh/heyo-docs/theme/grain";
import { useDocsTheme } from "@heyo-sh/heyo-docs/theme/provider";
import {
  Link,
  redirect,
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { docsMdxComponents } from "../components/docs-mdx-components";
import { iconSet } from "../heyo-docs-icons";
import { config } from "virtual:heyo-docs-code-audit-config";
import { pages } from "virtual:heyo-docs-code-audit-content";
import { openApiEndpoints } from "virtual:heyo-docs-code-audit-openapi/index";

const DOCS_BASE_PATH = "/heyo-code-audit";

function pathnameFor(params: Record<string, string | undefined>): string {
  const path = params["*"]?.replace(/^\/+|\/+$/g, "");
  return path ? `/${path}` : "/";
}

function docsPath(href: string) {
  if (
    href === "/" ||
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith(DOCS_BASE_PATH)
  )
    return href;

  return `${DOCS_BASE_PATH}${href}`;
}

const RouterLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<"a">>(
  function RouterLink({ href = "/", ...props }, ref) {
    return <Link {...props} ref={ref} to={docsPath(href)} />;
  },
);

function model() {
  return createDocsModel(config, pages, [], openApiEndpoints);
}

export async function loader({ params }: LoaderFunctionArgs) {
  const pathname = pathnameFor(params);
  if (pathname === "/") return redirect(`${DOCS_BASE_PATH}/introduction`);

  const docs = model();
  const page = findDocsPage(docs.pages, pathname);
  const endpoint = findOpenApiEndpoint(docs.endpoints, pathname);
  if (!page && !endpoint) throw new Response("Not Found", { status: 404 });
  return {};
}

export const meta: MetaFunction = ({ params }) => {
  const docs = model();
  const pathname = pathnameFor(params);
  const page = findDocsPage(docs.pages, pathname);
  const endpoint = findOpenApiEndpoint(docs.endpoints, pathname);
  if (!page && !endpoint)
    return [
      { title: `Not found | ${config.title}` },
      { name: "robots", content: "noindex" },
    ];

  return docsSeoMeta({
    config,
    pathname,
    page,
    endpoint,
    navigation: docs.navigation,
    changelogGroup: page
      ? changelogGroupForPage(config.groups, page, docs.pages)
      : undefined,
  });
};

export default function CodeAuditDocsRoute() {
  useLoaderData<typeof loader>();
  return <DocsShell pathname={pathnameFor(useParams())} />;
}

function DocsShell({ pathname }: { pathname: string }) {
  const { mounted, resolvedTheme, toggleTheme } = useDocsTheme();

  return (
    <DocsApp
      config={config}
      iconSet={iconSet}
      link={RouterLink}
      mdxComponents={docsMdxComponents}
      openApiEndpoints={openApiEndpoints}
      pages={pages}
      pathname={pathname}
      theme={grainTheme}
      isDark={mounted ? resolvedTheme === "dark" : undefined}
      onThemeToggle={mounted ? toggleTheme : undefined}
    />
  );
}

export function ErrorBoundary() {
  return <DocsShell pathname="/__not-found" />;
}
