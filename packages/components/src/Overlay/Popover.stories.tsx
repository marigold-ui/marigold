import { createRef } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Popover } from './Popover';

const meta = preview.meta({
  title: 'Components/Popover',
  component: Popover,
  // stories don't show up in storybook and chromatic creates no snapshots for this
  tags: ['!autodocs', '!dev'],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {},
});

export const Basic = meta.story({
  render: () => {
    const ref = createRef<HTMLDivElement>();
    return (
      <>
        <div ref={ref}>Trigger</div>
        <Popover data-testid="popover" triggerRef={ref}>
          <Button>open dialog</Button>
          <Text>this is popover content </Text>
        </Popover>
      </>
    );
  },
});

export const OpenPopover = meta.story({
  render: () => {
    const ref = createRef<HTMLDivElement>();
    return (
      <>
        <div ref={ref}>Trigger</div>
        <Popover data-testid="popover" open triggerRef={ref}>
          <Button>open dialog</Button>
          <Text>this is popover content </Text>
        </Popover>
      </>
    );
  },
});
