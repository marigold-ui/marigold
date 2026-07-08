import { screen } from '@testing-library/react';
import { useState } from 'react';
import { Text } from 'react-aria-components';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Center } from '../Center/Center';
import { Stack } from '../Stack/Stack';
import { Autocomplete } from './Autocomplete';

const meta = preview.meta({
  title: 'Components/Autocomplete',
  component: Autocomplete,
  decorators: [
    Story => (
      <div id="storybook-root" className="p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input disabled?',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input required?',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
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
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Select Favorite',
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    placeholder: 'Movie',
  } as const,
});

// Bad fix: Explicit type annotation prevents TS2742 by avoiding leaking inferred internal types
export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Autocomplete {...args}>
      <Autocomplete.Option id="Harry Potter" textValue="Harry Potter">
        <Text slot="label">Harry Potter</Text>
        <Text slot="description">best series ever</Text>
      </Autocomplete.Option>
      <Autocomplete.Option id="Lord of the Rings">
        Lord of the Rings
      </Autocomplete.Option>
      <Autocomplete.Option id="Star Wars">Star Wars</Autocomplete.Option>
      <Autocomplete.Option id="Star Trek">Star Trek</Autocomplete.Option>
      <Autocomplete.Option id="Firefly">Firefly</Autocomplete.Option>
    </Autocomplete>
  ),
});

Basic.test(
  'Opens and filters the menu as you type',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'ha');
    const result = canvas.getAllByText('Harry Potter')[0];

    await expect(result).toBeVisible();
  }
);

Basic.test(
  'Opens the menu on focus',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      menuTrigger: 'focus',
    },
  },
  async ({ canvas }) => {
    const input = canvas.getByRole('combobox');

    await userEvent.click(input);
    const result = await canvas.findByText('Star Wars');

    await expect(result).toBeVisible();
  }
);

Basic.test(
  'Opens the menu with the arrow key',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      menuTrigger: 'manual',
    },
  },
  async ({ canvas }) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, '{arrowdown}');
    const result = await canvas.findByText('Lord of the Rings');

    await expect(result).toBeVisible();
  }
);

export const WithSections = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Autocomplete {...args} placeholder="Pick a food">
      <Autocomplete.Section header="Veggies">
        <Autocomplete.Option id="lettuce">Lettuce</Autocomplete.Option>
        <Autocomplete.Option id="tomato">Tomato</Autocomplete.Option>
        <Autocomplete.Option id="onion">Onion</Autocomplete.Option>
      </Autocomplete.Section>
      <Autocomplete.Section header="Protein">
        <Autocomplete.Option id="ham">Ham</Autocomplete.Option>
        <Autocomplete.Option id="tuna">Tuna</Autocomplete.Option>
        <Autocomplete.Option id="tofu">Tofu</Autocomplete.Option>
      </Autocomplete.Section>
      <Autocomplete.Section header="Condiments">
        <Autocomplete.Option id="mayo">Mayonaise</Autocomplete.Option>
        <Autocomplete.Option id="mustard">Mustard</Autocomplete.Option>
        <Autocomplete.Option id="ranch">Ranch</Autocomplete.Option>
      </Autocomplete.Section>
    </Autocomplete>
  ),
});

WithSections.test(
  'Sections are visible',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas }) => {
    const input = canvas.getAllByLabelText(/Select Favorite/i)[0];

    await userEvent.type(input, 'o');
    const sectionOne = await screen.findByText('Veggies');
    const sectionTwo = await screen.findByText('Protein');

    expect(sectionOne).toBeVisible();
    expect(sectionTwo).toBeVisible();
  }
);

export const Controlled = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [submitted, setSubmitted] = useState<string | number | null>('');
    const [current, setCurrent] = useState<string>('');

    return (
      <Stack space={4}>
        <Autocomplete
          {...args}
          value={current}
          onChange={setCurrent}
          onSubmit={val => setSubmitted(val)}
          disabledKeys={['star-trek']}
        >
          <Autocomplete.Option id="harry-potter" textValue="Harry Potter">
            Harry Potter
          </Autocomplete.Option>
          <Autocomplete.Option
            id="lord-of-the-rings"
            textValue="Lord of the Rings"
          >
            Lord of the Rings
          </Autocomplete.Option>
          <Autocomplete.Option id="star-wars" textValue="Star Wars">
            Star Wars
          </Autocomplete.Option>
          <Autocomplete.Option id="star-trek" textValue="Star Trek">
            Star Trek
          </Autocomplete.Option>
          <Autocomplete.Option id="firefly">Firefly</Autocomplete.Option>
        </Autocomplete>
        <pre data-testid="currentValue">current: {current}</pre>
        <pre data-testid="submittedValue">submitted value: {submitted}</pre>
      </Stack>
    );
  },
});

Controlled.test(
  'Reflects the controlled value and submitted key',
  {
    parameters: {
      chromatic: { disableSnapshot: true },
    },
  },
  async ({ canvas }) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'h');
    await userEvent.type(input, 'a');
    await userEvent.type(input, 'r');
    await userEvent.type(input, '{arrowdown}{enter}{escape}');

    await expect(canvas.getByTestId('currentValue')).toHaveTextContent(
      'Harry Potter'
    );
    await expect(canvas.getByTestId('submittedValue')).toHaveTextContent(
      'harry-potter'
    );
  }
);

