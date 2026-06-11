'use client';

// Umsatzreport, Variante C "Kombiniert": builder and result on one screen,
// like the original product — but refined. The breakdown sits on top (it is
// the most important decision), filters live in a drawer with applied-filter
// tags, and the result area shows live calculation progress. The history is
// reachable through a dropdown in the result toolbar.
import { useQueryState } from 'nuqs';
import {
  Button,
  ButtonGroup,
  Columns,
  Description,
  Drawer,
  EmptyState,
  Inline,
  Page,
  Panel,
  Select,
  Split,
  Stack,
  Tag,
  Text,
  TextValue,
  Title,
  useToast,
} from '@marigold/components';
import { Download, ListFilter, Share2 } from '@marigold/icons';
import { DateFormat } from '@marigold/system';
import {
  BreakdownSelect,
  DateRangeFields,
  FilterEditor,
  SaveTemplateButton,
  TemplateMenu,
  TimeBreakdownSelect,
  useDraftParams,
} from '../_revenue-report/BuilderFields';
import { GermanLocale } from '../_revenue-report/GermanLocale';
import { ReportNotifications } from '../_revenue-report/ReportNotifications';
import {
  FailedState,
  RunningState,
  SuccessState,
} from '../_revenue-report/ReportStates';
import { StatusBadge } from '../_revenue-report/StatusBadge';
import type {
  DateBasisKey,
  FilterKey,
  Report,
  ReportParams,
} from '../_revenue-report/domain';
import {
  activeFilterKeys,
  dateBasisOptions,
  filterLabel,
} from '../_revenue-report/domain';
import { calculationTime } from '../_revenue-report/mock';
import { startReport } from '../_revenue-report/store';
import { useMounted, useReports } from '../_revenue-report/useReports';

const BASE_PATH = '/examples/revenue-report-classic';
const RESULT_REGION_ID = 'report-result-region';

const scrollToResult = () => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  document.getElementById(RESULT_REGION_ID)?.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
};

const DateBasisSelect = ({
  value,
  onChange,
}: {
  value: DateBasisKey;
  onChange: (value: DateBasisKey) => void;
}) => (
  <Select
    label="Datumsbezug"
    value={value}
    onChange={key => onChange(key as DateBasisKey)}
    width="full"
  >
    {dateBasisOptions.map(option => (
      <Select.Option key={option.key} id={option.key} textValue={option.label}>
        <TextValue>{option.label}</TextValue>
        <Description>{option.description}</Description>
      </Select.Option>
    ))}
  </Select>
);

