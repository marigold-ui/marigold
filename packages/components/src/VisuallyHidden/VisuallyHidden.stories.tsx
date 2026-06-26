import preview from '.storybook/preview';
import { Text } from '../Text/Text';
import { VisuallyHidden } from './VisuallyHidden';

const meta = preview.meta({
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Children of the Visually Hidden.',
    },
  },
});

export const Basic = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: ({ ...args }) => (
    <>
      <Text>The Text below is visually hidden</Text>
      <VisuallyHidden {...args}>Invisible!</VisuallyHidden>
    </>
  ),
});
