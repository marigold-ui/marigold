import { uploads } from '@/lib/data/uploads';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Button,
  Description,
  ListView,
  TextValue,
  useActionBar,
} from '@marigold/components';
import { Archive, Download } from '@marigold/icons';

export default () => {
  // The hook holds the selection and measures the bar, so the count and the
  // clear button are filled in for you.
  const { selectedKeys, onSelectionChange, actionBarHeight, actionBarOverlay } =
    useActionBar({
      // [!code highlight]
      actionBar: (keys: Selection) => {
        const count = keys === 'all' ? uploads.length : keys.size;

        return (
          <ActionBar>
            <Button onPress={() => alert(`Download ${count} files`)}>
              <Download />
              Download
            </Button>
            <Button onPress={() => alert(`Archive ${count} files`)}>
              <Archive />
              Archive
            </Button>
          </ActionBar>
        );
      },
    });

  // Reserving the bar's height keeps it off the last rows and stops keyboard
  // scrolling parking a row underneath it.
  const room = actionBarHeight
    ? `calc(${actionBarHeight}px + var(--actionbar-offset, 8px))`
    : undefined;

  return (
    // The reservation goes on the content, not on the scroll container: a
    // scroller's own padding shrinks the rectangle its sticky children pin to,
    // which lifts the bar off the bottom by exactly the height you reserved.
    <div
      className="max-h-64 overflow-y-auto"
      style={{ scrollPaddingBottom: room }}
    >
      <div style={{ paddingBottom: room }}>
        <ListView
          aria-label="Uploads"
          selectionMode="multiple" // [!code highlight]
          selectedKeys={selectedKeys}
          onSelectionChange={onSelectionChange}
          items={uploads}
        >
          {(upload: (typeof uploads)[number]) => (
            <ListView.Item textValue={upload.name}>
              <TextValue>{upload.name}</TextValue>
              <Description>{upload.detail}</Description>
            </ListView.Item>
          )}
        </ListView>
        {actionBarOverlay}
      </div>
    </div>
  );
};
