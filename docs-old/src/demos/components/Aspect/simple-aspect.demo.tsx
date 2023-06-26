import { Aspect, Box } from '@marigold/components';

export const BasicAspect = () => (
  <Aspect maxWidth="25%">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100%',
      }}
    />
  </Aspect>
);
