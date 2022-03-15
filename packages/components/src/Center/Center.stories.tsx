import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Center } from './Center';
import { Text } from '../Text';

export default {
  title: 'Components/Center',
} as Meta;

export const Basic: ComponentStory<typeof Center> = args => (
  <Center {...args}>
    <Text>Center with width=100%</Text>
  </Center>
);
