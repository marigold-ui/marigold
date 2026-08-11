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
  const format = options.format ?? 'text';

  // Skipped, not failed: an automated correction loop gates on the exit
  // code, and "validation is turned off" must not read as "this file is
  // broken" the way a thrown error (exit 1) would. The payload still has to
  // honor --format: a json consumer parsing this output would otherwise
  // throw on a plain English sentence.
  if (process.env.MARIGOLD_VALIDATE_DISABLED === '1') {
    const reason = 'MARIGOLD_VALIDATE_DISABLED=1';
    return {
      output:
        format === 'json'
          ? JSON.stringify({ skipped: true, reason })
          : `marigold validate is disabled in this configuration (${reason}). Skipping.`,
      hasErrors: false,
    };
  }

  if (!options.file) {
    throw new Error(
      'Usage: marigold validate <file.tsx> [--checks technical|spatial|a11y|all] [--format json|text]'
    );
  }

  const checks = parseChecks(options.checks ?? 'all');

  const report = await validate(options.file, {
    checks,
    viewport: { width: 1280, height: 720 },
  });

  const output =
    format === 'json' ? JSON.stringify(report, null, 2) : report.text;

  return { output, hasErrors: report.errors.length > 0 };
};
