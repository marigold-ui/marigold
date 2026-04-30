import { describe, expect, it } from 'vitest';
import { editNextLayout, editViteEntry } from './edit-tsx.js';

describe('editNextLayout', () => {
  it('wraps {children} and adds the Providers import', () => {
    const source = `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
    const result = editNextLayout(source, { providersImport: './providers' });
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.output).toContain(`import { Providers } from './providers';`);
    expect(result.output).toContain('<Providers>{children}</Providers>');
    // original structure preserved
    expect(result.output).toContain('<html lang="en">');
    expect(result.output).toContain('<body>');
  });

  it('leaves untouched code byte-identical outside of edited spans', () => {
    const source = `// banner comment\nimport "./styles.css";\n\nexport default function RootLayout({ children }) {\n  return <body>{children}</body>;\n}\n`;
    const result = editNextLayout(source, { providersImport: './providers' });
    if (result.kind !== 'edited') throw new Error('expected edited');
    expect(result.output.startsWith('// banner comment\n')).toBe(true);
    expect(result.output).toContain('import "./styles.css";');
  });

  it('returns unchanged when already wrapped and imported', () => {
    const source = `import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <body><Providers>{children}</Providers></body>;
}
`;
    const result = editNextLayout(source, { providersImport: './providers' });
    expect(result.kind).toBe('unchanged');
  });

  it('skips when no {children} expression is found', () => {
    const source = `export default function RootLayout() { return <html />; }\n`;
    const result = editNextLayout(source, { providersImport: './providers' });
    expect(result.kind).toBe('skipped');
  });

  it('only adds wrap when import already exists', () => {
    const source = `import { Providers } from './providers';\n\nexport default function RootLayout({ children }) {\n  return <body>{children}</body>;\n}\n`;
    const result = editNextLayout(source, { providersImport: './providers' });
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.changes).toEqual(['wrapped {children} with <Providers>']);
    // import not duplicated
    expect(
      result.output.match(/import \{ Providers \} from '\.\/providers';/g)
        ?.length
    ).toBe(1);
  });
});

describe('editViteEntry', () => {
  it('wraps the rendered element with MarigoldProvider', () => {
    const source = `import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
`;
    const result = editViteEntry(source);
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.output).toContain(
      `import { MarigoldProvider } from '@marigold/components';`
    );
    expect(result.output).toContain(`import theme from '@marigold/theme-rui';`);
    expect(result.output).toContain(
      '<MarigoldProvider theme={theme}><App /></MarigoldProvider>'
    );
  });

  it('returns unchanged when already wrapped + imported', () => {
    const source = `import { createRoot } from 'react-dom/client';
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <MarigoldProvider theme={theme}><App /></MarigoldProvider>
);
`;
    const result = editViteEntry(source);
    expect(result.kind).toBe('unchanged');
  });

  it('skips when no .render(<jsx />) call is found', () => {
    const source = `console.log('no render here');\n`;
    const result = editViteEntry(source);
    expect(result.kind).toBe('skipped');
  });
});
