/** Cloudflare Worker secret configured with `wrangler secret put`. */
interface Env {
  /** Server-only secret mapped to ai.chat.auth for this site. */
  HEYO_DOCS_AI_API_KEY?: string;
}
