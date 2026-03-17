import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import { Menu, MenuItem, MenuTrigger } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { IconButton } from '../IconButton/IconButton';
import { Popover } from '../Overlay/Popover';
import { intlMessages } from '../intl/messages';
import type { BreadcrumbsItemProps } from './BreadcrumbsItem';

interface BreadcrumbEllipsisProps {
  hiddenItems?: ReactNode[];
}

export const BreadcrumbEllipsis = ({
  hiddenItems = [],
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
            if (!isValidElement<BreadcrumbsItemProps>(item)) return null;

            const { href, children: itemChildren } = item.props;

            return (
              <MenuItem
                key={`${href}-${index}`}
                className={menuItem}
                href={href}
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
