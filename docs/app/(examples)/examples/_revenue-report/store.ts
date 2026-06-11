// Module-level store for the Umsatzreport prototype. Lives outside React so
// simulated report calculations keep running while the user navigates between
// pages — exactly the async behavior the redesign demonstrates. State is
// shared across all three prototype variants and persisted to sessionStorage.
import type { Report, ReportParams, Template } from './domain';
import { reportName } from './domain';
import { calculationTime, generateRows, willFail } from './mock';

export interface StoreState {
  reports: Report[];
  templates: Template[];
}

// Seed data
// ---------------

// Fixed timestamp so seed rows are identical on server and client (SSR).
const SEED_NOW = new Date('2026-06-10T12:00:00');

const seedReport = (
  id: string,
  createdAt: string,
  durationMs: number,
  params: ReportParams
): Report => ({
  id,
  name: reportName(params),
  params,
  status: 'successful',
  createdAt,
  durationMs,
  rows: generateRows(id, params, SEED_NOW),
});

const seedState: StoreState = {
  reports: [
    seedReport('rpt-seed-1', '2026-06-10T08:55:22', 800, {
      breakdown: 'SUMMED_UP',
      timeBreakdown: 'DAYS',
      dateBasis: 'orderDate',
      datePreset: 'last14',
      filters: {},
    }),
    seedReport('rpt-seed-2', '2026-06-09T16:31:04', 4200, {
      breakdown: 'EVENT_GROUP',
      timeBreakdown: 'NONE',
      dateBasis: 'orderDate',
      datePreset: 'thisMonth',
      filters: { genre: ['rock-pop', 'jazz'] },
    }),
    seedReport('rpt-seed-3', '2026-06-08T11:24:47', 12_400, {
      breakdown: 'SINGLE_EVENT',
      timeBreakdown: 'NONE',
      dateBasis: 'eventDate',
      datePreset: 'thisYear',
      filters: { eventGroup: ['konzerte-2026'] },
    }),
    {
      id: 'rpt-seed-4',
      name: 'Umsatz nach PLZ-Region',
      params: {
        breakdown: 'ZIPCODE',
        timeBreakdown: 'NONE',
        dateBasis: 'orderDate',
        datePreset: 'thisYear',
        filters: {},
      },
      status: 'failed',
      createdAt: '2026-06-05T09:12:33',
      durationMs: 25_000,
      error:
        'Zeitlimit überschritten. Bitte grenzen Sie den Zeitraum oder die Filter weiter ein.',
    },
    seedReport('rpt-seed-5', '2026-05-28T14:02:10', 9100, {
      breakdown: 'PAYMENT_METHOD',
      timeBreakdown: 'MONTHS',
      dateBasis: 'paymentDate',
      datePreset: 'thisYear',
      filters: { venue: ['stadthalle'] },
    }),
  ],
  templates: [
    {
      id: 'tpl-seed-1',
      name: 'Monatsabschluss Konzerte',
      params: {
        breakdown: 'EVENT_GROUP',
        timeBreakdown: 'NONE',
        dateBasis: 'orderDate',
        datePreset: 'lastMonth',
        filters: { eventGroup: ['konzerte-2026'] },
      },
    },
    {
      id: 'tpl-seed-2',
      name: 'Webshop-Umsatz wöchentlich',
      params: {
        breakdown: 'SUMMED_UP',
        timeBreakdown: 'WEEKS',
        dateBasis: 'orderDate',
        datePreset: 'last30',
        filters: { branchType: ['webshop'] },
      },
    },
  ],
};

// Store
// ---------------

const STORAGE_KEY = 'umsatzreport-prototype';

let state: StoreState = seedState;
let hydrated = false;

const listeners = new Set<() => void>();
const finishedListeners = new Set<(report: Report) => void>();
const timers = new Map<string, ReturnType<typeof setTimeout>[]>();

const persist = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private mode, quota); the prototype
    // degrades to in-memory state.
  }
};

const setState = (next: Partial<StoreState>) => {
  state = { ...state, ...next };
  if (typeof window !== 'undefined') persist();
  listeners.forEach(listener => listener());
};

const updateReport = (id: string, patch: Partial<Report>) =>
  setState({
    reports: state.reports.map(report =>
      report.id === id ? { ...report, ...patch } : report
    ),
  });

const clearTimers = (id: string) => {
  timers.get(id)?.forEach(clearTimeout);
  timers.delete(id);
};

const finishReport = (id: string, startedAt: number) => {
  const report = state.reports.find(r => r.id === id);
  if (
    !report ||
    (report.status !== 'processing' && report.status !== 'pending')
  )
    return;

  clearTimers(id);
  const durationMs = Date.now() - startedAt;

  if (willFail(id)) {
    updateReport(id, {
      status: 'failed',
      durationMs,
      error:
        'Bei der Berechnung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    });
  } else {
    updateReport(id, {
      status: 'successful',
      durationMs,
      rows: generateRows(id, report.params, new Date()),
    });
  }

  const finished = state.reports.find(r => r.id === id);
  if (finished) finishedListeners.forEach(listener => listener(finished));
};

const scheduleCalculation = (id: string, totalMs: number) => {
  const startedAt = Date.now();
  const handles = [
    setTimeout(
      () => updateReport(id, { status: 'processing' }),
      Math.min(900, totalMs * 0.25)
    ),
    setTimeout(() => finishReport(id, startedAt), totalMs),
  ];
  timers.set(id, handles);
};

const hydrate = () => {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const stored = JSON.parse(raw) as StoreState;
    state = stored;
    listeners.forEach(listener => listener());

    // Reports that were still calculating when the page reloaded resume
    // and finish shortly after.
    stored.reports
      .filter(r => r.status === 'pending' || r.status === 'processing')
      .forEach(r => scheduleCalculation(r.id, 2000 + Math.random() * 2000));
  } catch {
    // Corrupted storage: fall back to seed data.
  }
};

// React 18/19 external store interface
// ---------------

export const subscribe = (listener: () => void) => {
  hydrate();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getSnapshot = () => state;
export const getServerSnapshot = () => seedState;

/** Notify when a report calculation finishes (successful or failed). */
export const onReportFinished = (listener: (report: Report) => void) => {
  finishedListeners.add(listener);
  return () => {
    finishedListeners.delete(listener);
  };
};

// Actions
// ---------------

let reportCounter = 0;

export const startReport = (params: ReportParams) => {
  reportCounter += 1;
  const id = `rpt-${Date.now().toString(36)}-${reportCounter}`;
  const report: Report = {
    id,
    name: reportName(params),
    params,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  setState({ reports: [report, ...state.reports] });
  scheduleCalculation(id, calculationTime(id, params));
  return id;
};

export const cancelReport = (id: string) => {
  clearTimers(id);
  updateReport(id, { status: 'cancelled', error: 'Abgebrochen' });
};

export const deleteReport = (id: string) => {
  clearTimers(id);
  setState({ reports: state.reports.filter(report => report.id !== id) });
};

let templateCounter = 0;

export const saveTemplate = (name: string, params: ReportParams) => {
  templateCounter += 1;
  const template: Template = {
    id: `tpl-${Date.now().toString(36)}-${templateCounter}`,
    name,
    params,
  };
  setState({ templates: [...state.templates, template] });
  return template.id;
};

export const deleteTemplate = (id: string) =>
  setState({
    templates: state.templates.filter(template => template.id !== id),
  });
