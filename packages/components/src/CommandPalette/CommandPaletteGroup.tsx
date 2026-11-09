import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Header } from 'react-aria-components/Header';
import { MenuSection } from 'react-aria-components/Menu';
import { useCommandPalette } from './Context';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children';
export interface CommandPaletteGroupProps extends Omit<
  RAC.SectionProps<object>,
  RemovedProps
> {
  /**
   * The heading of the group.
   */
  title?: string;

  /**
   * The items of the group.
   */
  children: ReactNode;
}

// Component
// ---------------
export const CommandPaletteGroup = ({
  children,
  title,
  ...props
}: CommandPaletteGroupProps) => {
  const { classNames } = useCommandPalette();
  return (
    <MenuSection {...props}>
      <Header className={classNames.group}>{title}</Header>
      {children}
    </MenuSection>
  );
};
