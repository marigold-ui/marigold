'use client';

import { type RegistryKey, registry } from '@/.registry/demos';
import { getAppearance } from '@/lib/utils';
import { ruiTheme } from '@/theme';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'fumadocs-ui/components/ui/popover';
import { Check, ChevronDown, Info } from 'lucide-react';
import type { ComponentType } from 'react';
import { useState } from 'react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import { cn, cva } from '@marigold/system';
import type { Theme } from '@marigold/system';

// Styles
// ---------------
const styles = {
  trigger: cva(
    'inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-xs font-medium text-fd-foreground disabled:opacity-50'
  ),
  option: cva(
    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-fd-accent'
  ),
  info: cva('flex items-center gap-0.5 text-xs text-neutral-500'),
};

// Picker
// ---------------
interface AppearancePickerProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

const AppearancePicker = ({
  label,
  options,
  value,
  onChange,
  disabled,
}: AppearancePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} className={styles.trigger()}>
        <span className="opacity-60">{label}:</span>
        {value}
        <ChevronDown className="size-3 opacity-50" />
      </PopoverTrigger>
      <PopoverContent align="start" className="min-w-[120px] p-1">
        {options.map(option => (
          <button
            key={option}
            type="button"
            className={styles.option()}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
          >
            <Check className={cn('size-3', option !== value && 'opacity-0')} />
            {option}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

// Props
// ---------------
export interface AppearanceDemoProps {
  component: keyof Theme['components'];
  exclude?: {
    variant?: string[];
    size?: string[];
  };
}

// Component
// ---------------
export const AppearanceDemo = ({ component, exclude }: AppearanceDemoProps) => {
  const name = `${component.toLowerCase()}-appearance` as RegistryKey;

  if (!registry[name]) {
    throw Error(`No demo with name "${name}" found in the registry.`);
  }

  const Demo: ComponentType<any> = registry[name].demo;
  let appearance = getAppearance(component, ruiTheme);

  /**
   * Exclude variants and sizes from the dropdown which are not desired in the demo.
   * This is useful when variants and sizes are only part of child components and have
   * no relevance for the demo itself.
   */
  appearance = {
    variant: exclude?.variant
      ? appearance.variant.filter(v => !exclude.variant!.includes(v))
      : appearance.variant,
    size: exclude?.size
      ? appearance.size.filter(s => !exclude.size!.includes(s))
      : appearance.size,
  };

  const [selected, setSelected] = useState({
    variant: appearance.variant.length
      ? appearance.variant.includes('default')
        ? 'default'
        : appearance.variant[0]
      : 'none',
    size: appearance.size.length
      ? appearance.size.includes('default')
        ? 'default'
        : appearance.size[0]
      : 'none',
  });

  let disabledAppearance = '';
  if (appearance.variant.length === 0 && appearance.size.length === 0) {
    disabledAppearance = '"variant" and "size"';
  } else if (appearance.size.length === 0) {
    disabledAppearance = '"size"';
  } else if (appearance.variant.length === 0) {
    disabledAppearance = '"variant"';
  }

  const isVariantOrSizeMissing =
    appearance.variant.length === 0 || appearance.size.length === 0;

  const variantOptions =
    appearance.variant.length === 0 ? ['default'] : appearance.variant;
  const sizeOptions =
    appearance.size.length === 0 ? ['default'] : appearance.size;

  return (
    <>
      <p>
        The appearance of a component can be customized using the{' '}
        <code>variant</code> and <code>size</code> props. These props adjust the
        visual style and dimensions of the component, available values are based
        on the active theme.
      </p>

      <div className="border-fd-primary/10 prose-no-margin relative overflow-hidden rounded-lg border">
        <div className="absolute top-3 left-4 z-10 flex w-full flex-wrap gap-2">
          <AppearancePicker
            label="Variant"
            options={variantOptions}
            value={selected.variant}
            onChange={val => setSelected({ variant: val, size: selected.size })}
            disabled={appearance.variant.length === 0}
          />
          <AppearancePicker
            label="Size"
            options={sizeOptions}
            value={selected.size}
            onChange={val =>
              setSelected({ variant: selected.variant, size: val })
            }
            disabled={appearance.size.length === 0}
          />
          {isVariantOrSizeMissing ? (
            <div className={styles.info()}>
              <Info size={14} />
              The selected theme does not has any options for
              {disabledAppearance}.
            </div>
          ) : null}
        </div>
        <div data-theme="rui">
          <OverlayContainerProvider container="portalContainer">
            <MarigoldProvider theme={ruiTheme}>
              <div className="not-prose flex size-full min-h-56 items-center justify-center overflow-x-auto px-4 pt-24 pb-10">
                <Demo {...selected} />
              </div>
            </MarigoldProvider>
          </OverlayContainerProvider>
        </div>
      </div>
    </>
  );
};
