export const filterAcceptedFiles = (
  files: File[],
  acceptedFileTypes?: ReadonlyArray<string>
): File[] => {
  if (!acceptedFileTypes || acceptedFileTypes.length === 0) return files;
  // If any token allows all, short-circuit
  if (
    acceptedFileTypes.some(token => tokenAllowsAll(token.trim().toLowerCase()))
  ) {
    return files;
  }
  return files.filter(file =>
    acceptedFileTypes.some(token => matchesAcceptedToken(file, token))
  );
};

export const isFileDropItem = (
  item: any
): item is { kind: 'file'; getFile: () => Promise<File> } =>
  item &&
  typeof item === 'object' &&
  (item as any).kind === 'file' &&
  typeof (item as any).getFile === 'function';

// Accepted file types matching helpers
// Supports tokens like '*', '*/*', '.pdf', 'pdf', 'image/*', 'application/pdf'.
const tokenAllowsAll = (token: string) => token === '*' || token === '*/*';
const toLower = (s: string) => s.toLowerCase();

const matchesAcceptedToken = (file: File, token: string): boolean => {
  const t = toLower(token.trim());
  if (!t) return false;
  if (tokenAllowsAll(t)) return true;

  const fileType = toLower(file.type || '');
  const fileName = toLower(file.name || '');

  // Extension without dot treated like '.ext'
  if (!t.includes('/') && !t.startsWith('.')) {
    const ext = `.${t}`;
    return fileName.endsWith(ext);
  }

  // Extension with dot
  if (t.startsWith('.')) {
    return fileName.endsWith(t);
  }

  // Mime wildcard e.g. image/*
  if (t.endsWith('/*')) {
    const prefix = t.slice(0, t.length - 1); // keep trailing '/'
    return fileType.startsWith(prefix);
  }

  // Exact mime
  return fileType === t;
};

// Identity of a file for de-duplication and removal: two files with the same
// name, size, and last-modified time are treated as the same file.
export const fileKey = (file: File): string =>
  `${file.name}:${file.size}:${file.lastModified}`;

const dedupeFiles = (files: File[]): File[] => {
  const seen = new Set<string>();
  return files.filter(file => {
    const key = fileKey(file);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// `kB`/`MB`/`GB`/`TB` are SI symbols, so the step is 1000, matching what
// Finder, GNOME Files and the browser download UIs report.
const FILE_SIZE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB'] as const;
const FILE_SIZE_STEP = 1000;
const FILE_SIZE_FRACTION_DIGITS = 2;
const FILE_SIZE_ROUNDING = 10 ** FILE_SIZE_FRACTION_DIGITS;

// Not `style: 'unit'`, which spells bytes out (`340 byte`) next to an
// abbreviated `kB` in the same list. Exported so a caller's formatter and
// `FILE_SIZE_ROUNDING` share one source for the fraction digits.
export const FILE_SIZE_FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  maximumFractionDigits: FILE_SIZE_FRACTION_DIGITS,
};

/**
 * Formats a file size with the unit that fits its magnitude, so a 2,400-byte
 * CSV reads as `2.4 kB` instead of rounding away to `0.00 MB`. Takes the
 * formatter so it stays pure (`useNumberFormatter(FILE_SIZE_FORMAT_OPTIONS)`).
 */
export const formatFileSize = (
  size: number,
  formatter: Intl.NumberFormat
): string => {
  const bytes = Number.isFinite(size) && size > 0 ? size : 0;
  const top = FILE_SIZE_UNITS.length - 1;
  const magnitude =
    bytes === 0
      ? 0
      : Math.min(
          Math.max(Math.floor(Math.log(bytes) / Math.log(FILE_SIZE_STEP)), 0),
          top
        );
  const rounded =
    Math.round((bytes / FILE_SIZE_STEP ** magnitude) * FILE_SIZE_ROUNDING) /
    FILE_SIZE_ROUNDING;
  const exponent =
    magnitude < top && rounded >= FILE_SIZE_STEP ? magnitude + 1 : magnitude;
  const value = formatter.format(bytes / FILE_SIZE_STEP ** exponent);

  return `${value} ${FILE_SIZE_UNITS[exponent]}`;
};

export const normalizeAndLimitFiles = (
  files: File[],
  {
    accept,
    multiple,
  }: {
    accept?: ReadonlyArray<string>;
    multiple?: boolean;
  }
): File[] => {
  const accepted = dedupeFiles(filterAcceptedFiles(files, accept));

  return multiple ? accepted : accepted.slice(0, 1);
};
