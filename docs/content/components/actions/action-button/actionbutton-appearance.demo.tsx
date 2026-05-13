import type { ActionButtonProps } from '@marigold/components';
import { ActionButton } from '@marigold/components';
import { Save } from '@marigold/icons';

export default (props: ActionButtonProps) => (
  <ActionButton {...props}>
    {props.size === 'icon' ? <Save /> : 'Edit row'}
  </ActionButton>
);
