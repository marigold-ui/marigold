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
import {
  type ComponentBounds,
  extractBoundingBoxes,
  flattenBounds,
} from './bounding-box.js';
import {
  FALLBACK_PROPERTIES,
  extractComputedStyles,
} from './computed-styles.js';
import {
  contentOnHoverFocusIssues,
  extractContentOnHoverFocus,
} from './content-on-hover-focus.js';
import { driveInteractions } from './interaction-driver.js';
import {
  extractKeyboardA11yData,
  keyboardA11yToValidationIssues,
} from './keyboard.js';
import {
  extractNonTextContrast,
  nonTextContrastToValidationIssues,
} from './non-text-contrast.js';
import {
  extractOverflowData,
  overflowToValidationIssues,
  wrappingToValidationIssues,
} from './overflow.js';
import { detectOverlaps, overlapIssuesToValidationIssues } from './overlap.js';
import {
  type RenderTimingError,
  type SharedRenderer,
  type Viewport,
} from './renderer.js';
import {
  extractResponsiveSnapshots,
  responsiveToValidationIssues,
  widthUtilizationFromSnapshots,
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
  widthUtilizationFromSnapshots,
  computeWidthUtilization,
  responsiveToValidationIssues,
  type ResponsiveSnapshot,
  type WidthUtilizationResult,
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
export {
  extractNonTextContrast,
  nonTextContrastToValidationIssues,
  type NonTextContrastDatum,
} from './non-text-contrast.js';
export {
  extractContentOnHoverFocus,
  contentOnHoverFocusIssues,
  type HoverFocusObservation,
} from './content-on-hover-focus.js';
export {
  driveInteractions,
  classifyTrigger,
  type RevealedState,
  type Trigger,
} from './interaction-driver.js';

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
  // Desktop width-utilisation metric (0..1) for the run; null when not computed.
  widthUtilization: number | null;
};

export type SpatialOptions = {
  enableSpatial: boolean;
  enableA11y: boolean;
  enableResponsive?: boolean;
  enableKeyboardA11y?: boolean;
  enableTextSpacing?: boolean;
  // Open interactive overlays (menus/dialogs/…) and re-run the a11y checks on
  // the revealed content. Defaults to enableA11y.
  enableRevealed?: boolean;
  // Test hover/focus-revealed content (tooltips/popovers) for WCAG 1.4.13
  // (dismissable/hoverable/persistent). Defaults to enableA11y.
  enableContentHoverFocus?: boolean;
  viewport: Viewport;
};

// Ceiling for the whole inspection phase, separate from the renderer's
// setup+mount budget, which stops bounding once render() returns.
// page.evaluate has no default timeout, so code that mounts cleanly but then
// spins the main thread would wedge every check below — and since
// `handle.close()` only runs in this function's `finally`, that would leak the
// page, context and dev server. Racing the phase guarantees it always settles.
const INSPECTION_BUDGET_MS = 60_000;

