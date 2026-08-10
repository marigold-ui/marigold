import ts from 'typescript';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildMarigoldTagResolver,
  getComponentProps,
  isCompoundComponent,
  isImplausiblySmallRegistry,
  isMarigoldComponent,
  loadMarigoldRegistry,
  resetComponentRegistryCache,
  setComponentResolutionRoot,
} from './components.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The registry backs every error-severity prop check but is otherwise only
// exercised transitively, so a ts-morph upgrade or a dist layout change could
// silently return an EMPTY registry and make the prop validator pass
// everything. These assert the structural invariants without pinning brittle
// exact counts.
describe('loadMarigoldRegistry (registry source of truth)', () => {
  beforeEach(() => {
    resetComponentRegistryCache();
  });

  it('loads a non-empty registry of Marigold components', () => {
    const registry = loadMarigoldRegistry();
    // Far below the real count (~98) but well above zero — the point is to fail
    // loudly if the derivation ever returns an empty/near-empty map.
    expect(registry.size).toBeGreaterThan(20);
  });

  it('contains foundational components', () => {
    for (const name of ['Button', 'TextField', 'Form']) {
      expect(isMarigoldComponent(name)).toBe(true);
    }
  });

  it('throws instead of silently caching a present-but-implausibly-small registry', () => {
    // A truncated dist must not be cached as a valid registry — every checker
    // resolving tags through it would mass-error valid code as hallucinated.
    // Verified via the same threshold loadMarigoldRegistry checks, since
    // fabricating a real truncated dist isn't practical.
    expect(isImplausiblySmallRegistry(0)).toBe(true);
    expect(isImplausiblySmallRegistry(20)).toBe(true);
    expect(isImplausiblySmallRegistry(21)).toBe(false);
  });

  it('derives Button props including variant and the React Aria onPress', () => {
    const props = getComponentProps('Button') ?? [];
    expect(props.length).toBeGreaterThan(0);

    const variant = props.find(p => p.name === 'variant');
    expect(variant).toBeDefined();
    // Button variants are an open union ('primary' | … | (string & {})), so
    // literals are suggestions, not a closed contract.
    expect(variant?.knownValues).toContain('primary');
    expect(variant?.openValues).toBe(true);

    expect(props.some(p => p.name === 'onPress')).toBe(true);
  });

  it('flags a compound component and exposes its sub-components', () => {
    expect(isCompoundComponent('Accordion')).toBe(true);
    const info = loadMarigoldRegistry().get('Accordion');
    expect(info?.subComponents.length).toBeGreaterThan(0);
  });

  it('does not register the *Props helper types as components', () => {
    expect(isMarigoldComponent('ButtonProps')).toBe(false);
  });

  it('derives props for a component whose prop type is inline, not a separately-exported *Props interface', () => {
    // IconButton declares its props inline as its function parameter rather
    // than exporting `IconButtonProps`, exercising extractPropsFor's
    // call-signature fallback (as do CloseButton, VisuallyHidden, Split).
    const props = getComponentProps('IconButton') ?? [];
    expect(props.length).toBeGreaterThan(0);
    expect(props.some(p => p.name === 'variant')).toBe(true);
  });
});

describe('component resolution root', () => {
  // packages/cli itself has @marigold/components as a real dependency
  // (unlike the workspace root), so pointing the root there exercises the
  // project-relative path itself, not just its fallback.
  const cliPackageDir = path.resolve(__dirname, '..', '..', '..', '..');

  afterEach(() => {
    setComponentResolutionRoot(process.cwd());
    resetComponentRegistryCache();
  });

  it('falls back to CLI-relative resolution when the given root has no @marigold/components of its own', () => {
    // The registry loader is CLI-relative by default; setComponentResolutionRoot
    // lets it prefer the validated file's own project first. A bare tmp dir
    // (no node_modules at all) must not break resolution — it should fall
    // through to the CLI's own copy, the same as before this option existed.
    setComponentResolutionRoot(os.tmpdir());
    resetComponentRegistryCache();
    expect(() => loadMarigoldRegistry()).not.toThrow();
    expect(loadMarigoldRegistry().size).toBeGreaterThan(20);
  });

  it('resolves from a project-relative root when one is given', () => {
    setComponentResolutionRoot(cliPackageDir);
    resetComponentRegistryCache();
    expect(() => loadMarigoldRegistry()).not.toThrow();
    expect(loadMarigoldRegistry().size).toBeGreaterThan(20);
  });

  it('invalidates the cached registry when the resolution root actually changes', () => {
    // An agent correction loop can validate files from two projects in one
    // process; without invalidation the second would read back the first's
    // memoized registry.
    setComponentResolutionRoot(os.tmpdir());
    resetComponentRegistryCache();
    const first = loadMarigoldRegistry();

    setComponentResolutionRoot(cliPackageDir);
    const second = loadMarigoldRegistry();

    // A different Map instance proves a rebuild: both roots resolve to the
    // same real dist, so content equality couldn't tell rebuilt from reused.
    expect(second).not.toBe(first);
    expect(second.size).toBeGreaterThan(20);
  });

  it('does not rebuild the cache when the root is set to its current value', () => {
    setComponentResolutionRoot(cliPackageDir);
    resetComponentRegistryCache();
    const first = loadMarigoldRegistry();

    setComponentResolutionRoot(cliPackageDir);
    const second = loadMarigoldRegistry();

    expect(second).toBe(first);
  });
});

describe('buildMarigoldTagResolver', () => {
  const parse = (code: string): ts.SourceFile =>
    ts.createSourceFile(
      't.tsx',
      code,
      ts.ScriptTarget.ES2022,
      true,
      ts.ScriptKind.TSX
    );

  it('maps a plain @marigold/components import to itself', () => {
    const resolver = buildMarigoldTagResolver(
      parse(`import { Button } from '@marigold/components';`)
    );
    expect(resolver.get('Button')).toBe('Button');
  });

  it('maps an aliased import back to the real component name', () => {
    const resolver = buildMarigoldTagResolver(
      parse(`import { Button as Btn } from '@marigold/components';`)
    );
    expect(resolver.get('Btn')).toBe('Button');
    expect(resolver.has('Button')).toBe(false);
  });

  it('ignores a local/third-party import that shadows a Marigold name', () => {
    const resolver = buildMarigoldTagResolver(
      parse(`import { Button } from './ui/Button';`)
    );
    expect(resolver.has('Button')).toBe(false);
  });

  it('ignores an import of a non-registry name from @marigold/components', () => {
    const resolver = buildMarigoldTagResolver(
      parse(`import { NotAComponent } from '@marigold/components';`)
    );
    expect(resolver.has('NotAComponent')).toBe(false);
  });
});
