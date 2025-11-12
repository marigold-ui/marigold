/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Theme, cva } from '@marigold/system';
import { Select } from '../Select/Select';
import { MarigoldProvider } from './MarigoldProvider';
import { OverlayContainerProvider } from './OverlayContainerProvider';

// Setup
// ---------------
const user = userEvent.setup();

const theme: Theme = {
  name: 'test',
  colors: {
    black: '#000',
  },
  components: {
    Popover: cva(),
    Underlay: cva(),
    Select: {
      icon: cva(),
      select: cva(),
    },
    Label: cva(),
    HelpText: {
      container: cva(),
      icon: cva(),
    },
    ListBox: {
      container: cva(),
      list: cva(),
      item: cva(),
      section: cva(),
      header: cva(),
    },
    Field: cva(),
    IconButton: cva(),
    Modal: cva(),
    Dialog: {
      container: cva(),
      closeButton: cva(),
      header: cva(),
      content: cva(),
      actions: cva(),
      title: cva(),
    },
  },
};

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia([
  'screen and (min-width: 40em)',
  'screen and (min-width: 52em)',
  'screen and (min-width: 64em)',
]);

test('renders into a given container', async () => {
  render(
    <>
      <OverlayContainerProvider container="container">
        <MarigoldProvider theme={theme}>
          <Select label="Label">
            <Select.Section header="section">
              <Select.Option id="one">one</Select.Option>
              <Select.Option id="two">two</Select.Option>
            </Select.Section>
          </Select>
        </MarigoldProvider>
      </OverlayContainerProvider>
      <div id="container" data-testid="portal"></div>
    </>
  );

  await user.click(screen.getByRole('button'));

  const listbox = screen.getByRole('listbox');
  const item = within(listbox).getByText('two');

  expect(item).toBeInTheDocument();

  const portal = screen.getByTestId('portal');
  expect(portal?.contains(listbox)).toBe(true);
});
