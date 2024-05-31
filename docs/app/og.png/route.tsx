import { baseUrl } from '@/lib/config';
import { colors } from '@/theme/tokens';
import { Logo } from '@/ui/Logo';
import { ImageResponse } from 'next/og';
import type { NextRequest } from "next/server"; 

interface FlowerProps {
  size: string;
  position: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  },
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
  const fontData = await fetch(
    new URL('/fonts/Inter-Black.ttf', baseUrl)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
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
        <Flower size="52" position={{ left: -15, bottom: 32 }} rotate="55deg" />
        <Flower size="24" position={{ left: 20, bottom: -10 }} rotate="55deg" />
        <Flower size="92" position={{ left: 65, bottom: -20 }} rotate="-10deg" />
        <Flower size="16" position={{ left: 50, bottom: 82 }} rotate="-10deg" />

        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontFamily: '"Inter Black"', }}>
            <Logo height="20" width="20"/>
            <div style={{ fontSize: 20, textTransform: 'uppercase', letterSpacing: 0.5 }}>Marigold</div>
        </div>
      </div>
    ),
    {
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
    },
  );
}