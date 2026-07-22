// The `marigold doctor` diagnostic model. The report follows an
// errors/warnings/passed/text shape so it presents a consistent, machine-
// readable contract to humans and AI agents.

export type IssueSeverity = 'error' | 'warning';

// Stable, machine-readable check identifiers. Agents key off these, not titles.
export type CheckId =
  | 'package-presence'
  | 'version-match'
  | 'version-freshness'
  | 'provider-wrapper'
  | 'theme-passed'
  | 'tailwind-config'
  | 'react-peer';

export interface DoctorIssue {
  /** Stable check id, e.g. 'package-presence'. */
  check: CheckId;
  severity: IssueSeverity;
  /** What is wrong. */
  message: string;
  /** How to fix it — a command or an edit. */
  suggestion: string;
  /** Structured extras, e.g. { installed, latest } or { missing: [...] }. */
  details?: Record<string, unknown>;
}

export interface DoctorReport {
  errors: DoctorIssue[];
  warnings: DoctorIssue[];
  /** Titles of the checks that passed. */
  passed: string[];
  /** Rendered, human-readable checklist. */
  text: string;
}

// Text-only presentation hints. A check that has several findings exposes them
// as a `findings` array (plus an optional `headline` lead-in) so the human
// renderer can bullet them directly; the JSON report keeps only the joined
// `message`, so these never cross into `DoctorIssue`.
export interface RenderHints {
  findings?: string[];
  headline?: string;
}

// A single check's outcome before it is split into the report's error/warning
// arrays. `ok` = healthy (goes to `passed`); `skip` = could not be determined and
// is omitted entirely (e.g. freshness while offline).
export type CheckOutcome =
  | { status: 'ok'; title: string }
  | { status: 'skip' }
  | ({ status: 'issue'; title: string } & DoctorIssue & RenderHints);

export interface DoctorContext {
  cwd: string;
  /** Parsed consumer package.json (null if unreadable — handled by checks). */
  pkg: PackageJson | null;
  /** Detected framework / package manager / Tailwind version. */
  project: import('../detect-project.js').ProjectInfo;
  /** Root-layout provider/theme detection (computed once, shared by checks). */
  provider: import('./provider.js').ProviderDetection;
}

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}
