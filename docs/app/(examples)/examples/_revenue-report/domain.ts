// Domain model for the Umsatzreport prototype: report parameters, breakdowns,
// filters and result columns. Labels are German because the prototype mirrors
// the real Reservix reporting product.

// Parameters
// ---------------

export type BreakdownKey =
  | 'SUMMED_UP'
  | 'SINGLE_EVENT'
  | 'EVENT_GROUP'
  | 'LOCATION'
  | 'GENRE'
  | 'DIST_CHANNELS'
  | 'SALES_OFFICE'
  | 'BRANCH_TYPE'
  | 'PRICE_CAT'
  | 'PRICE_LEVEL'
  | 'PAYMENT_METHOD'
  | 'ZIPCODE';

export type TimeBreakdownKey = 'NONE' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export type DateBasisKey = 'orderDate' | 'paymentDate' | 'eventDate';

export type DatePresetKey =
  | 'last7'
  | 'last14'
  | 'last30'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom';

export type FilterKey =
  | 'eventGroup'
  | 'event'
  | 'genre'
  | 'venue'
  | 'distributionChannel'
  | 'preseller'
  | 'branchType'
  | 'paymentMethod'
  | 'priceCategory';

export interface ReportParams {
  breakdown: BreakdownKey;
  timeBreakdown: TimeBreakdownKey;
  dateBasis: DateBasisKey;
  datePreset: DatePresetKey;
  /** ISO date (yyyy-mm-dd), only used when `datePreset` is `custom`. */
  dateFrom?: string;
  /** ISO date (yyyy-mm-dd), only used when `datePreset` is `custom`. */
  dateTill?: string;
  filters: Partial<Record<FilterKey, string[]>>;
}

export const defaultParams: ReportParams = {
  breakdown: 'SUMMED_UP',
  timeBreakdown: 'NONE',
  dateBasis: 'orderDate',
  datePreset: 'last14',
  filters: {},
};

// Breakdowns
// ---------------

export interface BreakdownOption {
  key: BreakdownKey;
  label: string;
  /** Report name derived from this breakdown, e.g. "Umsatz pro Genre". */
  name: string;
  description: string;
}

export interface BreakdownGroup {
  label: string;
  options: BreakdownOption[];
}

export const breakdownGroups: BreakdownGroup[] = [
  {
    label: 'Gesamt',
    options: [
      {
        key: 'SUMMED_UP',
        label: 'Aufsummiert',
        name: 'Gesamtumsatz',
        description: 'Alle Umsätze als eine Summe',
      },
    ],
  },
  {
    label: 'Veranstaltung',
    options: [
      {
        key: 'SINGLE_EVENT',
        label: 'pro Einzeltermin',
        name: 'Umsatz pro Einzeltermin',
        description: 'Eine Zeile je Termin',
      },
      {
        key: 'EVENT_GROUP',
        label: 'pro Veranstaltungsgruppe',
        name: 'Umsatz pro Veranstaltungsgruppe',
        description: 'Gruppiert nach Veranstaltungsgruppe',
      },
      {
        key: 'LOCATION',
        label: 'pro Spielstätte',
        name: 'Umsatz pro Spielstätte',
        description: 'Gruppiert nach Veranstaltungsort',
      },
      {
        key: 'GENRE',
        label: 'pro Genre',
        name: 'Umsatz pro Genre',
        description: 'Gruppiert nach Genre',
      },
    ],
  },
  {
    label: 'Vertrieb',
    options: [
      {
        key: 'DIST_CHANNELS',
        label: 'pro Vertriebsweg',
        name: 'Umsatz pro Vertriebsweg',
        description: 'Intern vs. extern',
      },
      {
        key: 'SALES_OFFICE',
        label: 'pro Vorverkaufsstelle',
        name: 'Umsatz pro Vorverkaufsstelle',
        description: 'Gruppiert nach VVK-Stelle',
      },
      {
        key: 'BRANCH_TYPE',
        label: 'pro Filialtyp',
        name: 'Umsatz pro Filialtyp',
        description: 'Filiale, Webshop oder Kasse',
      },
    ],
  },
  {
    label: 'Tickets',
    options: [
      {
        key: 'PRICE_CAT',
        label: 'pro Preiskategorie',
        name: 'Umsatz pro Preiskategorie',
        description: 'Gruppiert nach Preiskategorie',
      },
      {
        key: 'PRICE_LEVEL',
        label: 'pro Preisstufe',
        name: 'Umsatz pro Preisstufe',
        description: 'Gruppiert nach Preisstufe',
      },
    ],
  },
  {
    label: 'Bestellung',
    options: [
      {
        key: 'PAYMENT_METHOD',
        label: 'pro Zahlungsart',
        name: 'Umsatz pro Zahlungsart',
        description: 'Gruppiert nach Zahlungsart',
      },
      {
        key: 'ZIPCODE',
        label: 'nach PLZ-Region',
        name: 'Umsatz nach PLZ-Region',
        description: 'Herkunft der Bestellungen',
      },
    ],
  },
];

