import type { Key } from 'react';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Drawer,
  Inline,
  Radio,
  SearchField,
  Stack,
  Tag,
} from '@marigold/components';
import { ListFilter } from '@marigold/icons';

interface Filter {
  categories: string[];
  // An empty string means "no status filter" (a default treated as no filter).
  status: string;
}

const noFilter: Filter = { categories: [], status: '' };

const categoryLabels: Record<string, string> = {
  concerts: 'Concerts',
  festivals: 'Festivals',
  theater: 'Theater',
  workshops: 'Workshops',
};

const statusLabels: Record<string, string> = {
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
};

export default () => {
  const [open, setOpen] = useState(false);
  // The panel edits a draft and only commits it to `applied` on Apply.
  const [applied, setApplied] = useState<Filter>(noFilter);
  const [draft, setDraft] = useState<Filter>(noFilter);

  const onOpenChange = (isOpen: boolean) => {
    // The panel always opens with the applied state.
    if (isOpen) {
      setDraft(applied);
    }
    setOpen(isOpen);
  };

  const apply = () => {
    setApplied(draft); // [!code highlight]
    setOpen(false);
  };

  const tags = [
    ...(applied.categories.length > 0
      ? [
          {
            id: 'categories',
            label: `Category is ${applied.categories
              .map(category => categoryLabels[category])
              .join(' or ')}`,
          },
        ]
      : []),
    ...(applied.status
      ? [{ id: 'status', label: `Status is ${statusLabels[applied.status]}` }]
      : []),
  ];

  const removeTags = (keys: Set<Key>) => {
    setApplied(prev => ({
      categories: keys.has('categories') ? [] : prev.categories,
      status: keys.has('status') ? '' : prev.status,
    }));
  };

  return (
    <Stack space={4}>
      {/* Filter bar: a plain layout composition, not a toolbar widget */}
      <Inline space="related" alignY="input">
        <SearchField
          aria-label="Search events"
          placeholder="Search events"
          width={56}
        />
        <Drawer.Trigger open={open} onOpenChange={onOpenChange}>
          <Button>
            <ListFilter /> Filter
          </Button>
          <Drawer closeButton>
            <Drawer.Title>Filter events</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <Checkbox.Group
                  label="Category"
                  value={draft.categories}
                  onChange={categories =>
                    setDraft(prev => ({ ...prev, categories }))
                  }
                >
                  <Checkbox value="concerts" label="Concerts" />
                  <Checkbox value="festivals" label="Festivals" />
                  <Checkbox value="theater" label="Theater" />
                  <Checkbox value="workshops" label="Workshops" />
                </Checkbox.Group>
                <Radio.Group
                  label="Status"
                  value={draft.status}
                  onChange={status => setDraft(prev => ({ ...prev, status }))}
                >
                  <Radio value="published">Published</Radio>
                  <Radio value="draft">Draft</Radio>
                  <Radio value="archived">Archived</Radio>
                </Radio.Group>
              </Stack>
            </Drawer.Content>
            <Drawer.Actions>
              <Button slot="close">Cancel</Button>
              <Button variant="primary" onPress={apply}>
                Apply
              </Button>
            </Drawer.Actions>
          </Drawer>
        </Drawer.Trigger>
      </Inline>

      {/* Rendered only while filters are active */}
      {tags.length > 0 && (
        <Tag.Group label="Applied Filters" onRemove={removeTags} removeAll>
          {tags.map(tag => (
            <Tag key={tag.id} id={tag.id}>
              {tag.label}
            </Tag>
          ))}
        </Tag.Group>
      )}
    </Stack>
  );
};
