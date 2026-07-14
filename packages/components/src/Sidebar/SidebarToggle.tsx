import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useIsSSR } from '@react-aria/ssr';
import { cn } from '@marigold/system';
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
  const { toggleSidebar, state, classNames, isMobile, panelAvailable } =
    useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const isSSR = useIsSSR();

  const isMac = !isSSR && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const shortcut = isMac ? '⌘B' : 'Ctrl+B';

  // With a rail on a direct-link page there is no section panel, so there is
  // nothing to collapse (on mobile the toggle opens the drawer, so it stays
  // enabled regardless).
  const disabled = !isMobile && !panelAvailable;

  return (
    <Tooltip.Trigger delay={2500}>
      <Button
        aria-expanded={state === 'expanded'}
        aria-label={stringFormatter.format('toggleNavigation')}
        isDisabled={disabled}
        onPress={toggleSidebar}
        className={cn(
          'group/icon',
          variant === 'rail' ? classNames.railToggle : classNames.toggle
        )}
      >
        {/* Rail variant shares the shell with lucide rail icons (default
            stroke 2), so it matches their weight; the bar variant keeps its
            lighter 1.5. */}
        <SidebarToggleIcon
          expanded={state === 'expanded'}
          strokeWidth={variant === 'rail' ? 2 : 1.5}
        />
      </Button>
      <Tooltip placement="bottom">
        {stringFormatter.format('toggleNavigationTooltip', { shortcut })}
      </Tooltip>
    </Tooltip.Trigger>
  );
};
