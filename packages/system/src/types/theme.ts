import { TVReturnType } from 'tailwind-variants';

export type Theme = {
  // name to identify theme
  name: string;
  screens?: { [key: string]: any };
  components?: {
    [key: string]: TVReturnType<any, any, any, any, any, any>;
  };
  root?: { [key: string]: TVReturnType<any, any, any, any, any, any> };
};

/**
 * Structure for component styles in a theme.
 */
export type ThemeExtension<ComponentName extends string> = {
  [P in ComponentName]?: {
    name: string;
    components?: {
      [key: string]: TVReturnType<any, any, any, any, any, any>;
    };
  };
};
