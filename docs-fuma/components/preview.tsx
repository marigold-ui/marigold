'use client';
import { type RegistryKey, registry } from '@/lib/registry/demos';
import { ruiTheme, theme } from '@/theme';
import { track } from '@vercel/analytics/react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { type ComponentType, Key, type ReactNode } from 'react';
import {
  Card,
  MarigoldProvider,
  OverlayContainerProvider,
  Tabs,
} from '@marigold/components';

type ComponentPreviewProps = {
  /**
   * Name of the demo from the registry (optional)
   * When provided, the component will be loaded from the registry
   */
  name?: RegistryKey;
  /**
   * @deprecated - kept for backwards compatibility
   */
  component?: string;
  /**
   * @deprecated - kept for backwards compatibility
   */
  collection?: string;
  /**
   * Code to display in the code tab
   * If not provided and name is specified, will try to read from registry
   */
  code?: string;
  /**
   * Title for the preview (optional)
   */
  title?: string;
  /**
   * Children to render in the preview tab
   * If name is provided, this will be ignored and the registry demo will be used
   */
  children?: ReactNode;
};

// Preview wrapper component
const Preview = ({
  name,
  children,
}: {
  name?: RegistryKey;
  children?: ReactNode;
}) => {
  if (name && registry[name]) {
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
  }
};

export const ComponentPreview = ({
  name,
  code,
  title,
  children,
}: ComponentPreviewProps) => {
  const onSelectionChange = (key: Key) => {
    track('Demo Tab', { tab: key as string });
  };

  // If no code is provided but we have a registry entry, we could fetch it
  // For now, code must be provided manually or via MDX processing
  const hasCode = !!code;

  return (
    <MarigoldProvider theme={theme}>
      <Tabs
        variant="demo"
        defaultSelectedKey={'preview'}
        onSelectionChange={onSelectionChange}
      >
        <Tabs.List>
          <Tabs.Item id="preview">Preview</Tabs.Item>
          {hasCode && <Tabs.Item id="code">Code</Tabs.Item>}
        </Tabs.List>
        <Tabs.TabPanel id="preview">
          <Preview name={name} />
        </Tabs.TabPanel>
        {hasCode && (
          <Tabs.TabPanel id="code">
            <DynamicCodeBlock code={code} lang="tsx" />
          </Tabs.TabPanel>
        )}
      </Tabs>
    </MarigoldProvider>
  );
};
