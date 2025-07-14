import React from 'react';
import {
  Button,
  Link,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { BreadcrumbsItemProps } from './BreadcrumbsItem';

interface BreadcrumbEllipsisProps extends React.ComponentProps<'span'> {
  hiddenItems?: React.ReactNode[];
  disabled?: boolean;
}

export const BreadcrumbEllipsis = ({
  hiddenItems = [],
  disabled = false,
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

            const itemChildren = React.isValidElement(item)
              ? breadcrumb.props.children
              : item;

            return (
              <MenuItem
                key={index}
                className={classNames.ellipsisItem}
                onAction={() => {
                  if (href && !disabled) {
                    window.location.href = href;
                  }
                }}
              >
                {href ? (
                  <Link
                    href={href}
                    className={classNames.link}
                    isDisabled={disabled}
                  >
                    {itemChildren}
                  </Link>
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
