/**
 * @jest-environment jsdom
 */
import { cleanup, fireEvent, renderHook, screen } from '@testing-library/react';

import { OverlayProvider } from '@react-aria/overlays';
import { useIsSSR } from '@react-aria/ssr';

import { Theme, cva } from '@marigold/system';

import { Select } from '../Select';
import { MarigoldProvider } from './MarigoldProvider';
import { usePortalContainer } from './OverlayContainerProvider';

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
      option: cva(),
      section: cva(),
      sectionTitle: cva(),
    },
    Field: cva(),
  },
};

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia([
  'screen and (min-width: 40em)',
  'screen and (min-width: 52em)',
  'screen and (min-width: 64em)',
]);

afterEach(cleanup);

test('renders portal container', async () => {
  const wrapper = () => (
    <>
      <MarigoldProvider theme={theme} portalContainer="testid">
        <OverlayProvider>
          <Select label="Label" data-testid="select" defaultOpen>
            <Select.Section>
              <Select.Option id="one">one</Select.Option>
              <Select.Option id="two">two</Select.Option>
            </Select.Section>
          </Select>
        </OverlayProvider>
      </MarigoldProvider>
      <div id="testid"></div>
    </>
  );

  const { result } = renderHook(() => usePortalContainer(), { wrapper });
  const button = screen.getByRole('button');
  fireEvent.click(button);
  const item = screen.getByText('two');

  expect(item).toBeInTheDocument();

  expect(result.current).toBeNull();
});
