import { registry } from '@/registry';
import { Card, MarigoldProvider, OverlayContainerProvider, Tabs } from '@/ui';
import { ReactNode } from 'react';

import { type Theme } from '@marigold/system';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

// Props
// ---------------
export interface ComponentDemoProps {
  /**
   * Used in the rehype plugin
   * @internal
   */
  file: string;
  /**
   * Used in the rehype plugin
   * @internal
   */
  wordHighlighting: string;
  /**
   * Used in the rehype plugin
   * @internal
   */
  lineHighlighting: string;
  name: keyof typeof registry;
  source: string;
  children?: ReactNode;
}

// Component
// ---------------
export const ComponentDemo = ({ name, children }: ComponentDemoProps) => {
  const Demo = registry[name].demo;
  const { current, themes } = useThemeSwitch();

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
              className="flex h-full min-h-[150px] w-full flex-col [&>*:nth-child(2)]:flex [&>*:nth-child(2)]:flex-1 [&>*:nth-child(2)]:place-items-center [&>*:nth-child(2)]:rounded-xl"
            >
              <div id="portalContainer" />
              <OverlayContainerProvider value="portalContainer">
                <MarigoldProvider theme={(current && themes[current]) as Theme}>
                  <div className="not-prose w-full overflow-x-auto p-4">
                    <Demo />
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
