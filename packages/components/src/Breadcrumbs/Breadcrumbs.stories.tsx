import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../Link';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbsItem';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
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
    maxVisibleItems: 3,
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
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb1</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb2</BreadcrumbItem>
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
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Breadcrumb1</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb2</BreadcrumbItem>
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
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb1</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb2</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb3</BreadcrumbItem>
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
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Breadcrumb1</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Breadcrumb2</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb3</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const EmptyBreadcrumbs: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => <Breadcrumbs {...args} />,
};

export const ManyItemsBreadcrumbs: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs {...args}>
      {[...Array(20).keys()].map(i => (
        <BreadcrumbItem key={i}>
          <Link href={`https://marigold-ui.io/`}>Breadcrumb {i + 1}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  ),
};

export const DisabledBreadcrumbs: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs {...args} disabled>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Breadcrumb1</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Breadcrumb2</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb3</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const EnabledBreadcrumbs: Story = {
  parameters: {
    theme: 'rui',
  },
  tags: ['component-test'],
  render: args => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Breadcrumb1</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="https://marigold-ui.io">Breadcrumb2</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb3</BreadcrumbItem>
    </Breadcrumbs>
  ),
};
