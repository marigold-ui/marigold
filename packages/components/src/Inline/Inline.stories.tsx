import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { Inline } from './Inline';

const meta = {
  title: 'Components/Inline',
  component: Inline,
  argTypes: {
    space: {
      control: {
        type: 'text',
      },
      description: 'Set a space value. For this we use Tailwind token.',
    },
    alignX: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'Set the Horizontal Alignment',
    },
    alignY: {
      control: {
        type: 'select',
      },
      options: ['top', 'center', 'bottom'],
      description: 'Set the Vertical Alignment',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Block = ({ children }: { children: ReactNode }) => (
  <div className="rounded border border-solid border-[#364fc7] bg-[#4263eb] px-8 py-3 text-[#edf2ff] shadow-md">
    {children}
  </div>
);

export const Basic: Story = {
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
