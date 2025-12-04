import { cva as _cva, cx } from 'class-variance-authority';
import {
  ClassProp,
  ClassValue,
  StringToBoolean,
} from 'class-variance-authority/dist/types';
import { twMerge } from 'tailwind-merge';

export type { ClassValue };
export type { VariantProps } from 'class-variance-authority';

export type ConfigSchema = Record<string, Record<string, ClassValue>>;
export type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
export type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};
export type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
        : ClassProp)[];
    }
  : never;

export type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp
  : ClassProp;

export const cva = <T>(base?: ClassValue, config?: Config<T>) => {
  function styles(props?: Props<T>) {
    return twMerge(_cva(base, config)(props));
  }
  styles.variants = config?.variants;

  return styles;
};

export const cn = (...inputs: ClassValue[]) => twMerge(cx(inputs));
