import { Stack, TextField } from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';

export default () => (
  <div className="grid place-items-center *:w-1/2">
    <Stack alignX="left" space="peer">
      <TextField label="Email" />
      <VisualSpacing orientation="vertical" space="peer" />
      <TextField label="Email" />
    </Stack>
  </div>
);
