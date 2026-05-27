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
  children: ComponentBounds[];
};

export const extractBoundingBoxes = async (
  page: Page
): Promise<ComponentBounds[]> =>
  page.evaluate(() => {
    const w = window as Window & { __cssPath?: (el: Element) => string };
    const cssPath = w.__cssPath!;

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
