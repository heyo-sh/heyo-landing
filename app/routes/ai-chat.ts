import type { ActionFunctionArgs } from "react-router";

import { cloudflareContext } from "../lib/cloudflare-context";
import { documentationSite } from "../lib/documentation-sites";

export async function action({ context, request }: ActionFunctionArgs) {
  if (request.method !== "POST")
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  // The chat client posts to one shared endpoint. Use the same-origin page
  // that opened it to choose the right documentation context.
  const referer = request.headers.get("referer");
  const source = referer && URL.canParse(referer) ? new URL(referer) : undefined;
  if (!source || source.origin !== new URL(request.url).origin)
    return Response.json(
      { error: "AI chat requires a same-origin documentation page." },
      { status: 400 },
    );
  const site = documentationSite(source.pathname.split("/")[1]);
  if (
    !site ||
    (source.pathname !== site.basePath &&
      !source.pathname.startsWith(`${site.basePath}/`))
  )
    return Response.json(
      { error: "Documentation site not found." },
      { status: 404 },
    );
  if (!site.config.ai?.chat)
    return Response.json(
      { error: "AI chat is not configured." },
      { status: 404 },
    );
  const token = context.get(cloudflareContext).HEYO_DOCS_AI_API_KEY;
  const { createAiChatResponse } = await import("@heyo-sh/heyo-docs/ai");
  return createAiChatResponse(request, {
    ai: {
      ...site.config.ai,
      chat: {
        ...site.config.ai.chat,
        ...(site.config.ai.chat.auth || !token
          ? {}
          : { auth: { type: "api-key" as const, token } }),
      },
    },
    markdownPages: site.markdownPages,
    pages: site.pages,
    title: site.config.title,
  });
}
