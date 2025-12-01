import { Stack } from '@marigold/components';
import { FadeContainer } from '@/ui/FadeContainer';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="grid place-items-center *:w-1/2">
    <Stack alignX="left" space="peer">
      <FadeContainer fade="top">
        <Box className="h-20" />
      </FadeContainer>
      <VisualSpacing orientation="vertical" space="peer" />
      <Box className="h-20" />
      <VisualSpacing orientation="vertical" space="peer" />
      <FadeContainer fade="bottom">
        <Box className="h-20" />
      </FadeContainer>
    </Stack>
  </div>
);
