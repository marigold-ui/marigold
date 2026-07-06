import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Headline } from '../Headline/Headline';
import { Inline } from '../Inline/Inline';
import { Inset } from '../Inset/Inset';
import { Text } from '../Text/Text';

const meta = preview.meta({
  title: 'Components/Inset',
  component: Inset,
  parameters: {
    surface: false,
  },
  argTypes: {
    p: {
      control: {
        type: 'select',
      },
      options: [
        'collapsed',
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
    px: {
      control: {
        type: 'select',
      },
      options: [
        'collapsed',
        'padding-tight',
        'padding-snug',
        'padding-regular',
        'padding-relaxed',
        'padding-loose',
      ],
      description: 'set padding on left and right side',
    },
    py: {
      control: {
        type: 'select',
      },
      options: [
        'collapsed',
        'padding-tight',
        'padding-snug',
        'padding-regular',
        'padding-relaxed',
        'padding-loose',
      ],
      description: 'set padding on top and bottom side',
    },
  },
  args: {
    p: 'square-regular',
    children: undefined,
  } as const,
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <div className="bg-muted rounded-md">
      <Inset {...args} data-testid="inset">
        <Headline level={3}>The Giggle Grounds</Headline>
        <Inline>
          <Text fontStyle="italic">Laughville | Outdoor Amphitheater</Text>
        </Inline>
        <Text>
          A charming open-air venue perfect for comedy shows under the stars,
          bringing laughter to every corner of Laughville.
        </Text>
      </Inset>
    </div>
  ),
});

Basic.test(
  'collapses the padding to zero',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      p: 'collapsed',
    },
  },
  async ({ canvas }) => {
    const inset = canvas.getByTestId('inset');
    expect(getComputedStyle(inset).padding).toBe('0px');
  }
);
