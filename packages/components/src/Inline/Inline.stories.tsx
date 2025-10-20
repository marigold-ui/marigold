import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';
import { alignment } from '@marigold/system';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { TextField } from '../TextField/TextField';
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
      options: Object.keys(alignment.horizontal.alignmentX),
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
      options: [
        ...Object.keys(alignment.horizontal.alignmentY),
        'input',
      ].flat(),
      description: 'Set the Vertical Alignment',
    },
  },
  args: {
    noWrap: undefined,
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
    alignY: 'input',
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
        <Inline {...args} noWrap>
          <TextField label="My label is great." />
          <TextField label="My label is great." description={description} />
        </Inline>
        <Inline data-testid="inline" {...args} noWrap>
          <TextField label="My label is great." description={description} />
          <Button>Submit</Button>
        </Inline>
      </Stack>
    );
  },
};
