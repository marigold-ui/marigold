import type * as PageTree from 'fumadocs-core/page-tree';
import type { LoaderPlugin } from 'fumadocs-core/source';

/** Page tree item with optional badge (set by badgePlugin from frontmatter). */
export type ItemWithBadge = PageTree.Item & { badge?: string };

/**
 * Plugin to add frontmatter `badge` to page tree items for sidebar display.
 * Add `badge: <value>` in page frontmatter (e.g. "new", "beta", "alpha", "updated", "deprecated").
 *
 * Stores the badge as a string on the node so the tree stays serializable when passed from
 * Server to Client. Render the badge in SidebarFolder from item.index?.badge (or child item.badge).
 */
export function badgePlugin(): LoaderPlugin {
  return {
    name: 'marigold:sidebar-badge',
    transformPageTree: {
      file(node, filePath) {
        if (!filePath) return node;

        const file = this.storage.read(filePath);
        if (file?.format !== 'page') return node;

        const data = file.data as Record<string, unknown>;
        const badge =
          typeof data?.badge === 'string'
            ? data.badge
            : typeof data?.status === 'string'
              ? data.status
              : undefined;

        if (badge) {
          (node as ItemWithBadge).badge = badge;
        }

        return node;
      },
    },
  };
}
