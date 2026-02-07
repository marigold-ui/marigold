import { type ClassValue, type VariantProps, cva as _cva, cx } from 'cva';
import { twMerge } from 'tailwind-merge';

// Re-export types used externally
export type { ClassValue, VariantProps };

// Internal helper types
type ClassProp = { className?: ClassValue; class?: ClassValue };
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

// Config types for variant schema
export type ConfigSchema = Record<string, Record<string, ClassValue>>;
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};

interface CvaConfig<T extends ConfigSchema = ConfigSchema> {
  base?: ClassValue;
  variants?: T;
  defaultVariants?: ConfigVariants<T>;
  compoundVariants?: ((ConfigVariants<T> | ConfigVariantsMulti<T>) &
    ClassProp)[];
}

type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp
  : ClassProp;

export const cva = <T extends ConfigSchema>(config?: CvaConfig<T>) => {
  const styleFn = config
    ? (_cva(config as Parameters<typeof _cva>[0]) as (
        props?: Props<T>
      ) => string)
    : undefined;

  function styles(props?: Props<T>) {
    return twMerge(styleFn ? styleFn(props) : '');
  }
  styles.variants = config?.variants;

  return styles;
};

export const cn = (...inputs: ClassValue[]) => twMerge(cx(inputs));
