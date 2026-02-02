import { useDragAndDrop } from 'react-aria-components';
import { useListData } from 'react-stately';
import { Table, Text } from '@marigold/components';

export default () => {
  const list = useListData({
    initialItems: [
      { id: 1, name: 'Hans Müller', location: 'Berlin, BE' },
      { id: 2, name: 'Fritz Schneider', location: 'München, BY' },
      { id: 3, name: 'Klaus Becker', location: 'Hamburg, HH' },
      { id: 4, name: 'Helga Fischer', location: 'Stuttgart, BW' },
    ],
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
      aria-label="Reorderable users"
      selectionMode="multiple"
      dragAndDropHooks={dragAndDropHooks}
    >
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Location</Table.Column>
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row>
            <Table.Cell>
              <Text weight="medium">{item.name}</Text>
            </Table.Cell>
            <Table.Cell>{item.location}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
