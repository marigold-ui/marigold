import { Aside, Box } from '@marigold/components';

export const RightSide = () => (
  <Aside space="medium" side="right">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
      }}
    />
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
        width: '50px',
      }}
    />
  </Aside>
);
