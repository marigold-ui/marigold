import type { ValidationIssue } from '../types.js';
import type { ComponentBounds } from './bounding-box.js';
import { flattenBounds } from './bounding-box.js';

export type OverlapIssue = {
  componentA: string;
  componentB: string;
  selectorA: string;
  selectorB: string;
  overlapArea: number;
  overlapPercentage: number;
};

// Overlap detection is a LAYOUT HEURISTIC, not a WCAG criterion. The thresholds
// below are tuned to avoid flagging sub-pixel/anti-alias touches and intentional
// overlays while still catching layout-breaking collisions.
//
// Minimum intersection (as % of the smaller box's area) before an overlap is
// reported at all: below this is treated as an incidental touch/rounding.
const OVERLAP_THRESHOLD_PERCENT = 5;
// At or above this share of the smaller box the overlap is substantial enough
// that content is very likely obscured. This is surfaced via `details.major`
// for the agent, but the severity stays 'warning' regardless: overlap is a
// threshold-based layout heuristic, and the severity policy keeps every
// heuristic out of the error signal (only deterministic, FP-free, "broken"
// findings are errors).
const MAJOR_OVERLAP_PERCENT = 25;
// A child smaller than 15% the area of its neighbour reads as a badge/icon
// overlay sitting on top of a larger surface, not a layout collision. Heuristic.
const BADGE_AREA_RATIO = 0.15;
const OVERLAY_POSITIONS = new Set(['absolute', 'fixed']);
const OVERLAY_ROLES = new Set([
  'tooltip',
  'dialog',
  'alertdialog',
  'menu',
  'listbox',
  'status',
]);

const intersectionArea = (a: ComponentBounds, b: ComponentBounds): number => {
  const x1 = Math.max(a.rect.x, b.rect.x);
  const y1 = Math.max(a.rect.y, b.rect.y);
  const x2 = Math.min(a.rect.x + a.rect.width, b.rect.x + b.rect.width);
  const y2 = Math.min(a.rect.y + a.rect.height, b.rect.y + b.rect.height);
  if (x2 <= x1 || y2 <= y1) return 0;
  return (x2 - x1) * (y2 - y1);
};

const areaOf = (b: ComponentBounds): number => b.rect.width * b.rect.height;

// Map each element's selector to the set of its ancestor selectors, taken from
// the REAL nested bounds tree. This is the primary containment signal: the
// cssPath-prefix check below is sound for genuine DOM paths but can miss a pair
// once the extractor has skipped non-interesting intermediate elements, so the
// tree relationship is authoritative and the prefix is only a fallback.
const buildAncestryMap = (
  bounds: ComponentBounds[]
): Map<string, Set<string>> => {
  const map = new Map<string, Set<string>>();
  const walk = (list: ComponentBounds[], ancestors: string[]): void => {
    for (const b of list) {
      map.set(b.selector, new Set(ancestors));
      walk(b.children, [...ancestors, b.selector]);
    }
  };
  walk(bounds, []);
  return map;
};

const isAncestor = (
  a: ComponentBounds,
  b: ComponentBounds,
  ancestry: Map<string, Set<string>>
): boolean =>
  a.selector === b.selector ||
  (ancestry.get(a.selector)?.has(b.selector) ?? false) ||
  (ancestry.get(b.selector)?.has(a.selector) ?? false) ||
  b.selector.startsWith(`${a.selector} > `) ||
  a.selector.startsWith(`${b.selector} > `);

const isIntentionalOverlay = (
  a: ComponentBounds,
  b: ComponentBounds
): boolean => {
  // A non-identity transform (translate/scale nudge, animation, or a popper
  // positioned via transform rather than top/left) makes a visual overlap with
  // the anchor intentional. react-aria overlays and nudged badges hit this.
  if (a.transform !== 'none' || b.transform !== 'none') return true;

  const aPositioned = OVERLAY_POSITIONS.has(a.position);
  const bPositioned = OVERLAY_POSITIONS.has(b.position);

  if (aPositioned && bPositioned) return true;
  if (aPositioned && a.zIndex > b.zIndex) return true;
  if (bPositioned && b.zIndex > a.zIndex) return true;

  // Overlay roles (tooltip, dialog, menu, etc.)
  if (a.role && OVERLAY_ROLES.has(a.role)) return true;
  if (b.role && OVERLAY_ROLES.has(b.role)) return true;

  // Badge pattern: small element on top of a much larger one
  const areaA = areaOf(a);
  const areaB = areaOf(b);
  if (areaA > 0 && areaB > 0) {
    const ratio = Math.min(areaA, areaB) / Math.max(areaA, areaB);
    if (ratio < BADGE_AREA_RATIO) return true;
  }

  return false;
};

export const detectOverlaps = (bounds: ComponentBounds[]): OverlapIssue[] => {
  const ancestry = buildAncestryMap(bounds);
  const flat = flattenBounds(bounds);
  const issues: OverlapIssue[] = [];

  for (let i = 0; i < flat.length; i += 1) {
    for (let j = i + 1; j < flat.length; j += 1) {
      const a = flat[i];
      const b = flat[j];
      if (isAncestor(a, b, ancestry)) continue;
      if (isIntentionalOverlay(a, b)) continue;

      const area = intersectionArea(a, b);
      if (area === 0) continue;

      const smaller = Math.min(areaOf(a), areaOf(b));
      if (smaller === 0) continue;

      const percent = (area / smaller) * 100;
      if (percent < OVERLAP_THRESHOLD_PERCENT) continue;

      issues.push({
        componentA: a.component,
        componentB: b.component,
        selectorA: a.selector,
        selectorB: b.selector,
        overlapArea: Math.round(area),
        overlapPercentage: Math.round(percent),
      });
    }
  }

  return issues;
};

export const overlapIssuesToValidationIssues = (
  overlaps: OverlapIssue[]
): ValidationIssue[] =>
  overlaps.map(o => ({
    type: 'spatial' as const,
    // Overlap is a threshold-based layout heuristic, so it is always a
    // 'warning' and never feeds the error signal. A substantial overlap is
    // still flagged to the agent via `details.major`.
    severity: 'warning' as const,
    source: 'overlap-detector' as const,
    component: `${o.componentA} ↔ ${o.componentB}`,
    message: `Components <${o.componentA}> and <${o.componentB}> overlap by ${o.overlapArea}px² (${o.overlapPercentage}% of the smaller component).`,
    suggestion: `Add spacing between the components. Wrap them in <Stack space={4}> or use a Marigold layout primitive (<Inline>, <Columns>) to lay them out without manual positioning.`,
    details: { ...o, major: o.overlapPercentage >= MAJOR_OVERLAP_PERCENT },
  }));
