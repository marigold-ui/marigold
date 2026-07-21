import { Stack } from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="grid place-items-center *:w-1/2">
    <Stack space="regular">
      <Box className="h-20" />
      <VisualSpacing orientation="vertical" space="regular" />
      <Box className="h-20" />
      <VisualSpacing orientation="vertical" space="regular" />
      <Box className="h-20" />
    </Stack>
  </div>
);
