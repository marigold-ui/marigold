'use client';

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

// oklch to sRGB conversion (from the reference implementation)
function oklchToRgb(L: number, C: number, h: number): [number, number, number] {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const rLin = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const gamma = (c: number) => {
    const abs = Math.abs(c);
    const r =
      abs > 0.0031308 ? 1.055 * Math.pow(abs, 1 / 2.4) - 0.055 : 12.92 * abs;
    return c < 0 ? -r : r;
  };
  return [
    Math.max(0, Math.min(255, Math.round(gamma(rLin) * 255))),
    Math.max(0, Math.min(255, Math.round(gamma(gLin) * 255))),
    Math.max(0, Math.min(255, Math.round(gamma(bLin) * 255))),
  ];
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map(x =>
        Math.max(0, Math.min(255, Math.round(x)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

// Charcoal scale: oklch(L, C, 54)
const charcoal: Record<string, { L: number; C: number }> = {
  '50': { L: 0.985, C: 0.002 },
  '100': { L: 0.965, C: 0.003 },
  '200': { L: 0.92, C: 0.004 },
  '300': { L: 0.86, C: 0.005 },
  '400': { L: 0.74, C: 0.006 },
  '500': { L: 0.62, C: 0.007 },
  '600': { L: 0.52, C: 0.008 },
  '700': { L: 0.42, C: 0.008 },
  '800': { L: 0.32, C: 0.008 },
  '900': { L: 0.22, C: 0.008 },
  '950': { L: 0.15, C: 0.008 },
};

const colors = Object.fromEntries(
  steps.map(s => {
    const { L, C } = charcoal[s];
    const rgb = oklchToRgb(L, C, 54);
    return [s, { rgb, hex: rgbToHex(...rgb) }];
  })
) as Record<string, { rgb: [number, number, number]; hex: string }>;

// WCAG 2.1 relative luminance
function getWCAGLuminance(r: number, g: number, b: number) {
  const f = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function calculateWCAG(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
) {
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

function calculateAPCA(
  text: [number, number, number],
  bg: [number, number, number]
) {
  const Yt = getLuminance(...text);
  const Yb = getLuminance(...bg);
  const c = (Math.pow(Yb, 0.56) - Math.pow(Yt, 0.57)) * 1.14;
  return Math.abs(c) < 0.1 ? 0 : c * 100;
}

function apcaBadgeColor(score: number) {
  if (score >= 75) return 'rgba(16,185,129,0.25)';
  if (score >= 60) return 'rgba(34,197,94,0.25)';
  if (score >= 45) return 'rgba(245,158,11,0.25)';
  return 'rgba(239,68,68,0.25)';
}

function wcagBadgeColor(score: number) {
  if (score >= 7.0) return 'rgba(16,185,129,0.25)';
  if (score >= 4.5) return 'rgba(34,197,94,0.25)';
  if (score >= 3.0) return 'rgba(245,158,11,0.25)';
  return 'rgba(239,68,68,0.25)';
}

export default () => (
  <div data-theme="rui">
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
            <th
              className="text-secondary text-[11px] font-bold"
              style={{
                padding: '6px 4px',
                minWidth: 65,
                textAlign: 'center',
                backgroundColor: 'var(--color-charcoal-100)',
                borderRight: '1px solid var(--color-charcoal-200)',
                borderBottom: '1px solid var(--color-charcoal-200)',
                position: 'sticky',
                top: 0,
              }}
            >
              Bg \ Text
            </th>
            {steps.map(s => (
              <th
                key={s}
                className="text-[11px] font-bold"
                style={{
                  padding: '6px 4px',
                  minWidth: 65,
                  textAlign: 'center',
                  backgroundColor: 'var(--color-charcoal-100)',
                  color: 'var(--color-charcoal-700)',
                  borderBottom: '1px solid var(--color-charcoal-200)',
                  position: 'sticky',
                  top: 0,
                }}
              >
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {steps.map(bgStep => {
            const bgC = colors[bgStep];
            return (
              <tr key={bgStep}>
                <th
                  className="text-[11px] font-bold"
                  style={{
                    padding: '6px 4px',
                    minWidth: 65,
                    textAlign: 'center',
                    backgroundColor: 'var(--color-charcoal-100)',
                    color: 'var(--color-charcoal-700)',
                    borderRight: '1px solid var(--color-charcoal-200)',
                    borderBottom: '1px solid var(--color-charcoal-200)',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  {bgStep}
                </th>
                {steps.map(txStep => {
                  const txC = colors[txStep];
                  const apcaScore = Math.abs(
                    Math.round(calculateAPCA(txC.rgb, bgC.rgb))
                  );
                  const wcagScore = calculateWCAG(txC.rgb, bgC.rgb);

                  return (
                    <td
                      key={txStep}
                      title={`Bg: ${bgStep}, Text: ${txStep}`}
                      style={{
                        padding: '6px 4px',
                        minWidth: 65,
                        textAlign: 'center',
                        fontSize: 11,
                        backgroundColor: bgC.hex,
                        color: txC.hex,
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
                        <span
                          style={{
                            display: 'block',
                            fontSize: 9,
                            fontWeight: 700,
                            padding: '1px 3px',
                            borderRadius: 3,
                            lineHeight: 1.3,
                            backgroundColor: apcaBadgeColor(apcaScore),
                          }}
                        >
                          Lc {apcaScore}
                        </span>
                        <span
                          style={{
                            display: 'block',
                            fontSize: 9,
                            fontWeight: 700,
                            padding: '1px 3px',
                            borderRadius: 3,
                            lineHeight: 1.3,
                            backgroundColor: wcagBadgeColor(wcagScore),
                          }}
                        >
                          {wcagScore.toFixed(1)}:1
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Legend */}
    <div
      className="mt-4 rounded-xl p-4"
      style={{
        backgroundColor: 'var(--color-charcoal-100)',
        border: '1px solid var(--color-charcoal-200)',
      }}
    >
      <div
        className="flex flex-wrap items-center justify-center gap-4 text-xs"
        style={{ color: 'var(--color-charcoal-600)' }}
      >
        <span
          className="w-full text-center text-[10px] font-bold tracking-wide uppercase"
          style={{ color: 'var(--color-charcoal-400)' }}
        >
          APCA Criteria
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#10b981' }}
          />{' '}
          Lc 75+ (Body)
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#22c55e' }}
          />{' '}
          Lc 60+ (Sub)
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#f59e0b' }}
          />{' '}
          Lc 45+ (Large)
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#ef4444' }}
          />{' '}
          Fail
        </span>
      </div>
      <div
        className="my-2.5 h-px w-full"
        style={{ background: 'var(--color-charcoal-200)' }}
      />
      <div
        className="flex flex-wrap items-center justify-center gap-4 text-xs"
        style={{ color: 'var(--color-charcoal-600)' }}
      >
        <span
          className="w-full text-center text-[10px] font-bold tracking-wide uppercase"
          style={{ color: 'var(--color-charcoal-400)' }}
        >
          WCAG Criteria
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#10b981' }}
          />{' '}
          7.0+ (AAA)
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#22c55e' }}
          />{' '}
          4.5+ (AA)
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#f59e0b' }}
          />{' '}
          3.0+ (Large)
        </span>
        <span className="flex items-center gap-1 font-medium">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: '#ef4444' }}
          />{' '}
          Fail
        </span>
      </div>
    </div>
  </div>
);
