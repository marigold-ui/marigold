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

const VenueRow = ({ venue }: { venue: Venue }) => (
  <ListView.Item id={venue.slug} textValue={venue.name}>
    <TextValue>{venue.name}</TextValue>
  </ListView.Item>
);

test('never reads as fully selected when it can address nothing', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => null);
  render(
    <MarigoldProvider theme={theme}>
      <ListView aria-label="Venues" selectionMode="multiple" allowSelectAll>
        {VENUES_BY_SLUG.map(venue => (
          <VenueRow key={venue.slug} venue={venue} />
        ))}
      </ListView>
    </MarigoldProvider>
  );
  warn.mockRestore();

  await user.click(screen.getByRole('row', { name: /gasometer/i }));

  // `selectedCount === keys.length` is `0 === 0` with no keys to tick.
  const selectAll = screen.getByRole('checkbox', { name: 'Select all' });
  expect(selectAll).toBeDisabled();
  expect(selectAll).not.toBeChecked();
  expect(selectAll).toBePartiallyChecked();
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

interface Permission {
  id: string;
  name: string;
  locked?: boolean;
}

const PERMISSIONS: Permission[] = [
  { id: 'read', name: 'Read' },
  { id: 'billing', name: 'Billing', locked: true },
];

// The wrapper carries the `disabled`, so only `item.id` reaches the derivation.
const PermissionRow = ({ permission }: { permission: Permission }) => (
  <ListView.Item
    id={permission.id}
    textValue={permission.name}
    disabled={permission.locked}
  >
    <TextValue>{permission.name}</TextValue>
  </ListView.Item>
);

test.each([
  [undefined, '0 of 2 selected Permissions'],
  [['billing'], '0 of 1 selected Permissions'],
])(
  'only disabledKeys %s hides a row the wrapper disables',
  (disabledKeys, description) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => null);
    render(
      <MarigoldProvider theme={theme}>
        <ListView
          aria-label="Permissions"
          selectionMode="multiple"
          allowSelectAll
          items={PERMISSIONS}
          disabledKeys={disabledKeys}
        >
          {(permission: Permission) => (
            <PermissionRow permission={permission} />
          )}
        </ListView>
      </MarigoldProvider>
    );

    expect(
      screen.getByRole('checkbox', { name: 'Select all' })
    ).toHaveAccessibleDescription(description);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  }
);
