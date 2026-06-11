// Deterministic mock result generation for the Umsatzreport prototype.
// Rows are derived from a seeded RNG so the same report always produces the
// same numbers (important for sessionStorage rehydration and SSR safety).
import type {
  BreakdownKey,
  ColumnKey,
  ReportParams,
  ReportRow,
} from './domain';

// Seeded RNG (mulberry32 over a string hash)
// ---------------

const hashString = (input: string) => {
  let hash = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i += 1) {
    hash = Math.imul(hash ^ input.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number) => {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const createRng = (seed: string) => mulberry32(hashString(seed));

// Row name pools per breakdown
// ---------------

const namePools: Record<Exclude<BreakdownKey, 'SUMMED_UP'>, string[]> = {
  SINGLE_EVENT: [
    'Sommernachtskonzert · 21.06.2026',
    'Jazz im Park · 28.06.2026',
    'Die Zauberflöte · 03.07.2026',
    'Comedy Night Spezial · 05.07.2026',
    'Rock am Fluss · 11.07.2026',
    'Kindertheater: Der kleine Drache · 12.07.2026',
    'Open-Air Kino · 18.07.2026',
    'Silvesterkonzert · 31.12.2026',
  ],
  EVENT_GROUP: [
    'Konzerte 2026',
    'Theater Saison 25/26',
    'Festivals',
    'Comedy & Kabarett',
    'Familienprogramm',
    'Klassik-Reihe',
  ],
  LOCATION: [
    'Stadthalle Freiburg',
    'Konzerthaus',
    'Kulturzentrum E-Werk',
    'Theater im Hof',
    'Open-Air-Gelände Rheinwiese',
  ],
  GENRE: [
    'Rock & Pop',
    'Klassik',
    'Jazz',
    'Comedy',
    'Theater',
    'Familie & Kinder',
  ],
  DIST_CHANNELS: ['Intern', 'Extern'],
  SALES_OFFICE: [
    'Tourist-Information Freiburg',
    'Ticketshop Innenstadt',
    'Reservix Webshop',
    'Buchhandlung am Markt',
    'Kulturbüro',
  ],
  BRANCH_TYPE: ['Filiale', 'Webshop', 'Kasse'],
  PRICE_CAT: [
    'Kategorie 1',
    'Kategorie 2',
    'Kategorie 3',
    'Ermäßigt',
    'Rollstuhlplatz',
  ],
  PRICE_LEVEL: ['Normalpreis', 'Frühbucher', 'Mitglieder', 'Last Minute'],
  PAYMENT_METHOD: [
    'PayPal',
    'Kreditkarte',
    'Lastschrift',
    'Rechnung',
    'EC-Karte',
    'Barzahlung',
  ],
  ZIPCODE: [
    'PLZ 79xxx (Freiburg)',
    'PLZ 76xxx (Karlsruhe)',
    'PLZ 70xxx (Stuttgart)',
    'PLZ 60xxx (Frankfurt)',
    'PLZ 50xxx (Köln)',
    'PLZ 10xxx (Berlin)',
  ],
};

// Time periods
// ---------------

const GERMAN_MONTHS = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

const pad = (value: number) => `${value}`.padStart(2, '0');

const dayLabel = (date: Date) =>
  `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;

const isoWeek = (date: Date) => {
  // ISO 8601 week number (Thursday determines the week's year).
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  firstThursday.setDate(
    firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7)
  );
  const diff = target.getTime() - firstThursday.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
};

const rangeFromParams = (params: ReportParams, now: Date) => {
  const till = new Date(now);
  const from = new Date(now);

  switch (params.datePreset) {
    case 'last7':
      from.setDate(from.getDate() - 6);
      break;
    case 'last14':
      from.setDate(from.getDate() - 13);
      break;
    case 'last30':
      from.setDate(from.getDate() - 29);
      break;
    case 'thisMonth':
      from.setDate(1);
      break;
    case 'lastMonth':
      from.setMonth(from.getMonth() - 1, 1);
      till.setDate(0);
      break;
    case 'thisYear':
      from.setMonth(0, 1);
      break;
    case 'custom': {
      if (params.dateFrom) return [new Date(params.dateFrom), till] as const;
      from.setDate(from.getDate() - 13);
      break;
    }
  }

  if (params.datePreset === 'custom' && params.dateTill) {
    return [from, new Date(params.dateTill)] as const;
  }
  return [from, till] as const;
};

const periodLabels = (params: ReportParams, now: Date): string[] => {
  const [from, till] = rangeFromParams(params, now);
  const labels: string[] = [];
  const cursor = new Date(from);

  switch (params.timeBreakdown) {
    case 'DAYS':
      while (cursor <= till && labels.length < 14) {
        labels.push(dayLabel(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      break;
    case 'WEEKS':
      while (cursor <= till && labels.length < 8) {
        labels.push(`KW ${isoWeek(cursor)}`);
        cursor.setDate(cursor.getDate() + 7);
      }
      break;
    case 'MONTHS':
      cursor.setDate(1);
      while (cursor <= till && labels.length < 12) {
        labels.push(
          `${GERMAN_MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`
        );
        cursor.setMonth(cursor.getMonth() + 1);
      }
      break;
    case 'YEARS':
      while (cursor.getFullYear() <= till.getFullYear() && labels.length < 3) {
        labels.push(`${cursor.getFullYear()}`);
        cursor.setFullYear(cursor.getFullYear() + 1);
      }
      break;
    case 'NONE':
      break;
  }

  return labels.length > 0 ? labels : [dayLabel(till)];
};

// Result rows
// ---------------

const rowValues = (rng: () => number): Record<ColumnKey, number> => {
  const sold = Math.round(80 + rng() * 2400);
  const cancelled = Math.round(sold * (0.02 + rng() * 0.06));
  const tickets = sold - cancelled;
  const avgPrice = 18 + rng() * 47;

  const grossSales = Math.round(tickets * avgPrice * 100) / 100;
  const presaleFee = Math.round(grossSales * 0.1 * 100) / 100;
  const systemFee = Math.round(grossSales * 0.02 * 100) / 100;
  const discount = Math.round(grossSales * rng() * 0.04 * 100) / 100;
  const voucher = Math.round(rng() * 400 * 100) / 100;
  const ticketRevenue =
    Math.round((grossSales - presaleFee - systemFee) * 100) / 100;
  const totalRevenue =
    Math.round((grossSales - discount - voucher) * 100) / 100;

  return {
    tickets,
    sold,
    cancelled,
    grossSales,
    presaleFee,
    systemFee,
    discount,
    voucher,
    ticketRevenue,
    totalRevenue,
  };
};

/**
 * Generate the mock result rows for a report. Deterministic for a given
 * (seed, params, now) tuple.
 */
export const generateRows = (
  seed: string,
  params: ReportParams,
  now: Date
): ReportRow[] => {
  const rng = createRng(`${seed}:${JSON.stringify(params)}`);
  const rows: ReportRow[] = [];

  const names =
    params.breakdown === 'SUMMED_UP'
      ? ['Gesamt']
      : namePools[params.breakdown].filter(() => rng() > 0.2);

  if (params.timeBreakdown === 'NONE') {
    names.forEach((name, index) =>
      rows.push({ id: `row-${index}`, name, values: rowValues(rng) })
    );
    return rows;
  }

  // With a time breakdown, each period repeats the breakdown rows (capped to
  // keep the prototype table readable).
  const periods = periodLabels(params, now);
  const cappedNames = names.slice(0, 4);
  periods.forEach((period, periodIndex) => {
    cappedNames.forEach((name, nameIndex) =>
      rows.push({
        id: `row-${periodIndex}-${nameIndex}`,
        period,
        name,
        values: rowValues(rng),
      })
    );
  });

  return rows;
};

/**
 * Simulated calculation time: grows with parameter complexity, so "heavier"
 * reports visibly take longer — the core async behavior of the real product.
 */
export const calculationTime = (seed: string, params: ReportParams) => {
  const rng = createRng(`duration:${seed}`);
  const filterCount = Object.values(params.filters).filter(
    values => values && values.length > 0
  ).length;

  const breakdownWeight: Record<BreakdownKey, number> = {
    SUMMED_UP: 0,
    SINGLE_EVENT: 4000,
    EVENT_GROUP: 2000,
    LOCATION: 2000,
    GENRE: 2000,
    DIST_CHANNELS: 1000,
    SALES_OFFICE: 3000,
    BRANCH_TYPE: 1000,
    PRICE_CAT: 2000,
    PRICE_LEVEL: 2000,
    PAYMENT_METHOD: 2000,
    ZIPCODE: 6000,
  };

  const base =
    1500 +
    filterCount * 1500 +
    breakdownWeight[params.breakdown] +
    (params.timeBreakdown === 'NONE' ? 0 : 3000);

  return Math.min(25_000, Math.round(base + rng() * 4000));
};

/** Roughly 1 in 8 reports fails, deterministically by seed. */
export const willFail = (seed: string) => createRng(`fail:${seed}`)() < 0.125;
