import { Menu, MenuTrigger } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { SVG, useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { Popover } from '../Overlay/Popover';

interface ActionMenuProps extends RAC.MenuProps<object> {
  variant?: string;
  size?: string;
  disabled?: boolean;
}

export const ActionMenu = ({
  variant,
  size,
  disabled,
  ...props
}: ActionMenuProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  return (
    <MenuTrigger>
      <Button variant="menu" size="small" disabled={disabled}>
        <SVG viewBox="0 0 24 24">
          <path d="M12.0117 7.47656C13.2557 7.47656 14.2734 6.45879 14.2734 5.21484C14.2734 3.9709 13.2557 2.95312 12.0117 2.95312C10.7678 2.95312 9.75 3.9709 9.75 5.21484C9.75 6.45879 10.7678 7.47656 12.0117 7.47656ZM12.0117 9.73828C10.7678 9.73828 9.75 10.7561 9.75 12C9.75 13.2439 10.7678 14.2617 12.0117 14.2617C13.2557 14.2617 14.2734 13.2439 14.2734 12C14.2734 10.7561 13.2557 9.73828 12.0117 9.73828ZM12.0117 16.5234C10.7678 16.5234 9.75 17.5412 9.75 18.7852C9.75 20.0291 10.7678 21.0469 12.0117 21.0469C13.2557 21.0469 14.2734 20.0291 14.2734 18.7852C14.2734 17.5412 13.2557 16.5234 12.0117 16.5234Z" />
        </SVG>
      </Button>
      <Popover>
        <Menu {...props} className={classNames.container}>
          {props.children}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};
