#!/usr/bin/env node
// Build the application-examples registry as static assets, served directly by
// Next.js (no route handler):
//   public/mcp/examples.json         — manifest (slug, title, brief, patterns)
//   public/mcp/examples/<slug>.json  — full payload (sidecar metadata + source)
//
// Examples are discovered by the presence of a `*.marigold-pattern.yaml`
// sidecar colocated in app/(examples)/examples/<slug>/. Folders without a
// sidecar (e.g. the App-Shell placeholder pages) are excluded by design — no
// denylist to maintain. A malformed or schema-invalid sidecar fails the build
// (and therefore CI), per DST-1421.
import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.join(__dirname, '..');

// Production layout. Tests call buildExamples() with overrides pointing at
// fixture directories instead.
export const DEFAULTS = {
  rootDir: docsRoot,
  examplesDir: path.join(docsRoot, 'app', '(examples)', 'examples'),
  patternsDir: path.join(docsRoot, 'content', 'patterns'),
  outDir: path.join(docsRoot, 'public', 'mcp'),
  componentsPkgPath: path.join(
    docsRoot,
    '..',
    'packages',
    'components',
    'package.json'
  ),
};

const BASE_URL = 'https://www.marigold-ui.io';
const SIDECAR_SUFFIX = '.marigold-pattern.yaml';
const SOURCE_EXTENSIONS = ['.tsx', '.ts'];

// A schema/reference violation in a sidecar. The validators throw it; the CLI
// runner below turns it into a non-zero exit so a bad sidecar fails CI. Tests
// assert on it directly. Anything else propagates as an unexpected crash.
export class BuildError extends Error {}

// Schema is intentionally strict: an unknown key (e.g. `keyfiles` instead of
// `key_files`) is a typo we want to catch at build time, not silently ignore.
const sidecarSchema = z.strictObject({
  title: z.string().min(1),
  brief: z.string().min(1),
  patterns: z.array(z.string()).default([]),
  mock_data: z
    .array(
      z.strictObject({ alias: z.string().min(1), shape: z.string().min(1) })
    )
    .default([]),
  key_files: z.array(z.string()).default([]),
  scaffolding_files: z.array(z.string()).default([]),
  peer_deps: z.array(z.string()).default([]),
});

const readComponentsVersion = componentsPkgPath => {
  try {
    const pkg = JSON.parse(fs.readFileSync(componentsPkgPath, 'utf-8'));
    return typeof pkg.version === 'string' ? pkg.version : null;
  } catch {
    return null;
  }
};

const findSidecar = dir => {
  const entry = fs.readdirSync(dir).find(name => name.endsWith(SIDECAR_SUFFIX));
  return entry ? path.join(dir, entry) : null;
};

// Reads only the top-level source files of an example folder. All examples are
// flat by convention; if one ever nests source in a subfolder, those files are
// not collected (and a `key_files` entry pointing into a subdir would fail
// checkFileRefs). Make this a recursive walk if that convention changes.
const readSourceFiles = dir =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      entry =>
        entry.isFile() &&
        !entry.name.endsWith(SIDECAR_SUFFIX) &&
        SOURCE_EXTENSIONS.includes(path.extname(entry.name))
    )
    .map(entry => entry.name)
    .sort()
    .map(name => ({
      path: name,
      source: fs.readFileSync(path.join(dir, name), 'utf8'),
    }));

const fail = message => {
  throw new BuildError(message);
};

const validateSidecar = (rootDir, file, raw) => {
  const result = sidecarSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map(
        issue => `   - ${issue.path.join('.') || '(root)'}: ${issue.message}`
      )
      .join('\n');
    fail(`Invalid sidecar ${path.relative(rootDir, file)}:\n${issues}`);
  }
  return result.data;
};

// key_files / scaffolding_files must point at files that actually exist, so a
// rename can't leave a stale reference an agent would chase.
const checkFileRefs = (rootDir, file, data, fileNames) => {
  const known = new Set(fileNames);
  const referenced = [...data.key_files, ...data.scaffolding_files];
  const missing = referenced.filter(name => !known.has(name));
  if (missing.length > 0) {
    fail(
      `Sidecar ${path.relative(rootDir, file)} references files that do not ` +
        `exist in the example folder: ${missing.join(', ')}`
    );
  }
};

