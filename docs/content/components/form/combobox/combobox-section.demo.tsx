import { ComboBox } from '@marigold/components';

export default () => (
  <ComboBox label="Genres" width="fit">
    {options.map(item => (
      <ComboBox.Section key={item.category} header={item.category}>
        {item.genres.map(genre => (
          <ComboBox.Option key={genre}>{genre}</ComboBox.Option>
        ))}
      </ComboBox.Section>
    ))}
  </ComboBox>
);

const options = [
  {
    category: 'Pop and Dance',
    genres: [
      'Pop',
      'Synth-pop',
      'Electropop',
      'Dance-pop',
      'Teen pop',
      'Disco',
    ],
  },
  {
    category: 'Rock and Alternative',
    genres: [
      'Rock',
      'Hard rock',
      'Punk rock',
      'Alternative rock',
      'Indie rock',
      'Grunge',
      'Psychedelic rock',
    ],
  },
  {
    category: 'Hip-Hop and R&B',
    genres: ['Hip-Hop', 'Rap', 'Trap', 'R&B', 'Neo-soul'],
  },
  {
    category: 'Electronic and Experimental',
    genres: ['EDM', 'House', 'Techno', 'Dubstep', 'Ambient', 'Industrial'],
  },
  {
    category: 'Jazz and Blues',
    genres: [
      'Jazz',
      'Smooth jazz',
      'Bebop',
      'Blues',
      'Delta blues',
      'Chicago blues',
    ],
  },
  {
    category: 'Classical and Orchestral',
    genres: ['Classical', 'Baroque', 'Opera', 'Symphony', 'Chamber music'],
  },
  {
    category: 'Folk and Country',
    genres: ['Folk', 'Country', 'Bluegrass', 'Americana'],
  },
  {
    category: 'Latin and World',
    genres: ['Reggaeton', 'Salsa', 'Bossa Nova', 'Flamenco', 'Afrobeats'],
  },
  {
    category: 'Metal and Hard Music',
    genres: ['Heavy metal', 'Thrash metal', 'Death metal', 'Doom metal'],
  },
  {
    category: 'Reggae and Caribbean',
    genres: ['Reggae', 'Ska', 'Dancehall', 'Soca'],
  },
];