export const breakdownOptions = breakdownGroups.flatMap(group => group.options);

export const getBreakdown = (key: BreakdownKey) =>
  breakdownOptions.find(option => option.key === key) ?? breakdownOptions[0];

// Time breakdown
// ---------------

export const timeBreakdowns: {
  key: TimeBreakdownKey;
  label: string;
  /** Suffix appended to the report name, e.g. "(täglich)". */
  suffix?: string;
}[] = [
  { key: 'NONE', label: 'Kein Zeitverlauf' },
  { key: 'DAYS', label: 'Tag', suffix: 'täglich' },
  { key: 'WEEKS', label: 'Woche', suffix: 'wöchentlich' },
  { key: 'MONTHS', label: 'Monat', suffix: 'monatlich' },
  { key: 'YEARS', label: 'Jahr', suffix: 'jährlich' },
];

export const getTimeBreakdown = (key: TimeBreakdownKey) =>
  timeBreakdowns.find(option => option.key === key) ?? timeBreakdowns[0];

/** Derive a human readable report name from its parameters. */
export const reportName = (params: ReportParams) => {
  const base = getBreakdown(params.breakdown).name;
  const time = getTimeBreakdown(params.timeBreakdown);
  return time.suffix ? `${base} (${time.suffix})` : base;
};

// Date basis + presets
// ---------------

export const dateBasisOptions: {
  key: DateBasisKey;
  label: string;
  description: string;
}[] = [
  {
    key: 'orderDate',
    label: 'Bestelldatum',
    description: 'Wann wurde bestellt?',
  },
  {
    key: 'paymentDate',
    label: 'Zahldatum',
    description: 'Wann wurde bezahlt?',
  },
  {
    key: 'eventDate',
    label: 'Datum Einzeltermin',
    description: 'Wann findet die Veranstaltung statt?',
  },
];

export const getDateBasis = (key: DateBasisKey) =>
  dateBasisOptions.find(option => option.key === key) ?? dateBasisOptions[0];

export const datePresets: { key: DatePresetKey; label: string }[] = [
  { key: 'last7', label: 'Letzte 7 Tage' },
  { key: 'last14', label: 'Letzte 14 Tage' },
  { key: 'last30', label: 'Letzte 30 Tage' },
  { key: 'thisMonth', label: 'Dieser Monat' },
  { key: 'lastMonth', label: 'Letzter Monat' },
  { key: 'thisYear', label: 'Dieses Jahr' },
  { key: 'custom', label: 'Benutzerdefiniert' },
];

export const getDatePreset = (key: DatePresetKey) =>
  datePresets.find(option => option.key === key) ?? datePresets[0];

const formatGermanDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
};

/** Label of the date range, e.g. "Bestelldatum: Letzte 14 Tage". */
export const dateRangeLabel = (params: ReportParams) => {
  const basis = getDateBasis(params.dateBasis).label;
  if (params.datePreset === 'custom' && params.dateFrom && params.dateTill) {
    return `${basis}: ${formatGermanDate(params.dateFrom)} – ${formatGermanDate(params.dateTill)}`;
  }
  return `${basis}: ${getDatePreset(params.datePreset).label}`;
};

