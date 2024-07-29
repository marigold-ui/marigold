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
      <Flower size="90" rotate="3" left="-58" bottom="212" opacity="0.6" />
      <Flower size="42" rotate="64" left="41" bottom="187" opacity="0.3" />
      <Flower size="160" rotate="189" left="-65" bottom="12" opacity="0.9" />
      <Flower size="125" rotate="-64" left="97" bottom="-71" opacity="0.75" />
      <Flower size="68" rotate="3" left="107" bottom="94" opacity="0.6" />
      <Flower size="26" rotate="174" left="177" bottom="68" opacity="0.3" />
      <Flower size="74" rotate="155" left="242" bottom="-22" opacity="0.75" />
      <Flower size="39" rotate="71" left="342" bottom="-2" opacity="0.35" />
      <div style={{ fontSize: 100 }}>{title}</div>
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
