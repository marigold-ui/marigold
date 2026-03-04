import { Button } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { Tooltip } from '../Tooltip/Tooltip';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarToggleIcon } from './SidebarToggleIcon';

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad/.test(navigator.userAgent);

export const SidebarToggle = () => {
  const { toggleSidebar, state, classNames } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const shortcut = isMac ? '⌘B' : 'Ctrl+B';

  return (
    <Tooltip.Trigger delay={2500}>
      <Button
        aria-expanded={state === 'expanded'}
        aria-label={stringFormatter.format('toggleNavigation')}
        onPress={toggleSidebar}
        className={cn('group/icon', classNames.toggle)}
      >
        <SidebarToggleIcon expanded={state === 'expanded'} strokeWidth={1.5} />
      </Button>
      <Tooltip placement="right">
        {stringFormatter.format('toggleNavigationTooltip', { shortcut })}
      </Tooltip>
    </Tooltip.Trigger>
  );
};
