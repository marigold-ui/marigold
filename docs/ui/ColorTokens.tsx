'use client';

import { Headline } from '@/ui';
import {
  BackgroundTokens,
  Black,
  BorderTokens,
  ColorPaletts,
  OutlineTokens,
  TextTokens,
  White,
} from './ColorTable';
import { useThemeSwitch } from './ThemeSwitch';

interface ColorTokenTableProps {
  sections: { [group: string]: [token: string, color: string][] };
}
export const ColorTokenTable = ({ sections = {} }: ColorTokenTableProps) => {
  const { current } = useThemeSwitch();

  if (!current) {
    return null;
  }

  return (
    <div data-theme={current}>
      <Headline level={3}>Brand</Headline>
      <ColorPaletts name="brand" />
      <Headline level={3}>Accent</Headline>
      <ColorPaletts name="accent" />
      <Headline level={3}>White</Headline>
      <White />
      <Headline level={3}>Black</Headline>
      <Black />
      <Headline level={3}>Gray</Headline>
      <ColorPaletts name="gray" />
      <Headline level={3}>Blue</Headline>
      <ColorPaletts name="blue" />
      <Headline level={3}>Yellow</Headline>
      <ColorPaletts name="yellow" />
      <Headline level={3}>Green</Headline>
      <ColorPaletts name="green" />
      <Headline level={3}>Red</Headline>
      <ColorPaletts name="red" />
      <Headline level={3}>Text</Headline>
      <TextTokens />
      <Headline level={3}>Background</Headline>
      <BackgroundTokens />
      <Headline level={3}>Border</Headline>
      <BorderTokens />
      <Headline level={3}>Outline</Headline>
      <OutlineTokens />
    </div>
  );
};
