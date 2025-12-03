import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Headline } from '../Headline/Headline';
import { Inline } from '../Inline/Inline';
import { Inset } from '../Inset/Inset';
import { Text } from '../Text/Text';

const meta = {
  title: 'Components/Inset',
  argTypes: {
    space: {
      control: {
        type: 'text',
      },
      description: 'set padding on all sides',
    },
    spaceX: {
      control: {
        type: 'text',
      },
      description: 'set padding on left and right side',
    },
    spaceY: {
      control: {
        type: 'text',
      },
      description: 'set padding on top and bottom side',
    },
  },
} satisfies Meta<typeof Inset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Card size="small">
      <Inset space={4} {...args}>
        <Headline level={3}>The Giggle Grounds</Headline>
        <Inline>
          <Text fontStyle="italic">Laughville | Outdoor Amphitheater</Text>
        </Inline>
        <Text>
          A charming open-air venue perfect for comedy shows under the stars,
          bringing laughter to every corner of Laughville.
        </Text>
      </Inset>
    </Card>
  ),
};
