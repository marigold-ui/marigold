import { registry } from '@/registry/demos';
import { ruiTheme } from '@/theme';
import { Card, MarigoldProvider, OverlayContainerProvider, Tabs } from '@/ui';
import { track } from '@vercel/analytics/react';
import type { ComponentType, ReactNode } from 'react';

// Helpers
// ---------------
const Preview = ({ name }: { name: keyof typeof registry }) => {
  const Demo: ComponentType<any> = registry[name].demo;

  return (
    <Card variant="content" p={0}>
      <div
        data-theme="rui"
        className="flex size-full min-h-[150px] flex-col [&>*:first-child]:flex [&>*:first-child]:flex-1 [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl"
      >
        <OverlayContainerProvider container="portalContainer">
          <MarigoldProvider theme={ruiTheme}>
            <div className="not-prose size-full overflow-x-auto p-4">
              <Demo />
            </div>
          </MarigoldProvider>
        </OverlayContainerProvider>
      </div>
    </Card>
  );
};

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
  mode?: 'preview' | 'full';
  children?: ReactNode;
}

// Component
// ---------------
export const ComponentDemo = ({
  name,
  children,
  mode = 'full',
}: ComponentDemoProps) => {
  if (!registry[name]) {
    throw Error(`No demo with name "${name}" found in the registry.`);
  }

  if (mode !== 'full') {
    return <Preview name={name} />;
  }

  const onSelectionChange = (key: string) => {
    track('Demo Tab', { tab: key });
  };

  return (
    <Tabs
      variant="demo"
      defaultSelectedKey="preview"
      onSelectionChange={onSelectionChange}
    >
      <Tabs.List>
        <Tabs.Item id="preview">Preview</Tabs.Item>
        <Tabs.Item id="code">Code</Tabs.Item>
      </Tabs.List>
      <Tabs.TabPanel id="preview">
        <Preview name={name} />
      </Tabs.TabPanel>
      <Tabs.TabPanel id="code">{children}</Tabs.TabPanel>
    </Tabs>
  );
};
