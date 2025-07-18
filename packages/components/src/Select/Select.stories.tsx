import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import { Inset } from '../Inset';
import { Stack } from '../Stack';
import { Text } from '../Text';
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
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Require the select',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Set error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    error: false,
    required: false,
    disabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;

export const Basic: StoryObj<typeof Select> = {
  render: args => {
    const [selected, setSelected] = useState<string | number>('');
    return (
      <Stack space={6}>
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
      </Stack>
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
      <Select.Section header="Fantasy">
        <Select.Option id="harry-potter">
          <Text slot="label">Harry Potter</Text>
          <Text slot="description">About the boy who lived</Text>
        </Select.Option>
        <Select.Option id="lord-of-the-rings">
          <Text slot="label">Lord of the Rings</Text>
          <Text slot="description">In the lands of Middle earth</Text>
        </Select.Option>
      </Select.Section>
      <Select.Section header="Sci-Fi">
        <Select.Option id="star-wars">
          <Text slot="label">Start Wars</Text>
          <Text slot="description">
            A long time ago, in a galaxy far, far away
          </Text>
        </Select.Option>
        <Select.Option id="star-trek">
          <Text slot="label">Star Trek</Text>
          <Text slot="description">What is this</Text>
        </Select.Option>
      </Select.Section>
    </Select>
  ),
};

export const SelectedScroll: StoryObj<typeof Select> = {
  render: args => {
    return (
      <Select disabledKeys={['Firefly']} open {...args}>
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
