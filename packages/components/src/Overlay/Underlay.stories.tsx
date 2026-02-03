import preview from '.storybook/preview';
import { Underlay } from './Underlay';

const meta = preview.meta({
  title: 'Components/Underlay',
  component: Underlay,
  tags: ['!autodocs', '!dev'],
});

export const Basic = meta.story({
  render: args => (
    <Underlay open {...args}>
      <div>something</div>
    </Underlay>
  ),
});

export const WithVariant = meta.story({
  args: {
    variant: 'one',
  },
  render: args => (
    <Underlay open {...args}>
      <div>something</div>
    </Underlay>
  ),
});

export const WithSize = meta.story({
  args: {
    size: 'small',
  },
  render: args => (
    <Underlay open {...args}>
      <div>something</div>
    </Underlay>
  ),
});
