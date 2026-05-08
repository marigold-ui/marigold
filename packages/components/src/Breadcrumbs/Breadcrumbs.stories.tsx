import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Breadcrumbs } from './Breadcrumbs';

const meta = preview.meta({
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
      control: 'select',
      options: ['auto', 1, 2, 3, 4, 5],
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    children: [],
  },
});

export const Basic = meta.story({
  render: args => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item href="https://marigold-ui.io">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb2
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
});

export const Collapsed = meta.story({
  render: args => (
    <Breadcrumbs maxVisibleItems={3} {...args}>
      <Breadcrumbs.Item href="https://marigold-ui.io">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb2
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="https://marigold-ui.io">
        Breadcrumb3
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
});

export const ManyItems = meta.story({
  render: args => (
    <Breadcrumbs maxVisibleItems={2} {...args}>
      {[...Array(30).keys()].map(i => (
        <Breadcrumbs.Item key={i} href={`https://marigold-ui.io/`}>
          Breadcrumb {i + 1}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  ),
});

export const AutoCollapse = meta.story({
  tags: ['component-test'],
  render: args => (
    <div className="border-border w-75 resize-x overflow-auto border p-2">
      <Breadcrumbs {...args}>
        <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
        <Breadcrumbs.Item href="#">Summer Festival</Breadcrumbs.Item>
        <Breadcrumbs.Item href="#">Event Details Page</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  ),

  play: async ({ canvas }) => {
    const ellipsis = await canvas.findByRole('button', {
      name: 'These breadcrumbs are hidden',
    });

    await expect(ellipsis).toBeInTheDocument();
  },
});
