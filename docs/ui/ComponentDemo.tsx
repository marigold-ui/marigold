import { registry } from '@/registry';
import { Card, FieldGroup, MarigoldProvider, Tabs } from '@/ui';
import type { ReactNode } from 'react';

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
              className="flex size-full min-h-[150px] flex-col [&>*:first-child]:flex [&>*:first-child]:flex-1 [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl"
            >
              <MarigoldProvider theme={(current && themes[current]) as Theme}>
                <div className="not-prose w-full overflow-x-auto p-4">
                  <Wrapper>
                    <Demo />
                  </Wrapper>
                </div>
              </MarigoldProvider>
            </div>
          </Card>
        </Tabs.TabPanel>
        <Tabs.TabPanel id="code">{children}</Tabs.TabPanel>
      </Tabs>
    </>
  );
};
