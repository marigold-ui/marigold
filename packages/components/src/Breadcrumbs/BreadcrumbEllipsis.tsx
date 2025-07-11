import React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { BreadcrumbsItemProps } from './BreadcrumbsItem';

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

            const breadcrumb = item as React.ReactElement<BreadcrumbsItemProps>;

            const href = breadcrumb.props?.href ?? undefined;

            const itemChildren =
              typeof item === 'string' || typeof item === 'number'
                ? item
                : React.isValidElement(item)
                  ? breadcrumb.props?.children
                  : null;

            return (
              <MenuItem
                key={index}
                className={classNames.ellipsisItem}
                onAction={() => {
                  if (href) {
                    window.location.href = href;
                  }
                }}
              >
                <a href={href} className={classNames.link}>
                  {itemChildren}
                </a>{' '}
              </MenuItem>
            );
          })}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};
