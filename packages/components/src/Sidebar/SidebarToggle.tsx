import { PanelLeftClose } from 'lucide-react';
import { cn, useClassNames } from '@marigold/system';
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
      <PanelLeftClose />
    </button>
  );
};
