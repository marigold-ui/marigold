import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { ContextualHelp } from './ContextualHelp';

const meta = preview.meta({
  title: 'Components/ContextualHelp',
  component: ContextualHelp,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['help', 'info'],
    },
    placement: {
      control: 'select',
      options: [
        'bottom',
        'bottom left',
        'bottom right',
        'bottom start',
        'bottom end',
        'top',
        'top left',
        'top right',
        'top start',
        'top end',
        'left',
        'left top',
        'left bottom',
        'start',
        'start top',
        'start bottom',
        'right',
        'right top',
        'right bottom',
        'end',
        'end top',
        'end bottom',
      ],
    },
    size: {
      options: ['default'],
      defaultValue: 'default',
    },
    width: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    offset: {
      control: 'number',
    },
    defaultOpen: {
      control: 'boolean',
    },
    open: {
      control: 'boolean',
    },
    onOpenChange: {
      action: 'onOpenChange',
    },
  },
  args: {
    variant: 'help',
    placement: 'bottom start',
    size: 'medium',
    width: 'medium',
    offset: 8,
    defaultOpen: false,
    children: undefined,
  } as const,
});

export const Basic = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <ContextualHelp {...args}>
        <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
        <ContextualHelp.Content>
          This feature explains important functions to you directly in the
          context of the page.
          <br />
          <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
            To the documentation
          </Link>
        </ContextualHelp.Content>
      </ContextualHelp>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const helpButton = await canvas.getByLabelText(/help|hilfe/i);
    await userEvent.click(helpButton);

    expect(await canvas.findByText('Whats this?')).toBeInTheDocument();
    expect(
      await canvas.findByText(
        'This feature explains important functions to you directly in the context of the page.'
      )
    ).toBeInTheDocument();
    expect(
      await canvas.findByRole('link', {
        name: 'To the documentation',
      })
    ).toBeInTheDocument();

    // Reset
    await userEvent.click(document.body);
  },
});

export const WithDescription = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <ContextualHelp {...args}>
        <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
        <ContextualHelp.Description>
          A short summary of this feature.
        </ContextualHelp.Description>
        <ContextualHelp.Content>
          This feature explains important functions to you directly in the
          context of the page.
        </ContextualHelp.Content>
      </ContextualHelp>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const helpButton = await canvas.getByLabelText(/help|hilfe/i);
    await userEvent.click(helpButton);

    const title = await canvas.findByText('Whats this?');
    const description = await canvas.findByText(
      'A short summary of this feature.'
    );

    // Element type comes from the root's `TextContext` slot config.
    expect(description.tagName).toBe('P');

    // The RAC dialog wires its `aria-labelledby` to the `slot="title"`
    // heading and supplies the heading level (2, same as `Dialog.Title`).
    const dialog = await canvas.findByRole('dialog');
    expect(title.tagName).toBe('H2');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);

    // Reset
    await userEvent.click(document.body);
  },
});

export const LongContent = meta.story({
  parameters: { surface: false },
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <ContextualHelp {...args}>
        <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
        <ContextualHelp.Content>
          <Text>
            This feature explains important functions to you directly in the
            context of the page.
          </Text>

          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
            aliquam enim, eget facilisis sapien sapien nec est.
          </Text>

          <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Text>

          <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
            To the documentation
          </Link>
        </ContextualHelp.Content>
      </ContextualHelp>
    </div>
  ),
});

export const WithTextField = meta.story({
  render: args => (
    <div className="flex h-96 items-center justify-center">
      <TextField
        label={
          <span className="flex items-center gap-1">
            Email
            <ContextualHelp offset={2} {...args}>
              <ContextualHelp.Title>Email Format</ContextualHelp.Title>
              <ContextualHelp.Content>
                Please enter a valid email address in the format:
                user@example.com
                <br />
                <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
                  Learn more
                </Link>
              </ContextualHelp.Content>
            </ContextualHelp>
          </span>
        }
        type="email"
        description="We'll never share your email"
        width="fit"
      />
    </div>
  ),
});
