import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text';
import { SectionMessage } from './SectionMessage';

const meta = {
  title: 'Components/SectionMessage',
  component: SectionMessage,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['success', 'info', 'warning', 'error'],
      description: 'The variants of the message',
    },
  },
} satisfies Meta<typeof SectionMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Danger Zone!</SectionMessage.Title>
      <SectionMessage.Content>
        <Text>Hello, I am a simple message.</Text>
      </SectionMessage.Content>
    </SectionMessage>
  ),
};

export const MultiLineTitle: Story = {
  render: args => (
    <div className="w-60">
      <SectionMessage {...args}>
        <SectionMessage.Content>
          I am really not that good at righting copy texts, sorry.
        </SectionMessage.Content>
        <SectionMessage.Title>
          Hey! You! I am an info box! Please notice me, it might help you!
        </SectionMessage.Title>
      </SectionMessage>
    </div>
  ),
};

export const LongMessage: Story = {
  render: args => (
    <SectionMessage {...args}>
      <SectionMessage.Title>Danger Zone!</SectionMessage.Title>
      <SectionMessage.Content>
        <Text>
          In up so discovery my middleton eagerness dejection explained.
          Estimating excellence ye contrasted insensible as. Oh up unsatiable
          advantages decisively as at interested. Present suppose in esteems in
          demesne colonel it to. End horrible she landlord screened stanhill.
          Repeated offended you opinions off dissuade ask packages screened. She
          alteration everything sympathize impossible his get compliment.
          Collected few extremity suffering met had sportsman.
        </Text>
      </SectionMessage.Content>
    </SectionMessage>
  ),
};
