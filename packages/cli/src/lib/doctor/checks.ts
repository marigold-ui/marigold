import fs from 'node:fs';
import path from 'node:path';
import { installCommand } from '../detect-project.js';
import {
  CSS_ENTRY_CANDIDATES,
  POSTCSS_CONFIG_CANDIDATES,
  TAILWIND_POSTCSS_PLUGIN,
  firstExisting,
} from '../fs-utils.js';
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

  const findings = outdated.map(o => `${o.name} ${o.installed} → ${o.latest}`);
  const headline = 'Newer version(s) available:';
  return {
    status: 'issue',
    title,
    check: 'version-freshness',
    severity: 'warning',
    message: `${headline} ${findings.join('; ')}.`,
    headline,
    findings,
    suggestion: 'Upgrade your Marigold packages to the latest version.',
    details: { outdated },
  };
};

// --- (d) Provider wrapper -------------------------------------------------

export const checkProviderWrapper = (ctx: DoctorContext): CheckOutcome => {
  const title = 'MarigoldProvider wraps the app';
  const { layoutFile, inspectedFile, providerFound, providerImported } =
    ctx.provider;

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

  // A `<MarigoldProvider>` element with no matching import renders nothing and
  // throws at runtime — this is the "looks wired up but is broken" case.
  if (providerFound && !providerImported) {
    const where = path.relative(ctx.cwd, inspectedFile ?? layoutFile);
    return {
      status: 'issue',
      title,
      check: 'provider-wrapper',
      severity: 'error',
      message: `<MarigoldProvider> is used in ${where} but is never imported from @marigold/components.`,
      suggestion:
        "Add `import { MarigoldProvider } from '@marigold/components';` to the file.",
      details: { imported: false },
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
  const {
    layoutFile,
    providerFound,
    themePassed,
    themeImported,
    inspectedFile,
  } = ctx.provider;
  // Provider-wrapper owns the "no layout" / "no provider" cases. When a provider
  // *is* found we still assess its theme independently of whether the provider
  // itself is imported — a missing provider import and a missing theme import are
  // two separate fixes, and both should surface in one run.
  if (!layoutFile || !providerFound) {
    return { status: 'skip' };
  }

  const title = 'Theme passed to MarigoldProvider';
  const where = path.relative(ctx.cwd, inspectedFile ?? layoutFile);
  const themeFix =
    "Import a theme and pass it: import theme from '@marigold/theme-rui'; <MarigoldProvider theme={theme}>.";

  if (!themePassed) {
    return {
      status: 'issue',
      title,
      check: 'theme-passed',
      severity: 'warning',
      message: `<MarigoldProvider> in ${where} has no theme prop.`,
      suggestion: themeFix,
    };
  }

  // A `theme={theme}` prop whose value has no matching import/declaration is an
  // undefined reference — the provider renders with no theme.
  if (!themeImported) {
    return {
      status: 'issue',
      title,
      check: 'theme-passed',
      severity: 'warning',
      message: `<MarigoldProvider> in ${where} is passed a theme prop whose value is never imported.`,
      suggestion: themeFix,
      details: { themeImported: false },
    };
  }

  return { status: 'ok', title };
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
    return read(POSTCSS_CONFIG_CANDIDATES, TAILWIND_POSTCSS_PLUGIN);
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

  const headline = 'Tailwind setup looks incomplete:';
  return {
    status: 'issue',
    title,
    check: 'tailwind-config',
    severity: 'warning',
    message: `${headline} ${problems.join('; ')}.`,
    headline,
    findings: problems,
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

  const findings = problems.map(p =>
    p.installed
      ? `${p.name} ${p.installed} does not satisfy ${COMPONENTS}'s peer requirement ${p.required}`
      : `${p.name} is not installed (required ${p.required})`
  );
  return {
    status: 'issue',
    title,
    check: 'react-peer',
    severity: 'warning',
    message: findings.join('; '),
    findings,
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
