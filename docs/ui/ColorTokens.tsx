'use client';

import {
  BaseSemanticTokens,
  ColorPalettes,
  FeedbackSemanticTokens,
  StateSemanticTokens,
} from './ColorTable';

export const ColorTokenTable = () => {
  return (
    <div className="bg-transparent" data-theme={'rui'}>
      <h3 className="mt-6 mb-2 text-lg font-semibold first:mt-0">Stone</h3>
      <ColorPalettes name="stone" />
      <h3 className="mt-6 mb-2 text-lg font-semibold">Orange</h3>
      <ColorPalettes name="orange" />
      <h3 className="mt-6 mb-2 text-lg font-semibold">Blue</h3>
      <ColorPalettes name="blue" />
      <h3 className="mt-6 mb-2 text-lg font-semibold">Yellow</h3>
      <ColorPalettes name="yellow" />
      <h3 className="mt-6 mb-2 text-lg font-semibold">Green</h3>
      <ColorPalettes name="green" />
      <h3 className="mt-6 mb-2 text-lg font-semibold">Red</h3>
      <ColorPalettes name="red" />
      <h3 className="mt-6 mb-2 text-lg font-semibold">Base Semantic Tokens</h3>
      <BaseSemanticTokens />
      <h3 className="mt-6 mb-2 text-lg font-semibold">
        Feedback Semantic Tokens
      </h3>
      <FeedbackSemanticTokens />
      <h3 className="mt-6 mb-2 text-lg font-semibold">State Semantic Tokens</h3>
      <StateSemanticTokens />
    </div>
  );
};
