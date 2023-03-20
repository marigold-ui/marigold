import { TVReturnType } from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
// export type SlotsToClasses<S extends string> = {
//   [key in S]?: ClassValue;
// };

// TODO: how to handle slots?
//export type StyleFn = (args?: ClassValue) => string;

//type ClassValue = string | string[] | null | undefined | ClassValue[];

export type Theme = {
  // name to identify theme
  name: string;
  components?: {
    [key: string]: TVReturnType<any, any, any, any, any, any>;
  };
  colors?: { [key: string]: string };
  root?: { [key: string]: Object };
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
