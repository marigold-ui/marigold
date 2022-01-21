import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Container } from './Container';
import { Text } from '../Text';

export default {
  title: 'Components/Container',
} as Meta;

export const Basic: ComponentStory<typeof Container> = args => (
  <Container {...args}>
    <Text>Container with width=100%</Text>
  </Container>
);
