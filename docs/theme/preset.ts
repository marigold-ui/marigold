import { createPreset } from '@marigold/theme-preset';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const preset = createPreset('docs', {});