const FilterDrawer = ({
  draft,
  onChange,
}: {
  draft: ReportParams;
  onChange: (filters: ReportParams['filters']) => void;
}) => {
  const count = activeFilterKeys(draft).length;

  return (
    <Drawer.Trigger>
      <Button>
        <ListFilter size={16} /> Filter{count > 0 ? ` (${count})` : ''}
      </Button>
      <Drawer closeButton>
        <Drawer.Title>Filter</Drawer.Title>
        <Drawer.Content>
          <FilterEditor filters={draft.filters} onChange={onChange} />
        </Drawer.Content>
        <Drawer.Actions>
          <Button variant="primary" slot="close">
            Fertig
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
};

const AppliedFilterTags = ({
  draft,
  onChange,
}: {
  draft: ReportParams;
  onChange: (filters: ReportParams['filters']) => void;
}) => {
  const keys = activeFilterKeys(draft);

  const remove = (removed: Set<FilterKey>) => {
    const next = { ...draft.filters };
    removed.forEach(key => delete next[key]);
    onChange(next);
  };

  return (
    <Tag.Group
      label="Aktive Filter"
      onRemove={removedKeys => remove(removedKeys as Set<FilterKey>)}
      removeAll
      emptyState={() => (
        <Text variant="muted" fontSize="sm" fontStyle="italic">
          Keine Filter gesetzt
        </Text>
      )}
    >
      {keys.map(key => (
        <Tag id={key} key={key}>
          {filterLabel(draft, key)}
        </Tag>
      ))}
    </Tag.Group>
  );
};

const HistorySelect = ({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) => {
  const reports = useReports();

  if (reports.length === 0) return null;

  return (
    <Select
      aria-label="Erstellte Reporte"
      placeholder="Erstellte Reporte"
      // Items-based collection + renderValue: rendering the trigger from
      // the item object avoids react-aria re-parenting the option children
      // into the trigger, which trips React's missing-key warning.
      items={reports}
      value={selectedId}
      onChange={key => {
        if (key) onSelect(String(key));
      }}
      renderValue={selected => selected[0]?.name}
      width={96}
    >
      {(report: Report) => (
        <Select.Option id={report.id} textValue={report.name}>
          <TextValue>{report.name}</TextValue>
          <Description>
            <DateFormat
              value={new Date(report.createdAt)}
              dateStyle="medium"
              timeStyle="short"
            />
          </Description>
        </Select.Option>
      )}
    </Select>
  );
};

const ClassicReport = () => {
  const { draft, update, setDraft } = useDraftParams();
  const [selectedId, setSelectedId] = useQueryState('report');
  const reports = useReports();
  const mounted = useMounted();
  const { addToast } = useToast();

  const selected = reports.find(report => report.id === selectedId);
  // A deeplinked report may only exist in sessionStorage, which hydrates
  // after mount — don't flash the empty state until then.
  const waitingForHydration = Boolean(selectedId) && !selected && !mounted;
  const finished = selected?.status === 'successful';
  const estimate = Math.round(calculationTime('estimate', draft) / 1000);

  const run = () => {
    const id = startReport(structuredClone(draft));
    setSelectedId(id);
    scrollToResult();
  };

  const onShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Link kopiert',
      description:
        'Der Link zu diesem Report wurde in die Zwischenablage kopiert.',
      variant: 'success',
      timeout: 6000,
    });
  };

  const onExport = (format: string) =>
    addToast({
      title: `${format}-Export gestartet`,
      description: 'Der Download startet in Kürze. (Im Prototyp ohne Funktion)',
      variant: 'info',
      timeout: 6000,
    });

  return (
    <Page>
      <ReportNotifications
        hrefFor={report => `${BASE_PATH}?report=${report.id}`}
      />
      <Page.Header>
        <Title>Umsatzreport</Title>
        <Description>
          Stellen Sie Ihre Auswertung zusammen und sehen Sie das Ergebnis direkt
          darunter.
        </Description>
        <ButtonGroup aria-label="Vorlagen">
          <TemplateMenu onApply={setDraft} />
        </ButtonGroup>
      </Page.Header>

      <Panel aria-label="Report erstellen">
        <Panel.Header>
          <Title>Report erstellen</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Columns columns={[1, 1]} space="related" collapseAt="50rem">
              <BreakdownSelect
                value={draft.breakdown}
                onChange={breakdown => update({ breakdown })}
              />
              <TimeBreakdownSelect
                value={draft.timeBreakdown}
                onChange={timeBreakdown => update({ timeBreakdown })}
              />
            </Columns>
            <Columns columns={[1, 1]} space="related" collapseAt="50rem">
              <DateBasisSelect
                value={draft.dateBasis}
                onChange={dateBasis => update({ dateBasis })}
              />
              <DateRangeFields params={draft} onChange={update} />
            </Columns>
            <Inline space="related" alignY="center">
              <FilterDrawer
                draft={draft}
                onChange={filters => update({ filters })}
              />
              <AppliedFilterTags
                draft={draft}
                onChange={filters => update({ filters })}
              />
            </Inline>
          </Stack>
        </Panel.Content>
        <Panel.Footer>
          <Inline space="related" alignY="center">
            <Button variant="primary" onPress={run}>
              Report anzeigen
            </Button>
            <Text variant="muted" fontSize="sm">
              Geschätzte Dauer: ~{estimate} Sek.
            </Text>
            <Split />
            <SaveTemplateButton params={draft} />
          </Inline>
        </Panel.Footer>
      </Panel>

      <Panel aria-label="Ergebnis">
        <Panel.Header>
          <Title>Ergebnis</Title>
        </Panel.Header>
        <Panel.Content>
          <div id={RESULT_REGION_ID} className="scroll-mt-4">
            <Stack space="regular">
              <Inline space="related" alignY="center">
                <HistorySelect
                  // Only pass the id once the report exists in the collection
                  // (a deeplinked id is unknown until the store hydrates).
                  selectedId={selected ? selectedId : null}
                  onSelect={setSelectedId}
                />
                {selected ? <StatusBadge status={selected.status} /> : null}
                <Split />
                <Button
                  size="small"
                  disabled={!finished}
                  onPress={() => onExport('PDF')}
                >
                  <Download size={16} /> PDF
                </Button>
                <Button
                  size="small"
                  disabled={!finished}
                  onPress={() => onExport('Excel')}
                >
                  <Download size={16} /> Excel
                </Button>
                <Button size="small" disabled={!finished} onPress={onShare}>
                  <Share2 size={16} /> Teilen
                </Button>
              </Inline>

              {waitingForHydration ? null : !selected ? (
                <div className="grid place-items-center py-12">
                  <EmptyState
                    title="Noch kein Report ausgewählt oder erstellt"
                    description="Stellen Sie oben Ihre Auswertung zusammen und klicken Sie auf „Report anzeigen“ – oder wählen Sie einen bereits erstellten Report aus."
                  />
                </div>
              ) : selected.status === 'pending' ||
                selected.status === 'processing' ? (
                <RunningState report={selected} />
              ) : selected.status === 'successful' ? (
                <SuccessState report={selected} />
              ) : (
                <FailedState
                  report={selected}
                  onRetry={() => {
                    const id = startReport(structuredClone(selected.params));
                    setSelectedId(id);
                  }}
                  adjustAction={
                    <Button
                      variant="ghost"
                      onPress={() => setDraft(structuredClone(selected.params))}
                    >
                      Parameter übernehmen
                    </Button>
                  }
                />
              )}
            </Stack>
          </div>
        </Panel.Content>
      </Panel>
    </Page>
  );
};

const RevenueReportClassicPage = () => (
  <GermanLocale>
    <ClassicReport />
  </GermanLocale>
);

export default RevenueReportClassicPage;
