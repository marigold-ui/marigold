'use client';

// Result-area states shared between the report detail page (variants A/B)
// and the combined single-screen variant (C): running, failed/cancelled and
// successful.
import type { ReactNode } from 'react';
import {
  Button,
  Center,
  Inline,
  Loader,
  SectionMessage,
  Stack,
  Text,
} from '@marigold/components';
import { DateFormat } from '@marigold/system';
import { ParamTags } from './ParamTags';
import { ResultTable } from './ResultTable';
import { ElapsedTime, StatusBadge } from './StatusBadge';
import type { Report } from './domain';
import { formatDuration } from './domain';
import { cancelReport } from './store';

export const RunningState = ({ report }: { report: Report }) => (
  <Stack space="regular">
    <SectionMessage variant="info">
      <SectionMessage.Title>Der Report wird berechnet</SectionMessage.Title>
      <SectionMessage.Description>
        Je nach Datenmenge kann das einige Sekunden bis Minuten dauern. Sie
        können diese Seite verlassen – wir benachrichtigen Sie, sobald der
        Report fertig ist.
      </SectionMessage.Description>
    </SectionMessage>
    <Inline space="related" alignY="center">
      <StatusBadge status={report.status} />
      <ElapsedTime since={report.createdAt} />
      <Button size="small" onPress={() => cancelReport(report.id)}>
        Abbrechen
      </Button>
    </Inline>
    <div className="py-12">
      <Center>
        {/* Numeric size: the Loader's spinner expects a pixel value, the
            "large" token is not wired up to the SVG (renders "largepx"). */}
        <Loader aria-label="Report wird berechnet" size="48" />
      </Center>
    </div>
  </Stack>
);

interface FailedStateProps {
  report: Report;
  onRetry: () => void;
  /** Optional secondary action, e.g. a link into the builder. */
  adjustAction?: ReactNode;
}

export const FailedState = ({
  report,
  onRetry,
  adjustAction,
}: FailedStateProps) => (
  <Stack space="regular">
    <SectionMessage
      variant={report.status === 'cancelled' ? 'warning' : 'error'}
    >
      <SectionMessage.Title>
        {report.status === 'cancelled'
          ? 'Die Berechnung wurde abgebrochen'
          : 'Der Report konnte nicht erstellt werden'}
      </SectionMessage.Title>
      <SectionMessage.Description>
        {report.error ??
          'Bei der Berechnung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'}
      </SectionMessage.Description>
    </SectionMessage>
    <Inline space="related">
      <Button variant="primary" onPress={onRetry}>
        Erneut erstellen
      </Button>
      {adjustAction}
    </Inline>
  </Stack>
);

export const SuccessState = ({ report }: { report: Report }) => (
  <Stack space="regular">
    <Inline space="related" alignY="center">
      <StatusBadge status={report.status} />
      <Text variant="muted" fontSize="sm">
        Erstellt am{' '}
        <DateFormat
          value={new Date(report.createdAt)}
          dateStyle="medium"
          timeStyle="short"
        />
        {report.durationMs !== undefined
          ? ` · Dauer: ${formatDuration(report.durationMs)}`
          : null}
      </Text>
    </Inline>
    <ParamTags params={report.params} />
    <ResultTable report={report} />
  </Stack>
);
