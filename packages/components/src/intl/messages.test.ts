import { intlMessages } from './messages';

const de = intlMessages['de-DE'];
const en = intlMessages['en-US'];

describe('intl messages', () => {
  describe('de-DE', () => {
    test('static messages are strings', () => {
      expect(de.actionsAvailable).toBe('Aktionen verfügbar.');
      expect(de.loadingMessage).toBe('Lade...');
      expect(de.removeAll).toBe('Alle entfernen');
      expect(de.showMore).toBe('Mehr anzeigen');
      expect(de.showLess).toBe('Weniger anzeigen');
      expect(de.closeNavigation).toBe('Navigation schließen');
      expect(de.sidebar).toBe('Seitenleiste');
    });

    test('backTo interpolates label', () => {
      const fn = de.backTo as (vars: Record<string, string>) => string;
      expect(fn({ label: 'Startseite' })).toBe('Zurück zu Startseite');
    });

    test('pageOfTotal interpolates current and total', () => {
      const fn = de.pageOfTotal as (
        vars: Record<string, string | number>
      ) => string;
      expect(fn({ current: 3, total: 10 })).toBe('Seite 3 von 10');
    });

    test('selectedCount interpolates count', () => {
      const fn = de.selectedCount as (
        vars: Record<string, string | number>
      ) => string;
      expect(fn({ count: 5 })).toBe('5 ausgewählt');
    });

    test('showMoreCount interpolates count', () => {
      const fn = de.showMoreCount as (
        vars: Record<string, string | number>
      ) => string;
      expect(fn({ count: 3 })).toBe('3 weitere anzeigen');
    });

    test('showLessCount interpolates count', () => {
      const fn = de.showLessCount as (
        vars: Record<string, string | number>
      ) => string;
      expect(fn({ count: 2 })).toBe('2 weniger anzeigen');
    });

    test('collapseSidebarTooltip interpolates shortcut', () => {
      const fn = de.collapseSidebarTooltip as (
        vars: Record<string, string>
      ) => string;
      expect(fn({ shortcut: 'Ctrl+B' })).toBe(
        'Seitenleiste einklappen (Ctrl+B)'
      );
    });

    test('expandSidebarTooltip interpolates shortcut', () => {
      const fn = de.expandSidebarTooltip as (
        vars: Record<string, string>
      ) => string;
      expect(fn({ shortcut: 'Ctrl+B' })).toBe(
        'Seitenleiste ausklappen (Ctrl+B)'
      );
    });
  });

  describe('en-US', () => {
    test('backTo interpolates label', () => {
      const fn = en.backTo as (vars: Record<string, string>) => string;
      expect(fn({ label: 'Home' })).toBe('Back to Home');
    });

    test('pageOfTotal interpolates current and total', () => {
      const fn = en.pageOfTotal as (
        vars: Record<string, string | number>
      ) => string;
      expect(fn({ current: 1, total: 5 })).toBe('Page 1 of 5');
    });

    test('selectedCount interpolates count', () => {
      const fn = en.selectedCount as (
        vars: Record<string, string | number>
      ) => string;
      expect(fn({ count: 3 })).toBe('3 selected');
    });

    test('collapseSidebarTooltip interpolates shortcut', () => {
      const fn = en.collapseSidebarTooltip as (
        vars: Record<string, string>
      ) => string;
      expect(fn({ shortcut: 'Ctrl+B' })).toBe('Collapse sidebar (Ctrl+B)');
    });

    test('expandSidebarTooltip interpolates shortcut', () => {
      const fn = en.expandSidebarTooltip as (
        vars: Record<string, string>
      ) => string;
      expect(fn({ shortcut: 'Ctrl+B' })).toBe('Expand sidebar (Ctrl+B)');
    });
  });
});
