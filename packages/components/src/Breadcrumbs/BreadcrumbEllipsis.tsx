import React from 'react';
import { Menu, MenuItem, MenuTrigger } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { IconButton } from '../IconButton/IconButton';
import { Popover } from '../Overlay/Popover';
import { intlMessages } from '../intl/messages';
import { BreadcrumbsItemProps } from './BreadcrumbsItem';

interface BreadcrumbEllipsisProps extends React.ComponentProps<'span'> {
  hiddenItems?: React.ReactNode[];
  disabled?: boolean;
}

export const BreadcrumbEllipsis = ({
  hiddenItems = [],
  disabled = false,
}: BreadcrumbEllipsisProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  const { container, item: menuItem } = useClassNames({
    component: 'Menu',
  });

  return (
    <MenuTrigger>
      <IconButton aria-label={stringFormatter.format('hiddenBreadcrumbs')}>
        ...
      </IconButton>
      <Popover>
        <Menu className={container}>
          {hiddenItems.map((item, index) => {
            if (!React.isValidElement<BreadcrumbsItemProps>(item)) return null;

            const { href, children: itemChildren } = item.props;

            return (
              <MenuItem
                key={`${href}-${index}`}
                className={menuItem}
                href={href}
                isDisabled={disabled}
              >
                {itemChildren}
              </MenuItem>
            );
          })}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};
