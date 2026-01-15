import { Bold, Italic, Underline } from 'lucide-react';
import { useState } from 'react';
import { Key } from 'react-aria-components';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { ToggleButton } from './ToggleButton';
import { ToggleButtonGroup } from './ToggleButtonGroup';

const meta = preview.meta({
  title: 'Components/ToggleButtonGroup',
  component: ToggleButtonGroup,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the toggle button group is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectionMode: {
      control: {
        type: 'radio',
      },
      description: 'Selection mode of the toggle button group',
      options: ['single', 'multiple', 'none'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'single' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the toggle buttons',
      options: ['default', 'small', 'icon'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    disabled: false,
    size: 'default',
    selectionMode: 'single',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {},
  render: args => {
    const [selectedKeys, setSelectedKeys] = useState(new Set<Key>(['sum']));

    return (
      <>
        <ToggleButton.Group
          {...args}
          selectedKeys={selectedKeys}
          onSelectionChange={keys => setSelectedKeys(keys)}
        >
          <ToggleButton id="sum">Sum</ToggleButton>
          <ToggleButton id="median">Median</ToggleButton>
          <ToggleButton id="average">Average</ToggleButton>
        </ToggleButton.Group>
        <div data-testid="selected-keys">
          Selected: {Array.from(selectedKeys).join(', ')}
        </div>
      </>
    );
  },
  play: async ({ canvas, step }) => {
    await step('Initial state - sum is selected', async () => {
      expect(canvas.getByTestId('selected-keys')).toHaveTextContent(
        'Selected: sum'
      );
    });

    await step('Click median button', async () => {
      await userEvent.click(canvas.getByText('Median'));

      await waitFor(() => {
        expect(canvas.getByTestId('selected-keys')).toHaveTextContent(
          'Selected: median'
        );
      });
    });

    await step('Click sum button again', async () => {
      const sumButton = canvas.getByText('Sum');

      await userEvent.click(sumButton);

      await waitFor(() => {
        expect(canvas.getByTestId('selected-keys')).toHaveTextContent(
          'Selected: sum'
        );
      });
    });
  },
});

export const MultipleSelection = meta.story({
  tags: ['component-test'],
  render: args => (
    <ToggleButton.Group
      {...args}
      selectionMode="multiple"
      size="icon"
      defaultSelectedKeys={['bold']}
    >
      <ToggleButton key="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton key="italic">
        <Italic />
      </ToggleButton>
      <ToggleButton key="underline">
        <Underline />
      </ToggleButton>
    </ToggleButton.Group>
  ),
  play: async ({ canvas, step }) => {
    await step('Initial state - bold is selected', async () => {
      const boldButton = canvas.getByRole('button', { name: 'bold' });

      expect(boldButton).toHaveAttribute('data-selected', 'true');
    });

    await step('Click italic button to select it too', async () => {
      const italicButton = canvas.getByRole('button', { name: 'italic' });

      await userEvent.click(italicButton);

      await waitFor(() => {
        expect(italicButton).toHaveAttribute('data-selected', 'true');
      });
    });

    await step('Both bold and italic are selected', async () => {
      const boldButton = canvas.getByRole('button', { name: 'bold' });
      const italicButton = canvas.getByRole('button', { name: 'italic' });

      expect(boldButton).toHaveAttribute('data-selected', 'true');
      expect(italicButton).toHaveAttribute('data-selected', 'true');
    });
  },
});

export const DisabledButton = meta.story({
  tags: ['component-test'],
  render: args => {
    const [selectedKeys, setSelectedKeys] = useState(new Set<Key>());

    return (
      <ToggleButton.Group
        {...args}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <ToggleButton id="option1">Option 1</ToggleButton>
        <ToggleButton id="option2" disabled>
          Option 2
        </ToggleButton>
        <ToggleButton id="option3">Option 3</ToggleButton>
      </ToggleButton.Group>
    );
  },
  play: async ({ canvas, step }) => {
    await step('Option 2 is disabled', async () => {
      const option1 = canvas.getByText('Option 1');
      const option2 = canvas.getByText('Option 2');
      const option3 = canvas.getByText('Option 3');

      expect(option2).toBeDisabled();
      expect(option1).not.toBeDisabled();
      expect(option3).not.toBeDisabled();
    });

    await step('Clicking disabled button does nothing', async () => {
      const option2 = canvas.getByText('Option 2');

      await userEvent.click(option2);

      expect(option2).not.toHaveAttribute('data-selected');
    });

    await step('Other buttons still work', async () => {
      const option1 = canvas.getByText('Option 1');

      await userEvent.click(option1);

      expect(option1).toHaveAttribute('data-selected', 'true');
    });
  },
});

export default meta;
