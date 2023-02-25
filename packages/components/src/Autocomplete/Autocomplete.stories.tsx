import React, { Key, useState } from 'react';
import { Meta, ComponentStory } from '@storybook/react';

import { Container } from '../Container';
import { Stack } from '../Stack';
import { Autocomplete } from './Autocomplete';
import { useAsyncList } from '@react-stately/data';

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
    menuTrigger: {
      control: {
        type: 'select',
      },
      options: ['focus', 'input', 'manual'],
      description: 'Set which interaction shows the menu',
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
  const [selected, setSelected] = useState<[Key | null, string | null]>([
    '',
    '',
  ]);
  const [current, setCurrent] = useState<string>('');
  return (
    <Container size="small">
      <Stack space="medium">
        <Autocomplete
          {...args}
          value={current}
          onChange={setCurrent}
          onSubmit={(key, val) => setSelected([key, val])}
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
        <pre>current: {current}</pre>
        <pre>
          submitted: (key: {selected[0]}, value: {selected[1]})
        </pre>
      </Stack>
    </Container>
  );
};

export const Async: ComponentStory<typeof Autocomplete> = args => {
  const list = useAsyncList<{ name: string }>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Autocomplete
      label="Search Star Wars Characters"
      items={list.items}
      value={list.filterText}
      onChange={list.setFilterText}
    >
      {(item: any) => (
        <Autocomplete.Item key={item.name}>{item.name}</Autocomplete.Item>
      )}
    </Autocomplete>
  );
};
