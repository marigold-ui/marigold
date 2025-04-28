import { setProjectAnnotations } from '@storybook/react';
import { beforeAll } from 'vitest';
import * as previewAnnotations from './.storybook/preview';

const annotations = setProjectAnnotations([previewAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
