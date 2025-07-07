import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { Breadcrumbs } from './BreadcrumbsList';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default'],
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
    separatorType: {
      control: 'radio',
      options: ['chevron', 'slash'],
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    maxVisibleItems: 3,
    separatorType: 'chevron',
    children: [],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs.List {...args}>
      <Breadcrumb>Home</Breadcrumb>
      <Breadcrumb>Breadcrumb1</Breadcrumb>
      <Breadcrumb>Breadcrumb2</Breadcrumb>
    </Breadcrumbs.List>
  ),
};

export const BasicWithLinks: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs.List {...args}>
      <Breadcrumb href="https://marigold-ui.io">Home</Breadcrumb>
      <Breadcrumb href="https://marigold-ui.io">Breadcrumb1</Breadcrumb>
      <Breadcrumb>Breadcrumb2</Breadcrumb>
    </Breadcrumbs.List>
  ),
};

export const CollapsedText: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs.List {...args}>
      <Breadcrumb>Home</Breadcrumb>
      <Breadcrumb>Breadcrumb1</Breadcrumb>
      <Breadcrumb>Breadcrumb2</Breadcrumb>
      <Breadcrumb>Breadcrumb3</Breadcrumb>
    </Breadcrumbs.List>
  ),
};

export const CollapsedWithLinks: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs.List {...args}>
      <Breadcrumb href="https://marigold-ui.io">Home</Breadcrumb>
      <Breadcrumb href="https://marigold-ui.io">Breadcrumb1</Breadcrumb>
      <Breadcrumb href="https://marigold-ui.io">Breadcrumb2</Breadcrumb>
      <Breadcrumb>Breadcrumb3</Breadcrumb>
    </Breadcrumbs.List>
  ),
};

export const ManyItemsBreadcrumbs: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs.List {...args}>
      {[...Array(20).keys()].map(i => (
        <Breadcrumb key={i} href={`https://marigold-ui.io/`}>
          Breadcrumb {i + 1}
        </Breadcrumb>
      ))}
    </Breadcrumbs.List>
  ),
};
