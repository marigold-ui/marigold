'use client';

import { useEffect } from 'react';
import { LinkButton, useToast } from '@marigold/components';
import type { Report } from './domain';
import { onReportFinished } from './store';

interface ReportNotificationsProps {
  /** Builds the link target for a finished report ("Anzeigen" action). */
  hrefFor: (report: Report) => string;
}

/**
 * Global completion feedback: shows a toast when a report calculation
 * finishes, no matter where the user currently is. This replaces the
 * easy-to-miss status chip of the original app.
 */
export const ReportNotifications = ({ hrefFor }: ReportNotificationsProps) => {
  const { addToast } = useToast();

  useEffect(
    () =>
      onReportFinished(report => {
        if (report.status === 'successful') {
          addToast({
            title: 'Report fertig',
            description: `„${report.name}“ wurde erstellt.`,
            variant: 'success',
            timeout: 8000,
            action: (
              <LinkButton variant="ghost" size="small" href={hrefFor(report)}>
                Anzeigen
              </LinkButton>
            ),
          });
        } else {
          addToast({
            title: 'Report fehlgeschlagen',
            description:
              report.error ?? `„${report.name}“ konnte nicht erstellt werden.`,
            variant: 'error',
            timeout: 8000,
          });
        }
      }),
    [addToast, hrefFor]
  );

  return null;
};
