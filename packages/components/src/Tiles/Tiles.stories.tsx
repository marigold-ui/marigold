import preview from '../../../../config/storybook/.storybook/preview';
import { Headline } from '../Headline/Headline';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Tiles } from './Tiles';

const meta = preview.meta({
  title: 'Components/Tiles',
  component: Tiles,
  argTypes: {
    space: {
      control: {
        type: 'text',
      },
      description: 'Responsive Style Value',
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
    tilesWidth: {
      control: {
        type: 'text',
      },
      description: 'Responsive Style Value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '300px' },
      },
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      description:
        'Makes tiles take available width, instead of sticking to the tiles width',
    },
    equalHeight: {
      control: {
        type: 'boolean',
      },
      description:
        'Specifies the size of an implicitly-created grid row track or pattern of tracks.',
    },
  },
  args: {
    tilesWidth: '300px',
  },
});

export const Basic = meta.story({
  render: args => (
    <Tiles {...args}>
      <div className="border-border-brand border bg-orange-100 p-1">
        <Stack space={4} alignX="center">
          <img
            src="https://www.pokewiki.de/images/0/09/Hauptartwork_004.png"
            alt="glumanda"
            width={200}
            height={200}
          />
          <Headline level={4}>Glumanda</Headline>
          <Text>
            Glumanda ist ein Pokémon mit dem Typ Feuer und existiert seit der
            ersten Spielgeneration. Es ist neben Bisasam und Schiggy eines der
            Starter-Pokémon in Pokémon Rot, Blau, Feuerrot und Blattgrün.
          </Text>
        </Stack>
      </div>
      <div className="border-border-brand border bg-orange-100 p-1">
        <Stack space={4} alignX="center">
          <img
            src="https://www.pokewiki.de/images/0/08/Hauptartwork_005.png"
            alt="glutexo"
            width={200}
            height={200}
          />
          <Headline level={4}>Glutexo</Headline>
          <Text>
            Glutexo ist ein Pokémon mit dem Typ Feuer und existiert seit der
            ersten Spielgeneration. Als erste Weiterentwicklung von Glumanda
            spielt es eine wichtige Rolle als Starter-Pokémon in Pokémon Rot,
            Blau, Feuerrot, Blattgrün.
          </Text>
        </Stack>
      </div>
      <div className="border-border-brand border bg-orange-100 p-1">
        <Stack space={4} alignX="center">
          <img
            src="https://www.pokewiki.de/images/d/de/Hauptartwork_006.png"
            alt="glurak"
            width={250}
            height={200}
          />
          <Headline level={4}>Glurak</Headline>
          <Text>
            Glurak ist ein Pokémon mit den Typen Feuer und Flug und existiert
            seit der ersten Spielgeneration. Es stellt die zweite
            Entwicklungsstufe von Glumanda und Glutexo dar und ist somit neben
            Bisaflor und Turtok eine der Endentwicklungen der Starter-Pokémon
            aus Kanto.
          </Text>
        </Stack>
      </div>
    </Tiles>
  ),
});

export const DifferentHeights = meta.story({
  render: args => (
    <Tiles {...args}>
      <div className="border border-slate-300 bg-slate-100">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className="border border-slate-300 bg-slate-100">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className="border border-slate-300 bg-slate-100">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className="border border-slate-300 bg-slate-100">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className="border border-slate-300 bg-slate-100">
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className="border border-slate-300 bg-slate-100">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
    </Tiles>
  ),
});
