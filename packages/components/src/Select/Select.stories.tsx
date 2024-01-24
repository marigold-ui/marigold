/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import { Meta, StoryObj } from '@storybook/react';

import { Header } from '../Header';
import { Inset } from '../Inset';
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
} satisfies Meta<typeof Select>;

export default meta;

export const Basic: StoryObj<typeof Select> = {
  render: args => {
    const [selected, setSelected] = useState<string | number>('');
    return (
      <>
        <Select
          {...args}
          onChange={setSelected}
          disabledKeys={['Firefly']}
          placeholder="Select Item"
        >
          <Select.Option id="Harry Potter">Harry Potter</Select.Option>
          <Select.Option id="Lord of the Rings">
            Lord of the Rings
          </Select.Option>
          <Select.Option id="Star Wars">Star Wars</Select.Option>
          <Select.Option id="Star Trek">Star Trek</Select.Option>
          <Select.Option id="Firefly">Firefly</Select.Option>
        </Select>
        <hr />
        <pre>selected: {selected}</pre>
      </>
    );
  },
};

export const LongItems: StoryObj<typeof Select> = {
  render: args => {
    return (
      <Inset space={24}>
        <Select
          {...args}
          label="Favorite character"
          placeholder="Select your character"
        >
          <Select.Option>
            Mario der Dritte von Emschenhagen bei Bautzen zukünftiger Retter von
            Peach und Widersacher von Bowser
          </Select.Option>
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
        </Select>
      </Inset>
    );
  },
};

export const LotsOfOptions: StoryObj<typeof Select> = {
  render: args => {
    return (
      <Inset space={24}>
        <Select
          {...args}
          label="Favorite character"
          placeholder="Select your character"
        >
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
          <Select.Option>Luigi</Select.Option>
          <Select.Option>Toad</Select.Option>
          <Select.Option>Yoshi</Select.Option>
          <Select.Option>Bowser</Select.Option>
          <Select.Option>Peach</Select.Option>
        </Select>
      </Inset>
    );
  },
};

export const Sections: StoryObj<typeof Select> = {
  render: args => (
    <Select {...args}>
      <Select.Section>
        <Header>Fantasy</Header>
        <Select.Option id="harry-potter">Harry Potter</Select.Option>
        <Select.Option id="lord-of-the-rings">Lord of the Rings</Select.Option>
      </Select.Section>
      <Select.Section>
        <Header>Sci-Fi</Header>
        <Select.Option id="star-wars">Star Wars</Select.Option>
        <Select.Option id="star-trek">Star Trek</Select.Option>
      </Select.Section>
    </Select>
  ),
};

export const SelectedScroll: StoryObj<typeof Select> = {
  render: args => {
    return (
      <Select disabledKeys={['Firefly']} {...args}>
        <Select.Option id="Harry Potter">Harry Potter</Select.Option>
        <Select.Option id="Lord of the Rings">Lord of the Rings</Select.Option>
        <Select.Option id="Star Wars">Star Wars</Select.Option>
        <Select.Option id="Star Trek">Star Trek</Select.Option>
        <Select.Option id="Avatar - Aufbruch nach Pandora">
          Avatar - Aufbruch nach Pandora
        </Select.Option>
        <Select.Option id="Avatar: The Way of Water">
          Avatar: The Way of Water
        </Select.Option>
        <Select.Option id="Black Adam">Black Adam</Select.Option>
        <Select.Option id="Black Panther: Wakanda Forever">
          Black Panther: Wakanda Forever
        </Select.Option>
        <Select.Option id="Strange World">Strange World</Select.Option>
        <Select.Option id="Project Gemini">Project Gemini</Select.Option>
        <Select.Option id="M3GAN">M3GAN</Select.Option>
        <Select.Option id="Spider-Man: No Way Home">
          Spider-Man: No Way Home
        </Select.Option>
        <Select.Option id="Jurassic World - Ein neues Zeitalter">
          Jurassic World - Ein neues Zeitalter
        </Select.Option>
        <Select.Option id="Prey">Prey</Select.Option>
        <Select.Option id="Avengers: Infinity War">
          Avengers: Infinity War
        </Select.Option>
        <Select.Option id="Venom: Let There Be Carnage">
          Venom: Let There Be Carnage
        </Select.Option>
        <Select.Option id="Lightyear">Lightyear</Select.Option>
        <Select.Option id="Warriors of Future">
          Warriors of Future
        </Select.Option>
        <Select.Option id="Moonfall">Moonfall</Select.Option>
        <Select.Option id="Nope">Nope</Select.Option>
        <Select.Option id="Project Wolf Hunting">
          Project Wolf Hunting
        </Select.Option>
        <Select.Option id="Black Panther">Black Panther</Select.Option>
        <Select.Option id="Eternals">Eternals</Select.Option>
        <Select.Option id="Interstellar">Interstellar</Select.Option>
        <Select.Option id="Avengers: Endgame">Avengers: Endgame</Select.Option>
        <Select.Option id="Dune">Dune</Select.Option>
      </Select>
    );
  },
};
