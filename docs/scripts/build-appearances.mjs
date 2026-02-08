// @ts-check
import { fs, path } from 'zx';

console.log('🎨 Generating appearances data...');

/**
 * Components that share styles with another component.
 * Key = component name in docs, Value = component name in theme.
 */
const sharedAppearances = {
  LinkButton: 'Button',
  ToggleButtonGroup: 'ToggleButton',
};

async function main() {
  // Import the built theme and getVariants
  const { default: theme } = await import('@marigold/theme-rui');
  const { getVariants } = await import('@marigold/system');

  /** @type {Record<string, { variant: string[], size: string[] }>} */
  const appearances = {};

  for (const [name, styles] of Object.entries(theme.components)) {
    if (typeof styles === 'function') {
      // Single-slot component
      const variants = getVariants(styles);
      appearances[name] = {
        variant: variants?.variant ? Object.keys(variants.variant) : [],
        size: variants?.size ? Object.keys(variants.size) : [],
      };
    } else if (typeof styles === 'object' && styles !== null) {
      // Multi-slot component: union variant/size keys across all slots
      const variantKeys = new Set();
      const sizeKeys = new Set();

      for (const slotFn of Object.values(styles)) {
        const variants = getVariants(slotFn);
        if (variants?.variant) {
          for (const key of Object.keys(variants.variant)) {
            variantKeys.add(key);
          }
        }
        if (variants?.size) {
          for (const key of Object.keys(variants.size)) {
            sizeKeys.add(key);
          }
        }
      }

      appearances[name] = {
        variant: [...variantKeys],
        size: [...sizeKeys],
      };
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
