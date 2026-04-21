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
      options: ['section', 'bold'],
      description: 'Thick or thin line',
      table: {
        defaultValue: {
          summary: 'section',
        },
      },
    },
  },
  args: {
    variant: 'section',
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
