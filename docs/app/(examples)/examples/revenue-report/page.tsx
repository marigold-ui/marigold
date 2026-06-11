'use client';

import { useState } from 'react';
import {
  Badge,
  Description,
  EmptyState,
  Inline,
  Page,
  Panel,
  Stack,
  Tabs,
  Title,
} from '@marigold/components';
import {
  ReportFilter,
  type ReportFilterValue,
  emptyFilter,
} from './ReportFilter';
import { ReportsPagination } from './ReportsPagination';
import { ReportsTable } from './ReportsTable';
import { reports } from './data';

const isFiltered = (filter: ReportFilterValue) =>
  filter.profile !== null || filter.automatedReport !== null;

const CreatedReports = () => {
  const [filter, setFilter] = useState<ReportFilterValue>(emptyFilter);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const applyFilter = (next: ReportFilterValue) => {
    setFilter(next);
    setPage(1);
  };

  const filtered = reports.filter(
    report =>
      (filter.profile === null || report.profile === filter.profile) &&
      (filter.automatedReport === null ||
        report.automatedReport === filter.automatedReport)
  );
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Stack space="regular">
      <ReportFilter
        onSearch={applyFilter}
        onReset={() => applyFilter(emptyFilter)}
      />
      <Panel aria-label="Erstellte Reporte">
        <Panel.Content bleed>
          <ReportsTable
            items={items}
            isFiltered={isFiltered(filter)}
            onClearFilter={() => applyFilter(emptyFilter)}
          />
        </Panel.Content>
        <Panel.Content>
          <ReportsPagination
            page={page}
            pageSize={pageSize}
            totalItems={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={size => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </Panel.Content>
      </Panel>
    </Stack>
  );
};

const RevenueReportPage = () => (
  <Page>
    <Page.Header>
      <Title>
        <Inline space="related" alignY="center">
          Umsatzreport
          <Badge variant="primary">
            Beta Version &amp; Keine Reservierungsdaten
          </Badge>
        </Inline>
      </Title>
      <Description>
        Erstellen Sie Umsatzreporte für Ihre Veranstaltungen und greifen Sie auf
        bereits erstellte Reporte zu.
      </Description>
    </Page.Header>
    <Tabs defaultSelectedKey="created">
      <Tabs.List aria-label="Umsatzreport Bereiche">
        <Tabs.Item id="analysis">Reporterstellung &amp; Analyse</Tabs.Item>
        <Tabs.Item id="created">Erstellte Reporte</Tabs.Item>
      </Tabs.List>
      <Tabs.TabPanel id="analysis">
        <Panel aria-label="Reporterstellung & Analyse">
          <Panel.Content>
            <EmptyState
              title="Noch kein Report konfiguriert"
              description="Stellen Sie hier einen neuen Umsatzreport zusammen und analysieren Sie Ihre Verkaufszahlen."
            />
          </Panel.Content>
        </Panel>
      </Tabs.TabPanel>
      <Tabs.TabPanel id="created">
        <CreatedReports />
      </Tabs.TabPanel>
    </Tabs>
  </Page>
);

export default RevenueReportPage;
