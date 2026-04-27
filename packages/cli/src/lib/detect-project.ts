import fs from 'node:fs';
import path from 'node:path';

export type Framework = 'nextjs' | 'vite' | 'remix' | 'unknown';
export type PackageManager = 'pnpm' | 'yarn' | 'npm' | 'bun';

export interface ProjectInfo {
  cwd: string;
  framework: Framework;
  packageManager: PackageManager;
  hasTailwindConfig: boolean;
  tailwindVersion: 3 | 4 | null;
  rootLayout: string | null;
}

const exists = (p: string): boolean => {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
};

const firstExisting = (cwd: string, candidates: string[]): string | null => {
  for (const c of candidates) {
    const full = path.join(cwd, c);
    if (exists(full)) return full;
  }
  return null;
};

const detectFramework = (cwd: string): Framework => {
  if (
    firstExisting(cwd, [
      'next.config.js',
      'next.config.mjs',
      'next.config.ts',
      'next.config.cjs',
    ])
  ) {
    return 'nextjs';
  }
  if (
    firstExisting(cwd, ['vite.config.js', 'vite.config.mjs', 'vite.config.ts'])
  ) {
    return 'vite';
  }
  if (firstExisting(cwd, ['remix.config.js', 'remix.config.mjs']))
    return 'remix';
  return 'unknown';
};

const detectPackageManager = (cwd: string): PackageManager => {
  if (exists(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (exists(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (exists(path.join(cwd, 'bun.lockb')) || exists(path.join(cwd, 'bun.lock')))
    return 'bun';
  return 'npm';
};

const detectTailwind = (
  cwd: string
): { hasConfig: boolean; version: 3 | 4 | null } => {
  const configPath = firstExisting(cwd, [
    'tailwind.config.js',
    'tailwind.config.mjs',
    'tailwind.config.ts',
    'tailwind.config.cjs',
  ]);
  if (configPath) return { hasConfig: true, version: 3 };

  // v4 uses CSS imports instead of JS config
  const candidates = [
    'app/globals.css',
    'src/app/globals.css',
    'src/index.css',
    'styles/globals.css',
  ];
  for (const c of candidates) {
    const full = path.join(cwd, c);
    if (!exists(full)) continue;
    try {
      const contents = fs.readFileSync(full, 'utf8');
      if (/@import\s+["']tailwindcss["']/.test(contents)) {
        return { hasConfig: true, version: 4 };
      }
    } catch {
      // try next
    }
  }
  return { hasConfig: false, version: null };
};

const detectRootLayout = (cwd: string, framework: Framework): string | null => {
  if (framework === 'nextjs') {
    return (
      firstExisting(cwd, [
        'app/layout.tsx',
        'app/layout.jsx',
        'src/app/layout.tsx',
        'src/app/layout.jsx',
      ]) ?? null
    );
  }
  if (framework === 'vite') {
    return (
      firstExisting(cwd, [
        'src/main.tsx',
        'src/main.jsx',
        'src/App.tsx',
        'src/App.jsx',
      ]) ?? null
    );
  }
  return null;
};

export const detectProject = (cwd: string = process.cwd()): ProjectInfo => {
  const framework = detectFramework(cwd);
  const packageManager = detectPackageManager(cwd);
  const tw = detectTailwind(cwd);
  const rootLayout = detectRootLayout(cwd, framework);

  return {
    cwd,
    framework,
    packageManager,
    hasTailwindConfig: tw.hasConfig,
    tailwindVersion: tw.version,
    rootLayout,
  };
};

export const installCommand = (
  pm: PackageManager,
  pkgs: string[]
): string[] => {
  switch (pm) {
    case 'pnpm':
      return ['pnpm', 'add', ...pkgs];
    case 'yarn':
      return ['yarn', 'add', ...pkgs];
    case 'bun':
      return ['bun', 'add', ...pkgs];
    case 'npm':
    default:
      return ['npm', 'install', ...pkgs];
  }
};
