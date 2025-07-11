import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

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
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item>Breadcrumb1</Breadcrumbs.Item>
      <Breadcrumbs.Item>Breadcrumb2</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

export const BasicWithLinks: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item href="https://marigold-ui.io">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>Breadcrumb2</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

export const CollapsedText: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item>Breadcrumb1</Breadcrumbs.Item>
      <Breadcrumbs.Item>Breadcrumb2</Breadcrumbs.Item>
      <Breadcrumbs.Item>Breadcrumb3</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

export const CollapsedWithLinks: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item href="https://marigold-ui.io">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb2
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>Breadcrumb3</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

export const ManyItemsBreadcrumbs: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs {...args}>
      {[...Array(20).keys()].map(i => (
        <Breadcrumbs.Item key={i} href={`https://marigold-ui.io/`}>
          Breadcrumb {i + 1}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  ),
};
