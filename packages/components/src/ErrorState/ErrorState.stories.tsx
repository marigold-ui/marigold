import { expect, fn, userEvent } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { Button } from '../Button/Button';
import { ErrorState } from './ErrorState';

const meta = preview.meta({
  title: 'Components/ErrorState',
  component: ErrorState,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description:
        'Title of the error state. State what failed, without apologies or technical jargon.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description:
        'Description text that should explain what went wrong and what the user can do about it.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    headingLevel: {
      control: {
        type: 'radio',
      },
      options: [2, 3, 4, 5, 6],
      description: 'Heading level of the title',
    },
  },
  args: {
    title: "We can't load this data",
    description: 'Something went wrong on our side. Your data is safe.',
  },
});

export const Basic = meta.story({
  render: args => <ErrorState {...args} />,
});

const retry = fn();

export const WithRetry = meta.story({
  tags: ['component-test'],
  render: args => (
    <ErrorState
      {...args}
      action={
        <Button variant="primary" size="small" onPress={retry}>
          Try again
        </Button>
      }
    />
  ),
});

WithRetry.test('retry action is a pressable button', async ({ canvas }) => {
  const button = canvas.getByRole('button', { name: 'Try again' });

  await userEvent.click(button);

  await expect(retry).toHaveBeenCalled();
});

export const Compact = meta.story({
  render: args => (
    <ErrorState
      {...args}
      size="compact"
      role="alert"
      headingLevel={3}
      title="Invoices didn't load"
      description="You can retry. The rest of the page is unaffected."
      action={
        <Button size="small" onPress={retry}>
          Try again
        </Button>
      }
    />
  ),
});
