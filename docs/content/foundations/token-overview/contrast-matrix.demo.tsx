'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

// Authored here, not measured, so a rung added to the theme is silently omitted.
const steps = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;

type Step = (typeof steps)[number];
type Rgb = [number, number, number];
type Palette = Record<Step, Rgb>;

/**
 * Measured rather than restated, so the published numbers cannot drift from the
 * shipped palette. Computed colors stay in their authored space, so the canvas
 * is what converts to sRGB. Same readback as `flatten` in
 * `packages/components/src/contrast.utils.ts`, minus its white base, so opaque
 * tokens only.
 */
function measurePalette(container: HTMLElement): Palette | null {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const palette = {} as Palette;

  for (const step of steps) {
    const probe = container.querySelector(`[data-step="${step}"]`);
    if (!probe) return null;

    // Cleared and parked on transparent, so a token that is missing or that the
    // canvas cannot parse leaves the pixel clear instead of keeping a stale one.
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = 'transparent';
    ctx.fillStyle = getComputedStyle(probe).backgroundColor;
    ctx.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    // Otherwise it reads as pure black and publishes 1:1 for every pairing.
    if (a === 0) return null;

    palette[step] = [r, g, b];
  }

  return palette;
}

// WCAG 2.1 relative luminance
function getWCAGLuminance(r: number, g: number, b: number) {
  const f = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function calculateWCAG(rgb1: Rgb, rgb2: Rgb) {
  const l1 = getWCAGLuminance(...rgb1);
  const l2 = getWCAGLuminance(...rgb2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// APCA contrast (simplified)
function getLuminance(r: number, g: number, b: number) {
  return (
    0.2126 * Math.pow(r / 255, 2.4) +
    0.7152 * Math.pow(g / 255, 2.4) +
    0.0722 * Math.pow(b / 255, 2.4)
  );
}

function calculateAPCA(text: Rgb, bg: Rgb) {
  const Yt = getLuminance(...text);
  const Yb = getLuminance(...bg);
  const c = (Math.pow(Yb, 0.56) - Math.pow(Yt, 0.57)) * 1.14;
  return Math.abs(c) < 0.1 ? 0 : c * 100;
}

type Tier = { min: number; rgb: string; label: string };

/**
 * One table per scale drives both the cell badges and the legend, so a
 * threshold or a tier colour only has to change in one place. The last tier has
 * no floor, so a score always lands on one.
 */
const scales: Record<'APCA' | 'WCAG', readonly Tier[]> = {
  APCA: [
    { min: 75, rgb: '16,185,129', label: '75+ Body' },
    { min: 60, rgb: '34,197,94', label: '60+ Sub' },
    { min: 45, rgb: '245,158,11', label: '45+ Large' },
    { min: -Infinity, rgb: '239,68,68', label: 'Fail' },
  ],
  WCAG: [
    { min: 7, rgb: '16,185,129', label: '7+ AAA' },
    { min: 4.5, rgb: '34,197,94', label: '4.5+ AA' },
    { min: 3, rgb: '245,158,11', label: '3+ Large' },
    { min: -Infinity, rgb: '239,68,68', label: 'Fail' },
  ],
};

// Fainter than the legend swatches, because badge fills sit under text.
const badgeColor = (tiers: readonly Tier[], score: number) =>
  `rgba(${(tiers.find(t => score >= t.min) ?? tiers[tiers.length - 1]).rgb},0.25)`;

/**
 * Opaque, so the swatches never travel visibly behind a header label and the
 * labels keep their contrast on any page background.
 */
const headerCell = {
  padding: '6px 4px',
  minWidth: 65,
  textAlign: 'center',
  backgroundColor: 'var(--color-surface)',
} as const;

/**
 * The first column stays put while the matrix scrolls sideways. Collapsed
 * borders belong to the table and stay behind at the unscrolled position, so
 * the pinned edges are painted as inset shadows instead.
 */
const pinnedRail = {
  position: 'sticky',
  left: 0,
  // Above the cells that scroll under it, which are not positioned.
  zIndex: 1,
  boxShadow: `inset -1px 0 var(--color-charcoal-200),
    inset 0 -1px var(--color-charcoal-200)`,
} as const;

const Badge = ({ color, children }: { color?: string; children?: string }) => (
  <span
    style={{
      display: 'block',
      fontSize: 9,
      fontWeight: 700,
      padding: '1px 3px',
      borderRadius: 3,
      lineHeight: 1.3,
      backgroundColor: color ?? 'transparent',
    }}
  >
    {children ?? '\u00A0'}
  </span>
);

const Legend = () => (
  <div className="text-secondary mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
    {Object.entries(scales).map(([scale, tiers], index) => (
      <Fragment key={scale}>
        {index > 0 && <span className="mx-1">|</span>}
        <span className="font-bold">{scale}:</span>
        {tiers.map(({ rgb, label }) => (
          <span key={label}>
            <span
              className="inline-block size-2 rounded-sm"
              style={{ background: `rgba(${rgb},0.5)` }}
            />{' '}
            {label}
          </span>
        ))}
      </Fragment>
    ))}
  </div>
);

export default () => {
  const probesRef = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<Palette | 'unreadable' | null>(null);

  useEffect(() => {
    let frame = 0;

    const attempt = (retry: boolean) => {
      const result = probesRef.current && measurePalette(probesRef.current);
      // A stylesheet that has not applied yet reads as transparent.
      if (!result && retry) {
        frame = requestAnimationFrame(() => attempt(false));
        return;
      }
      setPalette(result ?? 'unreadable');
    };

    // Deferred to satisfy `react-hooks/set-state-in-effect`, as Token.tsx does.
    queueMicrotask(() => attempt(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  // A failed read only blanks the badges. The swatch grid needs no measurement.
  const measured = palette === 'unreadable' ? null : palette;

  return (
    <>
      {palette === 'unreadable' && (
        <p className="text-secondary mb-2 text-sm">
          The charcoal palette could not be read from the theme, so no contrast
          numbers are shown.
        </p>
      )}

      <div ref={probesRef} style={{ display: 'none' }}>
        {steps.map(step => (
          <span
            key={step}
            data-step={step}
            style={{ backgroundColor: `var(--color-charcoal-${step})` }}
          />
        ))}
      </div>

      <div className="overflow-x-auto">
        <table
          aria-label="Contrast matrix"
          style={{
            borderCollapse: 'collapse',
            width: 'max-content',
            minWidth: '100%',
          }}
        >
          <thead>
            <tr>
              <th
                className="text-secondary text-[11px] font-bold"
                style={{ ...headerCell, ...pinnedRail }}
              >
                Bg \ Text
              </th>
              {steps.map(s => (
                <th
                  key={s}
                  scope="col"
                  className="text-secondary text-[11px] font-bold"
                  style={{
                    ...headerCell,
                    borderBottom: '1px solid var(--color-charcoal-200)',
                  }}
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {steps.map(bgStep => (
              <tr key={bgStep}>
                <th
                  scope="row"
                  className="text-secondary text-[11px] font-bold"
                  style={{ ...headerCell, ...pinnedRail }}
                >
                  {bgStep}
                </th>
                {steps.map(txStep => {
                  const scores = measured
                    ? {
                        apca: Math.abs(
                          Math.round(
                            calculateAPCA(measured[txStep], measured[bgStep])
                          )
                        ),
                        wcag: calculateWCAG(measured[txStep], measured[bgStep]),
                      }
                    : undefined;

                  return (
                    <td
                      key={txStep}
                      title={`Bg: ${bgStep}, Text: ${txStep}`}
                      style={{
                        padding: '6px 4px',
                        minWidth: 65,
                        textAlign: 'center',
                        fontSize: 11,
                        backgroundColor: `var(--color-charcoal-${bgStep})`,
                        color: `var(--color-charcoal-${txStep})`,
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                        borderRight: '1px solid rgba(0,0,0,0.05)',
                        cursor: 'default',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                          padding: '2px 0',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            lineHeight: 1,
                          }}
                        >
                          Aa
                        </span>
                        <Badge
                          color={scores && badgeColor(scales.APCA, scores.apca)}
                        >
                          {scores && `Lc ${scores.apca}`}
                        </Badge>
                        <Badge
                          color={scores && badgeColor(scales.WCAG, scores.wcag)}
                        >
                          {scores && `${scores.wcag.toFixed(1)}:1`}
                        </Badge>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Legend />
    </>
  );
};
