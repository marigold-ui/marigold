import { Inline } from '@marigold/components';
import { Feedback } from '@marigold/icons';

export default () => (
  <Inline space={4}>
    <Feedback size={32} color="text-primary" />
    <Feedback size={32} color="text-info" />
    <Feedback size={32} color="text-warning" />
    <Feedback size={32} color="text-success" />
    <Feedback size={32} color="text-error" />
  </Inline>
);
