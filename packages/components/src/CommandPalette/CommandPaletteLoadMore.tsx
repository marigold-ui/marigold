import { MenuLoadMoreItem } from 'react-aria-components/Menu';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { useCommandPalette } from './Context';

// Props
// ---------------
export interface CommandPaletteLoadMoreProps {
  /**
   * Called when people scroll close to the end of the group. Load the next
   * page here. Stop rendering `LoadMore` once there is nothing left to load,
   * or once the group shows as many rows as the palette should hold.
   */
  onLoadMore?: () => void;

  /**
   * Whether the next page is loading. Shows a spinner at the end of the group.
   * @default false
   */
  loading?: boolean;

  /**
   * How early loading starts, as a multiple of the list's visible height
   * left to scroll.
   * @default 1
   */
  scrollOffset?: number;
}

// Component
// ---------------
// The last child of a group. An invisible marker until it nears the visible
// part of the list, then it asks for the next page.
export const CommandPaletteLoadMore = ({
  loading = false,
  ...props
}: CommandPaletteLoadMoreProps) => {
  const { classNames } = useCommandPalette();
  return (
    <MenuLoadMoreItem
      {...props}
      isLoading={loading}
      className={classNames.loadMore}
    >
      <ProgressCircle />
    </MenuLoadMoreItem>
  );
};
