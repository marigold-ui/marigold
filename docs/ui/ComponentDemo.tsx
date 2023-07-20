import { ReactNode, useState } from 'react';
import { Button, MarigoldProvider } from './marigold';
import { useThemeSwitch } from '@/app/components/[...slug]/_components';
import { Theme } from '../../packages/system/src';
import { type Theme } from '@marigold/system';

import { registry } from '@/registry';
import { MarigoldProvider } from './marigold';
import { useThemeSwitch } from '@/app/_components/ThemeSwitch';
export interface ComponentDemoProps {
  name: string;
  children?: ReactNode;
}

export const ComponentDemo = ({ name, children }: ComponentDemoProps) => {
  const Demo = (registry as any)[name].demo;
  const { current, themes } = useThemeSwitch();
  const { current, themes } = useThemeSwitch();
  const [showCode, setShowCode] = useState(true);
  const buttonStyles =
    'rounded-none border-solid  border-transparent border-b-slate-800 p-2';
  return (
    <MarigoldProvider theme={(current && themes[current]) as Theme}>
      <div className="max-h-[650px] max-w-[800px]">
        <div className="mb-4 mt-10 border-b border-b-slate-200">
          <Button
            className={`${buttonStyles} ${showCode && 'border-b-[3px]'}`}
            onClick={() => setShowCode(true)}
          >
            Code
          </Button>
          <Button
            className={`${buttonStyles} ${!showCode && 'border-b-[3px]'}`}
            onClick={() => setShowCode(false)}
          >
            Preview
          </Button>
        </div>
        <div className={!showCode ? 'hidden' : ''}>{children}</div>
        <div data-theme={current}>
          <MarigoldProvider theme={(current && themes[current]) as Theme}>
            <div className="px-4 py-6" className={showCode ? 'hidden' : ''}>
              <Demo />
            </div>
          </MarigoldProvider>
        </div>
      </div>
    </MarigoldProvider>
  );
};
