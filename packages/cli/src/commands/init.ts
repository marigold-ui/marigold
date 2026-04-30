import * as prompts from '@clack/prompts';
import pc from 'picocolors';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  type Framework,
  type PackageManager,
  type ProjectInfo,
  detectProject,
  installCommand,
} from '../lib/detect-project.js';
import { type CssEditOutcome, editCss } from '../lib/edit-css.js';
import {
  PROVIDERS_TEMPLATE,
  type TsxEditOutcome,
  editNextLayout,
  editViteEntry,
} from '../lib/edit-tsx.js';
import {
  type ViteConfigEditOutcome,
  editViteConfig,
} from '../lib/edit-vite-config.js';

const MARIGOLD_PACKAGES = [
  '@marigold/components',
  '@marigold/system',
  '@marigold/theme-rui',
];

const POSTCSS_CONFIG = `const config = {
  plugins: ['@tailwindcss/postcss'],
};

export default config;
`;

export interface RunInitOptions {
  cwd?: string;
  yes?: boolean;
  framework?: Framework;
  skipInstall?: boolean;
}

export interface RunInitResult {
  installed: boolean;
  project: ProjectInfo;
  nextSteps: string;
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

const tailwindPackagesFor = (framework: Framework): string[] => {
  if (framework === 'nextjs') {
    return ['tailwindcss', '@tailwindcss/postcss', 'postcss'];
  }
  if (framework === 'vite') {
    return ['tailwindcss', '@tailwindcss/vite'];
  }
  return ['tailwindcss'];
};

const runInstall = (pm: PackageManager, pkgs: string[], cwd: string) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = installCommand(pm, pkgs);
    const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: false });
    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
    child.on('error', reject);
  });

const writeIfMissing = (
  abs: string,
  contents: string
): { kind: 'created' | 'exists'; path: string } => {
  if (exists(abs)) return { kind: 'exists', path: abs };
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contents);
  return { kind: 'created', path: abs };
};

const relFromCwd = (cwd: string, abs: string): string =>
  path.relative(cwd, abs) || abs;

interface ApplyResult {
  edits: string[];
  fallbacks: string[];
}

const configureTailwindForFramework = (
  cwd: string,
  framework: Framework,
  out: ApplyResult
): void => {
  if (framework === 'vite') {
    const configPath = firstExisting(cwd, [
      'vite.config.ts',
      'vite.config.mjs',
      'vite.config.js',
    ]);
    if (!configPath) {
      out.fallbacks.push(
        'Could not find vite.config.{ts,mjs,js}. Add `@tailwindcss/vite` to your plugins manually.'
      );
      return;
    }
    const source = fs.readFileSync(configPath, 'utf8');
    const result: ViteConfigEditOutcome = editViteConfig(source);
    const rel = relFromCwd(cwd, configPath);
    if (result.kind === 'edited') {
      fs.writeFileSync(configPath, result.output);
      out.edits.push(`patched ${rel} (${result.changes.join(', ')})`);
    } else if (result.kind === 'unchanged') {
      out.edits.push(`${rel} already configured`);
    } else {
      out.fallbacks.push(
        `Could not patch ${rel} (${result.reason}). Register \`tailwindcss()\` in plugins manually.`
      );
    }
    return;
  }

  if (framework === 'nextjs') {
    const existingPostcss = firstExisting(cwd, [
      'postcss.config.mjs',
      'postcss.config.js',
      'postcss.config.cjs',
      'postcss.config.ts',
    ]);
    if (existingPostcss) {
      const rel = relFromCwd(cwd, existingPostcss);
      const contents = fs.readFileSync(existingPostcss, 'utf8');
      if (contents.includes('@tailwindcss/postcss')) {
        out.edits.push(`${rel} already configured`);
      } else {
        out.fallbacks.push(
          `Add \`'@tailwindcss/postcss'\` to plugins in ${rel}.`
        );
      }
      return;
    }
    const target = path.join(cwd, 'postcss.config.mjs');
    const result = writeIfMissing(target, POSTCSS_CONFIG);
    out.edits.push(
      result.kind === 'created'
        ? `created ${relFromCwd(cwd, target)}`
        : `${relFromCwd(cwd, target)} already exists`
    );
  }
};

const applyCssEdit = (
  cwd: string,
  framework: Framework,
  out: ApplyResult
): void => {
  const result: CssEditOutcome = editCss({ cwd, framework });
  if (result.kind === 'edited') {
    const rel = relFromCwd(cwd, result.path);
    out.edits.push(
      result.created
        ? `created ${rel} (${result.added.join(', ')})`
        : `patched ${rel} (added ${result.added.join(', ')})`
    );
  } else if (result.kind === 'unchanged') {
    out.edits.push(`${relFromCwd(cwd, result.path)} already configured`);
  } else {
    out.fallbacks.push(`CSS edit skipped: ${result.reason}`);
  }
};

const applyNextLayoutEdit = (
  cwd: string,
  layoutPath: string,
  out: ApplyResult
): void => {
  const layoutDir = path.dirname(layoutPath);
  const providersPath = path.join(layoutDir, 'providers.tsx');
  const providersResult = writeIfMissing(providersPath, PROVIDERS_TEMPLATE);
  out.edits.push(
    providersResult.kind === 'created'
      ? `created ${relFromCwd(cwd, providersPath)}`
      : `${relFromCwd(cwd, providersPath)} already exists`
  );

  const source = fs.readFileSync(layoutPath, 'utf8');
  const result: TsxEditOutcome = editNextLayout(source, {
    providersImport: './providers',
  });
  const rel = relFromCwd(cwd, layoutPath);
  if (result.kind === 'edited') {
    fs.writeFileSync(layoutPath, result.output);
    out.edits.push(`patched ${rel} (${result.changes.join(', ')})`);
  } else if (result.kind === 'unchanged') {
    out.edits.push(`${rel} already wrapped`);
  } else {
    out.fallbacks.push(
      `Could not patch ${rel} (${result.reason}). Wrap {children} with <Providers> manually.`
    );
  }
};

