import { getAppearance } from '@/lib/utils';
import {
  Card,
  FieldGroup,
  MarigoldProvider,
  OverlayContainerProvider,
  Select,
} from '@/ui';
import type { Theme } from '@/ui';
import { type ReactNode, useState } from 'react';

import dynamic from 'next/dynamic';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

// Helper
// ---------------

/**
 * Dynamically load a component from the root import
 */
const getComponent = (name: string) =>
  dynamic(() => import('@marigold/components').then((mg: any) => mg[name]));

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
  const Component = getComponent(component);
  const { current, themes } = useThemeSwitch();
  const theme = themes[current];
  const appearance = getAppearance(component, theme);

  const [selected] = useState({ variant: 'default', size: 'default' });

  console.log(appearance);

  const Wrapper = ({ children }: { children: ReactNode }) =>
    current === 'core' && !disableLabelWidth ? (
      <FieldGroup labelWidth="100px">{children}</FieldGroup>
    ) : (
      children
    );

  return (
    <Card variant="content" p={0}>
      <div className="absolute left-4 top-4">
        <Select label="Variant" selectedKey={selected.variant}>
          <Select.Option id="default">default</Select.Option>
          {appearance.variant.map(v => (
            <Select.Option key={v} id={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div
        data-theme={current}
        className="flex size-full min-h-[150px] flex-col [&>*:first-child]:flex [&>*:first-child]:flex-1 [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl"
      >
        <OverlayContainerProvider value="portalContainer">
          <MarigoldProvider theme={theme}>
            <div className="not-prose size-full overflow-x-auto p-4">
              <Wrapper>
                <Component />
              </Wrapper>
            </div>
          </MarigoldProvider>
        </OverlayContainerProvider>
      </div>
    </Card>
  );
};
