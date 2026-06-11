'use client';

import { Suspense } from 'react';
import { GermanLocale } from '../../_revenue-report/GermanLocale';
import { ReportBuilderPage } from '../../_revenue-report/ReportBuilderPage';

const BASE_PATH = '/examples/revenue-report';

// Suspense boundary is required by Next.js because the builder reads the
// `?from=` query param via useSearchParams.
const NewRevenueReportPage = () => (
  <GermanLocale>
    <Suspense>
      <ReportBuilderPage basePath={BASE_PATH} />
    </Suspense>
  </GermanLocale>
);

export default NewRevenueReportPage;
