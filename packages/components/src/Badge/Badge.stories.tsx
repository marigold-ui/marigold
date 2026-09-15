import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Accessibility } from '@marigold/icons';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Badge } from './Badge';

const meta = preview.meta({
  title: 'Components/Badge',
  component: Badge,
  decorators: [
    Story => (
      <div className="self-start">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: [
        'default',
        'primary',
        'success',
        'warning',
        'info',
        'error',
        'master',
        'admin',
      ],
      description: 'The variants of the badge',
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'Contents of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Status' },
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'inline'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    children: 'Status',
    variant: 'info',
    size: 'default',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <Stack space={2} alignX="left">
      <Badge {...args} variant="default" />
      <Badge {...args} variant="primary" />
      <Badge {...args} variant="success" />
      <Badge {...args} variant="warning" />
      <Badge {...args} variant="info" />
      <Badge {...args} variant="error" />
      <Badge {...args} variant="master" />
      <Badge {...args} variant="admin" />
      <Badge {...args}>
        <Accessibility />
      </Badge>
    </Stack>
  ),
});

export const Inline = meta.story({
  tags: ['component-test'],
  args: {
    variant: 'master',
    children: 'Master',
  },
  render: args => (
    <div>
      <Text>
        Default sits next to a line of text: <Badge {...args} size="default" />
      </Text>
      <Text>
        Inline sits inside one: <Badge {...args} size="inline" />
      </Text>
    </div>
  ),
});

Inline.test(
  'The inline size is drawn shorter than the default',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // Render order above: default first, inline second.
    const [defaultBadge, inlineBadge] = canvas.getAllByText('Master');

    expect(inlineBadge.getBoundingClientRect().height).toBeLessThan(
      defaultBadge.getBoundingClientRect().height
    );
  }
);

Basic.test(
  'access badges render the icon without an extra access label',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // Variant order follows the render above.
    const badges = canvas.getAllByText('Status');
    const master = badges[6];
    const admin = badges[7];

    // The icon is decorative; the Badge gets no hidden access label because
    // its visible label is the access level itself — anything more would
    // double-announce.
    expect(master.querySelector('svg')).toBeInTheDocument();
    expect(master.textContent).toBe('Status');
    expect(admin.querySelector('svg')).toBeInTheDocument();
    expect(admin.textContent).toBe('Status');
  }
);
