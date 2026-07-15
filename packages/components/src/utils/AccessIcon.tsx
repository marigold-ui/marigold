import type { ComponentType } from 'react';
import { IconProps } from '../icons/Icons.types';
import { Key } from '../icons/Key';
import { Lock } from '../icons/Lock';

/**
 * Icon that marks a `master`/`admin` variant as access-restricted
 * (lock = master, key = admin). Rendered before the visible label; the
 * matching access color comes from the theme. The icon is decorative — the
 * announcement to assistive technology is the `AccessLabel`'s job.
 */
const accessIcons: Record<string, ComponentType<IconProps>> = {
  master: Lock,
  admin: Key,
};

export const AccessIcon = ({ variant }: { variant?: string }) => {
  const Icon = variant ? accessIcons[variant] : undefined;

  return Icon ? <Icon size={16} aria-hidden /> : null;
};
