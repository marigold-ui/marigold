import { ComboBox, Text } from '@marigold/components';

export default () => (
  <ComboBox label="Genres" width="fit">
    {options.map(item => (
      <ComboBox.Section key={item.category} header={item.category}>
        {item.genres.map(genre => (
          <ComboBox.Option
            key={genre.name}
            id={genre.id}
            textValue={genre.name}
          >
            <Text slot="label">{genre.name}</Text>
            <Text slot="description">{genre.description}</Text>
          </ComboBox.Option>
        ))}
      </ComboBox.Section>
    ))}
  </ComboBox>
);

const options = [
  {
    category: 'Pop and Dance',
    genres: [
      {
        id: 'pop',
        name: 'Pop',
        description: 'Catchy, upbeat music with mass appeal',
      },
      {
        id: 'synth-pop',
        name: 'Synth-pop',
        description: 'Synthesizer-driven pop music from the 80s',
      },
      {
        id: 'electropop',
        name: 'Electropop',
        description: 'Electronic pop with heavy digital production',
      },
      {
        id: 'dance-pop',
        name: 'Dance-pop',
        description: 'Upbeat pop music designed for dancing',
      },
      {
        id: 'teen-pop',
        name: 'Teen pop',
        description: 'Youth-oriented pop music with catchy hooks',
      },
      {
        id: 'disco',
        name: 'Disco',
        description: 'Dance-oriented 70s music with orchestral arrangements',
      },
    ],
  },
  {
    category: 'Rock and Alternative',
    genres: [
      {
        id: 'rock',
        name: 'Rock',
        description: 'Guitar-driven music with strong rhythms',
      },
      {
        id: 'hard-rock',
        name: 'Hard rock',
        description: 'Heavier, more aggressive rock style',
      },
      {
        id: 'punk-rock',
        name: 'Punk rock',
        description: 'Raw, fast-paced music with anti-establishment themes',
      },
      {
        id: 'alternative-rock',
        name: 'Alternative rock',
        description: 'Non-mainstream rock emerging from indie scenes',
      },
      {
        id: 'indie-rock',
        name: 'Indie rock',
        description: 'Independent-label rock with DIY ethos',
      },
      {
        id: 'grunge',
        name: 'Grunge',
        description: 'Raw, distorted sound from the Seattle scene',
      },
      {
        id: 'psychedelic-rock',
        name: 'Psychedelic rock',
        description: 'Mind-altering rock with experimental sounds',
      },
    ],
  },
  {
    category: 'Hip-Hop and R&B',
    genres: [
      {
        id: 'hip-hop',
        name: 'Hip-Hop',
        description: 'Urban music with rhythmic beats and rhyming speech',
      },
      {
        id: 'rap',
        name: 'Rap',
        description: 'Rhythmic vocal style over beat-driven backing',
      },
      {
        id: 'trap',
        name: 'Trap',
        description: 'Southern hip-hop with heavy bass and hi-hats',
      },
      {
        id: 'r&b',
        name: 'R&B',
        description: 'Rhythm and blues combining soul and pop elements',
      },
      {
        id: 'neo-soul',
        name: 'Neo-soul',
        description: 'Modern soul music with hip-hop influences',
      },
    ],
  },
  {
    category: 'Electronic and Experimental',
    genres: [
      {
        id: 'edm',
        name: 'EDM',
        description: 'Electronic Dance Music for festival crowds',
      },
      {
        id: 'house',
        name: 'House',
        description: 'Repetitive 4/4 beats with synth basslines',
      },
      {
        id: 'techno',
        name: 'Techno',
        description: 'Minimal electronic music with mechanical rhythms',
      },
      {
        id: 'dubstep',
        name: 'Dubstep',
        description: 'Bass-heavy electronic music with wobble effects',
      },
      {
        id: 'ambient',
        name: 'Ambient',
        description: 'Atmospheric, texture-based electronic soundscapes',
      },
      {
        id: 'industrial',
        name: 'Industrial',
        description: 'Harsh electronic sounds mixed with punk elements',
      },
    ],
  },
  {
    category: 'Jazz and Blues',
    genres: [
      {
        id: 'jazz',
        name: 'Jazz',
        description: 'Improvisational music with swing and blue notes',
      },
      {
        id: 'smooth-jazz',
        name: 'Smooth Jazz',
        description: 'Polished, radio-friendly jazz style',
      },
      {
        id: 'bebop',
        name: 'Bebop',
        description: 'Complex, fast-tempo jazz improvisation',
      },
      {
        id: 'blues',
        name: 'Blues',
        description: 'Soulful music based on blues scales and patterns',
      },
      {
        id: 'delta-blues',
        name: 'Delta Blues',
        description: 'Acoustic blues from the Mississippi Delta',
      },
      {
        id: 'chicago-blues',
        name: 'Chicago Blues',
        description: 'Electric blues with amplified instruments',
      },
    ],
  },
  {
    category: 'Classical and Orchestral',
    genres: [
      {
        id: 'classical',
        name: 'Classical',
        description: 'Traditional Western art music',
      },
      {
        id: 'baroque',
        name: 'Baroque',
        description: 'Ornate style from 1600-1750 with harpsichords',
      },
      {
        id: 'opera',
        name: 'Opera',
        description: 'Dramatic stage works combining music and theater',
      },
      {
        id: 'symphony',
        name: 'Symphony',
        description: 'Large-scale orchestral compositions',
      },
      {
        id: 'chamber-music',
        name: 'Chamber Music',
        description: 'Classical music for small ensembles',
      },
    ],
  },
  {
    category: 'Folk and Country',
    genres: [
      {
        id: 'folk',
        name: 'Folk',
        description: 'Traditional music with acoustic instrumentation',
      },
      {
        id: 'country',
        name: 'Country',
        description: 'Storytelling music with roots in rural America',
      },
      {
        id: 'bluegrass',
        name: 'Bluegrass',
        description: 'Fast-paced acoustic music with banjo and fiddle',
      },
      {
        id: 'americana',
        name: 'Americana',
        description: 'Blend of country, folk, and roots music',
      },
    ],
  },
  {
    category: 'Latin and World',
    genres: [
      {
        id: 'reggaeton',
        name: 'Reggaeton',
        description: 'Puerto Rican blend of reggae and Latin rhythms',
      },
      {
        id: 'salsa',
        name: 'Salsa',
        description: 'Energetic Cuban-derived dance music',
      },
      {
        id: 'bossa-nova',
        name: 'Bossa Nova',
        description: 'Brazilian jazz-samba fusion with smooth rhythms',
      },
      {
        id: 'flamenco',
        name: 'Flamenco',
        description: 'Passionate Spanish music with guitar and dance',
      },
      {
        id: 'afrobeats',
        name: 'Afrobeats',
        description: 'West African pop music with complex rhythms',
      },
    ],
  },
  {
    category: 'Metal and Hard Music',
    genres: [
      {
        id: 'heavy-metal',
        name: 'Heavy Metal',
        description: 'Loud, aggressive music with distorted guitars',
      },
      {
        id: 'thrash-metal',
        name: 'Thrash Metal',
        description: 'Fast, technical metal with punk influences',
      },
      {
        id: 'death-metal',
        name: 'Death Metal',
        description: 'Extreme metal with growled vocals and blast beats',
      },
      {
        id: 'doom-metal',
        name: 'Doom Metal',
        description: 'Slow, heavy metal with dark atmospheres',
      },
    ],
  },
  {
    category: 'Reggae and Caribbean',
    genres: [
      {
        id: 'reggae',
        name: 'Reggae',
        description: 'Jamaican music with offbeat rhythms',
      },
      {
        id: 'ska',
        name: 'Ska',
        description: 'Jamaican precursor to reggae with walking bassline',
      },
      {
        id: 'dancehall',
        name: 'Dancehall',
        description: 'Digital reggae style with rapid lyrical delivery',
      },
      {
        id: 'soca',
        name: 'Soca',
        description: 'Upbeat Caribbean dance music from Trinidad',
      },
    ],
  },
];
