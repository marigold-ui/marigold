'use client';

// Umsatzreport, Variante B "Assistent": same list-first architecture as
// Variante A, but creation runs through a guided wizard (./new).
import { GermanLocale } from '../_revenue-report/GermanLocale';
import { ReportListPage } from '../_revenue-report/ReportListPage';

const BASE_PATH = '/examples/revenue-report-wizard';

const RevenueReportWizardListPage = () => (
  <GermanLocale>
    <ReportListPage
      basePath={BASE_PATH}
      title="Umsatzreport"
      description="Erstellen Sie Umsatzreporte mit dem Assistenten – Schritt für Schritt zur Auswertung."
    />
  </GermanLocale>
);

export default RevenueReportWizardListPage;
