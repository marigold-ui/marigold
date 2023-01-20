import React, { useState } from 'react';
import { Meta, ComponentStory } from '@storybook/react';
import { Select } from './Select';
import { Container } from '../Container';

import isChromatic from 'chromatic/isChromatic';

export default {
  title: 'Components/Select',
  chromatic: { delay: 300 },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the select label',
      defaultValue: 'Select for favorite:',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Set the field description',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the select',
      defaultValue: false,
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Require the select',
      defaultValue: false,
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Set error state',
      defaultValue: false,
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Select> = args => {
  const [selected, setSelected] = useState<string | number>('');
  return (
    <Container size="small">
      <Select
        {...args}
        onSelectionChange={setSelected}
        disabledKeys={['Firefly']}
      >
        <Select.Option key="Harry Potter">Harry Potter</Select.Option>
        <Select.Option key="Lord of the Rings">Lord of the Rings</Select.Option>
        <Select.Option key="Star Wars">Star Wars</Select.Option>
        <Select.Option key="Star Trek">Star Trek</Select.Option>
        <Select.Option key="Firefly">Firefly</Select.Option>
      </Select>
      <hr />
      <pre>selected: {selected}</pre>
    </Container>
  );
};

export const Sections: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Select.Section title="Fantasy">
      <Select.Option>Harry Potter</Select.Option>
      <Select.Option>Lord of the Rings</Select.Option>
    </Select.Section>
    <Select.Section title="Sci-Fi">
      <Select.Option>Star Wars</Select.Option>
      <Select.Option>Star Trek</Select.Option>
    </Select.Section>
  </Select>
);

export const SelectedScroll = () => {
  return (
    <Select disabledKeys={['Firefly']}>
      <Select.Option key="Harry Potter">Harry Potter</Select.Option>
      <Select.Option key="Lord of the Rings">Lord of the Rings</Select.Option>
      <Select.Option key="Star Wars">Star Wars</Select.Option>
      <Select.Option key="Star Trek">Star Trek</Select.Option>
      <Select.Option key="Avatar - Aufbruch nach Pandora">
        Avatar - Aufbruch nach Pandora
      </Select.Option>
      <Select.Option key="Avatar: The Way of Water">
        Avatar: The Way of Water
      </Select.Option>
      <Select.Option key="Black Adam">Black Adam</Select.Option>
      <Select.Option key="Black Panther: Wakanda Forever">
        Black Panther: Wakanda Forever
      </Select.Option>
      <Select.Option key="Strange World">Strange World</Select.Option>
      <Select.Option key="Project Gemini">Project Gemini</Select.Option>
      <Select.Option key="M3GAN">M3GAN</Select.Option>
      <Select.Option key="Spider-Man: No Way Home">
        Spider-Man: No Way Home
      </Select.Option>
      <Select.Option key="Jurassic World - Ein neues Zeitalter">
        Jurassic World - Ein neues Zeitalter
      </Select.Option>
      <Select.Option key="Prey">Prey</Select.Option>
      <Select.Option key="Avengers: Infinity War">
        Avengers: Infinity War
      </Select.Option>
      <Select.Option key="Venom: Let There Be Carnage">
        Venom: Let There Be Carnage
      </Select.Option>
      <Select.Option key="Lightyear">Lightyear</Select.Option>
      <Select.Option key="Warriors of Future">Warriors of Future</Select.Option>
      <Select.Option key="Moonfall">Moonfall</Select.Option>
      <Select.Option key="Nope">Nope</Select.Option>
      <Select.Option key="Project Wolf Hunting">
        Project Wolf Hunting
      </Select.Option>
      <Select.Option key="Black Panther">Black Panther</Select.Option>
      <Select.Option key="Eternals">Eternals</Select.Option>
      <Select.Option key="Interstellar">Interstellar</Select.Option>
      <Select.Option key="Avengers: Endgame">Avengers: Endgame</Select.Option>
      <Select.Option key="Dune">Dune</Select.Option>
    </Select>
  );
};

export const SelectOpen: ComponentStory<typeof Select> = args => (
  <Select open={true} {...args}>
    <Select.Section title="Fantasy">
      <Select.Option>Harry Potter</Select.Option>
      <Select.Option>Lord of the Rings</Select.Option>
    </Select.Section>
    <Select.Section title="Sci-Fi">
      <Select.Option>Star Wars</Select.Option>
      <Select.Option>Star Trek</Select.Option>
    </Select.Section>
  </Select>
);

SelectOpen.parameters = {
  // Set the viewports in Chromatic at a story level.
  chromatic: { viewports: [320, 1200] },

  theme: isChromatic() ? 'b2b' : 'stacked',
};
