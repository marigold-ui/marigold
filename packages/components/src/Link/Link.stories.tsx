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
      <Link {...args}>Visit Marigold Docs</Link>
      <Link size="small" {...args}>
        Visit Marigold Docs (small size)
      </Link>
    </Stack>
  ),
});

export const Inline = meta.story({
  render: args => (
    <Text>
      To set up Tailwind CSS, please refer to the{' '}
      <Link variant="secondary" {...args}>
        official installation guide
      </Link>
      . Once you have completed the installation, see the{' '}
      <Link variant="secondary" href="https://marigold-ui.io" target="_blank">
        release notes
      </Link>{' '}
      for what changed.
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

    expect(master.querySelector('.access-icon')).toBeInTheDocument();
    expect(admin.querySelector('.access-icon')).toBeInTheDocument();
  }
);

export const NewTab = meta.story({
  tags: ['component-test'],
  args: { target: '_blank' },
  render: args => (
    <Stack space={2} alignX="left">
      {/* Only this one is args-driven, so a test can vary props without a
          story of its own. */}
      <Link {...args}>Marigold docs</Link>
      <Link href="https://marigold-ui.io" target="_blank" size="small">
        Marigold docs (small size)
      </Link>
      <Link href="https://marigold-ui.io">Same tab</Link>
      <Link href="#" variant="master" target="_blank">
        Support console
      </Link>
    </Stack>
  ),
});

NewTab.test(
  'warns about the new window and defaults rel to noopener',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const [link] = canvas.getAllByRole('link', {
      name: 'Marigold docs opens in a new window',
    });

    expect(link.querySelector('.new-window-icon')).toBeInTheDocument();
    expect(link).toHaveAttribute('rel', 'noopener');
  }
);

NewTab.test(
  'leaves a same-tab link unmarked',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // Deriving from `target` must not mark every link in the system.
    const [link] = canvas.getAllByRole('link', { name: 'Same tab' });

    expect(link.querySelector('.new-window-icon')).not.toBeInTheDocument();
    expect(link).not.toHaveAttribute('rel');
  }
);

NewTab.test(
  'stacks the warning after an access mark',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const [link] = canvas.getAllByRole('link', {
      name: 'Support console Master opens in a new window',
    });

    // Both glyphs by their theme selector: counting `svg` would still pass
    // if a class went missing, which is the part a theme selects on.
    expect(link.querySelector('.access-icon')).toBeInTheDocument();
    expect(link.querySelector('.new-window-icon')).toBeInTheDocument();
  }
);

NewTab.test(
  'leaves a consumer-supplied rel alone',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { rel: 'noreferrer' },
  },
  async ({ canvas }) => {
    const [link] = canvas.getAllByRole('link', {
      name: 'Marigold docs opens in a new window',
    });

    expect(link).toHaveAttribute('rel', 'noreferrer');
  }
);

NewTab.test(
  'extends an aria-label rather than being swallowed by it',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { 'aria-label': 'Marigold release notes' },
  },
  async ({ canvas }) => {
    // `aria-label` replaces the content, so the hidden warning alone is lost.
    const [link] = canvas.getAllByRole('link', {
      name: 'Marigold release notes opens in a new window',
    });

    expect(link.querySelector('.new-window-icon')).toBeInTheDocument();
  }
);

NewTab.test(
  'folds the access mark into an aria-label too',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { variant: 'master', 'aria-label': 'Move event' },
  },
  async ({ canvas }) => {
    // The access label is content as well, so it is swallowed by the same rule.
    const [link] = canvas.getAllByRole('link', {
      name: 'Move event Master opens in a new window',
    });

    expect(link.querySelector('.access-icon')).toBeInTheDocument();
    expect(link.querySelector('.new-window-icon')).toBeInTheDocument();
  }
);

NewTab.test(
  'marks a named window without forcing a new one',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { target: 'popup' },
  },
  async ({ canvas }) => {
    // `noopener` would make the browser ignore the name, so no default `rel`.
    const [link] = canvas.getAllByRole('link', {
      name: 'Marigold docs opens in a new window',
    });

    expect(link.querySelector('.new-window-icon')).toBeInTheDocument();
    expect(link).not.toHaveAttribute('rel');
  }
);

NewTab.test(
  'leaves a same-window target unmarked',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { target: '_top' },
  },
  async ({ canvas }) => {
    const [link] = canvas.getAllByRole('link', { name: 'Marigold docs' });

    expect(link.querySelector('.new-window-icon')).not.toBeInTheDocument();
    expect(link).not.toHaveAttribute('rel');
  }
);

NewTab.test(
  'matches same-window targets case-insensitively',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { target: '_SELF' },
  },
  async ({ canvas }) => {
    // HTML matches target keywords case-insensitively, so `_SELF` stays put.
    const [link] = canvas.getAllByRole('link', { name: 'Marigold docs' });

    expect(link.querySelector('.new-window-icon')).not.toBeInTheDocument();
    expect(link).not.toHaveAttribute('rel');
  }
);

NewTab.test(
  'leaves a download link unmarked',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { download: true },
  },
  async ({ canvas }) => {
    // `download` overrides `target`, so nothing opens.
    const [link] = canvas.getAllByRole('link', { name: 'Marigold docs' });

    expect(link.querySelector('.new-window-icon')).not.toBeInTheDocument();
  }
);

NewTab.test(
  'leaves a disabled link unmarked',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { disabled: true },
  },
  async ({ canvas }) => {
    // A disabled link renders as a `<span>` and cannot open anything.
    const [link] = canvas.getAllByRole('link', { name: 'Marigold docs' });

    expect(link.querySelector('.new-window-icon')).not.toBeInTheDocument();
    expect(link).not.toHaveAttribute('rel');
  }
);
