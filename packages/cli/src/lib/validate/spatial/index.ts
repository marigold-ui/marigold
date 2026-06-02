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
import { type SharedRenderer, type Viewport } from './renderer.js';
import {
  extractResponsiveSnapshots,
  responsiveToValidationIssues,
} from './responsive.js';
import {
  extractTextSpacingData,
  textSpacingToValidationIssues,
} from './text-spacing.js';
import {
  checkTokenCompliance,
  snapshotBrowserDefaults,
} from './token-compliance.js';

export {
  createRenderer,
  type CapturedRenderError,
  type SharedRenderer,
  type Viewport,
  type RenderHandle,
  type RenderResult,
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
export {
  extractTextSpacingData,
  textSpacingToValidationIssues,
  type TextSpacingData,
} from './text-spacing.js';

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
  enableTextSpacing?: boolean;
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

    if (options.enableTextSpacing ?? options.enableA11y) {
      try {
        const spacingData = await extractTextSpacingData(page);
        a11yIssues.push(...textSpacingToValidationIssues(spacingData));
      } catch (err) {
        a11yIssues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'text-spacing',
          component: 'page',
          message: `Text spacing check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The text spacing check could not complete. This may indicate a page rendering issue.',
        });
      }
    }

    if (options.enableA11y) {
      const aom = await extractAOM(page);
      a11yIssues.push(...checkAccessibility(aom));

      const axeIssues = await runAxeAudit(page);
      a11yIssues.push(...axeIssues);
    }

    if (options.enableResponsive ?? options.enableSpatial) {
      try {
        const snapshots = await extractResponsiveSnapshots(page);
        responsiveIssues.push(...responsiveToValidationIssues(snapshots));
      } catch (err) {
        responsiveIssues.push({
          type: 'spatial',
          severity: 'warning',
          source: 'responsive-checker',
          component: 'page',
          message: `Responsive check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The responsive layout check could not complete. This may indicate a page rendering issue.',
        });
      }
    }

    if (options.enableKeyboardA11y ?? options.enableA11y) {
      try {
        const kbData = await extractKeyboardA11yData(page);
        keyboardIssues.push(...keyboardA11yToValidationIssues(kbData));
      } catch (err) {
        keyboardIssues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'keyboard-a11y',
          component: 'page',
          message: `Keyboard accessibility check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The keyboard check could not complete. This may indicate a page rendering or focus management issue.',
        });
      }
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
