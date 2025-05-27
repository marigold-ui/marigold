'use client';

import { Headline } from '@/ui';
import {
  BackgroundTokens,
  Black,
  BorderTokens,
  ColorPalettes,
  OutlineTokens,
  TextTokens,
  White,
} from './ColorTable';
import { useThemeSwitch } from './ThemeSwitch';

export const ColorTokenTable = () => {
  const { current } = useThemeSwitch();

  if (!current) {
    return null;
  }

  return (
    <div data-theme={current}>
      <Headline level={3}>Stone</Headline>
      <ColorPalettes name="stone" />
      <Headline level={3}>Orange</Headline>
      <ColorPalettes name="orange" />
      <Headline level={3}>White</Headline>
      <White />
      <Headline level={3}>Black</Headline>
      <Black />
      <Headline level={3}>Blue</Headline>
      <ColorPalettes name="blue" />
      <Headline level={3}>Yellow</Headline>
      <ColorPalettes name="yellow" />
      <Headline level={3}>Green</Headline>
      <ColorPalettes name="green" />
      <Headline level={3}>Red</Headline>
      <ColorPalettes name="red" />
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
