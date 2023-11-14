/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import { forwardRef } from 'react';

import { OverlayProvider } from '@react-aria/overlays';
import { useObjectRef } from '@react-aria/utils';

import { useOverlayTriggerState } from '@react-stately/overlays';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { Popover } from './_Popover';

const theme: Theme = {
  name: 'test',
  components: {
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
    Underlay: cva(),
  },
};
interface TestPopoverProps {
  open: boolean;
}
const TestPopover = forwardRef<HTMLDivElement, TestPopoverProps>(
  ({ open }, ref) => {
    const popoverRef = useObjectRef(ref);
    const state = useOverlayTriggerState({ isOpen: open });

    return (
      <OverlayProvider>
        <Popover triggerRef={popoverRef} state={state}>
          <div>something</div>
        </Popover>
      </OverlayProvider>
    );
  }
);

const { render } = setup({ theme });

test('renders open popover', () => {
  render(<TestPopover open={true} />);

  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
});

test('popover is per default closed', () => {
  render(<TestPopover open={false} />);

  const popover = screen.queryByRole('presentation');
  expect(popover).not.toBeInTheDocument();
});

test('popover has children', () => {
  render(<TestPopover open={true} />);

  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
  expect(popover.firstChild).toBeInTheDocument();
});
