'use client';

export * from '@marigold/components';
export * from '@marigold/system';
export * as Icons from '@marigold/icons';

// Explicitly re-export from legacy to resolve ambiguity
export { Table, type TableProps } from '@marigold/components/legacy';
export * from '@marigold/components/legacy';
