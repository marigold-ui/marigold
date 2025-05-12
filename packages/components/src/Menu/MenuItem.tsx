import type RAC from 'react-aria-components';
import { MenuItem } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'style' | 'className';
export type MenuItemProps = Omit<RAC.MenuItemProps, RemovedProps>;

// Component
// ---------------
const _MenuItem = ({ children, ...props }: MenuItemProps) => {
  const classNames = useClassNames({ component: 'Menu' });
  return (
    <MenuItem {...props} className={classNames.item}>
      {children}
    </MenuItem>
  );
};

export { _MenuItem as MenuItem };
