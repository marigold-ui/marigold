import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Box } from '../Box';
import { Center } from './Center';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Button } from '../Button';

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
    maxHeight: {
      control: {
        type: 'select',
      },
      description: 'Center height',
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
    textAlign: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'Inner text alignment',
      table: {
        defaultValue: {
          summary: 'center',
        },
      },
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
    superCentered: {
      control: {
        type: 'boolean',
      },
      description: 'superCentered',
      defaultValue: false,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Center> = args => (
  <Center maxWidth="huge" {...args}>
    <Box height="100%" bg="blue10">
      Centered Box
    </Box>
  </Center>
);

export const Children: ComponentStory<typeof Center> = args => (
  <Center maxWidth="huge" {...args}>
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
  </Center>
);

export const Complex: ComponentStory<typeof Center> = args => (
  <Stack space="medium">
    <Text as="h2" variant="headline2">
      Star Wars - The Empire Strikes Back
    </Text>
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
