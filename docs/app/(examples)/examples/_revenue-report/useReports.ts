'use client';

import { useSyncExternalStore } from 'react';
import { getServerSnapshot, getSnapshot, subscribe } from './store';

const useStore = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

/** All reports, newest first. */
export const useReports = () =>
  [...useStore().reports].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

export const useReport = (id: string) =>
  useStore().reports.find(report => report.id === id);

export const useTemplates = () => useStore().templates;

// Distinguishes "report does not exist" from "sessionStorage not hydrated
// yet" — `false` during SSR and the hydration render, `true` afterwards
// (when the store has hydrated, too). Prevents a flash of "not found" /
// empty states on hard reloads of runtime-created reports.
const noop = () => () => {};

export const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
