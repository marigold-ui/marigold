import {
  type ValidationCheck,
  isValidationCheck,
  validate,
} from '../lib/validate/index.js';

export type ValidateFormat = 'json' | 'markdown';
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

const parseChecks = (input: string): ValidationCheck[] => {
  if (input === 'all') return ['technical', 'spatial', 'a11y'];
  const parts = input.split(',').map(s => s.trim());
  const checks: ValidationCheck[] = [];
  for (const p of parts) {
    if (!isValidationCheck(p)) {
      throw new Error(
        `Invalid check "${p}". Valid values: technical, spatial, a11y, all.`
      );
    }
    checks.push(p);
  }
  return checks;
};

export const runValidate = async (
  options: RunValidateOptions
): Promise<RunValidateResult> => {
  if (process.env.MARIGOLD_VALIDATE_DISABLED === '1') {
    process.stderr.write(
      'Validation disabled via MARIGOLD_VALIDATE_DISABLED.\n'
    );
    return { output: '', hasErrors: false };
  }

  if (!options.file) {
    throw new Error(
      'Usage: marigold validate <file.tsx> [--checks technical|spatial|all] [--format json|markdown]'
    );
  }

  const checks = parseChecks(options.checks ?? 'all');
  const format = options.format ?? 'markdown';

  const report = await validate(options.file, {
    checks,
    verbose: false,
    viewport: { width: 1280, height: 720 },
  });

  const output =
    format === 'json' ? JSON.stringify(report, null, 2) : report.markdown;

  return { output, hasErrors: report.errors.length > 0 };
};
