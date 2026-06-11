export interface Report {
  id: string;
  createdAt: string;
  duration: string;
  filter: 'Veranstaltung' | 'Bestelldatum';
  breakdown: 'Einzeltermine' | 'Aufsummiert' | 'Veranstaltungsgruppe';
  profile: string;
  automatedReport: string | null;
}

export const profiles = [
  'Standardprofil',
  'Monatsabschluss',
  'Wochenübersicht',
] as const;

export const automatedReports = [
  'Wöchentlicher Umsatz',
  'Monatlicher Abschluss',
] as const;

export const reports: Report[] = [
  {
    id: 'rep-7',
    createdAt: '13.05.2026 08:55:22',
    duration: '< 1 Sek.',
    filter: 'Veranstaltung',
    breakdown: 'Einzeltermine',
    profile: 'Standardprofil',
    automatedReport: null,
  },
  {
    id: 'rep-6',
    createdAt: '13.05.2026 08:54:53',
    duration: '< 1 Sek.',
    filter: 'Veranstaltung',
    breakdown: 'Aufsummiert',
    profile: 'Standardprofil',
    automatedReport: 'Wöchentlicher Umsatz',
  },
  {
    id: 'rep-5',
    createdAt: '11.05.2026 10:25:50',
    duration: '< 1 Sek.',
    filter: 'Veranstaltung',
    breakdown: 'Einzeltermine',
    profile: 'Wochenübersicht',
    automatedReport: 'Wöchentlicher Umsatz',
  },
  {
    id: 'rep-4',
    createdAt: '11.05.2026 10:24:41',
    duration: '1 Sek.',
    filter: 'Veranstaltung',
    breakdown: 'Aufsummiert',
    profile: 'Wochenübersicht',
    automatedReport: null,
  },
  {
    id: 'rep-3',
    createdAt: '24.10.2025 11:49:41',
    duration: '< 1 Sek.',
    filter: 'Bestelldatum',
    breakdown: 'Veranstaltungsgruppe',
    profile: 'Monatsabschluss',
    automatedReport: 'Monatlicher Abschluss',
  },
  {
    id: 'rep-2',
    createdAt: '30.09.2025 09:12:08',
    duration: '2 Sek.',
    filter: 'Bestelldatum',
    breakdown: 'Aufsummiert',
    profile: 'Monatsabschluss',
    automatedReport: 'Monatlicher Abschluss',
  },
  {
    id: 'rep-1',
    createdAt: '01.09.2025 07:30:15',
    duration: '< 1 Sek.',
    filter: 'Veranstaltung',
    breakdown: 'Einzeltermine',
    profile: 'Standardprofil',
    automatedReport: null,
  },
];
