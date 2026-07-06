import { useState } from 'react';
import { Form } from 'react-aria-components/Form';
import { Key } from 'react-aria-components/Select';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Description } from '../Description/Description';
import { Inline } from '../Inline/Inline';
import { Inset } from '../Inset/Inset';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextValue } from '../TextValue/TextValue';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
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
  parameters: { chromatic: { disableSnapshot: true } },
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
});

Basic.test('Opens the dropdown', async ({ canvas, args }) => {
  const button = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

  await userEvent.click(button);

  await expect(button).toBeVisible();
});

Basic.test(
  'Opens the dropdown, skips the disabled option, and selects an item',
  async ({ canvas, step, args }) => {
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
  }
);

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

const LARGE_ITEMS = Array.from({ length: 800 }, (_, i) => ({
  id: `item-${i + 200}`,
  label: `Tenant ${i + 200} (item-${i + 200})`,
}));

// The following Basic.test cases open the listbox and re-enable the snapshot
// (the Basic story disables it) so Chromatic captures each open-list variant,
// plus a few visual checks on the rendered options.

Basic.test(
  'Opens the list with long option labels',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    render: args => (
      <Inset p={24}>
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
    ),
  },
  async ({ canvas }) => {
    await userEvent.click(canvas.getByLabelText(/Favorite character/i));

    const listbox = await canvas.findByRole('listbox');
    expect(listbox).toBeVisible();
    expect(
      within(listbox).getByText(/Mario der Dritte von Emschenhagen/)
    ).toBeVisible();
    expect(within(listbox).getByText('Luigi')).toBeVisible();
  }
);

Basic.test(
  'Opens the list grouped into sections',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    render: args => (
      <Select {...args}>
        <Select.Section header="Fantasy">
          <Select.Option id="harry-potter">
            <TextValue>Harry Potter</TextValue>
            <Description>About the boy who lived</Description>
          </Select.Option>
          <Select.Option id="lord-of-the-rings">
            <TextValue>Lord of the Rings</TextValue>
            <Description>In the lands of Middle earth</Description>
          </Select.Option>
        </Select.Section>
        <Select.Section header="Sci-Fi">
          <Select.Option id="star-wars">
            <TextValue>Star Wars</TextValue>
            <Description>
              A long time ago, in a galaxy far, far away
            </Description>
          </Select.Option>
          <Select.Option id="star-trek">
            <TextValue>Star Trek</TextValue>
            <Description>What is this</Description>
          </Select.Option>
        </Select.Section>
      </Select>
    ),
  },
  async ({ args, canvas }) => {
    await userEvent.click(
      canvas.getByLabelText(new RegExp(`${args.label}`, 'i'))
    );

    const listbox = await canvas.findByRole('listbox');
    expect(within(listbox).getByText('Fantasy')).toBeVisible();
    expect(within(listbox).getByText('Sci-Fi')).toBeVisible();
    expect(within(listbox).getByText('Harry Potter')).toBeVisible();
    expect(within(listbox).getByText('Star Trek')).toBeVisible();
  }
);

Basic.test(
  'Opens the list with option badges',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    render: args => (
      <Select
        {...args}
        label="Project Status"
        placeholder="Select a status"
        width={80}
      >
        <Select.Option id="draft">
          <Inline space={3} alignY="center">
            <TextValue>Draft</TextValue>
            <Badge variant="info">In Progress</Badge>
          </Inline>
          <Description>Work in progress</Description>
        </Select.Option>
        <Select.Option id="review">
          <Inline space={3} alignY="center">
            <Text>In Review</Text>
            <Badge variant="warning">Pending</Badge>
          </Inline>
          <Description>Awaiting review</Description>
        </Select.Option>
        <Select.Option id="approved">
          <Inline space={3} alignY="center">
            <Text>Approved</Text>
            <Badge variant="success">Ready</Badge>
          </Inline>
          <Description>Approved for release</Description>
        </Select.Option>
        <Select.Option id="published">
          <Inline space={3} alignY="center">
            <Text>Published</Text>
            <Badge variant="success">Live</Badge>
          </Inline>
          <Description>Released to public</Description>
        </Select.Option>
        <Select.Option id="archived">
          <Inline space={3} alignY="center">
            <TextValue>Archived</TextValue>
            <Badge>Inactive</Badge>
          </Inline>
          <Description>No longer active</Description>
        </Select.Option>
      </Select>
    ),
  },
  async ({ canvas }) => {
    await userEvent.click(canvas.getByLabelText(/Project Status/i));

    const listbox = await canvas.findByRole('listbox');
    expect(within(listbox).getByText('Draft')).toBeVisible();
    expect(within(listbox).getByText('In Progress')).toBeVisible();
    expect(within(listbox).getByText('Published')).toBeVisible();
  }
);

