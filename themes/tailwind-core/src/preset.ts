import { Config } from 'tailwindcss/types/config';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const createPreset = ({ preflight = true }: PresetConfig) => {
  const preset: Config = {
    important: '[data-theme="core"]',
    content: [],
    corePlugins: {
      preflight,
    },
    plugins: [
      //TODO: Create prefix plugin using `name`
    ],
  };

  return preset;
};
