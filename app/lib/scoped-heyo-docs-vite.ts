import { heyoDocs } from "@heyo-sh/heyo-docs/vite";
import type {
  HeyoDocsViteOptions,
  HeyoDocsVitePlugin,
} from "@heyo-sh/heyo-docs/vite";

const VIRTUAL_PREFIX = "virtual:heyo-docs-";
const RESOLVED_PREFIX = "\0";

/**
 * Hosts a second Heyo Docs instance in the same Vite graph. The published
 * adapter exposes fixed virtual module IDs, so every Code Audit module is
 * namespaced before Vite resolves it. Its content, config and sidebar can
 * therefore never be selected by the Heyo Docs routes (or vice versa).
 */
export function scopedHeyoDocs(
  options: HeyoDocsViteOptions & { scope: string },
): HeyoDocsVitePlugin {
  const plugin = heyoDocs({ config: options.config });

  const scopeVirtualId = (id: string) =>
    id.startsWith(VIRTUAL_PREFIX)
      ? `${VIRTUAL_PREFIX}${options.scope}-${id.slice(VIRTUAL_PREFIX.length)}`
      : id;
  const unscopedVirtualId = (id: string) => {
    const prefix = `${VIRTUAL_PREFIX}${options.scope}-`;
    return id.startsWith(prefix)
      ? `${VIRTUAL_PREFIX}${id.slice(prefix.length)}`
      : id;
  };
  const scopeResolvedId = (id: string) =>
    id.startsWith(RESOLVED_PREFIX)
      ? `${RESOLVED_PREFIX}${scopeVirtualId(id.slice(RESOLVED_PREFIX.length))}`
      : scopeVirtualId(id);
  const unscopedResolvedId = (id: string) =>
    id.startsWith(RESOLVED_PREFIX)
      ? `${RESOLVED_PREFIX}${unscopedVirtualId(id.slice(RESOLVED_PREFIX.length))}`
      : unscopedVirtualId(id);

  return {
    ...plugin,
    name: `${plugin.name}:${options.scope}`,
    configResolved(config) {
      plugin.configResolved(config);
    },
    configureServer(server) {
      plugin.configureServer?.(server);
    },
    resolveId(id) {
      if (!id.startsWith(`${VIRTUAL_PREFIX}${options.scope}-`))
        return undefined;
      const resolved = plugin.resolveId(unscopedVirtualId(id));
      return resolved === undefined ? undefined : scopeResolvedId(resolved);
    },
    async load(this: unknown, id) {
      const source = await plugin.load.call(this, unscopedResolvedId(id));
      return source?.replaceAll(
        VIRTUAL_PREFIX,
        `${VIRTUAL_PREFIX}${options.scope}-`,
      );
    },
    handleHotUpdate(context) {
      return plugin.handleHotUpdate?.({
        ...context,
        server: {
          ...context.server,
          moduleGraph: {
            getModuleById(id) {
              return context.server.moduleGraph.getModuleById(
                scopeResolvedId(id),
              );
            },
          },
        },
      });
    },
    generateBundle: plugin.generateBundle,
  };
}
