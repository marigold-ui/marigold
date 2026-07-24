import ts from 'typescript';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  __resetRegistryCacheForTests,
  buildMarigoldTagResolver,
  getComponentProps,
  isCompoundComponent,
  isMarigoldComponent,
  loadMarigoldRegistry,
} from './components.js';

// The registry is the source of truth for every ERROR-severity prop check, yet
// it is otherwise only exercised transitively. A ts-morph/TypeScript upgrade or
// a change to @marigold/components' dist layout could silently return an EMPTY
// registry — which would make the prop validator pass everything. These tests
// assert the structural invariants that guard against that, without pinning
// brittle exact counts or the full value set of any prop.
describe('loadMarigoldRegistry (registry source of truth)', () => {
  beforeEach(() => {
    __resetRegistryCacheForTests();
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
    // Regression: IconButton declares its prop type inline as its own
    // function parameter (`interface IconButtonProps` is NOT exported from
    // @marigold/components) instead of a separately-exported `IconButtonProps`.
    // extractPropsFor used to only look for the latter, so this — and 17
    // other real components (CloseButton, VisuallyHidden, Split, …) —
    // silently resolved to `props: []`, which made props.ts's
    // `props.length > 0` guard skip prop validation for them entirely.
    const props = getComponentProps('IconButton') ?? [];
    expect(props.length).toBeGreaterThan(0);
    expect(props.some(p => p.name === 'variant')).toBe(true);
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
