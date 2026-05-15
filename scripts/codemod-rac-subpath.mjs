#!/usr/bin/env node
/**
 * Rewrites `import ... from 'react-aria-components'` to deep subpath imports
 * across packages/components/src/**.
 *
 * Subpath selection is driven by parsing react-aria-components' published
 * `dist/types/exports/*.d.ts` files: each file is a subpath and lists its
 * exported specifiers. A small OVERRIDES table handles cross-cutting symbols
 * (Provider, useContextProps, useSlottedContext live in `/slots`,
 * DropIndicator lives in `/useDragAndDrop`, etc.).
 *
 * Specifiers that are not exported from any subpath (e.g. RouterProvider)
 * stay on the barrel.
 *
 * Run:  node scripts/codemod-rac-subpath.mjs
 */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'packages/components/src');

// ---------------------------------------------------------------------------
// Locate react-aria-components types
// ---------------------------------------------------------------------------

function findRACTypesDir() {
  const direct = path.join(
    ROOT,
    'node_modules/react-aria-components/dist/types/exports'
  );
  if (fs.existsSync(direct)) return direct;
  const pnpmRoot = path.join(ROOT, 'node_modules/.pnpm');
  if (fs.existsSync(pnpmRoot)) {
    for (const entry of fs.readdirSync(pnpmRoot)) {
      if (!entry.startsWith('react-aria-components@')) continue;
      const candidate = path.join(
        pnpmRoot,
        entry,
        'node_modules/react-aria-components/dist/types/exports'
      );
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  throw new Error('Could not locate react-aria-components types directory');
}

// ---------------------------------------------------------------------------
// Build subpath -> exported names from .d.ts files
// ---------------------------------------------------------------------------

function parseDtsExports(content) {
  const names = new Set();
  // Match: export { ... } from '...'; and export type { ... } from '...';
  // Also: export { ... };  (no `from`) — collect for completeness.
  const re = /export\s+(?:type\s+)?\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    for (const raw of m[1].split(',')) {
      let part = raw.trim();
      if (!part) continue;
      part = part.replace(/^type\s+/, '');
      const asMatch = part.match(/^\S+\s+as\s+(\S+)$/);
      const name = asMatch ? asMatch[1] : part;
      if (/^[A-Za-z_$][\w$]*$/.test(name)) names.add(name);
    }
  }
  return names;
}

function buildMapping() {
  const dir = findRACTypesDir();
  /** @type {Map<string, Set<string>>} */
  const subpathToNames = new Map();
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.d.ts')) continue;
    const sub = file.replace(/\.d\.ts$/, '');
    if (sub === 'index' || sub === 'index-rsc') continue;
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    subpathToNames.set(sub, parseDtsExports(content));
  }

  /** @type {Map<string, string[]>} */
  const nameToSubpaths = new Map();
  for (const [sub, names] of subpathToNames) {
    for (const n of names) {
      if (!nameToSubpaths.has(n)) nameToSubpaths.set(n, []);
      nameToSubpaths.get(n).push(sub);
    }
  }

  // Hard-coded overrides for cross-cutting / utility symbols.
  // These take precedence over the auto-discovered options.
  const OVERRIDES = {
    // slots
    Provider: 'slots',
    useContextProps: 'slots',
    useSlottedContext: 'slots',
    DEFAULT_SLOT: 'slots',
    ContextValue: 'slots',
    SlotProps: 'slots',

    // useRenderProps
    useRenderProps: 'useRenderProps',
    RenderProps: 'useRenderProps',
    StyleRenderProps: 'useRenderProps',

    // composeRenderProps
    composeRenderProps: 'composeRenderProps',

    // useDragAndDrop (DropIndicator etc. live here)
    DropIndicator: 'useDragAndDrop',
    DropIndicatorContext: 'useDragAndDrop',
    DragAndDropContext: 'useDragAndDrop',
    useDragAndDrop: 'useDragAndDrop',
    DragAndDropOptions: 'useDragAndDrop',
    DragAndDropHooks: 'useDragAndDrop',
    DropIndicatorProps: 'useDragAndDrop',
    DropIndicatorRenderProps: 'useDragAndDrop',

    // Data hooks
    useAsyncList: 'useAsyncList',
    AsyncListOptions: 'useAsyncList',
    AsyncListData: 'useAsyncList',
    AsyncListLoadFunction: 'useAsyncList',
    AsyncListLoadOptions: 'useAsyncList',
    AsyncListStateUpdate: 'useAsyncList',
    useListData: 'useListData',
    ListData: 'useListData',
    ListDataOptions: 'useListData',
    useTreeData: 'useTreeData',
    TreeData: 'useTreeData',
    TreeDataOptions: 'useTreeData',
    useDrag: 'useDrag',
    useDrop: 'useDrop',
    DIRECTORY_DRAG_TYPE: 'useDrop',
    isDirectoryDropItem: 'useDrop',
    isFileDropItem: 'useDrop',
    isTextDropItem: 'useDrop',
  };

  // Specifiers that we explicitly keep on the barrel even if a subpath exists.
  // Currently empty — let auto-discovery handle the rest.
  const KEEP_ON_BARREL = new Set();

  /**
   * Pick the best subpath for a specifier name.
   * Returns { subpath, confident } — `confident` is true when the choice is
   * driven by an exact match, prefix match, or an explicit override; false
   * when it's a fallback to "first available". Ambiguous specifiers may be
   * re-routed by the caller to consolidate with siblings in the same import.
   * Returns null if no subpath exists.
   */
  function pickSubpath(name) {
    if (KEEP_ON_BARREL.has(name)) return null;
    if (OVERRIDES[name]) return { subpath: OVERRIDES[name], confident: true };
    const options = nameToSubpaths.get(name);
    if (!options || options.length === 0) return null;
    // 1. exact match (specifier name == subpath name)
    if (options.includes(name)) return { subpath: name, confident: true };
    // 2. specifier name starts with a subpath name (longest match wins)
    //    e.g., ButtonProps -> Button, ListBoxItem -> ListBox.
    let best = null;
    for (const sub of options) {
      if (name.startsWith(sub) && (!best || sub.length > best.length))
        best = sub;
    }
    if (best) return { subpath: best, confident: true };
    // 3. fallback to first option (ambiguous — caller may re-route)
    return { subpath: options[0], confident: false, options };
  }

  return { pickSubpath };
}

