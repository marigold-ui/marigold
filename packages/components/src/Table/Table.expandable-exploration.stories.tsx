/**
 * TEMPORARY exploration story — delete once we have picked an affordance.
 *
 * Six ways to signal "this row opens", side by side on identical data. Each
 * approach is a real theme override (`Table.treeIndent` / `Table.expandButton` /
 * `Table.row`) layered over `theme-rui` via a nested `MarigoldProvider`, so
 * whatever wins can be lifted into `themes/theme-rui/src/components/Table.styles.ts`
 * verbatim instead of being re-derived from a screenshot.
 *
 * Nothing here changes the shipped theme.
 */
import { type ReactNode, useState } from 'react';
import preview from '.storybook/preview';
import type { Theme, ThemeComponent } from '@marigold/system';
import { NumericFormat, cva } from '@marigold/system';
import { theme as ruiTheme } from '../../../../themes/theme-rui/src/index.js';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Panel } from '../Panel/Panel';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Table } from './Table';

// Shared fragments lifted from theme-rui
// ---------------
// Copied rather than imported because `cva` returns an opaque function — there is
// nothing to spread. Kept in one place so the six approaches differ only where
// they are meant to differ.

/** `Table.row` base from theme-rui, so a row override doesn't lose hover/focus. */
const ROW_BASE = [
  'border-border not-last:border-b',
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/50',
  'disabled:cursor-not-allowed',
  'data-hovered:cursor-pointer data-hovered:ui-state-hover',
  'dragging:opacity-50 dragging:transform-gpu',
];

/** `Table.expandButton` base from theme-rui: a ghost caret, same as Accordion's. */
const CARET_BASE = [
  'flex shrink-0 items-center justify-center',
  'size-(--tree-chevron-size) rounded-surface',
  'text-secondary transition-[color,transform]',
  'ui-interactive',
  'ui-press',
  'hover:ui-state-hover-ghost',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
];

/** One indentation step per nesting level. React Aria publishes `--table-row-level`. */
const INDENT = 'ps-[calc((var(--table-row-level,1)-1)*var(--tree-indent))]';

/** Group rows carry a little more weight than their children. */
const GROUP_WEIGHT = '[[data-has-child-items]_&]:font-medium';

/*
 * A note on the band fill used by the two approaches that separate rows by
 * background (C and D) — `bg-charcoal-100`, written out inline below.
 *
 * Deliberately NOT `bg-muted`: measured in the browser, `--color-muted` is
 * 1.04:1 against `--color-surface` — a 1.5% lightness step that is invisible in
 * practice, so C and D looked identical to B. `--color-hover` (1.27:1) and
 * `--color-selected` (1.53:1) are visible but already mean "under the pointer"
 * and "selected", so borrowing either would be a semantic collision.
 *
 * `charcoal-100` (1.11:1) is the right visual weight, but it is a raw palette
 * token and theme styles in this repo use semantic tokens exclusively. So it
 * stands in here only to make the idea judgeable: picking C or D means adding a
 * semantic band token first.
 *
 * Written out as full literals below rather than composed from a constant —
 * Tailwind extracts candidates by scanning for literal strings, so an
 * interpolated `data-...:${BAND}` would never generate a rule.
 */

type TableStyles = ThemeComponent<'Table'>;

const makeTheme = (overrides: Partial<TableStyles>): Theme => ({
  ...ruiTheme,
  components: {
    ...ruiTheme.components,
    // Spreading a `Partial` over the full record widens every overridden slot to
    // optional as far as TS is concerned; at runtime the rui spread has already
    // filled all of them.
    Table: { ...ruiTheme.components.Table, ...overrides } as TableStyles,
  },
});

// Approaches
// ---------------
interface Approach {
  id: string;
  name: string;
  /** What signal this approach actually invests in. */
  idea: string;
  pros: string[];
  cons: string[];
  theme: Theme;
}

