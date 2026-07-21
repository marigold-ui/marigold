import { useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Key } from '@react-types/shared';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Tag } from './Tag';

const meta = preview.meta({
  title: 'Components/Tag',
  component: Tag.Group,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Categories',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    onChange: fn(),
  },
  render: args => (
    <Tag.Group {...args} selectionMode="multiple" label="Categories">
      <Tag id="news">News</Tag>
      <Tag id="travel">Travel</Tag>
      <Tag id="gaming">Gaming</Tag>
      <Tag id="shopping">Shopping</Tag>
    </Tag.Group>
  ),
});

Basic.test(
  'Selects multiple tags',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('News'));
    await userEvent.click(canvas.getByText('Gaming'));

    expect(args.onChange).toHaveBeenCalledWith(
      expect.objectContaining(new Set(['news', 'gaming']))
    );
  }
);

Basic.test(
  'Navigates between tags with arrow keys',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const news = canvas.getByText('News').closest('[role="row"]')!;
    const travel = canvas.getByText('Travel').closest('[role="row"]')!;
    const gaming = canvas.getByText('Gaming').closest('[role="row"]')!;

    (news as HTMLElement).focus();
    expect(news).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(travel).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(gaming).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(travel).toHaveFocus();
  }
);

export const RemovableTags = meta.story({
  tags: ['component-test'],
  render: args => {
    const defaultItems = [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' },
    ];

    const [items, setItems] =
      useState<{ id: number; name: string }[]>(defaultItems);

    const onRemove = (keys: Set<Key>) => {
      setItems(prevItems => prevItems.filter(item => !keys.has(item.id)));
    };

    return (
      <Stack space={6} alignX="left">
        <Tag.Group {...args} items={items} onRemove={onRemove}>
          {(item: { id: number; name: string }) => <Tag>{item.name}</Tag>}
        </Tag.Group>
        <Button onPress={() => setItems(defaultItems)}>Reset</Button>
      </Stack>
    );
  },
});

RemovableTags.test(
  'Removes individual tags and resets',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const news = canvas.getByText('News');
    const shopping = canvas.getByText('Shopping');

    await userEvent.click(within(news).getByRole('button'));
    await userEvent.click(within(shopping).getByRole('button'));

    await waitFor(() => expect(news).not.toBeInTheDocument());
    await waitFor(() => expect(shopping).not.toBeInTheDocument());
  }
);

export const RemovableAllTags = meta.story({
  tags: ['component-test'],
  render: args => {
    const defaultItems = [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' },
    ];

    const [items, setItems] =
      useState<{ id: number; name: string }[]>(defaultItems);

    const onRemove = (keys: Set<Key>) => {
      setItems(prevItems => prevItems.filter(item => !keys.has(item.id)));
    };

    return (
      <I18nProvider locale="en-US">
        <Stack space={6} alignX="left">
          <Tag.Group
            {...args}
            items={items}
            onRemove={onRemove}
            removeAll
            emptyState={() => (
              <Text variant="muted" fontSize="sm" fontStyle="italic">
                No tags.
              </Text>
            )}
          >
            {(item: { id: number; name: string }) => <Tag>{item.name}</Tag>}
          </Tag.Group>
          <Button onPress={() => setItems(defaultItems)}>Reset</Button>
        </Stack>
      </I18nProvider>
    );
  },
});

RemovableAllTags.test('Remove all tags test', async ({ canvas, userEvent }) => {
  const removeAll = canvas.getByText('Remove all');
  await userEvent.click(removeAll);

  await waitFor(() =>
    expect(canvas.queryByText('News')).not.toBeInTheDocument()
  );
  await waitFor(() =>
    expect(canvas.queryByText('Travel')).not.toBeInTheDocument()
  );
  await waitFor(() =>
    expect(canvas.queryByText('Gaming')).not.toBeInTheDocument()
  );
  await waitFor(() =>
    expect(canvas.queryByText('Shopping')).not.toBeInTheDocument()
  );
});

RemovableAllTags.test(
  'Remove all button is hidden when fewer than 2 tags remain',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    // Start with 4 tags, "Remove all" should be visible
    expect(canvas.getByText('Remove all')).toBeInTheDocument();

    // Remove tags until only 1 remains
    const news = canvas.getByText('News');
    await userEvent.click(within(news).getByRole('button'));
    await waitFor(() =>
      expect(canvas.queryByText('News')).not.toBeInTheDocument()
    );

    const travel = canvas.getByText('Travel');
    await userEvent.click(within(travel).getByRole('button'));
    await waitFor(() =>
      expect(canvas.queryByText('Travel')).not.toBeInTheDocument()
    );

    const gaming = canvas.getByText('Gaming');
    await userEvent.click(within(gaming).getByRole('button'));
    await waitFor(() =>
      expect(canvas.queryByText('Gaming')).not.toBeInTheDocument()
    );

    // Only 1 tag left — "Remove all" should be hidden
    await waitFor(() =>
      expect(canvas.queryByText('Remove all')).not.toBeInTheDocument()
    );
  }
);

export const WithError = meta.story({
  render: args => (
    <Tag.Group
      {...args}
      selectionMode="multiple"
      label="Categories"
      error
      errorMessage="Please pick at least one category."
    >
      <Tag id="news">News</Tag>
      <Tag id="travel">Travel</Tag>
      <Tag id="gaming">Gaming</Tag>
      <Tag id="shopping">Shopping</Tag>
    </Tag.Group>
  ),
});

