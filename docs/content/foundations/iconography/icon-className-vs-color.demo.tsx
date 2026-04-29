import { TriangleAlert } from '@marigold/icons';

export default () => (
  <div className="flex items-center gap-6">
    <TriangleAlert color="var(--color-destructive-accent)" />
    <TriangleAlert className="text-destructive-accent" />
  </div>
);
