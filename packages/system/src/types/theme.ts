import {
  TVProps,
  VariantProps,
  TVReturnType,
  TV,
  CxReturn,
  ClassProp,
} from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
export type SlotsToClasses<S extends string> = {
  [key in S]?: ClassValue;
};

// TODO: how to handle slots?
export type StyleFn = (args?: ClassValue) => string;

type ClassValue = string | string[] | null | undefined | ClassValue[];

export type ThemeClass = Record<string, ClassValue>;

export type Theme = {
  name: string;
  components: {
    // [key: string]: TVReturnType<any, any, any, any, any>;

    [key: string]: TVReturnType<any, any, any, any, any>;
  };
};

export interface Themes {
  [key: string]: Theme | ThemeWithSlots;
}

export interface ThemeWithSlots {
  name: string;
  components: {
    [key: string]: TVReturnType<string, string, any, any, string>;
  };
}

export type ThemeProps = {
  base?: string;
  variants?: string;
};