Basic.test(
  'Opens the list with user avatars',
  {
    parameters: { chromatic: { disableSnapshot: false } },
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
              <TextValue>{person.name}</TextValue>
            </Inline>
            <Description>{person.position}</Description>
          </Select.Option>
        ))}
      </Select>
    ),
  },
  async ({ canvas }) => {
    await userEvent.click(canvas.getByLabelText(/Assign to User/i));

    const listbox = await canvas.findByRole('listbox');
    expect(within(listbox).getByText('Alice Johnson')).toBeVisible();
    expect(within(listbox).getByText('Product Manager')).toBeVisible();

    // Wait for remote avatars to finish loading so the snapshot is stable.
    const imgs = await canvas.findAllByRole('img');
    await Promise.all(
      imgs.map(img => {
        if (!(img instanceof HTMLImageElement)) return Promise.resolve();
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>(resolve => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        });
      })
    );
  }
);

Basic.test(
  'Opens a large option list',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    args: {
      label: 'Tenants',
      placeholder: 'Select a tenant',
      width: 80,
    },
    render: args => (
      <Select {...args} items={LARGE_ITEMS}>
        {(item: (typeof LARGE_ITEMS)[number]) => (
          <Select.Option id={item.id}>{item.label}</Select.Option>
        )}
      </Select>
    ),
  },
  async ({ args, canvas }) => {
    await userEvent.click(
      canvas.getByLabelText(new RegExp(`${args.label}`, 'i'))
    );

    const listbox = await canvas.findByRole('listbox');
    expect(listbox).toBeVisible();
    expect(within(listbox).getByText('Tenant 200 (item-200)')).toBeVisible();
  }
);

Basic.test(
  'Sizes the trigger to the requested width',
  {
    args: {
      label: 'Favorite',
      width: 64,
    },
  },
  async ({ canvas, step }) => {
    await step('Trigger width matches the requested scale value', async () => {
      const button = canvas.getByRole('button', { name: /Favorite/i });
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      // width={64} => calc(var(--spacing) * 64) = 64 * 0.25rem = 16rem
      const expected = 16 * rem;
      const { width } = button.getBoundingClientRect();

      expect(width).toBeGreaterThan(rem * 12);
      expect(Math.abs(width - expected)).toBeLessThanOrEqual(1);
    });
  }
);

export const Multiple = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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
});

Multiple.test(
  'Selects multiple options and submits them',
  async ({ args, canvas, userEvent }) => {
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
  }
);

Multiple.test(
  'Opens the list with multiple items selected',
  // Keep the snapshot so Chromatic captures the open list with the selection.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByLabelText(new RegExp(`${args.label}`, 'i'))
    );

    const dialog = await canvas.findByRole('dialog');

    await userEvent.click(within(dialog).getByText('Star Wars'));
    await userEvent.click(within(dialog).getByText('Firefly'));

    // Multi-select keeps the list open; both options stay marked as selected.
    expect(
      within(dialog).getByRole('option', { name: 'Star Wars' })
    ).toHaveAttribute('aria-selected', 'true');
    expect(
      within(dialog).getByRole('option', { name: 'Firefly' })
    ).toHaveAttribute('aria-selected', 'true');
  }
);

// Shared trigger summary + option markup so the desktop and mobile (tray)
// `renderValue` stories exercise identical rendering on both branches.
const renderUserValue = (selected: (typeof people)[number][]) => (
  <Inline space={2} alignY="center">
    {selected.map(person => (
      <Inline key={person.id} space={1} alignY="center">
        <img
          src={person.avatar}
          alt=""
          className="size-5 rounded-full object-cover"
        />
        <Text>{person.name}</Text>
      </Inline>
    ))}
  </Inline>
);

const renderUserOption = (person: (typeof people)[number]) => (
  <Select.Option id={person.id} textValue={person.name}>
    <Inline space={2} alignY="center">
      <img
        src={person.avatar}
        alt={person.name}
        className="size-6 rounded-full object-cover"
      />
      <TextValue>{person.name}</TextValue>
    </Inline>
    <Description>{person.position}</Description>
  </Select.Option>
);

