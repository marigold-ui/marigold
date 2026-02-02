import { people } from '@/lib/data/people';
import { useDragAndDrop } from 'react-aria-components';
import { useListData } from 'react-stately';
import { Stack, Table, Text } from '@marigold/components';

export default () => {
  const list = useListData({
    initialItems: people.slice(0, 5),
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
      aria-label="Reorderable team members"
      selectionMode="multiple"
      dragAndDropHooks={dragAndDropHooks}
    >
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Position</Table.Column>
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row>
            <Table.Cell>
              <Stack space={2} alignItems="center" direction="row">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="size-8 rounded-full object-cover"
                />
                <Text weight="medium">{item.name}</Text>
              </Stack>
            </Table.Cell>
            <Table.Cell>
              <Text size="sm" color="muted-foreground">
                {item.position}
              </Text>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
