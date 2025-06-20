/**
 * @jest-environment jsdom
 */
import { renderHook, screen, within } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import {
  OverlayContainerProvider,
  usePortalContainer,
} from '@marigold/components';
import { Theme, cva } from '@marigold/system';
import { Select } from '../Select';
import { MarigoldProvider } from './MarigoldProvider';

// Setup
// ---------------
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
    Label: {
      container: cva(),
      indicator: cva(),
    },
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

test('renders portal container', async () => {
  const containerRef = React.createRef<HTMLDivElement>();

  const wrapper = () => (
    <>
      <OverlayContainerProvider value={containerRef.current as any}>
        <MarigoldProvider theme={theme}>
          <Select label="Label" defaultOpen>
            <Select.Section header="section">
              <Select.Option id="one">one</Select.Option>
              <Select.Option id="two">two</Select.Option>
            </Select.Section>
          </Select>
        </MarigoldProvider>
      </OverlayContainerProvider>
      <div id="testid"></div>
    </>
  );

  const { result } = renderHook(() => usePortalContainer(), { wrapper });
  const listbox = screen.getByRole('listbox');
  const item = within(listbox).getByText('two');

  expect(item).toBeInTheDocument();

  expect(result.current).toBeNull();
});
