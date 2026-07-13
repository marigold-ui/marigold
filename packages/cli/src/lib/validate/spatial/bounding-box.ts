import type { Page } from 'playwright';

export type BoxRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ComponentBounds = {
  component: string;
  selector: string;
  rect: BoxRect;
  zIndex: number;
  position: string;
  role: string | null;
  // Computed `transform` value. A non-`none` transform (translate/scale nudge,
  // animation, transform-positioned popper/badge) makes a visual overlap with
  // an anchor intentional, so overlap detection treats it as an overlay.
  transform: string;
  children: ComponentBounds[];
};

export const extractBoundingBoxes = async (
  page: Page
): Promise<ComponentBounds[]> =>
  page.evaluate(() => {
    const mv = (
      window as unknown as {
        __mv: Record<string, (...args: unknown[]) => unknown>;
      }
    ).__mv;
    const cssPath = mv.cssPath as (el: Element) => string;

    const isInteresting = (el: Element): boolean =>
      el.hasAttribute('data-rac') ||
      el.hasAttribute('data-slot') ||
      el.hasAttribute('data-component');

    const componentNameOf = (el: Element): string =>
      el.getAttribute('data-component') ??
      el.getAttribute('data-slot') ??
      el.tagName.toLowerCase();

    const walk = (root: Element): ComponentBounds[] => {
      const result: ComponentBounds[] = [];
      for (const child of Array.from(root.children)) {
        // Skip hidden subtrees. A collapsed Accordion/Disclosure panel renders
        // its content inside a [hidden] container that Marigold styles
        // display:block height:0; the descendants keep full bounding boxes and
        // would be measured as overlapping although nothing is visible. Once the
        // panel is expanded (interaction driver removes [hidden]) it is measured
        // normally, so no real finding is lost.
        if (child.hasAttribute('hidden')) continue;
        const childResults = walk(child);
        if (isInteresting(child)) {
          const r = child.getBoundingClientRect();
          const styles = window.getComputedStyle(child);
          const rawZ = parseInt(styles.zIndex, 10);
          result.push({
            component: componentNameOf(child),
            selector: cssPath(child),
            rect: { x: r.x, y: r.y, width: r.width, height: r.height },
            zIndex: Number.isNaN(rawZ) ? 0 : rawZ,
            position: styles.position,
            role: child.getAttribute('role'),
            transform: styles.transform,
            children: childResults,
          });
        } else {
          for (const c of childResults) result.push(c);
        }
      }
      return result;
    };

    return walk(document.body);
  });

export const flattenBounds = (bounds: ComponentBounds[]): ComponentBounds[] => {
  const out: ComponentBounds[] = [];
  const walk = (list: ComponentBounds[]): void => {
    for (const b of list) {
      out.push(b);
      walk(b.children);
    }
  };
  walk(bounds);
  return out;
};