export const runSpatialChecks = async (
  filePath: string,
  options: SpatialOptions,
  renderer: SharedRenderer
): Promise<SpatialResult> => {
  const handle = await renderer.render(filePath, options.viewport);

  let budgetTimer: ReturnType<typeof setTimeout> | undefined;
  const budget = new Promise<never>((_, reject) => {
    budgetTimer = setTimeout(
      () =>
        reject(
          new Error(
            `Inspection phase exceeded ${INSPECTION_BUDGET_MS}ms budget`
          )
        ),
      INSPECTION_BUDGET_MS
    );
  });

  const inspect = async (): Promise<SpatialResult> => {
    const { page } = handle.result;

    const spatialIssues: ValidationIssue[] = [];
    const styleIssues: ValidationIssue[] = [];
    const a11yIssues: ValidationIssue[] = [];
    const responsiveIssues: ValidationIssue[] = [];
    const keyboardIssues: ValidationIssue[] = [];
    let componentsFound: string[] = [];
    let widthUtilization: number | null = null;

    if (options.enableSpatial) {
      // Per-sub-check try/catch so one extraction failure can't discard its
      // siblings' findings or abort every later block in this function.
      let flat: ComponentBounds[] = [];
      try {
        const bounds = await extractBoundingBoxes(page);
        const overlaps = detectOverlaps(bounds);
        spatialIssues.push(...overlapIssuesToValidationIssues(overlaps));

        flat = flattenBounds(bounds);
        componentsFound = Array.from(new Set(flat.map(b => b.component)));
      } catch (err) {
        spatialIssues.push({
          type: 'spatial',
          severity: 'warning',
          source: 'overlap-detector',
          component: 'page',
          message: `Bounding-box/overlap check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The overlap detection check could not complete. This may indicate a page rendering issue.',
        });
      }

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
          // An unbuilt theme is an environment precondition, not a defect in
          // the file. The static theme-variants checker skips this condition
          // silently; a warning here matches without failing the exit code.
          styleIssues.push({
            type: 'style',
            severity: 'warning',
            source: 'token-compliance',
            component: 'theme',
            message: err.message,
            suggestion:
              'Build the theme package first, then re-run validation.',
          });
        } else {
          // A transient page.evaluate hiccup must not take the whole phase
          // down — matches every sibling try/catch here.
          const message = err instanceof Error ? err.message : String(err);
          styleIssues.push({
            type: 'style',
            severity: 'warning',
            source: 'token-compliance',
            component: 'page',
            message: `Token compliance check failed: ${message}`,
            suggestion:
              'The token compliance check could not complete. This may indicate a page rendering issue.',
          });
        }
      }

      try {
        const overflowData = await extractOverflowData(page);
        spatialIssues.push(
          ...wrappingToValidationIssues(overflowData.wrapping)
        );
        spatialIssues.push(
          ...overflowToValidationIssues(overflowData.overflows)
        );
      } catch (err) {
        spatialIssues.push({
          type: 'spatial',
          severity: 'warning',
          source: 'overflow-detector',
          component: 'page',
          message: `Overflow/wrapping check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The overflow/wrapping check could not complete. This may indicate a page rendering issue.',
        });
      }
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
      // Per-sub-check try/catch, as elsewhere: an axe-core internal error
      // must not discard the AOM and non-text-contrast findings too.
      try {
        const aom = await extractAOM(page);
        a11yIssues.push(...checkAccessibility(aom));
      } catch (err) {
        a11yIssues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'aom-extractor',
          component: 'page',
          message: `Accessibility tree check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The accessibility object model check could not complete. This may indicate a page rendering issue.',
        });
      }

      try {
        const axeIssues = await runAxeAudit(page);
        a11yIssues.push(...axeIssues);
      } catch (err) {
        a11yIssues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'aom-extractor',
          component: 'page',
          message: `Automated accessibility audit (axe) failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The axe accessibility audit could not complete. This may indicate a page rendering issue.',
        });
      }

      try {
        const nonTextContrast = await extractNonTextContrast(page);
        a11yIssues.push(...nonTextContrastToValidationIssues(nonTextContrast));
      } catch (err) {
        a11yIssues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'non-text-contrast',
          component: 'page',
          message: `Non-text contrast check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'The non-text contrast check could not complete. This may indicate a page rendering issue.',
        });
      }
    }

    // Open interactive overlays (menus, dialogs, listboxes, disclosures) and
    // re-run the contrast + axe checks on the revealed content, which the
    // initial-state passes never see. Generic via the ARIA trigger contract.
    if (options.enableRevealed ?? options.enableA11y) {
      try {
        const revealed = await driveInteractions(page, {
          onOpen: async root => {
            const out: ValidationIssue[] = [];
            const ntc = await extractNonTextContrast(page, root);
            out.push(...nonTextContrastToValidationIssues(ntc));
            out.push(...(await runAxeAudit(page, root)));
            return out.map(i => ({
              ...i,
              message: `${i.message} (in a revealed overlay)`,
            }));
          },
        });
        a11yIssues.push(...revealed.issues);
      } catch (err) {
        a11yIssues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'aom-extractor',
          component: 'page',
          message: `Revealed-content check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'Opening interactive overlays for analysis did not complete; the initial-state checks still ran.',
        });
      }
    }

    if (options.enableContentHoverFocus ?? options.enableA11y) {
      try {
        const hf = await extractContentOnHoverFocus(page);
        a11yIssues.push(...contentOnHoverFocusIssues(hf));
      } catch (err) {
        a11yIssues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'content-on-hover-focus',
          component: 'page',
          message: `Hover/focus content check failed: ${err instanceof Error ? err.message : String(err)}`,
          suggestion:
            'Testing hover/focus-revealed content did not complete; other checks still ran.',
        });
      }
    }

    if (options.enableResponsive ?? options.enableSpatial) {
      try {
        const snapshots = await extractResponsiveSnapshots(page);
        responsiveIssues.push(...responsiveToValidationIssues(snapshots));
        const util = widthUtilizationFromSnapshots(snapshots);
        widthUtilization = util && util.ran ? util.utilization : null;
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
        // `source:component:message` alone collapses two distinct instances of
        // the same violation (two <Tag> overlap pairs share message text);
        // `details` carries the selectors that tell them apart. Location isn't
        // assigned until enrichDynamicLocations, so it can't be used here.
        const key = `${i.source}:${i.component}:${i.message}:${JSON.stringify(i.details)}`;
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
      widthUtilization,
    };
  };

  const inspectPromise = inspect();
  // If the budget wins below, this rejects later with no awaiter.
  inspectPromise.catch(() => {});

  try {
    return await Promise.race([inspectPromise, budget]);
  } catch (err) {
    // The render completed before inspect() started, so its elapsed time is
    // known even when the inspection phase times out.
    if (err instanceof Error) {
      (err as RenderTimingError).renderTimeMs = handle.result.renderTimeMs;
    }
    throw err;
  } finally {
    clearTimeout(budgetTimer);
    // Always closed, success or failure, and swallowed: a wedged page would
    // otherwise hold the context and Vite server open forever, and a rejecting
    // close() must not overwrite an already-computed successful result.
    await handle.close().catch(() => {});
  }
};
