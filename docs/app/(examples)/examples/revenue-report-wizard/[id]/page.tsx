'use client';

import { GermanLocale } from '../../_revenue-report/GermanLocale';
import { ReportDetailPage } from '../../_revenue-report/ReportDetailPage';

const BASE_PATH = '/examples/revenue-report-wizard';

const RevenueReportWizardDetailPage = () => (
  <GermanLocale>
    <ReportDetailPage basePath={BASE_PATH} />
  </GermanLocale>
);

export default RevenueReportWizardDetailPage;
