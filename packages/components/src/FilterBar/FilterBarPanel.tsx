import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { Button } from '../Button/Button';
import { Drawer } from '../Drawer/Drawer';
import { ListFilter } from '../icons/ListFilter';
import { intlMessages } from '../intl/messages';
import { useFilterBarContext } from './Context';

// Props
// ---------------
export interface FilterBarPanelProps {
  /**
   * Label of the trigger button, also used as the drawer title.
   * Defaults to a localized "All filters".
   */
  label?: string;

  /**
   * The canonical filter set, rendered inside the drawer. Every filter
   * lives here — quick filters in the bar are shortcuts to a subset, so a
   * demoted quick filter stays reachable through this panel.
   */
  children: ReactNode;

  /**
   * Optional drawer footer, e.g. apply/clear buttons for a batched commit.
   */
  actions?: ReactNode;

  /**
   * Size of the drawer.
   * @default 'xsmall'
   */
  size?: 'xsmall' | 'small' | 'medium' | (string & {});
}

// Component
// ---------------

/**
 * Pinned trail of the bar: the "All filters" trigger plus the drawer with
 * the complete filter set. Badges the count of active-but-demoted quick
 * filters so hidden state stays communicated.
 */
export const FilterBarPanel = ({
  label,
  children,
  actions,
  size = 'xsmall',
}: FilterBarPanelProps) => {
  const { demotedActiveCount } = useFilterBarContext();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const { badge } = useClassNames({ component: 'FilterBar' });

  const resolvedLabel = label ?? stringFormatter.format('allFilters');

  return (
    <Drawer.Trigger>
      <Button>
        <ListFilter />
        {resolvedLabel}
        {demotedActiveCount > 0 && (
          <>
            <span aria-hidden="true" className={badge}>
              {demotedActiveCount}
            </span>
            <span className="sr-only">
              {stringFormatter.format('hiddenActiveFilters', {
                count: demotedActiveCount,
              })}
            </span>
          </>
        )}
      </Button>
      <Drawer closeButton size={size}>
        <Drawer.Title>{resolvedLabel}</Drawer.Title>
        <Drawer.Content>{children}</Drawer.Content>
        {actions && <Drawer.Actions>{actions}</Drawer.Actions>}
      </Drawer>
    </Drawer.Trigger>
  );
};
