'use client';

import { Suspense } from 'react';
import { GermanLocale } from '../../_revenue-report/GermanLocale';
import { WizardBuilder } from '../WizardBuilder';

const BASE_PATH = '/examples/revenue-report-wizard';

// Suspense boundary is required by Next.js because the wizard reads the
// `?from=` query param via useSearchParams.
const NewRevenueReportWizardPage = () => (
  <GermanLocale>
    <Suspense>
      <WizardBuilder basePath={BASE_PATH} />
    </Suspense>
  </GermanLocale>
);

export default NewRevenueReportWizardPage;
