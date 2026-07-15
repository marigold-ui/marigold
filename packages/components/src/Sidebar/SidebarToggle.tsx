import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useIsSSR } from '@react-aria/ssr';
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
  const isSSR = useIsSSR();

  // The rail variant is a standard icon Button under the hood: it composes
  // the Button recipe (ghost/icon) for the control-size hitbox, ghost hover,
  // and press feedback, with the rail's ink layered on via `railToggle`.
  const iconButtonClassNames = useClassNames({
    component: 'Button',
    variant: 'ghost',
    size: 'icon',
  });

  const isMac = !isSSR && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const shortcut = isMac ? '⌘B' : 'Ctrl+B';

  const expanded = state === 'expanded';

  return (
    <Tooltip.Trigger delay={2500}>
      <Button
        // Stable accessible name (a toggle button); direction lives in
        // aria-expanded and the tooltip. Always live: collapse now also
        // narrows the rail to icon-only, so there is something to do on every
        // page — including a direct-link page with no section panel.
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
        {/* Rail variant shares the shell with lucide rail icons (default
            stroke 2), so it matches their weight; the bar variant keeps its
            lighter 1.5. */}
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
