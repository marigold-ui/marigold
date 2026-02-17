import { useState } from 'react';
import { Form, Key } from 'react-aria-components';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Inline } from '../Inline/Inline';
import { Inset } from '../Inset/Inset';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Select } from './Select';

const meta = preview.meta({
  title: 'Components/Select',
  component: Select,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the select label',
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
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Require the select',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Set error state',
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
    label: 'Favorite',
    error: false,
    errorMessage: 'Whoops.',
    required: false,
    disabled: false,
    width: 64,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => {
    const [selected, setSelected] = useState<any>('');
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
        <pre data-testid="selected">selected: {selected}</pre>
      </Stack>
    );
  },
  play: async ({ canvas, step, args }) => {
    await step('Open the select dropdown', async () => {
      const button = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

      await userEvent.click(button);

      await expect(button).toBeVisible();
    });

    await step('Wait for listbox to appear', async () => {
      await waitFor(() => canvas.getByRole('listbox'));
      const listbox = canvas.getByRole('listbox');

      expect(listbox).toBeVisible();
    });

    await step('Verify disabled option has aria-disabled', async () => {
      const listbox = canvas.getByRole('listbox');
      const disabledOption = within(listbox).getByRole('option', {
        name: 'Firefly',
      });

      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });

    await step('Select an item from the list', async () => {
      const listbox = canvas.getByRole('listbox');
      const option = within(listbox).getByText('Star Wars');

      await userEvent.click(option);
    });

    await step('Verify the select is closed', async () => {
      await waitFor(() => {
        expect(canvas.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    await step('Verify the selected value is displayed', async () => {
      expect(canvas.getByText('selected: Star Wars')).toBeVisible();
    });
  },
});

export const Multiple = meta.story({
  tags: ['component-test'],
  // No args here, it breaks the types
  render: ({ label }) => {
    const [selected, setSelected] = useState<Key[]>([]);
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setSelected(formData.getAll('favorite') as Key[]);
        }}
      >
        <Stack space={6} alignX="left">
          <Select
            label={label}
            name="favorite"
            selectionMode="multiple"
            defaultValue={selected}
            width={64}
          >
            <Select.Option id="Harry Potter">Harry Potter</Select.Option>
            <Select.Option id="Lord of the Rings">
              Lord of the Rings
            </Select.Option>
            <Select.Option id="Star Wars">Star Wars</Select.Option>
            <Select.Option id="Star Trek">Star Trek</Select.Option>
            <Select.Option id="Firefly">Firefly</Select.Option>
          </Select>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <hr />
          <pre data-testid="selected">selected: {JSON.stringify(selected)}</pre>
        </Stack>
      </Form>
    );
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByLabelText(new RegExp(`${args.label}`, 'i'))
    );

    await waitFor(() => canvas.getByRole('dialog'));

    const options = await canvas.getByRole('dialog');

    await userEvent.click(within(options).getByText('Star Wars'));
    await userEvent.click(within(options).getByText('Firefly'));

    await userEvent.click(document.body);
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));

    expect(canvas.getByTestId('selected')).toHaveTextContent(
      'selected: ["Star Wars","Firefly"]'
    );
  },
});

export const LongItems = meta.story({
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
  play: async ({ canvas, step }) => {
    const button = canvas.getByLabelText(/Favorite character/i);

    await step('Open the select dropdown', async () => {
      await userEvent.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Verify listbox is visible', async () => {
      await waitFor(() => canvas.getByRole('listbox'));
      const listbox = canvas.getByRole('listbox');

      expect(listbox).toBeVisible();
    });

    await step('Dismiss select with Escape key', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.queryByRole('listbox')).not.toBeInTheDocument();
      });

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  },
});

export const LotsOfOptions = meta.story({
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
});

export const Sections = meta.story({
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
});

export const SelectedScroll = meta.story({
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
});

export const WithBadges = meta.story({
  render: args => (
    <Select
      {...args}
      label="Project Status"
      placeholder="Select a status"
      width={80}
    >
      <Select.Option id="draft">
        <Inline space={3} alignY="center">
          <Text slot="label">Draft</Text>
          <Badge variant="info">In Progress</Badge>
        </Inline>
        <Text slot="description">Work in progress</Text>
      </Select.Option>
      <Select.Option id="review">
        <Inline space={3} alignY="center">
          <Text>In Review</Text>
          <Badge variant="warning">Pending</Badge>
        </Inline>
        <Text slot="description">Awaiting review</Text>
      </Select.Option>
      <Select.Option id="approved">
        <Inline space={3} alignY="center">
          <Text>Approved</Text>
          <Badge variant="success">Ready</Badge>
        </Inline>
        <Text slot="description">Approved for release</Text>
      </Select.Option>
      <Select.Option id="published">
        <Inline space={3} alignY="center">
          <Text>Published</Text>
          <Badge variant="success">Live</Badge>
        </Inline>
        <Text slot="description">Released to public</Text>
      </Select.Option>
      <Select.Option id="archived">
        <Inline space={3} alignY="center">
          <Text slot="label">Archived</Text>
          <Badge>Inactive</Badge>
        </Inline>
        <Text slot="description">No longer active</Text>
      </Select.Option>
    </Select>
  ),
});

