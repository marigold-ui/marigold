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

const uploads = [
  { id: 'report', name: 'Report Q1.pdf', detail: '3 days ago · 2.1 MB' },
  { id: 'season', name: 'Season plan.xlsx', detail: 'Yesterday · 640 KB' },
  {
    id: 'contract',
    name: 'Venue contract.pdf',
    detail: '2 weeks ago · 1.2 MB',
  },
  { id: 'floorplan', name: 'Floor plan.png', detail: '3 weeks ago · 4.7 MB' },
  { id: 'rider', name: 'Tech rider.pdf', detail: 'Last month · 320 KB' },
  { id: 'invoice', name: 'Invoice 2291.pdf', detail: 'Last month · 88 KB' },
];

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

  // The bar is sticky, so it pins to the bottom of this scroll container.
  // Reserving its height in both paddings keeps it off the last rows and stops
  // keyboard scrolling parking a row underneath it.
  const room = actionBarHeight
    ? `calc(${actionBarHeight}px + var(--actionbar-offset, 8px))`
    : undefined;

  return (
    <div
      className="max-h-64 overflow-y-auto"
      style={{ paddingBottom: room, scrollPaddingBottom: room }} // [!code highlight]
    >
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
  );
};
