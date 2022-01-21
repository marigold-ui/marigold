import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Text } from './Text';

export default {
  title: 'Components/Text',
  argTypes: {
    as: {
      control: {
        type: 'select',
      },
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Set HTML element',
      table: {
        defaultValue: {
          summary: 'span',
        },
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'body',
        'headline1',
        'headline2',
        'headline3',
        'headline4',
        'headline5',
        'headline6',
      ],
      description: 'CHoose between body and different headlines',
      table: {
        defaultValue: {
          summary: 'body',
        },
      },
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
} as Meta;

export const Basic: ComponentStory<typeof Text> = args => (
  <Text {...args}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada,
    massa nec ultricies efficitur, lectus ante consequat magna, a porttitor
    massa ex ut quam.
  </Text>
);
