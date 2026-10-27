import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { announce } from '@react-aria/live-announcer';
import { theme } from '@marigold/theme-rui';
import { ListView } from '../ListView/ListView';
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

const Venues = () => (
  <MarigoldProvider theme={theme}>
    <ListView aria-label="Venues" selectionMode="multiple" allowSelectAll>
      <ListView.Item id="gasometer" textValue="Gasometer">
        <TextValue>Gasometer</TextValue>
      </ListView.Item>
      <ListView.Item id="tempodrom" textValue="Tempodrom">
        <TextValue>Tempodrom</TextValue>
      </ListView.Item>
    </ListView>
  </MarigoldProvider>
);

test('says nothing on mount', () => {
  render(<Venues />);

  expect(announce).not.toHaveBeenCalled();
});

test('announces the count when the header changes it', async () => {
  render(<Venues />);

  await user.click(screen.getByRole('checkbox', { name: 'Select all' }));

  expect(announce).toHaveBeenCalledWith('2 of 2 selected', 'polite');
});

// React Aria's GridList announces these itself, so a second announcement from
// the header would read every row click out twice.
test('says nothing when the count changes inside the grid', async () => {
  render(<Venues />);

  await user.click(screen.getByRole('row', { name: /gasometer/i }));

  expect(announce).not.toHaveBeenCalled();
});

test('announces again on a second press', async () => {
  render(<Venues />);
  const selectAll = screen.getByRole('checkbox', { name: 'Select all' });

  await user.click(selectAll);
  await user.click(selectAll);

  expect(announce).toHaveBeenLastCalledWith('0 of 2 selected', 'polite');
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
