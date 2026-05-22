import { ValidationError, post } from '@/lib/fetch';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import type { FormEvent } from 'react';
import {
  Button,
  Description,
  Form,
  Inline,
  Panel,
  Stack,
  TextField,
  Title,
} from '@marigold/components';
import { Check } from '@marigold/icons';

const SuccessMessage = () => (
  <Inline alignY="center" space={1}>
    <Check color="text-success" size="12" /> Successfully subscribed!
  </Inline>
);

const App = () => {
  /**
   * Server communication
   *
   * (We are using `@tanstack/react-query` in this example to interact
   * with a server. Regular form request via the `action` attribute work too!)
   */
  const mutation = useMutation<any, ValidationError, string>({
    mutationFn: (email: string) => post('/api/subscribe', { email }),
  });

  // Form handling
  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = new FormData(e.currentTarget).get('email') as string;
    mutation.mutate(email);
  };

  // Show form errors from server
  const validationErrors = mutation.error ? mutation.error.cause : undefined;

  return (
    <Form onSubmit={subscribe} validationErrors={validationErrors}>
      <Panel size="form">
        <Panel.Header>
          <Title>Subscribe to our Newsletter</Title>
          <Description>
            Stay updated with our latest news and updates.
          </Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space={4}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
              description={mutation.isSuccess && <SuccessMessage />}
              required
            />
            <Button variant="primary" type="submit">
              Subscribe
            </Button>
          </Stack>
        </Panel.Content>
      </Panel>
    </Form>
  );
};

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
