import { cn, useClassNames } from '@marigold/system';
import { SidebarToggleIcon } from '../icons/SidebarToggleIcon';
import { useSidebar } from './Context';

export const SidebarToggle = () => {
  const { toggleSidebar, state, variant, size } = useSidebar();
  const classNames = useClassNames({
    component: 'Sidebar',
    variant,
    size,
  });

  return (
    <button
      type="button"
      aria-expanded={state === 'expanded'}
      aria-label="Toggle sidebar"
      onClick={toggleSidebar}
      className={cn(classNames.toggle)}
    >
      <SidebarToggleIcon expanded={state === 'expanded'} />
    </button>
  );
};
