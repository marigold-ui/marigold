import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Box } from '../Box';
import { Breakout } from './Breakout';
import { Container } from '../Container';
import { Text } from '../Text';
import { Aspect } from '../Aspect';

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

export const Basic: ComponentStory<typeof Breakout> = args => (
  <Container size="large" alignContainer="center">
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" width="100%" />
    <Box
      as={Breakout}
      border="1px solid #ced4da"
      bg="#e9ecef"
      height="100px"
      {...args}
    >
      BREAKOUT
    </Box>
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" width="100%" />
  </Container>
);

export const ExampleText: ComponentStory<typeof Breakout> = args => (
  <Container size="large" alignContainer="center">
    <Box as={Text} p="small">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Box>
    <Box
      as={Breakout}
      border="1px solid #ced4da"
      bg="#e9ecef"
      height="100px"
      {...args}
    >
      BREAKOUT element inside a container
    </Box>
    <Box as={Text} p="small">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Box>
  </Container>
);

export const ExampleFrame: ComponentStory<typeof Breakout> = args => (
  <Container alignContainer="center">
    <Box as={Text} pb="medium">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </Box>
    <Breakout>
      <Aspect ratio="ultrawide">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4820.000043444012!2d7.826018541821473!3d48.020383262446884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b1e29425703%3A0xbe342117a976e59!2sEuropa-Park%20Stadion!5e1!3m2!1sde!2sde!4v1647595604899!5m2!1sde!2sde"
          title="sc_map"
          width="100%"
          height="100%"
        />
      </Aspect>
    </Breakout>
    <Box as={Text} pt="medium">
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.
    </Box>
  </Container>
);
