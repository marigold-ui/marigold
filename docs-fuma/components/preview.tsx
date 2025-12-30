'use client';
import { type RegistryKey, registry } from '@/lib/.registry/demos';
import { ruiTheme, theme } from '@/theme';
import { track } from '@vercel/analytics/react';
import { type ComponentType, Key, type ReactNode } from 'react';
import {
  Card,
  MarigoldProvider,
  OverlayContainerProvider,
  Tabs,
} from '@marigold/components';
import { CopyButton } from '@/ui/CopyButton';
import { FullsizeView } from '@/ui/FullsizeViewDemo';

type ComponentPreviewProps = {
  name?: RegistryKey;
  component?: string;
  collection?: string;
  code?: string;
  title?: string;
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
  return (
    <Card variant="content" p={0}>
      <div
        data-theme={ruiTheme.name}
        className="flex size-full min-h-[150px] flex-col [&>*:first-child]:flex [&>*:first-child]:flex-1 [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl"
      >
        <OverlayContainerProvider container="portalContainer">
          <MarigoldProvider theme={ruiTheme}>
            <div className="not-prose size-full overflow-x-auto p-4">
              {children}
            </div>
          </MarigoldProvider>
        </OverlayContainerProvider>
      </div>
    </Card>
  );
};

export const ComponentPreview = ({ name, code }: ComponentPreviewProps) => {
  const onSelectionChange = (key: Key) => {
    track('Demo Tab', { tab: key as string });
  };

  // Prefer inlined source from the registry (added at build time). This avoids
  // runtime file reads and keeps the docs self-contained. Fall back to the
  // explicit `code` prop when provided.
  const entry = name ? registry[name] : undefined;
  const codeString = code ?? entry?.source ?? '';
  const highlightedCode = entry?.highlighted;
  const hasCode = !!codeString;
  const lines = codeString
    .replace(/\r\n|\r|\n$/, '')
    .split(/\r\n|\r|\n/).length;

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
            <div className="relative [&_figure]:border-0! [&_figure]:border-none! [&_pre]:border-0! [&_pre]:border-none!">
              <div className="absolute top-4 right-3 z-10 flex justify-end gap-3">
                {lines >= 5 && (
                  <FullsizeView
                    code={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightedCode || '',
                        }}
                      />
                    }
                    codeString={codeString}
                  />
                )}
                <CopyButton codeString={codeString} />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: highlightedCode || '' }}
              />
            </div>
          </Tabs.TabPanel>
        )}
      </Tabs>
    </MarigoldProvider>
  );
};
