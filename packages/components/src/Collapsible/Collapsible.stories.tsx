import { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
};

export default meta;

export const Basic: StoryObj<typeof Collapsible> = {
  render: args => (
    <Collapsible {...args}>
      <Collapsible.Trigger>Click me</Collapsible.Trigger>
      <Collapsible.Content>
        This is the content of the collapsible component.
      </Collapsible.Content>
    </Collapsible>
  ),
};
