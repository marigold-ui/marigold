'use client';

// Builder of the list-first variant: a single structured form that reads
// top-to-bottom as a sentence — what to evaluate (Auswertung), for which
// period (Zeitraum), narrowed down how (Filter). Submitting navigates
// straight to the report detail page, which fills in asynchronously.
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Button,
  ButtonGroup,
  Description,
  Inline,
  LinkButton,
  Page,
  Panel,
  SectionMessage,
  Stack,
  Text,
  Title,
} from '@marigold/components';
import {
  BreakdownSelect,
  DateBasisRadio,
  DateRangeFields,
  FilterEditor,
  SaveTemplateButton,
  TemplateMenu,
  TimeBreakdownSelect,
  useDraftParams,
} from './BuilderFields';
import type { ReportParams } from './domain';
import { calculationTime } from './mock';
import { startReport } from './store';
import { useReport } from './useReports';

const BuilderForm = ({
  basePath,
  initial,
  sourceName,
}: {
  basePath: string;
  initial?: ReportParams;
  sourceName?: string;
}) => {
  const { draft, update, setDraft } = useDraftParams(initial);
  const router = useRouter();

  const run = () => {
    const id = startReport(structuredClone(draft));
    router.push(`${basePath}/${id}`);
  };

  const estimate = Math.round(calculationTime('estimate', draft) / 1000);

  return (
    <Page>
      <Page.Header>
        <Title>Neuer Umsatzreport</Title>
        <Description>
          Wählen Sie Auswertung, Zeitraum und optionale Filter – die Berechnung
          startet anschließend im Hintergrund.
        </Description>
        <ButtonGroup aria-label="Vorlagen">
          <TemplateMenu onApply={setDraft} />
        </ButtonGroup>
      </Page.Header>

      {sourceName ? (
        <SectionMessage variant="info">
          <SectionMessage.Title>Parameter übernommen</SectionMessage.Title>
          <SectionMessage.Description>
            Die Einstellungen von „{sourceName}“ wurden übernommen. Passen Sie
            sie an und erstellen Sie einen neuen Report.
          </SectionMessage.Description>
        </SectionMessage>
      ) : null}

      <Panel size="form" aria-label="Auswertung">
        <Panel.Header>
          <Title>Auswertung</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <BreakdownSelect
              value={draft.breakdown}
              onChange={breakdown => update({ breakdown })}
            />
            <TimeBreakdownSelect
              value={draft.timeBreakdown}
              onChange={timeBreakdown => update({ timeBreakdown })}
            />
          </Stack>
        </Panel.Content>
      </Panel>

      <Panel size="form" aria-label="Zeitraum">
        <Panel.Header>
          <Title>Zeitraum</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <DateBasisRadio params={draft} onChange={update} />
            <DateRangeFields params={draft} onChange={update} />
          </Stack>
        </Panel.Content>
      </Panel>

      <Panel size="form" aria-label="Filter">
        <Panel.Header>
          <Title>Filter (optional)</Title>
        </Panel.Header>
        <Panel.Content>
          <FilterEditor
            filters={draft.filters}
            onChange={filters => update({ filters })}
          />
        </Panel.Content>
      </Panel>

      <Inline space="related" alignY="center">
        <Button variant="primary" onPress={run}>
          Report erstellen
        </Button>
        <Text variant="muted" fontSize="sm">
          Geschätzte Dauer: ~{estimate} Sek.
        </Text>
        <SaveTemplateButton params={draft} />
        <LinkButton variant="ghost" href={basePath}>
          Abbrechen
        </LinkButton>
      </Inline>
    </Page>
  );
};

/**
 * Reads the optional `?from=<reportId>` query param ("Duplizieren & anpassen")
 * and prefills the form with that report's parameters.
 */
export const ReportBuilderPage = ({ basePath }: { basePath: string }) => {
  const search = useSearchParams();
  const from = search.get('from');
  const source = useReport(from ?? '');

  return (
    <BuilderForm
      // Remount when the source resolves so the prefilled values apply.
      key={source?.id ?? 'blank'}
      basePath={basePath}
      initial={source?.params}
      sourceName={source?.name}
    />
  );
};
