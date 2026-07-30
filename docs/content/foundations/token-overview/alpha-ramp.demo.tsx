'use client';

import {
  type Rgb,
  WHITE,
  apcaBadgeColor,
  apcaLc,
  charcoal,
  compositeOver,
  fillBadgeColor,
  rgbToHex,
  wcagBadgeColor,
  wcagRatio,
} from '@/lib/contrast';
import { ContrastLegend } from '@/ui/ContrastLegend';

/* The four wash jobs, in ramp order. Mirrors `themes/theme-rui/src/tokens.css`. */
const RUNGS = [
  { step: '50', job: 'muted', a: 0.02, b: 0.02 },
  { step: '100', job: 'focus-highlight', a: 0.05, b: 0.045 },
  { step: '200', job: 'hover', a: 0.11, b: 0.085 },
  { step: '300', job: 'selected', a: 0.19, b: 0.14 },
] as const;

interface Ground {
  id: string;
  label: string;
  /** What the wash is painted onto. */
  ground: Rgb;
  /** The ramp's base color — charcoal-950 for ramp A, white for ramp B. */
  base: Rgb;
  polarity: 'a' | 'b';
  inks: { label: string; rgb: Rgb }[];
}

/**
 * The three grounds a wash has to ride, with the ink each one actually puts on
 * top — resolved as `ui-contrast` really resolves it, not as the root declares
 * it.
 *
 * The ink lists differ per ground on purpose, because the inks differ.
 * `secondary-bold` appears on the two light grounds (Sidebar nav labels) and not
 * on the contrast one: it is a light-context ink that `ui-contrast` deliberately
 * does not restate, since its other consumer sits on an opaque light track. Text
 * on a contrast ground uses `secondary`, which does flip. Listing it here would
 * measure a combination the theme tells you not to write.
 */
const GROUNDS: Ground[] = [
  {
    id: 'surface',
    label: 'Surface — bg-surface (white)',
    ground: WHITE,
    base: charcoal['950'].rgb,
    polarity: 'a',
    inks: [
      { label: 'foreground', rgb: charcoal['900'].rgb },
      { label: 'secondary', rgb: charcoal['600'].rgb },
      { label: 'secondary-bold', rgb: charcoal['700'].rgb },
    ],
  },
  {
    id: 'page',
    label: 'Page — bg-background (charcoal-100)',
    ground: charcoal['100'].rgb,
    base: charcoal['950'].rgb,
    polarity: 'a',
    inks: [
      { label: 'foreground', rgb: charcoal['900'].rgb },
      { label: 'secondary', rgb: charcoal['600'].rgb },
      { label: 'secondary-bold', rgb: charcoal['700'].rgb },
    ],
  },
  {
    id: 'contrast',
    label: 'Contrast — ui-contrast (charcoal-900 base)',
    ground: charcoal['900'].rgb,
    base: WHITE,
    polarity: 'b',
    inks: [
      { label: 'primary-foreground', rgb: charcoal['50'].rgb },
      { label: 'secondary (restated)', rgb: charcoal['500'].rgb },
      { label: 'disabled', rgb: charcoal['400'].rgb },
    ],
  },
];

const cell = {
  padding: '6px 8px',
  textAlign: 'center',
  borderBottom: '1px solid var(--color-charcoal-200)',
} as const;

const badge = {
  display: 'block',
  fontSize: 9,
  fontWeight: 700,
  padding: '1px 3px',
  borderRadius: 3,
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
} as const;

const Badges = ({
  ratio,
  lc,
  apcaColor,
}: {
  ratio: number;
  lc: number;
  apcaColor: (lc: number) => string;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    }}
  >
    <span style={{ ...badge, backgroundColor: apcaColor(lc) }}>
      Lc {Math.abs(Math.round(lc))}
    </span>
    <span style={{ ...badge, backgroundColor: wcagBadgeColor(ratio) }}>
      {ratio.toFixed(2)}:1
    </span>
  </div>
);

const GroundTable = ({ ground }: { ground: Ground }) => {
  const groundHex = rgbToHex(ground.ground);

  return (
    <div className="mb-6">
      <div className="text-secondary mb-2 text-[11px] font-bold">
        {ground.label} — ramp {ground.polarity.toUpperCase()}
      </div>
      <div className="overflow-x-auto">
        <table
          style={{
            borderCollapse: 'collapse',
            width: 'max-content',
            minWidth: '100%',
          }}
        >
          <thead>
            <tr>
              {[
                'Rung',
                'Job',
                'α',
                'Wash vs. ground',
                ...ground.inks.map(i => i.label),
              ].map(head => (
                <th
                  key={head}
                  className="text-secondary text-[11px] font-bold"
                  style={{
                    ...cell,
                    borderBottom: '1px solid var(--color-charcoal-300)',
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RUNGS.map(rung => {
              const alpha = ground.polarity === 'a' ? rung.a : rung.b;
              const fill = compositeOver(ground.base, alpha, ground.ground);
              const fillHex = rgbToHex(fill);

              return (
                <tr key={rung.step}>
                  <td
                    className="text-[11px] font-bold"
                    style={{ ...cell, fontFamily: 'monospace' }}
                  >
                    {ground.polarity}-{rung.step}
                  </td>
                  <td
                    className="text-secondary text-[11px]"
                    style={{ ...cell, fontFamily: 'monospace' }}
                  >
                    {rung.job}
                  </td>
                  <td className="text-secondary text-[11px]" style={cell}>
                    {(alpha * 100).toFixed(1).replace(/\.0$/, '')}%
                  </td>

                  {/* The wash as a fill against its own ground. */}
                  <td style={{ ...cell, backgroundColor: groundHex }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: 28,
                          height: 20,
                          borderRadius: 3,
                          backgroundColor: fillHex,
                          flexShrink: 0,
                        }}
                      />
                      <Badges
                        ratio={wcagRatio(fill, ground.ground)}
                        lc={apcaLc(fill, ground.ground)}
                        apcaColor={fillBadgeColor}
                      />
                    </div>
                  </td>

                  {/* Each ink, rendered on the composited wash. */}
                  {ground.inks.map(ink => (
                    <td
                      key={ink.label}
                      style={{ ...cell, backgroundColor: fillHex }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            lineHeight: 1,
                            color: rgbToHex(ink.rgb),
                          }}
                        >
                          Aa
                        </span>
                        <Badges
                          ratio={wcagRatio(ink.rgb, fill)}
                          lc={apcaLc(ink.rgb, fill)}
                          apcaColor={apcaBadgeColor}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default () => (
  <>
    {GROUNDS.map(ground => (
      <GroundTable key={ground.id} ground={ground} />
    ))}

    <div className="text-secondary mb-1 text-[11px]">
      The <strong>Wash vs. ground</strong> column measures the fill against what
      it sits on, so its APCA badges use the fill scale (a wash wants to land
      inside a band, not score as high as possible). Every other column measures
      text on the composited wash, on the text scale.
    </div>
    <ContrastLegend variant="fill" />
  </>
);