// ---------------------------------------------------------------------------
// AST-based file rewrite
// ---------------------------------------------------------------------------

function formatSpec(s) {
  return s.alias ? `${s.name} as ${s.alias}` : s.name;
}

function buildImportLines(decl) {
  // decl: { kind: 'import' | 'export', defaultName, typeOnly, specs }
  // specs: [{ name, alias, typeOnly }]
  // Two-pass routing: first place confident picks, then re-route ambiguous
  // picks toward already-used subpaths when possible (e.g. `Key` can live
  // in many subpaths — prefer one we're already importing from).
  const picks = decl.specs.map(spec => {
    const result = decl.pickSubpath(spec.name);
    if (result === null) return { spec, subpath: null, confident: true };
    return {
      spec,
      subpath: result.subpath,
      confident: result.confident,
      options: result.options ?? [result.subpath],
    };
  });

  const confidentSubpaths = new Set(
    picks.filter(p => p.confident && p.subpath).map(p => p.subpath)
  );

  for (const p of picks) {
    if (p.confident) continue;
    // Try to re-route ambiguous picks to a subpath already used by this
    // statement.
    const reroute = p.options.find(opt => confidentSubpaths.has(opt));
    if (reroute) p.subpath = reroute;
  }

  /** @type {Map<string|null, {value: any[], type: any[]}>} */
  const groups = new Map();
  function bucket(key) {
    if (!groups.has(key)) groups.set(key, { value: [], type: [] });
    return groups.get(key);
  }

  for (const p of picks) {
    const b = bucket(p.subpath);
    if (p.spec.typeOnly) b.type.push(p.spec);
    else b.value.push(p.spec);
  }

  const lines = [];
  const word = decl.kind === 'import' ? 'import' : 'export';

  // Default specifier (imports only) — keep on barrel.
  if (decl.kind === 'import' && decl.defaultName) {
    const t = decl.typeOnly ? 'type ' : '';
    lines.push(`${word} ${t}${decl.defaultName} from 'react-aria-components';`);
  }

  function emit(key, mod) {
    const b = groups.get(key);
    if (!b) return;
    if (b.value.length > 0) {
      const names = b.value.map(formatSpec).join(', ');
      lines.push(`${word} { ${names} } from '${mod}';`);
    }
    if (b.type.length > 0) {
      const names = b.type.map(formatSpec).join(', ');
      lines.push(`${word} type { ${names} } from '${mod}';`);
    }
  }

  // Barrel first (deterministic order)
  if (groups.has(null)) emit(null, 'react-aria-components');

  // Then subpaths, sorted alphabetically for deterministic output
  const subKeys = [...groups.keys()].filter(k => k !== null).sort();
  for (const sub of subKeys) emit(sub, `react-aria-components/${sub}`);

  return lines.join('\n');
}

