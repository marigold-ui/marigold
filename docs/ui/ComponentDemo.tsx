import { registry } from '@/registry';
import {
  Card,
  FieldGroup,
  MarigoldProvider,
  OverlayContainerProvider,
  Tabs,
} from '@/ui';
import type { ReactNode } from 'react';

import { type Theme } from '@marigold/system';

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
}

// Component
// ---------------
export const ComponentDemo = ({ name, children }: ComponentDemoProps) => {
  const Demo = registry[name].demo;
  const { current, themes } = useThemeSwitch();

  const Wrapper = ({ children }: { children: ReactNode }) =>
    current === 'core' ? (
      <FieldGroup labelWidth="100px">{children}</FieldGroup>
    ) : (
      children
    );

  return (
    <>
      <Tabs defaultSelectedKey="preview">
        <Tabs.List>
          <Tabs.Item id="preview">Preview</Tabs.Item>
          <Tabs.Item id="code">Code</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="preview">
          <Card variant="not-inset">
            <div
              data-theme={current}
              className="flex size-full min-h-[150px] flex-col [&>*:nth-child(2)]:flex [&>*:nth-child(2)]:flex-1 [&>*:nth-child(2)]:place-items-center [&>*:nth-child(2)]:rounded-xl"
            >
              <div id="portalContainer" className="not-prose" />
              <OverlayContainerProvider value="portalContainer">
                <MarigoldProvider theme={(current && themes[current]) as Theme}>
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
