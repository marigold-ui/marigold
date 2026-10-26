import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { announce } from '@react-aria/live-announcer';
import { theme } from '@marigold/theme-rui';
import { ListView } from '../ListView/ListView';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
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

test('announces a count changed from inside the grid', async () => {
  render(<Venues />);

  await user.click(screen.getByRole('row', { name: /gasometer/i }));

  expect(announce).toHaveBeenCalledWith('1 of 2 selected', 'polite');
});
