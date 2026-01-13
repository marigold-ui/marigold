import { Bold, Italic, Underline } from 'lucide-react';
import { Key } from 'react-aria-components';
import { useState } from 'storybook/internal/preview-api';
import { expect, fn, userEvent } from 'storybook/test';
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
  render: args => {
    const [selectedKeys, setSelectedKeys] = useState(new Set<Key>([]));

    return (
      <>
        <ToggleButtonGroup
          selectedKeys={selectedKeys}
          defaultSelectedKeys={['files']}
          onSelectionChange={id => setSelectedKeys(id)}
          {...args}
        >
          <ToggleButton id="files">Files</ToggleButton>
          <ToggleButton id="media">Media</ToggleButton>
          <ToggleButton id="more">
            <EllipsisVertical />
          </ToggleButton>
        </ToggleButtonGroup>
        <div>Selected: {Array.from(selectedKeys).join(', ')}</div>
      </>
    );
  },
  play: async ({ args, canvas }) => {
    const filesButton = canvas.getByText('Files');

    await userEvent.click(filesButton);

    await expect(args.onSelectionChange).toHaveBeenCalled();
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
