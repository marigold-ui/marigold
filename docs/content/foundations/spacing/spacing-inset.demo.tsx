import { VisualInset } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="grid grid-cols-2 items-center justify-items-center gap-4 pt-4 pb-10">
    <Box className="size-40">
      <VisualInset
        spaceX="peer"
        spaceY="peer"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squared
      </VisualInset>
    </Box>

    <Box>
      <VisualInset
        spaceX="group"
        spaceY="related"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squared
      </VisualInset>
    </Box>
  </div>
);
