/**
 * Fake data for the contract-model example. Shaped after the screen that
 * decides how a subscription is sold: which terms and conditions apply, which
 * contract model the event uses, and — for a subscription — the contract term.
 */

export type ContractModel = 'bundle' | 'priorityPurchase' | 'subscription';

export type DocumentOrigin = 'organizer' | 'group' | 'own';

export interface ConditionsDocument {
  origin: DocumentOrigin;
  /** File name as shown to the user. */
  name: string;
  href: string;
  uploadedAt: string;
  /** Who the document is inherited from. Absent for an own upload. */
  inheritedFrom?: string;
  /**
   * Where the document would fall back to if an own upload were removed. Only
   * set on an own upload, and only when something is there to fall back to.
   */
  fallsBackTo?: string;
}

export const contractModels: {
  id: ContractModel;
  label: string;
  description: string;
}[] = [
  {
    id: 'bundle',
    label: 'Bundle',
    description:
      'A fixed set of events sold together. No contract, no renewal.',
  },
  {
    id: 'priorityPurchase',
    label: 'Priority purchase',
    description:
      'Existing subscribers may buy their seats before general sale opens.',
  },
  {
    id: 'subscription',
    label: 'Subscription',
    description:
      'A running contract with a fixed term that renews indefinitely.',
  },
];

/** The document the event inherits when nothing of its own is uploaded. */
export const inheritedDocument: ConditionsDocument = {
  origin: 'group',
  name: 'Season_2026_AGB.pdf',
  href: '#season-2026-agb',
  uploadedAt: '12.03.2026',
  inheritedFrom: 'the event group “Season 2026/27”',
};

/** The document after the user uploads one for this event. */
export const ownDocument: ConditionsDocument = {
  origin: 'own',
  name: 'Main_stage_AGB.pdf',
  href: '#main-stage-agb',
  uploadedAt: '04.08.2026',
  fallsBackTo: 'the event group “Season 2026/27”',
};
