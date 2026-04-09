import { Pin } from 'lucide-react';
import type { ToggleButtonProps } from '@marigold/components';
import { ToggleButton } from '@marigold/components';

export default (props: ToggleButtonProps) => (
  <ToggleButton {...props}>
    {props.size === 'icon' ? <Pin /> : 'Toggle Button'}
  </ToggleButton>
);
