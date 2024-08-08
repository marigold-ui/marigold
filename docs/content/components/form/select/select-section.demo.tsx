import { Header, Select } from '@marigold/components';

export default () => {
  const items = [
    { category: 'Comedy', genres: ['Kabarett', 'Satire', 'Stand Up Comedy'] },
    {
      category: 'Classic',
      genres: ['Chor', 'Kammermusik', 'Kantate', 'Klavierkonzert'],
    },
    {
      category: 'Hardcore',
      genres: [
        'Hardcore Punk',
        'Jazzcore',
        'Mathcore',
        'Melodic Hardcore',
        'Metalcore',
      ],
    },
    {
      category: 'Metal',
      genres: ['Black Metal', 'Death Metal', 'Heavy Metal', 'Nu Metal'],
    },
  ];

  return (
    <Select label="Genres" items={items} width="fit">
      {items.map(item => (
        <Select.Section key={item.category}>
          <Header>{item.category}</Header>
          {item.genres.map(genre => (
            <Select.Option key={genre}>{genre}</Select.Option>
          ))}
        </Select.Section>
      ))}
    </Select>
  );
};
