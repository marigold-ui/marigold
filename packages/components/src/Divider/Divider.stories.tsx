import preview from '.storybook/preview';
import { Inline } from '../Inline/Inline';
import { Divider } from './Divider';

const meta = preview.meta({
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'bold'],
      description: 'Thick or thin line',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'size',
    },
    orientation: {
      control: {
        type: 'select',
      },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
  },
  args: {
    variant: 'default',
  },
});

export const Basic = meta.story({
  render: args => (
    <>
      <p>Above</p>
      <Divider {...args} />
      <p>Below</p>
    </>
  ),
});

export const Bold = meta.story({
  args: {
    variant: 'bold',
  },
  render: args => (
    <>
      <p>Above</p>
      <Divider {...args} />
      <p>Below</p>
    </>
  ),
});

export const Vertical = meta.story({
  args: {
    orientation: 'vertical',
  },
  render: args => (
    <Inline space={2}>
      <p>Left</p>
      <Divider {...args} />
      <p>Right</p>
    </Inline>
  ),
});
export const VerticalAndBold = meta.story({
  args: {
    orientation: 'vertical',
    variant: 'bold',
  },
  render: args => (
    <Inline space={2}>
      <p>Left</p>
      <Divider {...args} />
      <p>Right</p>
    </Inline>
  ),
});
