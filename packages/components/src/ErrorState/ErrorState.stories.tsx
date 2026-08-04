import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { expect, fn, userEvent } from 'storybook/test';
import { Panel } from '@marigold/components';
import preview from '../../../../.storybook/preview';
import { Button } from '../Button/Button';
import { Page } from '../Page/Page';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
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

WithRetry.test(
  'retry action is a pressable button',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Try again' });

    await userEvent.click(button);

    await expect(retry).toHaveBeenCalled();
  }
);

const PageErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  // Page tier: the task the user was on is gone, so the fallback takes focus.
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <ErrorState
      ref={ref}
      tabIndex={-1}
      headingLevel={2}
      title="We can't load your billing data"
      description="Something went wrong on our side. Your data is safe."
      action={
        <Button variant="primary" onPress={resetErrorBoundary}>
          Try again
        </Button>
      }
    />
  );
};

const BillingContent = ({ broken }: { broken: boolean }) => {
  if (broken) {
    throw new Error('Failed to fetch billing data');
  }
  return <Text>You are on the Team plan.</Text>;
};

const BreakablePage = () => {
  const [broken, setBroken] = useState(false);

  return (
    <Page>
      <Page.Header>
        {/* The route title stays mounted, keeps the h1, and names the <main> landmark. */}
        <Title>Billing</Title>
      </Page.Header>
      <Panel>
        <Panel.Content>
          <Button size="small" onPress={() => setBroken(true)}>
            Break this page
          </Button>
          <ErrorBoundary
            FallbackComponent={PageErrorFallback}
            onReset={() => setBroken(false)}
          >
            <BillingContent broken={broken} />
          </ErrorBoundary>
        </Panel.Content>
      </Panel>
    </Page>
  );
};

/**
 * Page tier from the error boundaries pattern: the boundary sits below the
 * `<Page.Header>`, so the route title stays mounted while the broken content
 * is swapped for the `<ErrorState>`.
 */
export const PageTier = meta.story({
  tags: ['component-test'],
  // Render the `<Page>` outside the decorator's labeled Panel, so its
  // `<main>` landmark stays top level.
  parameters: {
    layout: 'fullscreen',
    surface: false,
    chromatic: { disableSnapshot: true },
  },
  render: () => <BreakablePage />,
});

PageTier.test(
  'breaking the page swaps the content for a focused ErrorState',
  async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Break this page' })
    );

    const heading = await canvas.findByRole('heading', {
      level: 2,
      name: "We can't load your billing data",
    });

    await expect(heading).toBeVisible();
    await expect(
      canvas.queryByText('You are on the Team plan.')
    ).not.toBeInTheDocument();
    await expect(document.activeElement).toContainElement(heading);
  }
);

PageTier.test('retry restores the page content', async ({ canvas }) => {
  await userEvent.click(
    canvas.getByRole('button', { name: 'Break this page' })
  );
  const retryButton = await canvas.findByRole('button', { name: 'Try again' });

  await userEvent.click(retryButton);

  await expect(
    await canvas.findByText('You are on the Team plan.')
  ).toBeVisible();
  await expect(
    canvas.queryByRole('heading', { name: "We can't load your billing data" })
  ).not.toBeInTheDocument();
});
