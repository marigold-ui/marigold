import { useState } from 'react';
import { Tag } from '@marigold/components';

export default () => {
  const defaultTags = [
    { id: 1, name: 'Thor' },
    { id: 2, name: 'Iron Man' },
    { id: 3, name: 'Black Panther' },
    { id: 4, name: 'Groot' },
  ];

  const [tags, setTags] = useState(defaultTags);

  let removeItem = (keys: Set<number>) => {
    setTags(prevItems => prevItems.filter(tag => !keys.has(tag.id)));
  };

  return (
    <Tag.Group
      items={tags}
      aria-label="TagGrooup removing example"
      allowsRemoving
      onRemove={removeItem}
    >
      {(tag: { id: number; name: string }) => <Tag>{tag.name}</Tag>}
    </Tag.Group>
  );
};
