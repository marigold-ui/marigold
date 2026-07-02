import { waitFor } from '@testing-library/react';
import { I18nProvider } from 'react-aria-components';
import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = preview.meta({
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error state',
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
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    orientation: {
      control: {
        type: 'radio',
      },
      options: ['vertical', 'horizontal'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
      description: 'Sets the direction of the checkbox group',
    },
  },
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    label: 'This is a label',
    readOnly: false,
    disabled: false,
    required: false,
    error: false,
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => {
    return (
      <>
        <Checkbox.Group
          {...args}
          description="Choose your Options"
          errorMessage="Oh no"
          defaultValue={['tomato', 'onions']}
        >
          <Checkbox value="ham" data-testid="one" label="Ham" />
          <Checkbox value="salami" data-testid="two" disabled label="Salami" />
          <Checkbox value="cheese" data-testid="three" label="Cheese" />
          <Checkbox value="tomato" data-testid="four" label="Tomato" />
          <Checkbox value="cucumber" data-testid="five" label="Cucumber" />
          <Checkbox value="onions" data-testid="six" label="Onions" />
        </Checkbox.Group>
      </>
    );
  },
});

Basic.test(
  'Description is set and accessible',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: {
      onChange: fn(),
    },
  },
  async ({ canvas, args }) => {
    let cheese = canvas.getByRole('checkbox', { name: /cheese/i });
    let tomato = canvas.getByRole('checkbox', { name: /tomato/i });
    let cucumber = canvas.getByRole('checkbox', { name: /cucumber/i });
    let onions = canvas.getByRole('checkbox', { name: /onions/i });

    await userEvent.click(cheese);
    await userEvent.click(tomato);
    await userEvent.click(cucumber);
    await userEvent.click(onions);

    await expect(cheese).toBeChecked();
    await expect(cucumber).toBeChecked();
    await expect(tomato).not.toBeChecked();
    await expect(onions).not.toBeChecked();
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledTimes(4);
    });
  }
);

export const Error = meta.story({
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: args => {
    return (
      <Checkbox.Group
        {...args}
        description="my desc"
        error
        errorMessage="This is an error"
      >
        <Checkbox value="ham" label="Ham" />
        <Checkbox value="salami" disabled label="Salami" />
        <Checkbox value="cheese" label="Cheese" />
        <Checkbox value="tomato" label="Tomate" />
        <Checkbox value="cucumber" label="Cucumber" />
        <Checkbox value="onions" label="Onions" />
      </Checkbox.Group>
    );
  },
});

export const CollapseAt = meta.story({
  tags: ['component-test'],
  args: {
    collapseAt: 5,
  },
  render: args => {
    return (
      <I18nProvider locale="en-US">
        <Checkbox.Group {...args}>
          <Checkbox value="ham" data-testid="one" label="Ham" />
          <Checkbox value="salami" data-testid="two" label="Salami" />
          <Checkbox value="cheese" data-testid="three" label="Cheese" />
          <Checkbox value="tomato" data-testid="four" label="Tomato" />
          <Checkbox value="cucumber" data-testid="five" label="Cucumber" />
          <Checkbox value="onions" data-testid="six" label="Onions" />
          <Checkbox value="pepper" data-testid="seven" label="Pepper" />
          <Checkbox value="mushrooms" data-testid="eight" label="Mushrooms" />
          <Checkbox value="olives" data-testid="nine" label="Olives" />
          <Checkbox value="lettuce" data-testid="ten" label="Lettuce" />
        </Checkbox.Group>
      </I18nProvider>
    );
  },
});

CollapseAt.test('Show more options', async ({ canvas }) => {
  await userEvent.click(canvas.getByText('Show 5 more'));

  expect(canvas.getByTestId('six')).toBeVisible();
  expect(canvas.getByTestId('seven')).toBeVisible();
  expect(canvas.getByTestId('eight')).toBeVisible();
  expect(canvas.getByTestId('nine')).toBeVisible();
  expect(canvas.getByTestId('ten')).toBeVisible();
  expect(canvas.getByText('Show 5 less')).toBeVisible();
});

CollapseAt.test('Show less options', async ({ canvas }) => {
  expect(canvas.queryByTestId('six')).not.toBeVisible();
  expect(canvas.queryByTestId('seven')).not.toBeVisible();
  expect(canvas.queryByTestId('eight')).not.toBeVisible();
  expect(canvas.queryByTestId('nine')).not.toBeVisible();
  expect(canvas.queryByTestId('ten')).not.toBeVisible();
  expect(canvas.getByText('Show 5 more')).toBeVisible();
});
