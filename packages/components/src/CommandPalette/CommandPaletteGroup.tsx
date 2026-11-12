import type { ReactNode } from 'react';
import { Children, useLayoutEffect } from 'react';
import type RAC from 'react-aria-components';
import { Header } from 'react-aria-components/Header';
import { MenuSection } from 'react-aria-components/Menu';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Description } from '../Description/Description';
import { TextValue } from '../TextValue/TextValue';
import { ChevronRight } from '../icons/ChevronRight';
import { intlMessages } from '../intl/messages';
import { CommandPaletteItem } from './CommandPaletteItem';
import { MORE_KEY, useCommandPalette } from './Context';

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
   * for example `e:` for events. The footer lists it with the group's title.
   */
  prefix?: string;

  /**
   * Full label of a last row that narrows the search to this group, for
   * example "More events…". Set it when there are more results than the
   * group shows.
   * Needs a `prefix`, and only shows while the search is not narrowed yet.
   */
  more?: string;

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
  more,
  ...props
}: CommandPaletteGroupProps) => {
  const { classNames, scope, query, registerPrefix, narrowTo } =
    useCommandPalette();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  useLayoutEffect(() => {
    if (prefix) return registerPrefix({ prefix, title: title ?? prefix });
  }, [prefix, title, registerPrefix]);

  // While the search is narrowed to one group, the others step aside.
  if (scope && scope !== prefix) return null;
  // The built-in match drops groups without matches. With `filter={false}`
  // the app filters, and a group it leaves empty (e.g. while server results
  // load) would show a lone title, so it renders nothing.
  // `toArray`, not `count`: `count` also counts `false` from `{cond && …}`.
  // eslint-disable-next-line @eslint-react/no-children-to-array -- an empty group must not render its title
  if (Children.toArray(children).length === 0) return null;
  return (
    <MenuSection {...props}>
      <Header className={classNames.group}>
        {title}
        {prefix && (
          <>
            {/* The footer shows the prefix, this sentence tells screen
                readers, as part of the group's name. */}
            {!scope && (
              <span className="sr-only">
                {stringFormatter.format('commandPalettePrefixHint', {
                  prefix,
                  title: title ?? prefix,
                })}
              </span>
            )}
          </>
        )}
      </Header>
      {children}
      {more && prefix && !scope && (
        // Keeps the palette open: it narrows the search, with the term.
        <CommandPaletteItem
          id={`${MORE_KEY}${prefix}`}
          textValue={`${more} ${query}`}
          shouldCloseOnSelect={false}
          onAction={() => narrowTo(prefix)}
        >
          <ChevronRight />
          <TextValue>{more}</TextValue>
          <Description>
            {stringFormatter.format('commandPaletteOrType', { prefix })}
          </Description>
        </CommandPaletteItem>
      )}
    </MenuSection>
  );
};
