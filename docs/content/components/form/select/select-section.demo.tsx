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
    {
      category: 'Pop',
      genres: [
        'Brit-Pop',
        'Chanson',
        'Country-Pop',
        'Dancefloor',
        'Disco',
        'New Wave',
        'Pop-Klassik',
        'Pop-Rock',
        'Rave/Madchester',
        'Synth Pop',
      ],
    },
  ];

  return (
    <Select label="Genres" items={items}>
      {items.map(item => (
        <Select.Section key={item.category}>
          <Header>{item.category}</Header>
          {item.genres.map(genre => (
            <Select.Option>{genre}</Select.Option>
          ))}
        </Select.Section>
      ))}
    </Select>
  );
};
