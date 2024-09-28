import { PropsWithChildren } from 'react';
import {
  Button,
  Inline,
  Inset,
  MarigoldProvider,
  Stack,
  Text,
} from '@marigold/components';
import theme from '@marigold/theme-core';

/** App.tsx */
const App = () => (
  <Inset space={4}>
    <Stack space={4} alignX="left">
      <Text>I am the core theme. Nice to meet you!</Text>
      <Inline space={2}>
        <Button variant="primary">Save</Button>
        <Button variant="secondary  ">Cancel</Button>
      </Inline>
    </Stack>
  </Inset>
);

/** Providers.tsx */
const Providers = ({ children }: PropsWithChildren) => (
  <MarigoldProvider theme={theme}>{children}</MarigoldProvider>
);

/** Your app root, like index.tsx */
export default () => (
  <div data-theme="core">
    <Providers>
      <App />
    </Providers>
  </div>
);
