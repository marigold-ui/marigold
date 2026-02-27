import type { PropsWithChildren } from 'react';
import preview from '.storybook/preview';
import { Headline } from './Headline/Headline';
import { Inline } from './Inline/Inline';
import { Stack } from './Stack/Stack';
import { Text } from './Text/Text';

const meta = preview.meta({
  title: 'Styles/Colors',
});

// Stone palette (Tailwind v4)
const stone = {
  50: '#fafaf9',
  100: '#f5f5f4',
  200: '#e7e5e4',
  300: '#d6d3d1',
  400: '#a8a29e',
  500: '#78716c',
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
  950: '#0c0a09',
} as const;

type Shade = keyof typeof stone;

const shades = Object.keys(stone).map(Number) as Shade[];

// --- WCAG contrast ratio calculation ---

const linearize = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const luminance = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
};

const contrastRatio = (hex1: string, hex2: string) => {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

const wcagLevel = (ratio: number) => {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA18'; // large text only
  return 'FAIL';
};

// --- Swatch components ---

const Swatch = ({
  shade,
  children,
  className = '',
}: PropsWithChildren<{ shade: Shade; className?: string }>) => (
  <div
    className={`flex aspect-square w-full min-w-16 items-center justify-center rounded-lg text-xs font-medium ${className}`}
    style={{ backgroundColor: stone[shade] }}
  >
    {children}
  </div>
);

const TextSwatch = ({ bg, fg }: { bg: Shade; fg: Shade }) => {
  const ratio = contrastRatio(stone[bg], stone[fg]);
  const level = wcagLevel(ratio);
  const pass = level === 'AA' || level === 'AAA';

  return (
    <div
      className="flex aspect-square w-full min-w-20 flex-col items-center justify-center gap-1 rounded-lg border border-stone-200 p-2"
      style={{ backgroundColor: stone[bg] }}
    >
      <span className="text-sm font-semibold" style={{ color: stone[fg] }}>
        Aa
      </span>
      <span className="font-mono text-[10px]" style={{ color: stone[fg] }}>
        {ratio.toFixed(1)}:1
      </span>
      <span
        className={`rounded px-1 text-[10px] font-bold ${
          pass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {level === 'AA18' ? 'AA (lg)' : level}
      </span>
    </div>
  );
};

// --- Background colors ---

const bgShades: Shade[] = [50, 100, 200, 300];
const fgShades: Shade[] = [500, 600, 700, 800, 900, 950];

export const BackgroundColors = meta.story({
  name: 'Background Colors',
  render: () => (
    <Stack space="group">
      <Stack space="tight">
        <Headline level="2">Background Colors</Headline>
        <Text>
          Background colors use the lighter end of the stone scale (50–300).
          These provide visual hierarchy through subtle luminance differences
          for page backgrounds, surfaces, cards, and recessed areas.
        </Text>
      </Stack>

      <Headline level="3">The Palette</Headline>
      <Inline space="related">
        {bgShades.map(shade => (
          <Stack key={shade} space="tight" alignX="center">
            <Swatch shade={shade} className="border border-stone-300">
              <span
                style={{
                  color: shade <= 200 ? stone[800] : stone[900],
                }}
              >
                {shade}
              </span>
            </Swatch>
            <Text>
              <span className="font-mono text-xs">{stone[shade]}</span>
            </Text>
          </Stack>
        ))}
      </Inline>

      <Stack space="tight">
        <Headline level="3">Usage Guide</Headline>
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <strong>stone-50</strong>
          <span>Page background — the base canvas</span>
          <strong>stone-100</strong>
          <span>
            Recessed surfaces — input fields, sunken areas, hover states
          </span>
          <strong>stone-200</strong>
          <span>
            Subtle fills — selected rows, secondary surfaces, well elements
          </span>
          <strong>stone-300</strong>
          <span>
            Border zone — use for borders, dividers, or very subtle fills
          </span>
        </div>
      </Stack>

      <Stack space="tight">
        <Headline level="3">Stacked Surfaces</Headline>
        <Text>
          Background colors create depth when layered. Darker backgrounds appear
          recessed, lighter ones appear elevated.
        </Text>
      </Stack>
      <div className="rounded-xl p-8" style={{ backgroundColor: stone[100] }}>
        <span
          className="mb-3 block font-mono text-xs"
          style={{ color: stone[600] }}
        >
          stone-100 (page)
        </span>
        <div className="rounded-lg p-6" style={{ backgroundColor: stone[50] }}>
          <span
            className="mb-3 block font-mono text-xs"
            style={{ color: stone[600] }}
          >
            stone-50 (surface / card)
          </span>
          <div className="flex gap-4">
            <div
              className="flex-1 rounded-md p-4"
              style={{ backgroundColor: stone[100] }}
            >
              <span className="font-mono text-xs" style={{ color: stone[600] }}>
                stone-100 (recessed / input)
              </span>
            </div>
            <div
              className="flex-1 rounded-md p-4"
              style={{ backgroundColor: stone[200] }}
            >
              <span className="font-mono text-xs" style={{ color: stone[600] }}>
                stone-200 (selected / well)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  ),
});

// --- Text (foreground) colors ---

export const TextColors = meta.story({
  name: 'Text Colors',
  render: () => (
    <Stack space="group">
      <Stack space="tight">
        <Headline level="2">Text (Foreground) Colors</Headline>
        <Text>
          Text colors use the darker end of the stone scale (500–950). Each
          level serves a different role in the typographic hierarchy. All must
          meet WCAG AA contrast (4.5:1) against their intended backgrounds.
        </Text>
      </Stack>

      <Headline level="3">The Palette</Headline>
      <Inline space="related">
        {fgShades.map(shade => (
          <Stack key={shade} space="tight" alignX="center">
            <Swatch shade={shade}>
              <span style={{ color: stone[50] }}>{shade}</span>
            </Swatch>
            <Text>
              <span className="font-mono text-xs">{stone[shade]}</span>
            </Text>
          </Stack>
        ))}
      </Inline>

      <Stack space="tight">
        <Headline level="3">Usage Guide</Headline>
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <strong>stone-950 / 900</strong>
          <span>Primary text — headings and body copy. Maximum contrast.</span>
          <strong>stone-700</strong>
          <span>
            Secondary text — supporting info, subtitles. Passes AAA on light
            backgrounds.
          </span>
          <strong>stone-600</strong>
          <span>
            Tertiary text — captions, help text. Passes AA on backgrounds up to
            stone-300.
          </span>
          <strong>stone-500</strong>
          <span>
            Muted text — placeholders. Only passes AA on stone-50. Use with
            care.
          </span>
        </div>
      </Stack>

      <Headline level="3">Type Hierarchy Example</Headline>
      <div className="rounded-xl p-8" style={{ backgroundColor: stone[50] }}>
        <div className="max-w-md space-y-3">
          <p className="text-xl font-bold" style={{ color: stone[950] }}>
            Primary Heading
          </p>
          <p className="text-base" style={{ color: stone[900] }}>
            Body text uses stone-900 for comfortable reading. It provides strong
            contrast without the harshness of pure black.
          </p>
          <p className="text-sm" style={{ color: stone[700] }}>
            Secondary text in stone-700 creates clear hierarchy while remaining
            easily readable.
          </p>
          <p className="text-sm" style={{ color: stone[600] }}>
            Tertiary text in stone-600 for captions and supplementary
            information.
          </p>
          <p className="text-sm" style={{ color: stone[500] }}>
            Muted text in stone-500 for placeholders and disabled-like hints.
          </p>
        </div>
      </div>

      <Stack space="tight">
        <Headline level="3">The stone-500 Boundary</Headline>
        <Text>
          stone-500 is the lightest shade that passes AA (4.5:1) — and only
          barely, at 4.6:1 against stone-50. It fails on stone-100 and darker
          backgrounds. This makes it the threshold between usable foreground and
          decorative/border territory.
        </Text>
      </Stack>
      <Inline space="related">
        <TextSwatch bg={50} fg={500} />
        <TextSwatch bg={100} fg={500} />
        <TextSwatch bg={200} fg={500} />
      </Inline>
    </Stack>
  ),
});

// --- Contrast matrix ---

export const ContrastMatrix = meta.story({
  name: 'Contrast Matrix',
  render: () => (
    <Stack space="group">
      <Stack space="tight">
        <Headline level="2">Contrast Matrix</Headline>
        <Text>
          Every combination of foreground (columns) on background (rows). Green
          = WCAG AA (≥4.5:1). The darkest foreground (stone-950) must satisfy AA
          on the lightest background (stone-50) — it does, at 18.9:1.
        </Text>
      </Stack>

      <div className="overflow-x-auto">
        <table className="border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-2 text-left font-mono text-stone-500">
                bg \ fg
              </th>
              {fgShades.map(fg => (
                <th
                  key={fg}
                  className="p-2 text-center font-mono text-stone-700"
                >
                  {fg}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bgShades.map(bg => (
              <tr key={bg}>
                <td className="p-2 font-mono font-bold text-stone-700">{bg}</td>
                {fgShades.map(fg => {
                  const ratio = contrastRatio(stone[bg], stone[fg]);
                  const level = wcagLevel(ratio);
                  const pass = level === 'AA' || level === 'AAA';
                  return (
                    <td key={fg} className="p-1">
                      <div
                        className={`flex flex-col items-center rounded-md px-3 py-2 ${
                          pass
                            ? 'bg-green-50 ring-1 ring-green-200'
                            : 'bg-red-50 ring-1 ring-red-200'
                        }`}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{
                            backgroundColor: stone[bg],
                            color: stone[fg],
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          Aa
                        </span>
                        <span className="mt-1 font-mono">
                          {ratio.toFixed(1)}:1
                        </span>
                        <span
                          className={`mt-0.5 font-bold ${
                            pass ? 'text-green-700' : 'text-red-600'
                          }`}
                        >
                          {level === 'AA18' ? 'lg only' : level}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Stack space="tight">
        <Headline level="3">Reading the Matrix</Headline>
        <div className="space-y-2 text-sm">
          <p>
            <strong>AAA (≥7:1)</strong> — Enhanced contrast. Best for body text
            and small UI text. stone-700+ on stone-50 through stone-200.
          </p>
          <p>
            <strong>AA (≥4.5:1)</strong> — Minimum for normal text. stone-600
            passes on all light backgrounds. stone-500 barely passes on stone-50
            only.
          </p>
          <p>
            <strong>AA large (≥3:1)</strong> — Only acceptable for text ≥18pt
            (24px) or ≥14pt bold. Insufficient for body copy.
          </p>
          <p>
            <strong>FAIL (&lt;3:1)</strong> — Not accessible for any text. Only
            usable for decorative elements, borders, or disabled states.
          </p>
        </div>
      </Stack>
    </Stack>
  ),
});

// --- Full stone scale ---

export const FullScale = meta.story({
  name: 'Full Stone Scale',
  render: () => (
    <Stack space="group">
      <Stack space="tight">
        <Headline level="2">Full Stone Scale</Headline>
        <Text>
          The complete stone palette with functional zones. Shades 50–300 serve
          as backgrounds, 500–950 as foregrounds. Shade 400 is the "dead zone" —
          too dark for backgrounds, too light for accessible text. Use it only
          for borders and decorative elements.
        </Text>
      </Stack>

      <div className="flex gap-0.5">
        {shades.map(shade => {
          const isBackground = shade <= 300;
          const isForeground = shade >= 500;
          const isDeadZone = shade === 400;

          return (
            <div
              key={shade}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="flex h-24 w-full items-end justify-center rounded-lg border border-stone-200 pb-2"
                style={{ backgroundColor: stone[shade] }}
              >
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: shade >= 500 ? stone[50] : stone[900] }}
                >
                  {shade}
                </span>
              </div>
              <span className="font-mono text-[10px] text-stone-500">
                {stone[shade]}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isBackground
                    ? 'bg-blue-100 text-blue-700'
                    : isForeground
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-stone-200 text-stone-500'
                }`}
              >
                {isBackground
                  ? 'BG'
                  : isForeground
                    ? 'FG'
                    : isDeadZone
                      ? '—'
                      : ''}
              </span>
            </div>
          );
        })}
      </div>

      <Stack space="tight">
        <Headline level="3">Zone Summary</Headline>
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-4 gap-y-2 text-sm">
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs font-bold text-blue-700">
            BG
          </span>
          <span className="font-mono">50–300</span>
          <span>
            Backgrounds: pages, surfaces, cards, inputs, recessed areas
          </span>

          <span className="rounded-full bg-stone-200 px-2 py-0.5 text-center text-xs font-bold text-stone-500">
            —
          </span>
          <span className="font-mono">400</span>
          <span>Dead zone: borders, dividers, decorative elements only</span>

          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-center text-xs font-bold text-amber-700">
            FG
          </span>
          <span className="font-mono">500–950</span>
          <span>
            Foregrounds: text, icons (must meet WCAG AA against intended
            background)
          </span>
        </div>
      </Stack>
    </Stack>
  ),
});
