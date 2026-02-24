'use client';

import { type RegistryKey, registry } from '@/.registry/demos';
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
const Preview = ({ name }: { name: RegistryKey }) => {
  const Demo: ComponentType<any> = registry[name].demo;

  return (
    <div
      data-theme="rui"
      className="flex min-h-[150px] w-full flex-col [&>*:first-child]:flex [&>*:first-child]:place-items-center [&>*:first-child]:rounded-xl"
    >
      <OverlayContainerProvider container="portalContainer">
        <MarigoldProvider theme={ruiTheme} className="bg-background w-full">
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
    return <Preview name={key} />;
  }

  // Code only mode
  if (mode === 'code') {
    return <DynamicCodeBlock lang="tsx" code={codeString} />;
  }

  // Full mode with Preview + Code tabs
  return (
    <Tabs items={['Preview', 'Code']} defaultIndex={0}>
      <Tab value="Preview" className="p-0">
        <Preview name={key} />
      </Tab>
      <Tab value="Code">
        <DynamicCodeBlock lang="tsx" code={codeString} />
      </Tab>
    </Tabs>
  );
};
