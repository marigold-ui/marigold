import { Aside, Box } from '@marigold/components';

export const BasicAside = () => (
  <Aside space="medium" side="left">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
        width: '50px',
      }}
    />
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
      }}
    />
  </Aside>
);
