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
    <Page>
      <Page.Header>
        {/* The route title stays the h1 and names the <main> landmark. */}
        <Title>Billing</Title>
      </Page.Header>
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
    </Page>
  );
};

const BillingPage = ({ broken }: { broken: boolean }) => {
  if (broken) {
    throw new Error('Failed to fetch billing data');
  }
  return (
    <Page>
      <Page.Header>
        <Title>Billing</Title>
        <Description>Manage your plan and invoices.</Description>
      </Page.Header>
      <Panel>
        <Panel.Header>
          <Title>Current plan</Title>
        </Panel.Header>
        <Panel.Content>
          <Text>You are on the Team plan.</Text>
        </Panel.Content>
      </Panel>
    </Page>
  );
};

export default () => {
  const [broken, setBroken] = useState(false);

  return (
    <div>
      <Button size="small" onPress={() => setBroken(true)}>
        Break this page
      </Button>
      <ErrorBoundary
        FallbackComponent={BillingErrorFallback}
        onReset={() => setBroken(false)}
      >
        <BillingPage broken={broken} />
      </ErrorBoundary>
    </div>
  );
};
