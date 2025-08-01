import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Switch } from '../Switch';
import { TextField } from '../TextField';
import { Inline } from './Inline';

const meta = {
  title: 'Components/Inline',
  component: Inline,
  argTypes: {
    space: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Set a space value. For this we use Tailwind token.',
    },
    alignX: {
      control: {
        type: 'select',
      },
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'left' },
      },
      options: ['left', 'center', 'right'],
      description: 'Set the Horizontal Alignment',
    },
    alignY: {
      control: {
        type: 'select',
      },
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      options: ['top', 'center', 'bottom'],
      description: 'Set the Vertical Alignment',
    },
  },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

const Block = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xs border border-solid border-[#364fc7] bg-[#4263eb] px-8 py-3 text-[#edf2ff] shadow-md">
    {children}
  </div>
);

export const Basic: Story = {
  tags: ['component-test'],
  args: {
    alignX: 'left',
  },
  render: args => (
    <Inline {...args}>
      <Block>Lirum</Block>
      <Block>
        Larum
        <br />
        Larum
        <br />
        Larum
      </Block>
      <Block>Löffelstiel!</Block>
    </Inline>
  ),
};

export const InputButtonAlignment: Story = {
  tags: ['component-test'],
  args: {
    alignY: 'center',
    space: 6,
  },
  render: args => {
    const [description, setDescription] = useState('');

    const toggleDescription = () => {
      if (description) {
        setDescription('');
      } else {
        setDescription('button is vertically algined with input');
      }
    };

    return (
      <Stack space={6}>
        <Switch label="toggle description" onChange={toggleDescription} />
        <Inline data-testid="inline" {...args}>
          <div className="flex-1">
            <TextField label="My label is great." description={description} />
          </div>
          <Button onClick={toggleDescription}>Submit</Button>
        </Inline>
      </Stack>
    );
  },
};