// Filters
// ---------------

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterDefinition {
  key: FilterKey;
  label: string;
  /** Single-value filters render as Select, multi-value as TagField. */
  single?: boolean;
  options: FilterOption[];
}

export const filterDefinitions: FilterDefinition[] = [
  {
    key: 'eventGroup',
    label: 'Veranstaltungsgruppe',
    options: [
      { id: 'konzerte-2026', label: 'Konzerte 2026' },
      { id: 'theater-saison', label: 'Theater Saison 25/26' },
      { id: 'festivals', label: 'Festivals' },
      { id: 'comedy-kabarett', label: 'Comedy & Kabarett' },
      { id: 'familienprogramm', label: 'Familienprogramm' },
      { id: 'klassik-reihe', label: 'Klassik-Reihe' },
    ],
  },
  {
    key: 'event',
    label: 'Veranstaltung',
    options: [
      { id: 'sommernachtskonzert', label: 'Sommernachtskonzert' },
      { id: 'jazz-im-park', label: 'Jazz im Park' },
      { id: 'zauberfloete', label: 'Die Zauberflöte' },
      { id: 'comedy-night', label: 'Comedy Night Spezial' },
      { id: 'rock-am-fluss', label: 'Rock am Fluss' },
      { id: 'kindertheater', label: 'Kindertheater: Der kleine Drache' },
      { id: 'silvesterkonzert', label: 'Silvesterkonzert' },
      { id: 'open-air-kino', label: 'Open-Air Kino' },
    ],
  },
  {
    key: 'genre',
    label: 'Genre',
    options: [
      { id: 'rock-pop', label: 'Rock & Pop' },
      { id: 'klassik', label: 'Klassik' },
      { id: 'jazz', label: 'Jazz' },
      { id: 'comedy', label: 'Comedy' },
      { id: 'theater', label: 'Theater' },
      { id: 'familie', label: 'Familie & Kinder' },
    ],
  },
  {
    key: 'venue',
    label: 'Spielstätte',
    options: [
      { id: 'stadthalle', label: 'Stadthalle Freiburg' },
      { id: 'konzerthaus', label: 'Konzerthaus' },
      { id: 'e-werk', label: 'Kulturzentrum E-Werk' },
      { id: 'theater-im-hof', label: 'Theater im Hof' },
      { id: 'rheinwiese', label: 'Open-Air-Gelände Rheinwiese' },
    ],
  },
  {
    key: 'distributionChannel',
    label: 'Vertriebsweg',
    single: true,
    options: [
      { id: 'intern', label: 'Intern' },
      { id: 'extern', label: 'Extern' },
    ],
  },
  {
    key: 'preseller',
    label: 'Vorverkaufsstelle',
    options: [
      { id: 'tourist-info', label: 'Tourist-Information Freiburg' },
      { id: 'ticketshop', label: 'Ticketshop Innenstadt' },
      { id: 'webshop', label: 'Reservix Webshop' },
      { id: 'buchhandlung', label: 'Buchhandlung am Markt' },
      { id: 'kulturbuero', label: 'Kulturbüro' },
    ],
  },
  {
    key: 'branchType',
    label: 'Filialtyp',
    options: [
      { id: 'filiale', label: 'Filiale' },
      { id: 'webshop', label: 'Webshop' },
      { id: 'kasse', label: 'Kasse' },
    ],
  },
  {
    key: 'paymentMethod',
    label: 'Zahlungsart',
    options: [
      { id: 'paypal', label: 'PayPal' },
      { id: 'kreditkarte', label: 'Kreditkarte' },
      { id: 'lastschrift', label: 'Lastschrift' },
      { id: 'rechnung', label: 'Rechnung' },
      { id: 'ec-karte', label: 'EC-Karte' },
      { id: 'bar', label: 'Barzahlung' },
    ],
  },
  {
    key: 'priceCategory',
    label: 'Preiskategorie',
    options: [
      { id: 'kat-1', label: 'Kategorie 1' },
      { id: 'kat-2', label: 'Kategorie 2' },
      { id: 'kat-3', label: 'Kategorie 3' },
      { id: 'ermaessigt', label: 'Ermäßigt' },
      { id: 'rollstuhl', label: 'Rollstuhlplatz' },
    ],
  },
];

