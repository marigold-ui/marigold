import type { Generator } from 'fumadocs-typescript';
import { AutoTypeTable as FumadocsAutoTypeTable } from 'fumadocs-typescript/ui';
import { type Pkg, getPropTable } from '../lib/props-data';

// FumadocsAutoTypeTable forwards only `path`/`name`/`type` to its generator,
// so we encode `package` into `path` as `pkg:rawPath` to carry it through.
const PATH_PREFIX_SEPARATOR = ':';

const generator: Generator = {
  generateDocumentation: async () => {
    throw new Error('AutoTypeTable: generateDocumentation is not used');
  },
  generateTypeTable: async ({ path, name }) => {
    if (!path || !name) return [];
    const [pkg, rawPath] = path.includes(PATH_PREFIX_SEPARATOR)
      ? (path.split(/:(.*)/s) as [string, string])
      : ['components', path];
    const data = getPropTable({
      path: rawPath,
      name,
      package: pkg as Pkg,
    });
    if (!data) return [];
    return [
      {
        id: encodeURI(`${rawPath}-${name}`),
        name,
        entries: data.entries,
      },
    ];
  },
};

export interface AutoTypeTableProps {
  path: string;
  name: string;
  package?: Pkg;
}

export const AutoTypeTable = ({
  path,
  name,
  package: pkg = 'components',
}: AutoTypeTableProps) => (
  <FumadocsAutoTypeTable
    path={`${pkg}${PATH_PREFIX_SEPARATOR}${path}`}
    name={name}
    generator={generator}
  />
);
