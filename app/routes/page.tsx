import {
  createDocsModel,
  findDocsPage,
  findOpenApiEndpoint,
} from "@heyo-sh/heyo-docs/model";
import { redirect, type LoaderFunctionArgs } from "react-router";

import config from "../../heyo-docs-docs.config";
import { pages } from "virtual:heyo-docs-content";
import { openApiEndpoints } from "virtual:heyo-docs-openapi/index";

export function loader({ params }: LoaderFunctionArgs) {
  const path = params["*"]?.replace(/^\/+|\/+$/g, "");
  const pathname = path ? `/${path}` : "/";
  const model = createDocsModel(config, pages, [], openApiEndpoints);

  if (
    findDocsPage(model.pages, pathname) ||
    findOpenApiEndpoint(model.endpoints, pathname)
  )
    throw redirect(`/heyo-docs${pathname}`);

  throw new Response("Not Found", { status: 404 });
}
