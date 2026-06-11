'use client';

// Umsatzreport, Variante B "Assistent": creation as a guided 3-step wizard
// with a persistent summary rail. Same list/detail architecture as Variante A
// — only the builder differs. Marigold has no stepper component, so the step
// indicator is composed from primitives.
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Badge,
  Button,
  Columns,
  Description,
  Divider,
  Inline,
  LinkButton,
  Page,
  Panel,
  Split,
  Stack,
  Text,
  Title,
} from '@marigold/components';
import { Check, ChevronRight } from '@marigold/icons';
import {
  BreakdownSelect,
  DateBasisRadio,
  DateRangeFields,
  FilterEditor,
  SaveTemplateButton,
  TemplateMenu,
  TimeBreakdownSelect,
  useDraftParams,
} from '../_revenue-report/BuilderFields';
import type { ReportParams } from '../_revenue-report/domain';
import {
  activeFilterKeys,
  dateRangeLabel,
  filterLabel,
  getBreakdown,
  getTimeBreakdown,
  reportName,
} from '../_revenue-report/domain';
import { calculationTime } from '../_revenue-report/mock';
import { startReport } from '../_revenue-report/store';
import { useReport } from '../_revenue-report/useReports';

const STEPS = ['Auswertung', 'Zeitraum', 'Filter'] as const;

const StepIndicator = ({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (step: number) => void;
}) => (
  <ol className="flex flex-wrap items-center gap-2" aria-label="Schritte">
    {STEPS.map((label, index) => {
      const state =
        index === current ? 'current' : index < current ? 'done' : 'upcoming';
      return (
        <li key={label} className="flex items-center gap-2">
          {index > 0 ? <ChevronRight size={16} aria-hidden /> : null}
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 disabled:cursor-default"
            disabled={index >= current}
            onClick={() => onSelect(index)}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <Badge
              variant={
                state === 'current'
                  ? 'info'
                  : state === 'done'
                    ? 'success'
                    : undefined
              }
            >
              {state === 'done' ? <Check size={12} aria-hidden /> : index + 1}
            </Badge>
            <Text
              weight={state === 'current' ? 'semibold' : 'regular'}
              variant={state === 'upcoming' ? 'muted' : 'default'}
            >
              {label}
            </Text>
          </button>
        </li>
      );
    })}
  </ol>
);

const SummaryField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Stack space="tight">
    <Text variant="muted" fontSize="xs">
      {label}
    </Text>
    {children}
  </Stack>
);

const Summary = ({ draft }: { draft: ReportParams }) => {
  const filters = activeFilterKeys(draft);
  const estimate = Math.round(calculationTime('estimate', draft) / 1000);

  return (
    <Panel aria-label="Zusammenfassung">
      <Panel.Header>
        <Title>Zusammenfassung</Title>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <Text weight="semibold">{reportName(draft)}</Text>
          <Divider />
          <SummaryField label="Auswertung">
            <Text fontSize="sm">{getBreakdown(draft.breakdown).label}</Text>
          </SummaryField>
          <SummaryField label="Zeitverlauf">
            <Text fontSize="sm">
              {getTimeBreakdown(draft.timeBreakdown).label}
            </Text>
          </SummaryField>
          <SummaryField label="Zeitraum">
            <Text fontSize="sm">{dateRangeLabel(draft)}</Text>
          </SummaryField>
          <SummaryField label="Filter">
            {filters.length === 0 ? (
              <Text fontSize="sm" variant="muted">
                Keine Filter gesetzt
              </Text>
            ) : (
              <Inline space="0.5">
                {filters.map(key => (
                  <Badge key={key}>{filterLabel(draft, key)}</Badge>
                ))}
              </Inline>
            )}
          </SummaryField>
          <Divider />
          <SummaryField label="Geschätzte Dauer">
            <Text fontSize="sm">~{estimate} Sek.</Text>
          </SummaryField>
        </Stack>
      </Panel.Content>
    </Panel>
  );
};

const Wizard = ({
  basePath,
  initial,
}: {
  basePath: string;
  initial?: ReportParams;
}) => {
  const { draft, update, setDraft } = useDraftParams(initial);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const run = () => {
    const id = startReport(structuredClone(draft));
    router.push(`${basePath}/${id}`);
  };

  return (
    <Page>
      <Page.Header>
        <Title>Neuer Umsatzreport</Title>
        <Description>
          Der Assistent führt Sie in drei Schritten zum Report.
        </Description>
        <TemplateMenu
          onApply={params => {
            setDraft(params);
            setStep(2);
          }}
        />
      </Page.Header>

      <StepIndicator current={step} onSelect={setStep} />

      <Columns columns={[2, 1]} space="group" collapseAt="60rem">
        <Panel aria-label={`Schritt ${step + 1}: ${STEPS[step]}`}>
          <Panel.Header>
            <Title>{STEPS[step]}</Title>
          </Panel.Header>
          <Panel.Content>
            {step === 0 ? (
              <Stack space="regular">
                <Text>Was möchten Sie auswerten?</Text>
                <BreakdownSelect
                  value={draft.breakdown}
                  onChange={breakdown => update({ breakdown })}
                />
                <TimeBreakdownSelect
                  value={draft.timeBreakdown}
                  onChange={timeBreakdown => update({ timeBreakdown })}
                />
              </Stack>
            ) : step === 1 ? (
              <Stack space="regular">
                <Text>Welcher Zeitraum soll betrachtet werden?</Text>
                <DateBasisRadio params={draft} onChange={update} />
                <DateRangeFields params={draft} onChange={update} />
              </Stack>
            ) : (
              <Stack space="regular">
                <Text>
                  Optional: Grenzen Sie den Report mit Filtern weiter ein.
                </Text>
                <FilterEditor
                  filters={draft.filters}
                  onChange={filters => update({ filters })}
                />
              </Stack>
            )}
          </Panel.Content>
          <Panel.Footer>
            <Inline space="related" alignY="center">
              {step > 0 ? (
                <Button variant="ghost" onPress={() => setStep(step - 1)}>
                  Zurück
                </Button>
              ) : (
                <LinkButton variant="ghost" href={basePath}>
                  Abbrechen
                </LinkButton>
              )}
              <Split />
              {step === 2 ? <SaveTemplateButton params={draft} /> : null}
              {step < STEPS.length - 1 ? (
                <Button variant="primary" onPress={() => setStep(step + 1)}>
                  Weiter
                </Button>
              ) : (
                <Button variant="primary" onPress={run}>
                  Report erstellen
                </Button>
              )}
            </Inline>
          </Panel.Footer>
        </Panel>

        <Summary draft={draft} />
      </Columns>
    </Page>
  );
};

export const WizardBuilder = ({ basePath }: { basePath: string }) => {
  const search = useSearchParams();
  const from = search.get('from');
  const source = useReport(from ?? '');

  return (
    <Wizard
      key={source?.id ?? 'blank'}
      basePath={basePath}
      initial={source?.params}
    />
  );
};
