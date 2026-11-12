import type { ReactNode } from 'react';
import { Children } from 'react';
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
  // The built-in match drops groups without matches. With `filter={false}`
  // the app filters, and a group it leaves empty (e.g. while server results
  // load) would show a lone title, so it renders nothing.
  // `toArray`, not `count`: `count` also counts `false` from `{cond && …}`.
  // eslint-disable-next-line @eslint-react/no-children-to-array -- an empty group must not render its title
  if (Children.toArray(children).length === 0) return null;
  return (
    <MenuSection {...props}>
      <Header className={classNames.group}>{title}</Header>
      {children}
    </MenuSection>
  );
};