export const WithRenderValue = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Assign to',
    placeholder: 'Select a user',
    width: 80,
  },
  render: args => (
    <Select {...args} items={people} renderValue={renderUserValue}>
      {renderUserOption}
    </Select>
  ),
  play: async ({ args, canvas, step }) => {
    const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

    await step('Trigger shows placeholder when nothing selected', async () => {
      expect(within(trigger).getByText(args.placeholder!)).toBeVisible();
    });

    await step('Open the dropdown', async () => {
      await userEvent.click(trigger);

      await waitFor(() => canvas.getByRole('listbox'));
    });

    await step('Select Bob', async () => {
      const listbox = canvas.getByRole('listbox');

      await userEvent.click(within(listbox).getByText('Bob Smith'));

      await waitFor(() =>
        expect(canvas.queryByRole('listbox')).not.toBeInTheDocument()
      );
    });

    await step('Trigger uses custom renderValue', async () => {
      expect(within(trigger).getByText('Bob Smith')).toBeVisible();
      expect(
        within(trigger).queryByText('Senior Developer')
      ).not.toBeInTheDocument();
    });
  },
});

/**
 * Mobile counterpart of {@link WithRenderValue}: below the `sm` breakpoint the
 * trigger value is rendered inside the `Tray` branch (an `IconButton`) rather
 * than the desktop `Popover` branch. `renderValue` must behave identically
 * there, since both branches render the same `TriggerValue`. Runs in real
 * Firefox via the `smallScreen` viewport global.
 */
export const WithRenderValueMobile = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  args: {
    label: 'Assign to',
    placeholder: 'Select a user',
    width: 80,
  },
  render: args => (
    <Select {...args} items={people} renderValue={renderUserValue}>
      {renderUserOption}
    </Select>
  ),
  play: async ({ args, canvas, step }) => {
    // Fail loudly if the mobile viewport did not take effect, rather than
    // passing a test that never exercised the tray branch.
    expect(window.innerWidth).toBeLessThan(640);

    const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

    await step('Open the tray', async () => {
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument()
      );
    });

    await step('Select Bob from the tray', async () => {
      const dialog = canvas.getByRole('dialog');
      await userEvent.click(within(dialog).getByText('Bob Smith'));
    });

    await step('Single selection auto-closes the tray', async () => {
      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });

    await step('Trigger uses custom renderValue (no description slot)', () => {
      expect(within(trigger).getByText('Bob Smith')).toBeVisible();
      expect(
        within(trigger).queryByText('Senior Developer')
      ).not.toBeInTheDocument();
    });
  },
});

export const MultiSelectSummary = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Formatting',
    width: 64,
  },
  // No spread of `args` here: forcing `selectionMode="multiple"` narrows the
  // value type, which clashes with the loosely-typed story args.
  render: ({ label, width }) => (
    <Select
      label={label}
      width={width}
      selectionMode="multiple"
      placeholder="Formatting"
      // Opt in to a compact summary instead of listing every value. `count`
      // is correct even though these options are static children.
      renderValue={(_items, { count }) => `${count} selected`}
    >
      <Select.Option id="bold">Bold</Select.Option>
      <Select.Option id="italic">Italic</Select.Option>
      <Select.Option id="underline">Underline</Select.Option>
    </Select>
  ),
  play: async ({ args, canvas }) => {
    const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

    await userEvent.click(trigger);
    await waitFor(() => canvas.getByRole('dialog'));

    const dialog = canvas.getByRole('dialog');
    await userEvent.click(within(dialog).getByText('Bold'));
    await userEvent.click(within(dialog).getByText('Italic'));

    await userEvent.click(document.body);
    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );

    // Two selections collapse to a compact "N selected" summary, rather than
    // listing every value on the trigger.
    expect(within(trigger).getByText('2 selected')).toBeVisible();
  },
});

/**
 * Mobile counterpart of {@link MultiSelectSummary}: the `count`-based summary
 * must read correctly when the options live inside the `Tray` branch. Static
 * `<Select.Option>` children expose a `null` value, but `details.count`
 * reflects the real selection, so the summary stays accurate on mobile too.
 * Runs in real Firefox via the `smallScreen` viewport global.
 */
export const MultiSelectSummaryMobile = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  args: {
    label: 'Formatting',
    width: 64,
  },
  render: ({ label, width }) => (
    <Select
      label={label}
      width={width}
      selectionMode="multiple"
      placeholder="Formatting"
      renderValue={(_items, { count }) => `${count} selected`}
    >
      <Select.Option id="bold">Bold</Select.Option>
      <Select.Option id="italic">Italic</Select.Option>
      <Select.Option id="underline">Underline</Select.Option>
    </Select>
  ),
  play: async ({ args, canvas, step }) => {
    expect(window.innerWidth).toBeLessThan(640);

    const trigger = canvas.getByLabelText(new RegExp(`${args.label}`, 'i'));

    await step('Open the tray', async () => {
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument()
      );
    });

    await step('Select two options', async () => {
      const dialog = canvas.getByRole('dialog');
      await userEvent.click(within(dialog).getByText('Bold'));
      await userEvent.click(within(dialog).getByText('Italic'));
    });

    await step('Multi-select keeps the tray open; dismiss it', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });

    await step('Trigger shows the compact count summary', () => {
      expect(within(trigger).getByText('2 selected')).toBeVisible();
    });
  },
});

