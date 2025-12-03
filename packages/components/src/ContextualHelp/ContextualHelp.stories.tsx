import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { Label } from '../Label/Label';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { ContextualHelp } from './ContextualHelp';
import type { ContextualHelpProps } from './ContextualHelp';

const meta = {
  title: 'Components/ContextualHelp',
  argTypes: {
    variant: {
      control: 'select',
      options: ['help', 'info'],
      defaultValue: 'help',
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
      defaultValue: 'bottom start',
    },
    size: {
      control: 'select',
      options: ['default', 'large'],
      defaultValue: 'default',
    },
    width: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    offset: {
      control: 'number',
      defaultValue: 8,
    },
    defaultOpen: {
      control: 'boolean',
      defaultValue: false,
    },
    open: {
      control: 'boolean',
    },
    onOpenChange: {
      action: 'onOpenChange',
    },
  },
} satisfies Meta<typeof ContextualHelp>;

export default meta;
type Story = StoryObj<ContextualHelpProps>;

export const Basic: Story = {
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
};

export const LongContent: Story = {
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
};

export const WithTextField: Story = {
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
};
