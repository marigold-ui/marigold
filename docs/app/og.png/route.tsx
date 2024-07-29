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
  position: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  rotate: string;
}

const Flower = ({ size, position, rotate }: FlowerProps) => (
  <Logo
    height={size}
    width={size}
    style={{
      position: 'absolute',
      ...position,
      transform: `rotate(${rotate})`,
    }}
  />
);

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
      <Flower size="52" position={{ left: -15, bottom: 32 }} rotate="55deg" />
      <Flower size="24" position={{ left: 15, bottom: -10 }} rotate="120deg" />
      <Flower size="92" position={{ left: 65, bottom: -25 }} rotate="-10deg" />
      <Flower size="20" position={{ left: 55, bottom: 75 }} rotate="-90deg" />
      <Flower size="48" position={{ left: 175, bottom: -20 }} rotate="100deg" />
      <Flower size="28" position={{ left: 15, bottom: 115 }} rotate="35deg" />
      <Flower size="14" position={{ left: 170, bottom: 40 }} rotate="65deg" />

      <Flower size="84" position={{ right: -20, top: 40 }} rotate="8deg" />
      <Flower size="20" position={{ right: 15, top: -8 }} rotate="-90deg" />
      <Flower size="48" position={{ right: 60, top: -10 }} rotate="-90deg" />
      <Flower size="14" position={{ right: -8, top: 140 }} rotate="65deg" />
      <Flower size="24" position={{ right: 95, top: 45 }} rotate="65deg" />
      <Flower size="14" position={{ right: 130, top: 15 }} rotate="8deg" />
      <Flower size="32" position={{ right: 160, top: -15 }} rotate="8deg" />

      <div style={{ fontSize: 80 }}>{title}</div>
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
