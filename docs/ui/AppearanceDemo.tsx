import { getAppearance } from '@/lib/utils';
import { registry } from '@/registry/demos';
import type { Theme } from '@/ui';
import {
  Card,
  FieldGroup,
  MarigoldProvider,
  OverlayContainerProvider,
  Select,
} from '@/ui';
import type { ComponentType, ReactNode } from 'react';
import { useState } from 'react';
import { Info } from '@marigold/icons';
import { useThemeSwitch } from '@/ui/ThemeSwitch';

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
      return 32;
    case length >= 10 && length < 12:
      return 36;
    case length >= 12 && length < 14:
      return 44;
    default:
      return 48;
  }
};

// Props
// ---------------
export interface AppearanceDemoProps {
  component: keyof Theme['components'];
  disableLabelWidth?: boolean;
}

// Component
// ---------------
export const AppearanceDemo = ({
  component,
  disableLabelWidth,
}: AppearanceDemoProps) => {
  const name = `${component.toLowerCase()}-appearance` as keyof typeof registry;

  if (!registry[name]) {
    throw Error(`No demo with name "${name}" found in the registry.`);
  }

  const Demo: ComponentType<any> = registry[name].demo;
  const { current, themes } = useThemeSwitch();
  const theme = themes[current];
  const appearance = getAppearance(component, theme);

  const [selected, setSelected] = useState({
    variant: 'default',
    size: 'default',
  });

  const Wrapper = ({ children }: { children: ReactNode }) =>
    current === 'core' && !disableLabelWidth ? (
      <FieldGroup labelWidth="100px">{children}</FieldGroup>
    ) : (
      children
    );

  let disabledAppearance = '';
  if (appearance.variant.length === 0 && appearance.size.length === 0) {
    disabledAppearance = 'variant and size';
  } else if (appearance.size.length === 0) {
    disabledAppearance = 'size';
  } else if (appearance.variant.length === 0) {
    disabledAppearance = 'variant';
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
        <div className="absolute left-4 top-3 flex flex-wrap gap-2">
          <Select
            label="Variant"
            variant="floating"
            size="small"
            width={getSelectWidth(appearance.variant)}
            selectedKey={selected.variant}
            onChange={(val: string) =>
              setSelected({ variant: val, size: selected.size })
            }
            disabled={appearance.variant.length === 0 ? true : false}
          >
            <Select.Option id="default">default</Select.Option>
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
            onChange={(val: string) =>
              setSelected({ variant: selected.variant, size: val })
            }
            disabled={appearance.size.length === 0 ? true : false}
          >
            <Select.Option id="default">default</Select.Option>
            {appearance.size.map(v => (
              <Select.Option key={v} id={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
          {isVariantOrSizeMissing ? (
            <div className="text-text-primary-muted flex items-center gap-0.5 text-xs">
              <Info size={14} />
              There is currently no available option for {disabledAppearance} to
              select.
            </div>
          ) : null}
        </div>
        <div data-theme={current}>
          <OverlayContainerProvider value="portalContainer">
            <MarigoldProvider theme={theme}>
              <div className="not-prose flex size-full min-h-56 items-center justify-center overflow-x-auto px-4 pb-10 pt-24">
                <Wrapper>
                  <Demo {...selected} />
                </Wrapper>
              </div>
            </MarigoldProvider>
          </OverlayContainerProvider>
        </div>
      </Card>
    </>
  );
};
