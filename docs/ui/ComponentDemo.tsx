import { ReactNode } from 'react';
import { type Theme } from '@marigold/system';

import { registry } from '../registry';
import { MarigoldProvider } from './marigold';

import { useThemeSwitch } from '@/app/_components/ThemeSwitch';
export interface ComponentDemoProps {
  name: keyof typeof registry;
  source: string;
  children?: ReactNode;
}

export const ComponentDemo = ({
  name,
  source,
  children,
}: ComponentDemoProps) => {
  const Demo = registry[name].demo;
  const { current, themes } = useThemeSwitch();

  return (
    <div className="bg-cyan-800 p-10 text-cyan-100">
      <pre>
        <code className="language-tsx">{source}</code>
      </pre>
      <hr />
      <div data-theme={current}>
        <MarigoldProvider theme={(current && themes[current]) as Theme}>
          <div className="px-4 py-6">
            <Demo />
          </div>
        </MarigoldProvider>
      </div>
    </div>
  );
};
