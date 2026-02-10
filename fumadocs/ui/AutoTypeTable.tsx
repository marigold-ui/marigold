import {
  createFileSystemGeneratorCache,
  createGenerator,
} from 'fumadocs-typescript';
import { AutoTypeTable as FumadocsAutoTypeTable } from 'fumadocs-typescript/ui';

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

export const AutoTypeTable = (props: {
  path?: string;
  name?: string;
  package?: 'system' | 'components';
  [key: string]: unknown;
}) => {
  // Determine package type from explicit prop
  const isSystemPackage = props.package === 'system';

  const basePath = isSystemPackage
    ? '../packages/system/src/'
    : '../packages/components/src/';

  // For system package, prepend "components/" if not already present
  let cleanPath = props.path;
  const wasSimpleName = cleanPath && !cleanPath.includes('/');

  if (isSystemPackage && cleanPath && !cleanPath.startsWith('components/')) {
    cleanPath = `components/${cleanPath}`;
  }

  // Auto resolve component names to their file paths
  // If path already ends with .tsx, use it as-is
  // If path contains / and was originally a simple name (after prepending "components/"),
  //   resolve to ComponentName/ComponentName.tsx (e.g., "components/SVG" → "components/SVG/SVG.tsx")
  // If path contains / and was originally a path (e.g., "Formatters/DateFormat"), append .tsx
  // If path is just a component name (e.g., "Button"), resolve to "Button/Button.tsx"
  const resolvedPath = cleanPath?.endsWith('.tsx')
    ? cleanPath
    : cleanPath?.includes('/')
      ? wasSimpleName && isSystemPackage
        ? `${cleanPath}/${props.path}.tsx`
        : `${cleanPath}.tsx`
      : cleanPath
        ? `${cleanPath}/${cleanPath}.tsx`
        : undefined;

  return (
    <FumadocsAutoTypeTable
      {...props}
      path={resolvedPath}
      generator={generator}
      options={{ basePath }}
    />
  );
};
