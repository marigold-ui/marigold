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

const OVERLAP_THRESHOLD_PERCENT = 5;
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

const isAncestorByPath = (a: string, b: string): boolean =>
  a === b || b.startsWith(`${a} > `) || a.startsWith(`${b} > `);

const isIntentionalOverlay = (
  a: ComponentBounds,
  b: ComponentBounds
): boolean => {
  // Positioned element with higher z-index overlaying a static element
  if (OVERLAY_POSITIONS.has(a.position) && a.zIndex > b.zIndex) return true;
  if (OVERLAY_POSITIONS.has(b.position) && b.zIndex > a.zIndex) return true;

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
  const flat = flattenBounds(bounds);
  const issues: OverlapIssue[] = [];

  for (let i = 0; i < flat.length; i += 1) {
    for (let j = i + 1; j < flat.length; j += 1) {
      const a = flat[i];
      const b = flat[j];
      if (isAncestorByPath(a.selector, b.selector)) continue;
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
    severity: 'error' as const,
    source: 'overlap-detector' as const,
    component: `${o.componentA} ↔ ${o.componentB}`,
    message: `Components <${o.componentA}> and <${o.componentB}> overlap by ${o.overlapArea}px² (${o.overlapPercentage}% of the smaller component).`,
    suggestion: `Add spacing between the components. Wrap them in <Stack space={4}> or use a Marigold layout primitive (<Inline>, <Columns>) to lay them out without manual positioning.`,
    details: { ...o },
  }));
