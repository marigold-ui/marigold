import { Stack } from '@marigold/components';
import { FadeContainer } from '@/ui/FadeContainer';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <FadeContainer fade="vertical">
    <div className="grid place-items-center *:w-1/2">
      <Stack alignX="left" space="peer">
        <Box className="h-20" />
        <VisualSpacing orientation="vertical" space="peer" />
        <Box className="h-20" />
        <VisualSpacing orientation="vertical" space="peer" />
        <Box className="h-20" />
      </Stack>
    </div>
  </FadeContainer>
);
