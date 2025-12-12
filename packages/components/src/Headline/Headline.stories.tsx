import preview from '../../../../.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Headline } from './Headline';

const meta = preview.meta({
  title: 'Components/Headline',
  component: Headline,
  argTypes: {
    level: {
      control: {
        type: 'select',
      },
      options: ['1', '2', '3', '4', '5', '6'],
      description: 'Level of the headline',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the headline',
    },
    size: {
      control: {
        type: 'select',
      },
      options: [
        'level-1',
        'level-2',
        'level-3',
        'level-4',
        'level-5',
        'level-6',
      ],
    },
    align: {
      control: {
        type: 'text',
      },
      description: 'Set the text-align of the component',
    },
    color: {
      control: {
        type: 'text',
      },
      description: 'Text color',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
      },
    },
  },
});

export const Basic = meta.story({
  render: args => <Headline {...args}>This is a Headline!!</Headline>,
});

export const Levels = meta.story({
  render: () => (
    <Stack space={4}>
      <Headline level="1">This is a level 1 Headline!!</Headline>
      <Headline level="2">This is a level 2 Headline!!</Headline>
      <Headline level="3">This is a level 3 Headline!!</Headline>
      <Headline level="4">This is a level 4 Headline!!</Headline>
      <Headline level="5">This is a level 5 Headline!!</Headline>
      <Headline level="6">This is a level 6 Headline!!</Headline>
    </Stack>
  ),
});
