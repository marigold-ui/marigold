import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { SidebarItem } from './SidebarItem';
import { SidebarNav } from './SidebarNav';
import { SidebarRailItem } from './SidebarRailItem';
import { SidebarFooter, SidebarHeader } from './SidebarSlots';
import { buildRailCollection, resolveActiveRail } from './railCollection';
import { useSidebarRailState } from './useSidebarRailState';

// A representative German-first rail: a direct link, then sections owning navs.
const rail = () => [
  <SidebarHeader key="brand">reservix</SidebarHeader>,
  <SidebarRailItem
    key="uebersicht"
    id="uebersicht"
    icon={<i />}
    href="/uebersicht"
  >
    Übersicht
  </SidebarRailItem>,
  <SidebarRailItem key="tickets" id="tickets" icon={<i />}>
    Tickets
    <SidebarNav aria-label="Tickets">
      <SidebarItem href="/tickets/meine">Meine Tickets</SidebarItem>
      <SidebarItem href="/tickets/alle">Alle Tickets</SidebarItem>
    </SidebarNav>
  </SidebarRailItem>,
  <SidebarRailItem key="veranstaltungen" id="veranstaltungen" icon={<i />}>
    Veranstaltungen
    <SidebarNav aria-label="Veranstaltungen">
      <SidebarItem href="/veranstaltungen/kommende">Kommende</SidebarItem>
    </SidebarNav>
  </SidebarRailItem>,
  <SidebarFooter key="user">Profil</SidebarFooter>,
];

describe('buildRailCollection', () => {
  test('extracts the brand and footer slots', () => {
    const { header, footer } = buildRailCollection(rail());

    expect(header).toBeDefined();
    expect(footer).toBeDefined();
  });

  test('builds one node per RailItem, skipping slots', () => {
    const { nodes } = buildRailCollection(rail());

    expect(nodes.map(n => n.key)).toEqual([
      'uebersicht',
      'tickets',
      'veranstaltungen',
    ]);
  });

  test('classifies direct links vs sections', () => {
    const { nodes } = buildRailCollection(rail());

    const [uebersicht, tickets] = nodes;
    expect(uebersicht.isSection).toBe(false);
    expect(uebersicht.nav).toBeUndefined();
    expect(tickets.isSection).toBe(true);
    expect(tickets.nav).toBeDefined();
  });

  test('carries the icon and extracts the text value from string children', () => {
    const { nodes } = buildRailCollection(rail());

    expect(nodes[0].icon).toBeDefined();
    expect(nodes[0].textValue).toBe('Übersicht');
  });

  test('resolves a section href to its first leaf when none is given', () => {
    const { nodes } = buildRailCollection(rail());

    expect(nodes.find(n => n.key === 'tickets')?.href).toBe('/tickets/meine');
  });

  test('keeps an explicit section href over the first-leaf default', () => {
    const jsx = [
      <SidebarRailItem key="t" id="t" icon={<i />} href="/tickets">
        Tickets
        <SidebarNav aria-label="Tickets">
          <SidebarItem href="/tickets/meine">Meine</SidebarItem>
        </SidebarNav>
      </SidebarRailItem>,
    ];

    const { nodes } = buildRailCollection(jsx);

    expect(nodes[0].href).toBe('/tickets');
  });

  test('derives the panel title from the nav aria-label', () => {
    const { nodes } = buildRailCollection(rail());

    expect(nodes.find(n => n.key === 'tickets')?.panelTitle).toBe('Tickets');
  });
});

describe('resolveActiveRail (string mode)', () => {
  test('matches a section by one of its leaves', () => {
    const col = buildRailCollection(rail());

    const matched = resolveActiveRail(col, '/tickets/alle');

    expect(matched).toBe('tickets');
  });

  test('matches a section by a deeper segment prefix', () => {
    const col = buildRailCollection(rail());

    const matched = resolveActiveRail(col, '/tickets/meine/42');

    expect(matched).toBe('tickets');
  });

  test('matches a direct-link rail item', () => {
    const col = buildRailCollection(rail());

    const matched = resolveActiveRail(col, '/uebersicht');

    expect(matched).toBe('uebersicht');
  });

  test('returns null when nothing matches', () => {
    const col = buildRailCollection(rail());

    const matched = resolveActiveRail(col, '/unbekannt');

    expect(matched).toBeNull();
  });

  test('longest prefix wins across rail items', () => {
    // /reports/weekly is a longer, more specific match than the /reports link.
    const jsx = [
      <SidebarRailItem key="a" id="a" icon={<i />} href="/reports">
        A
      </SidebarRailItem>,
      <SidebarRailItem key="b" id="b" icon={<i />}>
        B
        <SidebarNav aria-label="B">
          <SidebarItem href="/reports/weekly">Weekly</SidebarItem>
        </SidebarNav>
      </SidebarRailItem>,
    ];
    const col = buildRailCollection(jsx);

    const matched = resolveActiveRail(col, '/reports/weekly/2026');

    expect(matched).toBe('b');
  });
});

