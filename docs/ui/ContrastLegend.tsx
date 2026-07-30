'use client';

import { APCA_LEVEL, WCAG_LEVEL } from '@/lib/contrast';

const SWATCH = {
  strong: 'rgba(16,185,129,0.5)',
  pass: 'rgba(34,197,94,0.5)',
  weak: 'rgba(245,158,11,0.5)',
  fail: 'rgba(239,68,68,0.5)',
} as const;

const Key = ({ color, children }: { color: string; children: string }) => (
  <span>
    <span
      className="inline-block size-2 rounded-sm"
      style={{ background: color }}
    />{' '}
    {children}
  </span>
);

export interface ContrastLegendProps {
  /**
   * `text` (default) reads the badges as text legibility — higher is better.
   * `fill` reads them as a state wash, where the target is a *band*: strong
   * enough to be seen, deliberately too weak to pass as an indicator.
   */
  variant?: 'text' | 'fill';
}

export const ContrastLegend = ({ variant = 'text' }: ContrastLegendProps) => (
  <div className="text-secondary mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
    <span className="font-bold">APCA:</span>
    {variant === 'text' ? (
      <>
        <Key color={SWATCH.strong}>{`${APCA_LEVEL.body}+ Body`}</Key>
        <Key color={SWATCH.pass}>{`${APCA_LEVEL.sub}+ Sub`}</Key>
        <Key color={SWATCH.weak}>{`${APCA_LEVEL.large}+ Large`}</Key>
        <Key color={SWATCH.fail}>Fail</Key>
      </>
    ) : (
      <>
        <Key color={SWATCH.pass}>
          {`${APCA_LEVEL.visible}–${APCA_LEVEL.control} intended band`}
        </Key>
        <Key
          color={SWATCH.weak}
        >{`below ${APCA_LEVEL.visible} subliminal`}</Key>
        <Key color={SWATCH.fail}>
          {`${APCA_LEVEL.control}+ reads as an indicator`}
        </Key>
      </>
    )}
    <span className="mx-1">|</span>
    <span className="font-bold">WCAG:</span>
    <Key color={SWATCH.strong}>{`${WCAG_LEVEL.aaa}+ AAA`}</Key>
    <Key color={SWATCH.pass}>{`${WCAG_LEVEL.aa}+ AA`}</Key>
    <Key color={SWATCH.weak}>{`${WCAG_LEVEL.large}+ Large`}</Key>
    <Key color={SWATCH.fail}>Fail</Key>
  </div>
);
