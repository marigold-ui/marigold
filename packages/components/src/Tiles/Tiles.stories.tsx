import type { Meta, StoryObj } from '@storybook/react';

import { Headline, Image, Stack, Text, Tiles } from '@marigold/components';

const meta = {
  title: 'Components/Tiles',
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
} satisfies Meta;

export default meta;

export const Boxes: StoryObj<typeof Tiles> = {
  render: args => (
    <>
      <Tiles {...args}>
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
      </Tiles>
      <br />
      <Tiles {...args}>
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
      </Tiles>
    </>
  ),
};

export const DifferentHights: StoryObj<typeof Tiles> = {
  render: args => (
    <Tiles {...args}>
      <div className=" border border-[#ced4da] bg-[#e9ecef]">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className=" border border-[#ced4da] bg-[#e9ecef]">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className=" border border-[#ced4da] bg-[#e9ecef]">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className=" border border-[#ced4da] bg-[#e9ecef]">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className=" border border-[#ced4da] bg-[#e9ecef]">
        <Text align="center">I love Tiles!</Text>
      </div>
      <div className=" border border-[#ced4da] bg-[#e9ecef]">
        <Text align="center">I love Tiles!</Text>
        <Text align="center">I love Tiles!</Text>
      </div>
    </Tiles>
  ),
};

export const Stacks: StoryObj<typeof Tiles> = {
  render: args => (
    <Tiles {...args}>
      <div className="border border-[#fa8005] bg-orange-100 p-1">
        <Stack space={4} alignX="center">
          <Image
            src="https://www.pokewiki.de/images/6/63/Sugimori_004.png"
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
      <div className="border border-[#fa8005] bg-orange-100 p-1">
        <Stack space={4} alignX="center">
          <Image
            src="https://www.pokewiki.de/images/7/7a/Sugimori_005.png"
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
      <div className="border border-[#fa8005] bg-orange-100 p-1">
        <Stack space={4} alignX="center">
          <Image
            src="https://www.pokewiki.de/images/9/96/Sugimori_006.png"
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
};
