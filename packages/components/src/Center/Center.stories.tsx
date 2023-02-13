import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Ticket } from '@marigold/icons';

import { Box } from '../Box';
import { Center } from './Center';
import { Headline } from '../Headline';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Button } from '../Button';
import isChromatic from 'chromatic';

export default {
  title: 'Components/Center',
  argTypes: {
    maxWidth: {
      control: {
        type: 'select',
      },
      description: 'Center maximum width',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        'huge',
        'epic',
      ],
    },
    space: {
      control: {
        type: 'select',
      },
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ],
      description: 'Responsive Style Value',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Center> = args => (
  <Center {...args}>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
        width: '100%',
      }}
    />
  </Center>
);

export const Children: ComponentStory<typeof Center> = args => (
  <Center {...args}>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
        width: '100%',
      }}
    />
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
        width: '100%',
      }}
    />
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
        width: '100%',
      }}
    />
  </Center>
);

export const Icon: ComponentStory<typeof Center> = args => (
  <Center {...args}>
    <Box
      css={{
        bg: 'blue70',
        width: '40px',
        height: '40px',
      }}
    >
      <Ticket fill="white" />
    </Box>
  </Center>
);

export const Complex: ComponentStory<typeof Center> = args => (
  <Stack space="medium">
    <Headline level="2">Star Wars - The Empire Strikes Back</Headline>
    <Text>
      It is a dark time for the Rebellion. Although the Death Star has been
      destroyed, Imperial troops have driven the Rebel forces from their hidden
      base and pursued them across the galaxy.
    </Text>
    <Center {...args}>
      <Button variant="secondary">Watch now</Button>
    </Center>
    <Text>
      Evading the dreaded Imperial Starfleet, a group of freedom fighters led by
      Luke Skywalker has established a new secret base on the remote ice world
      of Hoth. The evil lord Darth Vader, obsessed with finding young Skywalker,
      has dispatched thousands of remote probes into the far reaches of
      space....
    </Text>
  </Stack>
);

Complex.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
