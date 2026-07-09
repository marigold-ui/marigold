import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Accessibility } from '@marigold/icons';
import { Stack } from '../Stack/Stack';
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
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: 'Status',
    variant: 'info',
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

Basic.test(
  'access badges paint the mask glyph without an extra access label',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // Variant order follows the render above.
    const badges = canvas.getAllByText('Status');
    const master = badges[6];
    const admin = badges[7];

    const masterGlyph = window.getComputedStyle(master, '::before');
    const adminGlyph = window.getComputedStyle(admin, '::before');

    // The glyph paints from the mask image and stays decorative; the Badge
    // gets no hidden access label because its visible label is the access
    // level itself — anything more would double-announce.
    expect(masterGlyph.maskImage).toContain('data:image/svg+xml');
    expect(master.textContent).toBe('Status');
    expect(adminGlyph.maskImage).toContain('data:image/svg+xml');
    expect(admin.textContent).toBe('Status');
  }
);
