import { screen } from '@testing-library/react';
import { useState } from 'react';
import { Text } from 'react-aria-components';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { useAsyncList } from '@react-stately/data';
import { Center } from '../Center/Center';
import { Stack } from '../Stack/Stack';
import { Autocomplete } from './Autocomplete';

const meta = preview.meta({
  title: 'Components/Autocomplete',
  component: Autocomplete,
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
export const Basic: any = meta.story({
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
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');
    const description = canvas.getAllByText(
      'This is a help text description'
    )[0];
    const clearButton = screen.getByLabelText(
      /Clear search|Suche zurücksetzen/i
    );

    await userEvent.click(input);
    await userEvent.type(input, 'sp');
    await userEvent.click(clearButton);

    await expect(input).toHaveFocus();
    await expect(input).toBeVisible();
    await expect(description).toBeInTheDocument();
    await expect(clearButton).toBeInTheDocument();
    await expect(input).toHaveValue('');
  },
});

export const WithSections: any = meta.story({
  tags: ['component-test'],
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
  play: async ({ canvas }: any) => {
    const input = canvas.getAllByLabelText(/Select Favorite/i)[0];

    await userEvent.type(input, 'o');
    const sectionOne = await screen.findByText('Veggies');
    const sectionTwo = await screen.findByText('Protein');

    expect(sectionOne).toBeVisible();
    expect(sectionTwo).toBeVisible();
  },
});

export const Controlled: any = meta.story({
  tags: ['component-test'],
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
  play: async ({ canvas }: any) => {
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
  },
});

export const Async: any = meta.story({
  render: args => {
    const { items, filterText, setFilterText } = useAsyncList<{ name: string }>(
      {
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
      }
    );

    return (
      <Autocomplete
        {...args}
        label="Search Star Wars Characters"
        items={items}
        value={filterText}
        onChange={setFilterText}
        allowsEmptyCollection
        emptyState={
          <Center data-testid="empty-state">no character found</Center>
        }
      >
        {(item: any) => (
          <Autocomplete.Option id={item.name}>{item.name}</Autocomplete.Option>
        )}
      </Autocomplete>
    );
  },
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'xyz');

    await userEvent.type(input, '{arrowdown}');

    const result = await canvas.getByTestId('empty-state');
    await expect(result).toBeVisible();
  },
});

export const InputMenuTrigger: any = meta.story({
  ...Basic.input,
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'ha');
    const result = canvas.getAllByText('Harry Potter')[0];

    await expect(result).toBeVisible();
  },
});

export const FocusMenuTrigger: any = meta.story({
  ...Basic.input,
  args: {
    menuTrigger: 'focus',
  },
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');

    await userEvent.click(input);
    const result = await canvas.findByText('Star Wars');

    await expect(result).toBeVisible();
  },
});

export const ManualMenuTrigger: any = meta.story({
  ...Basic.input,
  args: {
    menuTrigger: 'input',
  },
  play: async ({ canvas }: any) => {
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, '{arrowdown}');
    const result = await canvas.findByText('Lord of the Rings');

    await expect(result).toBeVisible();
  },
});

export const DisabledSuggestions: any = meta.story({
  render: () => (
    <Autocomplete label="Label" disabledKeys={['spinach']}>
      <Autocomplete.Option id="spinach">Spinach</Autocomplete.Option>
      <Autocomplete.Option id="carrots">Carrots</Autocomplete.Option>
      <Autocomplete.Option id="broccoli">Broccoli</Autocomplete.Option>
      <Autocomplete.Option id="garlic">Garlic</Autocomplete.Option>
    </Autocomplete>
  ),
});

export const Mobile: any = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'mobile1' },
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
  'Mobile Autocomplete interaction',
  async ({ canvas, step }: any) => {
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
  async ({ canvas, step }: any) => {
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

      await waitFor(() => expect(canvas.getByText('The Matrix')).toBeVisible());
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
