/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Container } from '../Container';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the select label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select for favorite:' },
      },
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
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Require the select',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Set error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
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
  args: {
    label: 'Select for favorite:',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof Select> = {
  render: args => {
    const [selected, setSelected] = useState<string | number>('');
    return (
      <Container size="small">
        <Select {...args} onChange={setSelected} disabledKeys={['Firefly']}>
          <Select.Option key="Harry Potter">Harry Potter</Select.Option>
          <Select.Option key="Lord of the Rings">
            Lord of the Rings
          </Select.Option>
          <Select.Option key="Star Wars">Star Wars</Select.Option>
          <Select.Option key="Star Trek">Star Trek</Select.Option>
          <Select.Option key="Firefly">Firefly</Select.Option>
        </Select>
        <hr />
        <pre>selected: {selected}</pre>
      </Container>
    );
  },
};

export const Sections: StoryObj<typeof Select> = {
  render: args => (
    <Select {...args}>
      <Select.Section title="Fantasy">
        <Select.Option key="harry-potter">Harry Potter</Select.Option>
        <Select.Option key="lord-of-the-rings">Lord of the Rings</Select.Option>
      </Select.Section>
      <Select.Section title="Sci-Fi">
        <Select.Option key="star-wars">Star Wars</Select.Option>
        <Select.Option key="star-trek">Star Trek</Select.Option>
      </Select.Section>
    </Select>
  ),
};

export const SelectedScroll: StoryObj<typeof Select> = {
  render: args => {
    return (
      <Select disabledKeys={['Firefly']} {...args}>
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
        <Select.Option key="Warriors of Future">
          Warriors of Future
        </Select.Option>
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
  },
};
