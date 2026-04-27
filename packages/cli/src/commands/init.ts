import * as prompts from '@clack/prompts';
import pc from 'picocolors';
import { spawn } from 'node:child_process';
import {
  type Framework,
  type PackageManager,
  type ProjectInfo,
  detectProject,
  installCommand,
} from '../lib/detect-project.js';

const MARIGOLD_PACKAGES = [
  '@marigold/components',
  '@marigold/system',
  '@marigold/theme-rui',
];

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

const buildNextSteps = (project: ProjectInfo): string => {
  const frameworkBlock = (() => {
    switch (project.framework) {
      case 'nextjs':
        return nextjsInstructions(project);
      case 'vite':
        return viteInstructions(project);
      case 'remix':
        return genericInstructions('Remix');
      default:
        return genericInstructions('your app');
    }
  })();

  return [
    pc.bold('Next steps:'),
    '',
    frameworkBlock,
    '',
    pc.dim(
      'Run `marigold docs Button` to verify the CLI works against the docs site.'
    ),
    '',
  ].join('\n');
};

const codeBlock = (s: string): string =>
  s
    .split('\n')
    .map(line => pc.cyan('  ' + line))
    .join('\n');

const nextjsInstructions = (project: ProjectInfo): string => {
  const layoutHint = project.rootLayout
    ? `  Found ${pc.bold(project.rootLayout)} — wrap children with <Providers>.`
    : pc.yellow(
        '  Could not find app/layout.tsx — wrap your root layout manually.'
      );

  return [
    pc.bold('1. Add Marigold to your global CSS') +
      pc.dim(' (usually app/globals.css)'),
    '',
    codeBlock(
      [
        `@import 'tailwindcss';`,
        `@import '@marigold/theme-rui/theme.css';`,
        ``,
        `@source '../../node_modules/@marigold';`,
      ].join('\n')
    ),
    '',
    pc.bold('2. Create app/providers.tsx'),
    '',
    codeBlock(
      [
        `'use client';`,
        `import { MarigoldProvider } from '@marigold/components';`,
        `import theme from '@marigold/theme-rui';`,
        ``,
        `export function Providers({ children }: { children: React.ReactNode }) {`,
        `  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;`,
        `}`,
      ].join('\n')
    ),
    '',
    pc.bold('3. Wrap the root layout'),
    layoutHint,
    '',
    codeBlock(
      [
        `import { Providers } from './providers';`,
        ``,
        `export default function RootLayout({ children }) {`,
        `  return (`,
        `    <html lang="en">`,
        `      <body><Providers>{children}</Providers></body>`,
        `    </html>`,
        `  );`,
        `}`,
      ].join('\n')
    ),
  ].join('\n');
};

const viteInstructions = (project: ProjectInfo): string => {
  const entryHint = project.rootLayout
    ? `  Found ${pc.bold(project.rootLayout)} — wrap your app with <MarigoldProvider>.`
    : pc.yellow(
        '  Could not find src/main.tsx or src/App.tsx — wrap your app manually.'
      );

  return [
    pc.bold('1. Add Marigold to your main CSS') +
      pc.dim(' (usually src/index.css)'),
    '',
    codeBlock(
      [
        `@import 'tailwindcss';`,
        `@import '@marigold/theme-rui/theme.css';`,
        ``,
        `@source '../node_modules/@marigold';`,
      ].join('\n')
    ),
    '',
    pc.bold('2. Wrap your app with <MarigoldProvider>'),
    entryHint,
    '',
    codeBlock(
      [
        `import { MarigoldProvider } from '@marigold/components';`,
        `import theme from '@marigold/theme-rui';`,
        ``,
        `export function App() {`,
        `  return <MarigoldProvider theme={theme}>{/* your app */}</MarigoldProvider>;`,
        `}`,
      ].join('\n')
    ),
  ].join('\n');
};

const genericInstructions = (name: string): string =>
  [
    pc.yellow(`Framework-specific setup for ${name} not automated yet.`),
    '',
    `1. Import Tailwind + theme CSS: @import 'tailwindcss'; @import '@marigold/theme-rui/theme.css';`,
    `2. Wrap your root component with <MarigoldProvider theme={theme}>.`,
    `3. See https://www.marigold-ui.io/getting-started/installation for details.`,
  ].join('\n');

export const runInit = async (
  options: RunInitOptions = {}
): Promise<RunInitResult> => {
  const cwd = options.cwd ?? process.cwd();
  const project = detectProject(cwd);
  if (options.framework) project.framework = options.framework;

  const isInteractive =
    !options.yes && process.stdout.isTTY && process.stdin.isTTY;

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

  if (!project.tailwindVersion) {
    prompts.log.warn(
      'Tailwind not detected. Install it first — Marigold requires Tailwind v4.'
    );
  }

  if (isInteractive) {
    const proceed = await prompts.confirm({
      message: `Install ${MARIGOLD_PACKAGES.join(', ')} with ${project.packageManager}?`,
    });
    if (prompts.isCancel(proceed) || proceed === false) {
      prompts.cancel('Aborted.');
      return { installed: false, project, nextSteps: '' };
    }
  }

  if (!options.skipInstall) {
    const spinner = prompts.spinner();
    spinner.start(`Installing with ${project.packageManager}`);
    try {
      await runInstall(project.packageManager, MARIGOLD_PACKAGES, cwd);
      spinner.stop(pc.green('Packages installed.'));
    } catch (err) {
      spinner.stop(pc.red('Install failed.'));
      throw err;
    }
  }

  const nextSteps = buildNextSteps(project);
  prompts.outro(nextSteps);

  return { installed: !options.skipInstall, project, nextSteps };
};
