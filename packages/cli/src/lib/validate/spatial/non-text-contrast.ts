import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';
import {
  NON_TEXT_CONTRAST_MIN,
  contrastAgainstLayers,
  parseColor,
} from './contrast.js';

/**
 * WCAG 1.4.11 Non-text Contrast (AA) — the deterministically decidable subset.
 *
 * Two things are checkable from computed styles + the AOM without judging
 * intent:
 *   1. A UI component with a visible BORDER: the border is the boundary that
 *      identifies the component, so it must reach 3:1 against the colour just
 *      outside it.
 *   2. A borderless but FILLED component (a solid button): the fill is the
 *      boundary, so the fill must reach 3:1 against the surrounding surface.
 *
 * A component identified only by its text (no border, no distinct fill — e.g. a
 * quiet/text button) is covered by 1.4.3 text contrast, not here. "Essential"
 * graphics and user-agent-determined appearance are intent-dependent and out of
 * scope. No public tool automates this (Deque's own coverage report lists 1.4.11
 * as 0% automated); the nearest checks only do text contrast (1.4.3).
 */

// Candidate components, selected by ARIA role / native control — generic across
// any typed design system, not tied to specific component names.
const COMPONENT_SELECTOR = [
  'button:not([disabled])',
  'input:not([type="hidden"]):not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="textbox"]',
  '[role="searchbox"]',
  '[role="combobox"]',
  '[role="slider"]',
  '[role="spinbutton"]',
].join(', ');

export type NonTextContrastDatum = {
  selector: string;
  component: string;
  role: string;
  disabled: boolean;
  /** A side is "visible" when width > 0, style is not none/hidden. */
  hasVisibleBorder: boolean;
  borderColor: string | null;
  ownBackground: string;
  /** Ancestor background colours, nearest parent first, up to the root. */
  ancestorBackgrounds: string[];
  /** True when a relevant ancestor paints a background image/gradient, which
   *  makes the effective backdrop indeterminate -> skip (no false positive). */
  backdropHasImage: boolean;
};

export const extractNonTextContrast = async (
  page: Page,
  // When set, only components inside this element are checked (used to scope the
  // check to a revealed overlay; defaults to the whole document body).
  rootSelector?: string
): Promise<NonTextContrastDatum[]> =>
  page.evaluate(
    ({ selector, rootSelector }) => {
      const mv = (
        window as unknown as {
          __mv: Record<string, (...args: unknown[]) => unknown>;
        }
      ).__mv;
      const cssPath = mv.cssPath as (el: Element) => string;
      const root = rootSelector
        ? document.querySelector(rootSelector)
        : document.body;
      if (!root) return [];

      const VISIBLE_BORDER_STYLES = new Set([
        'solid',
        'dashed',
        'dotted',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
      ]);

      const firstVisibleBorderColor = (
        s: CSSStyleDeclaration
      ): string | null => {
        const sides = ['top', 'right', 'bottom', 'left'] as const;
        for (const side of sides) {
          const width = parseFloat(
            s.getPropertyValue(`border-${side}-width`) || '0'
          );
          const style = s.getPropertyValue(`border-${side}-style`);
          if (width > 0 && VISIBLE_BORDER_STYLES.has(style)) {
            return s.getPropertyValue(`border-${side}-color`);
          }
        }
        return null;
      };

      const results: NonTextContrastDatum[] = [];
      for (const el of root.querySelectorAll(selector)) {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        if (el.getAttribute('aria-hidden') === 'true') continue;
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;

        const disabled =
          (el as HTMLButtonElement).disabled === true ||
          el.getAttribute('aria-disabled') === 'true';

        const borderColor = firstVisibleBorderColor(style);

        // A translucent (partial-alpha) background is NOT a backdrop to stop
        // at — flattenBackground (the Node-side compositor this data feeds)
        // only treats an a>=1 layer as the opaque base, and composites every
        // translucent layer above it. Stopping at the first non-fully-
        // transparent layer (as opposed to the first fully OPAQUE one) would
        // silently drop a real opaque grandparent beneath a translucent
        // scrim/tint, making flattenBackground return null (indeterminate)
        // and skip a genuine contrast violation.
        const isOpaqueBackground = (colorStr: string): boolean => {
          const m = colorStr.match(/rgba?\(([^)]+)\)/);
          if (!m) return false;
          // Accept both "r, g, b, a" and the space form "r g b / a" — modern
          // Chromium can emit either from getComputedStyle. A comma-only split
          // mis-parses the space form as a single part, always reading as
          // opaque and stopping the ancestor walk at a translucent scrim.
          // Mirrors contrast.ts::parseColor's part-splitting.
          const parts = m[1]
            .replace('/', ' ')
            .split(/[\s,]+/)
            .filter(Boolean);
          if (parts.length < 4) return true; // rgb(...) has no alpha channel: opaque
          const alphaStr = parts[3];
          const alpha = alphaStr.endsWith('%')
            ? parseFloat(alphaStr) / 100
            : parseFloat(alphaStr);
          return alpha >= 1;
        };

        // Walk ancestors collecting background colours up to the first opaque one;
        // note whether any of them paints an image/gradient (indeterminate).
        const ancestorBackgrounds: string[] = [];
        let backdropHasImage = false;
        let cur = el.parentElement;
        while (cur) {
          const cs = window.getComputedStyle(cur);
          ancestorBackgrounds.push(cs.backgroundColor);
          if (cs.backgroundImage && cs.backgroundImage !== 'none') {
            backdropHasImage = true;
          }
          if (cs.backgroundColor && isOpaqueBackground(cs.backgroundColor)) {
            break; // reached a genuinely opaque backdrop
          }
          cur = cur.parentElement;
        }

        results.push({
          selector: cssPath(el),
          component:
            el.getAttribute('data-component') ??
            el.getAttribute('data-slot') ??
            el.tagName.toLowerCase(),
          role: el.getAttribute('role') ?? el.tagName.toLowerCase(),
          disabled,
          hasVisibleBorder: borderColor !== null,
          borderColor,
          ownBackground: style.backgroundColor,
          ancestorBackgrounds,
          backdropHasImage,
        });
      }
      return results;
    },
    { selector: COMPONENT_SELECTOR, rootSelector }
  );

