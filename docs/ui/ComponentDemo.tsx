import { registry } from '@/registry';
import { Card, MarigoldProvider, Tabs } from '@/ui';
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
    <Tabs defaultSelectedKey="preview">
      <Tabs.List>
        <Tabs.Item id="preview">Preview</Tabs.Item>
        <Tabs.Item id="code">Code</Tabs.Item>
      </Tabs.List>
      <Tabs.TabPanel id="preview">
        <Card variant="not-inset">
          <MarigoldProvider
            theme={(current && themes[current]) as Theme}
            className="flex flex-1 place-items-center rounded-xl"
          >
            <div className="flex h-full min-h-[150px] w-full flex-col">
              <div className="not-prose w-full overflow-x-auto p-4">
                <Demo />
              </div>
            </div>
          </MarigoldProvider>
        </Card>
      </Tabs.TabPanel>
      <Tabs.TabPanel id="code">{children}</Tabs.TabPanel>
    </Tabs>
  );
};
