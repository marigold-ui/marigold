'use client';

// Umsatzreport, Variante A "Liste": list-first flow. The landing page is the
// report history with live statuses; creation and results live on their own
// pages (./new and ./[id]).
import { GermanLocale } from '../_revenue-report/GermanLocale';
import { ReportListPage } from '../_revenue-report/ReportListPage';

const BASE_PATH = '/examples/revenue-report';

const RevenueReportPage = () => (
  <GermanLocale>
    <ReportListPage
      basePath={BASE_PATH}
      title="Umsatzreport"
      description="Erstellen Sie Umsatzreporte und greifen Sie auf bereits erstellte Auswertungen zu."
    />
  </GermanLocale>
);

export default RevenueReportPage;
