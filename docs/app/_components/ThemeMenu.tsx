'use client';

import { track } from '@vercel/analytics/react';
import { Menu } from '@marigold/components';
import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';

export const ThemeMenu = () => {
  const { themes, updateTheme } = useThemeSwitch();
  const onAction = (current: string) => {
    updateTheme(current);
    track('Switch Theme', { theme: current });
  };

  return (
    <Menu
      aria-label="Choose a Theme"
      label={<Theme className="text-secondary-600" />}
      onAction={onAction}
      placement="bottom end"
    >
      {Object.keys(themes).map(name => (
        <Menu.Item key={name} id={name}>
          <div className="flex items-center justify-between gap-2">
            {name.toUpperCase()}
            {['b2b', 'core'].includes(name) && (
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <path d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z"></path>
              </svg>
            )}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
};
