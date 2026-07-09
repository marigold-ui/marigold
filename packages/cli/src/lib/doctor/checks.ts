import fs from 'node:fs';
import path from 'node:path';
import { installCommand } from '../detect-project.js';
import { CSS_ENTRY_CANDIDATES, firstExisting } from '../fs-utils.js';
import { latestVersions } from './freshness.js';
import {
  allDeps,
  declaredVersion,
  installedVersion,
  readInstalled,
} from './package-json.js';
import type { CheckOutcome, DoctorContext } from './types.js';
import {
  compareVersions,
  minVersionFromRange,
  satisfiesMin,
} from './version.js';

const COMPONENTS = '@marigold/components';
const SYSTEM = '@marigold/system';
const THEME_PREFIX = '@marigold/theme-';
const DEFAULT_THEME = '@marigold/theme-rui';

const themeDeps = (ctx: DoctorContext): string[] =>
  Object.keys(allDeps(ctx.pkg)).filter(name => name.startsWith(THEME_PREFIX));

// --- (a) Package presence -------------------------------------------------

export const checkPackagePresence = (ctx: DoctorContext): CheckOutcome => {
  const missing: string[] = [];
  const deps = allDeps(ctx.pkg);
  if (!deps[COMPONENTS]) missing.push(COMPONENTS);
  if (!deps[SYSTEM]) missing.push(SYSTEM);
  if (themeDeps(ctx).length === 0) missing.push(DEFAULT_THEME);

  const title = 'Packages installed';
  if (missing.length === 0) return { status: 'ok', title };

  return {
    status: 'issue',
    title,
    check: 'package-presence',
    severity: 'error',
    message: `Missing required Marigold package(s): ${missing.join(', ')}.`,
    suggestion: installCommand(ctx.project.packageManager, missing).join(' '),
    details: { missing },
  };
};

// --- (b) Version match (components === system) ----------------------------

export const checkVersionMatch = (ctx: DoctorContext): CheckOutcome => {
  const title = 'Package versions aligned';
  // Presence check owns the missing-declaration error; nothing to compare here.
  if (
    !declaredVersion(ctx.pkg, COMPONENTS) ||
    !declaredVersion(ctx.pkg, SYSTEM)
  ) {
    return { status: 'skip' };
  }

  const components = installedVersion(ctx.cwd, COMPONENTS);
  const system = installedVersion(ctx.cwd, SYSTEM);

  if (!components || !system) {
    const notInstalled = [
      !components ? COMPONENTS : null,
      !system ? SYSTEM : null,
    ].filter(Boolean) as string[];
    return {
      status: 'issue',
      title,
      check: 'version-match',
      severity: 'warning',
      message: `Declared but not installed: ${notInstalled.join(', ')}.`,
      suggestion: `Install dependencies (e.g. ${ctx.project.packageManager} install).`,
      details: { notInstalled },
    };
  }

  if (components !== system) {
    return {
      status: 'issue',
      title,
      check: 'version-match',
      severity: 'error',
      message: `${COMPONENTS} (${components}) and ${SYSTEM} (${system}) must be the same version — they are released together.`,
      suggestion: `Reinstall both at the same version, e.g. ${installCommand(
        ctx.project.packageManager,
        [`${COMPONENTS}@${components}`, `${SYSTEM}@${components}`]
      ).join(' ')}`,
      details: { components, system },
    };
  }

  return { status: 'ok', title };
};

// --- (c) Version freshness (best-effort, cache-only) ----------------------

export const checkVersionFreshness = (ctx: DoctorContext): CheckOutcome => {
  const latest = latestVersions();
  if (!latest) return { status: 'skip' };

  const outdated: { name: string; installed: string; latest: string }[] = [];
  let compared = 0;
  const names = [COMPONENTS, SYSTEM, ...themeDeps(ctx)];
  for (const name of names) {
    const installed = installedVersion(ctx.cwd, name);
    const newest = latest[name];
    if (!installed || !newest) continue;
    compared++;
    if (compareVersions(installed, newest) < 0) {
      outdated.push({ name, installed, latest: newest });
    }
  }

  if (compared === 0) return { status: 'skip' };

  const title = 'Up to date';
  if (outdated.length === 0) return { status: 'ok', title };

  return {
    status: 'issue',
    title,
    check: 'version-freshness',
    severity: 'warning',
    message: `Newer version(s) available: ${outdated
      .map(o => `${o.name} ${o.installed} → ${o.latest}`)
      .join(', ')}.`,
    suggestion: 'Upgrade your Marigold packages to the latest version.',
    details: { outdated },
  };
};

// --- (d) Provider wrapper -------------------------------------------------

export const checkProviderWrapper = (ctx: DoctorContext): CheckOutcome => {
  const title = 'MarigoldProvider wraps the app';
  const { layoutFile, providerFound } = ctx.provider;

  if (!layoutFile) {
    return {
      status: 'issue',
      title,
      check: 'provider-wrapper',
      severity: 'warning',
      message:
        'Could not locate a root layout to inspect for MarigoldProvider.',
      suggestion:
        'If you wrap your app in MarigoldProvider elsewhere, you can ignore this. Otherwise, run `marigold init`.',
    };
  }

  if (providerFound) return { status: 'ok', title };

  return {
    status: 'issue',
    title,
    check: 'provider-wrapper',
    severity: 'warning',
    message: `No <MarigoldProvider> found in ${path.relative(ctx.cwd, layoutFile)}.`,
    suggestion:
      'Wrap your app in <MarigoldProvider theme={theme}> (see `marigold init`). Ignore this if you wrap it in a file doctor did not inspect.',
  };
};

