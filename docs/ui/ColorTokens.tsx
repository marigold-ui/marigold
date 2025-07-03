'use client';

import { Headline } from '@/ui';
import {
  BaseSemanticTokens,
  ColorPalettes,
  FeedbackSemanticTokens,
  StateSemanticTokens,
} from './ColorTable';

export const ColorTokenTable = () => {
  return (
    <div className="bg-transparent" data-theme={'rui'}>
      <Headline level={3}>Stone</Headline>
      <ColorPalettes name="stone" />
      <Headline level={3}>Orange</Headline>
      <ColorPalettes name="orange" />
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
