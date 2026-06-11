'use client';

import { Badge, Inline } from '@marigold/components';
import type { ReportParams } from './domain';
import { activeFilterKeys, dateRangeLabel, filterLabel } from './domain';

/**
 * Compact read-only summary of a report's parameters: the date range plus all
 * active filters. Used in list rows and on the report detail page.
 */
export const ParamTags = ({ params }: { params: ReportParams }) => (
  <Inline space="0.5">
    <Badge>{dateRangeLabel(params)}</Badge>
    {activeFilterKeys(params).map(key => (
      <Badge key={key}>{filterLabel(params, key)}</Badge>
    ))}
  </Inline>
);
