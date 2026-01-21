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
      control: 'number',
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
    <Breadcrumbs {...args} maxVisibleItems={3}>
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
    <Breadcrumbs {...args} maxVisibleItems={3}>
      {[...Array(30).keys()].map(i => (
        <Breadcrumbs.Item key={i} href={`https://marigold-ui.io/`}>
          Breadcrumb {i + 1}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  ),
});
