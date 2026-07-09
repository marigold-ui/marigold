import { runDoctorChecks } from '../lib/doctor/index.js';

export type DoctorFormat = 'text' | 'json';

export interface RunDoctorOptions {
  cwd?: string;
  format?: DoctorFormat;
}

export interface RunDoctorResult {
  output: string;
  hasErrors: boolean;
}

export const isDoctorFormat = (v: string): v is DoctorFormat =>
  v === 'text' || v === 'json';

export const runDoctor = async (
  options: RunDoctorOptions = {}
): Promise<RunDoctorResult> => {
  const report = runDoctorChecks(options.cwd ?? process.cwd());
  const output =
    (options.format ?? 'text') === 'json'
      ? JSON.stringify(report, null, 2)
      : report.text;
  return { output, hasErrors: report.errors.length > 0 };
};
