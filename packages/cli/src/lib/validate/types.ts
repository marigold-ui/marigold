export type ValidationCheck = 'technical' | 'spatial' | 'a11y';

export type IssueType = 'technical' | 'spatial' | 'style' | 'a11y';

/**
 * error — blocks correctness: type errors, missing required props, missing
 *   required sub-components, critical a11y violations, component overlaps.
 * warning — likely improvable: wrong prop values, missing optional
 *   sub-components, native-over-DS-component usage, invalid theme variants,
 *   placeholder-only labels, layout wrapping/overflow.
 */
export type IssueSeverity = 'error' | 'warning';

export type SourceLocation = {
  file: string;
  line: number;
  column: number;
};

/**
 * Checkers that run against the rendered DOM, as a value rather than a type
 * union: their findings arrive without a source location, and `index.ts` builds
 * the set `enrichDynamicLocations` consults straight from this array. That is
 * the point of the array — the previous shape kept a second hand-maintained
 * `Set` of the same names in `index.ts`, and two of the nine were missing from
 * it, so `non-text-contrast` and `content-on-hover-focus` findings printed with
 * neither a line number nor the explicit `scope: 'page'` marker every other
 * rendered finding gets. Add a new render-time source here, not to the static
 * union below.
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
  | StaticIssueSource
  | (typeof DYNAMIC_ISSUE_SOURCES)[number]
  | 'runtime';

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
 * Tracks how much of the generated code could actually be validated
 * statically. Variant/enum props with a dynamic value (e.g.
 * `variant={cond ? 'a' : 'b'}`) cannot be checked against the schema and are
 * skipped. Surfacing these counts makes the coverage of the syntactic
 * analysis transparent instead of silently incomplete.
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
    // Desktop width-utilisation metric (0..1) = fraction of the 1280px viewport
    // width covered by content. Low = "stuck in mobile shape on desktop". null
    // when not computed (no render, spatial check off, or a trivial layout).
    // Score-free; a RELATIVE signal across configs, not an absolute quality
    // measure. See spatial/responsive.ts computeWidthUtilization.
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