const approaches: Approach[] = [
  {
    id: 'a-hairline',
    name: 'A — Caret + indent + hairline guide',
    idea: 'What is on the PR today. A ghost caret marks the control, indentation marks depth, and a 1px line from the parent caret down through the group marks containment.',
    pros: [
      'Containment is drawn explicitly, so a child row is readable as a child even without its group row in view.',
      'Cheapest possible ink for that signal — one hairline, no fills competing with hover/selected.',
      'Caret matches Accordion exactly (same MorphCaret, same 250ms), so expanding reads as one system.',
    ],
    cons: [
      'The line is pseudo-element geometry pinned to `--cell-y-padding` and `--tree-chevron-size`; wrap, truncate or a size change can misalign it.',
      'Measured at 1.37:1 against the surface — the same `--color-border` as the horizontal row dividers it crosses. So it carries exactly the weight of the lines it needs to be distinguished from, which is why it reads as decoration rather than structure.',
      'Says nothing about whether a *collapsed* row is worth opening. Affordance still rests entirely on the caret.',
    ],
    theme: ruiTheme,
  },
  {
    id: 'b-indent',
    name: 'B — Caret + indent only',
    idea: 'Drop the guide line. Pure indentation, which is what React Spectrum S2 and most enterprise tree grids do.',
    pros: [
      'Nothing to misalign — no pseudo-element, so wrap/truncate/size changes cannot break it.',
      'Quietest option; the data stays the loudest thing in the table.',
      'Matches S2, so it is the least surprising choice for anyone coming from another design system.',
    ],
    cons: [
      'At one level, 24px of indent alone is weak — a child row and a root leaf row look nearly identical once you scroll past the group row.',
      'Depends entirely on the group row being in view to make sense.',
      'Puts the whole burden of affordance on a 16px ghost caret.',
    ],
    theme: makeTheme({
      treeIndent: cva({
        base: ['relative flex items-center gap-1', INDENT, GROUP_WEIGHT],
      }),
    }),
  },
  {
    id: 'c-header',
    name: 'C — Group row as a section header',
    idea: 'Fill every group row and bump its weight. Children stay plain and indented. Hierarchy by the "section header" metaphor — note the fill marks the row *kind*, so a collapsed group is banded too.',
    pros: [
      'Strongest at-a-glance separation of the two row kinds, and it survives greyscale, low vision and printing in a way font-weight does not.',
      'No geometry — a background cannot misalign.',
      'Scanning a long table for "where does the next group start" becomes trivial, and it is the only approach that marks a group *before* you open it.',
    ],
    cons: [
      'Reads as a header, which undersells that the group row has its own values and its own aggregate action — exactly what DSTSUP-268 asks for.',
      'Needs a semantic band token that does not exist yet — `--color-muted` measures 1.04:1 against the surface and is effectively invisible, so this stands in with a raw `charcoal-100`. It also has to be explicitly layered under hover/selected — note the `not-data-hovered:` guard.',
      'Containment is implied, not drawn: two adjacent groups with one child each look like four unrelated rows.',
    ],
    theme: makeTheme({
      row: cva({
        base: [
          ...ROW_BASE,
          'data-has-child-items:not-data-hovered:bg-charcoal-100',
        ],
      }),
      treeIndent: cva({
        base: [
          'relative flex items-center gap-1',
          INDENT,
          '[[data-has-child-items]_&]:font-semibold',
        ],
      }),
    }),
  },
  {
    id: 'd-block',
    name: 'D — Open group as one block',
    idea: 'Fill the group row *and* its children, so an expanded group reads as one contiguous block against the root-level rows around it. Hierarchy by the "container" metaphor.',
    pros: [
      'The only approach that answers "which group am I inside?" while scrolled deep into a long group — every child carries the mark.',
      'Marks expansion as a state of the whole region, which is what the user actually did.',
      'No geometry, and the indent can stay subtle because the fill is doing the work.',
    ],
    cons: [
      'A whole filled region is a lot of visual weight for one open group, and two open groups start to look like the table has stripes.',
      'Same missing band token as C, and it collides with selection and hover over a larger area — both are also backgrounds.',
      'Fill alone cannot distinguish two *adjacent* open groups, and says nothing about a collapsed one; at depth 2+ it stops scoping at all.',
    ],
    theme: makeTheme({
      row: cva({
        base: [
          ...ROW_BASE,
          'data-expanded:not-data-hovered:bg-charcoal-100',
          'data-[level="2"]:not-data-hovered:bg-charcoal-100',
        ],
      }),
      treeIndent: cva({
        base: ['relative flex items-center gap-1', INDENT, GROUP_WEIGHT],
      }),
    }),
  },
  {
    id: 'e-prominent',
    name: 'E — Prominent control',
    idea: 'Stop treating the control as a glyph. A 32px caret in a persistent soft cap, so it looks like a button before you hover it.',
    pros: [
      'Fixes the signal that actually matters: "this row can be opened" is unmistakable, on touch and for low-vision users, without relying on hover.',
      'Measured 32×32px against the 24×24px the others sit exactly on — WCAG 2.2 SC 2.5.8 treats 24px as the floor, not the target, and this is a control people hit repeatedly.',
      'The control differs from a leaf row in shape, not just presence, so group vs. leaf reads instantly.',
    ],
    cons: [
      'Heavy: a table of twenty group rows becomes twenty buttons all asking for attention, in a view whose job is comparing numbers.',
      'Steals ~16px more from the identifier column, which is the column most likely to truncate — and the one people search on.',
      'Breaks the "same caret as Accordion" argument, so expanding no longer reads as one system.',
    ],
    theme: makeTheme({
      treeIndent: cva({
        base: [
          'relative flex items-center gap-2',
          '[--tree-chevron-size:calc(var(--spacing)*8)]',
          '[--tree-indent:calc(var(--spacing)*8)]',
          INDENT,
          GROUP_WEIGHT,
        ],
      }),
      expandButton: cva({
        base: [...CARET_BASE, 'ui-soft text-foreground'],
      }),
    }),
  },
  {
    id: 'f-label',
    name: 'F — Label is the toggle',
    idea: 'Keep the quiet caret, but stretch its hit area over the whole tree cell and underline the label on hover. The group’s name becomes the affordance.',
    pros: [
      'A very large target without adding any ink — measured, the whole 497px label width toggles the row, against 24px for every other approach.',
      'Matches the mental model people already have from file browsers and Linear: you click the thing’s name to open it.',
      'Scoped to the tree cell, so unlike row-click-to-expand it does not fight row selection or the row’s own action buttons.',
    ],
    cons: [
      'Half the signal is hover-only, so it is invisible on touch and to anyone who does not hover before clicking.',
      'Real conflict in the TenantClearing case: if the settlement-run label should also navigate to the run, one target now has two meanings.',
      'The overlay blocks text selection of the label, which people do use to copy a clearing number.',
    ],
    theme: makeTheme({
      treeIndent: cva({
        base: [
          'relative flex items-center gap-1',
          INDENT,
          GROUP_WEIGHT,
          'has-[[slot=chevron][data-hovered]]:underline',
          'has-[[slot=chevron][data-hovered]]:cursor-pointer',
        ],
      }),
      expandButton: cva({
        // The overlay resolves against `treeIndent`, which is the `relative`
        // ancestor, so it covers caret + label without wrapping the label in
        // the button (which would need a component change, not a theme one).
        base: [
          ...CARET_BASE,
          "after:absolute after:inset-0 after:content-['']",
        ],
      }),
    }),
  },
];