// --- (e) Theme passed to the provider -------------------------------------

export const checkThemePassed = (ctx: DoctorContext): CheckOutcome => {
  const { layoutFile, providerFound, themePassed, inspectedFile } =
    ctx.provider;
  // Provider-wrapper owns the "no layout" / "no provider" warnings.
  if (!layoutFile || !providerFound) return { status: 'skip' };

  const title = 'Theme passed to MarigoldProvider';
  if (themePassed) return { status: 'ok', title };

  return {
    status: 'issue',
    title,
    check: 'theme-passed',
    severity: 'warning',
    message: `<MarigoldProvider> in ${path.relative(
      ctx.cwd,
      inspectedFile ?? layoutFile
    )} has no theme prop.`,
    suggestion:
      "Import a theme and pass it: import theme from '@marigold/theme-rui'; <MarigoldProvider theme={theme}>.",
  };
};

// --- (f) Tailwind config --------------------------------------------------

const buildWiringOk = (ctx: DoctorContext): boolean => {
  const { cwd, project } = ctx;
  const read = (candidates: readonly string[], needle: string): boolean => {
    const file = firstExisting(cwd, candidates);
    if (!file) return false;
    try {
      return fs.readFileSync(file, 'utf8').includes(needle);
    } catch {
      return false;
    }
  };
  if (project.framework === 'nextjs') {
    return read(
      [
        'postcss.config.mjs',
        'postcss.config.js',
        'postcss.config.cjs',
        'postcss.config.ts',
      ],
      '@tailwindcss/postcss'
    );
  }
  if (project.framework === 'vite') {
    return read(
      ['vite.config.ts', 'vite.config.mjs', 'vite.config.js'],
      'tailwindcss'
    );
  }
  // Unknown framework: can't assess build wiring — don't invent a problem.
  return true;
};

export const checkTailwindConfig = (ctx: DoctorContext): CheckOutcome => {
  const title = 'Tailwind configured for Marigold';
  const problems: string[] = [];

  if (ctx.project.tailwindVersion === 3) {
    problems.push(
      "Marigold's theme requires Tailwind v4; you appear to be on v3"
    );
  }

  const cssEntry = firstExisting(ctx.cwd, CSS_ENTRY_CANDIDATES);
  if (!cssEntry) {
    problems.push('could not find a CSS entry file with Tailwind imports');
  } else {
    let css = '';
    try {
      css = fs.readFileSync(cssEntry, 'utf8');
    } catch {
      /* treat as empty */
    }
    if (!/@import\s+["']tailwindcss["']/.test(css)) {
      problems.push("missing `@import 'tailwindcss';`");
    }
    if (!/@import\s+["']@marigold\/theme-[^"']*\/theme\.css["']/.test(css)) {
      problems.push("missing `@import '@marigold/theme-rui/theme.css';`");
    }
    if (!/@source\s+[^;]*@marigold/.test(css)) {
      problems.push('missing `@source` directive for node_modules/@marigold');
    }
    if (!buildWiringOk(ctx)) {
      problems.push(
        ctx.project.framework === 'vite'
          ? 'missing tailwindcss() plugin in vite config'
          : 'missing @tailwindcss/postcss in postcss config'
      );
    }
  }

  if (problems.length === 0) return { status: 'ok', title };

  return {
    status: 'issue',
    title,
    check: 'tailwind-config',
    severity: 'warning',
    message: `Tailwind setup looks incomplete: ${problems.join('; ')}.`,
    suggestion:
      'Run `marigold init` to configure Tailwind, or see the installation guide.',
    details: { problems },
  };
};

// --- (g) React peer dependencies ------------------------------------------

export const checkReactPeer = (ctx: DoctorContext): CheckOutcome => {
  const title = 'React version compatible';
  const components = readInstalled(ctx.cwd, COMPONENTS);
  // Not installed: version-match / presence already speak to it.
  if (!components) return { status: 'skip' };

  const peers = components.peerDependencies ?? {};
  const problems: {
    name: string;
    installed: string | null;
    required: string;
  }[] = [];

  for (const name of ['react', 'react-dom']) {
    const required = peers[name];
    if (!required) continue;
    const installed = installedVersion(ctx.cwd, name);
    const min = minVersionFromRange(required);
    if (!installed) {
      problems.push({ name, installed: null, required });
    } else if (min && !satisfiesMin(installed, min)) {
      problems.push({ name, installed, required });
    }
  }

  if (problems.length === 0) return { status: 'ok', title };

  return {
    status: 'issue',
    title,
    check: 'react-peer',
    severity: 'warning',
    message: problems
      .map(p =>
        p.installed
          ? `${p.name} ${p.installed} does not satisfy ${COMPONENTS}'s peer requirement ${p.required}`
          : `${p.name} is not installed (required ${p.required})`
      )
      .join('; '),
    suggestion: 'Install a compatible React version.',
    details: { problems },
  };
};

export const ALL_CHECKS = [
  checkPackagePresence,
  checkVersionMatch,
  checkVersionFreshness,
  checkProviderWrapper,
  checkThemePassed,
  checkTailwindConfig,
  checkReactPeer,
] as const;