describe('resolveActiveRail (function mode)', () => {
  test('returns the first rail item whose leaf the predicate accepts', () => {
    const col = buildRailCollection(rail());

    const matched = resolveActiveRail(
      col,
      href => href === '/veranstaltungen/kommende'
    );

    expect(matched).toBe('veranstaltungen');
  });

  test('returns null when the predicate accepts nothing', () => {
    const col = buildRailCollection(rail());

    const matched = resolveActiveRail(col, () => false);

    expect(matched).toBeNull();
  });
});

describe('resolveActiveRail (explicit active)', () => {
  const jsx = () => [
    <SidebarRailItem key="a" id="a" icon={<i />} href="/a">
      A
    </SidebarRailItem>,
    <SidebarRailItem key="b" id="b" icon={<i />} href="/b" active>
      B
    </SidebarRailItem>,
  ];

  test('an active rail item wins over href matching', () => {
    const col = buildRailCollection(jsx());

    const matched = resolveActiveRail(col, '/a');

    expect(matched).toBe('b');
  });

  test('resolves without a current value', () => {
    const col = buildRailCollection(jsx());

    const matched = resolveActiveRail(col, undefined);

    expect(matched).toBe('b');
  });
});

describe('duplicate hrefs', () => {
  test('warns in dev when rail destinations share an href', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const jsx = [
      <SidebarRailItem key="a" id="a" icon={<i />} href="/reports">
        A
      </SidebarRailItem>,
      <SidebarRailItem key="b" id="b" icon={<i />}>
        B
        <SidebarNav aria-label="B">
          <SidebarItem href="/reports">Reports</SidebarItem>
        </SidebarNav>
      </SidebarRailItem>,
    ];
    const col = buildRailCollection(jsx);

    resolveActiveRail(col, '/somewhere');

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('share the same href')
    );
    spy.mockRestore();
  });
});

describe('useSidebarRailState', () => {
  test('selects the matched rail item and exposes matchedKey', () => {
    const { result } = renderHook(() =>
      useSidebarRailState({ children: rail(), current: '/tickets/alle' })
    );

    expect(result.current.matchedKey).toBe('tickets');
    expect(result.current.selectedKey).toBe('tickets');
    expect(result.current.selectedNode?.key).toBe('tickets');
  });

  test('falls back to the first section when nothing matches, marking nothing current', () => {
    const { result } = renderHook(() =>
      useSidebarRailState({ children: rail(), current: '/unbekannt' })
    );

    expect(result.current.matchedKey).toBeNull();
    expect(result.current.selectedKey).toBe('tickets');
  });

  test('syncs the selection when the current match changes', () => {
    const { result, rerender } = renderHook(
      ({ current }) => useSidebarRailState({ children: rail(), current }),
      { initialProps: { current: '/tickets/meine' } }
    );
    expect(result.current.selectedKey).toBe('tickets');

    rerender({ current: '/veranstaltungen/kommende' });

    expect(result.current.matchedKey).toBe('veranstaltungen');
    expect(result.current.selectedKey).toBe('veranstaltungen');
  });
});

describe('fragments', () => {
  test('buildRailCollection collects rail items wrapped in fragments', () => {
    const jsx = (
      <>
        <SidebarRailItem id="a" icon={<i />} href="/a">
          A
        </SidebarRailItem>
        <>
          <SidebarRailItem id="b" icon={<i />} href="/b">
            B
          </SidebarRailItem>
        </>
      </>
    );

    const { nodes } = buildRailCollection(jsx);

    expect(nodes.map(node => node.key)).toEqual(['a', 'b']);
  });
});
