export const BASE = '/pattern/app-shell';

export const pages: Record<string, { label: string; parent?: string }> = {
  '': { label: 'Dashboard' },
  analytics: { label: 'Analytics' },
  users: { label: 'Users', parent: 'Management' },
  teams: { label: 'Teams', parent: 'Management' },
  billing: { label: 'Billing', parent: 'Management' },
  discounts: { label: 'Discounts' },
  'discounts/new': { label: 'New Discount', parent: 'Discounts' },
  general: { label: 'General', parent: 'Settings' },
  security: { label: 'Security', parent: 'Settings' },
};