const people = [
  {
    id: 'alice',
    name: 'Alice Johnson',
    position: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'bob',
    name: 'Bob Smith',
    position: 'Senior Developer',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'charlie',
    name: 'Charlie Davis',
    position: 'UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

export const WithImages = meta.story({
  render: args => (
    <Select
      {...args}
      label="Assign to User"
      placeholder="Select a user"
      width={80}
    >
      {people.map(person => (
        <Select.Option key={person.id} id={person.id} textValue={person.name}>
          <Inline space={2} alignY="center">
            <img
              src={person.avatar}
              alt={person.name}
              className="size-6 rounded-full object-cover"
            />
            <Text slot="label">{person.name}</Text>
          </Inline>
          <Text slot="description">{person.position}</Text>
        </Select.Option>
      ))}
    </Select>
  ),
  play: async ({ canvas, step }) => {
    await step('Open the select dropdown', async () => {
      const button = canvas.getByLabelText(/Assign to User/i);
      await userEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Verify text slots are rendered', async () => {
      await waitFor(() => {
        expect(canvas.getByRole('listbox')).toBeInTheDocument();
      });

      const label = canvas.getByLabelText('Alice Johnson');
      const description = canvas.getByText('Product Manager');

      expect(label).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  },
});

export const Mobile = meta.story({
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => {
    return (
      <Select
        {...args}
        label="Favorite character"
        placeholder="Select your character"
      >
        <Select.Option id="mario">Mario</Select.Option>
        <Select.Option id="luigi">Luigi</Select.Option>
        <Select.Option id="peach">Peach</Select.Option>
        <Select.Option id="toad">Toad</Select.Option>
        <Select.Option id="yoshi">Yoshi</Select.Option>
        <Select.Option id="bowser">Bowser</Select.Option>
        <Select.Option id="wario">Wario</Select.Option>
        <Select.Option id="waluigi">Waluigi</Select.Option>
        <Select.Option id="daisy">Daisy</Select.Option>
        <Select.Option id="rosalina">Rosalina</Select.Option>
        <Select.Option id="donkey-kong">Donkey Kong</Select.Option>
        <Select.Option id="diddy-kong">Diddy Kong</Select.Option>
        <Select.Option id="birdo">Birdo</Select.Option>
        <Select.Option id="koopa">Koopa Troopa</Select.Option>
        <Select.Option id="shy-guy">Shy Guy</Select.Option>
        <Select.Option id="boo">Boo</Select.Option>
        <Select.Option id="goomba">Goomba</Select.Option>
        <Select.Option id="hammer-bro">Hammer Bro</Select.Option>
        <Select.Option id="lakitu">Lakitu</Select.Option>
        <Select.Option id="blooper">Blooper</Select.Option>
        <Select.Option id="king-boo">King Boo</Select.Option>
        <Select.Option id="petey">Petey Piranha</Select.Option>
        <Select.Option id="dry-bones">Dry Bones</Select.Option>
        <Select.Option id="wiggler">Wiggler</Select.Option>
        <Select.Option id="metal-mario">Metal Mario</Select.Option>
        <Select.Option id="pink-gold-peach">Pink Gold Peach</Select.Option>
        <Select.Option id="baby-mario">Baby Mario</Select.Option>
        <Select.Option id="baby-luigi">Baby Luigi</Select.Option>
        <Select.Option id="baby-peach">Baby Peach</Select.Option>
        <Select.Option id="baby-daisy">Baby Daisy</Select.Option>
        <Select.Option id="baby-rosalina">Baby Rosalina</Select.Option>
        <Select.Option id="lemmy">Lemmy Koopa</Select.Option>
        <Select.Option id="iggy">Iggy Koopa</Select.Option>
        <Select.Option id="ludwig">Ludwig von Koopa</Select.Option>
        <Select.Option id="roy">Roy Koopa</Select.Option>
      </Select>
    );
  },
  play: async ({ canvas, step }) => {
    await step('Open the tray', async () => {
      await waitFor(async () => {
        const button = canvas.getByLabelText(/Favorite character/i);

        await userEvent.click(button);

        expect(canvas.getByRole('dialog')).toBeInTheDocument();
      });
    });

    await step('Verify dialog is visible', async () => {
      const dialog = canvas.getByRole('dialog');

      await waitFor(() => expect(dialog).toBeVisible());
    });

    await step('Select an option', async () => {
      const dialog = canvas.getByRole('dialog');
      const option = within(dialog).getByText('Peach');

      await userEvent.click(option);

      expect(option.parentElement).toHaveAttribute('aria-selected', 'true');
    });

    await step('Close select with Escape key', async () => {
      const button = canvas.getByRole('button', {
        name: /Favorite character/i,
      });

      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
      });

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  },
});
