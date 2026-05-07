import type { DocEntry } from 'fumadocs-typescript';

const EVENT_HANDLER_TYPE =
  /\b(?:Mouse|Keyboard|Focus|Touch|Pointer|Drag|Animation|Transition|Wheel|Clipboard|Composition|UI|Form|Toggle|React)EventHandler\b/;

const isAriaEntry = (entry: DocEntry): boolean =>
  entry.name.startsWith('aria-') || entry.name === 'role';

const isEventHandlerEntry = (entry: DocEntry): boolean =>
  entry.name.endsWith('Capture') ||
  EVENT_HANDLER_TYPE.test(entry.simplifiedType || entry.type);

const byName = (a: DocEntry, b: DocEntry) => a.name.localeCompare(b.name);

export interface PropEntryGroups {
  main: DocEntry[];
  aria: DocEntry[];
  handlers: DocEntry[];
}

export const splitPropEntries = (entries: DocEntry[]): PropEntryGroups => {
  const groups: PropEntryGroups = { main: [], aria: [], handlers: [] };
  for (const entry of entries) {
    if (isAriaEntry(entry)) groups.aria.push(entry);
    else if (isEventHandlerEntry(entry)) groups.handlers.push(entry);
    else groups.main.push(entry);
  }
  groups.main.sort(byName);
  groups.aria.sort(byName);
  groups.handlers.sort(byName);

  return groups;
};
