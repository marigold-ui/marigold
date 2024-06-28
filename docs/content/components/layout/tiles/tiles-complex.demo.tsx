import {
  Card,
  Headline,
  Image,
  Stack,
  Text,
  Tiles,
} from '@marigold/components';

export default () => (
  <Tiles tilesWidth="300px" space={4}>
    <Card p={4}>
      <Stack space={6} alignX="center">
        <Image
          src="https://www.pokewiki.de/images/0/09/Hauptartwork_004.png"
          alt="glumanda"
          width={200}
          height={200}
        />
        <Headline level={2}>Glumanda</Headline>
        <Text>
          Glumanda ist ein Pokémon mit dem Typ Feuer und existiert seit der
          ersten Spielgeneration. Es ist neben Bisasam und Schiggy eines der
          Starter-Pokémon in Pokémon Rot, Blau, Feuerrot und Blattgrün.
        </Text>
      </Stack>
    </Card>
    <Card p={4}>
      <Stack space={6} alignX="center">
        <Image
          src="https://www.pokewiki.de/images/0/08/Hauptartwork_005.png"
          alt="glutexo"
          width={200}
          height={200}
        />
        <Headline level={2}>Glutexo</Headline>
        <Text>
          Glutexo ist ein Pokémon mit dem Typ Feuer und existiert seit der
          ersten Spielgeneration. Als erste Weiterentwicklung von Glumanda
          spielt es eine wichtige Rolle als Starter-Pokémon in Pokémon Rot,
          Blau, Feuerrot, Blattgrün.
        </Text>
      </Stack>
    </Card>
    <Card p={4}>
      <Stack space={6} alignX="center">
        <Image
          src="https://www.pokewiki.de/images/d/de/Hauptartwork_006.png"
          alt="glurak"
          width={250}
          height={200}
        />
        <Headline level={4}>Glurak</Headline>
        <Text>
          Glurak ist ein Pokémon mit den Typen Feuer und Flug und existiert seit
          der ersten Spielgeneration. Es stellt die zweite Entwicklungsstufe von
          Glumanda und Glutexo dar und ist somit neben Bisaflor und Turtok eine
          der Endentwicklungen der Starter-Pokémon aus Kanto.
        </Text>
      </Stack>
    </Card>
  </Tiles>
);