// Every pattern slug under content/patterns/ that has an index.mdx, i.e. the
// slugs that resolve through `marigold docs patterns/<slug>`. Used to validate
// sidecar `patterns:` refs at build time.
const readKnownPatterns = dir => {
  const slugs = new Set();
  if (!fs.existsSync(dir)) return slugs;
  const walk = current => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const child = path.join(current, entry.name);
      if (fs.existsSync(path.join(child, 'index.mdx'))) {
        slugs.add(path.relative(dir, child).split(path.sep).join('/'));
      }
      walk(child);
    }
  };
  walk(dir);
  return slugs;
};

// A `patterns:` ref points an agent at `marigold docs patterns/<ref>`; a typo
// (e.g. `user-input/filterr`) would silently ship a 404-bound hint. Same intent
// as checkFileRefs: a stale reference is a build failure, not a silent ship.
const checkPatternRefs = (rootDir, file, data, knownPatterns) => {
  const missing = data.patterns.filter(ref => !knownPatterns.has(ref));
  if (missing.length > 0) {
    fail(
      `Sidecar ${path.relative(rootDir, file)} references pattern docs that do ` +
        `not exist under content/patterns/: ${missing.join(', ')}`
    );
  }
};

// Returns `{ manifest, skipped }`. Throws BuildError on any malformed or
// invalid sidecar. Paths default to the production docs layout (DEFAULTS); the
// test suite overrides them to point at fixture directories.
export const buildExamples = (options = {}) => {
  const {
    rootDir = DEFAULTS.rootDir,
    examplesDir = DEFAULTS.examplesDir,
    patternsDir = DEFAULTS.patternsDir,
    outDir = DEFAULTS.outDir,
    componentsPkgPath = DEFAULTS.componentsPkgPath,
    generatedAt = new Date().toISOString(),
    log = console.log,
  } = options;

  if (!fs.existsSync(examplesDir)) {
    fail(`Examples directory not found: ${examplesDir}`);
  }

  const version = readComponentsVersion(componentsPkgPath);
  const knownPatterns = readKnownPatterns(patternsDir);
  const exampleOutDir = path.join(outDir, 'examples');
  fs.mkdirSync(exampleOutDir, { recursive: true });

  const slugs = fs
    .readdirSync(examplesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  const manifestEntries = [];
  const skipped = [];

  for (const slug of slugs) {
    const dir = path.join(examplesDir, slug);
    const sidecarFile = findSidecar(dir);
    if (!sidecarFile) {
      skipped.push(slug);
      continue;
    }

    let raw;
    try {
      raw = parseYaml(fs.readFileSync(sidecarFile, 'utf8'));
    } catch (err) {
      fail(
        `Could not parse YAML in ${path.relative(rootDir, sidecarFile)}: ` +
          `${err instanceof Error ? err.message : String(err)}`
      );
    }

    const data = validateSidecar(rootDir, sidecarFile, raw);
    const files = readSourceFiles(dir);
    checkFileRefs(
      rootDir,
      sidecarFile,
      data,
      files.map(f => f.path)
    );
    checkPatternRefs(rootDir, sidecarFile, data, knownPatterns);

    const payload = {
      slug,
      title: data.title,
      brief: data.brief,
      patterns: data.patterns,
      mockData: data.mock_data,
      keyFiles: data.key_files,
      scaffoldingFiles: data.scaffolding_files,
      peerDeps: data.peer_deps,
      files,
    };

    fs.writeFileSync(
      path.join(exampleOutDir, `${slug}.json`),
      JSON.stringify(payload)
    );

    manifestEntries.push({
      slug,
      title: data.title,
      brief: data.brief,
      patterns: data.patterns,
    });
  }

  const manifest = {
    version,
    generatedAt,
    baseUrl: BASE_URL,
    examples: manifestEntries,
  };

  fs.writeFileSync(
    path.join(outDir, 'examples.json'),
    JSON.stringify(manifest)
  );

  log(
    `📑 Built examples registry with ${manifestEntries.length} examples → ` +
      `${path.relative(rootDir, path.join(outDir, 'examples.json'))}`
  );
  if (skipped.length > 0) {
    log(
      `   Skipped ${skipped.length} folder(s) without a sidecar: ${skipped.join(', ')}`
    );
  }

  return { manifest, skipped };
};

// Run when invoked directly (`node build-examples.mjs`), not when imported by a
// test. A BuildError becomes a non-zero exit so a bad sidecar fails CI.
const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  try {
    buildExamples();
  } catch (err) {
    if (err instanceof BuildError) {
      console.error(`❌ ${err.message}`);
      process.exit(1);
    }
    throw err;
  }
}
