import { ReactNode } from 'react';
import { MarigoldProvider, Tabs } from './marigold';
import { type Theme } from '@marigold/system';

import { registry } from '@/registry';
import { useThemeSwitch } from '@/app/_components/ThemeSwitch';
export interface ComponentDemoProps {
  name: keyof typeof registry;
  source: string;
  children?: ReactNode;
}

export const ComponentDemo = ({ name, children }: ComponentDemoProps) => {
  const Demo = registry[name].demo;
  const { current, themes } = useThemeSwitch();

  return (
    <Tabs defaultSelectedKey="preview">
      <Tabs.Item key="preview" title="Preview">
        <div
          data-theme={current}
          className="flex min-h-[150px] flex-col [&>*:first-child]:grid [&>*:first-child]:flex-1 [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl [&>*:first-child]:border"
        >
          <MarigoldProvider theme={(current && themes[current]) as Theme}>
            <div className="w-full p-4">
              <Demo />
            </div>
          </MarigoldProvider>
        </div>
      </Tabs.Item>
      <Tabs.Item key="code" title="Code">
        {children}
      </Tabs.Item>
    </Tabs>
  );
};
