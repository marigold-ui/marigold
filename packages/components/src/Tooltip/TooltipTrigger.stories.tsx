import { useState } from 'storybook/preview-api';
import preview from '../../../../storybook/.storybook/preview';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta = preview.meta({
  title: 'Components/Tooltip',
  component: Tooltip.Trigger,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'If the tooltip is disabled. It will not open.',
    },
    delay: {
      control: {
        type: 'number',
      },
      table: {
        defaultValue: { summary: '1000' },
      },
      description: 'The delay time for the tooltip to show up',
    },
    closeDelay: {
      control: {
        type: 'number',
      },
      table: {
        defaultValue: { summary: '500' },
      },
      description: 'The delay time for the tooltip to close.',
    },
    trigger: {
      control: {
        type: 'select',
      },
      options: ['focus', 'undefined'],
      table: {
        defaultValue: { summary: 'focus' },
      },
      description:
        'By default, opens for both focus and hover. Can be made to open only for focus.',
    },
    open: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'If the tooltip is open',
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'If the tooltip should be default open (uncontrolled)',
    },
  },
  args: {
    disabled: false,
    delay: 1000,
    closeDelay: 500,
    trigger: 'focus',
    defaultOpen: false,
    children: undefined,
  } as const,
});

export const Trigger = meta.story({
  render: args => {
    return (
      <div className="ms-auto me-auto flex w-[min(100%_-_3rem,60ch)] gap-2 pt-32">
        <Tooltip.Trigger {...args}>
          <Button variant="primary">Hover me!</Button>
          <Tooltip>Look at this tooltip!</Tooltip>
        </Tooltip.Trigger>
        <Tooltip.Trigger {...args}>
          <Button variant="primary">Hover no! Me!</Button>
          <Tooltip>
            <div>I am a much more longer tooltip you know!</div>
            <div>I even have two lines!</div>
          </Tooltip>
        </Tooltip.Trigger>
      </div>
    );
  },
});

export const ControlledTooltipTrigger = meta.story({
  render: args => {
    const [open, setOpen] = useState(false);
    return (
      <div className="ms-auto me-auto flex w-[min(100%_-_3rem,60ch)] flex-col gap-2 pt-32">
        <Tooltip.Trigger open={open} onOpenChange={setOpen} {...args}>
          <Button variant="primary">Hover Me!</Button>
          <Tooltip>
            <div>I am a much more longer tooltip you know!</div>
            <div>I even have two lines!</div>
          </Tooltip>
        </Tooltip.Trigger>
        <span>Tooltip is {open ? 'showing' : 'not showing'}</span>
      </div>
    );
  },
});
