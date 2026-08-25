import type { ComponentType } from 'react';
import { cn } from '@marigold/system';
import { IconProps } from '../icons/Icons.types';
import { Key } from '../icons/Key';
import { Lock } from '../icons/Lock';

/**
 * Icon that marks a `master`/`admin` variant as access-restricted
 * (lock = master, key = admin). Rendered before the visible label; the
 * matching access color comes from the theme. The icon is decorative — the
 * announcement to assistive technology is the `AccessLabel`'s job.
 *
 * The `access-icon` class is the markup contract a theme selects on, the same
 * way `.selection-indicator` works. Selecting on `svg` would catch every other
 * glyph a component renders next to the label.
 */
const accessIcons: Record<string, ComponentType<IconProps>> = {
  master: Lock,
  admin: Key,
};

export const AccessIcon = ({
  variant,
  className,
}: {
  variant?: string;
  className?: string;
}) => {
  const Icon = variant ? accessIcons[variant] : undefined;

  return Icon ? (
    <Icon size={16} aria-hidden className={cn('access-icon', className)} />
  ) : null;
};
