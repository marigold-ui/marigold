import { useState } from 'react';
import { ReactNode } from 'react';

import { Button, Inline, Split } from '@marigold/components';
import { Logout } from '@marigold/icons';
import { cn } from '@marigold/system';

import { Logo } from './ReservixLogo';

interface NavProps {
  onClick?: () => void;
}

interface NavItemsProps extends NavProps {
  children?: ReactNode;
  href?: string;
}

const NavItem = ({ children, href }: NavItemsProps) => {
  const [active, setActive] = useState(false);
  const handleOnClick = () => {
    setActive(!active);
  };

  return (
    <div className="pb-2">
      <a
        href={href}
        target="_blank"
        onClick={handleOnClick}
        className={cn(
          'pb-4 hover:border-b-8 hover:border-[#9ca3af] ',
          active && 'border-b-8 border-[#fa8005]'
        )}
        rel="noreferrer"
      >
        {children}
      </a>
    </div>
  );
};

export default ({ onClick }: NavProps) => {
  const items = [
    { key: '1', children: 'Start', href: '/' },
    { key: '2', children: 'Components', href: '/components/layout/aside' },
    { key: '3', children: 'Recipe', href: '/recipes/navigation-recipes' },
  ];

  return (
    <div className="h-16 w-full p-4 shadow">
      <Inline alignY="center" space={4}>
        <Logo />
        {items.map(({ key, children, href }) => (
          <NavItem key={key} onClick={onClick} href={href}>
            {children}
          </NavItem>
        ))}
        <Split />
        <div className="pb-2">Organisation</div>
        <div className="h-full">
          <Button variant="text" size="small">
            <Logout />
          </Button>
        </div>
      </Inline>
    </div>
  );
};
