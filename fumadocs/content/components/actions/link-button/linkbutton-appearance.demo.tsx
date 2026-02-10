import { Save } from 'lucide-react';
import type { LinkButtonProps } from '@marigold/components';
import { LinkButton } from '@marigold/components';

export default (props: LinkButtonProps) => (
  <LinkButton {...props}>
    {props.size === 'icon' ? <Save /> : 'Press me'}
  </LinkButton>
);
