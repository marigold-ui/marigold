import { Card, Headline, Link, Stack, Text } from '@marigold/components';

import { Do } from '@/ui/Do';
import { Dont } from '@/ui/Dont';

export default () => (
  <div className="flex flex-col gap-4">
    <Card p={4}>
      <Stack space={5}>
        <Headline level={3}>Professor Severus Snape</Headline>
        <Text>
          <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2 May,
          1998)[2] was an English half-blood[3] wizard serving as Potions Master
          (1981-1996), Head of Slytherin House (1981-1997), Defence Against the
          Dark Arts professor (1996-1997), and Headmaster (1997-1998) of the
          Hogwarts School of Witchcraft and Wizardry as well as a member of the
          Order of the Phoenix and a Death Eater. His double life played an
          extremely important role in both of the Wizarding Wars against
          Voldemort.
        </Text>
        <Link
          href="https://harrypotter.fandom.com/wiki/Severus_Snape"
          target="blank"
        >
          Source
        </Link>
      </Stack>
    </Card>
    <div className="flex gap-4">
      <Do
        description="This is the best way to do ... "
        img="/Elevation_Mockup_B2B.png"
      />
      <Dont
        description="This is the best way to do ... "
        img="/Elevation_Mockup_B2B.png"
      />
    </div>
  </div>
);
