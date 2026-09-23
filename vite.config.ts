import { fileURLToPath } from "node:url";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { heyoDocs } from "@heyo-sh/heyo-docs/vite";

import codeAuditConfig from "./heyo-code-audit-docs.config.ts";
import config from "./heyo-docs-docs.config.ts";
import { scopedHeyoDocs } from "./app/lib/scoped-heyo-docs-vite.ts";
import { platformPlugins, platformViteConfig } from "./platform.vite.ts";

export default defineConfig({
  ...platformViteConfig,
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
  ],
});
