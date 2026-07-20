import { useState } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Button, ErrorState, Panel, Text, Title } from '@marigold/components';

const InvoicesFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <ErrorState
    size="compact"
    // Region tier: announce the failure, don't steal focus.
    role="alert"
    // Under the panel's h2.
    headingLevel={3}
    title="Invoices didn't load"
    description="You can retry. The rest of the page is unaffected."
    action={
      <Button size="small" onPress={resetErrorBoundary}>
        Try again
      </Button>
    }
  />
);

const InvoiceList = ({ broken }: { broken: boolean }) => {
  if (broken) {
    throw new Error('Failed to fetch invoices');
  }
  return <Text>3 invoices, all paid.</Text>;
};

export default () => {
  const [broken, setBroken] = useState(false);

  return (
    <Panel>
      <Panel.Header>
        <Title>Recent invoices</Title>
        <Button size="small" onPress={() => setBroken(true)}>
          Break this panel
        </Button>
      </Panel.Header>
      <Panel.Content>
        <ErrorBoundary
          FallbackComponent={InvoicesFallback}
          onReset={() => setBroken(false)}
        >
          <InvoiceList broken={broken} />
        </ErrorBoundary>
      </Panel.Content>
    </Panel>
  );
};
