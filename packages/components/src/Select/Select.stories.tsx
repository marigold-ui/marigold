/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import { Meta, StoryObj } from '@storybook/react';

import { Inset } from '../Inset';
import { Select as NewSelect } from './Select';
import { Select } from './_Select';

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

export const Example: StoryObj<typeof NewSelect> = {
  render: args => {
    const [selected, setSelected] = useState<string | number>('');
    return (
      <>
        <NewSelect
          {...args}
          onSelectionChange={setSelected}
          disabledKeys={['Firefly']}
        >
          <NewSelect.Option key="Harry Potter">Harry Potter</NewSelect.Option>
          <NewSelect.Option key="Lord of the Rings">
            Lord of the Rings
          </NewSelect.Option>
          <NewSelect.Option key="Star Wars">Star Wars</NewSelect.Option>
          <NewSelect.Option key="Star Trek">Star Trek</NewSelect.Option>
          <NewSelect.Option key="Firefly">Firefly</NewSelect.Option>
        </NewSelect>
        <hr />
        <pre>selected: {selected}</pre>
      </>
    );
  },
};

export const Basic: StoryObj<typeof Select> = {
  render: args => {
    const [selected, setSelected] = useState<string | number>('');
    return (
      <>
        <Select {...args} onChange={setSelected} disabledKeys={['Firefly']}>
          <NewSelect.Option key="Harry Potter">Harry Potter</NewSelect.Option>
          <NewSelect.Option key="Lord of the Rings">
            Lord of the Rings
          </NewSelect.Option>
          <NewSelect.Option key="Star Wars">Star Wars</NewSelect.Option>
          <NewSelect.Option key="Star Trek">Star Trek</NewSelect.Option>
          <NewSelect.Option key="Firefly">Firefly</NewSelect.Option>
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
          <NewSelect.Option>
            Mario der Dritte von Emschenhagen bei Bautzen zukünftiger Retter von
            Peach und Widersacher von Bowser
          </NewSelect.Option>
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
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
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
          <NewSelect.Option>Luigi</NewSelect.Option>
          <NewSelect.Option>Toad</NewSelect.Option>
          <NewSelect.Option>Yoshi</NewSelect.Option>
          <NewSelect.Option>Bowser</NewSelect.Option>
          <NewSelect.Option>Peach</NewSelect.Option>
        </Select>
      </Inset>
    );
  },
};

export const Sections: StoryObj<typeof Select> = {
  render: args => (
    <Select {...args}>
      <Select.Section title="Fantasy">
        <NewSelect.Option key="harry-potter">Harry Potter</NewSelect.Option>
        <NewSelect.Option key="lord-of-the-rings">
          Lord of the Rings
        </NewSelect.Option>
      </Select.Section>
      <Select.Section title="Sci-Fi">
        <NewSelect.Option key="star-wars">Star Wars</NewSelect.Option>
        <NewSelect.Option key="star-trek">Star Trek</NewSelect.Option>
      </Select.Section>
    </Select>
  ),
};

export const SelectedScroll: StoryObj<typeof Select> = {
  render: args => {
    return (
      <Select disabledKeys={['Firefly']} {...args}>
        <NewSelect.Option key="Harry Potter">Harry Potter</NewSelect.Option>
        <NewSelect.Option key="Lord of the Rings">
          Lord of the Rings
        </NewSelect.Option>
        <NewSelect.Option key="Star Wars">Star Wars</NewSelect.Option>
        <NewSelect.Option key="Star Trek">Star Trek</NewSelect.Option>
        <NewSelect.Option key="Avatar - Aufbruch nach Pandora">
          Avatar - Aufbruch nach Pandora
        </NewSelect.Option>
        <NewSelect.Option key="Avatar: The Way of Water">
          Avatar: The Way of Water
        </NewSelect.Option>
        <NewSelect.Option key="Black Adam">Black Adam</NewSelect.Option>
        <NewSelect.Option key="Black Panther: Wakanda Forever">
          Black Panther: Wakanda Forever
        </NewSelect.Option>
        <NewSelect.Option key="Strange World">Strange World</NewSelect.Option>
        <NewSelect.Option key="Project Gemini">Project Gemini</NewSelect.Option>
        <NewSelect.Option key="M3GAN">M3GAN</NewSelect.Option>
        <NewSelect.Option key="Spider-Man: No Way Home">
          Spider-Man: No Way Home
        </NewSelect.Option>
        <NewSelect.Option key="Jurassic World - Ein neues Zeitalter">
          Jurassic World - Ein neues Zeitalter
        </NewSelect.Option>
        <NewSelect.Option key="Prey">Prey</NewSelect.Option>
        <NewSelect.Option key="Avengers: Infinity War">
          Avengers: Infinity War
        </NewSelect.Option>
        <NewSelect.Option key="Venom: Let There Be Carnage">
          Venom: Let There Be Carnage
        </NewSelect.Option>
        <NewSelect.Option key="Lightyear">Lightyear</NewSelect.Option>
        <NewSelect.Option key="Warriors of Future">
          Warriors of Future
        </NewSelect.Option>
        <NewSelect.Option key="Moonfall">Moonfall</NewSelect.Option>
        <NewSelect.Option key="Nope">Nope</NewSelect.Option>
        <NewSelect.Option key="Project Wolf Hunting">
          Project Wolf Hunting
        </NewSelect.Option>
        <NewSelect.Option key="Black Panther">Black Panther</NewSelect.Option>
        <NewSelect.Option key="Eternals">Eternals</NewSelect.Option>
        <NewSelect.Option key="Interstellar">Interstellar</NewSelect.Option>
        <NewSelect.Option key="Avengers: Endgame">
          Avengers: Endgame
        </NewSelect.Option>
        <NewSelect.Option key="Dune">Dune</NewSelect.Option>
      </Select>
    );
  },
};