/**
 * Quick-filter pattern: a multi-select whose trigger always shows the filter's
 * dimension label ("Status") instead of the selected values, with a `Badge`
 * communicating how many options are active. This mirrors the applied-filter
 * tags shown elsewhere in a filter toolbar and keeps the trigger width stable
 * regardless of how many options are selected.
 *
 * Accessibility: the visual "Status [n]" chrome is `aria-hidden`, and a
 * `VisuallyHidden` summary gives screen-reader users an unambiguous
 * "Status, n selected" instead of a bare, unitless "2". The visible label is
 * already provided by `aria-label`, so the summary only adds the count.
 */
export const QuickFilter = meta.story({
  tags: ['component-test'],
  render: () => (
    <Select
      aria-label="Status"
      selectionMode="multiple"
      placeholder="Status"
      width={48}
      renderValue={(_items, { count }) => (
        <>
          <span aria-hidden="true">
            <Inline space={2} alignY="center">
              <Text>Status</Text>
              <Badge>{count}</Badge>
            </Inline>
          </span>
          <VisuallyHidden>{`${count} selected`}</VisuallyHidden>
        </>
      )}
    >
      <Select.Option id="active">Active</Select.Option>
      <Select.Option id="scheduled">Scheduled</Select.Option>
      <Select.Option id="draft">Draft</Select.Option>
      <Select.Option id="archived">Archived</Select.Option>
    </Select>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /Status/i });

    // Until something is selected, the trigger shows the bare label and no badge.
    expect(within(trigger).getByText('Status')).toBeVisible();
    expect(within(trigger).queryByText('2')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    await waitFor(() => canvas.getByRole('dialog'));

    const dialog = canvas.getByRole('dialog');
    await userEvent.click(within(dialog).getByText('Active'));
    await userEvent.click(within(dialog).getByText('Scheduled'));

    await userEvent.click(document.body);
    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );

    // The dimension label stays put; the badge reflects the active option count.
    expect(within(trigger).getByText('Status')).toBeVisible();
    expect(within(trigger).getByText('2')).toBeVisible();

    // The count is conveyed unambiguously to assistive tech via the accessible
    // name ("Status … 2 selected"), not just the bare "2" badge.
    expect(
      canvas.getByRole('button', { name: /2 selected/i })
    ).toBeInTheDocument();
  },
});

export const Mobile = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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
});

Mobile.test(
  'Opens the tray',
  // Keep the snapshot so Chromatic captures the open mobile tray.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas }) => {
    await userEvent.click(canvas.getByLabelText(/Favorite character/i));

    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());

    // Leave the tray open so the snapshot captures it with its options.
    expect(within(dialog).getByText('Mario')).toBeVisible();
    expect(within(dialog).getByText('Peach')).toBeVisible();
  }
);

Mobile.test('Selects an option and closes the tray', async ({ canvas }) => {
  const trigger = canvas.getByLabelText(/Favorite character/i);
  await userEvent.click(trigger);

  const dialog = await canvas.findByRole('dialog');
  await userEvent.click(within(dialog).getByText('Peach'));

  // Single selection auto-closes the tray and the trigger renders the choice.
  await waitFor(() =>
    expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
  );
  expect(trigger).toHaveTextContent('Peach');
});

// Controlled (`value`/`onChange`) mobile Select. Kept as the fixture for the
// DSTSUP-261 regression test in Select.test.tsx: selecting in the tray must
// round-trip through the controlled `value` prop.
export const MobileControlled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  globals: {
    viewport: { value: 'smallScreen' },
  },
  args: {
    label: 'Favorite character',
  },
  render: ({ label }) => {
    const [value, setValue] = useState<Key | null>(null);
    return (
      <Stack space={6}>
        <Select
          label={label}
          placeholder="Select your character"
          value={value}
          onChange={setValue}
        >
          <Select.Option id="mario">Mario</Select.Option>
          <Select.Option id="luigi">Luigi</Select.Option>
          <Select.Option id="peach">Peach</Select.Option>
          <Select.Option id="toad">Toad</Select.Option>
          <Select.Option id="yoshi">Yoshi</Select.Option>
          <Select.Option id="bowser">Bowser</Select.Option>
        </Select>
        <hr />
        <pre data-testid="value">value: {value}</pre>
      </Stack>
    );
  },
});
