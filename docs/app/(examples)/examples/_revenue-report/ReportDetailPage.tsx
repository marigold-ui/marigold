'use client';

// Detail page of a single report. Submitting the builder navigates here
// immediately — the page renders the calculation progress and fills in with
// the result once the (simulated) backend finishes. Users can leave at any
// time; the completion toast brings them back.
import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  ButtonGroup,
  Description,
  EmptyState,
  LinkButton,
  Page,
  Panel,
  Title,
  useToast,
} from '@marigold/components';
import { Download, Share2 } from '@marigold/icons';
import { ReportNotifications } from './ReportNotifications';
import { FailedState, RunningState, SuccessState } from './ReportStates';
import { startReport } from './store';
import { useMounted, useReport } from './useReports';

export const ReportDetailPage = ({ basePath }: { basePath: string }) => {
  const params = useParams<{ id: string }>();
  const report = useReport(params.id);
  const mounted = useMounted();
  const router = useRouter();
  const { addToast } = useToast();

  if (!report) {
    if (!mounted) return null;
    return (
      <Page>
        <div className="grid place-items-center py-20">
          <EmptyState
            title="Report nicht gefunden"
            description="Der Report existiert nicht mehr oder wurde gelöscht."
            action={
              <LinkButton variant="primary" href={basePath}>
                Zur Übersicht
              </LinkButton>
            }
          />
        </div>
      </Page>
    );
  }

  const finished = report.status === 'successful';
  const running = report.status === 'pending' || report.status === 'processing';

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

  const retry = () => {
    const id = startReport(structuredClone(report.params));
    router.push(`${basePath}/${id}`);
  };

  return (
    <Page>
      <ReportNotifications hrefFor={r => `${basePath}/${r.id}`} />
      <Page.Header>
        <Title>{report.name}</Title>
        <Description>
          Detailansicht des Reports – Parameter, Status und Ergebnis.
        </Description>
        <ButtonGroup aria-label="Report-Aktionen">
          <LinkButton
            variant="secondary"
            href={`${basePath}/new?from=${report.id}`}
          >
            Anpassen & neu erstellen
          </LinkButton>
          <Button disabled={!finished} onPress={() => onExport('PDF')}>
            <Download size={16} /> PDF
          </Button>
          <Button disabled={!finished} onPress={() => onExport('Excel')}>
            <Download size={16} /> Excel
          </Button>
          <Button disabled={!finished} onPress={onShare}>
            <Share2 size={16} /> Teilen
          </Button>
        </ButtonGroup>
      </Page.Header>

      <Panel aria-label="Ergebnis">
        <Panel.Content>
          {running ? (
            <RunningState report={report} />
          ) : report.status === 'successful' ? (
            <SuccessState report={report} />
          ) : (
            <FailedState
              report={report}
              onRetry={retry}
              adjustAction={
                <LinkButton
                  variant="ghost"
                  href={`${basePath}/new?from=${report.id}`}
                >
                  Parameter anpassen
                </LinkButton>
              }
            />
          )}
        </Panel.Content>
      </Panel>
    </Page>
  );
};
