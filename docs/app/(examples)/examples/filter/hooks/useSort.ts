import {
  type inferParserType,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs';

const sortColumns = ['name', 'capacity', 'price'] as const;
const sortDirections = ['ascending', 'descending'] as const;

const sortParsers = {
  column: parseAsStringLiteral(sortColumns).withDefault('name'),
  direction: parseAsStringLiteral(sortDirections).withDefault('ascending'),
};

export type VenueSortDescriptor = inferParserType<typeof sortParsers>;

export const useSort = () => useQueryStates(sortParsers, { history: 'push' });
