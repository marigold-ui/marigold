import propsData from '@/.registry/props.json';
import type { DocEntry } from 'fumadocs-typescript';

export type Pkg = 'components' | 'system';

export interface PropTableLookup {
  path: string;
  name: string;
  package?: Pkg;
}

export interface PropTableEntry {
  path: string;
  name: string;
  package: Pkg;
  entries: DocEntry[];
}

const data = propsData as Record<string, PropTableEntry>;

const keyOf = ({ path, name, package: pkg = 'components' }: PropTableLookup) =>
  `${pkg}:${path}:${name}`;

export const getPropTable = (
  lookup: PropTableLookup
): PropTableEntry | undefined => data[keyOf(lookup)];
