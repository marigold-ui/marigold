export type ValidationCheck = 'technical' | 'spatial' | 'a11y';

export type IssueType = 'technical' | 'spatial' | 'style' | 'a11y';

/**
 * error — blocks correctness: type errors, missing required props, missing
 *   required sub-components, critical a11y violations, component overlaps.
 * warning — likely improvable: wrong prop values, missing optional
 *   sub-components, native-over-DS-component usage, invalid theme variants,
 *   placeholder-only labels, layout wrapping/overflow.
 *
 * THE SEVERITY POLICY, referenced from the checkers: an `error` must be
 * deterministic and false-positive-free. Every runtime measurement and every
 * threshold-based heuristic is therefore a `warning`, however confident the
 * individual finding looks — as is anything above WCAG Level A, since those
 * criteria carry judgement. Sites that cite this rule note only what makes
 * them heuristic, not the rule itself.
 */
export type IssueSeverity = 'error' | 'warning';

export type SourceLocation = {
  file: string;
  line: number;
  column: number;
};

/**
 * Checkers running against the rendered DOM, as a value rather than a type
 * union: their findings carry no source location, and index.ts builds
 * `enrichDynamicLocations`'s set straight from this array. That is the point —
 * the hand-maintained `Set` it replaces was missing two of the nine, so those
 * findings printed without a line number or the `scope: 'page'` marker. Add a
 * new render-time source here, not to the static union below.
 */
export const DYNAMIC_ISSUE_SOURCES = [
  'overlap-detector',
  'overflow-detector',
  'token-compliance',
  'aom-extractor',
  'responsive-checker',
  'keyboard-a11y',
  'text-spacing',
  'non-text-contrast',
  'content-on-hover-focus',
] as const;

/** Checkers that run on the source alone — they carry their own locations. */
type StaticIssueSource =
  | 'prop-validator'
  | 'compiler'
  | 'composition-validator'
  | 'accessible-name'
  | 'required-ancestor'
  | 'section-header'
  | 'design-system-usage'
  | 'collection-id'
  | 'layout-usage'
  | 'table-usage'
  | 'component-conventions'
  | 'theme-variant-validator';

export type IssueSource =
  StaticIssueSource | (typeof DYNAMIC_ISSUE_SOURCES)[number] | 'runtime';

export type ValidationIssue = {
  type: IssueType;
  severity: IssueSeverity;
  source: IssueSource;
  component: string;
  message: string;
  suggestion: string;
  location?: SourceLocation;
  details?: Record<string, unknown>;
};

/**
 * How much of the code could actually be validated statically. A prop with a
 * dynamic value (`variant={cond ? 'a' : 'b'}`) can't be checked against the
 * schema, so these counts keep the coverage gap visible.
 */
export type ValidationCoverage = {
  /** Variant/enum prop assignments with a static value that was checked. */
  staticValuesChecked: number;
  /** Variant/enum prop assignments skipped because the value was dynamic. */
  dynamicValuesSkipped: number;
  /** Spread attributes ({...props}) that bypassed prop validation entirely. */
  spreadPropsBypassed: number;
};

export const emptyCoverage = (): ValidationCoverage => ({
  staticValuesChecked: 0,
  dynamicValuesSkipped: 0,
  spreadPropsBypassed: 0,
});

export type ValidationReport = {
  file: string;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  passed: string[];
  // Human/LLM-readable plain-text rendering of the report (not Markdown).
  text: string;
  metadata: {
    renderTimeMs: number;
    componentsFound: string[];
    checksRun: ValidationCheck[];
    coverage: ValidationCoverage;
    // Fraction of the 1280px viewport covered by content; low means "stuck in
    // mobile shape on desktop". null when not computed. A relative signal
    // across configs, not an absolute measure. See computeWidthUtilization.
    widthUtilization?: number | null;
  };
};

export type ValidateOptions = {
  checks: ValidationCheck[];
  viewport: { width: number; height: number };
  themePath?: string;
  skipTheme?: boolean;
};

export const isValidationCheck = (value: string): value is ValidationCheck =>
  value === 'technical' || value === 'spatial' || value === 'a11y';
