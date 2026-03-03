import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarToggleIcon } from './SidebarToggleIcon';

export const SidebarToggle = () => {
  const { toggleSidebar, state, variant, size } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <button
      type="button"
      aria-expanded={state === 'expanded'}
      aria-label={stringFormatter.format('toggleNavigation')}
      onClick={toggleSidebar}
      className={cn('group/icon', classNames.toggle)}
    >
      <SidebarToggleIcon expanded={state === 'expanded'} strokeWidth={1.5} />
    </button>
  );
};