// Data
// ---------------
interface Clearing {
  id: string;
  label?: string;
  invoice?: string;
  event?: string;
  total: number;
  children?: Clearing[];
}

const clearings: Clearing[] = [
  {
    id: 'run-2026-07-01',
    label: 'Sammelabrechnung 01.07.2026',
    total: 12480.5,
    children: [
      {
        id: 'ABR-10231',
        invoice: 'RE-4711',
        event: 'Nachtflohmarkt',
        total: 4200,
      },
      {
        id: 'ABR-10232',
        invoice: 'RE-4712',
        event: 'Sommerfest',
        total: 8280.5,
      },
    ],
  },
  {
    id: 'run-2026-06-01',
    label: 'Sammelabrechnung 01.06.2026',
    total: 5450,
    children: [
      {
        id: 'ABR-10188',
        invoice: 'RE-4655',
        event: 'Frühlingslauf',
        total: 3300,
      },
      { id: 'ABR-10189', invoice: 'RE-4656', event: 'Lesenacht', total: 1200 },
      { id: 'ABR-10190', invoice: 'RE-4657', event: 'Kinoabend', total: 950 },
    ],
  },
  { id: 'ABR-10240', invoice: 'RE-4720', event: 'Stadtführung', total: 990 },
];

/** A single group with enough children to scroll its group row out of view. */
const longGroup: Clearing[] = [
  {
    id: 'run-long',
    label: 'Sammelabrechnung 01.05.2026',
    total: 41250,
    children: Array.from({ length: 12 }, (_, i) => ({
      id: `ABR-${10100 + i}`,
      invoice: `RE-${4500 + i}`,
      event: 'Veranstaltung',
      total: 3437.5,
    })),
  },
  {
    id: 'ABR-10099',
    invoice: 'RE-4499',
    event: 'Einzelabrechnung',
    total: 780,
  },
];

