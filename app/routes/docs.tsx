import { DocsApp } from "@heyo-sh/heyo-docs";
import {
  createDocsModel,
  findDocsPage,
  findOpenApiEndpoint,
} from "@heyo-sh/heyo-docs/model";
import { changelogGroupForPage } from "@heyo-sh/heyo-docs/navigation";
import { openApiEndpointDetail } from "@heyo-sh/heyo-docs/openapi";
import { docsSeoMeta } from "@heyo-sh/heyo-docs/seo/react-router";
import { heyoTheme } from "@heyo-sh/heyo-docs/theme/heyo";
import { useDocsTheme } from "@heyo-sh/heyo-docs/theme/provider";
import type { OpenApiEndpoint } from "@heyo-sh/heyo-docs/types";
import {
  Link,
  useLoaderData,
  useParams,
  type ClientLoaderFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { docsMdxComponents } from "../components/docs-mdx-components";
import { preloadDocsPage } from "../lib/preload-docs-page";
import { iconSet } from "../heyo-docs-icons";
import { config } from "virtual:heyo-docs-config";
import { pages } from "virtual:heyo-docs-content";
import { openApiDocuments } from "virtual:heyo-docs-openapi";
import { openApiEndpoints } from "virtual:heyo-docs-openapi/index";

const DOCS_BASE_PATH = "/heyo-docs";

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

export async function loader({ params }: LoaderFunctionArgs) {
  const pathname = pathnameFor(params);
  const model = createDocsModel(config, pages, [], openApiEndpoints);
  const page = findDocsPage(model.pages, pathname);
  const endpoint = findOpenApiEndpoint(model.endpoints, pathname);
  if (!page && !endpoint) throw new Response("Not Found", { status: 404 });

  if (!endpoint) return {};

  // This loader runs on the server, including during prerendering, so the
  // operation's full data is serialised with the route. First paint and every
  // client transition therefore start from the complete API reference.
  const serverModel = createDocsModel(config, pages, openApiDocuments);
  const currentOpenApiEndpoint = findOpenApiEndpoint(
    serverModel.endpoints,
    pathname,
  );
  return {
    currentOpenApiEndpoint: currentOpenApiEndpoint
      ? (openApiEndpointDetail(currentOpenApiEndpoint) as OpenApiEndpoint)
      : undefined,
  };
}

/**
 * Loads the page's MDX chunk before the new route is displayed. Loaders run on
 * the server, so the browser needs its own step to keep the current page
 * on screen until the next one can be rendered in full.
 */
export async function clientLoader({
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) {
  const model = createDocsModel(config, pages, [], openApiEndpoints);
  const page = findDocsPage(model.pages, pathnameFor(params));
  const [data] = await Promise.all([
    serverLoader<Awaited<ReturnType<typeof loader>>>(),
    preloadDocsPage(page),
  ]);
  return data;
}

export const meta: MetaFunction = ({ params }) => {
  const model = createDocsModel(config, pages, [], openApiEndpoints);
  const pathname = pathnameFor(params);
  const page = findDocsPage(model.pages, pathname);
  const endpoint = findOpenApiEndpoint(model.endpoints, pathname);
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
    navigation: model.navigation,
    changelogGroup: page
      ? changelogGroupForPage(config.groups, page, model.pages)
      : undefined,
  });
};

export default function DocsRoute() {
  const { currentOpenApiEndpoint } = useLoaderData<typeof loader>();
  return (
    <DocsShell
      currentOpenApiEndpoint={currentOpenApiEndpoint}
      pathname={pathnameFor(useParams())}
    />
  );
}

function DocsShell({
  currentOpenApiEndpoint,
  pathname,
}: {
  currentOpenApiEndpoint?: OpenApiEndpoint;
  pathname: string;
}) {
  const { mounted, resolvedTheme, toggleTheme } = useDocsTheme();

  return (
    <DocsApp
      config={config}
      currentOpenApiEndpoint={currentOpenApiEndpoint}
      iconSet={iconSet}
      link={RouterLink}
      mdxComponents={docsMdxComponents}
      openApiEndpoints={openApiEndpoints}
      openApiRequestUrl="/heyo-docs-internal/openapi-request"
      pages={pages}
      pathname={pathname}
      theme={heyoTheme}
      isDark={mounted ? resolvedTheme === "dark" : undefined}
      onThemeToggle={mounted ? toggleTheme : undefined}
    />
  );
}

export function ErrorBoundary() {
  return <DocsShell pathname="/__not-found" />;
}
