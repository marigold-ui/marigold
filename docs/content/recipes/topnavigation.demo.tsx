import { Button, Inline, Split } from '@marigold/components';
import { Logout } from '@marigold/icons';

import { Logo } from './ReservixLogo';

export default () => {
  const items = [
    { key: '1', children: 'Item 1' },
    { key: '2', children: 'Item 2' },
    { key: '3', children: 'Item 3' },
  ];

  const NavItem = ({ children }: any) => {
    return (
      <div className="pb-2">
        <a
          href="/recipes/navigation-recipes"
          target="_blank"
          className="pb-4 hover:border-b-8 hover:border-[#9ca3af] active:border-[#fa8005]"
        >
          {children}
        </a>
      </div>
    );
  };

  return (
    <div className="h-16 w-full p-4 shadow ">
      <Inline alignY="center" space={4}>
        <Logo />
        {items.map(({ key, children }) => (
          <NavItem key={key}>{children}</NavItem>
        ))}
        <Split />
        <div className="pb-2">Organisation</div>
        <Button variant="text" size="small">
          <div className="pb-2">
            <Logout />
          </div>
        </Button>
      </Inline>
    </div>
  );
};
