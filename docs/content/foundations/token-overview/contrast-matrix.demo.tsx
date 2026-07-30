'use client';

import {
  CHARCOAL_STEPS,
  apcaBadgeColor,
  apcaLc,
  charcoal,
  wcagBadgeColor,
  wcagRatio,
} from '@/lib/contrast';
import { ContrastLegend } from '@/ui/ContrastLegend';

const cell = {
  padding: '6px 4px',
  minWidth: 65,
  textAlign: 'center',
} as const;

const badge = {
  display: 'block',
  fontSize: 9,
  fontWeight: 700,
  padding: '1px 3px',
  borderRadius: 3,
  lineHeight: 1.3,
} as const;

export default () => (
  <>
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
                ...cell,
                borderRight: '1px solid var(--color-charcoal-200)',
                borderBottom: '1px solid var(--color-charcoal-200)',
                position: 'sticky',
                top: 0,
              }}
            >
              Bg \ Text
            </th>
            {CHARCOAL_STEPS.map(step => (
              <th
                key={step}
                className="text-secondary text-[11px] font-bold"
                style={{
                  ...cell,
                  borderBottom: '1px solid var(--color-charcoal-200)',
                  position: 'sticky',
                  top: 0,
                }}
              >
                {step}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CHARCOAL_STEPS.map(bgStep => {
            const bg = charcoal[bgStep];
            return (
              <tr key={bgStep}>
                <th
                  className="text-secondary text-[11px] font-bold"
                  style={{
                    ...cell,
                    borderRight: '1px solid var(--color-charcoal-200)',
                    borderBottom: '1px solid var(--color-charcoal-200)',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  {bgStep}
                </th>
                {CHARCOAL_STEPS.map(textStep => {
                  const text = charcoal[textStep];
                  const lc = Math.abs(Math.round(apcaLc(text.rgb, bg.rgb)));
                  const ratio = wcagRatio(text.rgb, bg.rgb);

                  return (
                    <td
                      key={textStep}
                      title={`Bg: ${bgStep}, Text: ${textStep}`}
                      style={{
                        ...cell,
                        fontSize: 11,
                        backgroundColor: bg.hex,
                        color: text.hex,
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
                            ...badge,
                            backgroundColor: apcaBadgeColor(lc),
                          }}
                        >
                          Lc {lc}
                        </span>
                        <span
                          style={{
                            ...badge,
                            backgroundColor: wcagBadgeColor(ratio),
                          }}
                        >
                          {ratio.toFixed(1)}:1
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

    <ContrastLegend />
  </>
);
