import type { ClassValue, VariantProps } from 'cva';
import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

export type { ClassValue, VariantProps };

export const {
  cva,
  cx: cn,
  compose,
} = defineConfig({
  hooks: { onComplete: className => twMerge(className) },
});
