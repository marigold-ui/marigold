'use client';

import { useState } from 'react';
import type { Key } from 'react';
import {
  Inline,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
} from '@marigold/components';
import { Columns3 } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import type { ColumnDefinition, ColumnKey, Report, ReportRow } from './domain';
import {
  columnDefinitions,
  defaultVisibleColumns,
  getBreakdown,
  getTimeBreakdown,
} from './domain';

const PAGE_SIZE = 10;

/** Header of the first column, derived from the breakdown ("pro Genre" → "Genre"). */
const nameColumnLabel = (report: Report) => {
  if (report.params.breakdown === 'SUMMED_UP') return 'Aufschlüsselung';
  return getBreakdown(report.params.breakdown)
    .label.replace(/^(pro|nach)\s/, '')
    .replace(/^./, char => char.toUpperCase());
};

// Dynamic collection models (RAC pattern: columns/items + render functions).
interface ResultColumn {
  id: 'period' | 'name' | ColumnKey;
  label: string;
  numeric: boolean;
  definition?: ColumnDefinition;
}

type BodyRow =
  | { id: string; kind: 'data'; row: ReportRow }
  | { id: string; kind: 'total'; totals: Record<ColumnKey, number> };

const Amount = ({
  value,
  format,
  bold,
  semibold,
}: {
  value: number;
  format: 'number' | 'currency';
  bold?: boolean;
  semibold?: boolean;
}) => (
  <Text weight={bold ? 'bold' : semibold ? 'semibold' : 'regular'}>
    {format === 'currency' ? (
      <NumericFormat
        style="currency"
        currency="EUR"
        value={value}
        minimumFractionDigits={2}
      />
    ) : (
      <NumericFormat value={value} />
    )}
  </Text>
);

const ResultCell = ({
  item,
  column,
}: {
  item: BodyRow;
  column: ResultColumn;
}) => {
  if (column.id === 'period') {
    return item.kind === 'data' ? <>{item.row.period}</> : null;
  }
  if (column.id === 'name') {
    return item.kind === 'data' ? (
      <Text weight="medium">{item.row.name}</Text>
    ) : (
      <Text weight="bold">Summe</Text>
    );
  }

  const definition = column.definition;
  if (!definition) return null;

  return item.kind === 'data' ? (
    <Amount
      value={item.row.values[definition.key]}
      format={definition.format}
      semibold={definition.emphasized}
    />
  ) : (
    <Amount
      value={item.totals[definition.key]}
      format={definition.format}
      bold
    />
  );
};

/**
 * The result table of a successful report: configurable columns (today's
 * "Spalten" menu), a totals row, and local pagination.
 */
export const ResultTable = ({ report }: { report: Report }) => {
  const [visibleKeys, setVisibleKeys] = useState<ColumnKey[]>(
    defaultVisibleColumns
  );
  const [page, setPage] = useState(1);

  const rows = report.rows ?? [];
  const hasPeriod = report.params.timeBreakdown !== 'NONE';

  const tableColumns: ResultColumn[] = [
    ...(hasPeriod
      ? [
          {
            id: 'period' as const,
            label: getTimeBreakdown(report.params.timeBreakdown).label,
            numeric: false,
          },
        ]
      : []),
    { id: 'name', label: nameColumnLabel(report), numeric: false },
    ...columnDefinitions
      .filter(column => visibleKeys.includes(column.key))
      .map(column => ({
        id: column.key,
        label: column.label,
        numeric: true,
        definition: column,
      })),
  ];

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = rows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Totals are computed over all rows (not just the current page), matching
  // the "Summe" footer of the original report.
  const totals = Object.fromEntries(
    columnDefinitions.map(column => [
      column.key,
      rows.reduce((sum, row) => sum + row.values[column.key], 0),
    ])
  ) as Record<ColumnKey, number>;

  const bodyRows: BodyRow[] = [
    ...paged.map(row => ({ id: row.id, kind: 'data' as const, row })),
    { id: '__total', kind: 'total', totals },
  ];

  const onColumnsChange = (keys: Key[]) => {
    const next = columnDefinitions
      .map(column => column.key)
      .filter(key => keys.map(String).includes(key));
    // At least one data column stays visible.
    if (next.length > 0) setVisibleKeys(next);
  };

  return (
    <Stack space="regular">
      <Inline space="related" alignX="right" alignY="center">
        <Text variant="muted" fontSize="sm">
          {rows.length} Zeilen
        </Text>
        <Select
          aria-label="Sichtbare Spalten"
          selectionMode="multiple"
          // `items` (dynamic collection) is required for `renderValue` to
          // receive the selected objects.
          items={columnDefinitions}
          value={visibleKeys}
          onChange={onColumnsChange}
          renderValue={selected => (
            <Inline space="related" alignY="center">
              <Columns3 size={16} /> Spalten ({selected.length})
            </Inline>
          )}
          width={44}
        >
          {(column: ColumnDefinition) => (
            <Select.Option id={column.key}>{column.label}</Select.Option>
          )}
        </Select>
      </Inline>

      <Table aria-label={`Ergebnis: ${report.name}`}>
        <Table.Header columns={tableColumns}>
          {(column: ResultColumn) => (
            <Table.Column
              id={column.id}
              rowHeader={column.id === 'name'}
              alignX={column.numeric ? 'right' : undefined}
            >
              {column.label}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={bodyRows}>
          {(item: BodyRow) => (
            <Table.Row id={item.id} columns={tableColumns}>
              {(column: ResultColumn) => (
                <Table.Cell>
                  <ResultCell item={item} column={column} />
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {totalPages > 1 ? (
        <Inline alignX="center">
          <Pagination
            key={totalPages}
            page={safePage}
            totalItems={rows.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </Inline>
      ) : null}
    </Stack>
  );
};
