import type { ReactNode } from 'react';
import { Children, useLayoutEffect } from 'react';
import type RAC from 'react-aria-components';
import { Header } from 'react-aria-components/Header';
import { MenuSection } from 'react-aria-components/Menu';
import { Keyboard } from '../Keyboard/Keyboard';
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
   * Typing this at the start of the query narrows the search to this group,
   * for example `e:` for events. The group title shows it as a hint.
   */
  prefix?: string;

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
  prefix,
  ...props
}: CommandPaletteGroupProps) => {
  const { classNames, scope, registerPrefix } = useCommandPalette();
  useLayoutEffect(() => {
    if (prefix) return registerPrefix(prefix, title ?? prefix);
  }, [prefix, title, registerPrefix]);

  // While the search is narrowed to one group, the others step aside.
  if (scope !== null && scope !== prefix) return null;
  // The built-in match drops groups without matches. With `filter={false}`
  // the app filters, and a group it leaves empty (e.g. while server results
  // load) would show a lone title, so it renders nothing.
  // `toArray`, not `count`: `count` also counts `false` from `{cond && …}`.
  // eslint-disable-next-line @eslint-react/no-children-to-array -- an empty group must not render its title
  if (Children.toArray(children).length === 0) return null;
  // The narrowed group is named by the chip in the search field instead.
  const narrowed = scope !== null;
  return (
    <MenuSection {...props} aria-label={narrowed ? title : undefined}>
      {!narrowed && (
        <Header className={classNames.group}>
          {title}
          {/* Hidden from the group's accessible name. */}
          {prefix && <Keyboard aria-hidden="true">{prefix}</Keyboard>}
        </Header>
      )}
      {children}
    </MenuSection>
  );
};
