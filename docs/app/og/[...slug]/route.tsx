import { baseUrl } from '@/lib/config';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { Logo } from '@/ui/Logo';

export const revalidate = false;

// Helper Components
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
      backgroundColor: '#f8fafc',
      color: '#020617',
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
export const GET = async (
  _req: Request,
  { params }: RouteContext<'/og/[...slug]'>
) => {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const title = page.data.title || '';

  // Load Inter font
  const fontData = await fetch(new URL('/fonts/Inter-Black.ttf', baseUrl)).then(
    res => res.arrayBuffer()
  );

  const content = (
    <Container>
      {/* Corner Flowers */}
      <Flower size="78" left="-25" bottom="36" rotate="55" opacity="0.25" />
      <Flower size="36" left="25" bottom="-15" rotate="120" opacity="0.5" />
      <Flower size="42" left="15" bottom="145" rotate="35" opacity="0.3" />
      <Flower size="30" left="75" bottom="90" rotate="-90" opacity="0.5" />
      <Flower size="138" left="95" bottom="-45" rotate="-10" opacity="0.4" />
      <Flower size="28" left="245" bottom="30" rotate="65" opacity="0.5" />
      <Flower size="72" left="280" bottom="-20" rotate="100" opacity="0.3" />
      <Flower size="20" left="370" bottom="35" rotate="100" opacity="0.25" />

      <Flower size="126" right="-35" top="50" rotate="8" opacity="0.25" />
      <Flower size="21" right="-12" top="200" rotate="65" opacity="0.3" />
      <Flower size="35" right="10" top="-15" rotate="-90" opacity="0.5" />
      <Flower size="72" right="75" top="-20" rotate="-90" opacity="0.25" />
      <Flower size="38" right="115" top="65" rotate="65" opacity="0.3" />
      <Flower size="22" right="170" top="15" rotate="8" opacity="0.4" />
      <Flower size="48" right="220" top="-20" rotate="8" opacity="0.5" />

      <div
        style={{
          display: 'flex',
          fontSize: 100,
          padding: '24px 48px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          position: 'absolute',
          right: 24,
          bottom: 8,
        }}
      >
        <Logo height="16" width="16" />
        <div
          style={{
            fontFamily: '"Inter Black"',
            color: '#46505a',
            fontSize: 18,
            textTransform: 'uppercase',
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
