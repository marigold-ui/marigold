import { VisualInset } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="flex items-end justify-center gap-28 pt-4 pb-10">
    <Box className="size-auto">
      <VisualInset
        spaceX="peer"
        spaceY="peer"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squared
      </VisualInset>
    </Box>

    <Box className="size-auto">
      <VisualInset
        spaceX="group"
        spaceY="related"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squished
      </VisualInset>
    </Box>

    <Box className="size-auto">
      <VisualInset
        spaceX="related"
        spaceY="group"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        stretched
      </VisualInset>
    </Box>
  </div>
);
