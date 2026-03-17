export interface Discount {
  id: string;
  code: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  usageCount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'scheduled';
}

export const discounts: Discount[] = [
  {
    id: '1',
    code: 'SUMMER25',
    name: 'Summer Sale',
    type: 'percentage',
    value: 25,
    usageCount: 342,
    validFrom: '2025-06-01',
    validTo: '2025-08-31',
    status: 'expired',
  },
  {
    id: '2',
    code: 'WELCOME10',
    name: 'Welcome Discount',
    type: 'percentage',
    value: 10,
    usageCount: 1205,
    validFrom: '2025-01-01',
    validTo: '2026-12-31',
    status: 'active',
  },
  {
    id: '3',
    code: 'FLAT5',
    name: 'Flat Five Off',
    type: 'fixed',
    value: 5,
    usageCount: 89,
    validFrom: '2026-01-15',
    validTo: '2026-06-30',
    status: 'active',
  },
  {
    id: '4',
    code: 'SPRING20',
    name: 'Spring Special',
    type: 'percentage',
    value: 20,
    usageCount: 0,
    validFrom: '2026-04-01',
    validTo: '2026-05-31',
    status: 'scheduled',
  },
  {
    id: '5',
    code: 'VIP50',
    name: 'VIP Exclusive',
    type: 'fixed',
    value: 50,
    usageCount: 27,
    validFrom: '2025-11-01',
    validTo: '2026-03-31',
    status: 'active',
  },
  {
    id: '6',
    code: 'BLACKFRI',
    name: 'Black Friday Deal',
    type: 'percentage',
    value: 40,
    usageCount: 1580,
    validFrom: '2025-11-28',
    validTo: '2025-11-30',
    status: 'expired',
  },
  {
    id: '7',
    code: 'NEWYEAR15',
    name: 'New Year Offer',
    type: 'percentage',
    value: 15,
    usageCount: 410,
    validFrom: '2025-12-30',
    validTo: '2026-01-15',
    status: 'expired',
  },
];
