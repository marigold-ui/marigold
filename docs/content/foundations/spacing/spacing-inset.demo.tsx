import { VisualInset } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="flex items-end justify-center gap-28 pt-4 pb-10">
    <Box className="size-auto">
      <VisualInset
        name="regular"
        spaceX="3"
        spaceY="3"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squared
      </VisualInset>
    </Box>

    <Box className="size-auto">
      <VisualInset
        name="regular"
        spaceX="3"
        spaceY="2"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squished
      </VisualInset>
    </Box>

    <Box className="size-auto">
      <VisualInset
        name="regular"
        spaceX="2"
        spaceY="3"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        stretched
      </VisualInset>
    </Box>
  </div>
);
