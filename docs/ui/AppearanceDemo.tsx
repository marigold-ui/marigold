'use client';

import { registry } from '@/lib/.registry/demos';
import { getAppearance } from '@/lib/utils';
import { ruiTheme } from '@/theme';
import type { Theme } from '@/ui';
import { Card, MarigoldProvider, OverlayContainerProvider, Select } from '@/ui';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { Info } from '@marigold/icons';

// Helpers
// ---------------
function getLongestString(list: string[]) {
  const sortedArray = list.sort((a, b) => b.length - a.length);
  return sortedArray[0];
}

const getSelectWidth = (options: string[]) => {
  const length = (getLongestString(options) || '').length;

  // Poor mans pattern matching
  switch (true) {
    case length < 10:
      return 40;
    case length >= 10 && length < 12:
      return 44;
    case length >= 12 && length < 14:
      return 48;
    default:
      return 52;
  }
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
  const name = `${component.toLowerCase()}-appearance` as keyof typeof registry;

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

  return (
    <>
      <p>
        The appearance of a component can be customized using the{' '}
        <code>variant</code> and <code>size</code> props. These props adjust the
        visual style and dimensions of the component, available values are based
        on the active theme.
      </p>

      <Card variant="content" p={0}>
        <div className="absolute top-3 left-4 flex flex-wrap gap-2">
          <Select
            label="Variant"
            variant="floating"
            size="small"
            width={getSelectWidth(appearance.variant)}
            selectedKey={selected.variant}
            onChange={val =>
              setSelected({ variant: val as string, size: selected.size })
            }
            disabled={appearance.variant.length === 0 ? true : false}
          >
            {appearance.variant.length === 0 ? (
              <Select.Option id="none">default</Select.Option>
            ) : null}
            {appearance.variant.map(v => (
              <Select.Option key={v} id={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
          <Select
            label="Size"
            variant="floating"
            size="small"
            width={getSelectWidth(appearance.size)}
            selectedKey={selected.size}
            onChange={val =>
              setSelected({ variant: selected.variant, size: val as string })
            }
            disabled={appearance.size.length === 0 ? true : false}
          >
            {appearance.size.length === 0 ? (
              <Select.Option id="none">default</Select.Option>
            ) : null}
            {appearance.size.map(v => (
              <Select.Option key={v} id={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
          {isVariantOrSizeMissing ? (
            <div className="text-text-primary-muted flex items-center gap-0.5 text-xs">
              <Info size={14} />
              The selected theme does not has any options for{' '}
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
      </Card>
    </>
  );
};
