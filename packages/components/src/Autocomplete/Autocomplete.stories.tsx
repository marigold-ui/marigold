import React, { useState } from 'react';
import { Meta, ComponentStory } from '@storybook/react';

import { Container } from '../Container';
import { Autocomplete } from './Autocomplete';
import { Divider } from '../Divider';
import { Stack } from '../Stack';

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

export const Controlled: ComponentStory<typeof Autocomplete> = args => {
  const [selected, setSelected] = useState<string | null>(null);
  const [current, setCurrent] = useState<string>('');
  return (
    <Container size="small">
      <Stack space="medium">
        <Autocomplete
          {...args}
          value={current}
          onChange={setCurrent}
          onSubmit={setSelected}
          disabledKeys={['star-trek']}
        >
          <Autocomplete.Item key="harry-potter">Harry Potter</Autocomplete.Item>
          <Autocomplete.Item key="lord-of-the-rings">
            Lord of the Rings
          </Autocomplete.Item>
          <Autocomplete.Item key="star-wars">Star Wars</Autocomplete.Item>
          <Autocomplete.Item key="star-trek">Star Trek</Autocomplete.Item>
          <Autocomplete.Item key="firefly">Firefly</Autocomplete.Item>
        </Autocomplete>
        <pre>selected: {selected}</pre>
        <pre>input value: {current}</pre>
      </Stack>
    </Container>
  );
};
