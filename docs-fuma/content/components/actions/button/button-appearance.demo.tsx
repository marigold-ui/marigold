'use client';

import { Save } from 'lucide-react';
import type { ButtonProps } from '@marigold/components';
import { Button } from '@marigold/components';

export default (props: ButtonProps) => (
  <Button {...props}>{props.size === 'icon' ? <Save /> : 'Press me'}</Button>
);
