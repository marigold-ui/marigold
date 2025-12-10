import { useState } from 'react';
import { alignment } from '@marigold/system';
import preview from '../../../../storybook/.storybook/preview';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { TextField } from '../TextField/TextField';
import { Block } from '../__internal__/Block';
import { Inline } from './Inline';

const meta = preview.meta({
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
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    space: 2,
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
});

export const InputButtonAlignment = meta.story({
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
});

export const Nested = meta.story({
  args: {
    space: 4,
  },
  render: args => (
    <Inline {...args}>
      <Inline space={2}>
        <Block>this</Block>
        <Block>has</Block>
        <Block>spacing</Block>
        <Block>2</Block>
      </Inline>
      <Inline space={8}>
        <Block>this</Block>
        <Block>has</Block>
        <Block>spacing</Block>
        <Block>4</Block>
      </Inline>
    </Inline>
  ),
});
