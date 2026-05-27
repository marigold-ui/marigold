import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

export type WrappingDetection = {
  containerSelector: string;
  rowCount: number;
  childCount: number;
  containerWidth: number;
  totalChildrenWidth: number;
};

export type OverflowDetection = {
  containerSelector: string;
  overflow: string;
  childrenOverflowX: boolean;
  childrenOverflowY: boolean;
  containerRect: { width: number; height: number };
  maxChildExtent: { right: number; bottom: number };
};

export type OverflowData = {
  wrapping: WrappingDetection[];
  overflows: OverflowDetection[];
};

export const extractOverflowData = async (page: Page): Promise<OverflowData> =>
  page.evaluate(() => {
    const w = window as Window & { __cssPath?: (el: Element) => string };
    const cssPath = w.__cssPath!;

    const wrapping: WrappingDetection[] = [];
    const overflows: OverflowDetection[] = [];

    const allElements = document.body.querySelectorAll('*');
    for (const el of allElements) {
      const style = window.getComputedStyle(el);
      const display = style.display;
      const flexWrap = style.flexWrap;

      const isWrappingFlex =
        display === 'flex' &&
        (flexWrap === 'wrap' || flexWrap === 'wrap-reverse');
      const gridCols = style.gridTemplateColumns;
      const isWrappingGrid =
        display === 'grid' &&
        (gridCols.includes('auto-fit') || gridCols.includes('auto-fill'));

      if (isWrappingFlex || isWrappingGrid) {
        const children = Array.from(el.children);
        if (children.length < 2) continue;

        const rows = new Map<number, number>();
        for (const child of children) {
          const top = Math.round(child.getBoundingClientRect().top);
          rows.set(top, (rows.get(top) ?? 0) + 1);
        }

        if (rows.size > 1) {
          const containerRect = el.getBoundingClientRect();
          let totalWidth = 0;
          for (const child of children) {
            totalWidth += child.getBoundingClientRect().width;
          }
          const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
          totalWidth += gap * (children.length - 1);

          wrapping.push({
            containerSelector: cssPath(el),
            rowCount: rows.size,
            childCount: children.length,
            containerWidth: Math.round(containerRect.width),
            totalChildrenWidth: Math.round(totalWidth),
          });
        }
      }

      const overflowX = style.overflowX;
      const overflowY = style.overflowY;
      const hasClipping =
        overflowX === 'hidden' ||
        overflowX === 'scroll' ||
        overflowY === 'hidden' ||
        overflowY === 'scroll';

      if (hasClipping) {
        const containerRect = el.getBoundingClientRect();
        if (containerRect.width <= 1 || containerRect.height <= 1) continue;
        if (style.visibility === 'hidden' || display === 'none') continue;
        if (el.getAttribute('aria-hidden') === 'true') continue;
        const children = Array.from(el.children);
        if (children.length === 0) continue;

        let maxRight = 0;
        let maxBottom = 0;
        for (const child of children) {
          const r = child.getBoundingClientRect();
          maxRight = Math.max(maxRight, r.right);
          maxBottom = Math.max(maxBottom, r.bottom);
        }

        const clipsX = maxRight > containerRect.right + 1;
        const clipsY = maxBottom > containerRect.bottom + 1;

        if (clipsX || clipsY) {
          overflows.push({
            containerSelector: cssPath(el),
            overflow: style.overflow,
            childrenOverflowX: clipsX,
            childrenOverflowY: clipsY,
            containerRect: {
              width: Math.round(containerRect.width),
              height: Math.round(containerRect.height),
            },
            maxChildExtent: {
              right: Math.round(maxRight - containerRect.left),
              bottom: Math.round(maxBottom - containerRect.top),
            },
          });
        }
      }
    }

    const viewportWidth = window.innerWidth;
    for (const el of allElements) {
      const style = window.getComputedStyle(el);
      if (style.overflowX !== 'visible') continue;
      if (style.visibility === 'hidden' || style.display === 'none') continue;
      if (el.getAttribute('aria-hidden') === 'true') continue;

      const rect = el.getBoundingClientRect();
      if (rect.width <= 1 || rect.height <= 1) continue;
      if (rect.right <= viewportWidth + 1) continue;

      const children = Array.from(el.children);
      if (children.length === 0) continue;

      let maxRight = 0;
      for (const child of children) {
        maxRight = Math.max(maxRight, child.getBoundingClientRect().right);
      }

      if (maxRight > viewportWidth + 1) {
        overflows.push({
          containerSelector: cssPath(el),
          overflow: style.overflow,
          childrenOverflowX: true,
          childrenOverflowY: false,
          containerRect: {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          maxChildExtent: {
            right: Math.round(maxRight - rect.left),
            bottom: Math.round(rect.height),
          },
        });
      }
    }

    return { wrapping, overflows };
  });

export const wrappingToValidationIssues = (
  detections: WrappingDetection[]
): ValidationIssue[] =>
  detections.map(d => ({
    type: 'spatial' as const,
    severity: 'warning' as const,
    source: 'overflow-detector' as const,
    component: d.containerSelector,
    message: `Flex container children are wrapping to ${d.rowCount} rows (${d.childCount} children, container ${d.containerWidth}px wide, content ${d.totalChildrenWidth}px wide).`,
    suggestion:
      'Consider using <Columns collapseAt="..."> for responsive multi-column layout, or <Stack> for vertical arrangement.',
    details: { ...d },
  }));

export const overflowToValidationIssues = (
  detections: OverflowDetection[]
): ValidationIssue[] =>
  detections.map(d => ({
    type: 'spatial' as const,
    severity: 'warning' as const,
    source: 'overflow-detector' as const,
    component: d.containerSelector,
    message: `Content overflows its container (overflow: ${d.overflow}). Container: ${d.containerRect.width}x${d.containerRect.height}px, content extends to ${d.maxChildExtent.right}x${d.maxChildExtent.bottom}px.`,
    suggestion:
      'Ensure content fits within the container. Use responsive sizing or <Columns collapseAt="..."> for layout that adapts to available space.',
    details: { ...d },
  }));
