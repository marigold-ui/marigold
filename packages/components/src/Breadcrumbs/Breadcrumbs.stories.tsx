import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbsItem';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'subtle', 'bold'],
    },
    size: {
      control: 'radio',
      options: ['small', 'default', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    maxVisibleItems: {
      control: 'number',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    maxVisibleItems: 4,
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb1</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb2</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb3</BreadcrumbItem>
    </Breadcrumbs>
  ),
};
