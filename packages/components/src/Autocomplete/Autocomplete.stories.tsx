import React from 'react';
import { Meta, ComponentStory } from '@storybook/react';

import { Container } from '../Container';
import { Autocomplete } from './Autocomplete';

export default {
  title: 'Components/Autocomplete',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the label',
      defaultValue: 'Select for favorite:',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Autocomplete> = args => (
  <Container size="small">
    <Autocomplete {...args}>
      <Autocomplete.Item key="Harry Potter">Harry Potter</Autocomplete.Item>
      <Autocomplete.Item key="Lord of the Rings">
        Lord of the Rings
      </Autocomplete.Item>
      <Autocomplete.Item key="Star Wars">Star Wars</Autocomplete.Item>
      <Autocomplete.Item key="Star Trek">Star Trek</Autocomplete.Item>
      <Autocomplete.Item key="Firefly">Firefly</Autocomplete.Item>
    </Autocomplete>
  </Container>
);
