import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Aspect } from '../Aspect';
import { Box } from '../Box';
import { Container } from '../Container';
import { Image } from '../Image';
import { Text } from '../Text';

import { Breakout } from './Breakout';

export default {
  title: 'Components/Breakout',
  argTypes: {
    horizontalAlign: {
      control: {
        type: 'select',
      },
      options: ['top', 'center', 'bottom'],
      description: 'horizontal alignment',
      table: {
        defaultValue: {
          summary: 'center',
        },
      },
    },
    verticalAlign: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'vertical alignment',
      table: {
        defaultValue: {
          summary: 'center',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Breakout> = args => {
  return (
    <Container size="large" align="center">
      <Box
        border="1px solid #ced4da"
        bg="#e9ecef"
        height="100px"
        width="100%"
      />
      <Breakout>
        <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" {...args}>
          BREAKOUT
        </Box>
      </Breakout>
      <Box
        border="1px solid #ced4da"
        bg="#e9ecef"
        height="100px"
        width="100%"
      />
    </Container>
  );
};
export const ExampleText: ComponentStory<typeof Breakout> = args => (
  <Container size="large" align="center">
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Text>
    <Breakout>
      <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" {...args}>
        BREAKOUT element inside a container
      </Box>
    </Breakout>
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Text>
  </Container>
);

export const ExampleFrame: ComponentStory<typeof Breakout> = args => (
  <Container align="center">
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </Text>
    <Breakout>
      <Aspect ratio="ultrawide">
        <Image
          src="https://images.unsplash.com/photo-1511468102400-883d6ea28755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
          alt="Black Forest"
        />
      </Aspect>
    </Breakout>
    <Text>
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.
    </Text>
  </Container>
);
