import { Key } from 'react';
import { MenuItem } from 'react-aria-components';
import type RAC from 'react-aria-components';

// Props
// ---------------
type RemovedProps = 'style';
export interface MenuItemProps extends Omit<RAC.MenuItemProps, RemovedProps> {
  onAction?: (key: Key) => void;
}

// Component
// ---------------
const _MenuItem = ({ children, className, ...props }: MenuItemProps) => {
  return (
    <MenuItem className={className} {...props}>
      {children}
    </MenuItem>
  );
};

export { _MenuItem as MenuItem };
