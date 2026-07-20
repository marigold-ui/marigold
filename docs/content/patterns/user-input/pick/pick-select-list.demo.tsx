import { useState } from 'react';
import type { Key } from '@react-types/shared';
import {
  Button,
  Dialog,
  Scrollable,
  SelectList,
  Stack,
  Text,
} from '@marigold/components';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'early-bird', name: 'Early Bird' },
  { id: 'standard', name: 'Standard' },
  { id: 'premium', name: 'Premium' },
  { id: 'vip', name: 'VIP' },
  { id: 'press', name: 'Press' },
  { id: 'student', name: 'Student' },
  { id: 'senior', name: 'Senior' },
  { id: 'child', name: 'Child' },
  { id: 'group', name: 'Group (10+)' },
  { id: 'wheelchair', name: 'Wheelchair space' },
  { id: 'companion', name: 'Companion' },
  { id: 'backstage', name: 'Backstage' },
  { id: 'guest', name: 'Guest' },
  { id: 'comp', name: 'Complimentary' },
];

interface PickBodyProps {
  initial: Key[];
  onConfirm: (ids: Key[]) => void;
}

const PickCategoriesBody = ({ initial, onConfirm }: PickBodyProps) => {
  const [selected, setSelected] = useState<Key[]>(initial);

  return (
    <>
      <Dialog.Title>Select ticket categories</Dialog.Title>
      <Dialog.Content>
        {/* Ticket categories are labels with no detail worth scanning, so the
            results collection is a SelectList rather than a Table. */}
        <Scrollable height="300px">
          <SelectList
            aria-label="Ticket categories"
            selectionMode="multiple"
            items={categories}
            selectedKeys={selected}
            onChange={setSelected}
          >
            {(category: Category) => (
              <SelectList.Option id={category.id}>
                {category.name}
              </SelectList.Option>
            )}
          </SelectList>
        </Scrollable>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        <Button variant="primary" onPress={() => onConfirm(selected)}>
          Add {selected.length}{' '}
          {selected.length === 1 ? 'category' : 'categories'}
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default () => {
  const [added, setAdded] = useState<Key[]>([]);
  const addedNames = categories
    .filter(category => added.includes(category.id))
    .map(category => category.name);

  return (
    <Stack space={5} alignX="left">
      <Dialog.Trigger>
        <Button variant="primary">Add ticket categories</Button>
        <Dialog size="medium" closeButton>
          {({ close }) => (
            <PickCategoriesBody
              initial={added}
              onConfirm={ids => {
                setAdded(ids);
                close();
              }}
            />
          )}
        </Dialog>
      </Dialog.Trigger>
      <Text>
        {addedNames.length === 0
          ? 'No categories added yet.'
          : `Added: ${addedNames.join(', ')}`}
      </Text>
    </Stack>
  );
};
