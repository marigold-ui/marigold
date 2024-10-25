import { registry } from '@/registry/demos';
import {
  Card,
  FieldGroup,
  MarigoldProvider,
  OverlayContainerProvider,
  Tabs,
} from '@/ui';
import type { ComponentType, ReactNode } from 'react';
import { useThemeSwitch } from '@/ui/ThemeSwitch';

// Props
// ---------------
export interface ComponentDemoProps {
  /**
   * Use to get and parse the demo in rehype
   * @internal
   */
  file: string;
  /**
   * Use to pass the metastring to `rehype-pretty-code`
   * (see https://rehype-pretty.pages.dev/#meta-strings)
   * @internal
   */
  meta: string;
  name: keyof typeof registry;
  source: string;
  children?: ReactNode;
  disableLabelWidth?: boolean;
  labelWidth?: string;
}

// Component
// ---------------
export const ComponentDemo = ({
  name,
  children,
  disableLabelWidth,
  labelWidth = '100px',
}: ComponentDemoProps) => {
  if (!registry[name]) {
    throw Error(`No demo with name "${name}" found in the registry.`);
  }

  const Demo: ComponentType<{}> = registry[name].demo;
  const { current, themes } = useThemeSwitch();

  const Wrapper = ({ children }: { children: ReactNode }) =>
    current === 'core' && !disableLabelWidth ? (
      <FieldGroup labelWidth={labelWidth}>{children}</FieldGroup>
    ) : (
      children
    );

  return (
    <>
      <Tabs variant="demo" defaultSelectedKey="preview">
        <Tabs.List>
          <Tabs.Item id="preview">Preview</Tabs.Item>
          <Tabs.Item id="code">Code</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="preview">
          <Card variant="content" p={0}>
            <div
              data-theme={current}
              className="flex size-full min-h-[150px] flex-col [&>*:first-child]:flex [&>*:first-child]:flex-1 [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl"
            >
              <OverlayContainerProvider value="portalContainer">
                <MarigoldProvider theme={themes[current]}>
                  <div className="not-prose size-full overflow-x-auto p-4">
                    <Wrapper>
                      <Demo />
                    </Wrapper>
                  </div>
                </MarigoldProvider>
              </OverlayContainerProvider>
            </div>
          </Card>
        </Tabs.TabPanel>
        <Tabs.TabPanel id="code">{children}</Tabs.TabPanel>
      </Tabs>
    </>
  );
};
