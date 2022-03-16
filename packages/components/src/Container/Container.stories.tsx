import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Box } from '../Box';
import { Container } from './Container';
import { Text } from '../Text';

export default {
  title: 'Components/Container',
  argTypes: {
    contentType: {
      control: {
        type: 'select',
      },
      options: ['content', 'header'],
      description: 'choose between content and header',
      table: {
        defaultValue: {
          summary: 'content',
        },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      description: 'choose between small, medium and large size',
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'choose between left, center and right alignment',
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
    },
  },
} as Meta;

export const Content: ComponentStory<typeof Container> = args => (
  <Container {...args}>
    <Text>
      It is a dark time for the Rebellion. Although the Death Star has been
      destroyed, Imperial troops have driven the Rebel forces from their hidden
      base and pursued them across the galaxy. Evading the dreaded Imperial
      Starfleet, a group of freedom fighters led by Luke Skywalker has
      established a new secret base on the remote ice world of Hoth. The evil
      lord Darth Vader, obsessed with finding young Skywalker, has dispatched
      thousands of remote probes into the far reaches of space....
    </Text>
  </Container>
);

export const Header: ComponentStory<typeof Container> = args => (
  <Container contentType="header" {...args}>
    <Text as="h2" variant="headline2">
      Star Wars - The Empire Strikes Back
    </Text>
  </Container>
);

export const InnerContent: ComponentStory<typeof Container> = args => (
  <Box as={Container} bg="blue10" p="small" {...args}>
    <Text as="h2" variant="headline2">
      Star Wars - The Empire Strikes Back
    </Text>
    <Box pt="xsmall" width="100%">
      <Text>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy. Evading the dreaded
        Imperial Starfleet, a group of freedom fighters led by Luke Skywalker
        has established a new secret base on the remote ice world of Hoth. The
        evil lord Darth Vader, obsessed with finding young Skywalker, has
        dispatched thousands of remote probes into the far reaches of space....
      </Text>
    </Box>
    <Box width="20ch">
      <ul>
        <li>Luke</li>
        <li>Leia</li>
        <li>Han Solo</li>
        <li>Chewbacca</li>
        <li>R2D2</li>
        <li>C3PO</li>
        <li>Darth Vader</li>
      </ul>
    </Box>
  </Box>
);
