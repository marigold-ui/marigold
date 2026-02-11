'use client';

export * from '@marigold/components';
export * from '@marigold/system';
export * as Icons from '@marigold/icons';
export * from './ColorTokens';
export * from './ColorTable';
export * from './Typography';
export * from './Token';
export * from './IconList';
export * from './DosAndDonts';
export * from './RelativeTime';
export * from './TeaserCard';
export * from './FeedbackComponentsTable';

// Explicitly re-export from legacy to resolve ambiguity
export { Table, type TableProps } from '@marigold/components/legacy';
export * from '@marigold/components/legacy';

export * from './AppearanceDemo';
export * from './AppearanceTable';
export * from './StorybookHintMessage';
export * from './ComponentDemo';
