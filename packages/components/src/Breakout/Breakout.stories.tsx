import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Aspect } from '../Aspect';
import { Container } from '../Container';
import { Image } from '../Image';
import { Text } from '../Text';
import { Breakout } from './Breakout';

const meta = {
  title: 'Components/Breakout',
  component: Breakout,
  argTypes: {
    alignX: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],

      description: 'horizontal alignment',
      table: {
        defaultValue: {
          summary: 'top',
        },
      },
    },
    alignY: {
      control: {
        type: 'select',
      },
      options: ['top', 'center', 'bottom'],
      description: 'vertical alignment',
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
    },
    height: {
      control: {
        type: 'text',
      },
      description: 'The height of the breakout',
    },
  },
  args: {
    alignY: 'top',
    alignX: 'left',
  },
} satisfies Meta<typeof Breakout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <Container align="center">
        <div className="h-[80px] w-full border border-[#ced4da]" />
        <Breakout {...args}>
          <p>Breakout</p>
        </Breakout>
        <div className="h-[80px] w-full border border-[#ced4da]" />
      </Container>
    );
  },
};

export const ExampleText: Story = {
  render: args => (
    <Container size="large" align="center">
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
      <Breakout {...args}>
        <div className="h-[100px] border border-[#ced4da]">
          BREAKOUT element inside a container
        </div>
      </Breakout>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    </Container>
  ),
};

export const ExampleFrame: Story = {
  render: args => (
    <Container align="center">
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>
      <Breakout {...args}>
        <Aspect ratio="ultrawide">
          <Image
            src="https://images.unsplash.com/photo-1511468102400-883d6ea28755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
            alt="Black Forest"
          />
        </Aspect>
      </Breakout>
      <Text>
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
    </Container>
  ),
};
