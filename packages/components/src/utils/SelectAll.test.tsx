import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { vi } from 'vitest';
import { announce } from '@react-aria/live-announcer';
import { theme } from '@marigold/theme-rui';
import { ListView } from '../ListView/ListView';
import { WithSelectAll } from '../ListView/ListView.stories';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { SelectList } from '../SelectList/SelectList';
import { TextValue } from '../TextValue/TextValue';

vi.mock('@react-aria/live-announcer', () => ({
  announce: vi.fn(),
}));

afterEach(() => {
  vi.mocked(announce).mockClear();
});

const user = userEvent.setup();

test('says nothing on mount', () => {
  render(<WithSelectAll.Component />);

  expect(announce).not.toHaveBeenCalled();
});

test('announces the count when the header changes it', async () => {
  render(<WithSelectAll.Component />);

  await user.click(screen.getByRole('checkbox', { name: 'Select all' }));

  expect(announce).toHaveBeenCalledWith('3 of 3 selected', 'polite');
});

// React Aria's GridList announces these itself, so a second announcement from
// the header would read every row click out twice.
test('says nothing when the count changes inside the grid', async () => {
  render(<WithSelectAll.Component />);

  await user.click(screen.getByRole('row', { name: /gasometer/i }));

  expect(announce).not.toHaveBeenCalled();
});

test('announces again on a second press', async () => {
  render(<WithSelectAll.Component />);
  const selectAll = screen.getByRole('checkbox', { name: 'Select all' });

  await user.click(selectAll);
  await user.click(selectAll);

  expect(announce).toHaveBeenLastCalledWith('0 of 3 selected', 'polite');
});

// The keys are derived for every multi-select SelectList, since Cmd/Ctrl+A
// needs them, so the warning has to follow the select-all rather than the
// derivation.
test.each([
  [true, 1],
  [false, 0],
])(
  'allowSelectAll %s warns about a missing id %i time(s)',
  (allowSelectAll, calls) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => null);

    render(
      <MarigoldProvider theme={theme}>
        <SelectList
          label="Venues"
          selectionMode="multiple"
          allowSelectAll={allowSelectAll}
        >
          <SelectList.Option textValue="Gasometer">
            <TextValue>Gasometer</TextValue>
          </SelectList.Option>
        </SelectList>
      </MarigoldProvider>
    );

    expect(warn).toHaveBeenCalledTimes(calls);
    warn.mockRestore();
  }
);

// `items` keyed by something other than `id`/`key`, which no story covers: the
// stories are examples too, and the idiomatic example keys items by `id`.
interface Venue {
  slug: string;
  name: string;
  external?: boolean;
}

const VENUES_BY_SLUG: Venue[] = [
  { slug: 'gasometer', name: 'Gasometer' },
  { slug: 'tempodrom', name: 'Tempodrom', external: true },
];

const VenuesBySlug = ({
  render,
}: {
  render: (venue: Venue) => ReactElement;
}) => (
  <MarigoldProvider theme={theme}>
    <ListView
      aria-label="Venues"
      selectionMode="multiple"
      allowSelectAll
      items={VENUES_BY_SLUG}
    >
      {(venue: Venue) => render(venue)}
    </ListView>
  </MarigoldProvider>
);

test('takes the key off the rendered row, not off the item', () => {
  render(
    <VenuesBySlug
      render={venue => (
        <ListView.Item id={venue.slug} textValue={venue.name}>
          <TextValue>{venue.name}</TextValue>
        </ListView.Item>
      )}
    />
  );

  expect(
    screen.getByRole('checkbox', { name: 'Select all' })
  ).toHaveAccessibleDescription('0 of 2 selected Venues');
});

test('leaves out a row the render function disables', () => {
  render(
    <VenuesBySlug
      render={venue => (
        <ListView.Item
          id={venue.slug}
          textValue={venue.name}
          disabled={venue.external}
        >
          <TextValue>{venue.name}</TextValue>
        </ListView.Item>
      )}
    />
  );

  expect(
    screen.getByRole('checkbox', { name: 'Select all' })
  ).toHaveAccessibleDescription('0 of 1 selected Venues');
});
