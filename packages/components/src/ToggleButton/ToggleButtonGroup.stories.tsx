import { Bold, Italic, Underline } from 'lucide-react';
import { Key } from 'react-aria-components';
import { useState } from 'storybook/internal/preview-api';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import preview from '../../../../config/storybook/.storybook/preview';
import { EllipsisVertical } from '../icons/EllipsisVertical';
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
        <ToggleButtonGroup
          selectedKeys={selectedKeys}
          onSelectionChange={keys => setSelectedKeys(keys)}
          {...args}
        >
          <ToggleButton id="sum">Sum</ToggleButton>
          <ToggleButton id="median">Median</ToggleButton>
          <ToggleButton id="average">Average</ToggleButton>
        </ToggleButtonGroup>
        <div data-testid="selected-keys">
          Selected: {Array.from(selectedKeys).join(', ')}
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

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
  render: args => (
    <ToggleButtonGroup
      {...args}
      selectionMode="multiple"
      size="icon"
      defaultSelectedKeys={['bold', 'italic']}
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
    </ToggleButtonGroup>
  ),
});

export default meta;
