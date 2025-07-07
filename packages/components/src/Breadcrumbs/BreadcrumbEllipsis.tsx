import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, MenuItem, MenuTrigger } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { BreadcrumbProps } from './Breadcrumb';

interface BreadcrumbEllipsisProps extends React.ComponentProps<'span'> {
  hiddenItems?: React.ReactNode[];
}

export const BreadcrumbEllipsis = ({
  hiddenItems = [],
  ...props
}: BreadcrumbEllipsisProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const onClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClickOutside]);

  const classNames = useClassNames({
    component: 'Breadcrumbs',
  });

  return (
    <span ref={ref} className={classNames.ellipsis} {...props}>
      <MenuTrigger>
        <button
          type="button"
          className={classNames.ellipsisButton}
          onClick={() => setOpen(!open)}
        >
          ...
        </button>
      </MenuTrigger>

      {open && (
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
                <a href={href} className={classNames.link}>
                  {itemChildren}
                </a>
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </span>
  );
};
