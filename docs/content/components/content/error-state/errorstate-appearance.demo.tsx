import { Button, ErrorState, ErrorStateProps } from '@marigold/components';

export default (props: ErrorStateProps) => (
  <ErrorState
    {...props}
    title="We can't load this data"
    description="Something went wrong on our side. Your data is safe."
    action={
      <Button variant="primary" size="small">
        Try again
      </Button>
    }
  />
);
