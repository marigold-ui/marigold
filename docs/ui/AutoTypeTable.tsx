import { AutoTypeTable as FumadocsAutoTypeTable } from 'fumadocs-typescript/ui';
import { autoTypeTableTransform } from '../lib/auto-type-table-transform';
import { getGenerator, resolveComponentPath } from '../lib/typescript';

export const AutoTypeTable = async (props: {
  path?: string;
  name?: string;
  package?: 'system' | 'components';
  [key: string]: unknown;
}) => {
  const generator = await getGenerator();
  const resolvedPath = props.path
    ? resolveComponentPath({ path: props.path, package: props.package })
    : undefined;

  return (
    <FumadocsAutoTypeTable
      {...props}
      path={resolvedPath}
      generator={generator}
      options={{ transform: autoTypeTableTransform }}
    />
  );
};
