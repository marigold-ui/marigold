import { defineConfig } from 'eslint/config';
import marigoldBaseConfig from '@marigold/eslint-config';

const eslintConfig = defineConfig([
  marigoldBaseConfig,
  {
    rules: {
      'react/display-name': 'off', // appears where we use forwardRef
      'react/prop-types': 'off', // TypeScript handles prop validation
    },
  },
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.source/**',
      '.registry/**',
    ],
  },
]);

export default eslintConfig;