const applyViteEntryEdit = (
  cwd: string,
  entryPath: string,
  out: ApplyResult
): void => {
  const source = fs.readFileSync(entryPath, 'utf8');
  const result: TsxEditOutcome = editViteEntry(source);
  const rel = relFromCwd(cwd, entryPath);
  if (result.kind === 'edited') {
    fs.writeFileSync(entryPath, result.output);
    out.edits.push(`patched ${rel} (${result.changes.join(', ')})`);
  } else if (result.kind === 'unchanged') {
    out.edits.push(`${rel} already wrapped`);
  } else {
    out.fallbacks.push(
      `Could not patch ${rel} (${result.reason}). Wrap your root <App /> with <MarigoldProvider theme={theme}> manually.`
    );
  }
};

const buildSummary = (result: ApplyResult): string => {
  const lines: string[] = [pc.bold('Setup complete:'), ''];
  for (const e of result.edits) lines.push(`  ${pc.green('✓')} ${e}`);
  if (result.fallbacks.length > 0) {
    lines.push('', pc.bold(pc.yellow('Manual steps remaining:')), '');
    for (const f of result.fallbacks) lines.push(`  ${pc.yellow('!')} ${f}`);
  }
  lines.push(
    '',
    pc.dim(
      'Run `marigold docs Button` to verify the CLI works against the docs site.'
    ),
    ''
  );
  return lines.join('\n');
};

export const runInit = async (
  options: RunInitOptions = {}
): Promise<RunInitResult> => {
  const cwd = options.cwd ?? process.cwd();
  const project = detectProject(cwd);
  if (options.framework) project.framework = options.framework;

  const isInteractive =
    !options.yes && process.stdout.isTTY && process.stdin.isTTY;
  const canInstall = !options.skipInstall;

  prompts.intro(pc.bgCyan(pc.black(' marigold init ')));
  prompts.log.info(
    [
      `Framework:       ${pc.bold(project.framework)}`,
      `Package manager: ${pc.bold(project.packageManager)}`,
      `Tailwind:        ${
        project.tailwindVersion
          ? `v${project.tailwindVersion} detected`
          : pc.yellow('not detected')
      }`,
    ].join('\n')
  );

  let setupTailwind = Boolean(project.tailwindVersion);
  if (!project.tailwindVersion) {
    if (project.framework !== 'nextjs' && project.framework !== 'vite') {
      prompts.log.warn(
        'Tailwind not detected. Auto-install only supported for Next.js and Vite — install Tailwind v4 manually.'
      );
    } else if (options.yes) {
      setupTailwind = true;
    } else if (isInteractive) {
      const ans = await prompts.confirm({
        message:
          'Tailwind not detected. Install Tailwind v4 and configure it for you?',
      });
      if (prompts.isCancel(ans)) {
        prompts.cancel('Aborted.');
        return { installed: false, project, nextSteps: '' };
      }
      setupTailwind = ans === true;
    } else {
      prompts.log.warn(
        'Tailwind not detected. Re-run with `--yes` or in an interactive shell to auto-install.'
      );
    }
  }
  const installTailwind =
    setupTailwind && !project.tailwindVersion && canInstall;

  if (isInteractive && canInstall) {
    const proceed = await prompts.confirm({
      message: `Install ${MARIGOLD_PACKAGES.join(', ')} with ${project.packageManager}?`,
    });
    if (prompts.isCancel(proceed) || proceed === false) {
      prompts.cancel('Aborted.');
      return { installed: false, project, nextSteps: '' };
    }
  }

  const allPkgs = [
    ...(installTailwind ? tailwindPackagesFor(project.framework) : []),
    ...MARIGOLD_PACKAGES,
  ];

  if (canInstall) {
    const spinner = prompts.spinner();
    spinner.start(`Installing with ${project.packageManager}`);
    try {
      await runInstall(project.packageManager, allPkgs, cwd);
      spinner.stop(pc.green('Packages installed.'));
    } catch (err) {
      spinner.stop(pc.red('Install failed.'));
      throw err;
    }
  }

  const apply: ApplyResult = { edits: [], fallbacks: [] };

  if (
    setupTailwind &&
    (project.framework === 'nextjs' || project.framework === 'vite')
  ) {
    configureTailwindForFramework(cwd, project.framework, apply);
    applyCssEdit(cwd, project.framework, apply);
  } else {
    apply.fallbacks.push(
      "Skipped CSS + Tailwind config. Install Tailwind v4, then add `@import 'tailwindcss'` and `@import '@marigold/theme-rui/theme.css'` to your global CSS."
    );
  }

  if (project.framework === 'nextjs' && project.rootLayout) {
    applyNextLayoutEdit(cwd, project.rootLayout, apply);
  } else if (project.framework === 'vite' && project.rootLayout) {
    applyViteEntryEdit(cwd, project.rootLayout, apply);
  } else if (project.framework === 'nextjs' || project.framework === 'vite') {
    apply.fallbacks.push(
      project.framework === 'nextjs'
        ? 'Could not find app/layout.tsx — wrap {children} with <Providers> manually.'
        : 'Could not find src/main.tsx — wrap your root <App /> with <MarigoldProvider theme={theme}> manually.'
    );
  } else {
    apply.fallbacks.push(
      'Unrecognized framework — see https://www.marigold-ui.io/getting-started/installation.'
    );
  }

  const nextSteps = buildSummary(apply);
  prompts.outro(nextSteps);

  return { installed: canInstall, project, nextSteps };
};
