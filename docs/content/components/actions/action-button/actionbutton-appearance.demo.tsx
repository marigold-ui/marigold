import { Save } from 'lucide-react';
import type { ActionButtonProps } from '@marigold/components';
import { ActionButton } from '@marigold/components';

export default (props: ActionButtonProps) => (
  <ActionButton {...props}>
    {props.size === 'icon' ? <Save /> : 'Edit row'}
  </ActionButton>
);
