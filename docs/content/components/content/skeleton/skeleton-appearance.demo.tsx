import { Skeleton, type SkeletonProps } from '@marigold/components';

export default (props: SkeletonProps) => (
  <Skeleton width={32} height={8} {...props} />
);
