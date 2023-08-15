import { ReactNode } from 'react';
import { Card, MarigoldProvider, Tabs } from './marigold';
import { type Theme } from '@marigold/system';

import { registry } from '@/registry';
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
      <Tabs.Item key="preview" title="Preview">
        <Card variant="not-inset">
          <div
            data-theme={current}
            className="flex h-full min-h-[150px] w-full flex-col [&>*:first-child]:grid [&>*:first-child]:flex-1 [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl"
          >
            <MarigoldProvider theme={(current && themes[current]) as Theme}>
              <div className="not-prose w-full overflow-x-auto p-4">
                <Demo />
              </div>
            </MarigoldProvider>
          </div>
        </Card>
      </Tabs.Item>
      <Tabs.Item key="code" title="Code">
        {children}
      </Tabs.Item>
    </Tabs>
  );
};
