import { Config } from 'tailwindcss/types/config';

export interface PresetConfig {
  name: string;
}

export const createPreset = ({}: PresetConfig) => {
  const preset: Config = {
    content: [],
    plugins: [
      //TODO: Create prefix plugin using `name`
    ],
  };

  return preset;
};
