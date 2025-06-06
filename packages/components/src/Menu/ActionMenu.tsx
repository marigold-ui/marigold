import type RAC from 'react-aria-components';
import { Button, Menu, MenuTrigger } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
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
      <Button className={classNames.button} isDisabled={disabled}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={12} cy={12} r={1} />
          <circle cx={12} cy={5} r={1} />
          <circle cx={12} cy={19} r={1} />
        </svg>
      </Button>
      <Popover>
        <Menu {...props} className={classNames.container}>
          {props.children}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};
