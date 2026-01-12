'use client';

import { type RegistryKey, registry } from '@/lib/.registry/demos';
import { ruiTheme, theme } from '@/theme';
import { track } from '@vercel/analytics/react';
import {
  type ComponentType,
  Key,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { codeToHtml } from 'shiki';
import {
  Card,
  MarigoldProvider,
  OverlayContainerProvider,
  Tabs,
} from '@marigold/components';
import { CopyButton } from '@/ui/CopyButton';
import { FullsizeView } from '@/ui/FullsizeViewDemo';

type ComponentDemoProps = {
  name?: RegistryKey;
  component?: string;
  collection?: string;
  code?: string;
  title?: string;
  children?: ReactNode;
  mode?: 'preview' | 'code' | 'both';
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

export const ComponentDemo = ({
  name,
  code,
  mode = 'both',
}: ComponentDemoProps) => {
  const onSelectionChange = (key: Key) => {
    track('Demo Tab', { tab: key as string });
  };

  const entry = name ? registry[name] : undefined;
  const codeString = code ?? entry?.source ?? '';

  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    async function highlight() {
      if (!codeString) {
        setHighlightedCode('');
        return;
      }

      const html = await codeToHtml(codeString, {
        theme: 'material-theme-palenight',
        lang: 'tsx',
      });

      setHighlightedCode(html);
    }

    highlight();
  }, [codeString]);

  const hasCode = !!codeString;
  const lines = codeString
    .replace(/\r\n|\r|\n$/, '')
    .split(/\r\n|\r|\n/).length;

  // Preview only
  if (mode === 'preview') {
    return (
      <MarigoldProvider theme={theme}>
        <Preview name={name} />
      </MarigoldProvider>
    );
  }

  // Code only
  if (mode === 'code' && hasCode) {
    return (
      <MarigoldProvider theme={theme}>
        <div className="relative [&_figure]:border-0! [&_pre]:border-0!">
          <div className="absolute top-4 right-3 z-10 flex gap-3">
            {lines >= 5 && (
              <FullsizeView
                code={
                  <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                }
                codeString={codeString}
              />
            )}
            <CopyButton codeString={codeString} />
          </div>

          {highlightedCode ? (
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          ) : (
            <div className="p-4 text-sm opacity-60">Loading code…</div>
          )}
        </div>
      </MarigoldProvider>
    );
  }

  // Preview + Code tabs
  return (
    <MarigoldProvider theme={theme}>
      <Tabs
        variant="demo"
        defaultSelectedKey="preview"
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
            <div className="relative [&_figure]:border-0! [&_pre]:border-0!">
              <div className="absolute top-4 right-3 z-10 flex gap-3">
                {lines >= 5 && (
                  <FullsizeView
                    code={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightedCode,
                        }}
                      />
                    }
                    codeString={codeString}
                  />
                )}
                <CopyButton codeString={codeString} />
              </div>

              {highlightedCode ? (
                <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              ) : (
                <div className="p-4 text-sm opacity-60">Loading code…</div>
              )}
            </div>
          </Tabs.TabPanel>
        )}
      </Tabs>
    </MarigoldProvider>
  );
};
