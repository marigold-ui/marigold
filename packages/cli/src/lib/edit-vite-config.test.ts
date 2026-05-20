import {
  type ViteConfigEditOutcome,
  editViteConfig,
} from './edit-vite-config.js';

function assertEdited(
  result: ViteConfigEditOutcome
): asserts result is Extract<ViteConfigEditOutcome, { kind: 'edited' }> {
  if (result.kind !== 'edited') {
    throw new Error(`expected edited, got ${result.kind}`);
  }
}

describe('editViteConfig', () => {
  test('adds tailwindcss import and registers it in plugins', () => {
    const source = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

    const result = editViteConfig(source);

    assertEdited(result);
    expect(result.output).toContain(
      `import tailwindcss from '@tailwindcss/vite';`
    );
    expect(result.output).toMatch(/plugins:\s*\[react\(\), tailwindcss\(\)\]/);
  });

  test('returns unchanged when plugin already configured', () => {
    const source = `import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
`;

    const result = editViteConfig(source);

    expect(result.kind).toBe('unchanged');
  });

  test('skips when no plugins array can be found', () => {
    const source = `import { defineConfig } from 'vite';\n\nexport default defineConfig({});\n`;

    const result = editViteConfig(source);

    expect(result.kind).toBe('skipped');
  });

  test('handles empty plugins array', () => {
    const source = `import { defineConfig } from 'vite';\n\nexport default defineConfig({ plugins: [] });\n`;

    const result = editViteConfig(source);

    assertEdited(result);
    expect(result.output).toMatch(/plugins:\s*\[tailwindcss\(\)\s*\]/);
  });
});
