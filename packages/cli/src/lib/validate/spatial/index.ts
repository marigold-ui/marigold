import {
  ThemeCssNotFoundError,
  getTrackedProperties,
} from '../helpers/design-tokens.js';
import type { ValidationIssue } from '../types.js';
import {
  checkAccessibility,
  extractAOM,
  runAxeAudit,
} from './aom-extractor.js';
import { extractBoundingBoxes, flattenBounds } from './bounding-box.js';
import {
  FALLBACK_PROPERTIES,
  extractComputedStyles,
} from './computed-styles.js';
import {
  extractKeyboardA11yData,
  keyboardA11yToValidationIssues,
} from './keyboard.js';
import {
  extractOverflowData,
  overflowToValidationIssues,
  wrappingToValidationIssues,
} from './overflow.js';
import { detectOverlaps, overlapIssuesToValidationIssues } from './overlap.js';
import {
  type SharedRenderer,
  type Viewport,
  createRenderer,
} from './renderer.js';
import {
  extractResponsiveSnapshots,
  responsiveToValidationIssues,
} from './responsive.js';
import {
  checkTokenCompliance,
  snapshotBrowserDefaults,
} from './token-compliance.js';

export {
  createRenderer,
  type CapturedRenderError,
  type SharedRenderer,
  type RenderHandle,
  type RenderResult,
  type Viewport,
} from './renderer.js';
export {
  extractBoundingBoxes,
  flattenBounds,
  type ComponentBounds,
} from './bounding-box.js';
export { detectOverlaps, type OverlapIssue } from './overlap.js';
export {
  extractOverflowData,
  wrappingToValidationIssues,
  overflowToValidationIssues,
  type WrappingDetection,
  type OverflowDetection,
  type OverflowData,
} from './overflow.js';
export { extractComputedStyles } from './computed-styles.js';
export {
  checkTokenCompliance,
  snapshotBrowserDefaults,
} from './token-compliance.js';
export {
  checkAccessibility,
  extractAOM,
  runAxeAudit,
  type AOMNode,
} from './aom-extractor.js';
export {
  extractResponsiveSnapshots,
  responsiveToValidationIssues,
  type ResponsiveSnapshot,
} from './responsive.js';
export {
  extractKeyboardA11yData,
  keyboardA11yToValidationIssues,
  type KeyboardA11yData,
} from './keyboard.js';

export type SpatialResult = {
  spatialIssues: ValidationIssue[];
  styleIssues: ValidationIssue[];
  a11yIssues: ValidationIssue[];
  responsiveIssues: ValidationIssue[];
  keyboardIssues: ValidationIssue[];
  consoleErrors: string[];
  pageErrors: string[];
  renderErrors: { message: string; stack?: string; componentStack?: string }[];
  componentsFound: string[];
  renderTimeMs: number;
};

export type SpatialOptions = {
  enableSpatial: boolean;
  enableA11y: boolean;
  enableResponsive?: boolean;
  enableKeyboardA11y?: boolean;
  viewport: Viewport;
};

export const runSpatialChecks = async (
  filePath: string,
  options: SpatialOptions,
  renderer: SharedRenderer
): Promise<SpatialResult> => {
  const handle = await renderer.render(filePath, options.viewport);
  try {
    const { page } = handle.result;

    const spatialIssues: ValidationIssue[] = [];
    const styleIssues: ValidationIssue[] = [];
    const a11yIssues: ValidationIssue[] = [];
    const responsiveIssues: ValidationIssue[] = [];
    const keyboardIssues: ValidationIssue[] = [];
    let componentsFound: string[] = [];

    if (options.enableSpatial) {
      const bounds = await extractBoundingBoxes(page);
      const overlaps = detectOverlaps(bounds);
      spatialIssues.push(...overlapIssuesToValidationIssues(overlaps));

      const flat = flattenBounds(bounds);
      componentsFound = Array.from(new Set(flat.map(b => b.component)));

      try {
        const trackedProps = getTrackedProperties();
        const browserDefaults = await snapshotBrowserDefaults(
          page,
          trackedProps.length > 0 ? trackedProps : FALLBACK_PROPERTIES
        );

        const snapshots = await extractComputedStyles(
          page,
          flat.map(b => b.selector)
        );
        styleIssues.push(
          ...(await checkTokenCompliance(page, snapshots, browserDefaults))
        );
      } catch (err) {
        if (err instanceof ThemeCssNotFoundError) {
          styleIssues.push({
            type: 'style',
            severity: 'error',
            source: 'token-compliance',
            component: 'theme',
            message: err.message,
            suggestion:
              'Build the theme package first, then re-run validation.',
          });
        } else {
          throw err;
        }
      }

      const overflowData = await extractOverflowData(page);
      spatialIssues.push(...wrappingToValidationIssues(overflowData.wrapping));
      spatialIssues.push(...overflowToValidationIssues(overflowData.overflows));
    }

    if (options.enableA11y) {
      const aom = await extractAOM(page);
      a11yIssues.push(...checkAccessibility(aom));

      const axeIssues = await runAxeAudit(page);
      a11yIssues.push(...axeIssues);
    }

    if (options.enableResponsive ?? options.enableSpatial) {
      const snapshots = await extractResponsiveSnapshots(page);
      responsiveIssues.push(...responsiveToValidationIssues(snapshots));
    }

    if (options.enableKeyboardA11y ?? options.enableA11y) {
      const kbData = await extractKeyboardA11yData(page);
      keyboardIssues.push(...keyboardA11yToValidationIssues(kbData));
    }

    const dedup = (issues: ValidationIssue[]): ValidationIssue[] => {
      const seen = new Set<string>();
      return issues.filter(i => {
        const key = `${i.source}:${i.component}:${i.message}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };

    return {
      spatialIssues: dedup(spatialIssues),
      styleIssues: dedup(styleIssues),
      a11yIssues: dedup(a11yIssues),
      responsiveIssues: dedup(responsiveIssues),
      keyboardIssues: dedup(keyboardIssues),
      consoleErrors: handle.result.consoleErrors,
      pageErrors: handle.result.pageErrors,
      renderErrors: handle.result.renderErrors,
      componentsFound,
      renderTimeMs: handle.result.renderTimeMs,
    };
  } finally {
    await handle.close();
  }
};
