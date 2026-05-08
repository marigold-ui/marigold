'use client';

import { type RegistryKey, registry } from '@/.registry/demos';
import { cn } from '@/lib/cn';
import { track } from '@vercel/analytics';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { type ComponentType, type ReactNode } from 'react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import { theme as ruiTheme } from '@marigold/theme-rui';

// Props
// ---------------
export interface ComponentDemoProps {
  /**
   * The name of the demo in the registry (e.g., "button-appearance")
   * Use this when referencing by registry key
   */
  name?: RegistryKey;
  /**
   * Path to the demo file relative to the MDX file (e.g., "./button-appearance.demo.tsx")
   * The file path will be converted to a registry key
   */
  file?: string;
  /**
   * Display mode: 'preview' shows only the preview, 'code' shows only code,
   * 'full' shows both in tabs (default)
   */
  mode?: 'preview' | 'code' | 'full';
  /**
   * Background color of the preview area.
   * 'surface' uses white, 'page' uses the theme's background color.
   */
  background?: 'surface' | 'page';
  children?: ReactNode;
}

/**
 * Convert a file path to a registry key
 * e.g., "./button-appearance.demo.tsx" -> "button-appearance"
 */
function fileToRegistryKey(file: string): string {
  // Remove leading ./ or ../
  const normalized = file.replace(/^\.\//, '').replace(/^\.\.\//, '');
  // Extract the base name without .demo.tsx
  const match = normalized.match(/([^/]+)\.demo\.tsx$/);
  return match ? match[1] : normalized;
}

// Preview wrapper component
// ---------------
const Preview = ({
  name,
  background = 'surface',
}: {
  name: RegistryKey;
  background?: 'surface' | 'page';
}) => {
  const Demo: ComponentType<any> = registry[name].demo;

  return (
    <div
      data-theme="rui"
      className="flex w-full flex-col justify-center overflow-hidden [&>*:first-child]:flex [&>*:first-child]:place-items-center"
    >
      <OverlayContainerProvider container="portalContainer">
        <MarigoldProvider
          theme={ruiTheme}
          className={cn(
            'min-h-37.5 w-full',
            background === 'page' ? 'bg-background' : 'bg-white'
          )}
        >
          <div className="not-prose w-full overflow-x-auto p-4">
            <Demo />
          </div>
        </MarigoldProvider>
      </OverlayContainerProvider>
    </div>
  );
};

// Component
// ---------------
export const ComponentDemo = ({
  name,
  file,
  mode = 'full',
  background,
}: ComponentDemoProps) => {
  // Resolve the registry key from either name or file prop
  const registryKey = name ?? (file ? fileToRegistryKey(file) : undefined);

  if (!registryKey || !registry[registryKey as RegistryKey]) {
    const identifier = name ?? file ?? 'undefined';
    return (
      <div className="rounded-lg border border-red-500 bg-red-50 p-4 text-red-700">
        <strong>Error:</strong> No demo with identifier &quot;{identifier}&quot;
        found in the registry.
      </div>
    );
  }

  const key = registryKey as RegistryKey;
  const entry = registry[key];
  const codeString = entry.source ?? '';

  // Preview only mode
  if (mode === 'preview') {
    return (
      <div className="overflow-hidden rounded-xl border">
        <Preview name={key} background={background} />
      </div>
    );
  }

  // Code only mode
  if (mode === 'code') {
    return <DynamicCodeBlock lang="tsx" code={codeString} />;
  }

  // Full mode with Preview + Code tabs
  return (
    <DemoTabs demoKey={key}>
      <Tab value="Preview" className="p-0">
        <Preview name={key} background={background} />
      </Tab>
      <Tab value="Code">
        <DynamicCodeBlock lang="tsx" code={codeString} />
      </Tab>
    </DemoTabs>
  );
};

// Tracked Tabs wrapper
// ---------------
const DemoTabs = ({
  demoKey,
  children,
}: {
  demoKey: string;
  children: ReactNode;
}) => (
  <Tabs
    items={['Preview', 'Code']}
    defaultIndex={0}
    onClick={e => {
      const tab = (e.target as HTMLElement).closest('[role="tab"]');
      if (tab) {
        track('Demo Tab', { tab: tab.textContent ?? '' });
      }
    }}
  >
    {children}
  </Tabs>
);
