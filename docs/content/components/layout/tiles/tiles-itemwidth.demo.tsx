import { Card, Image, Tiles } from '@marigold/components';

export default () => (
  <Tiles space={2} tilesWidth="200px" stretch>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/0/09/Hauptartwork_004.png"
        alt="glumanda"
        width={100}
        height={100}
      />
    </Card>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/d/d3/Hauptartwork_001.png"
        alt="bisasam"
        width={100}
        height={100}
      />
    </Card>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/9/9e/Hauptartwork_025.png"
        alt="pikachu"
        width={100}
        height={100}
      />
    </Card>
    <Card>
      <Image
        src="https://www.pokewiki.de/images/c/c6/Hauptartwork_037.png"
        alt="vulpix"
        width={100}
        height={100}
      />
    </Card>
  </Tiles>
);
