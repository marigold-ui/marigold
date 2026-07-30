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
