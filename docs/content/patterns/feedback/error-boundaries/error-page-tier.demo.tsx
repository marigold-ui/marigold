import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import {
  Button,
  Description,
  ErrorState,
  Page,
  Panel,
  Text,
  Title,
} from '@marigold/components';

const BillingErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
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
  return (
    <Panel>
      <Panel.Header>
        <Title>Current plan</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>You are on the Team plan.</Text>
      </Panel.Content>
    </Panel>
  );
};

export default () => {
  const [broken, setBroken] = useState(false);

  return (
    <div>
      <Button size="small" onPress={() => setBroken(true)}>
        Break this page
      </Button>
      <Page>
        <Page.Header>
          {/* The route title stays mounted, keeps the h1, and names the <main> landmark. */}
          <Title>Billing</Title>
          <Description>Manage your plan and invoices.</Description>
        </Page.Header>
        <ErrorBoundary
          FallbackComponent={BillingErrorFallback}
          onReset={() => setBroken(false)}
        >
          <BillingContent broken={broken} />
        </ErrorBoundary>
      </Page>
    </div>
  );
};
