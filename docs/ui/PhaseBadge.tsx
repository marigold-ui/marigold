import { Badge } from '@/ui';
import React from 'react';
import Link from 'next/link';

export interface PhaseBadgeProps {
  phase?: string;
}

export const PhaseBadge = ({ phase }: PhaseBadgeProps) => {
  if (!['alpha', 'beta', 'new'].includes(phase ?? '')) return null;
  return (
    <div className="mb-4">
      <Link href="/getting-started/release-phases">
        <Badge size="large">{phase}</Badge>
      </Link>
    </div>
  );
};
