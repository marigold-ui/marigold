import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

type TextElementMetrics = {
  selector: string;
  component: string;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
  overflowX: string;
  overflowY: string;
  position: string;
  display: string;
  textOverflow: string;
  webkitLineClamp: string;
  rect: { x: number; y: number; width: number; height: number };
};

export type TextSpacingData = {
  before: TextElementMetrics[];
  after: TextElementMetrics[];
};

const SPACING_STYLE_ID = 'marigold-validate-wcag-spacing';

const EXCLUDED_TAGS = new Set([
  'script',
  'style',
  'noscript',
  'svg',
  'path',
  'circle',
  'rect',
  'line',
  'polygon',
  'polyline',
  'ellipse',
  'g',
  'defs',
  'use',
  'symbol',
  'clippath',
  'mask',
  'br',
  'hr',
  'img',
  'video',
  'audio',
  'canvas',
  'iframe',
]);

const MIN_AREA = 100;

const captureTextMetrics = (page: Page): Promise<TextElementMetrics[]> =>
  page.evaluate(
    (excluded: string[]) => {
      const mv = (
        window as unknown as {
          __mv: Record<string, (...args: unknown[]) => unknown>;
        }
      ).__mv;
      const cssPath = mv.cssPath as (el: Element) => string;
      const excludedSet = new Set(excluded);
      const results: TextElementMetrics[] = [];

      for (const el of document.body.querySelectorAll('*')) {
        const tag = el.tagName.toLowerCase();
        if (excludedSet.has(tag)) continue;

        const text = el.textContent?.trim();
        if (!text || text.length === 0) continue;

        if (el.children.length > 0) {
          let hasDirectText = false;
          for (const node of el.childNodes) {
            if (node.nodeType === 3 && node.textContent?.trim()) {
              hasDirectText = true;
              break;
            }
          }
          if (!hasDirectText) continue;
        }

        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;

        const rect = el.getBoundingClientRect();
        if (rect.width * rect.height < 1) continue;

        const htmlEl = el as HTMLElement;

        results.push({
          selector: cssPath(el),
          component:
            el.getAttribute('data-component') ??
            el.getAttribute('data-slot') ??
            tag,
          scrollWidth: htmlEl.scrollWidth,
          scrollHeight: htmlEl.scrollHeight,
          clientWidth: htmlEl.clientWidth,
          clientHeight: htmlEl.clientHeight,
          overflowX: style.overflowX,
          overflowY: style.overflowY,
          position: style.position,
          display: style.display,
          textOverflow: style.textOverflow,
          webkitLineClamp:
            style.getPropertyValue('-webkit-line-clamp') || 'none',
          rect: {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
        });
      }
      return results;
    },
    [...EXCLUDED_TAGS]
  );

const injectSpacingOverrides = (page: Page): Promise<void> =>
  page.evaluate((id: string) => {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = [
      '* {',
      '  line-height: 1.5 !important;',
      '  letter-spacing: 0.12em !important;',
      '  word-spacing: 0.16em !important;',
      '}',
      'p { margin-bottom: 2em !important; }',
    ].join('\n');
    document.head.appendChild(style);
  }, SPACING_STYLE_ID);

const removeSpacingOverrides = (page: Page): Promise<void> =>
  page.evaluate((id: string) => {
    document.getElementById(id)?.remove();
  }, SPACING_STYLE_ID);

const waitForLayout = (page: Page): Promise<void> =>
  page.evaluate(
    () =>
      new Promise<void>(r =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      )
  );

export const extractTextSpacingData = async (
  page: Page
): Promise<TextSpacingData> => {
  const before = await captureTextMetrics(page);
  try {
    await injectSpacingOverrides(page);
    await waitForLayout(page);
    const after = await captureTextMetrics(page);
    return { before, after };
  } finally {
    await removeSpacingOverrides(page);
    await waitForLayout(page);
  }
};

const isClippingHidden = (overflow: string): boolean => overflow === 'hidden';

const isScrollable = (overflow: string): boolean =>
  overflow === 'auto' || overflow === 'scroll';

const isOverlay = (position: string): boolean =>
  position === 'absolute' || position === 'fixed';

const clipsVertically = (m: TextElementMetrics): boolean =>
  m.scrollHeight > m.clientHeight && isClippingHidden(m.overflowY);

const clipsHorizontally = (m: TextElementMetrics): boolean =>
  m.scrollWidth > m.clientWidth && isClippingHidden(m.overflowX);

const hasLineClamp = (m: TextElementMetrics): boolean =>
  m.webkitLineClamp !== 'none' &&
  m.webkitLineClamp !== '' &&
  isClippingHidden(m.overflowY);

export const textSpacingToValidationIssues = (
  data: TextSpacingData
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const beforeMap = new Map(data.before.map(m => [m.selector, m]));

  for (const after of data.after) {
    if (after.display === 'none') continue;
    if (after.rect.width * after.rect.height < MIN_AREA) continue;
    if (isOverlay(after.position)) continue;
    if (isScrollable(after.overflowX) && isScrollable(after.overflowY))
      continue;

    const before = beforeMap.get(after.selector);
    if (!before) continue;

    const wasClippingV = clipsVertically(before);
    const wasClippingH = clipsHorizontally(before);
    const wasLineClamped = hasLineClamp(before);

    const nowClipsV = clipsVertically(after) && !wasClippingV;
    const nowClipsH = clipsHorizontally(after) && !wasClippingH;
    const nowLineClamped = hasLineClamp(after) && !wasLineClamped;
    // WCAG 1.4.12 targets content made INACCESSIBLE by applying text spacing. A
    // single-line ellipsis truncation (text-overflow:ellipsis + overflow-x:hidden
    // and no line-clamp) that was ALREADY truncating before the injection is an
    // authored design pattern (e.g. a truncating Marigold Text); the injection
    // merely clips it a few px more. That is not a spacing failure, so exempt it.
    // Multi-line clamp, or an element that did not truncate before, still fire.
    const wasEllipsisTruncating =
      before.textOverflow === 'ellipsis' &&
      isClippingHidden(before.overflowX) &&
      before.webkitLineClamp === 'none';
    const nowEllipsis =
      !wasEllipsisTruncating &&
      after.textOverflow === 'ellipsis' &&
      clipsHorizontally(after) &&
      !wasClippingH;

    if (nowClipsV || nowClipsH || nowLineClamped || nowEllipsis) {
      const axis = nowLineClamped
        ? 'via line-clamp'
        : nowClipsH || nowEllipsis
          ? 'horizontally'
          : 'vertically';

      issues.push({
        type: 'a11y',
        // Warning, not error: detected by injecting spacing CSS and measuring a
        // clip — a runtime heuristic, and 1.4.12 is Level AA. Not a
        // deterministic, false-positive-free violation. See severity policy.
        severity: 'warning',
        source: 'text-spacing',
        component: after.component,
        message: `Text content clips ${axis} when WCAG 1.4.12 text spacing is applied (WCAG 1.4.12 Text Spacing).`,
        suggestion:
          'Avoid fixed heights with overflow:hidden on text containers. Use min-height or allow the container to grow. For truncated text, ensure the full content is accessible via tooltip or expansion.',
        details: {
          selector: after.selector,
          beforeScroll: { w: before.scrollWidth, h: before.scrollHeight },
          afterScroll: { w: after.scrollWidth, h: after.scrollHeight },
          clientSize: { w: after.clientWidth, h: after.clientHeight },
          overflow: { x: after.overflowX, y: after.overflowY },
        },
      });
    }
  }

  return issues;
};