export const getFilterDefinition = (key: FilterKey) =>
  filterDefinitions.find(definition => definition.key === key);

/** Keys of all filters with at least one selected value. */
export const activeFilterKeys = (params: ReportParams) =>
  filterDefinitions
    .map(definition => definition.key)
    .filter(key => (params.filters[key] ?? []).length > 0);

/** Label of an active filter, e.g. "Genre: Rock & Pop, Jazz". */
export const filterLabel = (params: ReportParams, key: FilterKey) => {
  const definition = getFilterDefinition(key);
  if (!definition) return key;

  const labels = (params.filters[key] ?? []).map(
    id => definition.options.find(option => option.id === id)?.label ?? id
  );
  const value =
    labels.length <= 2
      ? labels.join(', ')
      : `${labels.slice(0, 2).join(', ')} (+${labels.length - 2} weitere)`;

  return `${definition.label}: ${value}`;
};

// Result columns
// ---------------

export type ColumnKey =
  | 'tickets'
  | 'sold'
  | 'cancelled'
  | 'grossSales'
  | 'presaleFee'
  | 'systemFee'
  | 'discount'
  | 'voucher'
  | 'ticketRevenue'
  | 'totalRevenue';

export interface ColumnDefinition {
  key: ColumnKey;
  label: string;
  format: 'number' | 'currency';
  /** Emphasized columns render bold (key revenue figures). */
  emphasized?: boolean;
  defaultVisible: boolean;
}

export const columnDefinitions: ColumnDefinition[] = [
  { key: 'tickets', label: 'Tickets', format: 'number', defaultVisible: true },
  { key: 'sold', label: 'Verkauft', format: 'number', defaultVisible: true },
  {
    key: 'cancelled',
    label: 'Storniert',
    format: 'number',
    defaultVisible: true,
  },
  {
    key: 'grossSales',
    label: 'Bruttoverkauf',
    format: 'currency',
    emphasized: true,
    defaultVisible: true,
  },
  {
    key: 'presaleFee',
    label: 'VVK-Gebühr',
    format: 'currency',
    defaultVisible: true,
  },
  {
    key: 'systemFee',
    label: 'Systemgebühr',
    format: 'currency',
    defaultVisible: false,
  },
  {
    key: 'discount',
    label: 'Rabatt',
    format: 'currency',
    defaultVisible: false,
  },
  {
    key: 'voucher',
    label: 'Gutschein',
    format: 'currency',
    defaultVisible: false,
  },
  {
    key: 'ticketRevenue',
    label: 'Ticketerlös',
    format: 'currency',
    emphasized: true,
    defaultVisible: true,
  },
  {
    key: 'totalRevenue',
    label: 'Gesamtumsatz',
    format: 'currency',
    emphasized: true,
    defaultVisible: true,
  },
];

export const defaultVisibleColumns = columnDefinitions
  .filter(column => column.defaultVisible)
  .map(column => column.key);

// Reports
// ---------------

export type ReportStatus =
  | 'pending'
  | 'processing'
  | 'successful'
  | 'failed'
  | 'cancelled';

export interface ReportRow {
  id: string;
  /** Time slice label, only present when a time breakdown is active. */
  period?: string;
  /** Breakdown label, e.g. the event group or payment method. */
  name: string;
  values: Record<ColumnKey, number>;
}

export interface Report {
  id: string;
  name: string;
  params: ReportParams;
  status: ReportStatus;
  /** ISO timestamp. */
  createdAt: string;
  /** Calculation time in milliseconds, set once finished. */
  durationMs?: number;
  error?: string;
  rows?: ReportRow[];
}

export interface Template {
  id: string;
  name: string;
  params: ReportParams;
}

/** Format a calculation duration, e.g. "< 1 Sek." or "1 Min. 12 Sek.". */
export const formatDuration = (durationMs: number) => {
  const seconds = Math.round(durationMs / 1000);
  if (seconds < 1) return '< 1 Sek.';
  if (seconds < 60) return `${seconds} Sek.`;
  return `${Math.floor(seconds / 60)} Min. ${seconds % 60} Sek.`;
};
