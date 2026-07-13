import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

export type WrappingDetection = {
  containerSelector: string;
  rowCount: number;
  childCount: number;
  containerWidth: number;
  totalChildrenWidth: number;
  // True for grids declared with auto-fit/auto-fill: their reflow to multiple
  // rows is the designed responsive behaviour, not an overflow defect.
  isAutoFitGrid: boolean;
  // A child measuring 0px wide inside a wrapping container is a genuine layout
  // collapse (content vanished), regardless of how many rows are used.
  hasZeroWidthChild: boolean;
};

export type OverflowDetection = {
  containerSelector: string;
  overflow: string;
  overflowX: string;
  overflowY: string;
  childrenOverflowX: boolean;
  childrenOverflowY: boolean;
  containerRect: { width: number; height: number };
  // Padding-box extent of the container relative to its border-box top-left:
  // borderLeftWidth + clientWidth (resp. borderTopWidth + clientHeight). The
  // content region a child must stay within to NOT be clipped.
  paddingBox: { right: number; bottom: number };
  maxChildExtent: { right: number; bottom: number };
};

export type OverflowData = {
  wrapping: WrappingDetection[];
  overflows: OverflowDetection[];
};

// Sub-pixel rounding plus a scrollbar gutter can push a child a few px past the
// padding box without any visible clipping. This is a HEURISTIC tolerance (not
// a WCAG number) chosen to avoid flagging anti-alias/scrollbar artifacts; only
// a child extending materially beyond the content box is a real clip.
const OVERFLOW_TOLERANCE_PX = 4;

// Only `overflow: hidden` clips content invisibly. `auto` and `scroll` are
// intended scroll containers (Scrollable, Select popover, Table body) where
// content extending past the box is reachable by scrolling, not lost.
const isClippingMode = (mode: string): boolean => mode === 'hidden';

// Geometry/visibility of a single wrapping-container child, as read in the
// browser via getBoundingClientRect + getComputedStyle.
export type ChildVisibility = {
  width: number;
  height: number;
  display: string;
  visibility: string;
  hasHiddenAttr: boolean;
  ariaHidden: boolean;
};

// A child counts as a genuine layout collapse (vanished content) only when it
// is in the visible render path yet measures 0px wide. A hidden child
// (display:none / visibility:hidden / [hidden] / aria-hidden) or a fully
// collapsed 0x0 node is empty/hidden BY DESIGN — e.g. a conditionally-empty
// Tiles cell or an empty icon slot — and must NOT defeat the auto-fit/
// auto-fill grid exemption in isProblematicWrap.
export const isCollapsedVisibleChild = (c: ChildVisibility): boolean => {
  if (c.display === 'none') return false;
  if (c.visibility === 'hidden') return false;
  if (c.hasHiddenAttr) return false;
  if (c.ariaHidden) return false;
  return c.width === 0 && c.height > 0;
};

