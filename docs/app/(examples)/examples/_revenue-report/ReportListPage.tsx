'use client';

// Landing page of the list-first variants: every report — finished, running,
// failed or cancelled — is a row with a live status. Creation happens on a
// separate builder page, results on a detail page.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ActionMenu,
  Button,
  ButtonGroup,
  Description,
  EmptyState,
  Inline,
  LinkButton,
  Page,
  Pagination,
  Panel,
  SearchField,
  Stack,
  Table,
  Text,
  Title,
  useToast,
} from '@marigold/components';
import { Plus } from '@marigold/icons';
import { DateFormat } from '@marigold/system';
import { ParamTags } from './ParamTags';
import { ReportNotifications } from './ReportNotifications';
import { ElapsedTime, StatusBadge } from './StatusBadge';
import type { Report } from './domain';
import { formatDuration } from './domain';
import { cancelReport, deleteReport, saveTemplate, startReport } from './store';
import { useReports, useTemplates } from './useReports';

const PAGE_SIZE = 8;

const TemplateStartMenu = ({ basePath }: { basePath: string }) => {
  const templates = useTemplates();
  const router = useRouter();

  if (templates.length === 0) return null;

  return (
    <ActionMenu
      aria-label="Report aus Vorlage erstellen"
      onAction={key => {
        const template = templates.find(t => t.id === key);
        if (!template) return;
        const id = startReport(structuredClone(template.params));
        router.push(`${basePath}/${id}`);
      }}
    >
      <ActionMenu.Section title="Aus Vorlage erstellen">
        {templates.map(template => (
          <ActionMenu.Item key={template.id} id={template.id}>
            {template.name}
          </ActionMenu.Item>
        ))}
      </ActionMenu.Section>
    </ActionMenu>
  );
};

const ReportRow = ({
  report,
  basePath,
}: {
  report: Report;
  basePath: string;
}) => {
  const router = useRouter();
  const { addToast } = useToast();
  const running = report.status === 'pending' || report.status === 'processing';

  const onMenuAction = (action: string | number) => {
    switch (action) {
      case 'duplicate':
        router.push(`${basePath}/new?from=${report.id}`);
        break;
      case 'template':
        saveTemplate(report.name, structuredClone(report.params));
        addToast({
          title: 'Vorlage gespeichert',
          description: `„${report.name}“ kann beim nächsten Report wiederverwendet werden.`,
          variant: 'success',
          timeout: 6000,
        });
        break;
      case 'delete':
        deleteReport(report.id);
        break;
    }
  };

  return (
    <Table.Row id={report.id}>
      <Table.Cell>
        <Stack space="tight" alignX="left">
          <StatusBadge status={report.status} />
          {running ? <ElapsedTime since={report.createdAt} /> : null}
        </Stack>
      </Table.Cell>
      <Table.Cell>
        <Stack space="tight">
          <Text weight="medium">{report.name}</Text>
          <ParamTags params={report.params} />
        </Stack>
      </Table.Cell>
      <Table.Cell>
        <Stack space="tight">
          <Text fontSize="sm">
            <DateFormat
              value={new Date(report.createdAt)}
              dateStyle="medium"
              timeStyle="short"
            />
          </Text>
          {report.durationMs !== undefined ? (
            <Text variant="muted" fontSize="sm">
              Dauer: {formatDuration(report.durationMs)}
            </Text>
          ) : null}
        </Stack>
      </Table.Cell>
      <Table.Cell>
        <Inline space="related" alignX="right" alignY="center" noWrap>
          {running ? (
            <Button size="small" onPress={() => cancelReport(report.id)}>
              Abbrechen
            </Button>
          ) : null}
          <LinkButton
            variant="secondary"
            size="small"
            href={`${basePath}/${report.id}`}
          >
            Anschauen
          </LinkButton>
          <ActionMenu
            size="icon"
            aria-label={`Aktionen für ${report.name}`}
            onAction={onMenuAction}
          >
            <ActionMenu.Item id="duplicate">
              Duplizieren & anpassen
            </ActionMenu.Item>
            <ActionMenu.Item id="template">
              Als Vorlage speichern
            </ActionMenu.Item>
            <ActionMenu.Item id="delete" variant="destructive">
              Löschen
            </ActionMenu.Item>
          </ActionMenu>
        </Inline>
      </Table.Cell>
    </Table.Row>
  );
};

interface ReportListPageProps {
  basePath: string;
  title: string;
  description: string;
}

export const ReportListPage = ({
  basePath,
  title,
  description,
}: ReportListPageProps) => {
  const reports = useReports();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = search
    ? reports.filter(report =>
        report.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    : reports;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return (
    <Page>
      <ReportNotifications hrefFor={report => `${basePath}/${report.id}`} />
      <Page.Header>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonGroup aria-label="Report erstellen">
          <LinkButton variant="primary" href={`${basePath}/new`}>
            <Plus size={16} /> Neuer Report
          </LinkButton>
          <TemplateStartMenu basePath={basePath} />
        </ButtonGroup>
      </Page.Header>

      <Panel aria-label="Erstellte Reporte">
        <Panel.Content>
          <SearchField
            aria-label="Reporte durchsuchen"
            description="Nach Reportname suchen"
            width={64}
            autoComplete="off"
            onSubmit={value => {
              setSearch(value);
              setPage(1);
            }}
            onClear={() => setSearch('')}
          />
        </Panel.Content>
        <Panel.Content bleed>
          <Table aria-label="Erstellte Reporte">
            <Table.Header>
              <Table.Column id="status">Status</Table.Column>
              <Table.Column id="report" rowHeader>
                Report
              </Table.Column>
              <Table.Column id="created">Erstellt</Table.Column>
              <Table.Column id="actions" alignX="right">
                Aktionen
              </Table.Column>
            </Table.Header>
            <Table.Body
              emptyState={() =>
                search ? (
                  <div className="grid place-items-center py-10">
                    <EmptyState
                      title="Keine Reporte gefunden"
                      description="Passen Sie Ihre Suche an oder erstellen Sie einen neuen Report."
                    />
                  </div>
                ) : (
                  <div className="grid place-items-center py-10">
                    <EmptyState
                      title="Noch keine Reporte erstellt"
                      description="Erstellen Sie Ihren ersten Umsatzreport – wir benachrichtigen Sie, sobald er fertig ist."
                      action={
                        <LinkButton variant="primary" href={`${basePath}/new`}>
                          <Plus size={16} /> Neuer Report
                        </LinkButton>
                      }
                    />
                  </div>
                )
              }
            >
              {paged.map(report => (
                <ReportRow
                  key={report.id}
                  report={report}
                  basePath={basePath}
                />
              ))}
            </Table.Body>
          </Table>
        </Panel.Content>
        {filtered.length > PAGE_SIZE ? (
          <Panel.Content>
            <Inline alignX="center">
              <Pagination
                key={totalPages}
                page={safePage}
                totalItems={filtered.length}
                pageSize={PAGE_SIZE}
                onChange={setPage}
              />
            </Inline>
          </Panel.Content>
        ) : null}
      </Panel>
    </Page>
  );
};
