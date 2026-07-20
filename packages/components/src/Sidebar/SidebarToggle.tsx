import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { isAppleDevice } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { Tooltip } from '../Tooltip/Tooltip';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarToggleIcon } from './SidebarToggleIcon';

export interface SidebarToggleProps {
  /**
   * Visual treatment. `'bar'` (default) is the ghost button for the top
   * navigation; `'rail'` is the two-level shell's variant — a compact top-bar
   * icon button in the rail's ink and icon weight, placed between the brand
   * and the breadcrumbs in `TopNavigation.Start`.
   * @default 'bar'
   */
  variant?: 'bar' | 'rail';
}

export const SidebarToggle = ({ variant = 'bar' }: SidebarToggleProps = {}) => {
  const { toggleSidebar, state, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // The rail variant is a standard icon Button (ghost/icon recipe) with the
  // rail's ink layered on via `railToggle`.
  const iconButtonClassNames = useClassNames({
    component: 'Button',
    variant: 'ghost',
    size: 'icon',
  });

  // SSR-safe (false on the server); the tooltip renders only on interaction,
  // so no hydration concern.
  const shortcut = isAppleDevice() ? '⌘B' : 'Ctrl+B';

  const expanded = state === 'expanded';

  return (
    <Tooltip.Trigger delay={2500}>
      <Button
        // Stable accessible name; direction lives in aria-expanded and the
        // tooltip. Always live — collapse also narrows the rail to icons, so it
        // acts on every page.
        aria-expanded={expanded}
        aria-label={stringFormatter.format('toggleNavigation')}
        onPress={toggleSidebar}
        className={cn(
          'group/icon',
          variant === 'rail'
            ? cn(iconButtonClassNames, classNames.railToggle)
            : classNames.toggle
        )}
      >
        {/* Rail variant matches the lucide rail icons' stroke 2; the bar
            variant keeps its lighter 1.5. */}
        <SidebarToggleIcon
          expanded={expanded}
          strokeWidth={variant === 'rail' ? 2 : 1.5}
        />
      </Button>
      <Tooltip placement="bottom">
        {stringFormatter.format(
          expanded ? 'collapseSidebarTooltip' : 'expandSidebarTooltip',
          { shortcut }
        )}
      </Tooltip>
    </Tooltip.Trigger>
  );
};
