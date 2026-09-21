import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { CloseButton } from './CloseButton';

const meta = preview.meta({
  title: 'Components/CloseButton',
  component: CloseButton,
  argTypes: {
    'aria-label': {
      control: 'text',
      description:
        'Accessible name of the button. Say what closing affects, for example "Remove file". Falls back to a localized "Close" when omitted.',
    },
    size: {
      control: 'text',
      description: 'The size of the button.',
    },
    variant: {
      control: 'text',
      description: 'The variant of the button.',
    },
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => <CloseButton {...args} />,
});

Basic.test(
  'falls back to a localized name when none is given',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Close' })).toBeVisible();
  }
);

Basic.test(
  'an explicit aria-label wins over the fallback',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { 'aria-label': 'Remove file' },
  },
  async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: 'Remove file' })
    ).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument();
  }
);
