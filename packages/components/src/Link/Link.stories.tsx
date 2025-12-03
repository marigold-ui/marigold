import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text/Text';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'secondary'],
      description: 'Variants of the link.',
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'small'],
      description: 'Sizes of the link.',
    },
    href: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'https://marigold-ui.io' },
      },
      description: 'The URL to direct to',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    disabled: false,
    href: 'https://marigold-ui.io',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Link target="_blank" {...args}>
      Visit Marigold Docs
    </Link>
  ),
};

export const Inline: Story = {
  render: args => (
    <Text>
      To set up Tailwind CSS, please refer to the{' '}
      <Link target="_blank" variant="secondary" {...args}>
        official installation guide
      </Link>
      . Once you have completed the installation, you should create a CSS file
      with the following informations
    </Text>
  ),
};
