import type { ClassValue, VariantProps } from 'cva';
import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

export type { ClassValue, VariantProps };

const _config = defineConfig({
  hooks: { onComplete: className => twMerge(className) },
});

const _cva = _config.cva;
export const cn = _config.cx;
export const compose = _config.compose;

export const cva: typeof _cva = ((cfg: any) => {
  const fn = _cva(cfg) as any;
  if (cfg && typeof cfg === 'object') {
    if (cfg.variants) fn.variants = cfg.variants;
    if (cfg.defaultVariants) fn.defaultVariants = cfg.defaultVariants;
    if (cfg.compoundVariants) fn.compoundVariants = cfg.compoundVariants;
  }
  return fn;
}) as typeof _cva;
