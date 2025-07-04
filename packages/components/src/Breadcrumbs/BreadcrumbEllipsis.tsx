import { useCallback, useEffect, useRef, useState } from 'react';
import { useClassNames } from '@marigold/system';

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
      <button
        type="button"
        className={classNames.ellipsisButton}
        onClick={() => setOpen(!open)}
      >
        ...
      </button>
      {open && (
        <ul className={classNames.ellipsisList}>
          {hiddenItems.map((item, index) => {
            if (!item || typeof item === 'boolean') return null;
            const itemChildren =
              typeof item === 'string' || typeof item === 'number'
                ? item
                : 'props' in (item as any) && (item as any).props?.children;

            return (
              <li key={index} className={classNames.ellipsisItem}>
                {itemChildren}
              </li>
            );
          })}
        </ul>
      )}
    </span>
  );
};
