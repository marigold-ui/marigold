'use client';

import {
  Badge,
  Button,
  Inline,
  Stack,
  Table,
  Text,
} from '@marigold/components';
import { Eye, Share2 } from '@marigold/icons';
import type { Report } from './data';

export interface ReportsTableProps {
  items: Report[];
  isFiltered: boolean;
  onClearFilter: () => void;
}

const FilterEmptyState = ({ onClearFilter }: { onClearFilter: () => void }) => (
  <div className="grid place-items-center py-10">
    <Stack space={2} alignX="center">
      <Text fontSize="lg" weight="bold">
        Keine Reporte gefunden
      </Text>
      <Text variant="muted">
        Passen Sie Ihre Filterkriterien an, um Ergebnisse zu sehen.
      </Text>
      <Button variant="ghost" onPress={onClearFilter}>
        Filter zurücksetzen
      </Button>
    </Stack>
  </div>
);

const ReportRow = ({ report }: { report: Report }) => (
  <Table.Row id={report.id}>
    <Table.Cell>
      <Stack space={1} alignX="left">
        <Text weight="medium">{report.createdAt}</Text>
        <Badge>{report.duration}</Badge>
      </Stack>
    </Table.Cell>
    <Table.Cell>
      <Badge variant="info">{report.filter}</Badge>
    </Table.Cell>
    <Table.Cell>
      <Badge variant="success">{report.breakdown}</Badge>
    </Table.Cell>
    <Table.Cell>
      <Inline space="related" alignX="right">
        <Button variant="secondary" size="small">
          <Share2 size={16} /> Teilen
        </Button>
        <Button variant="primary" size="small">
          <Eye size={16} /> Anschauen
        </Button>
      </Inline>
    </Table.Cell>
  </Table.Row>
);

export const ReportsTable = ({
  items,
  isFiltered,
  onClearFilter,
}: ReportsTableProps) => (
  <Table aria-label="Erstellte Reporte">
    <Table.Header>
      <Table.Column id="createdAt" rowHeader>
        Erstellung
      </Table.Column>
      <Table.Column id="filter">Filter</Table.Column>
      <Table.Column id="breakdown">Aufschlüsselung</Table.Column>
      <Table.Column id="actions" alignX="right">
        Aktionen
      </Table.Column>
    </Table.Header>
    <Table.Body
      emptyState={() =>
        isFiltered ? (
          <FilterEmptyState onClearFilter={onClearFilter} />
        ) : (
          <div className="grid place-items-center py-10">
            <Text variant="muted">Noch keine Reporte erstellt.</Text>
          </div>
        )
      }
    >
      {items.map(report => (
        <ReportRow key={report.id} report={report} />
      ))}
    </Table.Body>
  </Table>
);
