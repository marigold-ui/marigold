import {
  type ValidationCheck,
  isValidationCheck,
  validate,
} from '../lib/validate/index.js';

export type ValidateFormat = 'json' | 'text';
export type ValidateChecks = 'technical' | 'spatial' | 'a11y' | 'all';

export type RunValidateOptions = {
  file: string;
  checks?: ValidateChecks;
  format?: ValidateFormat;
};

export type RunValidateResult = {
  output: string;
  hasErrors: boolean;
};

// A single check or the literal 'all'. Comma-separated subsets are intentionally
// not supported — the bin layer's isValidateChecks guard rejects them too, and
// measurement always runs the full suite.
export const parseChecks = (input: string): ValidationCheck[] => {
  if (input === 'all') return ['technical', 'spatial', 'a11y'];
  if (isValidationCheck(input)) return [input];
  throw new Error(
    `Invalid check "${input}". Valid values: technical, spatial, a11y, all.`
  );
};

export const runValidate = async (
  options: RunValidateOptions
): Promise<RunValidateResult> => {
  if (process.env.MARIGOLD_VALIDATE_DISABLED === '1') {
    throw new Error(
      'marigold validate is disabled in this configuration (MARIGOLD_VALIDATE_DISABLED=1).'
    );
  }

  if (!options.file) {
    throw new Error(
      'Usage: marigold validate <file.tsx> [--checks technical|spatial|a11y|all] [--format json|text]'
    );
  }

  const checks = parseChecks(options.checks ?? 'all');
  const format = options.format ?? 'text';

  const report = await validate(options.file, {
    checks,
    viewport: { width: 1280, height: 720 },
  });

  const output =
    format === 'json' ? JSON.stringify(report, null, 2) : report.text;

  return { output, hasErrors: report.errors.length > 0 };
};
