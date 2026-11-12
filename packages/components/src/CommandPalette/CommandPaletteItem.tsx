import { Fragment, createElement } from 'react';
import { useCollator } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import {
  MenuItemCore,
  type MenuItemProps,
  getItemText,
} from '../Menu/MenuItem';
import { useDevWarning } from '../utils/useDevWarning';
import { useCommandPalette } from './Context';

// Props
// ---------------
export type CommandPaletteItemProps = MenuItemProps;

// Helpers
// ---------------
// First range of `text` that the default filter would match: the same
// locale-aware, accent- and case-insensitive comparison (so "cafe" marks
// "café"). Assumes the matched range is as long as the query, which holds for
// precomposed text.
const findMatch = (text: string, query: string, collator: Intl.Collator) => {
  for (let i = 0; i + query.length <= text.length; i++) {
    if (collator.compare(text.slice(i, i + query.length), query) === 0) {
      return [i, i + query.length] as const;
    }
  }
  return null;
};

interface HighlightProps {
  text: string;
  query: string;
  className?: string;
}

const Highlight = ({ text, query, className }: HighlightProps) => {
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });
  const match = query ? findMatch(text, query, collator) : null;
  if (!match) return text;

  const [start, end] = match;
  // One element, so the item grid places the label as a single cell.
  return (
    <span>
      {text.slice(0, start)}
      <mark className={className}>{text.slice(start, end)}</mark>
      {text.slice(end)}
    </span>
  );
};

// Component
// ---------------
// Shares the menu item's behaviour, not its styles: the palette's rows are
// larger than a menu's. On top it marks the part of a plain-text label that
// matched the query.
export const CommandPaletteItem = ({
  variant,
  size,
  children,
  textValue,
  onAction,
  shouldCloseOnSelect = true,
  ...props
}: CommandPaletteItemProps) => {
  const { inputValue, filter, close } = useCommandPalette();
  const classNames = useClassNames({
    component: 'CommandPalette',
    variant,
    size,
  });

  // `MenuItemCore` only sees the highlighted label, so derive it here.
  const text = textValue ?? getItemText(children);
  useDevWarning(
    text === undefined,
    '[CommandPalette.Item] Has no `textValue`, so it can never match a ' +
      'search query. Pass `textValue` when the children are not plain text.'
  );

  // Only the default filter has a known matching rule to highlight.
  const query = filter === undefined ? inputValue.trim() : '';
  // Top-level text is the label, also next to an icon. The parts are spread
  // as arguments, so the static children need no keys.
  const label =
    typeof children === 'function'
      ? children
      : createElement(
          Fragment,
          null,
          ...(Array.isArray(children) ? children : [children]).map(part =>
            typeof part === 'string' ? (
              // eslint-disable-next-line @eslint-react/no-missing-key -- spread as arguments, see above
              <Highlight
                text={part}
                query={query}
                className={classNames.match}
              />
            ) : (
              part
            )
          )
        );

  return (
    <MenuItemCore
      {...props}
      variant={variant}
      textValue={text}
      classNames={classNames}
      // An item that leads further, e.g. into a search for one kind of
      // record, keeps the palette open with `shouldCloseOnSelect={false}`.
      onAction={() => {
        onAction?.();
        if (shouldCloseOnSelect) close();
      }}
    >
      {label}
    </MenuItemCore>
  );
};
