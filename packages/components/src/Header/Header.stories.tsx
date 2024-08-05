import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../Container';
import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the header',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the header',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Container contentType="content" size="medium">
      <Header {...args}>Awsome Header</Header>
    </Container>
  ),
};
