import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { renderSkipReason } from './render-precheck.js';

const reasonFor = (name: string, source: string): string | undefined =>
  renderSkipReason(tmpFile(`render-precheck/${name}`, source));

describe('renderSkipReason', () => {
  it('renders a self-contained file with a default export', () => {
    expect(
      reasonFor(
        'default.tsx',
        `import { Button } from '@marigold/components';
        export default () => <Button>Save</Button>;`
      )
    ).toBeUndefined();
  });

  it.each([
    ['app-fn.tsx', `export function App() { return null; }`],
    ['app-const.tsx', `export const App = () => null;`],
    ['app-clause.tsx', `const Page = () => null; export { Page as App };`],
    ['default-fn.tsx', `export default function Page() { return null; }`],
    [
      'default-clause.tsx',
      `const Page = () => null; export { Page as default };`,
    ],
  ])('renders a file with a default or App export (%s)', (name, source) => {
    expect(reasonFor(name, source)).toBeUndefined();
  });

  it('skips a file with a relative import and names the import', () => {
    expect(
      reasonFor(
        'relative.tsx',
        `import { Header } from './Header';
      export default () => <Header />;`
      )
    ).toMatch(/\.\/Header/);
  });

  it.each([
    [
      'reexport.tsx',
      `export { x } from '../x'; export default () => null;`,
      '../x',
    ],
    [
      'side-effect.tsx',
      `import './styles.css'; export default () => null;`,
      './styles.css',
    ],
    [
      'lazy.tsx',
      `import { lazy } from 'react';
      const Page = lazy(() => import('./Page'));
      export default () => <Page />;`,
      './Page',
    ],
  ])(
    'skips a file whose local module is loaded another way (%s)',
    (name, source, local) => {
      expect(reasonFor(name, source)).toContain(`"${local}"`);
    }
  );

  it('ignores relative imports that are erased at build time', () => {
    expect(
      reasonFor(
        'type-only.tsx',
        `import type { Row } from './types';
        import { type Col } from './cols';
        export { type Cell } from './cells';
        export default (_: Row & Col) => null;`
      )
    ).toBeUndefined();
  });

  it('ignores a relative import used only in types, as the sandbox drops it', () => {
    expect(
      reasonFor(
        'unmarked-type.tsx',
        `import { Row } from './types';
        export default (_: { row: Row }) => null;`
      )
    ).toBeUndefined();
  });

  it('skips a relative import that keeps one value binding', () => {
    expect(
      reasonFor(
        'mixed.tsx',
        `import { type Row, format } from './format';
        export default (_: { row: Row }) => format('x');`
      )
    ).toMatch(/\.\/format/);
  });

  it('skips a bare "." import of a sibling index', () => {
    expect(
      reasonFor(
        'dot.tsx',
        `import { format } from '.';
        export default () => format('x');`
      )
    ).toMatch(/"\."/);
  });

  it('names the local import when the file also lacks a component export', () => {
    expect(
      reasonFor(
        'both.tsx',
        `import { format } from './format';
        export const Checkout = () => format('x');`
      )
    ).toMatch(/\.\/format/);
  });

  it('does not guess when App may come from a destructuring export', () => {
    expect(
      reasonFor(
        'destructured.tsx',
        `const pages = { App: () => null };
        export const { App } = pages;`
      )
    ).toBeUndefined();
  });

  it('skips a file with neither a default nor an App export', () => {
    expect(
      reasonFor('named.tsx', `export const Checkout = () => null;`)
    ).toMatch(/default export or a named export called "App"/);
  });

  it('does not guess when the exports come from a star re-export', () => {
    expect(
      reasonFor('star.tsx', `export * from '@acme/pages';`)
    ).toBeUndefined();
  });
});