// Harness
// ---------------
const ClearingTable = ({
  items,
  expanded,
  size,
}: {
  items: Clearing[];
  expanded: string[];
  size?: 'compact' | 'default' | 'spacious';
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    new Set(expanded)
  );

  return (
    <Table
      aria-label="Abrechnungen"
      size={size}
      treeColumn="clearing"
      expandedKeys={expandedKeys}
      onExpandedChange={keys => setExpandedKeys(keys as Set<string>)}
    >
      <Table.Header>
        <Table.Column id="clearing" rowHeader width="2fr">
          ABR-Nr.
        </Table.Column>
        <Table.Column id="invoice">Rechnungs-Nr.</Table.Column>
        <Table.Column id="event">Veranstaltung</Table.Column>
        <Table.Column id="amount" alignX="right">
          Betrag
        </Table.Column>
        <Table.Column id="actions" width={110} alignX="right">
          Aktionen
        </Table.Column>
      </Table.Header>
      <Table.Body items={items}>
        {function renderRow(row: Clearing) {
          const isGroup = Boolean(row.children);

          return (
            <Table.Row id={row.id}>
              <Table.Cell>{row.label ?? row.id}</Table.Cell>
              <Table.Cell>
                {isGroup ? (
                  <Badge>{row.children!.length} Abrechnungen</Badge>
                ) : (
                  row.invoice
                )}
              </Table.Cell>
              <Table.Cell>{row.event ?? '—'}</Table.Cell>
              <Table.Cell alignX="right">
                <NumericFormat
                  style="currency"
                  currency="EUR"
                  value={row.total}
                />
              </Table.Cell>
              <Table.Cell alignX="right">
                <Button variant="ghost" size="small">
                  {isGroup ? 'Gesamt-PDF' : 'PDF'}
                </Button>
              </Table.Cell>
              <Table.ChildRows items={row.children}>
                {renderRow}
              </Table.ChildRows>
            </Table.Row>
          );
        }}
      </Table.Body>
    </Table>
  );
};

const ApproachCard = ({
  approach,
  children,
}: {
  approach: Approach;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-3">
    <div className="flex flex-col gap-1">
      <h3 className="text-foreground text-base font-semibold">
        {approach.name}
      </h3>
      <p className="text-secondary max-w-prose text-sm">{approach.idea}</p>
    </div>

    <MarigoldProvider theme={approach.theme}>
      <Panel aria-label={approach.name}>
        <Panel.Content bleed>{children}</Panel.Content>
      </Panel>
    </MarigoldProvider>

    <div className="grid gap-4 text-sm md:grid-cols-2">
      <div>
        <p className="text-secondary mb-1 text-xs font-medium tracking-wide uppercase">
          Speaks for it
        </p>
        <ul className="text-foreground list-disc space-y-1 ps-5">
          {approach.pros.map(pro => (
            <li key={pro}>{pro}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-secondary mb-1 text-xs font-medium tracking-wide uppercase">
          Speaks against it
        </p>
        <ul className="text-foreground list-disc space-y-1 ps-5">
          {approach.cons.map(con => (
            <li key={con}>{con}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const meta = preview.meta({
  title: 'Components/Table/Expandable Rows Exploration',
  parameters: { surface: false, chromatic: { disableSnapshot: true } },
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
});

/**
 * All six approaches on the same data. The first group is expanded, the second
 * collapsed, and the last row is a root-level clearing with no children — so
 * every approach is judged on all three states at once, including whether a
 * root leaf still lines up with the group rows above it.
 */
export const Approaches = meta.story({
  render: () => (
    <div className="flex flex-col gap-14">
      {approaches.map(approach => (
        <ApproachCard key={approach.id} approach={approach}>
          <ClearingTable items={clearings} expanded={['run-2026-07-01']} />
        </ApproachCard>
      ))}
    </div>
  ),
});

/**
 * The same six, but with one group of twelve children. This is the case that
 * separates them: once the group row has scrolled out of view, can you still
 * tell you are inside a group rather than looking at root-level rows?
 */
export const LongGroup = meta.story({
  render: () => (
    <div className="flex flex-col gap-14">
      {approaches.map(approach => (
        <ApproachCard key={approach.id} approach={approach}>
          <ClearingTable items={longGroup} expanded={['run-long']} />
        </ApproachCard>
      ))}
    </div>
  ),
});

/**
 * Every approach at `size="compact"`, where the row is 8px shorter and the
 * indent step drops to 20px. Affordances that only work at the default density
 * fall apart here.
 */
export const Compact = meta.story({
  render: () => (
    <div className="flex flex-col gap-14">
      {approaches.map(approach => (
        <ApproachCard key={approach.id} approach={approach}>
          <ClearingTable
            items={clearings}
            expanded={['run-2026-07-01']}
            size="compact"
          />
        </ApproachCard>
      ))}
    </div>
  ),
});
