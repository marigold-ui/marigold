import preview from '.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Description } from './Description';

const meta = preview.meta({
  title: 'Components/Description',
  component: Description,
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'muted'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'xs', 'sm', 'base', 'lg'],
    },
    slot: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'text' },
    },
  },
});

export const Basic: any = meta.story({
  args: {
    children: 'Helps a user understand what the parent region is for.',
  },
  render: ({ children, ...args }: any) => (
    <Description {...args}>{children}</Description>
  ),
});

export const Variants: any = meta.story({
  render: () => (
    <Stack space={2}>
      <Description variant="default">
        Default variant — secondary foreground color.
      </Description>
      <Description variant="muted">
        Muted variant — tertiary foreground color.
      </Description>
    </Stack>
  ),
});
