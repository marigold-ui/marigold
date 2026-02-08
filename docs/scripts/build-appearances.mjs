// @ts-check
import ts from 'typescript';
import { fs, glob, path } from 'zx';

console.log('🎨 Generating appearances data...');

/**
 * Components that share styles with another component.
 * Key = component name in docs, Value = component name in theme.
 */
const sharedAppearances = {
  LinkButton: 'Button',
  ToggleButtonGroup: 'ToggleButton',
};

/**
 * Extract property name keys from a `variants` object literal in a cva() call.
 * Returns `{ variant: string[], size: string[] }`.
 */
function extractVariantKeys(cvaArg) {
  if (!cvaArg || !ts.isObjectLiteralExpression(cvaArg)) {
    return { variant: [], size: [] };
  }

  const variantProp = cvaArg.properties.find(
    p => ts.isPropertyAssignment(p) && p.name.getText() === 'variants'
  );

  if (
    !variantProp ||
    !ts.isPropertyAssignment(variantProp) ||
    !ts.isObjectLiteralExpression(variantProp.initializer)
  ) {
    return { variant: [], size: [] };
  }

  const result = { variant: [], size: [] };

  for (const prop of variantProp.initializer.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = prop.name.getText();
    if (name !== 'variant' && name !== 'size') continue;

    if (ts.isObjectLiteralExpression(prop.initializer)) {
      result[name] = prop.initializer.properties
        .filter(p => ts.isPropertyAssignment(p))
        .map(p => {
          // Handle both identifiers and string literals as keys
          const keyNode = p.name;
          if (ts.isStringLiteral(keyNode)) return keyNode.text;
          if (ts.isComputedPropertyName(keyNode)) return keyNode.getText();
          return keyNode.getText();
        });
    }
  }

  return result;
}

/**
 * Find all cva() call expressions in a node (recursively).
 */
function findCvaCalls(node) {
  const calls = [];
  function visit(n) {
    if (
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      n.expression.text === 'cva'
    ) {
      calls.push(n);
    }
    ts.forEachChild(n, visit);
  }
  visit(node);
  return calls;
}

async function main() {
  const stylesDir = path.resolve(
    import.meta.dirname,
    '../../themes/theme-rui/src/components'
  );
  const files = await glob(`${stylesDir}/*.styles.ts`);

  /** @type {Record<string, { variant: string[], size: string[] }>} */
  const appearances = {};

  for (const filePath of files) {
    const source = await fs.readFile(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      path.basename(filePath),
      source,
      ts.ScriptTarget.Latest,
      true
    );

    // Find exported variable declarations (e.g. `export const Button = ...`)
    for (const stmt of sourceFile.statements) {
      if (
        !ts.isVariableStatement(stmt) ||
        !stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        continue;
      }

      for (const decl of stmt.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
        const componentName = decl.name.text;

        // Skip non-component exports (e.g. `buttonBase`)
        if (componentName[0] !== componentName[0].toUpperCase()) continue;

        if (ts.isCallExpression(decl.initializer)) {
          // Single-slot: export const X = cva({...})
          const arg = decl.initializer.arguments[0];
          appearances[componentName] = extractVariantKeys(arg);
        } else if (ts.isObjectLiteralExpression(decl.initializer)) {
          // Multi-slot: export const X = { slot: cva({...}), ... }
          const variantKeys = new Set();
          const sizeKeys = new Set();

          const cvaCalls = findCvaCalls(decl.initializer);
          for (const call of cvaCalls) {
            const keys = extractVariantKeys(call.arguments[0]);
            for (const k of keys.variant) variantKeys.add(k);
            for (const k of keys.size) sizeKeys.add(k);
          }

          appearances[componentName] = {
            variant: [...variantKeys],
            size: [...sizeKeys],
          };
        }
      }
    }
  }

  // Add shared appearances (components that reuse another component's styles)
  for (const [alias, target] of Object.entries(sharedAppearances)) {
    if (appearances[target]) {
      appearances[alias] = appearances[target];
    }
  }

  const outDir = path.resolve(import.meta.dirname, '..', '.registry');
  await fs.ensureDir(outDir);
  await fs.writeJSON(path.join(outDir, 'appearances.json'), appearances, {
    spaces: 2,
  });

  console.log(
    `✅ Generated appearances for ${Object.keys(appearances).length} components`
  );
}

main().catch(err => {
  console.error('Failed to generate appearances:', err);
  process.exit(1);
});
