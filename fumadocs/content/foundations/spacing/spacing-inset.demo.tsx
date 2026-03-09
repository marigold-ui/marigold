import { VisualInset } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="flex items-end justify-center gap-28 pt-4 pb-10">
    <VisualInset
      name="regular"
      spaceX="3"
      spaceY="3"
      className="rounded-[calc(var(--radius-lg)-1px)]"
    >
      <Box className="size-auto px-4 py-3">squared</Box>
    </VisualInset>

    <VisualInset
      name="regular"
      spaceX="3"
      spaceY="2"
      className="rounded-[calc(var(--radius-lg)-1px)]"
    >
      <Box className="size-auto px-4 py-3">squished</Box>
    </VisualInset>

    <VisualInset
      name="regular"
      spaceX="2"
      spaceY="3"
      className="rounded-[calc(var(--radius-lg)-1px)]"
    >
      <Box className="size-auto px-4 py-3">stretched</Box>
    </VisualInset>
  </div>
);
