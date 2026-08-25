import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Stack } from '@marigold/components';
import { Text } from '../Text/Text';
import { Link } from './Link';

const meta = preview.meta({
  title: 'Components/Link',
  component: Link,
  parameters: {
    surface: 'both',
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['default', 'secondary', 'master', 'admin'],
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
});

export const Basic = meta.story({
  render: args => (
    <Stack space={4}>
      <Link target="_blank" {...args}>
        Visit Marigold Docs
      </Link>
      <Link target="_blank" size="small" {...args}>
        Visit Marigold Docs (small size)
      </Link>
    </Stack>
  ),
});

export const Inline = meta.story({
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
});

export const AccessVariants = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space={2} alignX="left">
      <Link variant="master" href="#">
        verschieben
      </Link>
      <Link variant="admin" href="#">
        freigeben
      </Link>
    </Stack>
  ),
});

AccessVariants.test(
  'access links render the decorative icon and the hidden access label',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // The `name` filter asserts the accessible name: the visible label plus
    // the hidden access label. `getAllBy` because the story renders on both
    // surfaces (`surface: 'both'`).
    const [master] = canvas.getAllByRole('link', {
      name: 'verschieben Master',
    });
    const [admin] = canvas.getAllByRole('link', { name: 'freigeben Admin' });

    expect(master.querySelector('svg')).toBeInTheDocument();
    expect(admin.querySelector('svg')).toBeInTheDocument();
  }
);

export const NewTab = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space={2} alignX="left">
      <Link href="https://marigold-ui.io" target="_blank">
        Marigold docs
      </Link>
      <Link href="https://marigold-ui.io" target="_blank" rel="noreferrer">
        Release notes
      </Link>
      <Link href="https://marigold-ui.io">Same tab</Link>
      <Link href="#" variant="master" target="_blank">
        Support console
      </Link>
    </Stack>
  ),
});

NewTab.test(
  'warns about the new tab and defaults rel to noopener',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas }) => {
    const [link] = canvas.getAllByRole('link', {
      name: 'Marigold docs opens in a new tab',
    });

    expect(link.querySelector('svg')).toBeInTheDocument();
    expect(link).toHaveAttribute('rel', 'noopener');
  }
);

NewTab.test(
  'leaves a consumer-supplied rel alone',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const [link] = canvas.getAllByRole('link', {
      name: 'Release notes opens in a new tab',
    });

    expect(link).toHaveAttribute('rel', 'noreferrer');
  }
);

NewTab.test(
  'leaves a same-tab link unmarked',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // Deriving from `target` must not mark every link in the system.
    const [link] = canvas.getAllByRole('link', { name: 'Same tab' });

    expect(link.querySelector('svg')).not.toBeInTheDocument();
    expect(link).not.toHaveAttribute('rel');
  }
);

NewTab.test(
  'stacks the warning after an access mark',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const [link] = canvas.getAllByRole('link', {
      name: 'Support console Master opens in a new tab',
    });

    expect(link.querySelectorAll('svg')).toHaveLength(2);
  }
);
