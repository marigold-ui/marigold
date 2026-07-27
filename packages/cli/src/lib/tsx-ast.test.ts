import {
  type AnyNode,
  collectImports,
  findChildrenExpressionContainer,
  findRenderArgument,
  importIncludes,
  jsxOpeningName,
  lastImportEnd,
  parseTsx,
  walk,
} from './tsx-ast.js';

const ast = (source: string): AnyNode => parseTsx(source) as unknown as AnyNode;

describe('collectImports', () => {
  test('collects every import declaration', () => {
    const file = ast(
      `import a from 'a';\nimport { b } from 'b';\nconst x = 1;\n`
    );

    const imports = collectImports(file);

    expect(imports).toHaveLength(2);
  });

  test('returns an empty array when there are no imports', () => {
    expect(collectImports(ast('const x = 1;\n'))).toEqual([]);
  });
});

describe('importIncludes', () => {
  const imports = collectImports(
    ast(
      `import theme from '@marigold/theme-rui';\n` +
        `import { MarigoldProvider } from '@marigold/components';\n`
    )
  );

  test('matches a named import', () => {
    expect(
      importIncludes(imports, '@marigold/components', 'MarigoldProvider')
    ).toBe(true);
  });

  test('matches a default import by local name', () => {
    expect(
      importIncludes(imports, '@marigold/theme-rui', undefined, 'theme')
    ).toBe(true);
  });

  test('matches any import from a source when neither named nor default given', () => {
    expect(importIncludes(imports, '@marigold/theme-rui')).toBe(true);
    expect(importIncludes(imports, 'react')).toBe(false);
  });

  test('does not match a missing named import', () => {
    expect(importIncludes(imports, '@marigold/components', 'Nope')).toBe(false);
  });
});

describe('lastImportEnd', () => {
  test('returns 0 when there are no imports', () => {
    expect(lastImportEnd([])).toBe(0);
  });

  test('returns the end offset of the last import', () => {
    const source = `import a from 'a';\nimport b from 'b';\n`;
    const imports = collectImports(ast(source));

    expect(lastImportEnd(imports)).toBe(
      source.indexOf(`import b from 'b';`) + `import b from 'b';`.length
    );
  });
});

describe('jsxOpeningName', () => {
  test('reads the tag name of a JSX element', () => {
    let name: string | null = null;
    const file = ast(
      `const x = <MarigoldProvider>{children}</MarigoldProvider>;`
    );
    // find the first JSXElement
    const stack: AnyNode[] = [file];
    while (stack.length) {
      const n = stack.pop()!;
      if (n && typeof n === 'object') {
        if ((n as AnyNode).type === 'JSXElement') {
          name = jsxOpeningName(n as AnyNode);
          break;
        }
        for (const v of Object.values(n)) {
          if (Array.isArray(v)) stack.push(...(v as AnyNode[]));
          else if (v && typeof v === 'object') stack.push(v as AnyNode);
        }
      }
    }

    expect(name).toBe('MarigoldProvider');
  });
});

describe('findChildrenExpressionContainer', () => {
  test('finds the {children} container and its parent element', () => {
    const file = ast(
      `export default function L({ children }) { return <body>{children}</body>; }`
    );

    const found = findChildrenExpressionContainer(file);

    expect(found).not.toBeNull();
    expect(jsxOpeningName(found!.parent as AnyNode)).toBe('body');
  });

  test('returns null when there is no {children}', () => {
    const file = ast(`export default function L() { return <html />; }`);

    expect(findChildrenExpressionContainer(file)).toBeNull();
  });
});

describe('findRenderArgument', () => {
  test('finds the JSX argument of a .render() call', () => {
    const file = ast(
      `createRoot(document.getElementById('root')).render(<App />);`
    );

    // findRenderArgument is our own AST helper, not a testing-library render().
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const arg = findRenderArgument(file);

    expect(arg).not.toBeNull();
    expect(jsxOpeningName(arg!.node)).toBe('App');
  });

  test('returns null when there is no render() call', () => {
    expect(findRenderArgument(ast(`console.log('hi');`))).toBeNull();
  });

  test('ignores a render() call whose first argument is not JSX', () => {
    expect(findRenderArgument(ast(`root.render('plain string');`))).toBeNull();
  });

  test('ignores a member call that is not named render', () => {
    expect(findRenderArgument(ast(`root.mount(<App />);`))).toBeNull();
  });

  test('ignores a bare render() call with no member expression', () => {
    expect(findRenderArgument(ast(`render(<App />);`))).toBeNull();
  });
});

describe('walk', () => {
  test('ignores non-object nodes without throwing', () => {
    const seen: string[] = [];
    walk(ast(`const a = 1;`), n => seen.push(n.type));
    expect(seen).toContain('VariableDeclaration');
    // primitives (numbers, strings) inside the tree are skipped, not visited
    expect(seen).not.toContain('1');
  });
});
