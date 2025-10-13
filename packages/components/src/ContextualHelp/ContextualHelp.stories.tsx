import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';
import { ContextualHelp } from './ContextualHelp';

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
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
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
type Story = StoryObj<typeof meta>;

export const Basic = (props: React.ComponentProps<typeof ContextualHelp>) => (
  <div className="flex h-96 items-center justify-center">
    <ContextualHelp {...props} size={props.size}>
      <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
      <ContextualHelp.Content>
        This feature explains important functions to you directly in the context
        of the page.
        <br />
        <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
          To the documentation
        </Link>
      </ContextualHelp.Content>
    </ContextualHelp>
  </div>
);

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
