import { Button, ErrorState, Panel, Title } from '@marigold/components';

export default () => (
  <Panel>
    <Panel.Header>
      <Title>Recent invoices</Title>
    </Panel.Header>
    <Panel.Content>
      <ErrorState
        size="compact"
        role="alert"
        headingLevel={3}
        title="Invoices didn't load"
        description="You can retry. The rest of the page is unaffected."
        action={
          <Button variant="primary" size="small">
            Try again
          </Button>
        }
      />
    </Panel.Content>
  </Panel>
);
