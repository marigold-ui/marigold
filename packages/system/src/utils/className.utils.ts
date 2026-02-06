import { type VariantProps, cva as _cva, cx } from 'cva';
import { twMerge } from 'tailwind-merge';

// Re-export core types from cva
export type { VariantProps };

// ClassValue type - basic structure for class inputs
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

// ClassProp type for components that accept className
export type ClassProp = { className?: ClassValue; class?: ClassValue };

// StringToBoolean helper type
export type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

// Config types for variant schema
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

// New config interface matching cva beta API
export interface CvaConfig<T extends ConfigSchema = ConfigSchema> {
  base?: ClassValue;
  variants?: T;
  defaultVariants?: ConfigVariants<T>;
  compoundVariants?: ((ConfigVariants<T> | ConfigVariantsMulti<T>) &
    ClassProp)[];
}

export type Config<T> = T extends ConfigSchema ? CvaConfig<T> : never;

export type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp
  : ClassProp;

/**
 * Typed version of CVA's cva function using Marigold's type parameters.
 * CVA restricts its generic parameters to internal use, so this interface
 * describes its runtime behavior to bridge our generic wrapper.
 */
interface CreateStyles {
  <T extends ConfigSchema>(config: CvaConfig<T>): (props?: Props<T>) => string;
}

const createStyles = _cva as unknown as CreateStyles;

// Updated CVA wrapper with new signature
export const cva = <T extends ConfigSchema>(config?: CvaConfig<T>) => {
  const styleFn = config ? createStyles(config) : undefined;

  function styles(props?: Props<T>) {
    return twMerge(styleFn ? styleFn(props) : '');
  }
  styles.variants = config?.variants;

  return styles;
};

export const cn = (...inputs: ClassValue[]) => twMerge(cx(inputs));
