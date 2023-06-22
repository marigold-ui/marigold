/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { useObjectRef } from '@react-aria/utils';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { screen } from '@testing-library/react';
import { forwardRef } from 'react';
import { Popover } from './Popover';
import { Theme } from '@marigold/system';

import { cva } from 'class-variance-authority';

import { setup } from '../test.utils';

const theme: Theme = {
  name: 'test',
  components: {
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
