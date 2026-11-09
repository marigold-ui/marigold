import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Button,
  Description,
  ListView,
  TextValue,
  useActionBar,
} from '@marigold/components';
import { Archive, Tag } from '@marigold/icons';

const events = [
  { id: '1', name: 'Jazz Night', detail: 'Aug 12, 2026 · Jazzhaus Freiburg' },
  { id: '2', name: 'Open Air Kino', detail: 'Aug 15, 2026 · Mensagarten' },
  { id: '3', name: 'Poetry Slam', detail: 'Aug 21, 2026 · Vorderhaus' },
  { id: '4', name: 'Herbstmarkt', detail: 'Sep 5, 2026 · Messe Freiburg' },
  { id: '5', name: 'Wine Tasting', detail: 'Sep 12, 2026 · Alte Wache' },
  { id: '6', name: 'Klassik im Park', detail: 'Sep 19, 2026 · Stadtgarten' },
];

export default () => {
  const { selectedKeys, onSelectionChange, actionBarHeight, actionBarOverlay } =
    useActionBar({
      actionBar: (keys: Selection) => {
        const count = keys === 'all' ? events.length : keys.size;

        return (
          <ActionBar>
            <Button onPress={() => alert(`Assign category to ${count} events`)}>
              <Tag />
              Assign category
            </Button>
            <Button onPress={() => alert(`Archive ${count} events`)}>
              <Archive />
              Archive
            </Button>
          </ActionBar>
        );
      },
    });

  const room = actionBarHeight
    ? `calc(${actionBarHeight}px + var(--actionbar-offset, 8px))`
    : undefined;

  return (
    <div
      className="max-h-72 overflow-y-auto"
      style={{ scrollPaddingBottom: room }}
    >
      <div style={{ paddingBottom: room }}>
        <ListView
          aria-label="Events"
          selectionMode="multiple" // [!code highlight]
          allowSelectAll // [!code highlight]
          selectedKeys={selectedKeys}
          onSelectionChange={onSelectionChange}
          items={events}
        >
          {(event: (typeof events)[number]) => (
            <ListView.Item textValue={event.name}>
              <TextValue>{event.name}</TextValue>
              <Description>{event.detail}</Description>
            </ListView.Item>
          )}
        </ListView>
        {actionBarOverlay}
      </div>
    </div>
  );
};
