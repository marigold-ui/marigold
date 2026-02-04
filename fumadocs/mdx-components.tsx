import {
  createFileSystemGeneratorCache,
  createGenerator,
} from 'fumadocs-typescript';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

export const getMDXComponents = (components?: MDXComponents): MDXComponents => {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components,
    AutoTypeTable: (props: {
      path?: string;
      name?: string;
      [key: string]: unknown;
    }) => {
      // Determine basePath based on whether path contains "system"
      const isSystemPackage = props.path?.includes('system');
      const basePath = isSystemPackage
        ? '../packages/system/src/'
        : '../packages/components/src/';

      // Strip "system/" prefix from path if present
      const cleanPath = isSystemPackage
        ? props.path?.replace(/^system\//, '')
        : props.path;

      // Auto resolve component names to their file paths
      // If path contains / (e.g., "Provider/MarigoldProvider"), append .tsx if not already present
      // If path is just a component name (e.g., "Button"), resolve to "Button/Button.tsx"
      // If path already ends with .tsx, use it as-is
      const resolvedPath = cleanPath?.endsWith('.tsx')
        ? cleanPath
        : cleanPath?.includes('/')
          ? `${cleanPath}.tsx`
          : cleanPath
            ? `${cleanPath}/${cleanPath}.tsx`
            : undefined;

      return (
        <AutoTypeTable
          {...props}
          path={resolvedPath}
          generator={generator}
          options={{ basePath }}
        />
      );
    },
  };
};
