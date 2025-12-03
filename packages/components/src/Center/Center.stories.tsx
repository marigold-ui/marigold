import { Ticket } from '@marigold/icons';
import preview from '../../../../config/storybook/.storybook/preview';
import { Button } from '../Button/Button';
import { Headline } from '../Headline/Headline';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Center } from './Center';

const meta = preview.meta({
  title: 'Components/Center',
  component: Center,
  argTypes: {
    maxWidth: {
      control: {
        type: 'text',
      },
      description:
        'the maximum width of the center element. Should be a string value (e.g. 500px)',
      table: {
        defaultValue: {
          summary: '100%',
        },
      },
    },
    space: {
      control: {
        type: 'text',
      },
      description:
        'The gap between more elements in a center element, we use tailwind tokens for that',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
  },
});

export const Basic = meta.story({
  render: args => (
    <Center maxWidth="xxlarge" {...args}>
      <div className="h-28 w-1/2 border border-slate-300 bg-slate-200" />
    </Center>
  ),
});

export const Children = meta.story({
  render: args => (
    <Center {...args} space={2}>
      <div className="h-28 w-1/2 border border-slate-300 bg-slate-200" />
      <div className="h-28 w-1/2 border border-slate-300 bg-slate-200" />
      <div className="h-28 w-1/2 border border-slate-300 bg-slate-200" />
    </Center>
  ),
});

export const Nested = meta.story({
  render: args => (
    <Center {...args}>
      <div className="size-[40px] bg-blue-700">
        <Center {...args}>
          <Ticket className="fill-white" />
        </Center>
      </div>
    </Center>
  ),
});

export const Complex = meta.story({
  render: args => (
    <Stack space={3}>
      <Headline level={2}>Star Wars - The Empire Strikes Back</Headline>
      <Text>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy.
      </Text>
      <Center {...args}>
        <Button variant="secondary">Watch now</Button>
      </Center>
      <Text>
        Evading the dreaded Imperial Starfleet, a group of freedom fighters led
        by Luke Skywalker has established a new secret base on the remote ice
        world of Hoth. The evil lord Darth Vader, obsessed with finding young
        Skywalker, has dispatched thousands of remote probes into the far
        reaches of space....
      </Text>
    </Stack>
  ),
});
