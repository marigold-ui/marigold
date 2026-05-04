import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { ActionButton, Description, Stack, Title } from '@marigold/components';
import { ActionButtonContext } from '@marigold/components';

export default () => (
  <div className="rounded border p-4">
    <Provider
      values={[
        [HeadingContext, { slots: { title: { level: 3 } } }],
        [TextContext, { slots: { description: { className: 'text-sm' } } }],
        [ActionButtonContext, { variant: 'ghost', size: 'small' }],
      ]}
    >
      <Stack space={2}>
        <Title>Storage usage</Title>
        <Description>
          42% of your storage quota is currently in use.
        </Description>
        <div className="flex gap-2 pt-1">
          <ActionButton>Manage storage</ActionButton>
          <ActionButton>Upgrade plan</ActionButton>
        </div>
      </Stack>
    </Provider>
  </div>
);