const toLayers = (colors: string[]) =>
  colors.map(parseColor).filter((c): c is NonNullable<typeof c> => c !== null);

export const nonTextContrastToValidationIssues = (
  data: NonTextContrastDatum[]
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  for (const d of data) {
    // Disabled controls have an intentionally muted (low-contrast) appearance —
    // a state treatment, not an authored boundary failure. Skip (FP guard).
    if (d.disabled) continue;
    // Indeterminate backdrop (gradient/image behind the component): cannot
    // resolve a concrete contrast, so do not report.
    if (d.backdropHasImage) continue;

    const outside = toLayers(d.ancestorBackgrounds);
    if (outside.length === 0) continue; // no resolvable backdrop

    if (d.hasVisibleBorder && d.borderColor) {
      const border = parseColor(d.borderColor);
      if (!border) continue;
      // A border is a perceivable boundary if it contrasts with EITHER side it
      // separates: the surroundings outside OR the component's own fill inside.
      // Themed components often rely on border-vs-fill, so only flag when the
      // border fails against every adjacent colour we can actually resolve.
      const outsideRes = contrastAgainstLayers(border, outside);
      const fill = parseColor(d.ownBackground);
      const fillRes =
        fill && fill.a > 0
          ? contrastAgainstLayers(border, [fill, ...outside])
          : null;
      const ratios = [outsideRes?.ratio, fillRes?.ratio].filter(
        (r): r is number => typeof r === 'number'
      );
      if (ratios.length === 0) continue; // nothing resolvable -> indeterminate
      const best = Math.max(...ratios);
      if (best < NON_TEXT_CONTRAST_MIN) {
        issues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'non-text-contrast',
          component: d.component,
          message: `Border of <${d.component}> (${d.role}) has only ${best.toFixed(2)}:1 contrast against the colours on either side — below the 3:1 required for UI component boundaries (WCAG 1.4.11).`,
          suggestion:
            'Use a Marigold component variant or a theme border token; themed components meet non-text contrast. Avoid a near-background border colour.',
          details: { selector: d.selector, ratio: best },
        });
      }
      continue;
    }

    // Borderless: only a genuinely FILLED component has a boundary to assess.
    const fill = parseColor(d.ownBackground);
    if (!fill || fill.a <= 0) continue; // text-identified component -> 1.4.3, skip
    const res = contrastAgainstLayers(fill, outside);
    // If the fill equals the surroundings there is no visible component at all;
    // that is still a 1.4.11 concern (the control is invisible). A high ratio
    // (clearly distinct fill) passes.
    if (res && res.ratio < NON_TEXT_CONTRAST_MIN) {
      issues.push({
        type: 'a11y',
        severity: 'warning',
        source: 'non-text-contrast',
        component: d.component,
        message: `Fill of <${d.component}> (${d.role}) has ${res.ratio.toFixed(2)}:1 contrast against its surroundings — below the 3:1 required to identify a UI component (WCAG 1.4.11).`,
        suggestion:
          'Give the control a distinguishable fill or border using Marigold variants/theme tokens, so its boundary is perceivable.',
        details: { selector: d.selector, ratio: res.ratio },
      });
    }
  }

  return issues;
};
