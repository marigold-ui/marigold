import { useState } from 'react';
import { Key } from '@react-types/shared';
import { TagField } from '@marigold/components';

const categories = [
  {
    name: 'Rock and Alternative',
    genres: [
      { id: 'rock', name: 'Rock' },
      { id: 'indie', name: 'Indie Rock' },
      { id: 'punk', name: 'Punk Rock' },
      { id: 'grunge', name: 'Grunge' },
    ],
  },
  {
    name: 'Electronic',
    genres: [
      { id: 'house', name: 'House' },
      { id: 'techno', name: 'Techno' },
      { id: 'ambient', name: 'Ambient' },
    ],
  },
  {
    name: 'Jazz and Blues',
    genres: [
      { id: 'jazz', name: 'Jazz' },
      { id: 'blues', name: 'Blues' },
      { id: 'bebop', name: 'Bebop' },
    ],
  },
];

export default () => {
  const [selected, setSelected] = useState<Key[]>([]);

  return (
    <TagField label="Genres" value={selected} onChange={setSelected} width={80}>
      {categories.map(category => (
        <TagField.Section key={category.name} header={category.name}>
          {category.genres.map(genre => (
            <TagField.Option key={genre.id} id={genre.id}>
              {genre.name}
            </TagField.Option>
          ))}
        </TagField.Section>
      ))}
    </TagField>
  );
};
