import React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { BreadcrumbProps } from './Breadcrumb';

interface BreadcrumbEllipsisProps extends React.ComponentProps<'span'> {
  hiddenItems?: React.ReactNode[];
}

export const BreadcrumbEllipsis = ({
  hiddenItems = [],
  ...props
}: BreadcrumbEllipsisProps) => {
  const classNames = useClassNames({
    component: 'Breadcrumbs',
  });

  return (
    <MenuTrigger>
      <Button type="button" className={classNames.ellipsisButton}>
        ...
      </Button>
      <Popover>
        <Menu className={classNames.ellipsisList}>
          {hiddenItems.map((item, index) => {
            if (!item || typeof item === 'boolean') return null;

            const breadcrumb = item as React.ReactElement<BreadcrumbProps>;

            const href = breadcrumb.props?.href ?? undefined;

            const itemChildren =
              typeof item === 'string' || typeof item === 'number'
                ? item
                : React.isValidElement(item)
                  ? breadcrumb.props?.children
                  : null;

            return (
              <MenuItem key={index} className={classNames.ellipsisItem}>
                {href ? (
                  <a href={href} className={classNames.link}>
                    {itemChildren}
                  </a>
                ) : (
                  itemChildren
                )}
              </MenuItem>
            );
          })}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};
