import { HeadingContext, Provider } from 'react-aria-components';
import { Description, Stack, Title } from '@marigold/components';

export default () => (
  <Provider values={[[HeadingContext, { slots: { title: { level: 3 } } }]]}>
    <div className="rounded border p-4">
      <Stack space={2}>
        <Title>Storage usage</Title>
        <Description>
          42% of your storage quota is currently in use.
        </Description>
      </Stack>
    </div>
  </Provider>
);
