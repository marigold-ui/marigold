import { describe, expect, it } from 'vitest';
import { editViteConfig } from './edit-vite-config.js';

describe('editViteConfig', () => {
  it('adds tailwindcss import and registers it in plugins', () => {
    const source = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
    const result = editViteConfig(source);
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.output).toContain(
      `import tailwindcss from '@tailwindcss/vite';`
    );
    expect(result.output).toMatch(/plugins:\s*\[react\(\), tailwindcss\(\)\]/);
  });

  it('returns unchanged when plugin already configured', () => {
    const source = `import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
`;
    const result = editViteConfig(source);
    expect(result.kind).toBe('unchanged');
  });

  it('skips when no plugins array can be found', () => {
    const source = `import { defineConfig } from 'vite';\n\nexport default defineConfig({});\n`;
    const result = editViteConfig(source);
    expect(result.kind).toBe('skipped');
  });

  it('handles empty plugins array', () => {
    const source = `import { defineConfig } from 'vite';\n\nexport default defineConfig({ plugins: [] });\n`;
    const result = editViteConfig(source);
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.output).toMatch(/plugins:\s*\[tailwindcss\(\)\s*\]/);
  });
});
