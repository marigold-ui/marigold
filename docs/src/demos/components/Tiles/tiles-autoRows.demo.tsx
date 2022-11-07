import { Box, Card, Image, Tiles, Text } from '@marigold/components';

export const AutoRows = () => (
  <Tiles space="xsmall" tilesWidth="250px" equalHeight>
    <Box as={Card}>
      <Image
        src="https://www.pokewiki.de/images/6/63/Sugimori_004.png"
        alt="glumanda"
        width={100}
        height={100}
      />
    </Box>
    <Box as={Card}>
      <Image
        src="https://www.pokewiki.de/images/9/96/Sugimori_001.png"
        alt="bisasam"
        width={100}
        height={100}
      />
    </Box>
    <Box as={Card}>
      <Image
        src="https://www.pokewiki.de/images/6/6c/Sugimori_025.png"
        alt="pikachu"
        width={100}
        height={100}
      />
      <Text>
        Pikachu ist ein Pokémon mit dem Typ Elektro und existiert seit der
        ersten Spielgeneration. Es ist die erste Entwicklung von Pichu und kann
        sich selbst zu Raichu weiterentwickeln.
      </Text>
    </Box>
    <Box as={Card}>
      <Image
        src="https://www.pokewiki.de/images/2/26/Sugimori_037.png"
        alt="vulpix"
        width={100}
        height={100}
      />
    </Box>
  </Tiles>
);
