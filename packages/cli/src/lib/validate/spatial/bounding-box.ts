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

    // A collapsed Disclosure panel keeps full bounding boxes inside a [hidden]
    // container Marigold styles height:0, so its descendants would measure as
    // overlapping while nothing is visible. Neither display:none nor [hidden]
    // can be overridden by a descendant, so both subtrees are safe to skip
    // outright; once expanded, the panel is measured normally.
    //
    // aria-hidden is deliberately NOT treated as hidden: it's an
    // accessibility-tree signal, so such an element can still be visible and
    // genuinely overlap a sibling.
    const isRenderSuppressed = (el: Element): boolean => {
      const style = window.getComputedStyle(el);
      return style.display === 'none' || el.hasAttribute('hidden');
    };

    // Unlike display:none, visibility:hidden is overridable: a descendant can
    // set visibility:visible and render again. So the element is excluded but
    // its subtree is still walked.
    const isInvisible = (el: Element): boolean =>
      window.getComputedStyle(el).visibility === 'hidden';

    const walk = (root: Element): ComponentBounds[] => {
      const result: ComponentBounds[] = [];
      for (const child of Array.from(root.children)) {
        if (isRenderSuppressed(child)) continue;
        const childResults = walk(child);
        if (isInteresting(child) && !isInvisible(child)) {
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
