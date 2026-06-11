'use client';

import { useEffect, useState } from 'react';
import { Badge, Text } from '@marigold/components';
import type { ReportStatus } from './domain';

const statusConfig: Record<
  ReportStatus,
  { label: string; variant: 'info' | 'success' | 'error' | 'warning' }
> = {
  pending: { label: 'In Warteschlange', variant: 'info' },
  processing: { label: 'Wird berechnet…', variant: 'info' },
  successful: { label: 'Fertig', variant: 'success' },
  failed: { label: 'Fehlgeschlagen', variant: 'error' },
  cancelled: { label: 'Abgebrochen', variant: 'warning' },
};

export const StatusBadge = ({ status }: { status: ReportStatus }) => {
  const { label, variant } = statusConfig[status];
  return <Badge variant={variant}>{label}</Badge>;
};

/**
 * Live elapsed time for a running calculation, e.g. "12 Sek.". Communicates
 * progress for long-running reports (1s to several minutes in the real app).
 */
export const ElapsedTime = ({ since }: { since: string }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = Math.max(
    0,
    Math.round((now - new Date(since).getTime()) / 1000)
  );
  const label =
    seconds < 60
      ? `${seconds} Sek.`
      : `${Math.floor(seconds / 60)} Min. ${seconds % 60} Sek.`;

  return (
    <Text variant="muted" fontSize="sm">
      {label}
    </Text>
  );
};