export const EmptyState = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    return (
      <Autocomplete
        {...args}
        label="Search Star Wars Characters"
        items={[]}
        allowsEmptyCollection
        emptyState={<Center>no character found</Center>}
      />
    );
  },
});

EmptyState.test(
  'Shows the empty state when no items match',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas }) => {
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'xyz');

    await userEvent.type(input, '{arrowdown}');

    const result = canvas.getByText('no character found');
    await expect(result).toBeVisible();
  }
);

export const DisabledSuggestions = meta.story({
  render: () => (
    <Autocomplete label="Label" disabledKeys={['spinach']}>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  ),
});

DisabledSuggestions.test(
  'Skips the disabled option during keyboard navigation',
  async ({ canvas }) => {
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, '{arrowdown}');

    const spinach = await canvas.findByRole('option', { name: 'Spinach' });
    const carrots = canvas.getByRole('option', { name: 'Carrots' });

    // Spinach is rendered but disabled...
    await expect(spinach).toBeVisible();
    await expect(spinach).toHaveAttribute('aria-disabled', 'true');

    // ...so arrow-down skips it and activates Carrots instead.
    await expect(carrots).toHaveAttribute('data-focused', 'true');
  }
);

const LARGE_ITEMS = Array.from({ length: 800 }, (_, i) => ({
  id: `item-${i + 200}`,
  label: `Tenant ${i + 200} (item-${i + 200})`,
}));

export const LargeDataset = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  tags: ['component-test'],
  args: {
    label: 'Tenants',
    placeholder: 'Search tenants...',
    width: 80,
  },
  render: args => (
    <Autocomplete {...args}>
      {LARGE_ITEMS.map(item => (
        <Autocomplete.Option key={item.id} id={item.id}>
          {item.label}
        </Autocomplete.Option>
      ))}
    </Autocomplete>
  ),
});

LargeDataset.test(
  'Filters and selects from a large dataset',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, step }) => {
    const input = canvas.getByRole('combobox');

    await step('Type to filter the large dataset', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'item-500');
      await waitFor(() => canvas.getByRole('listbox'));
    });

    await step('Verify filter narrowed to a single option', async () => {
      const listbox = canvas.getByRole('listbox');
      const options = within(listbox).getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Tenant 500 (item-500)');
      await userEvent.click(options[0]);
    });

    await step('Verify selected value appears in the input', async () => {
      await waitFor(() => {
        expect(input).toHaveValue('Tenant 500 (item-500)');
      });
    });
  }
);

export const Mobile = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => (
    <Autocomplete {...args}>
      <Autocomplete.Option id="inception">Inception</Autocomplete.Option>
      <Autocomplete.Option id="interstellar">Interstellar</Autocomplete.Option>
      <Autocomplete.Option id="the-dark-knight">
        The Dark Knight
      </Autocomplete.Option>
      <Autocomplete.Option id="pulp-fiction">Pulp Fiction</Autocomplete.Option>
      <Autocomplete.Option id="forrest-gump">Forrest Gump</Autocomplete.Option>
      <Autocomplete.Option id="the-matrix">The Matrix</Autocomplete.Option>
      <Autocomplete.Option id="fight-club">Fight Club</Autocomplete.Option>
      <Autocomplete.Option id="goodfellas">Goodfellas</Autocomplete.Option>
      <Autocomplete.Option id="the-shawshank-redemption">
        The Shawshank Redemption
      </Autocomplete.Option>
      <Autocomplete.Option id="the-godfather">
        The Godfather
      </Autocomplete.Option>
    </Autocomplete>
  ),
});

Mobile.test(
  'Open Tray',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas, step }) => {
    const trigger = await canvas.findByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);
    });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  }
);

Mobile.test(
  'Mobile Autocomplete interaction',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    const trigger = await canvas.findByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);
    });

    await step('Verify tray content is visible', async () => {
      const input = await canvas.findByRole('combobox');

      await waitFor(() => expect(input).toBeVisible());
    });

    await step('Select option from list', async () => {
      const option = await canvas.findByText('Inception');

      await userEvent.click(option);
    });

    await step('Close select with Escape key', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
      });

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Verify selection is displayed in trigger', async () => {
      await waitFor(() => expect(trigger).toHaveTextContent('Inception'));
    });
  }
);

Mobile.test(
  'Mobile Autocomplete keyboard navigation',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    const trigger = await canvas.findByRole('button');

    await step('Open tray by clicking trigger', async () => {
      await userEvent.click(trigger);

      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument()
      );
    });

    await step('Verify combobox input receives focus', async () => {
      const input = await canvas.findByRole('combobox');

      await waitFor(() => expect(input).toHaveFocus());
    });

    await step('Filter options by typing', async () => {
      await userEvent.keyboard('matrix');

      await waitFor(() => {
        expect(canvas.getByText('The Matrix')).toBeVisible();
        expect(canvas.queryByText('Inception')).not.toBeInTheDocument();
      });
    });

    await step('Navigate to option with arrow keys and select', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
    });

    await step('Close tray with Escape key', async () => {
      await userEvent.keyboard('{Escape}');

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });

    await step('Verify selection is displayed in trigger', async () => {
      await waitFor(() => expect(trigger).toHaveTextContent('The Matrix'));
    });
  }
);
