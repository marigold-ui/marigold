import { Box, Image, Headline, Stack, Text, Tiles } from '@marigold/components';

export const ComplexTiles = () => (
  <Tiles itemMinWidth="400px" space="small">
    <Box border="1px solid #fa8005" bg="orange10" p="small">
      <Stack space="medium" alignX="center">
        <Image
          src="https://www.pokewiki.de/images/6/63/Sugimori_004.png"
          alt="glumanda"
          width={200}
          height={200}
        />
        <Headline level="4">Glumanda</Headline>
        <Text>
          Glumanda ist ein Pokémon mit dem Typ Feuer und existiert seit der
          ersten Spielgeneration. Es ist neben Bisasam und Schiggy eines der
          Starter-Pokémon in Pokémon Rot, Blau, Feuerrot und Blattgrün.
        </Text>
      </Stack>
    </Box>
    <Box border="1px solid #fa8005" bg="orange10" p="small">
      <Stack space="medium" alignX="center">
        <Image
          src="https://www.pokewiki.de/images/7/7a/Sugimori_005.png"
          alt="glutexo"
          width={200}
          height={200}
        />
        <Headline level="4">Glutexo</Headline>
        <Text>
          Glutexo ist ein Pokémon mit dem Typ Feuer und existiert seit der
          ersten Spielgeneration. Als erste Weiterentwicklung von Glumanda
          spielt es eine wichtige Rolle als Starter-Pokémon in Pokémon Rot,
          Blau, Feuerrot, Blattgrün.
        </Text>
      </Stack>
    </Box>
    <Box border="1px solid #fa8005" bg="orange10" p="small">
      <Stack space="medium" alignX="center">
        <Image
          src="https://www.pokewiki.de/images/9/96/Sugimori_006.png"
          alt="glurak"
          width={250}
          height={200}
        />
        <Headline level="4">Glurak</Headline>
        <Text>
          Glurak ist ein Pokémon mit den Typen Feuer und Flug und existiert seit
          der ersten Spielgeneration. Es stellt die zweite Entwicklungsstufe von
          Glumanda und Glutexo dar und ist somit neben Bisaflor und Turtok eine
          der Endentwicklungen der Starter-Pokémon aus Kanto.
        </Text>
      </Stack>
    </Box>
  </Tiles>
);
