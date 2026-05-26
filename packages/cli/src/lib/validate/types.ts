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

export type IssueSource =
  | 'prop-validator'
  | 'compiler'
  | 'composition-validator'
  | 'design-system-usage'
  | 'overlap-detector'
  | 'overflow-detector'
  | 'token-compliance'
  | 'theme-variant-validator'
  | 'aom-extractor'
  | 'responsive-checker'
  | 'keyboard-a11y'
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

export type ValidationReport = {
  file: string;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  passed: string[];
  markdown: string;
  metadata: {
    renderTimeMs: number;
    componentsFound: string[];
    checksRun: ValidationCheck[];
  };
};

export type ValidateOptions = {
  checks: ValidationCheck[];
  viewport: { width: number; height: number };
  verbose: boolean;
  themePath?: string;
  skipTheme?: boolean;
};

export const isValidationCheck = (value: string): value is ValidationCheck =>
  value === 'technical' || value === 'spatial' || value === 'a11y';
