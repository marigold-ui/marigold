import preview from '.storybook/preview';
import { Card } from '../Card/Card';
import { Headline } from '../Headline/Headline';
import { Inline } from '../Inline/Inline';
import { Inset } from '../Inset/Inset';
import { Text } from '../Text/Text';

const meta = preview.meta({
  title: 'Components/Inset',
  component: Inset,
  argTypes: {
    space: {
      control: {
        type: 'select',
      },
      options: [
        'square-tight',
        'square-snug',
        'square-regular',
        'square-relaxed',
        'square-loose',
        'squish-tight',
        'squish-snug',
        'squish-regular',
        'squish-relaxed',
        'squish-loose',
        'stretch-tight',
        'stretch-snug',
        'stretch-regular',
        'stretch-relaxed',
        'stretch-loose',
      ],
      description: 'set padding on all sides',
    },
    spaceX: {
      control: {
        type: 'select',
      },
      options: ['tight', 'related', 'regular', 'group', 'section'],
      description: 'set padding on left and right side',
    },
    spaceY: {
      control: {
        type: 'select',
      },
      options: ['tight', 'related', 'regular', 'group', 'section'],
      description: 'set padding on top and bottom side',
    },
  },
  args: {
    space: 'square-regular',
    children: undefined,
  } as const,
});

export const Basic = meta.story({
  render: args => (
    <Card size="small">
      <Inset {...args}>
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
});
