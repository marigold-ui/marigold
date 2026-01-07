'use client';

import { Select } from '@marigold/components';

export default () => (
  <Select label="Genres" width="fit">
    {options.map(item => (
      <Select.Section key={item.category} header={item.category}>
        {item.genres.map(genre => (
          <Select.Option key={genre}>{genre}</Select.Option>
        ))}
      </Select.Section>
    ))}
  </Select>
);

const options = [
  {
    category: 'Pop and Dance',
    genres: ['Pop', 'Electropop', 'Dance-pop', 'Teen pop', 'Disco'],
  },
  {
    category: 'Rock and Alternative',
    genres: [
      'Hard rock',
      'Punk rock',
      'Alternative rock',
      'Indie rock',
      'Grunge',
    ],
  },
  {
    category: 'Hip-Hop and R&B',
    genres: ['Hip-Hop', 'Rap', 'Trap', 'R&B'],
  },
];
