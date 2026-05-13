import type { DocEntry, Generator } from 'fumadocs-typescript';
import { AutoTypeTable as FumadocsAutoTypeTable } from 'fumadocs-typescript/ui';
import { ChevronRight } from 'lucide-react';
import { type Pkg, getPropTable } from '../lib/props-data';
import { splitPropEntries } from '../lib/props-filter';

const makeGenerator = (
  id: string,
  name: string,
  entries: DocEntry[]
): Generator => ({
  generateDocumentation: async () => {
    throw new Error('AutoTypeTable: generateDocumentation is not used');
  },
  generateTypeTable: async () =>
    entries.length === 0 ? [] : [{ id, name, entries }],
});

interface ExtraSectionProps {
  id: string;
  name: string;
  label: string;
  entries: DocEntry[];
}

const ExtraSection = ({ id, name, label, entries }: ExtraSectionProps) => (
  <details className="group my-4">
    <summary className="text-fd-muted-foreground hover:text-fd-foreground flex cursor-pointer list-none items-center gap-1 text-sm font-medium select-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
      <ChevronRight className="size-3.5 shrink-0 transition-transform group-open:rotate-90" />
      {label} ({entries.length})
    </summary>
    <div className="mt-2">
      <FumadocsAutoTypeTable
        path=""
        name={name}
        generator={makeGenerator(id, name, entries)}
      />
    </div>
  </details>
);

export interface AutoTypeTableProps {
  path: string;
  name: string;
  package?: Pkg;
}

export const AutoTypeTable = ({
  path,
  name,
  package: pkg = 'components',
}: AutoTypeTableProps) => {
  const data = getPropTable({ path, name, package: pkg });
  const groups = splitPropEntries(data?.entries ?? []);
  const baseId = encodeURI(`${path}-${name}`);

  return (
    <>
      <FumadocsAutoTypeTable
        path=""
        name={name}
        generator={makeGenerator(`${baseId}-main`, name, groups.main)}
      />
      {groups.aria.length > 0 && (
        <ExtraSection
          id={`${baseId}-aria`}
          name={name}
          label="Accessibility props"
          entries={groups.aria}
        />
      )}
      {groups.handlers.length > 0 && (
        <ExtraSection
          id={`${baseId}-handlers`}
          name={name}
          label="DOM event handlers"
          entries={groups.handlers}
        />
      )}
    </>
  );
};
