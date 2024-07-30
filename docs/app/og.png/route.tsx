import { baseUrl } from '@/lib/config';
import type { ReactNode } from 'react';

import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { colors } from '@marigold/theme-docs/tokens';

import { Logo } from '@/ui/Logo';

// Helper
// ---------------
const Container = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: colors.bg.body,
      color: colors.text.primary.DEFAULT,
    }}
  >
    {children}
  </div>
);

interface FlowerProps {
  size: string;
  rotate?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  opacity?: string;
}

const Flower = ({
  size,
  rotate = '0',
  top,
  right,
  bottom,
  left,
  opacity = '1',
}: FlowerProps) => {
  // next/og is weird and doesn't like undefined props...
  const position = Object.fromEntries(
    Object.entries({ top, right, bottom, left })
      .filter(([, val]) => typeof val !== 'undefined')
      .map(([key, val]) => [key, Number(val)])
  );

  return (
    <Logo
      height={size}
      width={size}
      style={{
        position: 'absolute',
        transform: `rotate(${rotate}deg)`,
        opacity,
        ...position,
      }}
    />
  );
};

// Handler
// ---------------
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const title = url.searchParams.get('title') || '';

  // Load Inter font
  const fontData = await fetch(new URL('/fonts/Inter-Black.ttf', baseUrl)).then(
    res => res.arrayBuffer()
  );

  const content = title ? (
    <Container>
      {/* Corner Flowers */}
      {/* <Flower size="78" left="-25" bottom="36" rotate="55" />
      <Flower size="36" left="25" bottom="-15" rotate="120" />
      <Flower size="42" left="15" bottom="145" rotate="35" />
      <Flower size="30" left="75" bottom="90" rotate="-90" />
      <Flower size="138" left="95" bottom="-45" rotate="-10" />
      <Flower size="28" left="245" bottom="30" rotate="65" />
      <Flower size="72" left="280" bottom="-20" rotate="100" />
      <Flower size="20" left="370" bottom="35" rotate="100" />

      <Flower size="126" right="-35" top="50" rotate="8" />
      <Flower size="21" right="-12" top="200" rotate="65" />
      <Flower size="35" right="10" top="-15" rotate="-90" />
      <Flower size="72" right="75" top="-20" rotate="-90" />
      <Flower size="38" right="115" top="65" rotate="65" />
      <Flower size="22" right="170" top="15" rotate="8" />
      <Flower size="48" right="220" top="-20" rotate="8" /> */}

      <Flower size="140" left="-40" top="510" rotate="75" />
      <Flower size="40" left="-30" top="410" rotate="-90" />
      <Flower size="130" left="-30" top="90" rotate="-90" />
      <Flower size="110" left="10" top="265" rotate="0" />
      <Flower size="60" left="100" top="410" rotate="-90" />
      <Flower size="80" left="50" top="-45" rotate="-90" />
      <Flower size="50" left="145" top="185" rotate="-100" />
      <Flower size="100" left="160" top="40" rotate="8" />
      <Flower size="40" left="160" top="520" rotate="-160" />
      <Flower size="80" left="180" top="300" rotate="35" />
      <Flower size="120" left="200" top="580" rotate="180" />
      <Flower size="140" left="250" top="400" rotate="165" />
      <Flower size="180" left="270" top="110" rotate="65" />
      <Flower size="60" left="300" top="-10" rotate="0" />
      <Flower size="40" left="380" top="560" rotate="245" />
      <Flower size="160" left="420" top="290" rotate="95" />
      <Flower size="90" left="430" top="-10" rotate="160" />
      <Flower size="60" left="460" top="500" rotate="195" />
      <Flower size="120" left="460" top="610" rotate="238" />
      <Flower size="60" left="500" top="140" rotate="195" />
      <Flower size="120" left="580" top="500" rotate="34" />
      <Flower size="220" left="580" top="-180" rotate="235" />
      <Flower size="35" left="600" top="90" rotate="235" />
      <Flower size="200" left="620" top="150" rotate="238" />
      <Flower size="45" left="620" top="380" rotate="14" />
      <Flower size="65" left="730" top="60" rotate="4" />
      <Flower size="65" left="735" top="430" rotate="88" />
      <Flower size="200" left="760" top="540" rotate="124" />
      <Flower size="50" left="830" top="-10" rotate="268" />
      <Flower size="120" left="840" top="310" rotate="124" />
      <Flower size="80" left="860" top="110" rotate="198" />
      <Flower size="140" left="940" top="-65" rotate="4" />
      <Flower size="60" left="940" top="220" rotate="4" />
      <Flower size="60" left="960" top="470" rotate="164" />
      <Flower size="40" left="980" top="120" rotate="64" />
      <Flower size="100" left="1010" top="330" rotate="276" />
      <Flower size="140" left="1030" top="520" rotate="8" />
      <Flower size="160" left="1050" top="130" rotate="3" />
      <Flower size="30" left="1100" top="460" rotate="176" />
      <Flower size="80" left="1120" top="10" rotate="210" />
      <Flower size="25" left="1135" top="325" rotate="76" />
      <Flower size="90" left="1150" top="380" rotate="25" />

      {/* <div style={{ fontSize: 100 }}>{title}</div> */}
    </Container>
  ) : (
    <Container>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Logo height="92" width="92" />
        <div
          style={{
            fontFamily: '"Inter Black"',
            color: '#46505a',
            fontSize: 80,
            textTransform: 'uppercase',
            letterSpacing: '-1px',
          }}
        >
          Marigold
        </div>
      </div>
    </Container>
  );

  return new ImageResponse(content, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter Black',
        style: 'normal',
        weight: 900,
        data: fontData,
      },
    ],
  });
};
