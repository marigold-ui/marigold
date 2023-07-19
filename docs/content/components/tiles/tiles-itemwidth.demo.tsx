import { Card, Image, Tiles } from '@marigold/components';

export default () => (
  <Tiles space={2} tilesWidth="200px" stretch>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/6/63/Sugimori_004.png"
        alt="glumanda"
        width={100}
        height={100}
      />
    </Card>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/9/96/Sugimori_001.png"
        alt="bisasam"
        width={100}
        height={100}
      />
    </Card>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/6/6c/Sugimori_025.png"
        alt="pikachu"
        width={100}
        height={100}
      />
    </Card>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/2/26/Sugimori_037.png"
        alt="vulpix"
        width={100}
        height={100}
      />
    </Card>
  </Tiles>
);
