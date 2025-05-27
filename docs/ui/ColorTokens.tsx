'use client';

import { Headline } from '@/ui';
import {
  BaseSemanticTokens,
  Black,
  ColorPalettes,
  FeedbackSemanticTokens,
  StateSemanticTokens,
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
      <Headline level={3}>Base Semantic Tokens</Headline>
      <BaseSemanticTokens />
      <Headline level={3}>Feedback Semantic Tokens</Headline>
      <FeedbackSemanticTokens />
      <Headline level={3}>State Semantic Tokens</Headline>
      <StateSemanticTokens />
    </div>
  );
};