export const WithForm = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const submitted = formData.getAll('categories').join(',');
        (e.currentTarget.querySelector(
          '[data-testid=submitted]'
        ) as HTMLElement)!.textContent = `submitted: ${submitted}`;
      }}
    >
      <Stack space={4} alignX="left">
        <Tag.Group
          {...args}
          selectionMode="multiple"
          label="Categories"
          name="categories"
        >
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </Tag.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <pre data-testid="submitted">submitted:</pre>
      </Stack>
    </Form>
  ),
});

WithForm.test(
  'submits the selected tags as form data',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await userEvent.click(await canvas.findByText('Travel'));
    await userEvent.click(canvas.getByText('Gaming'));
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(canvas.getByTestId('submitted')).toHaveTextContent(
        'submitted: travel,gaming'
      );
    });
  }
);

export const Required = meta.story({
  tags: ['component-test'],
  render: args => (
    <Form>
      <Stack space={4} alignX="left">
        <Tag.Group
          {...args}
          selectionMode="multiple"
          label="Categories"
          name="categories"
          required
          errorMessage="Pick at least one category."
        >
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </Tag.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Stack>
    </Form>
  ),
});

Required.test(
  'shows the validation error when submitted without a selection',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(
        canvas.getByText('Pick at least one category.')
      ).toBeInTheDocument()
    );
  }
);

export const CollapseAt = meta.story({
  tags: ['component-test'],
  args: {
    collapseAt: 5,
    onChange: fn(),
  },
  render: args => (
    <I18nProvider locale="en-US">
      <Tag.Group {...args} selectionMode="multiple" label="Categories">
        <Tag id="news">News</Tag>
        <Tag id="travel">Travel</Tag>
        <Tag id="gaming">Gaming</Tag>
        <Tag id="shopping">Shopping</Tag>
        <Tag id="sports">Sports</Tag>
        <Tag id="music">Music</Tag>
        <Tag id="movies">Movies</Tag>
        <Tag id="tech">Tech</Tag>
        <Tag id="food">Food</Tag>
        <Tag id="travelblog">Travel Blog</Tag>
      </Tag.Group>
    </I18nProvider>
  ),
});

CollapseAt.test(
  'hides tags beyond collapseAt and expands on toggle',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    expect(canvas.getByText('News')).toBeVisible();
    expect(canvas.getByText('Sports')).toBeVisible();
    expect(canvas.queryByText('Music')).not.toBeVisible();
    expect(canvas.queryByText('Travel Blog')).not.toBeVisible();
    expect(canvas.getByText('Show 5 more')).toBeVisible();

    await userEvent.click(canvas.getByText('Show 5 more'));

    expect(canvas.getByText('Music')).toBeVisible();
    expect(canvas.getByText('Travel Blog')).toBeVisible();
    expect(canvas.getByText('Show 5 less')).toBeVisible();

    await userEvent.click(canvas.getByText('Show 5 less'));

    expect(canvas.queryByText('Music')).not.toBeVisible();
    expect(canvas.getByText('Show 5 more')).toBeVisible();
  }
);

CollapseAt.test(
  'selecting a hidden tag still works via keyboard-free click after expanding',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ args, canvas }) => {
    await userEvent.click(canvas.getByText('Show 5 more'));
    await userEvent.click(canvas.getByText('Music'));

    expect(args.onChange).toHaveBeenCalledWith(
      expect.objectContaining(new Set(['music']))
    );
  }
);

export const CollapseAtWithRemove = meta.story({
  tags: ['component-test'],
  render: args => {
    const defaultTags = [
      { id: 'news', name: 'News' },
      { id: 'travel', name: 'Travel' },
      { id: 'gaming', name: 'Gaming' },
      { id: 'shopping', name: 'Shopping' },
      { id: 'sports', name: 'Sports' },
      { id: 'music', name: 'Music' },
      { id: 'movies', name: 'Movies' },
    ];
    const [tags, setTags] = useState(defaultTags);

    const onRemove = (keys: Set<Key>) => {
      setTags(prevTags => prevTags.filter(tag => !keys.has(tag.id)));
    };

    return (
      <I18nProvider locale="en-US">
        <Stack space={6} alignX="left">
          <Tag.Group
            {...args}
            collapseAt={3}
            onRemove={onRemove}
            removeAll
            emptyState={() => (
              <Text variant="muted" fontSize="sm" fontStyle="italic">
                No tags.
              </Text>
            )}
          >
            {tags.map(tag => (
              <Tag key={tag.id} id={tag.id}>
                {tag.name}
              </Tag>
            ))}
          </Tag.Group>
          <Button onPress={() => setTags(defaultTags)}>Reset</Button>
        </Stack>
      </I18nProvider>
    );
  },
});

CollapseAtWithRemove.test(
  'the collapsed count shrinks as visible tags are removed',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    expect(canvas.getByText('Show 4 more')).toBeVisible();

    const news = canvas.getByText('News');
    await userEvent.click(within(news).getByRole('button'));

    await waitFor(() =>
      expect(canvas.queryByText('News')).not.toBeInTheDocument()
    );
    expect(canvas.getByText('Show 3 more')).toBeVisible();
  }
);

CollapseAtWithRemove.test(
  'removing all tags shows the empty state and hides the toggle',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await userEvent.click(canvas.getByText('Remove all'));

    await waitFor(() => expect(canvas.getByText('No tags.')).toBeVisible());
    expect(canvas.queryByText(/show \d+ more/i)).not.toBeInTheDocument();
  }
);