export const extractOverflowData = async (page: Page): Promise<OverflowData> =>
  page.evaluate(() => {
    const mv = (
      window as unknown as {
        __mv: Record<string, (...args: unknown[]) => unknown>;
      }
    ).__mv;
    const cssPath = mv.cssPath as (el: Element) => string;

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
      const isAutoFitGrid =
        display === 'grid' &&
        (gridCols.includes('auto-fit') || gridCols.includes('auto-fill'));

      if (isWrappingFlex || isAutoFitGrid) {
        const children = Array.from(el.children);
        if (children.length < 2) continue;

        const rows = new Map<number, number>();
        let hasZeroWidthChild = false;
        for (const child of children) {
          const cr = child.getBoundingClientRect();
          // A 0px-wide child only signals a genuine layout collapse when it is
          // actually in the visible render path. A display:none / visibility:
          // hidden / [hidden] / aria-hidden child (e.g. a conditionally-empty
          // Tiles cell or an empty icon slot) measures 0px by design and must
          // NOT defeat the auto-fit/auto-fill exemption below. This inlines the
          // exported `isCollapsedVisibleChild` predicate (the tested source of
          // truth — evaluate() cannot import module scope); keep them in sync.
          const cs = window.getComputedStyle(child);
          const childHidden =
            cs.display === 'none' ||
            cs.visibility === 'hidden' ||
            child.hasAttribute('hidden') ||
            child.getAttribute('aria-hidden') === 'true';
          if (cr.width === 0 && cr.height > 0 && !childHidden) {
            hasZeroWidthChild = true;
          }
          const top = Math.round(cr.top);
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
            isAutoFitGrid,
            hasZeroWidthChild,
          });
        }
      }

      const overflowX = style.overflowX;
      const overflowY = style.overflowY;
      const hasClipping = overflowX === 'hidden' || overflowY === 'hidden';

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

        // Padding box relative to the border-box top-left. clientWidth/Height
        // already exclude both borders and any scrollbar gutter, so the content
        // region starts at the border width and spans clientWidth/Height.
        const borderLeft = parseFloat(style.borderLeftWidth) || 0;
        const borderTop = parseFloat(style.borderTopWidth) || 0;
        const htmlEl = el as HTMLElement;
        const paddingBoxRight = borderLeft + htmlEl.clientWidth;
        const paddingBoxBottom = borderTop + htmlEl.clientHeight;

        const extentRight = maxRight - containerRect.left;
        const extentBottom = maxBottom - containerRect.top;

        overflows.push({
          containerSelector: cssPath(el),
          overflow: style.overflow,
          overflowX,
          overflowY,
          childrenOverflowX: overflowX === 'hidden',
          childrenOverflowY: overflowY === 'hidden',
          containerRect: {
            width: Math.round(containerRect.width),
            height: Math.round(containerRect.height),
          },
          paddingBox: {
            right: Math.round(paddingBoxRight),
            bottom: Math.round(paddingBoxBottom),
          },
          maxChildExtent: {
            right: Math.round(extentRight),
            bottom: Math.round(extentBottom),
          },
        });
      }
    }

    return { wrapping, overflows };
  });

// A wrapping container is only a problem when the reflow loses or breaks
// content: a child collapsed to 0px, or (for non auto-fit layouts) the content
// could not fit on a single row. auto-fit/auto-fill grids reflow by design and
// are exempt unless a child collapses.
export const isProblematicWrap = (d: WrappingDetection): boolean => {
  if (d.hasZeroWidthChild) return true;
  if (d.isAutoFitGrid) return false;
  // Material overshoot: the content row is wider than the container by more
  // than a rounding tolerance, i.e. it genuinely could not fit on one row.
  return d.totalChildrenWidth > d.containerWidth + OVERFLOW_TOLERANCE_PX;
};

// A clip is only genuine when the child extends past the PADDING box (the
// visible content area) by more than the rounding/scrollbar tolerance.
export const isGenuineOverflow = (d: OverflowDetection): boolean => {
  const clipsX =
    d.childrenOverflowX &&
    isClippingMode(d.overflowX) &&
    d.maxChildExtent.right > d.paddingBox.right + OVERFLOW_TOLERANCE_PX;
  const clipsY =
    d.childrenOverflowY &&
    isClippingMode(d.overflowY) &&
    d.maxChildExtent.bottom > d.paddingBox.bottom + OVERFLOW_TOLERANCE_PX;
  return clipsX || clipsY;
};

export const wrappingToValidationIssues = (
  detections: WrappingDetection[]
): ValidationIssue[] =>
  detections.filter(isProblematicWrap).map(d => ({
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
  detections.filter(isGenuineOverflow).map(d => ({
    type: 'spatial' as const,
    severity: 'warning' as const,
    source: 'overflow-detector' as const,
    component: d.containerSelector,
    message: `Content overflows its container (overflow: ${d.overflow}). Container: ${d.containerRect.width}x${d.containerRect.height}px, content extends to ${d.maxChildExtent.right}x${d.maxChildExtent.bottom}px.`,
    suggestion:
      'Ensure content fits within the container. Use responsive sizing or <Columns collapseAt="..."> for layout that adapts to available space.',
    details: { ...d },
  }));
