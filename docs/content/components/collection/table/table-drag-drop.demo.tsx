import { venues } from '@/lib/data/venues';
import { useDragAndDrop } from 'react-aria-components';
import { useListData } from 'react-stately';
import { Table, Text } from '@marigold/components';

export default () => {
  const list = useListData({
    initialItems: venues.slice(0, 5),
  });

  const { dragAndDropHooks } = useDragAndDrop({
    renderDropIndicator: Table.renderDropIndicator,
    renderDragPreview: Table.renderDragPreview,
    getItems: keys =>
      [...keys].map(key => ({
        'text/plain': list.getItem(key)!.name,
      })),
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    },
  });

  return (
    <Table
      aria-label="Reorderable venues"
      selectionMode="multiple"
      dragAndDropHooks={dragAndDropHooks}
    >
      <Table.Header>
        <Table.Column>Venue</Table.Column>
        <Table.Column>City</Table.Column>
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row>
            <Table.Cell>
              <Text weight="medium">{item.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="sm" color="muted-foreground">
                {item.city}, {item.country}
              </Text>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