function rewriteFile(filePath, pickSubpath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const sf = ts.createSourceFile(
    filePath,
    original,
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );

  /** @type {{start:number,end:number,replacement:string}[]} */
  const edits = [];

  for (const stmt of sf.statements) {
    let kind = null;
    let moduleSpec = null;
    if (ts.isImportDeclaration(stmt)) {
      kind = 'import';
      moduleSpec = stmt.moduleSpecifier;
    } else if (ts.isExportDeclaration(stmt)) {
      kind = 'export';
      moduleSpec = stmt.moduleSpecifier;
    }
    if (!moduleSpec || !ts.isStringLiteral(moduleSpec)) continue;
    if (moduleSpec.text !== 'react-aria-components') continue;

    let defaultName = null;
    let typeOnly = false;
    /** @type {{name:string,alias:string|null,typeOnly:boolean}[]} */
    const specs = [];

    if (kind === 'import') {
      const clause = stmt.importClause;
      if (!clause) continue; // bare import — leave alone
      typeOnly = !!clause.isTypeOnly;
      if (clause.name) defaultName = clause.name.text;
      const nb = clause.namedBindings;
      if (nb) {
        if (ts.isNamespaceImport(nb)) {
          // import * as RAC from 'rac' — leave alone (rare; we don't have it).
          continue;
        }
        if (ts.isNamedImports(nb)) {
          for (const el of nb.elements) {
            const name = el.propertyName ? el.propertyName.text : el.name.text;
            const alias = el.propertyName ? el.name.text : null;
            specs.push({
              name,
              alias,
              typeOnly: typeOnly || !!el.isTypeOnly,
            });
          }
        }
      }
    } else {
      // export
      typeOnly = !!stmt.isTypeOnly;
      const ec = stmt.exportClause;
      if (!ec || !ts.isNamedExports(ec)) continue; // export * — leave alone
      for (const el of ec.elements) {
        const name = el.propertyName ? el.propertyName.text : el.name.text;
        const alias = el.propertyName ? el.name.text : null;
        specs.push({ name, alias, typeOnly: typeOnly || !!el.isTypeOnly });
      }
    }

    const replacement = buildImportLines({
      kind,
      defaultName,
      typeOnly,
      specs,
      pickSubpath,
    });

    edits.push({
      start: stmt.getStart(sf),
      end: stmt.getEnd(),
      replacement,
    });
  }

  if (edits.length === 0) return false;

  edits.sort((a, b) => b.start - a.start);
  let result = original;
  for (const e of edits) {
    result = result.slice(0, e.start) + e.replacement + result.slice(e.end);
  }

  if (result === original) return false;
  fs.writeFileSync(filePath, result, 'utf8');
  return true;
}

// ---------------------------------------------------------------------------
// Walk the source tree
// ---------------------------------------------------------------------------

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|mts|cts)$/.test(entry.name)) out.push(full);
  }
}

function main() {
  const { pickSubpath } = buildMapping();
  const files = [];
  walk(SRC, files);

  let changed = 0;
  for (const f of files) {
    if (rewriteFile(f, pickSubpath)) changed += 1;
  }
  console.log(`Rewrote ${changed} file(s) of ${files.length} scanned.`);
}

main();
