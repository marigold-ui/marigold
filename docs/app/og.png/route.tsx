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
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  opacity?: number;
}

const Flower = ({
  size,
  rotate = '0',
  top,
  right,
  bottom,
  left,
  opacity = 100,
}: FlowerProps) => {
  const position = { top, right, bottom, left };

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
      <Flower size="92" left={15} bottom={32} />
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
