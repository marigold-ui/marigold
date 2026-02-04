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
      // Auto resolve component names to their file paths
      // If path is just a component name (e.g., "Button"), resolve to "Button/Button.tsx"
      // If path contains / (e.g., "Radio/RadioGroup"), append .tsx to the last segment
      // If path contains "system", strip "system/" prefix and use system basePath
      const isSystemPackage = props.path?.includes('system');
      const cleanPath = isSystemPackage
        ? props.path.replace(/^system\//, '')
        : props.path;

      const resolvedPath = cleanPath?.includes('/')
        ? `${cleanPath}.tsx`
        : cleanPath
          ? `${cleanPath}/${cleanPath}.tsx`
          : undefined;

      const basePath = isSystemPackage
        ? '../packages/system/src/'
        : '../packages/components/src/';

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
