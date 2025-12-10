import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import { beforeAll } from 'vitest';
import * as previewAnnotations from './preview.js';

const annotations = setProjectAnnotations([
  a11yAddonAnnotations,
  previewAnnotations,
]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
