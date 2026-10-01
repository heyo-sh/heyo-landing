import { fileURLToPath } from "node:url";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { heyoDocs } from "@heyo-sh/heyo-docs/vite";

import codeAuditConfig from "./heyo-code-audit-docs.config.ts";
import config from "./heyo-docs-docs.config.ts";
import uiConfig from "./heyo-ui-docs.config.ts";
import { scopedHeyoDocs } from "./app/lib/scoped-heyo-docs-vite.ts";
import { platformPlugins, platformViteConfig } from "./platform.vite.ts";

/**
 * Dependencies the server renderer needs that Vite's scanner cannot find.
 *
 * Heyo Docs compiles MDX behind `virtual:heyo-docs-*` modules, and the scanner
 * only crawls real files, so the runtime those compiled pages import is
 * invisible until a page is actually rendered. Discovering it mid-request made
 * Vite re-bundle and reload the worker in the middle of a render, which left
 * one half of the tree holding a different React instance from the other — the
 * `Cannot read properties of null (reading 'useContext')` seen on a cold
 * start. Declaring them up front means the optimizer is complete before the
 * first request arrives.
 *
 * The adapter declares the JSX runtime itself from the release after 3.4.0;
 * the rest of this list is the application's own, and the browser half only
 * saves a full reload on a cold cache.
 */
const serverDependencies = [
  "react",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "react-dom",
  "react-dom/server",
  "@base-ui/react",
  "@heyo-sh/heyo-ui",
];

/** The same story in the browser, where a late discovery costs a full reload. */
const browserDependencies = [
  ...serverDependencies.filter((id) => id !== "react-dom/server"),
  "@heyo-sh/heyo-docs",
  "@heyo-sh/heyo-docs/integrations",
  "@heyo-sh/heyo-docs/model",
  "@heyo-sh/heyo-docs/navigation",
  "@heyo-sh/heyo-docs/seo/react-router",
  "@heyo-sh/heyo-docs/theme/heyo",
  "@heyo-sh/heyo-docs/theme/provider",
  "@heyo-sh/heyo-docs/theme/script",
  "@remixicon/react",
  "@base-ui/react/button",
  "class-variance-authority",
  "cn",
];

export default defineConfig({
  ...platformViteConfig,
  environments: {
    client: { optimizeDeps: { include: browserDependencies } },
    ssr: { optimizeDeps: { include: serverDependencies } },
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  plugins: [
    tailwindcss(),
    ...platformPlugins,
    reactRouter(),
    heyoDocs({ config }),
    scopedHeyoDocs({ config: codeAuditConfig, scope: "code-audit" }),
    scopedHeyoDocs({ config: uiConfig, scope: "ui" }),
  ],
});
