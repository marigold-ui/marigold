import { ReactNode } from 'react';
import { Button, Inline, Split } from '@marigold/components';
import { Logout } from '@marigold/icons';
import { cn } from '@marigold/system';
import { Logo } from './ReservixLogo';

interface NavItemsProps {
  children?: ReactNode;
  href?: string;
  active?: boolean;
}

const NavItem = ({ children, href, active }: NavItemsProps) => {
  return (
    <div className="pb-2">
      <a
        href={href}
        target="_blank"
        className={cn(
          'hover:border-border-base-hover pb-4 hover:border-b-8',
          active && 'border-border-selected border-b-8'
        )}
        rel="noreferrer"
      >
        {children}
      </a>
    </div>
  );
};

export default () => {
  const items = [
    {
      key: '1',
      children: 'Recipe',
      href: '/recipes/navigation-recipes',
      active: true,
    },
    {
      key: '2',
      children: 'Components',
      href: '/components/layout/aside',
      active: false,
    },
    {
      key: '3',
      children: 'Start',
      href: '/',
      active: false,
    },
  ];

  return (
    <div className="h-16 w-full p-4 shadow">
      <Inline alignY="center" space={4}>
        <Logo />
        {items.map(({ key, children, href, active }) => (
          <NavItem key={key} href={href} active={active}>
            {children}
          </NavItem>
        ))}
        <Split />
        <div className="pb-2">Org. Name</div>
        <div className="h-full">
          <Button variant="text" size="small">
            <Logout />
          </Button>
        </div>
      </Inline>
    </div>
  );
};
