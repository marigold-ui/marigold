import type { ClassValue, VariantProps } from 'cva';
import { cx } from 'cva';
import { defineConfig } from 'cva/config';
import { twMerge } from 'tailwind-merge';

export type { ClassValue, VariantProps };

/**
 * `cx` owns the class name grammar, so we keep cva's own clsx-flavored one and
 * run `twMerge` over its output. Handing `twMerge` to cva directly would work,
 * but it would narrow the grammar to tailwind-merge's `ClassNameValue`, which
 * accepts neither the object form nor a render prop.
 */
export const { cva, cx: cn } = defineConfig({
  cx: (...inputs: ClassValue[]) => twMerge(cx(inputs)),
});
